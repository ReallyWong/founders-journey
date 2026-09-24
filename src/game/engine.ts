// ─── 创业人生 · 游戏引擎 ────────────────────────────────────────────────────
import type {
  GameState, Gender, PendingDecision, Choice, LogEntry, Ending, Candidate, Difficulty,
} from "./types";
import { REGIONS, INDUSTRIES, EVENTS, INVESTORS, CANDIDATES, ENDINGS, NAMES, COFOUNDERS, SCENARIOS } from "./data";
import { reportRun, recordRun, loadCareer } from "./telemetry";
import { clearSave } from "./save";

const START_YEAR = 2024;
const MONTH_NAMES = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

export function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function fmtMoney(s: GameState, v: number): string {
  const abs = Math.abs(v);
  const sign = v < 0 ? "-" : "";
  if (abs >= 10000) return `${sign}${s.region.currency}${(abs / 10000).toFixed(1)}亿`;
  return `${sign}${s.region.currency}${Math.round(abs)}万`;
}

export interface NewGameOptions {
  difficulty?: Difficulty;
  cofounderId?: string;
  scenarioId?: string;
}

export function newGame(name: string, gender: Gender, regionId: string, industryId: string, opts: NewGameOptions = {}): GameState {
  const difficulty: Difficulty = opts.difficulty ?? "standard";
  const scenario = opts.scenarioId ? SCENARIOS.find((sc) => sc.id === opts.scenarioId) : undefined;
  const cofounder = opts.cofounderId ? COFOUNDERS.find((c) => c.id === opts.cofounderId) : undefined;
  const region = REGIONS.find((r) => r.id === (scenario?.regionId ?? regionId)) ?? REGIONS[0];
  const industry = INDUSTRIES.find((i) => i.id === (scenario?.industryId ?? industryId)) ?? INDUSTRIES[0];
  let startCash = scenario?.startCash ?? industry.startCash ?? 15;
  if (difficulty === "easy") startCash = Math.round(startCash * 1.5);
  const isAngel = industry.id === "angel";
  const isVC = industry.id === "vcpe";
  // 🥚 彩蛋：累计通关 3 局的「连续创业者」获得老兵光环
  let veteran = false;
  try { veteran = parseInt(localStorage.getItem("fj_completions") || "0", 10) >= 3; } catch { /* ignore */ }
  const state: GameState = {
    name: name.trim() || (gender === "female" ? pick(NAMES.female) : pick(NAMES.male)),
    gender,
    region,
    industry,
    difficulty,
    cofounder,
    scenario: scenario ? { id: scenario.id, year: scenario.year, queue: scenario.queue.map((q) => ({ ...q })) } : undefined,
    month: 0,
    year: scenario?.year ?? START_YEAR,
    season: MONTH_NAMES[0],
    cash: startCash,
    valuation: isAngel || isVC ? 400 : 60,
    product: 0,
    users: 0,
    mrr: 0,
    morale: 80,
    health: veteran ? 95 : 90,
    reputation: isAngel || isVC ? 15 : veteran ? 8 : 0,
    debt: 0,
    team: cofounder ? 2 : 1,
    stage: "idea",
    stageProgress: 0,
    tags: [],
    log: [
      isAngel
        ? { month: 0, text: `你用上一次创业攒下的第一桶金 ${region.currency}${startCash} 万注册了微型基金。在${region.city}，天使投资人的故事开始了。`, type: "system" }
        : isVC
          ? { month: 0, text: `首期基金 ${region.currency}${startCash} 万募集到位。在${region.city}，VC/PE 投资人的故事开始了——你的「客户」是项目，你的「产品」是眼光。`, type: "system" }
          : scenario
            ? { month: 0, text: `剧本模式 · ${scenario.title}。${scenario.tagline}`, type: "system" }
            : { month: 0, text: `你把全部身家 ${region.currency}${startCash} 万转进公司账户。在${region.city}，${industry.name}的创业故事开始了。`, type: "system" },
    ],
    alive: true,
    raised: [],
    pendingDecision: null,
    eventCooldown: 0,
    budget: { rd: 40, marketing: 30, sales: 30 },
    speed: 0,
  };
  // 🥚 老兵光环提示
  if (veteran) {
    state.log.push({ month: 0, text: "🥚 彩蛋 · 连续创业者光环：这是你第 3+ 次站上牌桌。经验让你心态更稳（初始健康 95、声望 +8）。老兵不死，只是换个赛道继续折腾。", type: "good" });
  }
  // 难度说明
  if (difficulty === "easy") {
    state.log.push({ month: 0, text: "🎓 教学难度：初始资金 ×1.5，危机事件发生率降低。适合第一次创业的玩家。", type: "system" });
  } else if (difficulty === "realism") {
    state.log.push({ month: 0, text: "🔥 真实模式：危机更多、融资更难，且本局不自动存档（单次生命，不能读档）。这是真实创业者的世界。", type: "bad" });
  }
  // 合伙人入伙
  if (cofounder) {
    state.log.push({ month: 0, text: `🤝 联合创始人 ${cofounder.name}（${cofounder.role}）入伙。${cofounder.bonus}`, type: "good" });
  }
  // 开局事件：灵感来源选择
  state.pendingDecision = {
    kind: "event",
    eventId: "start-idea",
    title: "一切的起点",
    scene: isAngel
      ? `${state.name}在${region.city}的私人会所里翻着一叠 BP。上一段创业落幕，这一局你坐在牌桌的另一侧。投资人的第一步，从哪里开始？`
      : `${state.name}站在${region.city}的街头。你观察了很久${industry.name}这个行业，一个想法在脑子里盘旋了三周。创业的第一步，从哪里开始？`,
    choices: [
      {
        id: "research", text: "先做 2 周桌面调研：市场规模、竞品、政策",
        effects: { months: 1, product: 5, flag: "researched" },
        resultText: "你拉出 30 页调研笔记。市场比想象的大，但对手也比想象的多。至少，你不是在盲目冲锋。",
        lessonTitle: "创业课 · TAM/SAM/SOM",
        lesson: "投资人和创业者都该先回答：总市场（TAM）多大？可服务市场（SAM）多大？你能拿到的（SOM）多大？市场规模决定估值天花板——「在小池塘里当大鱼」常常比「在大池塘当虾米」聪明。",
      },
      {
        id: "talk-users", text: "立刻找 10 个潜在用户聊，验证痛点",
        effects: { months: 1, product: 10, flag: "user-centric" },
        resultText: "三周聊了 14 个人。其中 3 个人的眼睛在发光——你记住了那个眼神，那是付费意愿的样子。",
        lessonTitle: "创业课 · 用户访谈（The Mom Test）",
        lesson: "别问『你会用我的产品吗』（你妈都会说会）。问『你现在怎么解决这个问题的』『上次遇到是什么时候』。行为证据 > 口头恭维。Airbnb 创始人当年挨家挨户给房东拍照片，就是这么聊出来的。",
      },
      {
        id: "just-build", text: "想那么多干嘛，先干起来！",
        effects: { months: 1, product: 12, health: -5, flag: "reckless" },
        resultText: "一个月后原型出来了。你兴奋地发现：用户要的完全是另一个东西。早知道该先聊聊。",
        lessonTitle: "创业课 · 精益创业的代价",
        lesson: "「快速行动、打破常规」在验证前是赌博。Waze、Instagram 都经历过 pivot。先构建（Build）→再衡量（Measure）→再学习（Learn）的成本，远高于先访谈再构建——除非你烧的是别人的钱。",
      },
    ],
  };
  return state;
}

