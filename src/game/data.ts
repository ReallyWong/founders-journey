// ─── 创业人生 · 游戏数据（地区/行业/事件/投资人/候选人/结局） ─────────────
import type {
  Region, Industry, GameEvent, Investor, Candidate, Ending, Cofounder, ScenarioDef,
} from "./types";

// ─── 出身地 ─────────────────────────────────────────────────────────────────
export const REGIONS: Region[] = [
  {
    id: "shenzhen",
    name: "亚洲 · 中国深圳",
    flag: "🇨🇳",
    city: "深圳 · 华强北",
    currency: "¥",
    description:
      "硬件天堂与草根创业圣地。供应链一应俱全，晚上十点写字楼还亮着灯。竞争激烈，资本精明。",
    modifiers: { fundingBonus: 0.9, burnMultiplier: 0.85, talentPool: 1.2, marketAccess: 1.1, regRisk: 0.15 },
    investorScene: "人民币基金居多，问营收和利润比问梦想多。",
    pros: ["供应链完整，成本低", "执行速度快", "工程师勤奋且相对便宜"],
    cons: ["融资环境偏谨慎", "巨头抄袭阴影", "监管政策多变"],
  },
  {
    id: "singapore",
    name: "亚洲 · 新加坡",
    flag: "🇸🇬",
    city: "新加坡 · 珊顿道",
    currency: "S$",
    description:
      "东南亚桥头堡。政府补贴慷慨，法治健全，英语通行。市场小，但辐射六亿人口的东南亚。",
    modifiers: { fundingBonus: 1.0, burnMultiplier: 1.1, talentPool: 0.8, marketAccess: 1.2, regRisk: 0.05 },
    investorScene: "政府基金（EDB）与东南亚美元基金活跃，重合规。",
    pros: ["政府有 grants 补贴", "东南亚市场准入好", "法律透明"],
    cons: ["本地市场极小", "人才贵且稀缺"],
  },
  {
    id: "berlin",
    name: "欧洲 · 德国柏林",
    flag: "🇩🇪",
    city: "柏林 · 克罗伊茨贝格",
    currency: "€",
    description:
      "欧洲创业之都。租金曾是全欧最低，工程师密度极高。融资节奏慢，但公司活得久。",
    modifiers: { fundingBonus: 0.85, burnMultiplier: 0.9, talentPool: 1.1, marketAccess: 1.0, regRisk: 0.1 },
    investorScene: "欧洲 VC 谨慎，尽调长达半年，但一旦投资就很长情。",
    pros: ["技术人才多且稳", "生活成本低", "欧盟单一市场"],
    cons: ["融资额普遍偏小", "扩张文化保守"],
  },
  {
    id: "london",
    name: "欧洲 · 英国伦敦",
    flag: "🇬🇧",
    city: "伦敦 · 肖尔迪奇",
    currency: "£",
    description:
      "金融科技之城。资本密集，人才国际化，脱欧后依旧活跃。什么都贵。",
    modifiers: { fundingBonus: 1.1, burnMultiplier: 1.35, talentPool: 1.0, marketAccess: 1.0, regRisk: 0.1 },
    investorScene: "机构密集，从天使到 PE 一条龙，fintech 尤其受追捧。",
    pros: ["金融人才与资本集中", "英语国际化", "退出渠道多"],
    cons: ["人力和房租极贵", "生活成本高"],
  },
  {
    id: "silicon",
    name: "美国 · 硅谷",
    flag: "🇺🇸",
    city: "帕洛阿尔托 · 大学街",
    currency: "$",
    description:
      "创业宇宙中心。VC 在街上排队给你塞 term sheet，但烧钱速度也是宇宙第一。",
    modifiers: { fundingBonus: 1.5, burnMultiplier: 1.5, talentPool: 1.3, marketAccess: 1.1, regRisk: 0.05 },
    investorScene: "YC 系基金成群，Pre-seed 都能拿百万美元，但下一个赛道对手也在隔壁车库。",
    pros: ["融资体量全球最大", "人才密度最高", "退出市场成熟"],
    cons: ["烧钱速度惊人", "竞争最残酷", "签证和合规成本高"],
  },
  {
    id: "austin",
    name: "美国 · 德州奥斯汀",
    flag: "🤠",
    city: "奥斯汀 · 南国会大道",
    currency: "$",
    description:
      "硅谷出走者的新家。零州税，房价只有湾区三分之一，特斯拉和甲骨文都搬来了。",
    modifiers: { fundingBonus: 1.15, burnMultiplier: 0.95, talentPool: 1.0, marketAccess: 0.95, regRisk: 0.05 },
    investorScene: "本地基金规模中等，但很多湾区基金现在愿意远程投德州项目。",
    pros: ["生活成本远低于湾区", "税收优惠", "新兴技术人才流入"],
    cons: ["本地 VC 体量有限", "部分客户资源在东西海岸"],
  },
  {
    id: "beijing",
    name: "亚洲 · 中国北京",
    flag: "🏯",
    city: "北京 · 中关村",
    currency: "¥",
    description:
      "资本与政策的心脏。顶尖高校云集，大厂总部林立，车库咖啡里的每个座位都可能坐着下一个独角兽。",
    modifiers: { fundingBonus: 1.1, burnMultiplier: 1.25, talentPool: 1.2, marketAccess: 1.0, regRisk: 0.1 },
    investorScene: "美元基金与人民币头部基金的双总部，国企战投活跃，路演必问政策与格局。",
    pros: ["清华北大等顶尖人才", "政策与央企资源集中", "头部创投机构密度高"],
    cons: ["房租人力成本高", "大厂虹吸效应强", "通勤与生活压力大"],
  },
  {
    id: "shanghai",
    name: "亚洲 · 中国上海",
    flag: "🌆",
    city: "上海 · 张江",
    currency: "¥",
    description:
      "金融与国际化之城。外资 corporate 与人民币基金同样活跃，契约精神强，离钱近，也离竞争近。",
    modifiers: { fundingBonus: 1.1, burnMultiplier: 1.2, talentPool: 1.1, marketAccess: 1.15, regRisk: 0.08 },
    investorScene: "外资 VC 与人民币基金均衡分布，尽调专业，重商业模式与盈利路径。",
    pros: ["国际化与外资资源", "金融人才密集", "商业契约精神强"],
    cons: ["综合成本高", "竞争节奏极快", "对盈利要求更现实"],
  },
  {
    id: "nyc",
    name: "美国 · 纽约",
    flag: "🗽",
    city: "纽约 · 硅巷",
    currency: "$",
    description:
      "世界之都的硅巷。金融、媒体、广告科技与时尚交汇，资本密度不输硅谷，烧钱速度也不输。",
    modifiers: { fundingBonus: 1.35, burnMultiplier: 1.45, talentPool: 1.2, marketAccess: 1.1, regRisk: 0.05 },
    investorScene: "从 Union Square 到 SoHo，VC 密度极高，fintech 与媒体科技备受追捧。",
    pros: ["全球资本顶点", "媒体与行业资源无敌", "退出市场成熟"],
    cons: ["全球最贵城市之一", "竞争白热化", "签证与合规成本高"],
  },
  {
    id: "hongkong",
    name: "亚洲 · 中国香港",
    flag: "🇭🇰",
    city: "香港 · 中环",
    currency: "HK$",
    description:
      "东方之珠的融资走廊。普通法体系、自由资金进出、离岸人民币枢纽——通往中国与世界的中转站。",
    modifiers: { fundingBonus: 1.2, burnMultiplier: 1.3, talentPool: 1.0, marketAccess: 1.2, regRisk: 0.08 },
    investorScene: "家族办公室与对冲基金密度全球第一，跨境架构玩家的主场。",
    pros: ["资金自由进出", "法治与国际信用", "辐射内地与东南亚"],
    cons: ["租金人力高昂", "本地市场小", "赛道偏金融地产"],
    unlock: "finish_any",
    unlockHint: "完成任意一局解锁",
  },
  {
    id: "tokyo",
    name: "亚洲 · 日本东京",
    flag: "🇯🇵",
    city: "东京 · 涩谷",
    currency: "JP¥",
    description:
      "深科技之城。机器人、材料、游戏与消费硬件的隐形冠军聚集地，融资保守但客户付费意愿极强。",
    modifiers: { fundingBonus: 0.95, burnMultiplier: 1.2, talentPool: 1.05, marketAccess: 1.0, regRisk: 0.08 },
    investorScene: "VC 决策慢但长情，大企业 CVC 活跃，最看重技术与专利壁垒。",
    pros: ["客户付费意愿全球顶级", "技术积淀深厚", "企业客户忠诚度高"],
    cons: ["融资节奏慢", "语言与文化门槛", "官僚流程繁琐"],
    unlock: "grade_A",
    unlockHint: "达成 A 级以上结局解锁",
  },
  {
    id: "israel",
    name: "中东 · 以色列特拉维夫",
    flag: "🇮🇱",
    city: "特拉维夫 · 罗斯柴尔德大道",
    currency: "₪",
    description:
      "创业国度。人均初创密度全球第一，8200 部队出身的安全与芯片天才满街都是，出口导向，天生全球化。",
    modifiers: { fundingBonus: 1.1, burnMultiplier: 1.15, talentPool: 1.3, marketAccess: 0.85, regRisk: 0.1 },
    investorScene: "VC 密度全球第二，被巨头收购是主流退出方式，尽调极其硬核。",
    pros: ["工程师密度与战斗力顶级", "全球化基因", "退出市场成熟"],
    cons: ["本地市场极小", "地缘风险", "高盐高日照以外生活成本不低"],
    unlock: "runs5",
    unlockHint: "累计创业 5 局解锁",
  },
];

// ─── 行业 ───────────────────────────────────────────────────────────────────
export const INDUSTRIES: Industry[] = [
  {
    id: "ai",
    name: "AI SaaS 工具",
    icon: "🤖",
    description: "用大模型给企业卖铲子。投资人当下最爱，但三个月后赛道可能挤满一百个你。",
    baseBurn: 3.5,
    baseUsers: 320,
    revenuePerUser: 0.012,
    productDifficulty: 1.1,
    fundingAppeal: 1.5,
    regRisk: 0.05,
    mechanic: "☁️ 用户超 500 后每月产生云账单——规模越大越贵",
  },
  {
    id: "ecom",
    name: "跨境电商品牌",
    icon: "📦",
    description: "把中国供应链卖给全世界。现金流扎实但毛利薄，物流和关税是命门。",
    baseBurn: 2.8,
    baseUsers: 600,
    revenuePerUser: 0.006,
    productDifficulty: 0.7,
    fundingAppeal: 0.8,
    regRisk: 0.15,
    mechanic: "📦 用户超 300 后每月物流仓储费随单量增长",
  },
  {
    id: "fintech",
    name: "金融科技",
    icon: "💳",
    description: "用技术重构支付、借贷或理财。客单价高，牌照和合规是生死线。",
    baseBurn: 4,
    baseUsers: 150,
    revenuePerUser: 0.03,
    productDifficulty: 1.2,
    fundingAppeal: 1.2,
    regRisk: 0.4,
    mechanic: "💳 监管风险最高；拿牌照后有每月固定合规开销",
  },
  {
    id: "consumer",
    name: "消费级 App",
    icon: "📱",
    description: "做一款让人上瘾的 C 端应用。爆发力强，但护城河往往只有一层窗户纸。",
    baseBurn: 3,
    baseUsers: 2000,
    revenuePerUser: 0.002,
    productDifficulty: 0.9,
    fundingAppeal: 1.0,
    regRisk: 0.1,
    mechanic: "☁️ 用户超 500 后每月产生云账单",
  },
  {
    id: "hardware",
    name: "智能硬件",
    icon: "🔧",
    description: "从原型到量产是一道鬼门关。库存会吃掉你所有现金，成功了则是硬件的护城河。（起步资金更高，但烧钱也更猛）",
    startCash: 30,
    baseBurn: 4.5,
    baseUsers: 80,
    revenuePerUser: 0.05,
    productDifficulty: 1.4,
    fundingAppeal: 0.9,
    regRisk: 0.1,
    mechanic: "🏭 起步 30 万；每月 30% 营收被备货占款",
  },
  {
    id: "game",
    name: "游戏工作室",
    icon: "🎮",
    description: "做一款让人熬夜的好游戏。爆款回报惊人，但版号、渠道分成和爆款概率是三重生死门。",
    baseBurn: 3.2,
    baseUsers: 1500,
    revenuePerUser: 0.004,
    productDifficulty: 1.0,
    fundingAppeal: 1.0,
    regRisk: 0.3,
    mechanic: "🎮 研发预算 ≥30% 才能维持内容产能，否则玩家持续流失",
  },
  {
    id: "traditional",
    name: "传统行业",
    icon: "🍜",
    description: "餐饮连锁或实业制造的硬核路线。现金流扎实、慢热，资本不追捧，但也死得慢。",
    baseBurn: 2.5,
    baseUsers: 300,
    revenuePerUser: 0.02,
    productDifficulty: 0.6,
    fundingAppeal: 0.6,
    regRisk: 0.05,
    mechanic: "🍜 现金流扎实、慢热抗造；资本不追捧但也死得慢",
  },
  {
    id: "angel",
    name: "天使投资人",
    icon: "😇",
    description: "隐藏职业：用上一次创业攒下的弹药转型投资人。项目少而精，单笔回报惊人，全看眼光。",
    baseBurn: 2.0,
    baseUsers: 40,
    revenuePerUser: 0.15,
    productDifficulty: 0.8,
    fundingAppeal: 0.5,
    regRisk: 0.05,
    mechanic: "😇 项目少而精、单笔回报惊人；初始资金 120 万",
    locked: true,
    startCash: 120,
  },
  {
    id: "energy",
    name: "工业能源",
    icon: "⚡",
    description: "储能、光伏与工业软件的硬骨头路线。单子大、周期长、强监管，但一旦站稳就是十年护城河。",
    baseBurn: 4.2,
    baseUsers: 60,
    revenuePerUser: 0.06,
    productDifficulty: 1.5,
    fundingAppeal: 0.9,
    regRisk: 0.3,
    mechanic: "⚡ 客单价高但开发极慢（难度 1.5×）；政策与补贴事件多发",
  },
  {
    id: "biotech",
    name: "生物制药",
    icon: "💊",
    description: "十年磨一剑的豪华赌局。研发周期极长、临床关卡重重，但一款重磅药的回报足以买下一家公司。",
    baseBurn: 5,
    baseUsers: 20,
    revenuePerUser: 0.2,
    productDifficulty: 1.6,
    fundingAppeal: 1.3,
    regRisk: 0.45,
    mechanic: "💊 烧钱最猛、开发最难（1.6×）；单用户价值最高，熬出来就是印钞机",
  },
  {
    id: "entertainment",
    name: "影视文娱",
    icon: "🎬",
    description: "爆款驱动的内容生意。一部爆款吃三年，三部扑街回原点——抗风险全靠项目组合的命中率。",
    baseBurn: 3,
    baseUsers: 800,
    revenuePerUser: 0.005,
    productDifficulty: 0.9,
    fundingAppeal: 0.9,
    regRisk: 0.2,
    mechanic: "🎬 用户基数大爆发力强；收入波动剧烈，靠作品命中率吃饭",
  },
  {
    id: "vcpe",
    name: "VC/PE 基金",
    icon: "💼",
    description: "隐藏职业：不看报表看项目。募资、尽调、投决、退出——LP 的钱在你手里变成别人公司的股份，组合的回报道尽周期冷暖。",
    baseBurn: 3.5,
    baseUsers: 10,
    revenuePerUser: 0.5,
    productDifficulty: 1.0,
    fundingAppeal: 0.3,
    regRisk: 0.1,
    locked: true,
    startCash: 200,
    mechanic: "💼 初始 200 万；「客户」是你投的项目——会不定期带来回报，也会爆雷",
  },
];

// ─── 投资人池 ───────────────────────────────────────────────────────────────
export const INVESTORS: Investor[] = [
  { name: "陈总 · 某人民币基金", type: "angel", style: "产业老兵，话少钱多", checkSize: [100, 300], ask: 12, preference: "营收数据" },
  { name: "KPCB 式老牌基金 · 张Partner", type: "vc", style: "经典美元基金，讲赛道论", checkSize: [300, 800], ask: 18, preference: "市场规模" },
  { name: "YC 式加速器合伙人", type: "vc", style: "只看团队和增长曲线", checkSize: [50, 150], ask: 8, preference: "增长速度" },
  { name: "某大厂战投部", type: "corporate", style: "微笑背后是想把你也收了", checkSize: [200, 600], ask: 15, preference: "战略协同" },
  { name: "东南亚主权基金代表", type: "vc", style: "问合规问到你想哭", checkSize: [200, 500], ask: 14, preference: "合规架构" },
  { name: "欧洲家族办公室 · 冯·xx 先生", type: "angel", style: "_old money_，尽调半年", checkSize: [50, 200], ask: 10, preference: "现金流健康度" },
  { name: "硅谷明星 Solo Capital", type: "angel", style: "前独角兽创始人，动作快", checkSize: [100, 400], ask: 10, preference: "创始人魅力" },
  { name: "某上市公司战投", type: "corporate", style: "带着订单来，也带着锁链", checkSize: [150, 500], ask: 12, preference: "能否并表" },
];

// ─── 候选人池 ───────────────────────────────────────────────────────────────
export const CANDIDATES: Candidate[] = [
  { name: "阿凯", role: "全栈工程师", salary: 2.2, skill: 88, loyalty: 70, quirk: "前大厂 P8，降薪跟你干，但要求期权明确", good: true },
  { name: "Lena", role: "增长负责人", salary: 3.0, skill: 85, loyalty: 60, quirk: "数据驱动，之前把两家初创做到百万用户", good: true },
  { name: "老周", role: "供应链总监", salary: 2.0, skill: 80, loyalty: 85, quirk: "传统行业二十年，不懂互联网但极其靠谱", good: true },
  { name: "小唐", role: "前端工程师", salary: 1.2, skill: 55, loyalty: 50, quirk: "简历漂亮，面试时发现八股文背得比代码好", good: false },
  { name: "Max", role: "海外 BD", salary: 2.8, skill: 75, loyalty: 40, quirk: "嘴上全是资源，问细节就含糊", good: false },
  { name: "苏苏", role: "产品经理", salary: 2.5, skill: 82, loyalty: 75, quirk: "用户同理心极强，会怼老板但总是对的", good: true },
  { name: "Viktor", role: "算法工程师", salary: 3.5, skill: 92, loyalty: 55, quirk: "技术极强，但要求远程+四天工作制", good: true },
  { name: "马哥", role: "销售 VP", salary: 3.2, skill: 78, loyalty: 45, quirk: "承诺半年带你见完所有客户，名片厚得能防身", good: false },
];

