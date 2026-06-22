import React, { useState } from "react";
import { motion } from "framer-motion";
import { Thermometer, Leaf, Flame, AlertTriangle, Activity, Droplets, Compass, Brain } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line } from "recharts";
import OceanMap from "@/components/map/OceanMap";
import MetricCard from "@/components/common/MetricCard";
import GlassCard from "@/components/common/GlassCard";

const tempTrend = [
  { month: "Jan", temp: 14.1 }, { month: "Feb", temp: 14.3 }, { month: "Mar", temp: 14.8 },
  { month: "Apr", temp: 15.4 }, { month: "May", temp: 15.9 }, { month: "Jun", temp: 16.2 },
  { month: "Jul", temp: 16.5 }, { month: "Aug", temp: 16.3 }, { month: "Sep", temp: 15.8 },
  { month: "Oct", temp: 15.2 }, { month: "Nov", temp: 14.6 }, { month: "Dec", temp: 14.2 },
];

const healthData = [
  { region: "N. Atlantic", score: 72 }, { region: "S. Pacific", score: 65 },
  { region: "Indian", score: 58 }, { region: "Arctic", score: 82 },
  { region: "Caribbean", score: 52 }, { region: "Mediterranean", score: 61 },
];

const anomalyData = [
  { year: "2019", anomaly: 0.4 }, { year: "2020", anomaly: 0.6 }, { year: "2021", anomaly: 0.8 },
  { year: "2022", anomaly: 1.0 }, { year: "2023", anomaly: 1.1 }, { year: "2024", anomaly: 1.2 },
  { year: "2025", anomaly: 1.3 },
];

const riskForecast = [
  { region: "Great Barrier Reef", risk: "Critical", percent: 92, color: "#FF5252" },
  { region: "Coral Triangle", risk: "Critical", percent: 88, color: "#FF5252" },
  { region: "Caribbean Sea", risk: "High", percent: 76, color: "#FFB300" },
  { region: "Indian Ocean", risk: "High", percent: 71, color: "#FFB300" },
  { region: "Mediterranean", risk: "Elevated", percent: 58, color: "#FFB300" },
];

const CustomTooltip = ({ active, payload, label }) => {
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

export default function Dashboard() {
  const [aiAnalysis] = useState(
    "Current global sea surface temperatures are trending +1.2°C above the 20th-century average. The Indian Ocean and Coral Triangle show critical thermal stress levels, with bleaching risk indices exceeding safe thresholds. Arctic ice extent has decreased 13% since 2020. Recommended action: increase monitoring frequency for tropical reef systems."
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
          Ocean Health Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">Global marine environment monitoring & AI analysis</p>
      </motion.div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard icon={Thermometer} label="Avg. Global Temp." value="+1.2" unit="°C" trend={3.2} color="#FF5252" delay={0} />
        <MetricCard icon={Leaf} label="Chlorophyll Index" value="0.15" unit="mg/m³" trend={-2.1} color="#00C853" delay={0.1} />
        <MetricCard icon={Activity} label="Ocean Acidity" value="8.05" unit="pH" trend={1.4} color="#FFB300" delay={0.2} />
        <MetricCard icon={Droplets} label="Sea Level Rise" value="+3.6" unit="mm/yr" trend={5.1} color="#006EE6" delay={0.3} />
      </div>

      {/* Map + Health Scores */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <GlassCard className="p-4" delay={0.2}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-heading font-semibold text-foreground flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#00D2D3]" />
                Interactive World Map
              </h2>
            </div>
            <OceanMap />
          </GlassCard>
        </div>

        <div className="space-y-4">
          <GlassCard className="p-4" delay={0.3}>
            <h3 className="font-heading font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#FFB300]" />
              Risk Forecast
            </h3>
            <div className="space-y-3">
              {riskForecast.map((r) => (
                <div key={r.region}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">{r.region}</span>
                    <span className="text-xs font-medium" style={{ color: r.color }}>{r.risk}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${r.percent}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: r.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-4" delay={0.4}>
            <h3 className="font-heading font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
              <Brain className="w-4 h-4 text-[#00D2D3]" />
              AI Analysis
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {aiAnalysis}
            </p>
          </GlassCard>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <GlassCard className="p-4" delay={0.5}>
          <h3 className="font-heading font-semibold text-sm text-foreground mb-4 flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-[#FF5252]" />
            Temperature Trend (°C)
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={tempTrend}>
              <defs>
                <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF5252" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FF5252" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: "#8B95A5", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#8B95A5", fontSize: 10 }} axisLine={false} tickLine={false} domain={[13.5, 17]} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="temp" stroke="#FF5252" fill="url(#tempGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-4" delay={0.6}>
          <h3 className="font-heading font-semibold text-sm text-foreground mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#00D2D3]" />
            Regional Health Scores
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={healthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="region" tick={{ fill: "#8B95A5", fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#8B95A5", fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="score" radius={[4, 4, 0, 0]} fill="#00D2D3" fillOpacity={0.7} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-4" delay={0.7}>
          <h3 className="font-heading font-semibold text-sm text-foreground mb-4 flex items-center gap-2">
            <Flame className="w-4 h-4 text-[#FFB300]" />
            Heat Anomaly Trend
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={anomalyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="year" tick={{ fill: "#8B95A5", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#8B95A5", fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 1.5]} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="anomaly" stroke="#FFB300" strokeWidth={2} dot={{ fill: "#FFB300", r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </div>
  );
}