export function log(s: GameState, text: string, type: LogEntry["type"] = "info"): GameState {
  return { ...s, log: [...s.log, { month: s.month, text, type }] };
}

// ─── 应用选择效果 ───────────────────────────────────────────────────────────
export function applyChoice(s: GameState, choice: Choice): GameState {
  let n = { ...s };
  const e = choice.effects;

  if (e.cash) n.cash += e.cash;
  if (e.cashMult) n.cash *= e.cashMult;
  if (e.product) n.product = clamp(n.product + e.product, 0, 100);
  if (e.users) n.users = Math.max(0, n.users + e.users);
  if (e.usersPct) n.users = Math.max(0, Math.round(n.users * (1 + e.usersPct / 100)));
  if (e.mrrPct) n.mrr = Math.max(0, n.mrr * (1 + e.mrrPct / 100));
  if (e.morale) n.morale = clamp(n.morale + e.morale, 0, 100);
  if (e.health) n.health = clamp(n.health + e.health, 0, 100);
  if (e.reputation) n.reputation = clamp(n.reputation + e.reputation, -100, 100);
  if (e.debt) n.debt += e.debt;
  if (e.team) n.team = Math.max(1, n.team + e.team);
  if (e.valuationPct) n.valuation = Math.max(10, n.valuation * (1 + e.valuationPct / 100));
  if (e.flag) n.tags = [...n.tags, e.flag];
  if (e.addTag) n.tags = [...n.tags, e.addTag];
  if (e.portfolioAdd) {
    n.portfolio = [...(n.portfolio ?? []), e.portfolioAdd];
    n.tags = [...n.tags, "has-portfolio"];
  }

  n = log(n, choice.resultText, "info");
  if (e.portfolioAdd) n = log(n, `💼 投资组合 +1：${e.portfolioAdd}（当前 ${n.portfolio!.length} 个项目）`, "money");
  // 剧本模式：结局事件直接终结对局
  if (e.endingId) {
    n.pendingDecision = null;
    return finishGame(n, e.endingId);
  }
  if (e.cash) n = log(n, `现金 ${e.cash > 0 ? "+" : ""}${fmtMoney(n, e.cash)}`, e.cash > 0 ? "money" : "bad");
  if (e.months) {
    n.pendingDecision = null; // 先关闭当前决策，advanceMonth 才会推进时间/触发后续阶段
    for (let i = 0; i < e.months; i++) n = advanceMonth(n);
  }
  n = checkEnding(n);
  return n;
}

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