// ─── 随机事件库 ─────────────────────────────────────────────────────────────
// 灵感自真实创业史：硅谷剧集、精益创业、真实公司案例的改编。
export const EVENTS: GameEvent[] = [
  {
    id: "cofounder-fight",
    title: "联合创始人撕逼",
    scene:
      "凌晨两点，你的联合创始人把电脑摔在桌上：「为什么股权 5:5，干活的却都是我？」他/她要求重新分配股权，否则退出。空气凝固了。",
    minStage: 2, weight: 8, once: true,
    condition: (s) => !s.tags.includes("solo"),
    choices: [
      {
        id: "vesting", text: "提议设定 4 年归属期（Vesting），谁走谁留下股份",
        effects: { morale: -5, flag: "vesting" },
        resultText: "吵了一周，最终签了补充协议。对方情绪缓了下来——规则比人情更能留住人。",
        lessonTitle: "创业课 · 股权 vesting",
        lesson: "几乎所有正规投资机构都会要求创始人股权 4 年归属 + 1 年悬崖（cliff）。扎克伯格早期驱逐联合创始人、Snapchat 联合创始人被扫地出门，都是因为一开始没定规则。先小人后君子。",
      },
      {
        id: "give-in", text: "让步，把自己 10% 的股份转给对方",
        effects: { morale: 8, health: -5 },
        resultText: "对方暂时满意了。但你心里那根刺埋下了，以后的每一次分歧都会更疼。",
        lessonTitle: "创业课 · 不平等的股权",
        lesson: "用股份买和平是最贵的消费。股权给出去容易拿回来难，它是你未来融资、激励、控制权的根基。和解要靠机制（vesting、董事会席位），不是靠出血。",
      },
      {
        id: "let-go", text: "强硬：不接受就分手，你一个人也能干",
        effects: { morale: -20, product: -15, addTag: "solo" },
        resultText: "对方第二天没有来。你看着半成品的代码和空了一半的办公室，突然明白了什么叫独木难支。",
        lessonTitle: "创业课 · 联合创始人分手",
        lesson: "YC 统计：没有联合创始人的单人创业成功率显著更低。分手要快，但要体面：好聚好散的联合创始人未来可能是你的投资人、客户，而反目成仇的前合伙人可能拿着你的代码再创业。",
      },
    ],
  },
  {
    id: "bigco-copy",
    title: "巨头抄袭警报",
    scene:
      "你的产品刚有起色，某大厂连夜上线了几乎一样的功能，还内置进了它十亿级用户的 App。凌晨的创业者群里都在 @你，有人已经开始替你写「悼文」。",
    minStage: 4, weight: 7, once: true,
    choices: [
      {
        id: "niche", text: "收缩到巨头看不上的细分场景，做深做重",
        effects: { usersPct: -10, mrrPct: 15, morale: 5 },
        resultText: "你砍掉了一半功能，专注服务一个垂直人群。用户少了，但付费率和续约率反而翻倍。巨头的大炮打不到这么细的缝里。",
        lessonTitle: "创业课 · 错位竞争",
        lesson: "Instagram 被 Twitter 抛弃滤镜功能后反而聚焦；Snapchat 被抄后靠年轻人文化存活；钉钉靠『已读回执』这种细节赢下企业市场。巨头胜在广度和资源，你赢在纵深和速度。",
      },
      {
        id: "speed", text: "比他们快十倍，每周发版，把社区做起来",
        effects: { product: 15, morale: -5, cash: -20 },
        resultText: "你们进入战时状态，三班倒疯狂迭代。大厂的功能评审会还没开完，你们已经更新了五个版本。一部分用户留了下来。",
        lessonTitle: "创业课 · 速度作为护城河",
        lesson: "Peter Thiel 问：你的十倍优势是什么？对初创公司，最现实的答案是决策速度和迭代速度。大厂一个功能要过十个会，你今晚就能上线。但速度是有成本的——烧的是团队的命。",
      },
      {
        id: "sell", text: "主动接触大厂，探讨被收购的可能性",
        effects: { flag: "acquire-talk" },
        resultText: "对方的商务总监客气地接待了你，临走时说『保持联系』。你隐约觉得，这可能是礼貌的拒绝。",
        lessonTitle: "创业课 · 被收购是一门学问",
        lesson: "主动求购会削弱你的谈判地位。正确的姿势是把公司运营到『对方不买就会疼』的状态。被收购很少是创业者的初衷，但经常是理性的归宿——关键是价格和控制权。",
      },
    ],
  },
  {
    id: "investor-ghost",
    title: "投资人变卦",
    scene:
      "TS（投资意向书）都签了，领投方突然说『内部流程需要再看看』。你的律师提醒：对方可能在同时看你的竞争对手。账上的钱只够撑两个月了。",
    minStage: 3, weight: 7, once: true,
    choices: [
      {
        id: "parallel", text: "立刻启动备选方案，一周内约见五个新投资人",
        effects: { health: -8, cash: -5, flag: "backup-investors" },
        resultText: "你把咖啡当水喝，两周见了十一个投资人。第三个对你表示了兴趣。你第一次理解了什么叫『永远要有 Plan B』。",
        lessonTitle: "创业课 · TS 不是钱",
        lesson: "Term Sheet 只是意向，交割（closing）前一切都可能生变。职业选手会同时推进多家、刻意制造竞争，直到钱到账。Airbnb 早期曾被七个投资人拒绝，靠的就是一轮一轮不放弃的平行推进。",
      },
      {
        id: "wait", text: "相信对方，专心做业务等消息",
        effects: { cash: -40, months: 1 },
        resultText: "一个月过去，对方回复『很遗憾』。你的 runway 从五个月变成了三个月，而你已经错过了最佳的融资窗口。",
        lessonTitle: "创业课 · Runway 意识",
        lesson: "Runway（现金流跑道）= 账上现金 ÷ 每月净消耗。拿到 TS 不等于拿到钱，把钱到账当作唯一事实。最优秀的创始人在账上还有 6 个月钱时就开始融资。",
      },
      {
        id: "confront", text: "带着律师函去质问对方是否违约",
        effects: { reputation: -10 },
        resultText: "对方法务淡淡回了一句『意向书不具约束力』。圈内很快流传你『难搞』的名声。",
        lessonTitle: "创业课 · TS 的法律性质",
        lesson: "TS 里只有排他期、保密、费用等少数条款有约束力，投资本身通常『以完成尽调为准』。生气解决不了问题，把情绪换成备选方案才是成熟创业者。",
      },
    ],
  },
  {
    id: "server-down",
    title: "凌晨三点，服务器崩了",
    scene:
      "凌晨三点十七分，监控警报把你炸醒：核心服务宕机，付费客户群里已经刷了 200 条消息。修复需要 4 小时，而你现在只有两个人。",
    minStage: 3, weight: 6,
    choices: [
      {
        id: "all-night", text: "通宵抢修，逐个私聊大客户道歉",
        effects: { health: -10, product: 8, reputation: 8 },
        resultText: "天亮时服务恢复。最大的客户在你的道歉长文下回复：『就冲这个态度，续约了。』",
        lessonTitle: "创业课 · 危机即营销",
        lesson: "2009 年 Amazon AWS 故障后公开了详尽的事后报告（Postmortem），反而赢得信任。初创公司扛不住不出错，扛得住的是出错后的透明度。坦诚的危机公关是小公司最便宜的品牌资产。",
      },
      {
        id: "auto-msg", text: "发个公告模板，先睡觉，明天再说",
        effects: { usersPct: -8, reputation: -12, morale: -3 },
        resultText: "客户流失率当月翻倍。有人在社交媒体上发了长文《某创业公司如何敷衍它的上帝》。",
        lessonTitle: "创业课 · 客户的耐心有额度",
        lesson: "早期客户买的不是产品，是对你的信任。信任账户平时靠小事积累，危机时大笔支取。Stripe 的『随时给你打电话』式客服、海底捞的危机处理，本质是同一个道理：把客户当合伙人。",
      },
      {
        id: "outsource", text: "花 5 万紧急请外部运维团队处理",
        effects: { cash: -5, health: 3, reputation: 2 },
        resultText: "专业团队两小时搞定。你心疼钱，但学会了算账：5 万买你一条命和 8 小时的客户信任，不贵。",
        lessonTitle: "创业课 · 花钱买时间",
        lesson: "创始人最贵的是注意力和时间。凡是不构成核心竞争力的工作（运维、法务、财税），都应该考虑外包或工具化。YC 的建议：Do things that don't scale 指的是客户获取，不是指什么都自己扛。",
      },
    ],
  },
  {
    id: "reg-crackdown",
    title: "监管风向突变",
    scene:
      "一纸新规征求意见稿深夜发布：你的行业被点名纳入强监管，牌照、数据、资本充足率全有了新要求。同行的群里一片哀嚎，有人已经开始转让公司。",
    minStage: 3, weight: 5,
    condition: (s) => s.industry.regRisk >= 0.1,
    choices: [
      {
        id: "comply", text: "第一时间拥抱监管，主动申请牌照、请合规顾问",
        effects: { cash: -30, months: 1, reputation: 10, flag: "licensed" },
        resultText: "合规花了三个月和一大笔钱。但当竞争对手批量倒下时，你成了少数『有证驾驶』的玩家，客户反而涌向你。",
        lessonTitle: "创业课 · 合规是护城河",
        lesson: "2021 年教培、2020 年 P2P、2018 年现金贷——监管从来不是『黑天鹅』，只是时间问题。 Stripe 拿到银行牌照、蚂蚁整改后重启，说明活下来的都是把合规当战略而不是成本的公司。",
      },
      {
        id: "pivot", text: "连夜转型，把核心能力平移到相邻赛道",
        effects: { product: -25, months: 2, morale: -15 },
        resultText: "全员大会开到凌晨四点。一半人选择离开，剩下的人陪你把产品拆了重装。三个月后你们以新面目出现。",
        lessonTitle: "创业课 · Pivot 的艺术",
        lesson: "YouTube 前身是视频约会网站，Slack 前身是游戏公司，小红书前身是跨境电商。Pivot 不是失败，是用已验证的能力换一块更厚的冰面。关键是保留什么、放弃什么的判断力。",
      },
      {
        id: "ignore", text: "观望，觉得『落实还早』",
        effects: { months: 2 },
        resultText: "三个月后正式文件落地，罚款和限期整改一起来。你既丢了时间又丢了主动权。",
        lessonTitle: "创业课 · 政策雷达",
        lesson: "对强监管行业，创始人必须建立自己的『政策雷达』：行业协会、监管沙盒、政策律师。在中国做生意尤其如此——监管不是风险本身，对监管毫无准备才是。",
      },
    ],
  },
  {
    id: "viral-hit",
    title: "产品突然爆火",
    scene:
      "早上醒来，后台数据曲线像火箭：某个 KOL 自发推荐了你们，日新增是平时的 40 倍。Slack（内部通讯）炸了，团队问：接不接得住？",
    minStage: 3, weight: 6,
    choices: [
      {
        id: "lean-in", text: "all-in 这波流量：加服务器、全员客服、买投放接势能",
        effects: { cash: -25, usersPct: 60, mrrPct: 25, morale: 10, health: -6 },
        resultText: "你们像接住了一个燃烧的电焊球。两周后流量退潮，但留下了平时半年的用户量。团队累瘫了，眼睛却都在发光。",
        lessonTitle: "创业课 · 接住好运",
        lesson: "Clubhouse 爆红后没能留住用户，Zoom 在疫情期间接住了每一个用户。爆红是运气，接住是实力：容量、留存漏斗、新手引导，必须在平时就备好。运气只眷顾有准备且敢 all-in 的人。",
      },
      {
        id: "steady", text: "谨慎乐观，只按正常节奏扩容",
        effects: { usersPct: 15, reputation: 3 },
        resultText: "服务器扛住了，但大量新用户进来后困惑地离开——你们的引导流程没跟上。你记住了这个教训。",
        lessonTitle: "创业课 · 激活（Activation）优先于获客",
        lesson: "获客 1000 个而激活率 10%，不如获客 100 个激活率 80%。 Facebook 的 aha-moment 是 10 天内加 7 个好友。流量来了接不住，等于往漏水的桶里灌水。",
      },
    ],
  },
  {
    id: "key-hire-poached",
    title: "核心员工被挖角",
    scene:
      "你的技术负责人桌上的 offer 打印出来了：某大厂，三倍薪水，外加签字费。他/她找你谈，没有提离职，但眼神在问你：我们为什么要留在这里？",
    minStage: 4, weight: 6, once: true,
    choices: [
      {
        id: "mission", text: "不谈钱，谈使命、成长和下一份期权的价值",
        effects: { morale: 5, cash: 0, flag: "loyal-core" },
        resultText: "你们谈了四个小时，从第一次发布聊到五年后的样子。对方把 offer 折起来放进了抽屉。",
        lessonTitle: "创业课 · 留住 20% 的核心",
        lesson: "Netflix 只留『表现优异且价值观契合』的人。对早期公司，前 10 名员工决定生死。留下核心靠的不是加班费，是：1) 真实成长空间 2) 被信任的权力 3) 看得见的期权价值。",
      },
      {
        id: "match", text: "咬牙匹配薪水，甚至再加一点",
        effects: { cash: -30, morale: -5 },
        resultText: "人留住了。但消息传开后，另外两个骨干也来『谈心』了。你意识到这是没有尽头的竞标。",
        lessonTitle: "创业课 · 薪酬的锚",
        lesson: "和大厂拼现金是必输的战争。聪明的早期公司用『低现金+高期权+快成长』的组合拳。如果核心员工只认现金，要么是你的愿景不够性感，要么是他本来就该走。",
      },
      {
        id: "bless", text: "体面放手，祝福对方，保持联系",
        effects: { product: -12, morale: -8, reputation: 5 },
        resultText: "欢送饭吃到很晚。三个月后，对方在大厂内部推动了与你们的合作，还介绍了一个新客户。",
        lessonTitle: "创业课 · 前员工网络",
        lesson: "PayPal 黑帮、阿里中供铁军、字节离职员工群——最伟大的公司网络往往是前员工构成的。人走茶不凉是创始人格局的试金石，也是未来资源网络的伏笔。",
      },
    ],
  },
  {
    id: "pr-crisis",
    title: "社交媒体公关危机",
    scene:
      "一条微博/推特冲上热搜：一位用户控诉你们的产品导致他损失了一笔钱，配图、时间线、聊天记录一应俱全。评论区已经失控，有媒体来采访。",
    minStage: 3, weight: 6,
    choices: [
      {
        id: "face", text: "24 小时内公开回应：承认问题、公布补偿方案、晒整改计划",
        effects: { cash: -10, reputation: 12, usersPct: 5 },
        resultText: "声明发出后，舆论反转了一半。那位用户更新了帖子：『至少他们敢认。』更多的用户因为这条回应知道了你们。",
        lessonTitle: "创业课 · 黄金 24 小时",
        lesson: "强生 1982 年泰诺投毒事件：一周内召回 3100 万瓶，损失 1 亿美元，但换来了『史上最佳公关』的美誉。危机面前：速度 > 完美，真诚 > 话术，行动 > 道歉。",
      },
      {
        id: "lawyer", text: "让法务起草措辞严谨的声明，逐条反驳",
        effects: { reputation: -18, usersPct: -10 },
        resultText: "声明滴水不漏，但读起来像个被告。网友总结：『他们没错，但他们很冷。』热搜挂了一整天。",
        lessonTitle: "创业课 · 法务语言≠人话",
        lesson: "法律自保和用户沟通是两张皮。先发人话（承认感受、说明行动），再附法务文本。三星 Note7 起初的强硬声明 vs 后来全球召回，对比鲜明。",
      },
      {
        id: "ignore2", text: "冷处理，觉得『过两天就没人记得』",
        effects: { reputation: -10, morale: -5 },
        resultText: "热度确实过去了。但截图留了下来，每次你融资、招聘、上媒体，它都会重新出现一次。",
        lessonTitle: "创业课 · 互联网没有遗忘",
        lesson: "未被回应的负面内容会成为你永久的搜索画像。CEO 的个人信誉是公司最贵的无形资产，尤其在融资时——投资人尽调一定会搜你的名字。",
      },
    ],
  },
  {
    id: "covid",
    title: "黑天鹅：全球性疫情",
    scene:
      "疫情突袭，城市封锁，你的客户预算冻结、供应链中断。办公室租金照付，工资照发，收入却断崖式下跌 60%。所有扩张计划一夜作废。",
    minStage: 4, weight: 4, once: true,
    choices: [
      {
        id: "cut", text: "一周内裁员 30%，收缩战线，保住 12 个月 runway",
        effects: { team: -3, morale: -20, cash: 40, reputation: -5 },
        resultText: "这是你做过的最难的决定。送别会上有人哭了。但公司活了下来，而隔壁赛道的热钱公司们正在批量倒闭。",
        lessonTitle: "创业课 · 果断的生存算术",
        lesson: "2020 年 Airbnb 裁员 25%，创始人写公开信承诺：被裁员工保留电脑、延长医保、建立人才库帮助找工作。市场回暖后它强势上市。裁员要一次到位、给足尊严——拖泥带水的裁员才是最贵的。",
      },
      {
        id: "bridge", text: "不裁员，创始人零薪+高管降薪 50%，借过桥贷款续命",
        effects: { debt: 60, health: -10, morale: -5 },
        resultText: "你们像一家人一样扛过了至暗时刻。但桥接贷款像定时炸弹，利率和转股条款会在未来某天引爆。",
        lessonTitle: "创业课 · 债务的双面性",
        lesson: "桥接贷款（Bridge Loan）常带折扣转股条款，救急但稀释凶猛。2008 年金融危机中，接受债务续命的初创公司很多倒在了恢复期——因为债务不分享你的 upside，只分享你的现金流。",
      },
      {
        id: "pivot-online", text: "孤注一掷转型线上/远程场景产品",
        effects: { product: -15, months: 1, usersPct: 30, morale: -10 },
        resultText: "三个月后，你们的远程协作模块意外踩中了时代的脉搏。灾难里长出了新芽。",
        lessonTitle: "创业课 · 危中有机",
        lesson: "Zoom 日活从 1000 万到 3 亿、拼多多在物流中断中靠社区团购翻盘、Shopify 市值在疫情中翻了 6 倍。黑天鹅杀死旧模式，也奖励快速转向者。",
      },
    ],
  },
  {
    id: "burn-war",
    title: "烧钱大战",
    scene:
      "直接竞争对手宣布融了 10 个亿，开始补贴大战：同款产品半价，还到处挖你的人。你的销售团队看着对手的广告坐立不安，问你：跟不跟？",
    minStage: 4, weight: 6, once: true,
    choices: [
      {
        id: "no-war", text: "不打补贴战，死磕产品和单位经济模型",
        effects: { usersPct: -15, mrrPct: 10, morale: 3 },
        resultText: "你们失去了价格敏感的用户，却留住了愿为价值付费的。半年后对手补贴停止，那些用户回来了——带着对『便宜没好货』的记忆。",
        lessonTitle: "创业课 · 单位经济（Unit Economics）",
        lesson: "LTV/CAC > 3 是健康线。补贴买来的不是用户，是租来的流量，停租即走。滴滴快的补贴大战、瑞幸的疯狂扩张，最终都回到了同一个问题：每一单到底赚不赚钱？",
      },
      {
        id: "war", text: "跟进补贴，融资备战，跟它拼了",
        effects: { cash: -80, usersPct: 40, mrrPct: -20, health: -8 },
        resultText: "你们像两个拳击手互相抡拳，观众叫好，裁判数钱。三个月后你先松了手——钱先烧完的那个永远是你。",
        lessonTitle: "创业课 · 不对称战争",
        lesson: "不要在你对手选定的战场上开战。美团避开正面、攻下三四线城市；Netflix 不租碟、直接流媒体。当你的弹药是对手的 1/10，规则必须你来定。",
      },
      {
        id: "alliance", text: "联系第三名玩家/巨头，提议结盟或合并对抗",
        effects: { flag: "merger-talk" },
        resultText: "对方 CEO 和你约在机场喝了杯咖啡。竞争的尽头，可能是一张谈判桌。",
        lessonTitle: "创业课 · 合纵连横",
        lesson: "携程与去哪儿合并结束 OTA 大战、Uber 中国与滴滴合并、滴滴快的合并。商场上没有永远的敌人。当行业进入消耗战，合并往往是对股东、员工、创始人三方最优解。",
      },
    ],
  },
  {
    id: "data-breach",
    title: "用户数据泄露",
    scene:
      "一个白帽子黑客邮件你：你们数据库裸奔了，几十万用户数据可拖库。按照当地法律，这可能意味着天价罚款和集体诉讼。",
    minStage: 3, weight: 5,
    choices: [
      {
        id: "disclose", text: "48 小时内主动披露并修复，上报监管部门",
        effects: { cash: -20, reputation: 5, morale: -3 },
        resultText: "监管部门的调查员在报告里写下『企业态度积极、响应及时』。罚款减半，用户零流失。",
        lessonTitle: "创业课 · 数据合规不是选择题",
        lesson: "GDPR 罚款上限是全球营收 4%，国内《个保法》同样严厉。Uber 2016 年隐瞒泄露事件，2018 年被罚 1.48 亿美元。主动披露几乎是唯一正确解——法律奖励坦诚者。",
      },
      {
        id: "hide", text: "悄悄修复，赌没人发现",
        effects: { cash: -5, flag: "breach-hidden" },
        resultText: "你修好了漏洞。但三个月后，暗网出现了你们的数据。记者的电话比监管的电话先到。",
        lessonTitle: "创业课 · 藏不住的秘密",
        lesson: "在日志、区块链分析、安全社区面前，隐瞒泄露几乎必然败露，而败露的代价是数倍的罚款加信誉死刑。Equifax 高管因隐瞒数据泄露被刑事起诉。",
      },
    ],
  },
  {
    id: "angel-check",
    title: "种子轮的「霸王条款」",
    scene:
      "一位出手阔绰的天使投资人给 TS 加了几个小字：完全棘轮反稀释条款、一票否决权、创始人 3 年内不得离职。你的律师皱眉：这是『毒丸』。",
    minStage: 3, weight: 6, condition: (s) => s.stage === "seed" || s.stage === "seriesA",
    choices: [
      {
        id: "negotiate", text: "拒绝毒丸条款，给出标准条款（1x 非参与清算优先权）",
        effects: { flag: "clean-terms" },
        resultText: "谈判桌上你第一次感觉自己在『做生意』而不是『讨饭』。对方撤回了两个条款，交易继续。",
        lessonTitle: "创业课 · Term Sheet 攻防",
        lesson: "完全棘轮（Full Ratchet）反稀释意味着你下次低价融资时，投资方股份被自动补足，创始人被无限稀释。Facebook 早期投资人想要特殊条款都被拒绝。底线：1x 非参与清算优先权 + 标准反稀释（加权平均）。",
      },
      {
        id: "accept-bad", text: "钱要紧，先签了再说",
        effects: { cash: 0, flag: "toxic-terms", morale: -5 },
        resultText: "钱到账了。但律师私下说：从签的那天起，这家公司已经不完全属于你了。",
        lessonTitle: "创业课 · 便宜的昂贵",
        lesson: "优步 Travis Kalanick 早期接受大量带控制权的条款，为后来的董事会政变埋下伏笔。有毒条款会在你最脆弱的下一轮融资时发作——那时你会为今天的急切付出股权、董事会席位甚至公司的代价。",
      },
      {
        id: "walk", text: "放弃这位投资人，继续找下一家",
        effects: { months: 1, cash: -8 },
        resultText: "又熬了一个月。但新找到的投资人给的条款干净得像纯净水。你庆幸自己没签。",
        lessonTitle: "创业课 · 投资人的选择是婚姻",
        lesson: "你要和这个投资人同桌至少七年。条款、声誉、投后风格比支票金额重要。Benchmark、Sequoia 的价值从来不止是钱。『坏钱拿了比没钱更可怕』是血泪共识。",
      },
    ],
  },
  {
    id: "star-engineer-quit",
    title: "技术合伙人要「谈一谈」",
    scene:
      "凌晨，你的技术合伙人发来长文：大模型浪潮下，他/她的市场身价翻了三倍，而你给的期权「看不到兑现希望」。要求：加薪 + 重新谈期权，否则两周后离职。",
    minStage: 4, weight: 6,
    choices: [
      {
        id: "refresh", text: "做一轮期权 refresh，绑定 4 年，坦诚沟通估值预期",
        effects: { cash: -15, morale: 8, flag: "team-locked" },
        resultText: "你们重新对齐了预期。对方说：『我要的不是钱，是知道自己这几年的青春值多少。』",
        lessonTitle: "创业课 · 期权 refresh",
        lesson: "Google、Meta 常用期权 refresh 留住老员工。早期员工入职时的期权在后续融资中会被稀释，定期 refresh（追加授予）是成熟公司的标配。最怕的是创始人装傻——市场价摆在那里。",
      },
      {
        id: "refuse", text: "创业公司谈不了条件，爱干不干",
        effects: { product: -20, morale: -15, addTag: "cto-gone" },
        resultText: "两周后，对方加入了竞争对手。你半夜看着看不懂的代码，第一次认真考虑『技术债』这个词的字面意思。",
        lessonTitle: "创业课 · 技术债与人",
        lesson: "核心技术人员离职的成本 = 知识流失 + 招聘成本(6 个月+) + 进度延误 + 竞业风险。工程师的『市场价』是客观存在的，假装看不见只是在积累爆炸当量。",
      },
    ],
  },
  {
    id: "acquire-offer",
    title: "收购要约",
    scene:
      "一家上市公司 CFO 约你午餐，开门见山：出价你估值的 1.8 倍现金收购，创始团队保留两年。你心跳加速——这可能是财富自由，也可能是温水煮青蛙。",
    minStage: 5, weight: 5, once: true,
    choices: [
      {
        id: "sell-high", text: "谈判抬价到 2.5 倍，成交",
        effects: { flag: "sold" },
        resultText: "签字那天你想起在车库里写第一行代码的夜晚。交割款到账的短信提示音响起时，你发现自己并没有想象中兴奋，只是很累。",
        lessonTitle: "创业课 · 何时卖掉公司",
        lesson: "Instagram 10 亿美元卖给了 Facebook（当时零营收），创始人数十亿美元离场；Snap 拒绝后 IPO 市值一度 300 亿。没有对错的答案，只有对你个人风险、野心和时机的诚实评估。现金流为正时，你才有资格说『不』。",
      },
      {
        id: "decline", text: "拒绝：这家公司值得一个 IPO",
        effects: { morale: 10, reputation: 5 },
        resultText: "你拒绝了。回到办公室，团队眼里的光比任何融资都珍贵。但你知道，从此每一天你都得证明这个决定是对的。",
        lessonTitle: "创业课 · 拒绝的艺术",
        lesson: "拒绝收购要约需要两个前提：1) 账面现金撑得到证明你是对的；2) 你和团队在『为什么而战』上高度一致。扎克伯格拒绝雅虎 10 亿美元时两者兼备。拒绝不是姿态，是押注。",
      },
    ],
  },
  {
    id: "tax-audit",
    title: "税务稽查",
    scene:
      "税务局来信：对近三年账目进行稽查。早期为了省钱，你们用过私人账户收货款、买过一些『灵活用工』发票。会计的脸色不太好看。",
    minStage: 3, weight: 4,
    choices: [
      {
        id: "cooperate", text: "全面配合，主动补税+缴滞纳金",
        effects: { cash: -25, reputation: 5 },
        resultText: "补了税和罚款，账目从此干干净净。审计师在报告里写下『企业整改积极』。",
        lessonTitle: "创业课 · 财税合规",
        lesson: "『金税四期』时代，私户收款、买卖发票基本等于自杀。公司做大后，历史税务问题会被尽调翻个底朝天——投资人发现税务瑕疵轻则压价，重则直接放弃。",
      },
      {
        id: "bury", text: "想办法『解释』过去",
        effects: { cash: -8, flag: "tax-risk" },
        resultText: "这次糊弄过去了。但税务档案会永久保存，下一次——也许是上市前的税务尽调——它们会回来找你。",
        lessonTitle: "创业课 · 上市的税务尽调",
        lesson: "A股/港股/美股 IPO 都有 3 年税务合规审查。大量拟上市公司因历史税务瑕疵被迫撤回申请。今天省下的每一分『税』，未来都会以十倍的价格要回来。",
      },
    ],
  },
  {
    id: "tariff",
    title: "关税大棒",
    scene:
      "你的主力海外市场突然宣布对你们的产品加征 30% 关税。货还在海上，成本瞬间倒挂。客户来电：要么你们消化关税，要么订单转给东南亚工厂。",
    minStage: 4, weight: 4, condition: (s) => s.industry.id === "ecom" || s.industry.id === "hardware",
    choices: [
      {
        id: "eat", text: "自己消化一半关税，保住客户",
        effects: { mrrPct: -20, usersPct: 5, cash: -20 },
        resultText: "利润薄如纸片，但客户留住了。你开始研究海外仓和产地多元化。",
        lessonTitle: "创业课 · 供应链韧性",
        lesson: "2018 中美贸易战后，立讯精密、歌尔加速东南亚建厂；SHEIN 用分布式小单快反对冲关税。把鸡蛋放在一个篮子里的成本，在危机来临时会一次性结清。",
      },
      {
        id: "move", text: "把产能/仓储迁往第三国，花 3 个月重构供应链",
        effects: { months: 1, cash: -35, mrrPct: 5 },
        resultText: "这是一场豪赌。但当同行还在关税里窒息时，你已经在新产地轻装上阵。",
        lessonTitle: "创业课 · 产地多元化",
        lesson: "特斯拉上海工厂、苹果印度产线、TikTok 的『得州计划』——全球化 2.0 的玩法是『中国+1』。供应链重构很贵，但被卡脖子更贵。",
      },
      {
        id: "pass", text: "把关税全转嫁给客户",
        effects: { usersPct: -25, mrrPct: -10 },
        resultText: "订单量暴跌 40%。你在 Excel 里算了整夜：丢掉的市场，多久能拿回来？答案是：可能永远。",
        lessonTitle: "创业课 · 定价权的真相",
        lesson: "转嫁成本的能力取决于你的不可替代性。苹果敢涨价，白牌不敢。想拥有定价权，平时就要投资品牌、技术和客户关系——危机只是定价权的压力测试。",
      },
    ],
  },
  {
    id: "cofounder-quit-burnout",
    title: "创始人健康红灯",
    scene:
      "连续 18 个月每天睡 4 小时后，你在会议室里眼前一黑。体检报告出来：心律不齐、甲状腺异常、重度焦虑。医生盯着你说：『再这么干，下一次就不是头晕了。』",
    minStage: 3, weight: 5,
    condition: (s) => s.health < 55,
    choices: [
      {
        id: "rest", text: "强制休整两周，任命临时负责人",
        effects: { months: 1, health: 25, morale: -3, cash: -10 },
        resultText: "第一周你手机震动就心慌，第二周你开始能睡整觉。回来后你看问题的清晰度，比连轴转三个月还高。",
        lessonTitle: "创业课 · 创始人是单点故障",
        lesson: "桥水达利欧说『痛苦+反思=进步』，但持续 burnout 只会=出局。VC 尽职调查现在会评估创始人健康。YouTube 前 CEO 之死的教训残酷：公司可以换 CEO，你的孩子只有一个父母。",
      },
      {
        id: "push", text: "吃点药顶着，公司离了我转不了",
        effects: { health: -20, product: 10 },
        resultText: "你又撑了半年。产品确实进步了，但你的体检报告像一个正在倒计时的炸弹。",
        lessonTitle: "创业课 · 不可持续的胜利",
        lesson: "以健康换来的增长是借高利贷。更危险的是：过度依赖创始人的公司，在投资人眼里是减分项——他们投资的不是超人，是可复制的系统。",
      },
    ],
  },
  {
    id: "whale-customer",
    title: "「鲸鱼客户」的诱惑",
    scene:
      "一家行业巨头找上门：一份合同金额顶你全年营收 40%，但要求定制开发、独家条款和 180 天账期。签，还是不签？",
    minStage: 4, weight: 6,
    choices: [
      {
        id: "take", text: "签！先让营收数字好看",
        effects: { cash: 30, mrrPct: 40, morale: -8, flag: "whale-dependency" },
        resultText: "合同签了，团队成了这家巨头的驻场外包。你的产品路线图被改写，其他客户被冷落。",
        lessonTitle: "创业课 · 大客户依赖症",
        lesson: "当你的 40% 营收来自单一客户，你不是在经营公司，是在给员工发工资的同时给大客户打工。客户集中度是尽调红线（通常 <30%）。美团的早期教训：BD 签大客户容易，摆脱依赖难。",
      },
      {
        id: "counter", text: "签，但砍掉独家和定制，坚持标准化产品",
        effects: { mrrPct: 20, reputation: 5 },
        resultText: "对方皱着眉同意了 80%。你保住了产品主权。半年后，三个同类客户循着口碑而来——标准化的力量。",
        lessonTitle: "创业课 · 产品化 vs 项目制",
        lesson: "Salesforce 的『No Customization』原则、Atlassian 不做一毛钱定制——标准化才能规模化。愿意为你的标准产品付费的客户，才是真正的 PMF 信号。",
      },
      {
        id: "decline", text: "婉拒，专注中小客户市场",
        effects: { morale: 5 },
        resultText: "团队有人不理解。但当巨头因为你们不做定制而扶持了一个对手、而对手被定制拖垮时，大家才懂。",
        lessonTitle: "创业课 · 说不是战略",
        lesson: "乔布斯回归苹果第一件事是把 350 条产品线砍到 10 条。战略的本质是取舍——『我们对什么说不』比『我们做什么』更定义一家公司。",
      },
    ],
  },
  {
    id: "media-fame",
    title: "聚光灯下的诱惑",
    scene:
      "你上了当地知名创业节目/36氪/ TechCrunch 封面，头衔变成「XX 赛道最值得关注创始人」。采访、峰会邀请、颁奖礼接踵而至。团队问：老板，咱还写代码吗？",
    minStage: 4, weight: 4, once: true,
    choices: [
      {
        id: "pr-limit", text: "定下规矩：每月只接 1 个活动，其余全部拒绝",
        effects: { reputation: 5, product: 5 },
        resultText: "曝光度降了，但你发现产品在投资人面前 speak for itself。真正的口碑开始沉淀。",
        lessonTitle: "创业课 · 虚荣指标",
        lesson: "Paul Graham 警告创业者远离「名利场」：报道、奖项、粉丝数都是虚荣指标（Vanity Metrics），唯一重要的是留存、收入和单位经济。很多明星创业者死在了领奖台上。",
      },
      {
        id: "fame", text: "趁热打铁，个人 IP 也是生产力",
        effects: { reputation: 15, product: -10, morale: -5, flag: "celebrity-founder" },
        resultText: "你的演讲视频播放百万。但季度会上你发现：用户增长没跟上你的知名度，而竞品在你领奖时悄悄上线了杀手功能。",
        lessonTitle: "创业课 · 注意力≠竞争力",
        lesson: "周鸿祎、雷军级别的个人 IP 确实是护城河，但那是打赢了仗之后的麦克风，不是武器本身。产品还没赢之前过度曝光，只会给竞争对手做市场教育。",
      },
    ],
  },
  {
    id: "legal-sue",
    title: "专利流氓/巨头诉讼",
    scene:
      "一封律师函躺在邮箱里：某 NPE（专利流氓）起诉你们侵犯专利，索赔 800 万。和解开价 120 万。律师说：这官司就算赢，也要花 200 万和两年。",
    minStage: 4, weight: 4,
    choices: [
      {
        id: "settle", text: "花 120 万和解，花钱买清净",
        effects: { cash: -12, reputation: -3 },
        resultText: "和解协议保密签署。你安慰自己这是『商业决策』，但钱包和自尊都很疼。",
        lessonTitle: "创业课 · NPE 的商业模式",
        lesson: "专利流氓（Patent Troll）不生产产品，只靠诉讼赚钱。美国每年 NPE 诉讼和解金中位数约 50 万美元。罗永浩曾公开专利流氓威胁，Spotify、特斯拉都交过『保护费』。这不是正义问题，是算术问题。",
      },
      {
        id: "fight", text: "应诉到底，联合行业同盟反诉",
        effects: { cash: -30, months: 1, reputation: 15, flag: "fighter" },
        resultText: "你们联合了 7 家被同一 NPE 骚扰的同行，分摊律师费集体应诉。对方撤诉了。行业记住了你们的名字。",
        lessonTitle: "创业课 · 集体防御",
        lesson: "LOT Network、OIN 等专利保护联盟正是为此而生。面对系统性勒索，单打独斗是下策，行业同盟能把『保护费』变成『抵抗成本』。",
      },
    ],
  },
  {
    id: "supply-chain",
    title: "核心元器件断供",
    scene:
      "你们的独家供应商突然通知：因为某地缘事件，关键芯片/元件断供 6 个月，已付的订金无法退回。产品库存只够 40 天。",
    minStage: 4, weight: 4, condition: (s) => s.industry.id === "hardware" || s.industry.id === "ecom",
    choices: [
      {
        id: "redesign", text: "紧急换方案，用国产/替代料号重新设计",
        effects: { product: -12, months: 1, cash: -20 },
        resultText: "工程师们连续奋战 45 天完成替代设计。新品上市晚了两个月，但你们从此有了双供应商体系。",
        lessonTitle: "创业课 · 单一供应商风险",
        lesson: "2021 全球缺芯让无数硬件公司断粮，而提前双供应商布局的大疆逆势抢下市场。供应链管理不是成本中心，是生死线。",
      },
      {
        id: "wait-supply", text: "等 6 个月，先卖库存",
        effects: { months: 2, mrrPct: -40, morale: -10 },
        resultText: "库存清完的那周，公司陷入停摆。员工开始更新简历，渠道商开始代理竞品。",
        lessonTitle: "创业课 · 停摆的代价",
        lesson: "现金流断裂不会等你『6 个月后重来』。供应商断供期超过 runway 的 50%，就必须启动 B 计划——这是硬件创业的常识。",
      },
    ],
  },
  {
    id: "bad-cofounder-hire",
    title: "请神容易送神难",
    scene:
      "你高薪请来的合伙人级 VP，三个月后原形毕露：KPI 全靠 PPT，开会喊口号，复盘甩锅下属。他/她握着 3% 的期权和一票之差的团队影响力。",
    minStage: 4, weight: 5,
    choices: [
      {
        id: "fast-fire", text: "快速、依法、体面地解除合作（n+1 + 收回未归属期权）",
        effects: { cash: -10, morale: 10, reputation: 3 },
        resultText: "谈话 30 分钟结束。两周后团队效率不降反升——原来大家都在等这个决定。",
        lessonTitle: "创业课 · 快速解雇",
        lesson: "Netflix 的文化圣经：Keeper Test——『如果这个人明天要走，你会不会拼命挽留？』答案是『松口气』就该让他走。错的人每小时都在消耗团队的士气和你的现金。",
      },
      {
        id: "keep", text: "再观察观察，也许下个季度就好了",
        effects: { morale: -12, cash: -15, months: 1 },
        resultText: "又三个月，最好的两个主管因为这人离职。你终于动手了，代价翻了三倍。",
        lessonTitle: "创业课 · 沉没成本陷阱",
        lesson: "『已经给了 3% 期权、已经合作半年』不是继续忍耐的理由。拖延解雇的真正成本 = 拖的时间 ×（此人破坏力 + 替代者产出）。早做决定的创始人，公司活得更久。",
      },
    ],
  },
  {
    id: "friend-money",
    title: "「兄弟」的 50 万",
    scene:
      "发小听说你在创业，凑了 50 万要「入股」：『咱俩谁跟谁，合同就不用了吧？』你妈也打来电话：『你可别坑了人家。』",
    minStage: 1, weight: 5, once: true,
    choices: [
      {
        id: "formal", text: "坚持签正规协议：借款或小额 SAFE，写明风险",
        effects: { cash: 50, debt: 20, reputation: 3 },
        resultText: "发小愣了一下，还是签了。三年后公司波折时他感慨：『幸亏当初你坚持写清楚，不然我连朋友都保不住。』",
        lessonTitle: "创业课 · 亲友钱的铁律",
        lesson: "亲友投资（FF&F Round）是创业第一桶金的常见来源，但无数兄弟反目、亲戚成仇都源于「口头约定」。三条铁律：1) 只拿亏得起的钱 2) 白纸黑字 3) 讲清『这钱可能归零』。",
      },
      {
        id: "handshake", text: "拍胸脯：亏了算我的，赚了分你一半",
        effects: { cash: 50, debt: 50, flag: "informal-debt" },
        resultText: "钱到账很快。但「亏了算我的」这五个字，在你后来最艰难的那个冬天，变成了每晚睡前的一吨铅。",
        lessonTitle: "创业课 · 无限责任的幻觉",
        lesson: "有限责任公司的意义就在这：用公司资产承担风险，不牵连个人和家庭。用个人信用为创业担保，等于把家人也押上牌桌。任正非、史玉柱都曾被巨债压身——不要重复他们的苦难。",
      },
      {
        id: "refuse", text: "婉拒：创业九死一生，不想拿兄弟的钱冒险",
        effects: { morale: 3 },
        resultText: "发小有点失落，但你们的酒一直喝到了今天。",
        lessonTitle: "创业课 · 拒绝也是保护",
        lesson: "不是所有送上门的钱都要接。拿不到机构钱只能借亲友钱时，先问自己：这笔钱亏掉，我们的关系还在吗？创业者最大的善良，是不让爱你的人为你的梦想陪葬。",
      },
    ],
  },
  {
    id: "first-revenue",
    title: "第一笔「大订单」骗局",
    scene:
      "一位「渠道大佬」承诺一次性采购全年服务，金额是你月营收的 8 倍。条件：先付 30% 定金…但要求你开全额发票、先返 10% 「渠道服务费」。",
    minStage: 2, weight: 5, once: true,
    choices: [
      {
        id: "spot-scam", text: "查对方公司背景，要求对公账户+标准合同，婉拒返点",
        effects: { reputation: 2 },
        resultText: "工商信息一查：成立 3 个月，参保人数 0。你礼貌拒绝。一周后新闻爆出同手法骗了同行 300 万。",
        lessonTitle: "创业课 · 创业骗局图鉴",
        lesson: "「先返点」「高开票」「代采返佣」是经典的创业诈骗三件套，专杀缺现金的初创公司。记住：任何让你先付钱的「大订单」，都是猎人在收智商税。",
      },
      {
        id: "bite", text: "机会难得，冒险签了",
        effects: { cash: -25, months: 1, morale: -8 },
        resultText: "对方付款到账后迅速要求退款「走流程」，你才发现发票和合同全是坑。追讨三个月，只追回一半。",
        lessonTitle: "创业课 · 现金饥渴是命门",
        lesson: "骗子最懂创业者：缺现金的人判断力会系统性下降。越是缺钱，越要守住合同与账期的底线——VC 尽调时会翻看你的重大合同，被骗经历暴露的是风控能力。",
      },
    ],
  },
  {
    id: "office-landlord",
    title: "二房东的温柔刀",
    scene:
      "现在的联合办公到期了。中介带你看了一处「政府补贴园区」，押二付三、装修补贴、税收返还，听起来完美。法务提醒你：合同主体是一家成立 4 个月的空壳公司。",
    minStage: 2, weight: 4,
    choices: [
      {
        id: "verify", text: "核实产权与出租方资质，宁可贵一点签正规园区",
        effects: { cash: -6 },
        resultText: "多花了 20% 租金，但房产证、消防、租约全部合规。两年后你才知道当初那个「补贴园区」卷款跑路了。",
        lessonTitle: "创业课 · 办公室骗局",
        lesson: "「二房东跑路」是创业公司的经典死法：预付的押金装修款一夜蒸发。租办公室的尽调清单：产权证明、出租方征信、发票能否开具、同楼栋其他租户口碑。",
      },
      {
        id: "cheap", text: "便宜就是硬道理，签！",
        effects: { cash: -15, months: 1, morale: -10, addTag: "office-scam" },
        resultText: "第四个月，物业贴出清场公告。你和团队抱着电脑站在路边办公的照片，成了行业群里的「今日最佳」。",
        lessonTitle: "创业课 · 便宜的代价",
        lesson: "WeWork 泡沫破裂后全球创业公司学到一课：办公成本每省一分都是利润，但「省」的前提是法律安全。押二付三给空壳公司的 15 万，比贵 20% 的正规园区贵得多。",
      },
    ],
  },
  {
    id: "family-pressure",
    title: "家里的电话",
    scene:
      "三年没回家过年了。今天妈妈的电话很平静：『你爸的检查报告出来了，情况不太好。家里不缺钱，就缺你回来一趟。』你看着刚融到的钱和排满的发布计划。",
    minStage: 3, weight: 5,
    choices: [
      {
        id: "go-home", text: "立刻订票回家，工作远程安排",
        effects: { months: 1, health: 10, morale: 5, product: -5 },
        resultText: "你在病床前守了两周。离开那天爸爸摆摆手：『去吧，好好干。』回公司的飞机上你哭了一场，然后好好睡了一觉——三年来第一次。",
        lessonTitle: "创业课 · 为了什么创业",
        lesson: "Y Combinator 的「Make something people want」前面其实还有半句人生前提：别在创造财富的路上弄丢了为什么出发。硅谷无数创始人在公司上市那年离婚或错过亲人最后一面——那不是成功的代价，是失败的另一种写法。",
      },
      {
        id: "stay", text: "让家人先撑着，等这轮融资交割就回去",
        effects: { health: -15, morale: -8, flag: "family-gap" },
        resultText: "融资交割那天，爸爸的手术已经做完了。电话那头说「一切都好」。你盯着香槟，一点味道都尝不出来。",
        lessonTitle: "创业课 · 不可逆清单",
        lesson: "管理学有个「不可逆清单」：有些事错过就永远错过。钱可以以后赚，有些时刻没有以后。成熟创业者会提前定义：什么情况下公司必须为人生让路。",
      },
    ],
  },
  {
    id: "churn-spike",
    title: "留存断崖：用户在集体出走",
    scene:
      "数据分析会一片死寂：次月留存从 41% 跌到 17%。用户调研的反馈高度一致——「新鲜感过了，没啥用」。拉新团队的眼神在问你：我们还在往漏水的桶里灌水吗？",
    minStage: 4, weight: 7, once: true,
    choices: [
      {
        id: "pause-growth", text: "砍投放、全员扑留存：逐户回访流失用户，重做核心功能",
        effects: { usersPct: -10, product: 15, cash: -10, mrrPct: 10, morale: -5 },
        resultText: "三个月，你们打了一场没人喝彩的仗。留存回到 35%，投放重新打开时，每一分钱都花在了会变老的用户身上。",
        lessonTitle: "创业课 · 留存优先于增长",
        lesson: "YC 合伙人 Lenny Rachitsky 的数据：留存曲线才是产品的 ECG（心电图）。Facebook 当年砍掉了所有拉新预算死磕留存曲线变平。增长黑客的前提，是桶先不漏水。",
      },
      {
        id: "double-ads", text: "加大投放盖过流失，用规模换时间",
        effects: { cash: -40, usersPct: 30, mrrPct: -10, morale: -8 },
        resultText: "用户总量还在涨，投资人周报很好看。但你知道真相在 cohort（同期群）数据里：每一批新用户都在以同样的速度流失。",
        lessonTitle: "创业课 · 虚荣指标陷阱",
        lesson: "总用户数是会骗人的指标。LinkedIn 创始人 Reid Hoffman：「只要看留存曲线能不能变平，就知道产品有没有 PMF。」用投放掩盖留存问题，等于给癌症病人化妆。",
      },
    ],
  },
  {
    id: "app-store-rejection",
    title: "平台方的一纸下架令",
    scene:
      "凌晨邮件：应用商店以「违规收集数据」为由下架了你的 App，没有申诉入口，没有具体条款。你的 60% 新增来自这个渠道。渠道经理的电话永远占线。",
    minStage: 4, weight: 5, once: true,
    condition: (s) => ["consumer", "game", "ai"].includes(s.industry.id),
    choices: [
      {
        id: "multi-channel", text: "紧急全量铺设独立渠道：官网直装、小程序、海外镜像",
        effects: { months: 1, cash: -20, usersPct: -15, flag: "channel-diversified" },
        resultText: "阵痛两个月后，你们的渠道结构从 6:4 变成了 3:3:4。再收到下架通知时，你第一次能睡个好觉。",
        lessonTitle: "创业课 · 渠道即命脉",
        lesson: "Zynga 被 Facebook 算法调整一刀砍残、无数淘宝店主死于平台规则变更。平台方的每一次「优化」，对依赖它的公司都是地震。铁律：单一渠道占比不超过 40%。",
      },
      {
        id: "beg", text: "托关系找人疏通，先恢复上架再说",
        effects: { cash: -15, reputation: -5, months: 1 },
        resultText: "上架恢复了，但每三个月同样的邮件还会来一次。你成了平台规则的人质。",
        lessonTitle: "创业课 · 人质困境",
        lesson: "靠关系恢复的单次解，不改变权力结构。Epic 起诉苹果 App Store 抽成（30%），赢回了第三方支付——改变规则的永远是「有底气掀桌子的人」，而底气来自渠道多元化。",
      },
    ],
  },
  {
    id: "board-fight",
    title: "董事会政变",
    scene:
      "A 轮领投资董事联合两位外部董事发来会议通知：议题是「讨论 CEO 的继任方案」。你翻开当初签的条款——B 类股、保护性条款、董事席位 2:2:1，你发现自己可能赢不了这场投票。",
    minStage: 5, weight: 6, once: true,
    condition: (s) => s.tags.includes("toxic-terms") || s.morale < 40,
    choices: [
      {
        id: "negotiate-seat", text: "私下逐个沟通，用增长数据+个人让步换取支持",
        effects: { reputation: -5, morale: 5, flag: "survived-coup" },
        resultText: "你在两周内谈了七次。最终方案：你保留 CEO 但交出部分董事会权力。走出会议室时你后背全湿——但公司还是你的。",
        lessonTitle: "创业课 · 公司治理 survival",
        lesson: "Uber 的 Travis Kalanick 在投资人逼宫下辞职；WeWork 的 Neumann 被董事会废黜。董事会政治学是创始人的必修课：股份比例 ≠ 控制权，投票权结构（Voting Structure）才是。早期就埋下 AB 股或一致行动人安排。",
      },
      {
        id: "step-aside", text: "体面让位，保留股份和董事席位",
        effects: { morale: -10, reputation: 3, health: 10 },
        resultText: "交棒那天你在车库坐了很久。后来公司在新 CEO 手里真的做大了——你的股份反而更值钱了。说不憋屈是假的，但你保住了最重要的东西。",
        lessonTitle: "创业课 · 何时放手",
        lesson: "Google 的佩奇曾把 CEO 让给施密特十年再回归；Twitter 创始人多尔西被赶走又回归。让位不等于失败——持有 20% 的上市公司股份，好过持有 100% 的沉船。",
      },
    ],
  },
  {
    id: "hiring-spree",
    title: "融资到账后的「甜蜜陷阱」",
    scene:
      "A 轮 8000 万到账的第二周，各部门的编制申请像雪片一样飞来：市场部要扩三倍，行政要换写字楼，HR 说「对标大厂福利才能吸引人才」。你的 CFO 在桌下踢你：钱是这么烧的？",
    minStage: 5, weight: 6, once: true,
    condition: (s) => s.cash > 150,
    choices: [
      {
        id: "discipline", text: "立下军规：钱只花在验证过的增长引擎上，编制冻结 90 天",
        effects: { morale: -8, cash: 10, mrrPct: 8 },
        resultText: "抱怨声持续了一个月。但 90 天后，你们的单位经济模型比融资前更健康，而隔壁赛道的竞品已经因为疯狂扩张进了裁员名单。",
        lessonTitle: "创业课 · 融资后的纪律",
        lesson: "研究显示：大额融资后的 18 个月是创业公司死亡高发期——钱太多比钱太少更考验定力。亚马逊的「Day 1」信条、字节早期的「延迟满足」，本质都是对抗资本带来的熵增。",
      },
      {
        id: "spend", text: "兵马未动粮草先行，全面扩张抢占窗口期",
        effects: { cash: -100, team: 5, usersPct: 25, morale: 10 },
        resultText: "办公室热闹得像过年，工位从一层扩到三层。但月消耗从 40 万涨到 130 万，你忽然理解了什么叫「增长吞噬现金」。",
        lessonTitle: "创业课 · 扩张的数学",
        lesson: "盲目扩张的财务逻辑：团队×5 ≠ 产出×5（ Brooks 定律：向延期的项目加人只会让它更延期）。Quibi 融了 17.5 亿美元两年烧光倒闭——钱能买来速度，也能买来规模化的错误。",
      },
    ],
  },
  {
    id: "tech-paradigm",
    title: "技术范式突变",
    scene:
      "一夜之间，行业被新技术范式颠覆：你的核心产品路线被判定为「上一代方案」。团队里年轻的工程师眼神发亮地想重做，老员工觉得你在背叛过去三年的积累。",
    minStage: 4, weight: 5, once: true,
    condition: (s) => s.product > 50,
    choices: [
      {
        id: "embrace", text: "壮士断腕：抽调 70% 力量 all-in 新范式，老产品维持运营",
        effects: { product: -20, months: 1, cash: -30, morale: -10, mrrPct: 15, flag: "pioneer" },
        resultText: " cannibalize 自己的产品是最疼的决策。但六个月后，当同行们开始恐慌性转型时，你们已经坐在了新牌桌的头位。",
        lessonTitle: "创业课 · 自我颠覆",
        lesson: "Netflix 亲手杀掉 DVD 邮寄业务全力流媒体、苹果 iPhone 发布时乔布斯说「会蚕食我们自己的 iPod——但与其别人蚕食，不如我们自己来」。柯达发明了数码相机却死于数码——杀死你的常常是你最擅长的东西。",
      },
      {
        id: "defend", text: "坚守现有路线，新技术还不成熟，等它泡沫破裂",
        effects: { product: 10, mrrPct: -15, morale: -5 },
        resultText: "你赌对了一半——泡沫确实会破裂。但用户回不来了：他们已经在新平台上重建了工作流。诺基亚押注 Symbian 的教训重演了一次。",
        lessonTitle: "创业课 · 创新者的窘境",
        lesson: "克里斯坦森的名著揭示：管理最好的公司最容易被颠覆，因为它们只听取最优质客户的声音，而颠覆恰恰从边缘市场开始。对范式转移，正确的姿势是「永远留一张新牌桌的门票」。",
      },
    ],
  },
  {
    id: "whale-churn",
    title: "鲸鱼客户搁浅",
    scene:
      "那份占你营收 40% 的大客户合同到期了。对方的新采购负责人面无表情：「我们要重新招标，你们的报价比新玩家高 30%。」你的现金流预测表上，未来六个月的窟窿像深渊。",
    minStage: 5, weight: 6,
    condition: (s) => s.tags.includes("whale-dependency"),
    choices: [
      {
        id: "diversify-fast", text: "把续约团队改成独立销售军团，90 天冲刺客户多元化",
        effects: { months: 1, cash: -20, mrrPct: -5, morale: -5, flag: "diversified" },
        resultText: "最终鲸鱼还是走了，但你们抢下了 12 个中小客户——单个都不大，加起来超过了原合同的 70%。集中度降到了 25%。",
        lessonTitle: "创业课 · 客户集中度的救赎",
        lesson: "失去大客户不是灾难，依赖才是。Salesforce 早期立下军规：没有任何客户贡献超过 10% 营收。分散的客户组合让公司抗风险能力指数级提升。",
      },
      {
        id: "discount-keep", text: "降价 30% + 加定制服务，无论如何先留住它",
        effects: { mrrPct: -25, cash: 10, morale: -10, flag: "deeper-whale" },
        resultText: "客户留下了。但你算了一笔账：这单现在几乎不赚钱，团队 40% 的产能被锁死。你保住了报表，押上了未来。",
        lessonTitle: "创业课 · 利润与规模的伪命题",
        lesson: "「战略性亏损」是创业者对自己说过最多的谎话。降价换来的续约只会招来下一轮更狠的压价。报价体系一旦崩溃，重建需要五年。",
      },
    ],
  },
  {
    id: "ip-theft-leak",
    title: "前员工带走的「代码」",
    scene:
      "离职三个月的前技术负责人创业了，产品界面和你的像亲兄弟，连埋的几个彩蛋都一模一样。法务评估：能告，但取证难、周期长、赢了也未必赔多少。",
    minStage: 4, weight: 4, once: true,
    choices: [
      {
        id: "sue", text: "起诉 + 公开声明，杀鸡儆猴",
        effects: { cash: -20, months: 1, reputation: 5, morale: -3 },
        resultText: "官司打了一年，庭前和解了。但圈内都知道了你「不好惹」，之后再没发生过类似的事。",
        lessonTitle: "创业课 · 知识产权防御战",
        lesson: "可口可乐的配方、腾讯的「南山必胜客」、华为对三星的专利反诉——IP 是沉默的护城河。竞业协议、代码权限分级、离职审计，要在信任尚存时就布好。",
      },
      {
        id: "outrun", text: "不纠缠，用三倍速度把它甩在身后",
        effects: { product: 12, cash: -10, morale: 5, flag: "outrun-copy" },
        resultText: "你把愤怒全部写进了代码。一年后对方的产品还停留在抄袭你的那一版，而你已经迭代了八个版本。",
        lessonTitle: "创业课 · 最好的报复是领先",
        lesson: "腾讯被抄袭困扰多年后的解法：微创新+开放平台，让抄袭者追不上迭代速度。法律是底线武器，速度才是终极防御——代码会过时，组织能力不会。",
      },
    ],
  },
  {
    id: "license-crackdown-game",
    title: "版号寒冬",
    scene:
      "监管部门通知：你的游戏/内容产品需要重新送审，审批周期 6-12 个月，期间不得商业化。团队用三年打磨的作品，命运突然悬在了一张批文上。",
    minStage: 3, weight: 5, once: true,
    condition: (s) => s.industry.id === "game" || s.industry.regRisk >= 0.3,
    choices: [
      {
        id: "oversea", text: "转战海外发行：翻译、本地化、买量，全组转型出海",
        effects: { months: 2, cash: -30, usersPct: 20, mrrPct: 15, morale: -10, flag: "gone-global" },
        resultText: "出海的第一年极其狼狈：不懂当地文化、渠道规则、支付方式。但第二年，海外收入超过了原计划的国内收入三倍。",
        lessonTitle: "创业课 · 出海求生",
        lesson: "2018 年游戏版号停发 9 个月，腾讯网易重挫，而莉莉丝、米哈游靠出海逆势崛起（《原神》海外收入占七成）。监管风险的本质是单一市场依赖——「东方不亮西方亮」是血泪换来的智慧。",
      },
      {
        id: "wait-license", text: "按兵不动，打磨产品等批文",
        effects: { months: 2, cash: -25, morale: -15, product: 10 },
        resultText: "批文终于下来了，但市场窗口已经错过：同类玩法被三家竞品做烂，用户审美疲劳。你赢回了资格，输掉了时机。",
        lessonTitle: "创业课 · 时机是隐形的成本",
        lesson: "创业的第一死因不是没钱，是「等」。时机成本从不在财务报表上体现，却真实吞噬着一切。 waiting is a decision——而且通常是最贵的那个。",
      },
    ],
  },
  {
    id: "scandal-traditional",
    title: "黑天鹅飞进后厨",
    scene:
      "一段视频在网络疯传：你们某家门店的后厨卫生问题被曝光，评论区一片「再也不去了」。你是连锁模式，一夜之间所有门店的流水掉了三成。",
    minStage: 3, weight: 4, once: true,
    condition: (s) => s.industry.id === "traditional" || s.industry.id === "ecom",
    choices: [
      {
        id: "full-transparency", text: "后厨直播+全线自查+受害门店停业整顿，CEO 出镜道歉",
        effects: { cash: -30, reputation: 8, usersPct: -10, morale: -5 },
        resultText: "道歉视频下的最高赞评论：「至少敢开直播」。三个月后流水恢复，「透明后厨」反而成了你们的品牌标签。",
        lessonTitle: "创业课 · 餐饮/实业危机公关",
        lesson: "海底捞「老鼠门」事件：两小时道歉、涉事门店停业、所有后厨开放参观——股价在三个月后创新高。实体行业的信任是日积月累的玻璃，碎了就用透明重建。",
      },
      {
        id: "franchise-blame", text: "撇清：那是加盟商/供应商的问题",
        effects: { reputation: -15, usersPct: -20, morale: -8 },
        resultText: "律师说从合同角度你没错。但消费者不在乎合同——在他们眼里，招牌是你的，责任就是你的。",
        lessonTitle: "创业课 · 品牌连带责任",
        lesson: "麦当劳被「福喜过期肉」拖累、蜜雪冰城食安问题永远算在品牌头上。加盟/供应链模式的悖论：你靠别人的手赚钱，就要为别人的错道歉。管理半径决定品牌命运。",
      },
    ],
  },
  {
    id: "angel-portfolio-crash",
    title: "被投公司连环爆雷",
    scene:
      "你的投资组合接连出事：A 公司创始人跑路、B 公司账目造假、C 公司被投资人集体诉讼。LP（出资人）的电话打进来：「你的尽调是怎么做的？」你的声誉和下一期基金都悬了。",
    minStage: 3, weight: 5, once: true,
    condition: (s) => s.industry.id === "angel",
    choices: [
      {
        id: "write-down", text: "主动核销坏账，向 LP 出详细复盘报告，建立投后风控体系",
        effects: { cash: -40, reputation: 8, months: 1 },
        resultText: "报告发出去的当晚，一位老 LP 回邮件：「亏钱我见过，敢认账的投资人我第一次见。」下一期基金的承诺出资额反而多了。",
        lessonTitle: "创业课 · 投资人的信任账户",
        lesson: "天使投资的失败率天然 60%+，LP 要的不是永不踩雷，而是踩雷后的诚实与体系。红杉也会投错——区别在错误率、认错速度和复盘质量。",
      },
      {
        id: "cover", text: "隐瞒亏损，用新项目的估值美化报表",
        effects: { reputation: -20, flag: "fund-fraud" },
        resultText: "纸包不住火。一位 LP 委托第三方审计后，你在圈内的名声先于基金破产了。",
        lessonTitle: "创业课 · 基金界的integrity",
        lesson: "WeWork 诺伊曼夸大财务数据、Theranos 血检造假——金融业的每一次崩塌都始于「让报表好看一点」。投资圈的口碑是复利最慢的资产，也是复利最狠的惩罚。",
      },
    ],
  },
  {
    id: "egg-cash-king",
    title: "🥚 彩蛋 · 「现金王」的悖论",
    scene:
      "会计师指着报表欲言又止：「您账上的现金比很多上市公司都多……但估值反而在跌。」你盯着屏幕陷入沉思——钱在手上，为什么公司越来越不值钱？（你已触发隐藏事件：现金与估值的悖论）",
    minStage: 4, weight: 0, once: true,
    condition: (s) => s.cash > 260 && s.mrr < 12 && !s.tags.includes("egg-cash-king"),
    choices: [
      {
        id: "deploy", text: "顿悟：钱要变成增长才有价值。把 30% 现金投入已验证的增长引擎",
        effects: { cash: -60, mrrPct: 30, valuationPct: 20, flag: "egg-cash-king" },
        resultText: "三个月后，钱变成了用户、口碑和营收曲线。估值开始跟着 MRR 起飞。你悟了：现金是弹药，不是勋章。🥚 彩蛋成就：现金的觉醒",
        lessonTitle: "创业课 · 现金的三种命运",
        lesson: "现金只有三种健康去向：1) 投入已验证的增长（ROIC 为正）2) 变成护城河（技术、牌照、人才）3) 备足 12 个月 runway 的余量。趴在账上的现金会被通胀和「不增长即贬值」的估值逻辑双重吞噬。",
      },
      {
        id: "hoard", text: "乱世现金为王，继续捂着",
        effects: { valuationPct: -10, flag: "egg-cash-king" },
        resultText: "现金还在，估值又跌了 10%。市场用真金白银给你上了一课。🥚 彩蛋成就：现金的觉醒（以反面教材的方式）",
        lessonTitle: "创业课 · 为什么现金多估值反而低",
        lesson: "估值的本质是未来现金流的折现。账上现金不产生增长信号时，投资人只会按「净资产+微量溢价」定价；而增长中的公司按「想象力」定价。现金决定你活多久，增长决定你值多少。",
      },
    ],
  },
  {
    id: "egg-musk-interview",
    title: "🥚 彩蛋 · 第一性原理的顿悟",
    scene:
      "深夜改 BP 时你突然问自己：「如果物理上可行，为什么我做不到？」一种久违的兴奋感涌上来——你发现自己正在用「第一性原理」拆解行业假设。窗外星光正好。🥚 隐藏彩蛋已触发：第一性原理",
    minStage: 2, weight: 0, once: true,
    condition: (s) => /musk|elon|马斯克|钢铁侠/i.test(s.name),
    choices: [
      {
        id: "first-principles", text: "把行业成本结构推倒重来，按物理极限重新设计产品",
        effects: { product: 15, valuationPct: 15, morale: 10, flag: "egg-first-principles" },
        resultText: "你砍掉了一个被整个行业视为「理所当然」的成本项。三个月后，对手们开始研究你的发布会录像。🚀「当别人用类比思考，我们用第一性原理。」",
        lessonTitle: "创业课 · 第一性原理（First Principles）",
        lesson: "SpaceX 把火箭成本从 6500 万美元打到 6000 万分之一的原因：不问「火箭为什么这么贵」，而问「造火箭的原材料值多少钱」（答案是售价的 2%）。类比思维让你成为更好的抄袭者，第一性原理让你成为颠覆者。",
      },
    ],
  },
  {
    id: "egg-garage",
    title: "🥚 彩蛋 · 车库里的第一台服务器",
    scene:
      "搬新办公室时，你在角落的纸箱里翻出了创业第一天用的那台旧笔记本——键盘缺了两个键，风扇声像拖拉机。你把它擦干净，摆在了新工位最显眼的位置。🥚 隐藏彩蛋已触发：不忘初心",
    minStage: 4, weight: 0, once: true,
    condition: (s) => s.product >= 90 && s.team >= 6 && !s.tags.includes("egg-garage"),
    choices: [
      {
        id: "keep-it", text: "把旧电脑供起来，给新员工讲「第一天」的故事",
        effects: { morale: 15, reputation: 5, flag: "egg-garage" },
        resultText: "新员工入职仪式多了一项：摸一摸那台缺键的笔记本。团队里流传着你的传说，文化成了最值钱的资产。🥚 彩蛋成就：不忘初心",
        lessonTitle: "创业课 · 文化不是墙上的标语",
        lesson: "亚马逊把门板当办公桌的传统保留了二十年、奈飞的「自由与责任」文化手册被硅谷疯传。伟大的公司都用「物」承载故事——旧电脑、第一笔订单、第一次失败。文化是公司的免疫系统。",
      },
    ],
  },
  // ── 行业专属事件：硬件 ────────────────────────────────────────────────────
  {
    id: "yield-hell",
    title: "量产良率地狱",
    scene:
      "代工厂传来消息：首批量产的良率只有 41%——每两个产品就有一个点亮失败。工程师说可能是散热设计余量不足，重做要 6 周；工厂建议「放宽检验标准先出货」。客户的首批订单还在等。",
    minStage: 3, weight: 6, once: true,
    condition: (s) => s.industry.id === "hardware",
    choices: [
      {
        id: "fix-design", text: "暂停出货，花 6 周重做散热与公差设计",
        effects: { months: 1, cash: -25, product: 15, reputation: 5 },
        resultText: "六周后良率爬到 92%。晚交付一个月，但你没有让 59% 的残次品流向市场——那个决定替你省下了未来三年的口碑债。",
        lessonTitle: "创业课 · 产能地狱",
        lesson: "Tesla Model 3 的「产能地狱」让马斯克睡在工厂，但坚持重质量不放手；小米早期靠代工质量管控打出口碑。硬件的良率是品牌的物理上限——放宽标准等于向未来借高利贷。",
      },
      {
        id: "ship-anyway", text: "放宽标准先出货，别让现金流断掉",
        effects: { cash: 20, reputation: -15, usersPct: 20, mrrPct: -15 },
        resultText: "前三个月出货顺利。第四个月，退货和差评像雪崩一样到来，渠道商要求全线召回。省下的时间连本带利还了回去。",
        lessonTitle: "创业课 · 质量的复利与单利",
        lesson: "硬件召回的成本 = 物流 + 商誉 + 渠道信任，通常是预防成本的十倍。三星 Note7 召回损失超 50 亿美元。质量是复利资产：省一次，亏十次。",
      },
    ],
  },
  {
    id: "mold-cost",
    title: "开模费的悬崖",
    scene:
      "结构设计定稿了。代工厂报价单上有一行刺眼数字：开模费 45 万，一次付清。账上的现金瞬间见底，但不开模就永远停在「漂亮的原型」阶段。",
    minStage: 2, weight: 5, once: true,
    condition: (s) => s.industry.id === "hardware",
    choices: [
      {
        id: "pay", text: "咬牙付清，压缩其他开支",
        effects: { cash: -45, product: 20, morale: -5 },
        resultText: "模具到厂那天你围着它转了三圈。45 万买的不只是塑料和钢，是从「手工作坊」跨向「产品公司」的门票。",
        lessonTitle: "创业课 · 硬件的固定成本悬崖",
        lesson: "硬件创业最难的不是技术，是固定成本悬崖：开模、认证、首批物料都是「不付就没有然后」的钱。大疆、韶音都经历过「账上只够一次开模」的时刻。融不到钱连犯错的资格都没有。",
      },
      {
        id: "3dprint", text: "先用 3D 打印小批量验证，攒够钱再开模",
        effects: { months: 2, product: 8, cash: -8, flag: "slow-mold" },
        resultText: "你用 3D 打印交付了第一批「丑但能用」的产品。速度慢了一半，但你还活着——而且第二批用户的需求反馈直接改进了开模设计。",
        lessonTitle: "创业课 · 分阶段验证",
        lesson: "Tesla Roadster 用 Lotus 的底盘先验证市场；Pebble 手表用 Kickstarter 预付款开模。硬件的铁律：让每一笔钱只为「验证下一个假设」服务，而不是一步到位。",
      },
    ],
  },
  // ── 行业专属事件：软件/SaaS ────────────────────────────────────────────────
  {
    id: "deploy-outage",
    title: "上线发布夜的大翻车",
    scene:
      "大版本发布，全组加班到凌晨。切换流量的瞬间，数据库连接池打满、核心接口超时、刚进来的用户看到满屏报错。回滚要 40 分钟，硬修可能两小时也可能更糟。监控群里甲方客户已经截图发问。",
    minStage: 3, weight: 6, once: true,
    condition: (s) => ["ai", "consumer"].includes(s.industry.id),
    choices: [
      {
        id: "rollback", text: "立即回滚，先保稳定，白天再复盘",
        effects: { reputation: 5, product: -3, morale: -5 },
        resultText: "回滚 40 分钟完成，用户几乎无感。第二天的复盘会上，你们立下「发布红线」：任何变更可回滚、灰度先行。",
        lessonTitle: "创业课 · 可回滚的发布",
        lesson: "Knight Capital 2012 年因一次没有回滚方案的系统部署，45 分钟亏 4.4 亿美元直接破产。谷歌 SRE 的黄金法则：发布的第一优先级不是新功能，是随时可以撤回。稳定性是 SaaS 的合同本体。",
      },
      {
        id: "fix-forward", text: "现场硬修，赌一把凌晨人少",
        effects: { product: 10, reputation: -12, usersPct: -10, health: -5 },
        resultText: "凌晨两点终于修好了，但欧洲时区的客户已经上班。早上的技术社区出现了长文：《某服务凌晨宕机三小时始末》。",
        lessonTitle: "创业课 · 修复 vs 回滚的算术",
        lesson: "fix-forward 的期望收益只有在「故障域极小+回滚成本极高」时才成立。AWS 的 Well-Architected 框架第一条就是「设计失败」：假设一切会崩，让崩的时候代价最小。",
      },
    ],
  },
  {
    id: "api-dep",
    title: "赖以生存的 API 突然涨价 8 倍",
    scene:
      "邮件来得毫无预兆：你们调用量最大的第三方 API（地图/大模型/支付）宣布新定价，成本涨 8 倍，30 天后生效。你的产品 60% 的核心功能都建立在它上面。",
    minStage: 3, weight: 5, once: true,
    condition: (s) => ["ai", "consumer", "fintech"].includes(s.industry.id),
    choices: [
      {
        id: "self-host", text: "三个月自研替代方案，长痛不如短痛",
        effects: { months: 1, cash: -30, product: 5, mrrPct: 10, flag: "self-hosted" },
        resultText: "三个月地狱般的迁移。但当新价生效那天，你淡定地喝着咖啡看同行哀嚎——核心技术握在自己手里的感觉，是创始人的终极安全感。",
        lessonTitle: "创业课 · API 依赖症",
        lesson: "Twitter API 涨价逼死了大批第三方客户端、Reddit API 改革引发黑屏抗议、某大模型厂商一次调价让无数套壳产品瞬间归零。技术栈的「单点依赖」和供应链单一供应商是同一个病。",
      },
      {
        id: "absorb", text: "咬牙接受涨价，先保住增长",
        effects: { mrrPct: -15, cash: -15, morale: -3 },
        resultText: "毛利率被砍了一大刀。你开始理解：你们不是在为自己打工，是在为那家 API 公司打工。",
        lessonTitle: "创业课 · 利润的归属权",
        lesson: "如果你的成本结构里有一个随时能掐你脖子的变量，利润就不属于你。Zapier 早期的策略是「API 之上建护城河，但绝不把命脉交出去」。议价能力 = 可替代性。",
      },
      {
        id: "multicloud", text: "立刻接入两家备选供应商，动态切换流量",
        effects: { cash: -12, product: -8, morale: -5 },
        resultText: "切换层写得极其痛苦，但你从此有了谈判筹码。下次续约，对方主动给了折扣。",
        lessonTitle: "创业课 · 永远留有 Plan B 的接口",
        lesson: "Netflix 的 Chaos Monkey 故意随机关停服务来逼系统具备容错能力。对供应商也是：架构上预留 20% 的「可替换性」，成本是平时的麻烦，收益是危机时的生路。",
      },
    ],
  },
  {
    id: "private-deploy",
    title: "大客户要「私有化部署」",
    scene:
      "一家大型集团客户递来意向：年合同额是你现在 MRR 的三倍，但要求整套系统私有化部署到他们的机房，外加三个月定制改造和专属驻场团队。签，等于为一个大客户变成项目公司；不签，现金流的窟窿补不上。",
    minStage: 4, weight: 5, once: true,
    condition: (s) => s.industry.id === "ai",
    choices: [
      {
        id: "standard-only", text: "只接受标准 SaaS 版本：「我们的产品是标准品」",
        effects: { morale: 5, reputation: 3 },
        resultText: "对方愣了一下，两个月后回来说服了自己的 IT 委员会：用你们的标准版。你守住了产品化路线，团队士气为之一振。",
        lessonTitle: "创业课 · SaaS 的纪律",
        lesson: "Atlassian 上市前坚持不做任何定制、Salesforce 靠标准产品打天下。私有化部署的隐性成本：代码分支维护、版本升级噩梦、销售定制军备竞赛。标准产品的拒绝能力，是 SaaS 估值倍数的来源。",
      },
      {
        id: "take-private", text: "签！营收先救命，定制化以后再说",
        effects: { cash: 40, mrrPct: 35, product: -10, morale: -8, flag: "project-company" },
        resultText: "合同到账的那一刻很香。但半年后你们的代码库变成了「一个标准版+三个定制版」，每次发版都像排雷。你隐约看到了自己正在变成一家外包公司。",
        lessonTitle: "创业课 · 收入的质量",
        lesson: "投资人给 SaaS 高估值是因为「可复制、可规模化的收入」。定制项目收入估值倍数只有标准 SaaS 的零头。短期现金流和长期估值的取舍，是增长期创始人最贵的选择题。",
      },
    ],
  },
  // ── 行业专属事件：游戏 ────────────────────────────────────────────────────
  {
    id: "channel-negotiation",
    title: "渠道分成谈判：五五开还是自立门户？",
    scene:
      "你们的游戏冲上榜单，渠道方派来商务：「恭喜！续约条件谈一下——分成比例从 30% 提到 50%，顺便独家首发给我们。」与此同时，自建官网/官服的技术方案也摆在你桌上。",
    minStage: 4, weight: 5, once: true,
    condition: (s) => s.industry.id === "game",
    choices: [
      {
        id: "accept-channel", text: "接受 50% 分成：大树底下好乘凉",
        effects: { usersPct: 25, mrrPct: 20, morale: -5 },
        resultText: "流量确实更猛了，但你算了笔账：每收入 100 元，渠道拿 50、税后再扣，团队到手刚够发工资。你成了渠道的内容供应商。",
        lessonTitle: "创业课 · 渠道霸权",
        lesson: "苹果 App Store 与 Epic 的「30% 税」大战打到最高法院；国内安卓渠道 50% 分成逼出米哈游《原神》拒绝上架硬核联盟的豪赌——结果原神 80% 收入来自官服。渠道是放大器，也是抽血泵。",
      },
      {
        id: "self-publish", text: "拒绝独家，自建官服+多端发行（TapTap/Steam/海外）",
        effects: { usersPct: -15, mrrPct: 10, cash: -20, flag: "self-published" },
        resultText: "短期流水跌了，但用户数据第一次完整躺在你们自己的后台。社区直接对话玩家，口碑开始自增长。三个月后，官服流水反超渠道服。",
        lessonTitle: "创业课 · 用户资产的所有权",
        lesson: "心动 CEO 黄一孟做 TapTap 的初心就是「不让渠道吃独食」；Steam 让独立开发者直连全球玩家。谁握着用户数据和关系，谁就握着定价权与续命粮。",
      },
    ],
  },
  {
    id: "cheat-farm",
    title: "外挂与打金工作室攻陷服务器",
    scene:
      "排行榜前十里有六个是脚本号，打金工作室批量刷资源挂到交易平台，正常玩家在世界频道刷屏退游。技术组给出方案：上高强度反作弊（误伤风险）或做经济系统大改（伤筋动骨）。运营组哀求：「先出活动稳一稳吧。」",
    minStage: 4, weight: 5, once: true,
    condition: (s) => s.industry.id === "game",
    choices: [
      {
        id: "war-on-cheat", text: "铁腕治理：封号+法律函+交易溯源三管齐下",
        effects: { cash: -15, usersPct: -8, reputation: 10, morale: 5, flag: "clean-server" },
        resultText: "两周封了 12 万个号，法务给三个工作室发函。硬核玩家在社区刷屏：「这官方能处。」留存率止跌回升。",
        lessonTitle: "创业课 · 游戏经济的央行职责",
        lesson: "腾讯游戏安全团队万人规模打击外挂，PUBG 因外挂流失过半用户。游戏公司本质是虚拟经济的中央银行：通胀（工作室刷金）不治理，货币（玩家信任）就崩盘。治理的短期阵痛远小于失控的慢性死亡。",
      },
      {
        id: "look-away", text: "睁一只眼闭一只眼，反正他们也在充钱",
        effects: { cash: 10, usersPct: -20, reputation: -10, morale: -5 },
        resultText: "工作室的月卡收入确实进账了。但正常玩家的道具被通胀稀释，三个月后月活腰斩——你赚的是毁灭游戏未来的钱。",
        lessonTitle: "创业课 · 饮鸩止渴的收入",
        lesson: "动视暴雪《暗黑3》现金拍卖行毁掉游戏经济被迫关闭；征途式「养工作室」模式透支口碑。收入分两种：让游戏更健康的钱，和让游戏更快死的钱。后者在报表上一样漂亮。",
      },
    ],
  },
  // ── 行业专属事件：金融科技 ────────────────────────────────────────────────
  {
    id: "payment-cut",
    title: "支付通道被掐断",
    scene:
      "合作银行发来公函：因「合作策略调整」，你们的支付通道 30 天后关闭。没有备援通道，用户的充值和提现将在一个月后全部停摆。金融业务的命门，握在别人手里。",
    minStage: 3, weight: 5, once: true,
    condition: (s) => s.industry.id === "fintech",
    choices: [
      {
        id: "multi-channel", text: "两周内接入三条备援通道，连夜迁移",
        effects: { months: 1, cash: -20, product: -5, flag: "multi-rail" },
        resultText: "切流那晚全组盯着监控大屏。通道关闭时，99% 的交易已经平滑迁移。你学到了金融业最朴素的一课：通道必须永远有备胎。",
        lessonTitle: "创业课 · 金融基础设施冗余",
        lesson: "2018 年「断直连」重构了整个第三方支付格局，没有备援通道的公司当场死亡。Stripe 从第一天就多收单机构并行。金融的系统设计哲学：任何单点故障都是时间问题，不是概率问题。",
      },
      {
        id: "beg-bank", text: "托关系挽留，争取延期",
        effects: { months: 1, cash: -10, reputation: -5 },
        resultText: "延期批了 60 天。但你清楚，把公司命脉寄托在别人的「慷慨」上，是创业者最卑微的姿势。",
        lessonTitle: "创业课 · 谈判地位来自替代方案",
        lesson: "BATNA（最佳替代方案）决定谈判力。没有备援通道时，你不是在谈判，是在求饶。金融创业者的人脉应该花在「建第二条路」上，而不是「保住第一条路」上。",
      },
    ],
  },
  {
    id: "aml-freeze",
    title: "反洗钱风控误杀：资金被冻结",
    scene:
      "一笔大额交易触发了风控模型，监管要求冻结相关资金 90 天配合调查。这笔钱占你流动性的 40%。法务说配合调查是义务；CFO 说 90 天后公司可能已经发不出工资。",
    minStage: 4, weight: 4, once: true,
    condition: (s) => s.industry.id === "fintech",
    choices: [
      {
        id: "comply", text: "全力配合调查，同时启动过桥融资补流动性",
        effects: { debt: 30, months: 1, reputation: 8 },
        resultText: "调查第 87 天，资金解冻，公司还白捡一次「合规经得起查」的背书。桥接贷款贵，但信用无价。",
        lessonTitle: "创业课 · 监管配合是长期资产",
        lesson: "蚂蚁金服整改后重启上市进程、Coinbase 主动拥抱监管换来合规溢价。金融业里，监管关系不是成本中心，是护城河的一部分。短痛换长通行证。",
      },
      {
        id: "circumvent", text: "用关联账户绕开冻结，先保运营",
        effects: { reputation: -20, flag: "reg-blackmark" },
        resultText: "资金流绕开的第三周，监管问询函到了。性质从「配合调查」变成了「妨碍调查」。你用最贵的方式省了 60 天。",
        lessonTitle: "创业课 · 金融业的红线意识",
        lesson: "Wirecard 伪造账目的结局是 190 亿欧元市值归零、高管被捕；瑞幸财务造假的代价是退市+集体诉讼。金融业没有任何一个决定值得用「妨碍监管」来换——那是公司信用的一次性自杀按钮。",
      },
    ],
  },
  // ── 行业专属事件：跨境电商 ────────────────────────────────────────────────
  {
    id: "logistics-explode",
    title: "爆单之后，物流瘫痪",
    scene:
      "一款产品在短视频平台意外爆单：日销从 200 件冲到 8000 件。庆祝持续了不到 48 小时——合作物流爆仓，包裹积压 12 天，差评和退款申请如雪片般飞来，店铺评分从 4.8 跌到 4.2。",
    minStage: 4, weight: 5, once: true,
    condition: (s) => s.industry.id === "ecom",
    choices: [
      {
        id: "air-freight", text: "紧急切换空运+临时仓，高价保时效",
        effects: { cash: -25, usersPct: 5, reputation: 8, mrrPct: -5 },
        resultText: "利润被运费吃掉大半，但评分稳住了。事后你建立了「爆单预案」：三级物流冗余+自动切换阈值。",
        lessonTitle: "创业课 · 增长的供应链带宽",
        lesson: "SHEIN 的小单快反、亚马逊的 FBA 前置仓，本质都是「用供应链冗余买增长确定性」。Zara 靠物流速度打败时装周期。爆单死掉的公司比没单死掉的多——机会只奖励接得住的供应链。",
      },
      {
        id: "let-it-burn", text: "让客户等，慢慢消化积压",
        effects: { cash: 10, reputation: -15, usersPct: -25, morale: -8 },
        resultText: "积压清了，店铺也半废了。平台算法把低评分店铺踢出了流量池——爆单带来的 50 万曝光，变成了 5 万条差评的纪念碑。",
        lessonTitle: "创业课 · 平台经济评分即生死",
        lesson: "亚马逊 Buy Box 算法里，物流时效权重极高；淘宝动态评分低于 4.6 流量腰斩。跨境品牌的真正资产不是产品，是店铺评分和履约记录——它们是用钱买不来的复利。",
      },
    ],
  },
  {
    id: "deadstock",
    title: "海外仓里的「沉睡库存」",
    scene:
      "季末盘点让你倒吸一口凉气：海外仓压了价值 60 万的过季库存，仓储费还在每天计费。运营给出三个选项：清仓甩卖（回血但伤品牌）、继续养着（等旺季）、销毁弃置（止损但血本无归）。",
    minStage: 4, weight: 4, once: true,
    condition: (s) => s.industry.id === "ecom",
    choices: [
      {
        id: "clearance", text: "限时清仓+捆绑销售，快速回笼现金",
        effects: { cash: 25, reputation: -5, mrrPct: -10 },
        resultText: "三周清掉七成库存，现金回血。品牌粉丝群里有人吐槽「买早了」，你发了补偿券——用 5% 的代价保住了 95% 的信任。",
        lessonTitle: "创业课 · 库存是吞现金的怪兽",
        lesson: "凡客陈年毁于库存、海澜之家靠「轻库存快反」翻身。零售的终极命题是库存周转：现金压在仓库里就是亏损。索罗斯说过「我富有只是因为我知道何时认错」——清库存就是商业上的止损。",
      },
      {
        id: "hold-season", text: "扛到旺季，原价慢慢卖",
        effects: { cash: -15, months: 2, mrrPct: 15 },
        resultText: "旺季卖掉了一半，另一半跌价 30% 才出清。算上四个月的仓储费，这笔「等待」的净收益是负数。",
        lessonTitle: "创业课 · 现金的时间价值",
        lesson: "库存的机会成本 = 压货金额 × 资金成本 × 时间 + 仓储 + 跌价风险。服装设计行业的规律：过季库存每年贬值 30-50%。「等旺季」的算盘常常是安慰剂。",
      },
    ],
  },
  // ── 行业专属事件：传统行业 ────────────────────────────────────────────────
  {
    id: "site-selection",
    title: "选址的蝴蝶效应",
    scene:
      "扩张第三家店，两个候选铺面摆在桌上：A 铺位于新商圈核心，租金高 40% 但人流旺；B 铺是成熟社区底商，租金便宜但增长见顶。你的店长各执一词，而租金一签就是五年。",
    minStage: 2, weight: 4, once: true,
    condition: (s) => s.industry.id === "traditional",
    choices: [
      {
        id: "data-driven", text: "蹲点两周数人流、算翻台率、测竞品动线，用数据定",
        effects: { months: 1, cash: -5, product: 5, mrrPct: 10 },
        resultText: "数据说 A 铺周末人流是 B 铺的三倍，但工作日平平。你选了 A 并调整了营业时段侧重——第三个月就实现盈利。",
        lessonTitle: "创业课 · 实体生意的尽调",
        lesson: "海底捞选址要看 51 项指标，7-11 用 GIS 系统评估每个铺面。实体行业的「产品迭代」就是选址模型：蹲点数人流、看车流方向、算竞品距离，朴素但致命。房租差 40% 是小事，选错位置的五年租约是大事。",
      },
      {
        id: "gut-feel", text: "相信直觉：B 铺看着踏实，租金压力小",
        effects: { cash: 10, months: 2, mrrPct: -15, morale: -5 },
        resultText: "B 铺如期「稳定」——稳定地不增长。两年后续约时你才发现，新商圈的 A 位置已经被竞品拿下，每天看着它排队。",
        lessonTitle: "创业课 · 位置的不对称性",
        lesson: "实体生意里，位置是少数不可复制的护城河。星巴克把最好的街角全部提前锁死。省下的 40% 租金，买断了你错失增长的机会成本——实体的失败常常不是经营问题，是坐标问题。",
      },
    ],
  },
  {
    id: "raw-material",
    title: "原材料涨价 40%",
    scene:
      "上游供应商通知：核心原材料国际市场涨价 40%，且随行就市。你的毛利本来就不厚。采购建议签一年锁价长协（量大价稳但占资金）， CFO 建议随用随买（灵活但赌行情）。",
    minStage: 3, weight: 4, once: true,
    condition: (s) => s.industry.id === "traditional" || s.industry.id === "hardware",
    choices: [
      {
        id: "lock-price", text: "签锁价长协+战略备货六个月",
        effects: { cash: -30, mrrPct: 8, flag: "price-locked" },
        resultText: "半年后同行都在涨价时，你的成本纹丝不动，顺势抢了一波市场份额。占用资金的机会成本，换来了定价战的弹药。",
        lessonTitle: "创业课 · 供应链套保思维",
        lesson: "航空公司用燃油期货锁成本、麦当劳长期锁牛肉采购价。实业的利润经常被上游波动吞噬，锁价本质是「用确定性换利润」。巴菲特的伯克希尔多赚的一笔，就来自金融危机前锁的原材料长协。",
      },
      {
        id: "spot-buy", text: "随行就市，现金为王",
        effects: { cash: 5, mrrPct: -12 },
        resultText: "材料价一路涨到 60%。你被迫跟着提价，客户流失了一成。省下的采购资金，不够填毛利率的窟窿。",
        lessonTitle: "创业课 · 现货采购是裸奔",
        lesson: "2008 年金融危机、2021 年大宗商品暴涨，无数中小企业死于「随用随买」的裸奔策略。现金为王不假，但「该花确定性钱的时候省现金」是另一场赌博——赌行情永远友好。",
      },
    ],
  },
  // ── 行业专属事件：VC/PE 基金 ─────────────────────────────────────────────
  {
    id: "vc-deal-flow",
    title: "项目找上门：投不投？",
    scene:
      "一位创始人带着 BP 堵在你的办公室：企业服务的某个细分赛道，团队来自大厂，天使轮估值 1500 万，愿意让你领投。你的投委会群里，大家意见分裂。",
    minStage: 3, weight: 6,
    condition: (s) => s.industry.id === "vcpe",
    choices: [
      {
        id: "lead", text: "领投 40 万：押注团队，签 TS",
        effects: { cash: -40, portfolioAdd: "领投 · 企业服务天使轮", reputation: 3 },
        resultText: "你打款 40 万，成为第一大股东。对方 CEO 在签约饭上说：「我们找的不是钱，是懂行的合伙人。」——这句话让你一整晚没睡着。",
        lessonTitle: "创业课 · 领投的责权",
        lesson: "领投意味着定价权和董事会席位，也意味着最大的敞口。红杉早期投 Google 时先投小额试探、追加时再领投——好项目值得加码，但第一笔钱永远当学费预算。",
      },
      {
        id: "follow", text: "跟投 15 万，小仓位观察",
        effects: { cash: -15, portfolioAdd: "跟投 · 观察仓" },
        resultText: "你跟了 15 万，换来一个董事观察员席位。投后你每月看一次报表，慢慢学会了用投资人的眼睛看生意。",
        lessonTitle: "创业课 · 跟投的艺术",
        lesson: "跟投（Follow-on）是控制学费成本的标准姿势：先用小仓位建立认知，验证后再加注。巴菲特说「第一次买叫试探仓位」。切忌第一单就 all-in——VC 的死亡率注定了分散是铁律。",
      },
      {
        id: "pass", text: "婉拒：赛道还没看懂，不赌不懂的局",
        effects: { morale: 2 },
        resultText: "你写了三页婉拒邮件，认真说明了你的顾虑。半年后对方上了头部机构的 portfolio 名单——你错过了，但记录里的「为什么没投」成了你最重要的复盘材料。",
        lessonTitle: "创业课 · 错过的艺术",
        lesson: "顶级 VC 也会错过 Google（红杉当年就拒绝了）、错过 Airbnb。巴菲特的「能力圈」原则在投资端同样成立：不投不是失误，乱投才是。把你的「pass 理由」写下来，它会变成你的投资框架。",
      },
    ],
  },
  {
    id: "vc-portfolio-win",
    title: "被投企业传来捷报",
    scene:
      "你投的某家公司拿下了行业标杆客户，下一轮融资估值翻了三倍，老股转让的报价摆在你面前：现在套现离场，还是继续持有赌一个 IPO？",
    minStage: 4, weight: 5,
    condition: (s) => s.industry.id === "vcpe" && (s.portfolio?.length ?? 0) >= 1,
    choices: [
      {
        id: "cash-out", text: "转让老股套现 80 万落袋为安",
        effects: { cash: 80, reputation: 5 },
        resultText: "交割款到账那天你给 LP 发了分红报告。一位 LP 回电：「会退钱的基金管理人，我才敢把下一期也给你。」",
        lessonTitle: "创业课 · DPI 才是硬道理",
        lesson: "基金行业最大的谎言是「账面回报」（TVPI），最真实的指标是 DPI（实际分回的现金）。许多明星基金portfolio 漂亮却十几年退不出钱——能给 LP 分现金的回报，才是金融业的信誉货币。",
      },
      {
        id: "hold", text: "继续持有：好资产不该在半山腰卖",
        effects: { valuationPct: 25 },
        resultText: "你拒绝了报价。公司次年确实估值再翻两倍——虽然这笔钱依然只是纸面富贵，但你的基金净值报告从此有了底气。",
        lessonTitle: "创业课 · 纸面富贵与真实回报",
        lesson: "二级市场价格不等于退出价格。Peter Thiel 投资 Facebook 后等了七年才 IPO 退出；孙正义持有阿里巴巴 14 年。持有需要两个前提：标的质量经得起周期 + LP 的耐心经得起你。",
      },
    ],
  },
  {
    id: "vc-lp-pressure",
    title: "LP 的质疑电话",
    scene:
      "出资人（LP）打来电话，语气不善：「两年投了八个项目，一个退出的都没有。管理费照收，DPI 是零。下一期基金，我要重新考虑。」你的 IR（投资人关系）能力迎来大考。",
    minStage: 4, weight: 5, once: true,
    condition: (s) => s.industry.id === "vcpe",
    choices: [
      {
        id: "transparent", text: "约 LP 面谈：公开全部组合状况、退出计划和时间表",
        effects: { reputation: 8, morale: 5 },
        resultText: "你把最难看的数字也摊在桌上。LP 沉默了一会儿说：「冲这份坦诚，下一期我给你留份额。」——信任是基金唯一的产品。",
        lessonTitle: "创业课 · LP 关系管理",
        lesson: "基金的商业模式是「管别人的钱」。危机时刻的透明度决定了 LP 的去留。桥水靠「极端透明」做到全球最大对冲基金；隐瞒坏消息的基金经理，会在下一次募资时被整个行业记住。",
      },
      {
        id: "promise", text: "画大饼：明年一定有两个项目 IPO",
        effects: { reputation: -10, flag: "lp-overpromise" },
        resultText: "LP 没再说什么。但「过度承诺」四个字被记进了对方内部的评估表。退出窗口如果不开，你的每一句话都会变成呈堂证供。",
        lessonTitle: "创业课 · 承诺的复利",
        lesson: "融资（无论募股还是募基金）卖的首先是信任。软银愿景基金 II 期募不动，LP 们公开质疑的正是第一期的「叙事与现实的差距」。对 LP 永远只承诺你能控制的：透明度、流程、努力，而不是结果。",
      },
    ],
  },
  // ── 合伙人专属事件 ────────────────────────────────────────────────────────
  {
    id: "cf-tech-refactor",
    title: "合伙人的深夜重构",
    scene:
      "凌晨两点你发现工作室的灯还亮着——技术合伙人阿哲正在给核心系统做第三次重构。「现在欠债，以后付利息，」他头也不回，「相信我，这波值。」",
    minStage: 2, weight: 0, once: true,
    condition: (s) => s.cofounder?.trait === "tech" && !s.tags.includes("ev-cf-tech-refactor"),
    choices: [
      {
        id: "trust", text: "给他一周：技术的事听技术的",
        effects: { product: 12, morale: 8 },
        resultText: "一周后系统像换了一台发动机。发版速度翻倍，线上故障清零。你在日记里写：找对合伙人，等于公司多长了一个器官。",
        lessonTitle: "创业课 · 技术合伙人的价值",
        lesson: "CTO 的第一职责不是写代码，是技术决策的质量。Stripe 的 Collison 兄弟、Google 的 Page & Brin——技术合伙人选对了，产品迭代速度是竞争对手的结构性优势。选错或不给权，是早期公司最贵的浪费。",
      },
    ],
  },
  {
    id: "cf-sales-whale",
    title: "Grace 的大单",
    scene:
      "销售合伙人 Grace 把一份合同拍在你桌上：行业头部客户，年框金额是现有 MRR 的四倍。「对方 CFO 是我十年前睡上下铺的兄弟，」她咧嘴一笑，「但价格我按标准价签的，一毛钱没让。」",
    minStage: 3, weight: 0, once: true,
    condition: (s) => s.cofounder?.trait === "sales" && !s.tags.includes("ev-cf-sales-whale"),
    choices: [
      {
        id: "celebrate", text: "全员庆功，把案例打磨成销售武器",
        effects: { mrrPct: 25, morale: 10, reputation: 5 },
        resultText: "案例写进官网首页后，同行业的询价电话排到了下个月。你意识到：好的销售合伙人不是卖货的，是打开整个市场的。",
        lessonTitle: "创业课 · 标杆客户的杠杆",
        lesson: "企业服务的获客成本里，『信任』最贵。一个标杆客户 = 背书 + 案例 + 转介绍。Salesforce 早期死磕时代华纳、AWS 早期拿下 Netflix——标杆客户的价值远超合同金额本身。",
      },
    ],
  },
  {
    id: "cf-mentor-dinner",
    title: "老徐的饭局",
    scene:
      "贵人型合伙人老徐一个电话，把三位在行业内说得上话的前辈约到了同一张饭桌上。酒过三巡，其中一位忽然说：「你这个项目，下次路演我来站台。」",
    minStage: 2, weight: 0, once: true,
    condition: (s) => s.cofounder?.trait === "mentor" && !s.tags.includes("ev-cf-mentor-dinner"),
    choices: [
      {
        id: "grateful", text: "敬酒，记在心里",
        effects: { reputation: 8, flag: "backup-investors", morale: 5 },
        resultText: "这顿饭之后，你的通讯录里多了三个愿意接你电话的人。你想起老徐常说的那句话：「创业到最后，拼的都是人品和口碑。」",
        lessonTitle: "创业课 · 贵人网络的复利",
        lesson: "雷军创立小米前是「中关村劳模」，人脉网用了二十年才织成；张小龙做微信前，是雷军周鸿祎都追着投资的人。贵人不是求来的，是十几年靠谱做事攒来的。合伙人带进来的网络，是公司最便宜的融资来源。",
      },
    ],
  },
  // ── 剧本模式：千团大战（2010） ─────────────────────────────────────────────
  {
    id: "sc-groupon-boom",
    title: "风口来了：千团大战开战",
    scene:
      "2010 年的北京，团购是唯一的叙事。你的对手这周又融了 5000 万美元，广告已经铺到了地铁站的每一寸墙面。地推团队在前线等你表态：跟不跟进这场「百团大战」？",
    minStage: 2, weight: 0, once: true,
    choices: [
      {
        id: "blitz", text: "全力跟进：烧钱换单量，先把规模做起来",
        effects: { cash: -30, usersPct: 80, mrrPct: -10, morale: 5, flag: "groupon-blitz" },
        resultText: "单量冲进了城市前三，账上的钱像水一样流走。投资人看着曲线笑了，财务看着余额哭了。",
        lessonTitle: "创业课 · 千团大战的教训",
        lesson: "2010-2012 年全国诞生了超过 5000 家团购网站。拉手网、窝窝团烧钱冲 IPO，美团却在同期打磨『商家服务体系』。历史证明：风口期烧出来的规模是租来的，租约到期就要还。",
      },
      {
        id: "steady", text: "克制扩张：守住两个城市的密度，把履约做扎实",
        effects: { cash: 10, product: 15, mrrPct: 15, morale: -3 },
        resultText: "规模排名不起眼，但复购率是对手的两倍。一线地推报告说：商家点名要跟你合作，『就冲你们结款快、不跑路』。",
        lessonTitle: "创业课 · 密度大于广度",
        lesson: "美团王兴在千团大战后期总结：『团购是本地生意，本地生意讲密度。』先把一个城市打到 60% 份额再开下一个。对比 Groupon 全球撒网后的崩盘——密度才是本地生活的护城河。",
      },
    ],
  },
  {
    id: "sc-groupon-capital",
    title: "资本的棋局",
    scene:
      "两家头部机构同时约你喝茶。话里话外是一个意思：团购赛道终局已定，你最好的出路是接受战略合并——成为『那家赢家』的一部分。你的联合创始人拍案而起：「我们凭什么给别人做嫁衣？」",
    minStage: 4, weight: 0, once: true,
    choices: [
      {
        id: "listen", text: "认真听条件：合并也是一门生意，先上桌谈判",
        effects: { reputation: 5, flag: "merger-talk" },
        resultText: "你按住联创的肩膀：『愤怒不估值，谈判才估值。』你带着财务顾问坐上了谈判桌——至少要先知道自己在别人棋盘上的价格。",
        lessonTitle: "创业课 · 资本意志与创始人意志",
        lesson: "2015 年美团与大众点评合并、滴滴快的合并、58 赶集合并——中国互联网的大合并时代，资本是最强推手。红杉沈南鹏们推动合并的逻辑：结束消耗战、合并份额、共享未来。创始人可以拒绝，但必须先听懂对方的牌。",
      },
      {
        id: "refuse-now", text: "当场拒绝：我们的终局是独立上市",
        effects: { morale: 8, reputation: -3 },
        resultText: "机构代表不置可否地笑了笑：『年轻人，我们尊重理想。』你走出茶馆时后背发凉——你知道这个『尊重』里，藏着他们已布局的对手。",
        lessonTitle: "创业课 · 拒绝资本的代价",
        lesson: "拒绝合并邀约的创业公司，后续往往拿不到同梯队资本的加注——这不是报复，是立场。京东当年拒绝各种『站队』、坚持自建物流和独立 IPO，靠的前提是手里还有能证明自己的牌。拒绝之前，先数清楚弹药。",
      },
    ],
  },
  {
    id: "sc-groupon-endgame",
    title: "千团大战的终局",
    scene:
      "2012 年，冬天到了。资本市场的钱一夜之间消失，5000 家团购网站正在批量倒闭，媒体的头条每天都在更新阵亡名单。你账上的现金只够三个月——而对方的合并邀约，还摆在桌上。",
    minStage: 4, weight: 0, once: true,
    choices: [
      {
        id: "merge", text: "接受战略合并，成为幸存者版图的一部分",
        effects: { endingId: "groupon-end" },
        resultText: "合并发布会那天，你看着两家团队的工牌换成同一家 logo。三年前跟你抢地盘的老对手，现在跟你挤在同一张大会议桌旁。千团大战结束了——你活了下来。",
        lessonTitle: "创业课 · 合并的结局",
        lesson: "美团点评合并后，点评系创始人张涛在全员会上哽咽离场。商业的终局很少是童话：合并保住了业务、团队和大部分人的饭碗，但创始人交出的是控制权。活下来的公司与活下来的理想，常常只能选一个。",
      },
      {
        id: "fight-alone", text: "拒绝合并，带着剩下的兄弟死磕到底",
        effects: { endingId: "groupon-dead" },
        resultText: "你把最后的钱发给了留下来的地推团队。倒下那天，办公室的白板上还写着明年的城市扩张计划。你在朋友圈发了一句话：『愿赌服输，但我们来过。』",
        lessonTitle: "创业课 · 炮灰的价值",
        lesson: "千团大战里死掉的几千家团购公司并非都是笑话——它们用尸骨铺出了本地生活赛道的用户习惯、地推体系和商家认知，美团的胜利建立在全行业试错的总和上。创业史上，「炮灰」与「先驱」经常是同一批人。",
      },
    ],
  },
  // ── 剧本模式：口罩风云（2020） ─────────────────────────────────────────────
  {
    id: "sc-mask-rush",
    title: "疫情突袭：订单爆炸",
    scene:
      "2020 年 2 月，世界停摆。你的工厂突然成了「战略物资单位」：口罩订单排到六个月后，电话被打爆，有客户带着现金在厂门口排队。工人三倍工资招不回来，熔喷布一天一个价。",
    minStage: 1, weight: 0, once: true,
    choices: [
      {
        id: "honest", text: "全力接单但守住质量和价格：签合同锁量锁价，不坐地起价",
        effects: { cash: 60, mrrPct: 40, reputation: 15, usersPct: 50, flag: "mask-boom" },
        resultText: "同行笑话你不会赚钱。但三个月后，你的客户没有一个毁约转单，而「坐地起价」的厂家名单正在采购圈里流传。",
        lessonTitle: "创业课 · 危机中的定价伦理",
        lesson: "2020 年有口罩厂因哄抬价格被顶格处罚、列入失信名单；比亚迪、五菱转产口罩反而赢得国字号口碑。危机是定价权的巅峰时刻，也是品牌信誉的试金石——暴涨的收入会退潮，留下的名声不会。",
      },
      {
        id: "gouge", text: "坐地起价：现货翻三倍，谁急谁先拿",
        effects: { cash: 120, mrrPct: 60, reputation: -20, flag: "mask-gouger" },
        resultText: "一个月内利润顶过去三年。但你半夜看到市场监管局的通报模板时，手心全是汗——名单上的下一个，可能就是正在数钱的人。",
        lessonTitle: "创业课 · 发国难财的算术",
        lesson: "短期暴利的三个隐性成本：1) 监管处罚（疫情期间多地口罩厂被立案）2) 客户关系的永久性透支 3) 团队价值观的污染。快钱是最慢的钱——它会在未来的每个路口收走本金。",
      },
    ],
  },
  {
    id: "sc-mask-speculator",
    title: "熔喷布狂潮：炒不炒？",
    scene:
      "核心原料熔喷布从 2 万/吨炒到 40 万/吨。厂里会计红着眼劝你：「囤一仓库，转手就是十倍利润，比辛辛苦苦做一年口罩强多了！」仓库门外，投机客的货车已经排起了队。",
    minStage: 2, weight: 0, once: true,
    choices: [
      {
        id: "no-speculate", text: "不碰投机：只按生产计划锁一个月用量，安心做制造",
        effects: { cash: -10, mrrPct: 10, morale: 5 },
        resultText: "会计气得半个月没理你。但四个月后熔喷布从 40 万跌回 3 万，囤料的同行在仓库门口哭了——你的工厂还在稳稳出货。",
        lessonTitle: "创业课 · 赚能力范围内的钱",
        lesson: "巴菲特：「能力圈之外的钱，赚得了一时，还回去时要连本带利。」2020 年炒熔喷布、2021 年炒芯片、炒锂矿的实业老板，多数在价格反转时连工厂都搭了进去。制造业的护城河是制造，不是投机。",
      },
      {
        id: "speculate", text: "抵押工厂囤 50 吨熔喷布，赌价格再上台阶",
        effects: { cash: -80, flag: "mask-speculator" },
        resultText: "两周内账面浮盈 200 万，全厂开会你发言都有回音。但期货市场的老话开始在你耳边响：『会买的是徒弟，会卖的是师傅。』——你还没想好什么时候卖。",
        lessonTitle: "创业课 · 存货投机的死亡螺旋",
        lesson: "囤货的本质是加了 10 倍杠杆做多大宗商品：涨时舍不得卖（贪婪），跌时卖不掉（流动性枯竭）。中储粮系统、国际粮商做套保的对冲逻辑，正是实业者最该学的——对冲价格波动，而不是赌博价格波动。",
      },
    ],
  },
  {
    id: "sc-mask-expand",
    title: "扩产的豪赌",
    scene:
      "省里的招商干部带着银行行长登门：「政府贴息贷款，三个月建成十条新产线，你就是全省的防疫物资重点企业。」你看着账上暴涨的现金——扩产十倍，赌疫情常态化；还是守住现有产线，把现金流存起来过冬？",
    minStage: 3, weight: 0, once: true,
    choices: [
      {
        id: "moderate", text: "适度扩产：新增两条线，大部分现金留着过冬",
        effects: { cash: -40, mrrPct: 30, product: 10, morale: 5 },
        resultText: "新产线投产时，你特意把旧设备的检修排上了日程。招商干部说你有定力，厂长说你胆小——只有你自己知道，你只是在等周期转身的那个声音。",
        lessonTitle: "创业课 · 逆周期扩产的纪律",
        lesson: "在需求顶点扩产是实业最大的陷阱：2020 年口罩产能一年扩张 20 倍，2021 年行业大洗牌，一半产线沦为废铁。三一重工、台积电的逆周期投资之所以成功，是因为它们赌的是『十年需求』而不是『当下需求』。",
      },
      {
        id: "all-in-expand", text: "all-in：贷款上十条线，把市场份额一口吃下来",
        effects: { cash: -150, debt: 100, mrrPct: 60, morale: 10, flag: "mask-allin" },
        resultText: "十条产线轰鸣的场面壮观极了，银行的贴息、政府的奖状、媒体的头条把你包围。但你在深夜复盘时总会多看一眼日历——疫情，总会结束的。",
        lessonTitle: "创业课 · 杠杆与周期",
        lesson: "「潮水退去才知道谁在裸泳」——2008 年、2020 年两次危机后批量死掉的都是「顶点加杠杆」的公司。实业扩张的铁律：用长债投长周期资产，用自有资金留 18 个月过冬钱。把周期当常态，是所有破产故事的第一页。",
      },
    ],
  },
  {
    id: "sc-mask-endgame",
    title: "风停了",
    scene:
      "疫苗普及，疫情退潮。口罩价格从 3 块跌到 2 毛，订单像退潮一样消失。政府储备订单开始招标，价格是市场价的 90%——亏着做，还是清盘退场？厂房门口，二手设备回收商的报价单已经递了三次。",
    minStage: 3, weight: 0, once: true,
    choices: [
      {
        id: "exit-peak", text: "见好就收：高位转让产线，把现金落袋",
        effects: { endingId: "mask-end" },
        resultText: "设备转让合同签完那天，你在空了一半的厂房里站了很久。两年，从身家见底到套现离场——你亲身验证了一个朴素的道理：在风口上，收手比伸手更需要勇气。",
        lessonTitle: "创业课 · 风口的退出纪律",
        lesson: "2020 年入场的口罩老板，赚到钱的只有两类：转产前就有工厂的（成本优势）、在疫情中期果断退出的（周期意识）。把周期行业的顶部当「新常态」，是制造业亏损的第一大原因。索罗斯的名言：『重要的不是对错，而是对的时候赚多少、错的时候亏多少。』",
      },
      {
        id: "hold-out", text: "咬牙硬扛：赌储备订单和政府关系能续命",
        effects: { endingId: "mask-crash" },
        resultText: "储备订单的毛利只有 3%，还不够付贷款利息。第九个月，银行收走了厂房。回收商拖走设备时，你想起订单爆炸那晚自己说的话：『这生意能再做十年。』——周期的耳光总是来得又快又响。",
        lessonTitle: "创业课 · 不要用杠杆赌周期见底",
        lesson: "2021-2022 年口罩行业大清算：据行业统计，超过一半 2020 年新入场企业在两年内退出，不少负债离场。『需求悬崖』是周期行业的专有名词——当你习惯了 3 块的订单，0.2 元的现实就是深渊。承认周期，是实业家最重要的诚实。",
      },
    ],
  },
];

