import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Thermometer, Leaf, Flame, AlertTriangle, Waves, Brain } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import GlassCard from "@/components/common/GlassCard";
import { oceanRegions } from "@/components/map/OceanMap";

const monthlyTemp = [
  { m: "Jan", v: 24.1 }, { m: "Feb", v: 24.8 }, { m: "Mar", v: 25.5 },
  { m: "Apr", v: 26.2 }, { m: "May", v: 27.0 }, { m: "Jun", v: 27.8 },
  { m: "Jul", v: 28.3 }, { m: "Aug", v: 28.1 }, { m: "Sep", v: 27.4 },
  { m: "Oct", v: 26.6 }, { m: "Nov", v: 25.5 }, { m: "Dec", v: 24.5 },
];

const chlorophyll = [
  { m: "Jan", v: 0.12 }, { m: "Feb", v: 0.14 }, { m: "Mar", v: 0.18 },
  { m: "Apr", v: 0.22 }, { m: "May", v: 0.20 }, { m: "Jun", v: 0.16 },
  { m: "Jul", v: 0.13 }, { m: "Aug", v: 0.11 }, { m: "Sep", v: 0.14 },
  { m: "Oct", v: 0.17 }, { m: "Nov", v: 0.15 }, { m: "Dec", v: 0.13 },
];

const ChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#041C32] border border-[#006EE6]/30 rounded-lg px-3 py-2 shadow-xl">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold text-[#00D2D3]">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default function Region() {
  const { regionId } = useParams();
  const region = oceanRegions.find((r) => r.id === regionId);

  if (!region) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-2xl text-foreground mb-4">Region Not Found</h1>
        <Link to="/dashboard" className="text-[#00D2D3] hover:underline">← Back to Dashboard</Link>
      </div>
    );
  }

  const aiExplanation = `The ${region.name} region currently shows a sea surface temperature of ${region.temp}°C, which is ${region.temp > 25 ? "above" : "within"} normal seasonal range. Health score stands at ${region.health}/100 with a ${region.risk.toLowerCase()} risk classification. ${
    region.health < 60
      ? "Elevated thermal stress and declining chlorophyll concentrations suggest increasing pressure on marine ecosystems. Coral bleaching risk is significant in this area, warranting close monitoring and protective action."
      : "Conditions remain relatively stable, though continued monitoring is essential to detect early signs of environmental change."
  }`;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[#00D2D3] transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${region.color}20` }}>
            <Waves className="w-6 h-6" style={{ color: region.color }} />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground">{region.name}</h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs px-2.5 py-0.5 rounded-full font-medium" style={{ backgroundColor: `${region.color}15`, color: region.color }}>
                {region.risk} Risk
              </span>
              <span className="text-sm text-muted-foreground">Health: {region.health}/100</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <GlassCard className="p-4" delay={0.1}>
          <div className="flex items-center gap-2 mb-2">
            <Thermometer className="w-4 h-4 text-[#FF5252]" />
            <span className="text-xs text-muted-foreground">Temperature</span>
          </div>
          <p className="text-2xl font-display font-bold text-foreground">{region.temp}<span className="text-sm font-normal text-muted-foreground">°C</span></p>
        </GlassCard>
        <GlassCard className="p-4" delay={0.15}>
          <div className="flex items-center gap-2 mb-2">
            <Leaf className="w-4 h-4 text-[#00C853]" />
            <span className="text-xs text-muted-foreground">Chlorophyll</span>
          </div>
          <p className="text-2xl font-display font-bold text-foreground">0.15<span className="text-sm font-normal text-muted-foreground"> mg/m³</span></p>
        </GlassCard>
        <GlassCard className="p-4" delay={0.2}>
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-4 h-4 text-[#FFB300]" />
            <span className="text-xs text-muted-foreground">Heat Anomaly</span>
          </div>
          <p className="text-2xl font-display font-bold text-foreground">+{(region.temp * 0.045).toFixed(1)}<span className="text-sm font-normal text-muted-foreground">°C</span></p>
        </GlassCard>
        <GlassCard className="p-4" delay={0.25}>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4" style={{ color: region.color }} />
            <span className="text-xs text-muted-foreground">Bleaching Risk</span>
          </div>
          <p className="text-2xl font-display font-bold" style={{ color: region.color }}>{region.risk}</p>
        </GlassCard>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <GlassCard className="p-4" delay={0.3}>
          <h3 className="font-heading font-semibold text-sm text-foreground mb-4 flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-[#FF5252]" />
            Monthly Temperature
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyTemp}>
              <defs>
                <linearGradient id="rTempGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF5252" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FF5252" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="m" tick={{ fill: "#8B95A5", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#8B95A5", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="v" stroke="#FF5252" fill="url(#rTempGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-4" delay={0.35}>
          <h3 className="font-heading font-semibold text-sm text-foreground mb-4 flex items-center gap-2">
            <Leaf className="w-4 h-4 text-[#00C853]" />
            Chlorophyll Concentration
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chlorophyll}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="m" tick={{ fill: "#8B95A5", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#8B95A5", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Line type="monotone" dataKey="v" stroke="#00C853" strokeWidth={2} dot={{ fill: "#00C853", r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* AI Explanation */}
      <GlassCard className="p-6" delay={0.4}>
        <h3 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
          <Brain className="w-5 h-5 text-[#00D2D3]" />
          AI Environmental Analysis
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{aiExplanation}</p>
      </GlassCard>
    </div>
  );
}