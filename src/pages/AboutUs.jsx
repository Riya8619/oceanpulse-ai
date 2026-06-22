import React from "react";
import { motion } from "framer-motion";
import { Heart, Target, Eye, Waves, Globe, BarChart3, Users, Shield } from "lucide-react";
import GlassCard from "@/components/common/GlassCard";
import OceanBackground from "@/components/common/OceanBackground";

export default function AboutUs() {
  return (
    <div className="relative">
      <OceanBackground intensity="light" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#006EE6]/10 border border-[#006EE6]/20 mb-6">
            <Waves className="w-4 h-4 text-[#00D2D3]" />
            <span className="text-xs font-medium text-[#00D2D3]">About OceanPulse AI</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
            Built for the <span className="text-[#00D2D3]">Ocean</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A hackathon project with a mission: making ocean data accessible to everyone.
          </p>
        </motion.div>

        {/* Mission */}
        <GlassCard className="p-8 sm:p-10 mb-8" delay={0.1}>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#006EE6]/20 to-[#00D2D3]/20 flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6 text-[#FF5252]" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl text-foreground mb-3">Hackathon Team Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                OceanPulse AI was born during an intense hackathon sprint, driven by a simple realization: the world's oceans generate massive volumes of scientific data every day — from satellite SST readings to deep-sea sensor arrays — yet almost none of it reaches the people who need it most. Policymakers, educators, coastal communities, and conservation advocates deserve tools that translate complexity into clarity. That's what we set out to build.
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Problem Statement */}
        <GlassCard className="p-8 sm:p-10 mb-8" delay={0.2}>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFB300]/20 to-[#FF5252]/20 flex items-center justify-center flex-shrink-0">
              <Target className="w-6 h-6 text-[#FFB300]" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl text-foreground mb-3">The Problem</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Oceanographic data is locked behind scientific jargon, proprietary formats, and specialized tools. The gap between raw satellite telemetry and actionable insight is enormous:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: BarChart3, text: "Complex marine datasets inaccessible to non-scientists" },
                  { icon: Globe, text: "No unified view of global ocean health indicators" },
                  { icon: Users, text: "Coastal communities lack early-warning tools" },
                  { icon: Shield, text: "Policy decisions made without real-time ocean intelligence" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
                    <item.icon className="w-4 h-4 text-[#FFB300] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Vision */}
        <GlassCard className="p-8 sm:p-10" delay={0.3}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00D2D3]/20 to-[#1CE0C6]/20 flex items-center justify-center flex-shrink-0">
              <Eye className="w-6 h-6 text-[#00D2D3]" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl text-foreground mb-3">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We envision a world where ocean health data is as accessible and understandable as a weather forecast. OceanPulse AI is the first step toward making that a reality — using artificial intelligence to bridge the gap between raw marine telemetry and everyday conservation advocacy.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our goal is to empower researchers, educators, policymakers, and concerned citizens with real-time, AI-translated ocean intelligence — so that protecting our seas becomes everyone's informed choice, not just a scientist's burden.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}