// ─── 结局 ───────────────────────────────────────────────────────────────────
export const ENDINGS: Record<string, Ending> = {
  ipo: {
    id: "ipo", title: "🏛️ 上市敲钟", grade: "S",
    narrative:
      "敲钟前一分钟，你站在交易所的大厅里，突然想起很多年前的那个深夜——第一次发不出工资、第一次被投资人拒绝、第一次在医院走廊改 PPT。钟声响起的瞬间，你明白上市不是终点，而是把公司交给更大世界的起点。但你做到了：从车库到敲钟，十不存一的旅程。",
    lesson: "全球创业公司中最终能上市的不足 1%。能走到这里，靠的不是运气——是每一次现金流危机时的决断、每一次诱惑前的清醒、每一次跌倒后的爬起。恭喜，创业者。",
    stats: [],
  },
  acquired: {
    id: "acquired", title: "🤝 被收购退出", grade: "A",
    narrative:
      "交割仪式上，你和收购方 CEO 交换签字笔。团队的期权兑现了，有人买房，有人结婚，有人终于敢跟父母说『我这几年没瞎折腾』。你在收购协议最后一页签名时，手很稳。",
    lesson: "并购是最常见的成功退出方式（占退出事件的 90%+）。把公司卖个好价钱、让团队人人受益、让自己体面离场——这是被低估的英雄结局。不是每个故事都要 IPO 才配叫成功。",
    stats: [],
  },
  acquihire: {
    id: "acquihire", title: "🧩 人才收购（Acqui-hire）", grade: "B",
    narrative:
      "公司没能继续下去，但大厂看中了你们的团队，用一笔『安慰奖」打包收购。你带着团队入职那天，前投资人发来消息：『至少人还在，江湖再见。』",
    lesson: "Acqui-hire 是硅谷常见结局：公司死了，人值钱了。它验证了「优秀的团队本身就是资产」。对员工是归宿，对投资人是止损，对你是下一次出发的弹药。",
    stats: [],
  },
  shutdown: {
    id: "shutdown", title: "🕯️ 体面关停", grade: "B",
    narrative:
      "你在全员会上宣布了这个决定，把最后剩下的钱优先补偿了员工工资和供应商货款。散会后你独自关灯锁门。这不是失败，是你在所有坏选项里，选了一个最负责任的。",
    lesson: "硅谷对连续创业者有句名言：Fail fast, fail gracefully。90% 的创业公司都会死，区别只在于死得体面与否：不欠薪、不赖账、不拉用户垫背。体面关掉的创始人，下一次融资时反而更受尊重——市场记得你的品格。",
    stats: [],
  },
  bankrupt: {
    id: "bankrupt", title: "💸 破产清算", grade: "D",
    narrative:
      "银行账户冻结、办公室贴上封条、员工在劳动仲裁窗口排队。你在解散协议上签字时，笔没水了——就像你的现金一样。你输给的不是某一个对手，是 runrate、市场时机和一连串『再等等看』。",
    lesson: "破产是公司层面的死亡，但经验是你的。复盘清单：1) 是否过度乐观预测收入？2) 现金跑道是否低于 6 个月还在硬扛？3) 是否在该砍的时候舍不得？记住这次疼，下次你会成为更危险的创业者。",
    stats: [],
  },
  runaway: {
    id: "runaway", title: "🏃 欠债跑路", grade: "F",
    narrative:
      "深夜的机场，你把手机卡掰断扔进垃圾桶。供应商的催款短信还在旧手机里震动：『我们也有孩子要养。』你逃到一座南方小城，用假名在餐馆打工。每当电视里出现创业新闻，你都会默默换台。",
    lesson: "跑路是最差结局——它摧毁的不只是征信，还有你重新站在阳光下的资格。真正的创业者在绝境中会回到那张谈判桌：申请破产保护、协商债务重组、哪怕打工还债。信用破产比公司破产可怕一百倍。",
    stats: [],
  },
  burnout: {
    id: "burnout", title: "🩺 健康崩塌", grade: "C",
    narrative:
      "医生说你透支了十年的身体。你在病床上签下股权转让协议，把公司交给合伙人。窗外的阳光很好，你第一次注意到楼下花园的樱花开了——原来春天到了。",
    lesson: "公司可以转让、股权可以稀释、项目可以重来，只有身体和健康不可再生。投资人最喜欢的创始人画像是「可持续的狂热」，不是「燃烧自己照亮 PPT」。",
    stats: [],
  },
  // ── 剧本模式专属结局 ───────────────────────────────────────────────────
  "groupon-end": {
    id: "groupon-end", title: "🤝 千团大战 · 幸存者合并", grade: "A",
    narrative:
      "合并发布会那天，会场门口还立着另一家公司的易拉宝。三年前你们在同一座城市的每条街上贴身肉搏，今天成了同一面旗帜下的战友。你没有成为那个一统江湖的人——但五千家团购公司里，活下来的不超过十家。资本、时机与克制，替你交了学费。",
    lesson: "美团点评合并终结了千团大战。合并不是投降，是在资本寒冬里把两堆篝火合成一堆——取暖能力翻倍，而燃烧自我ego的速度减半。能在全行业死掉 95% 时坐在合并桌边，本身就是 A 级的胜利。",
    stats: [],
  },
  "groupon-dead": {
    id: "groupon-dead", title: "💀 千团大战 · 风口炮灰", grade: "C",
    narrative:
      "倒下那天，办公室白板上还写着明年的扩张计划。地推团队的工牌还挂在墙上，像一排沉默的纪念碑。你后来发现：拉手的上市折戟、窝窝团的市值蒸发——不是只有你在冬天倒下，是五千个兄弟一起倒下的。",
    lesson: "千团大战的阵亡名单长达五千家。它们教会了幸存者的用户习惯、地推体系和商家认知——美团的胜利建立在全行业的试错总和上。创业史上「炮灰」与「先驱」是同一批人，区别在于谁来写历史。愿赌服输，但你来过。",
    stats: [],
  },
  "mask-end": {
    id: "mask-end", title: "🌬️ 口罩风云 · 高位套现", grade: "A",
    narrative:
      "设备转让合同签完那天，你在空了一半的厂房里站了很久。两年：从身家见底到订单爆炸，再到在所有人劝你「再赌一把」时收手离场。你把现金换成了厂房隔壁那间小办公室的钥匙——门牌上写着新的公司名，行业那一栏，你还没想好。",
    lesson: "2020 年入场的口罩老板赚到钱的只有两类：转产前就有工厂的、在疫情中期果断退出的。把周期行业的顶部当新常态是亏损的第一大原因。索罗斯：「重要的不是对错，而是对的时候赚多少、错的时候亏多少。」",
    stats: [],
  },
  "mask-crash": {
    id: "mask-crash", title: "📉 口罩风云 · 一地鸡毛", grade: "D",
    narrative:
      "回收商拖走最后一条产线时，按废铁价算的钱还不够结清搬运费。第九个月，银行收走了厂房；第十个月，你在原竞争对手的厂里打工做品控。有天新员工请教你怎么一眼识别次品，你笑了笑——这门手艺，是你用整个工厂换来的。",
    lesson: "2021-2022 年口罩行业大清算：一半新入场企业两年内退出，不少负债离场。「需求悬崖」是周期行业的专有名词——习惯了 3 块的订单，0.2 元的现实就是深渊。承认周期，是实业家最重要的诚实。",
    stats: [],
  },
};