// ─── 月度推进 ───────────────────────────────────────────────────────────────
export function advanceMonth(s: GameState): GameState {
  if (!s.alive || s.pendingDecision) return s;
  let n: GameState = { ...s };
  n.month += 1;
  n.year = (n.scenario?.year ?? START_YEAR) + Math.floor(n.month / 12);
  n.season = MONTH_NAMES[n.month % 12];
  n.eventCooldown = Math.max(0, n.eventCooldown - 1);

  const region = n.region;
  const mod = region.modifiers;

  // ── 收入 ──
  const marketingFactor = 0.5 + (n.budget.marketing / 100) * 1.5;
  let newUsers = n.industry.baseUsers * marketingFactor * (n.product / 50) * (mod.marketAccess ?? 1) * randInt(70, 130) / 100;
  if (n.stage === "idea" || n.stage === "validate") newUsers = 0;
  n.users = Math.max(0, Math.round(n.users + newUsers));
  const churn = n.users * 0.06;
  n.users = Math.max(0, n.users - Math.round(churn));
  const targetMrr = n.users * n.industry.revenuePerUser * (n.product / 40) * (0.75 + (n.budget.sales / 100) * 0.9) * (n.cofounder?.trait === "sales" ? 1.3 : 1);
  n.mrr += (targetMrr - n.mrr) * 0.35;

  // ── 成本 ──
  const salaries = n.team * 1.8 * (mod.talentPool ?? 1) + (n.team - 1) * 0.4; // 基本工资 + 办公分摊
  // 产品未成型时市场投放效率低、花费也少（主要是调研物料）
  const marketingBurn = n.product >= 40 ? n.budget.marketing * 0.15 : n.budget.marketing * 0.05;
  // 行业特性开销：硬件备货占款 / 软件云账单 / 跨境物流仓储 / 金融合规（见 industryExtraBurn）
  const burn = (n.industry.baseBurn + salaries + marketingBurn) * (mod.burnMultiplier ?? 1) + industryExtraBurn(n);
  n.cash += n.mrr - burn;
  if (n.cash < 0) {
    n.debt += -n.cash;
    n.cash = 0;
    n = log(n, `⚠️ 现金耗尽！本月靠借债 ${fmtMoney(n, burn - n.mrr)} 周转`, "bad");
    n.morale = clamp(n.morale - 8, 0, 100);
  }

  // ── 产品进度 ──
  if ((n.stage === "mvp" || n.stage === "growth") && n.product < 100) {
    const cfTechMul = n.cofounder?.trait === "tech" ? 1.2 : 1;
    n.product = clamp(n.product + (n.budget.rd / 100) * 9 * (1 / n.industry.productDifficulty) * cfTechMul, 0, 100);
  }

  // ── 行业特性：游戏内容产能（更新跟不上，玩家就流失）──
  if (n.industry.id === "game" && ["growth", "seriesA", "scale"].includes(n.stage)) {
    if (n.budget.rd >= 30) {
      n.product = clamp(n.product + 0.6, 0, 100);
    } else {
      n.product = clamp(n.product - 1.5, 0, 100);
      if (n.month % 3 === 2) n = log(n, "🎮 游戏行业特性：版本内容更新跟不上，玩家正在流失——把研发预算拉到 30% 以上才能维持内容产能。", "bad");
    }
  }

  // ── 行业特性开销的定期解释日志（钱花在哪，必须说清楚）──
  if (n.industry.id === "hardware" && n.mrr > 5 && n.month % 3 === 0)
    n = log(n, "🏭 硬件行业特性：备货占款已计入本月消耗（库存与账期是硬件创业的半条命——参考小米的供应链周转）。", "info");
  if (["ai", "consumer"].includes(n.industry.id) && n.users > 500 && n.month % 3 === 1)
    n = log(n, "☁️ 软件行业特性：云服务账单随用户规模增长（规模不经济是 SaaS 的隐形税，用户越多服务器越贵）。", "info");
  if (n.industry.id === "ecom" && n.users > 300 && n.month % 3 === 2)
    n = log(n, "📦 跨境行业特性：物流与仓储费随单量增长（运费波动直接吃掉跨境品牌的薄毛利）。", "info");

  // ── 估值漂移 ──
  const growthSignal = (n.mrr / Math.max(1, n.valuation / 40)) - 1;
  n.valuation = Math.max(20, n.valuation * (1 + clamp(growthSignal, -0.05, 0.08)) * randInt(95, 106) / 100);
  // 估值下限：现金储备与营收能力支撑公司「底子」（解释「现金多但估值低」：现金托底但不驱动增长）
  n.valuation = Math.max(n.valuation, Math.max(n.cash * 1.5, n.mrr * 6));

  // ── 健康与士气 ──
  n.health = clamp(n.health - (n.speed >= 2 ? 1.2 : 0.6) + (n.cash > 100 ? 0.4 : 0), 0, 100);
  n.morale = clamp(n.morale + (n.cash > 50 ? 1 : -2) + (n.product >= 80 ? 0.5 : 0), 0, 100);

  // ── 阶段推进 ──
  n = advanceStage(n);

  // ── 剧本模式：固定事件链强制触发（优先于随机事件）──
  // 终局事件双触发：到月份触发，或玩家一路冲到规模化阶段时提前降临（真实结局优先，不给「跳出剧本」的捷径）
  if (n.alive && !n.pendingDecision && n.scenario && n.scenario.queue.length > 0) {
    const head = n.scenario.queue[0];
    const scDef = SCENARIOS.find((sc) => sc.id === n.scenario!.id);
    const finaleEarly = head.eventId === scDef?.finalEventId && STAGE_ORDER[n.stage] >= 5;
    if (n.month >= head.month || finaleEarly) {
      n.scenario = { ...n.scenario, queue: n.scenario.queue.slice(1) };
      n = triggerEventById(n, head.eventId);
    }
  }

  // ── 随机事件 ──
  if (n.alive && !n.pendingDecision && n.eventCooldown === 0) {
    n = maybeTriggerEvent(n);
  }

  n = checkEnding(n);
  return n;
}

