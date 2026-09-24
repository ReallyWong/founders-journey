// ─── 创业人生 · 核心类型定义 ────────────────────────────────────────────────

export type Gender = "male" | "female";
export type Difficulty = "easy" | "standard" | "realism";

// ─── 联合创始人 ─────────────────────────────────────────────────────────────
export interface Cofounder {
  id: string;
  name: string;
  role: string;
  trait: "tech" | "sales" | "mentor";
  desc: string;
  bonus: string; // 被动加成的人类可读说明
}

// ─── 剧本模式 ───────────────────────────────────────────────────────────────
export interface ScenarioDef {
  id: string;
  title: string;
  year: number;
  tagline: string;
  realHistory: string;
  regionId: string;
  industryId: string;
  startCash: number;
  endingHint: string;
  queue: { month: number; eventId: string }[]; // 固定事件链（月份 → 事件ID）
  finalEventId: string;
}

export interface Region {
  id: string;
  name: string;
  flag: string;
  city: string;
  currency: string; // 显示符号
  description: string;
  modifiers: Partial<Record<ModKey, number>>;
  investorScene: string; // 当地投资生态描述
  pros: string[];
  cons: string[];
  unlock?: "finish_any" | "grade_A" | "runs5"; // 成就解锁条件
  unlockHint?: string; // 解锁提示文案
}

export type ModKey =
  | "fundingBonus" // 融资环境加成（乘数）
  | "burnMultiplier" // 烧钱速度
  | "talentPool" // 人才供给
  | "marketAccess" // 市场准入
  | "regRisk"; // 监管风险概率加成

export interface Industry {
  id: string;
  name: string;
  icon: string;
  description: string;
  baseBurn: number; // 每月基础开销（含创始人生活费）
  baseUsers: number; // MVP 后初始获客速度
  revenuePerUser: number; // 单用户月收入贡献（开始时）
  productDifficulty: number; // 产品开发难度系数
  fundingAppeal: number; // 投资人偏好
  regRisk: number; // 行业监管风险 0-1
  locked?: boolean; // 是否需要通关解锁
  startCash?: number; // 自定义初始资金（隐藏职业）
  mechanic?: string; // 行业专属机制一句话说明（创建界面展示）
}

export interface Choice {
  id: string;
  text: string;
  detail?: string;
  effects: Effects;
  resultText: string; // 选择后的叙事结果
  lesson?: string; // 创业课
  lessonTitle?: string;
  condition?: (s: GameState) => boolean;
}

export interface Effects {
  cash?: number; // 直接现金变化（万）
  cashMult?: number;
  product?: number;
  users?: number; // 百分比或绝对
  usersPct?: number;
  mrrPct?: number;
  morale?: number;
  health?: number;
  reputation?: number;
  debt?: number;
  valuationPct?: number;
  team?: number; // 人数变化
  months?: number; // 消耗月份（时间推进）
  flag?: string; // 设置标记
  addTag?: string;
  endingId?: string; // 直接终结对局（剧本模式专用）
  portfolioAdd?: string; // 记入投资组合（VC/PE、天使行业）
}

export interface GameEvent {
  id: string;
  title: string;
  scene: string; // 场景描述（美剧式叙事）
  minStage: number;
  maxStage?: number;
  weight: number;
  once?: boolean;
  condition?: (s: GameState) => boolean;
  choices: Choice[];
}

export interface Investor {
  name: string;
  type: "angel" | "vc" | "corporate";
  style: string;
  checkSize: [number, number]; // 万
  ask: number; // 要求股份 %
  preference: string; // 看重的点
}

export interface Candidate {
  name: string;
  role: string;
  salary: number; // 万/月
  skill: number; // 0-100
  loyalty: number;
  quirk: string; // 性格特点/隐患
  good: boolean; // 是否值得招
}

export type StageId =
  | "idea" // 灵感期
  | "validate" // 需求验证
  | "mvp" // MVP 开发
  | "seed" // 种子轮融资
  | "growth" // 增长期
  | "seriesA" // A 轮
  | "scale" // B轮+扩张
  | "endgame"; // 上市/退出

export interface GameState {
  // 角色
  name: string;
  gender: Gender;
  region: Region;
  industry: Industry;
  // v1.5：难度 / 合伙人 / 剧本
  difficulty?: Difficulty;
  cofounder?: Cofounder;
  scenario?: { id: string; year: number; queue: { month: number; eventId: string }[] };
  // 时间
  month: number; // 从 0 开始
  year: number;
  season: string;
  // 资源
  cash: number;
  valuation: number;
  product: number; // 0-100
  users: number;
  mrr: number;
  morale: number; // 0-100
  health: number; // 0-100
  reputation: number; // -100 ~ 100
  debt: number;
  team: number; // 人数（含创始人）
  // 阶段
  stage: StageId;
  stageProgress: number;
  // 状态
  tags: string[]; // 一次性事件标记、flag
  log: LogEntry[];
  alive: boolean;
  ending?: Ending;
  // 融资历史
  raised: { round: string; amount: number; dilution: number; investor: string }[];
  // v1.5.1：规模化阶段的多轮次融资进度（0=待B轮 1=待C轮 2=已完成）
  scaleRound?: number;
  // v1.5：投资组合（VC/PE、天使行业记账）
  portfolio?: string[];
  // 本轮决策
  pendingDecision: PendingDecision | null;
  lastEventId?: string;
  // 连续事件冷却
  eventCooldown: number;
  // 访谈得分
  interviewScore?: number;
  // 月度预算分配
  budget: { rd: number; marketing: number; sales: number };
  speed: 0 | 1 | 2 | 3; // 0=暂停 1=1x 2=2x 3=4x
}

export interface LogEntry {
  month: number;
  text: string;
  type: "info" | "good" | "bad" | "system" | "money";
}

export interface PendingDecision {
  kind: "event" | "pitch" | "hire" | "interview" | "shutdown" | "ipo" | "acquire" | "funding";
  eventId?: string;
  title: string;
  scene: string;
  choices: Choice[];
  investor?: Investor;
  candidate?: Candidate;
  candidates?: [Candidate, Candidate];
  round?: "seed" | "A" | "B" | "C"; // 融资轮次（pitch 专用）
}

export interface Ending {
  id: string;
  title: string;
  grade: "S" | "A" | "B" | "C" | "D" | "F";
  narrative: string;
  lesson: string;
  stats: { label: string; value: string }[];
}