// ─── 联合创始人 ─────────────────────────────────────────────────────────────
export const COFOUNDERS: Cofounder[] = [
  {
    id: "azhe", name: "阿哲", role: "技术合伙人", trait: "tech",
    desc: "前大厂架构师，话少活好。你们在一次黑客马拉松上通宵并肩过，他知道你所有的烂代码，还是选择跟你干。",
    bonus: "⚡ 被动：产品/技术推进速度 +20%（深夜重构事件线）",
  },
  {
    id: "grace", name: "Grace", role: "销售合伙人", trait: "sales",
    desc: "十五年 ToB 销售老兵，通讯录里躺着半个行业的 CFO。她卖的不是产品，是打开市场的第一扇门。",
    bonus: "💰 被动：营收转化效率 +30%（大单事件线）",
  },
  {
    id: "laoxu", name: "老徐", role: "贵人合伙人", trait: "mentor",
    desc: "你父亲的旧识、连续创业者，投过也黄过三家公司。他不一定懂你的技术，但他懂得人在局里的每一步棋。",
    bonus: "🍀 被动：融资成功率 +8%（贵人饭局事件线）",
  },
];

// ─── 剧本模式 ───────────────────────────────────────────────────────────────
export const SCENARIOS: ScenarioDef[] = [
  {
    id: "groupon",
    title: "千团大战（2010）",
    year: 2010,
    tagline: "五千家团购公司，只有不到十家活到终局。你是冲锋者，还是幸存者？",
    realHistory: "改编自 2010-2012 年真实千团大战：拉手网/窝窝团烧钱冲 IPO 折戟，美团靠密度与克制成为终局赢家，2015 年美团点评合并。",
    regionId: "beijing",
    industryId: "consumer",
    startCash: 40,
    endingHint: "固定事件链 · 两种真实历史走向的结局",
    queue: [
      { month: 3, eventId: "sc-groupon-boom" },
      { month: 6, eventId: "burn-war" },
      { month: 9, eventId: "investor-ghost" },
      { month: 11, eventId: "sc-groupon-capital" },
      { month: 13, eventId: "sc-groupon-endgame" },
    ],
    finalEventId: "sc-groupon-endgame",
  },
  {
    id: "mask",
    title: "口罩风云（2020）",
    year: 2020,
    tagline: "订单排到半年后、原料涨 20 倍——风口的盛宴，还是周期的陷阱？",
    realHistory: "改编自 2020 年疫情口罩产业：熔喷布从 2 万炒到 40 万/吨、产能一年扩张 20 倍、2021 年行业大洗牌。赚快钱与守纪律的人走向了不同的结局。",
    regionId: "shenzhen",
    industryId: "traditional",
    startCash: 60,
    endingHint: "固定事件链 · 纪律与贪婪对应不同结局",
    queue: [
      { month: 2, eventId: "sc-mask-rush" },
      { month: 4, eventId: "sc-mask-speculator" },
      { month: 6, eventId: "sc-mask-expand" },
      { month: 9, eventId: "sc-mask-endgame" },
    ],
    finalEventId: "sc-mask-endgame",
  },
];