function advanceStage(s: GameState): GameState {
  let n = { ...s };
  switch (n.stage) {
    case "idea":
      if (n.month >= 1) {
        n.stage = "validate";
        n = log(n, "🔍 进入需求验证阶段：你需要找到真正的痛点，而不是想象中的痛点。", "system");
        n.pendingDecision = interviewDecision();
      }
      break;
    case "validate":
      break; // 由访谈结果推进
    case "mvp":
      if (n.product >= 45) {
        n.stage = "seed";
        n = log(n, "⚒️ MVP 初见雏形！是时候见投资人了。", "system");
        n.pendingDecision = pitchDecision(n, "seed");
      }
      break;
    case "seed":
      break; // 融资成功推进
    case "growth":
      if (n.mrr >= 25 && n.month > 6) {
        n.stage = "seriesA";
        n = log(n, "📈 营收突破！A 轮的 VC 们开始主动约你了。", "system");
        n.pendingDecision = pitchDecision(n, "A");
      }
      break;
    case "seriesA":
      break;
    case "scale": {
      const sr = n.scaleRound ?? 0;
      if (sr === 0 && n.mrr >= 60 && n.month > 14) {
        n = log(n, "📈 增长曲线进入了机构视野：B 轮基金带着更厚的支票簿找上门了。（MRR≥60 · 第 15 个月后）", "system");
        n.pendingDecision = pitchDecision(n, "B");
      } else if (sr === 1 && n.mrr >= 100 && n.month > 22) {
        n = log(n, "🏛️ 准独角兽的牌桌：C 轮（Pre-IPO）机构带着上市资源与承销关系找上门。（MRR≥100 · 第 23 个月后）", "system");
        n.pendingDecision = pitchDecision(n, "C");
      } else if (sr >= 2 && n.valuation >= 2600 && n.mrr >= 120) {
        // v1.5.1：上市辅导前必须走完 B/C 轮——真实公司上市前都经历多轮融资
        n.stage = "endgame";
        n = log(n, "🏛️ C 轮交割完成，你收到了投行的上市辅导邀约——敲钟的梦想触手可及。", "good");
        n.pendingDecision = ipoDecision(n);
      }
      break;
    }
    case "endgame":
      break;
  }
  return n;
}

// ─── 用户访谈 ───────────────────────────────────────────────────────────────
function interviewDecision(): PendingDecision {
  return {
    kind: "interview",
    title: "用户访谈日",
    scene: `你在咖啡馆约到了 5 位潜在用户。第一次做访谈，你只有精力认真准备 3 个问题。选哪三个？（好的问题能挖出真实痛点，差的只能收获礼貌的谎言）`,
    choices: [], // UI 特殊处理：从题库选 3 个
  };
}

export function completeInterview(s: GameState, score: number): GameState {
  let n = { ...s };
  n.interviewScore = score;
  const productGain = 5 + score * 2.2;
  n.product = clamp(n.product + productGain, 0, 100);
  n = log(n, `访谈结束。有效洞察：${score}/9 分。痛点强度 ${score >= 6 ? "很强，有人当场想付定金" : score >= 3 ? "真实但不够锋利" : "多半是礼貌的客套"}。`, score >= 6 ? "good" : "info");
  n.tags = [...n.tags, "interviewed"];
  n.stage = "mvp";
  n = log(n, "⚒️ 进入 MVP 开发阶段。记住：MVP 不是简陋的产品，是「刚好能验证核心假设」的产品。", "system");
  n = log(n, "💡 创业课：The Mom Test —— 别问用户「你会买吗」，问「你现在怎么解决的」。行为证据永远大于口头恭维。", "info");
  return n;
}

// ─── 融资路演 ───────────────────────────────────────────────────────────────
// 多轮次融资阶梯：种子 → A → B → C（v1.5.1）。每轮金额与稀释递增，成功后驱动团队扩张。
export type Round = "seed" | "A" | "B" | "C";

const ROUND_NAMES: Record<Round, string> = { seed: "种子轮", A: "A轮", B: "B轮", C: "C轮" };
const ROUND_TITLES: Record<Round, string> = { seed: "🌱 种子轮路演", A: "📈 A 轮路演", B: "🚀 B 轮路演", C: "🏭 C 轮路演" };
// 各轮金额区间（万）与谈判后的稀释系数
const ROUND_CHECKS: Record<Round, [number, number]> = { seed: [0, 0], A: [500, 1500], B: [1000, 3000], C: [2500, 6000] };

