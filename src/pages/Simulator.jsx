import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sliders, Factory, Trash2, TreePine, Brain, Fish, Waves as WavesIcon } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import GlassCard from "@/components/common/GlassCard";
import { apiClient } from "@/api/apiClient";

function generateProjection(carbon, plastic, conservation) {
  const years = [2025, 2030, 2035, 2040, 2045];
  const baseFish = 380;
  const baseCoral = 350;
  const fishDecline = (carbon / 100) * 0.3 + (plastic / 100) * 0.25;
  const fishRecovery = (conservation / 100) * 0.35;
  const coralDecline = (carbon / 100) * 0.4 + (plastic / 100) * 0.2;
  const coralRecovery = (conservation / 100) * 0.3;

  return years.map((y, i) => {
    const factor = i * 0.25;
    return {
      year: y.toString(),
      fish: Math.round(baseFish * (1 - fishDecline * factor + fishRecovery * factor)),
      coral: Math.round(baseCoral * (1 - coralDecline * factor + coralRecovery * factor)),
    };
  });
}

const ChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#041C32] border border-[#006EE6]/30 rounded-lg px-3 py-2 shadow-xl">
        <p className="text-xs text-muted-foreground">{label}</p>
        {payload.map((p, i) => (
          <p key={i} className="text-sm font-semibold" style={{ color: p.color }}>{p.name}: {p.value}</p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Simulator() {
  const [carbon, setCarbon] = useState(45);
  const [plastic, setPlastic] = useState(62);
  const [conservation, setConservation] = useState(30);
  const [aiResult, setAiResult] = useState("");
  const [loading, setLoading] = useState(false);

  const projections = generateProjection(carbon, plastic, conservation);

  const runSimulation = async () => {
    setLoading(true);
    try {
      const result = await apiClient.integrations.Core.InvokeLLM({
        prompt: `You are OceanPulse AI's environmental simulator. Given these parameter settings, provide a concise 2-3 paragraph analysis of projected ocean health outcomes by 2045:

- Carbon Emissions Level: ${carbon}% (of current global output)
- Plastic Pollution Level: ${plastic}% (of current marine debris input)
- Conservation Fund Allocation: ${conservation}% (of recommended global budget)

Describe the likely impact on fish populations, coral reef area, ocean temperature, and biodiversity. Be specific with projected numbers and trends. End with one actionable recommendation.`,
        model: "gpt_5_mini"
      });
      setAiResult(result);
    } catch {
      setAiResult("Simulation analysis is temporarily unavailable. Please adjust parameters and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground flex items-center gap-3">
          <Sliders className="w-7 h-7 text-[#00D2D3]" />
          Environmental Simulator
        </h1>
        <p className="text-muted-foreground mt-1">
          Interactive simulator predicts ocean trial scenario settings
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          <GlassCard className="p-5" delay={0.1}>
            <h3 className="font-heading font-semibold text-sm text-foreground mb-5 flex items-center gap-2">
              <Factory className="w-4 h-4 text-[#FF5252]" />
              Carbon Emissions
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Slider:</span>
                <span className="text-sm font-display font-bold text-foreground">{carbon}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={carbon}
                onChange={(e) => setCarbon(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #00D2D3 0%, #FF5252 ${carbon}%, rgba(255,255,255,0.1) ${carbon}%, rgba(255,255,255,0.1) 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span><span>100%</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-5" delay={0.15}>
            <h3 className="font-heading font-semibold text-sm text-foreground mb-5 flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-[#FFB300]" />
              Plastic Pollution
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Slider:</span>
                <span className="text-sm font-display font-bold text-foreground">{plastic}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={plastic}
                onChange={(e) => setPlastic(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #00D2D3 0%, #FFB300 ${plastic}%, rgba(255,255,255,0.1) ${plastic}%, rgba(255,255,255,0.1) 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span><span>100%</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-5" delay={0.2}>
            <h3 className="font-heading font-semibold text-sm text-foreground mb-5 flex items-center gap-2">
              <TreePine className="w-4 h-4 text-[#00C853]" />
              Conservation Fund
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Slider:</span>
                <span className="text-sm font-display font-bold text-foreground">{conservation}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={conservation}
                onChange={(e) => setConservation(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) ${100 - conservation}%, #00C853 ${100 - conservation}%, #1CE0C6 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span><span>100%</span>
              </div>
            </div>
          </GlassCard>

          <button
            onClick={runSimulation}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#006EE6] to-[#00D2D3] text-white font-semibold text-sm hover:shadow-lg hover:shadow-[#006EE6]/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Running Simulation...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4" />
                Run AI Simulation
              </>
            )}
          </button>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <GlassCard className="p-5" delay={0.25}>
            <h3 className="font-heading font-semibold text-sm text-foreground mb-4 flex items-center gap-2">
              <Fish className="w-4 h-4 text-[#006EE6]" />
              Fish Populations (Year 2045)
            </h3>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={projections}>
                <defs>
                  <linearGradient id="fishGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#006EE6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#006EE6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="year" tick={{ fill: "#8B95A5", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#8B95A5", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="fish" name="Fish Index" stroke="#006EE6" fill="url(#fishGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </GlassCard>

          <GlassCard className="p-5" delay={0.3}>
            <h3 className="font-heading font-semibold text-sm text-foreground mb-4 flex items-center gap-2">
              <WavesIcon className="w-4 h-4 text-[#1CE0C6]" />
              Coral Reef Area (Year 2045)
            </h3>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={projections}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="year" tick={{ fill: "#8B95A5", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#8B95A5", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Line type="monotone" dataKey="coral" name="Coral Index" stroke="#1CE0C6" strokeWidth={2} dot={{ fill: "#1CE0C6", r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </GlassCard>

          {aiResult && (
            <GlassCard className="p-5" delay={0}>
              <h3 className="font-heading font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
                <Brain className="w-4 h-4 text-[#00D2D3]" />
                AI Generated Outcome
              </h3>
              <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
                {aiResult.split("\n").filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
}