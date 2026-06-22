import React from "react";
import { motion } from "framer-motion";
import { Waves, Anchor, Bell, Camera, Sliders } from "lucide-react";
import GlassCard from "@/components/common/GlassCard";
import OceanBackground from "@/components/common/OceanBackground";

const milestones = [
  {
    quarter: "Q3 2026",
    title: "DeepSea Integration",
    icon: Anchor,
    color: "#006EE6",
    description: "Onboarding real-time telemetry from deep-sea hydrothermal vent sensors. This integration will unlock temperature, pressure, and chemical composition data from the ocean's most extreme environments — giving researchers unprecedented access to deep-sea environmental monitoring.",
  },
  {
    quarter: "Q4 2026",
    title: "Predictive Bleaching Alerts",
    icon: Bell,
    color: "#FF5252",
    description: "Launching regional SMS and email alert networks for localized marine sanctuaries. When thermal stress indices approach bleaching thresholds, sanctuary managers and local communities receive real-time warnings — enabling proactive coral protection measures.",
  },
  {
    quarter: "Q1 2027",
    title: "Community Science Portal",
    icon: Camera,
    color: "#00C853",
    description: "Allowing local divers and coastal communities to upload geotagged images for AI-powered coral health classification. Citizen science meets machine learning — community observations become structured data that feeds back into our global health models.",
  },
  {
    quarter: "Q2 2027",
    title: "Multi-Variable Policy Simulator",
    icon: Sliders,
    color: "#00D2D3",
    description: "Expanding the simulator to accept microplastic bans, commercial fishing caps, and marine protected area layout designs. Policymakers can model complex multi-variable scenarios to understand the cascading effects of regulatory decisions on ocean ecosystems.",
  },
];

export default function FuturePlans() {
  return (
    <div className="relative">
      <OceanBackground intensity="light" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#006EE6]/10 border border-[#006EE6]/20 mb-6">
            <Waves className="w-4 h-4 text-[#00D2D3]" />
            <span className="text-xs font-medium text-[#00D2D3]">Post-Hackathon Roadmap</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
            What's <span className="text-[#00D2D3]">Coming Next</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our roadmap for expanding OceanPulse AI beyond the hackathon MVP.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#006EE6] via-[#00D2D3] to-[#1CE0C6] hidden sm:block" />
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#006EE6] via-[#00D2D3] to-[#1CE0C6] sm:hidden" />

          <div className="space-y-12">
            {milestones.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={m.quarter}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10 hidden sm:block" style={{ borderColor: m.color, backgroundColor: `${m.color}30` }}>
                    <div className="absolute inset-1 rounded-full animate-pulse-glow" style={{ backgroundColor: m.color }} />
                  </div>
                  <div className="absolute left-6 -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10 sm:hidden" style={{ borderColor: m.color, backgroundColor: `${m.color}30` }}>
                    <div className="absolute inset-1 rounded-full animate-pulse-glow" style={{ backgroundColor: m.color }} />
                  </div>

                  <div className={`sm:grid sm:grid-cols-2 sm:gap-8 pl-14 sm:pl-0`}>
                    {isLeft ? (
                      <>
                        <div className="sm:text-right sm:pr-10">
                          <GlassCard className="p-6 inline-block w-full" hover={true}>
                            <div className={`flex items-center gap-3 mb-3 ${isLeft ? "sm:flex-row-reverse" : ""}`}>
                              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${m.color}15` }}>
                                <m.icon className="w-5 h-5" style={{ color: m.color }} />
                              </div>
                              <div className={isLeft ? "sm:text-right" : ""}>
                                <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: `${m.color}15`, color: m.color }}>
                                  {m.quarter}
                                </span>
                              </div>
                            </div>
                            <h3 className={`font-display font-bold text-lg text-foreground mb-2 ${isLeft ? "sm:text-right" : ""}`}>
                              {m.title}
                            </h3>
                            <p className={`text-sm text-muted-foreground leading-relaxed ${isLeft ? "sm:text-right" : ""}`}>
                              {m.description}
                            </p>
                          </GlassCard>
                        </div>
                        <div />
                      </>
                    ) : (
                      <>
                        <div />
                        <div className="sm:pl-10">
                          <GlassCard className="p-6" hover={true}>
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${m.color}15` }}>
                                <m.icon className="w-5 h-5" style={{ color: m.color }} />
                              </div>
                              <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: `${m.color}15`, color: m.color }}>
                                {m.quarter}
                              </span>
                            </div>
                            <h3 className="font-display font-bold text-lg text-foreground mb-2">{m.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{m.description}</p>
                          </GlassCard>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}