function pitchDecision(s: GameState, round: Round): PendingDecision {
  const investor = pick(INVESTORS);
  const isSeed = round === "seed";
  let amount: number;
  let ask: number;
  if (isSeed) {
    amount = Math.round(randInt(investor.checkSize[0], investor.checkSize[1]) * (s.region.modifiers.fundingBonus ?? 1));
    ask = investor.ask;
  } else {
    amount = Math.round(randInt(ROUND_CHECKS[round][0], ROUND_CHECKS[round][1]) * (s.region.modifiers.fundingBonus ?? 1));
    // 轮次越往后，机构占比要求略降但金额更大
    ask = clamp(round === "A" ? Math.max(10, investor.ask - 5) : round === "B" ? clamp(investor.ask - 6, 8, 14) : clamp(investor.ask - 8, 6, 12), 6, 20);
  }
  const check: Record<string, number> = {
    营收数据: s.mrr * 2,
    市场规模: s.industry.fundingAppeal * 30,
    增长速度: s.users / 8,
    合规架构: s.tags.includes("licensed") ? 50 : 10,
    现金流健康度: s.cash,
    创始人魅力: s.reputation + (s.tags.includes("celebrity-founder") ? 20 : 0),
    战略协同: s.product,
    能否并表: s.team * 8,
  };
  const fitScore = (check[investor.preference] ?? 20) / 60;
  const cfBonus = s.cofounder?.trait === "mentor" ? 0.08 : 0;
  const realismPenalty = (s.difficulty ?? "standard") === "realism" ? -0.05 : 0;
  const winProb = clamp(0.35 + realismPenalty + cfBonus + fitScore * 0.5 + (s.tags.includes("backup-investors") ? 0.1 : 0), 0.1, 0.92);

  const roll = Math.random();
  const negRoll = Math.random();
  const acceptId = roll < winProb ? "accept" : "accept-anyway";
  const negId = negRoll < winProb * 0.55 ? "negotiate-up" : "negotiate-fail";
  const acceptText = `接受：${s.region.currency}${amount} 万换 ${ask}%`;
  const negText = `谈判：同金额但只给 ${Math.round(ask * 0.75)}%（可能谈崩）`;
  const growthHint = round === "B"
    ? "\n\n💼 B 轮的钱主要投向组织扩张：到账后团队预计翻倍，烧钱速度会显著加快。"
    : round === "C"
      ? "\n\n💼 C 轮是上市前最后一轮机构钱：投后你将开始接受投行、审计、律所的上市辅导尽调。"
      : "";

  return {
    kind: "pitch",
    round,
    title: ROUND_TITLES[round],
    scene: `${investor.name}（${investor.style}）听完了你的 20 分钟路演。对方最看重「${investor.preference}」。\n\n你的关键数据：MRR ${fmtMoney(s, s.mrr)} · 用户 ${s.users.toLocaleString()} · 产品完成度 ${Math.round(s.product)}% · 团队 ${s.team} 人\n\n对方开口：「我们最多出 ${s.region.currency}${amount} 万，要 ${ask}% 的股份。你可以考虑，但我下周还要见你的两个竞品。」${growthHint}`,
    investor: { ...investor, checkSize: [amount, amount], ask },
    choices: [
      { id: acceptId, text: acceptText, effects: {}, resultText: "" },
      { id: negId, text: negText, effects: {}, resultText: "" },
    ],
  };
}

export function resolvePitch(s: GameState, choiceId: string, investor: NonNullable<PendingDecision["investor"]>, round?: Round): GameState {
  let n = { ...s };
  const rd: Round = round ?? (n.stage === "seed" ? "seed" : "A");
  const amount = investor.checkSize[0];
  const ask = investor.ask;
  if (choiceId === "accept" || choiceId === "accept-anyway") {
    if (choiceId === "accept") {
      n.cash += amount;
      n.valuation = Math.max(n.valuation, amount / (ask / 100));
      n.raised = [...n.raised, { round: ROUND_NAMES[rd], amount, dilution: ask, investor: investor.name }];
      n = log(n, `🎉 ${investor.name} 打款 ${fmtMoney(n, amount)}！稀释 ${ask}%。`, "good");
      n.morale = clamp(n.morale + 12, 0, 100);
      n = applyRoundOutcome(n, rd);
    } else {
      n = log(n, `${investor.name} 婉拒了：「我们再看看。」（你的「${investor.preference}」数据不够打动对方）`, "bad");
      n.morale = clamp(n.morale - 8, 0, 100);
      n.eventCooldown = 2;
      n = log(n, "💡 创业课：融资是匹配游戏——基金有自己的赛道 thesis 和美元规模，被 100 家拒绝只说明匹配没发生，不代表你不行。Airbnb 曾被 7 个 YC 合伙人中的 5 个拒绝。", "info");
    }
  } else if (choiceId === "negotiate-up") {
    n.cash += amount;
    n.valuation = Math.max(n.valuation, amount / ((ask * 0.75) / 100));
    n.raised = [...n.raised, { round: ROUND_NAMES[rd], amount, dilution: Math.round(ask * 0.75), investor: investor.name }];
    n = log(n, `🎉 谈判成功！${fmtMoney(n, amount)} 到账，只稀释 ${Math.round(ask * 0.75)}%。`, "good");
    n.morale = clamp(n.morale + 15, 0, 100);
    n = applyRoundOutcome(n, rd);
  } else {
    n = log(n, `${investor.name} 脸色冷了下来：「这不是菜市场。」谈判破裂。`, "bad");
    n.morale = clamp(n.morale - 10, 0, 100);
    n.eventCooldown = 2;
  }
  n = checkEnding(n);
  return n;
}

