import { useEffect } from "react";
import type { GameState } from "@/game/types";
import { playSfx } from "@/game/sfx";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  state: GameState;
  onRestart: () => void;
}

const GRADE_STYLE: Record<string, string> = {
  S: "text-amber-500 border-amber-500 bg-amber-50",
  A: "text-emerald-600 border-emerald-500 bg-emerald-50",
  B: "text-sky-600 border-sky-500 bg-sky-50",
  C: "text-slate-500 border-slate-400 bg-slate-50",
  D: "text-orange-500 border-orange-500 bg-orange-50",
  F: "text-rose-600 border-rose-500 bg-rose-50",
};

export default function EndingScreen({ state, onRestart }: Props) {
  const e = state.ending!;
  // 结局音效：S 敲钟 / A 到账 / D、F 低沉失败音
  useEffect(() => {
    if (e.grade === "S") playSfx("ipo-bell");
    else if (e.grade === "A") playSfx("cash");
    else if (e.grade === "D" || e.grade === "F") playSfx("fail");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-sky-50 text-slate-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white border-slate-200 shadow-lg">
        <CardHeader className="text-center space-y-3">
          <div className={`inline-flex mx-auto items-center justify-center w-20 h-20 rounded-full border-4 text-4xl font-black ${GRADE_STYLE[e.grade]}`}>
            {e.grade}
          </div>
          <CardTitle className="text-3xl text-slate-900">{e.title}</CardTitle>
          <p className="text-slate-500 text-sm">
            {state.name} · {state.region.flag} {state.region.name} · {state.industry.icon} {state.industry.name}
          </p>
        </CardHeader>
        <CardContent className="space-y-5">
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{e.narrative}</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {e.stats.map((s) => (
              <div key={s.label} className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-2 text-center">
                <div className="text-[10px] uppercase tracking-wider text-slate-400">{s.label}</div>
                <div className="text-sm font-bold text-slate-800">{s.value}</div>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-amber-300 bg-amber-50 p-4">
            <div className="text-amber-800 font-semibold text-sm mb-1">📖 最后一课</div>
            <p className="text-sm text-amber-900/80 leading-relaxed">{e.lesson}</p>
          </div>

          <Button className="w-full text-lg py-6 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500" onClick={onRestart}>
            🔄 再创业一次（这次会更强）
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