// ─── 访谈题库 ───────────────────────────────────────────────────────────────
export interface InterviewQuestion {
  id: string;
  text: string;
  score: number; // 好的访谈问题得分
  why: string;
}

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  { id: "q1", text: "「你上一次遇到这个问题是什么时候？当时怎么解决的？」", score: 3, why: "问真实行为而非假设——「你会付费吗」得到的全是客套话，「你上周怎么解决的」才是真相。" },
  { id: "q2", text: "「能给我看看你现在是怎么 workaround（凑合解决）的吗？」", score: 3, why: "有 workaround 说明痛点真实且急迫。Dropbox 创始人在论坛里发现人们用各种奇葩方式同步文件，验证了需求。" },
  { id: "q3", text: "「如果这产品今天就能用，你愿意预付一年费用吗？」", score: 2, why: "嘴上说好用不算数，愿意掏钱的承诺才是 PMF 信号。Stripe 最早的用户都是还没产品就付了款的。" },
  { id: "q4", text: "「你觉得这个产品有没有前途？」", score: 0, why: "糟糕的问题：对方只会说你想听的。礼貌的谎言是访谈最大的噪音。" },
  { id: "q5", text: "「这个问题让你损失了多少钱/时间？能说具体点吗？」", score: 3, why: "量化痛点：损失越大、越具体，付费意愿越强。「挺麻烦的」和「每月损失 2 万块」之间隔着一整个商业模式。" },
  { id: "q6", text: "「我给你演示一下我们的想法，你觉得酷吗？」", score: 0, why: "演示会锚定对方，收获的全是恭维。The Mom Test 第一条规则：谈论对方的生活，而不是你的想法。" },
  { id: "q7", text: "「谁还会遇到这个问题？能介绍我认识吗？」", score: 2, why: "好的访谈自带获客渠道。「谁痛得最厉害」帮你找到第一批种子用户，转介绍是免费的精准流量。" },
  { id: "q8", text: "「你打算为这个付多少钱？」", score: 1, why: "直接问价格会触发谈判本能，得到的答案偏乐观。更好的方式：问当前替代方案的预算，或做真实的预售测试。" },
  { id: "q9", text: "「如果明天这个问题消失，你的日子会有什么不同？」", score: 2, why: "衡量价值感：如果对方说不出「会怎样」，说明痛点没痛到改变行为——而没有行为改变就没有市场。" },
];

// ─── 随机名字 ───────────────────────────────────────────────────────────────
export const NAMES = {
  male: ["陈舟", "李昂", "Alex Chen", "Max Weber", "Jack Liu", "顾远", "Kevin Tan", "王一鸣"],
  female: ["林晚", "苏晴", "Sarah Lin", "Emma Zhang", "赵敏之", "Lena Fischer", "陈曦", "Maya Chen"],
};

export const STAGE_NAMES: Record<string, string> = {
  idea: "💡 灵感期",
  validate: "🔍 需求验证",
  mvp: "⚒️ MVP 开发",
  seed: "🌱 种子轮",
  growth: "🚀 增长期",
  seriesA: "📈 A 轮",
  scale: "🏭 规模化",
  endgame: "🏛️ 终局",
};