// 融资成功后的阶段推进 + 团队扩张（钱到位 → 组织跟上，这是仿真多轮次的核心）
function applyRoundOutcome(n: GameState, rd: Round): GameState {
  let s: GameState = n;
  const growTeam = (min: number, max: number) => {
    const add = randInt(min, max);
    if (add > 0) {
      s.team += add;
      s = log(s, `📈 融资到位，团队从 ${s.team - add} 人扩张到 ${s.team} 人（工资单显著变厚——烧钱速度同步上升）。`, "system");
    }
  };
  switch (rd) {
    case "seed":
      s.stage = "growth";
      s = log(s, "🚀 进入增长期：招人、投放、迭代，烧钱的速度决定成长的速度。", "system");
      s.pendingDecision = hireDecision(s);
      break;
    case "A":
      s.stage = "scale";
      s.scaleRound = 0;
      growTeam(2, 4);
      s = log(s, "🏭 进入规模化阶段：B 轮（MRR≥60）与 C 轮（MRR≥100）的机构已在观望，组织必须跟上增长。", "system");
      s.pendingDecision = hireDecision(s);
      break;
    case "B":
      s.scaleRound = 1;
      growTeam(4, 7);
      break;
    case "C":
      s.scaleRound = 2;
      growTeam(6, 10);
      break;
  }
  return s;
}

// ─── 招聘 ───────────────────────────────────────────────────────────────────
function hireDecision(s: GameState): PendingDecision {
  const c1 = pick(CANDIDATES);
  let c2 = pick(CANDIDATES);
  while (c2.name === c1.name) c2 = pick(CANDIDATES);
  return {
    kind: "hire",
    title: "👥 关键招聘",
    scene: `业务起量了，你必须为关键岗位做决定。钱只够马上招一个，另一个岗位靠现有团队硬扛。`,
    candidate: c1,
    candidates: [c1, c2],
    choices: [
      { id: "h1", text: `招 ${c1.name}（${c1.role}）· 月薪 ${s.region.currency}${c1.salary}万 · ${c1.quirk}`, effects: {}, resultText: "" },
      { id: "h2", text: `招 ${c2.name}（${c2.role}）· 月薪 ${s.region.currency}${c2.salary}万 · ${c2.quirk}`, effects: {}, resultText: "" },
      { id: "none", text: "都不合适，再等等（本月错过招聘窗口）", effects: { months: 0 }, resultText: "" },
    ],
  };
}

export function resolveHire(s: GameState, choiceId: string, candidates: [Candidate, Candidate]): GameState {
  let n: GameState = { ...s, pendingDecision: null };
  if (choiceId === "none") {
    n = log(n, "你决定宁缺毋滥。团队的产出暂时承压，但人心没有散。", "info");
    return n;
  }
  const c = choiceId === "h1" ? candidates[0] : candidates[1];
  n.team += 1;
  n.cash -= c.salary * 3; // 签约成本
  if (c.good) {
    n.product = clamp(n.product + c.skill / 8, 0, 100);
    n.morale = clamp(n.morale + 8, 0, 100);
    n.mrr *= 1.15;
    n = log(n, `✅ ${c.name} 入职！${c.role} 到位，${c.skill > 85 ? "大神级" : "靠谱"}选手让团队士气大振。`, "good");
  } else {
    n.morale = clamp(n.morale - 10, 0, 100);
    n.product = clamp(n.product - 5, 0, 100);
    n.cash -= c.salary * 3;
    n = log(n, `⚠️ ${c.name} 入职后原形毕露：${c.quirk}。三个月后不得不补偿离职，白烧 ${fmtMoney(n, c.salary * 6)}。`, "bad");
    n.team -= 1;
    n = log(n, "💡 创业课：招聘错人的成本 = 6 个月工资 × 机会成本 + 团队士气损耗。Google 的规则：宁可错过，不可招错。「A 级人才会招来 A 级，B 级会招来 C 级」——这是乔布斯的用人铁律。", "info");
  }
  return n;
}

// ─── 事件触发 ───────────────────────────────────────────────────────────────
const STAGE_ORDER: Record<string, number> = { idea: 1, validate: 2, mvp: 3, seed: 3, growth: 4, seriesA: 5, scale: 5, endgame: 6 };

// 难度决定随机事件发生率：教学 22% / 标准 38% / 真实 50%
function eventChance(s: GameState): number {
  const d = s.difficulty ?? "standard";
  return d === "easy" ? 0.22 : d === "realism" ? 0.5 : 0.38;
}

// 剧本模式：按 ID 强制触发事件（无视阶段条件；已触发过则跳过，防止重复）
function triggerEventById(s: GameState, eventId: string): GameState {
  const ev = EVENTS.find((e) => e.id === eventId);
  if (!ev || s.tags.includes(`ev-${ev.id}`)) return s;
  let n = { ...s };
  n.tags = [...n.tags, `ev-${ev.id}`];
  n.eventCooldown = 1;
  n.pendingDecision = { kind: "event", eventId: ev.id, title: ev.title, scene: ev.scene, choices: ev.choices };
  return n;
}

