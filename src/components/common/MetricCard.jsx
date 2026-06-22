import React from "react";
import GlassCard from "./GlassCard";

export default function MetricCard({ icon: Icon, label, value, unit, trend, color = "#00D2D3", delay = 0 }) {
  const trendUp = trend && trend > 0;
  const trendDown = trend && trend < 0;

  return (
    <GlassCard className="p-4" delay={delay}>
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        {trend !== undefined && (
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            trendUp ? "bg-[#FF5252]/10 text-[#FF5252]" : trendDown ? "bg-[#00C853]/10 text-[#00C853]" : "bg-[#FFB300]/10 text-[#FFB300]"
          }`}>
            {trendUp ? "↑" : trendDown ? "↓" : "→"} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div className="mt-3">
        <p className="text-2xl font-display font-bold text-foreground">
          {value}<span className="text-sm font-normal text-muted-foreground ml-1">{unit}</span>
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
      </div>
    </GlassCard>
  );
}