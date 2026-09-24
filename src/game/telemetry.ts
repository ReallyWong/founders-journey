// ─── 匿名通关统计上报 + 本地生涯记录 ─────────────────────────────────────────
// 上报：ntfy.sh 公共主题（无需注册、无身份标识、fire-and-forget）。
// 消息仅含对局结果数据（结局/月数/行业/地区/估值），不含任何个人信息。
// 本地：fj_career 存玩家自己的生涯统计，驱动「结局图鉴」。

export interface RunReport {
  endingId: string;
  grade: string;
  months: number;
  industryId: string;
  regionId: string;
  valuation: number;
  mrr: number;
  eggCount: number;
  difficulty?: string;
  scenarioId?: string;
}

const TOPIC = "https://ntfy.sh/fj-founders-journey-v3";

export function reportRun(r: RunReport): void {
  try {
    if (typeof fetch === "undefined" || typeof navigator === "undefined") return;
    const body = JSON.stringify({ v: 1, ts: Date.now(), ...r });
    fetch(TOPIC, {
      method: "POST",
      headers: { Title: "FJ-run", Priority: "low", Cache: "2592000" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch { /* 静默失败，绝不影响游戏 */ }
}

// ─── 本地生涯统计（结局图鉴） ────────────────────────────────────────────────
export interface Career {
  runs: number;
  endings: Record<string, number>;
  industries: Record<string, number>;
  regions: Record<string, number>;
  bestGrade: string;
  eggs: Record<string, number>;
}

const GRADE_RANK: Record<string, number> = { S: 7, A: 6, B: 5, C: 4, D: 3, F: 2 };

export function loadCareer(): Career {
  try {
    const raw = localStorage.getItem("fj_career");
    if (raw) return JSON.parse(raw) as Career;
  } catch { /* ignore */ }
  return { runs: 0, endings: {}, industries: {}, regions: {}, bestGrade: "-", eggs: {} };
}

export function recordRun(c: Career, r: RunReport): Career {
  const n: Career = {
    runs: c.runs + 1,
    endings: { ...c.endings, [r.endingId]: (c.endings[r.endingId] ?? 0) + 1 },
    industries: { ...c.industries, [r.industryId]: (c.industries[r.industryId] ?? 0) + 1 },
    regions: { ...c.regions, [r.regionId]: (c.regions[r.regionId] ?? 0) + 1 },
    bestGrade: (GRADE_RANK[r.grade] ?? 0) > (GRADE_RANK[c.bestGrade] ?? 0) ? r.grade : c.bestGrade,
    eggs: { ...c.eggs },
  };
  try { localStorage.setItem("fj_career", JSON.stringify(n)); } catch { /* ignore */ }
  return n;
}