function maybeTriggerEvent(s: GameState): GameState {
  const stageNum = STAGE_ORDER[s.stage];
  // 🥚 彩蛋/专属事件：weight 为 0 不走随机池，条件满足时优先触发（剧本事件 sc- 除外，由固定队列调度）
  const egg = EVENTS.find((ev) =>
    !ev.id.startsWith("sc-") &&
    (ev.id.startsWith("egg-") || ev.weight === 0) &&
    !s.tags.includes(`ev-${ev.id}`) &&
    stageNum >= ev.minStage &&
    (!ev.maxStage || stageNum <= ev.maxStage) &&
    (!ev.condition || ev.condition(s))
  );
  if (egg && Math.random() < 0.5) {
    let n = { ...s };
    n.tags = [...n.tags, `ev-${egg.id}`];
    n.eventCooldown = 2;
    n.pendingDecision = { kind: "event", eventId: egg.id, title: egg.title, scene: egg.scene, choices: egg.choices };
    return n;
  }
  const eligible = EVENTS.filter((ev) => {
    if (ev.id.startsWith("egg-") || ev.weight <= 0) return false; // 彩蛋/专属事件不走随机池
    if (ev.once && s.tags.includes(`ev-${ev.id}`)) return false;
    if (stageNum < ev.minStage) return false;
    if (ev.maxStage && stageNum > ev.maxStage) return false;
    if (ev.condition && !ev.condition(s)) return false;
    return true;
  });
  if (!eligible.length || Math.random() > eventChance(s)) return s;
  const totalW = eligible.reduce((a, e) => a + e.weight, 0);
  let r = Math.random() * totalW;
  let chosen = eligible[0];
  for (const ev of eligible) {
    r -= ev.weight;
    if (r <= 0) { chosen = ev; break; }
  }
  let n = { ...s };
  if (chosen.once) n.tags = [...n.tags, `ev-${chosen.id}`];
  n.eventCooldown = 2;
  n.pendingDecision = {
    kind: "event",
    eventId: chosen.id,
    title: chosen.title,
    scene: chosen.scene,
    choices: chosen.choices,
  };
  return n;
}

// ─── 终局决策 ───────────────────────────────────────────────────────────────
function ipoDecision(s: GameState): PendingDecision {
  const teamWarn = s.team < 10 ? `\n\n⚠️ 投行尽职调提醒你：上市公司需要健全的组织治理，团队至少 10 人（当前 ${s.team} 人），否则发审环节大概率被质疑「持续经营能力」。` : "";
  return {
    kind: "ipo",
    title: "🏛️ 命运的十字路口",
    scene: `投行、律所、审计师都到位了。上市申请材料一递，你的公司将接受全世界的审视。上市费用约 ${fmtMoney(s, s.valuation * 0.08)}，且之后每季度都要对华尔街交卷。\n\n当然，你也可以选择另一条路——把公司卖给那个出价 ${fmtMoney(s, s.valuation * 1.6)} 的巨头。${teamWarn}`,
    choices: [
      { id: "ipo", text: "冲刺 IPO：我要敲钟", effects: {}, resultText: "" },
      { id: "sell", text: `接受收购报价 ${fmtMoney(s, s.valuation * 1.6)}`, effects: {}, resultText: "" },
      { id: "hold", text: "再养一年，把营收做厚", effects: { months: 6 }, resultText: "你把两家公司都婉拒了。团队震惊，但你知道自己在做什么——好饭不怕晚。" },
    ],
  };
}

export function resolveEndgame(s: GameState, choiceId: string): GameState {
  let n = { ...s };
  if (choiceId === "ipo") {
    const success = n.mrr > 100 && n.reputation > -10 && !n.tags.includes("toxic-terms") && n.health > 25 && n.team >= 10;
    if (success) {
      n = finishGame(n, "ipo");
    } else {
      n.cash -= n.valuation * 0.06;
      const reason = n.team < 10 ? `「公司治理不健全：${n.team} 人的团队撑不起上市公司的运作」` : "「持续盈利能力存疑」";
      n = log(n, `💥 IPO 审核被拒！${reason}。上市费用打了水漂，市场开始唱衰你。`, "bad");
      n.reputation = clamp(n.reputation - 15, -100, 100);
      n.morale = clamp(n.morale - 15, 0, 100);
      n.stage = "scale";
      n.pendingDecision = null;
      n = checkEnding(n);
    }
  } else if (choiceId === "sell") {
    n = finishGame(n, "acquired");
  } else {
    n.month += 6;
    n.year = (n.scenario?.year ?? START_YEAR) + Math.floor(n.month / 12);
    n.cash += n.mrr * 5;
    n.product = clamp(n.product + 8, 0, 100);
    n = log(n, "半年后，你的营收翻了近一倍。资本市场上，你的故事更贵了。", "good");
    if (n.valuation >= 5000 && n.mrr >= 200 && n.team >= 10) n = finishGame(n, "ipo");
    else {
      n.pendingDecision = ipoDecision(n);
      n.stage = "endgame";
    }
  }
  return n;
}

export function finishGame(s: GameState, endingId: string): GameState {
  const base = ENDINGS[endingId];
  clearSave(); // 对局结束，清掉进行中的存档
  // 通关解锁：完成任意一局且不跑路（欠债跑路除外），解锁隐藏职业「天使投资人」
  if (endingId !== "runaway") {
    try { localStorage.setItem("fj_angel_unlocked", "1"); } catch { /* ignore */ }
  }
  // 连续创业者计数：累计通关 3 局后，新开局获得「老兵光环」彩蛋
  try {
    const done = parseInt(localStorage.getItem("fj_completions") || "0", 10) + 1;
    localStorage.setItem("fj_completions", String(done));
  } catch { /* ignore */ }
  // 匿名通关统计上报（fire-and-forget，失败静默）+ 本地生涯记录
  try {
    const report = {
      endingId, grade: base.grade, months: s.month,
      industryId: s.industry.id, regionId: s.region.id,
      valuation: Math.round(s.valuation), mrr: Math.round(s.mrr),
      eggCount: s.tags.filter((t) => t.startsWith("egg-")).length,
      difficulty: s.difficulty ?? "standard",
      scenarioId: s.scenario?.id,
    };
    reportRun(report);
    recordRun(loadCareer(), report);
  } catch { /* 绝不影响游戏 */ }
  const ending: Ending = {
    ...base,
    stats: [
      { label: "创业时长", value: `${Math.floor(s.month / 12)} 年 ${s.month % 12} 个月` },
      { label: "最终估值", value: fmtMoney(s, s.valuation) },
      { label: "累计融资", value: fmtMoney(s, s.raised.reduce((a, r) => a + r.amount, 0)) },
      { label: "月营收 (MRR)", value: fmtMoney(s, s.mrr) },
      { label: "用户规模", value: s.users.toLocaleString() },
      { label: "团队规模", value: `${s.team} 人` },
      { label: "融资轮次", value: s.raised.map((r) => r.round).join(" → ") || "未融资" },
    ],
  };
  return { ...s, alive: false, speed: 0, ending, pendingDecision: null };
}

// ─── 结局检查 ───────────────────────────────────────────────────────────────
function checkEnding(s: GameState): GameState {
  if (!s.alive) return s;
  let n = s;
  if (n.health <= 0) return finishGame(n, "burnout");
  if (n.morale <= 0 && n.cash < 5) return finishGame(n, "shutdown");
  if (n.debt > 120) {
    return finishGame(n, "runaway");
  }
  if (n.debt > 60 && n.cash <= 0 && n.mrr < n.industry.baseBurn) {
    // 债务深重且看不到收入：破产清算
    return finishGame(n, "bankrupt");
  }
  if (n.month > 96) {
    // 8 年仍未上市：按估值给结局
    if (n.valuation > 1500) return finishGame(n, "acquihire");
    return finishGame(n, "shutdown");
  }
  return n;
}

// ─── 主动操作 ───────────────────────────────────────────────────────────────
export function adjustBudget(s: GameState, key: "rd" | "marketing" | "sales", delta: number): GameState {
  const b = { ...s.budget };
  b[key] = clamp(b[key] + delta, 0, 100);
  // 保持总和 100
  const others = (["rd", "marketing", "sales"] as const).filter((k) => k !== key);
  const otherSum = b[others[0]] + b[others[1]];
  if (otherSum > 0) {
    const scale = (100 - b[key]) / otherSum;
    b[others[0]] = Math.round(b[others[0]] * scale);
    b[others[1]] = 100 - b[key] - b[others[0]];
  } else {
    b[others[0]] = Math.round((100 - b[key]) / 2);
    b[others[1]] = 100 - b[key] - b[others[0]];
  }
  return { ...s, budget: b };
}

// 滑杆直接设定某一项（按 5% 取整，其余两项等比例缩放，总和保持 100）
export function setBudgetAbs(s: GameState, key: "rd" | "marketing" | "sales", value: number): GameState {
  const b = { ...s.budget };
  b[key] = clamp(Math.round(value / 5) * 5, 0, 100);
  const others = (["rd", "marketing", "sales"] as const).filter((k) => k !== key);
  const rest = 100 - b[key];
  const otherSum = b[others[0]] + b[others[1]];
  if (otherSum > 0) {
    const scale = rest / otherSum;
    b[others[0]] = Math.round((b[others[0]] * scale) / 5) * 5;
    b[others[1]] = rest - b[others[0]];
  } else {
    b[others[0]] = Math.round(rest / 2 / 5) * 5;
    b[others[1]] = rest - b[others[0]];
  }
  b[others[1]] = clamp(b[others[1]], 0, 100);
  b[others[0]] = 100 - b[key] - b[others[1]];
  return { ...s, budget: b };
}

export function shutdownCompany(s: GameState): GameState {
  return finishGame(s, s.debt > 30 ? "bankrupt" : "shutdown");
}

export function currentRunway(s: GameState): number {
  const burn = Math.max(0.1, monthlyBurn(s) - s.mrr);
  return s.cash / burn;
}

export function monthlyBurn(s: GameState): number {
  const mod = s.region.modifiers;
  const salaries = s.team * 1.8 * (mod.talentPool ?? 1) + (s.team - 1) * 0.4;
  const marketingBurn = s.product >= 40 ? s.budget.marketing * 0.15 : s.budget.marketing * 0.05;
  return (s.industry.baseBurn + salaries + marketingBurn) * (mod.burnMultiplier ?? 1) + industryExtraBurn(s);
}

// ─── 行业特性：差异化月度开销 ────────────────────────────────────────────────
// 不同赛道有不同的「日常真实」：
//   硬件  → 备货占款：MRR 的 30% 要投入下一批生产（库存吞现金）
//   软件  → 云账单：用户越多服务器越贵（规模不经济）
//   跨境  → 物流仓储：随单量线性增长（运费吃掉薄毛利）
//   金融  → 合规成本：拿牌照后每月 2.5 万的持续风控合规开销
function industryExtraBurn(s: GameState): number {
  const id = s.industry.id;
  const modMul = s.region.modifiers.burnMultiplier ?? 1;
  if (id === "hardware" && s.mrr > 5) return s.mrr * 0.3;
  if ((id === "ai" || id === "consumer") && s.users > 500) return s.users * 0.0004 * modMul;
  if (id === "ecom" && s.users > 300) return s.users * 0.0008 * modMul;
  if (id === "fintech") return s.tags.includes("licensed") ? 2.5 : 1;
  return 0;
}
