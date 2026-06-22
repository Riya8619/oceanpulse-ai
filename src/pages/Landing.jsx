import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Waves, BarChart3, MessageCircle, Thermometer, Shield, Globe, ArrowRight, Droplets, Wind } from "lucide-react";

const features = [
  { icon: Globe, title: "Interactive Ocean Map", desc: "Explore ocean health across every major region with real-time data visualization." },
  { icon: BarChart3, title: "AI-Powered Metrics", desc: "Temperature, chlorophyll, heat anomalies analyzed and explained by AI." },
  { icon: MessageCircle, title: "Ask The Ocean", desc: "Chat with our AI to understand marine conditions in plain language." },
  { icon: Thermometer, title: "Environmental Simulator", desc: "Model future ocean scenarios by adjusting carbon, pollution, and conservation." },
  { icon: Shield, title: "Risk Forecasts", desc: "Coral bleaching alerts and environmental risk predictions." },
  { icon: Droplets, title: "Deep-Sea Insights", desc: "From surface currents to deep-sea thermal vents, no data left behind." },
];

const steps = [
  { num: "01", title: "Select a Region", desc: "Choose any ocean region from our interactive world map." },
  { num: "02", title: "View Health Metrics", desc: "See temperature, salinity, chlorophyll, and anomaly data at a glance." },
  { num: "03", title: "Get AI Analysis", desc: "Receive plain-language explanations of complex oceanographic patterns." },
  { num: "04", title: "Simulate & Predict", desc: "Adjust environmental variables to see projected outcomes." },
];

export default function Landing() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Hero ocean image overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#006EE6]/10 border border-[#006EE6]/20 mb-6">
              <Waves className="w-4 h-4 text-[#00D2D3]" />
              <span className="text-xs font-medium text-[#00D2D3]">AI-Powered Ocean Intelligence</span>
            </div>
            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-7xl text-foreground leading-tight tracking-tight mb-6">
              OCEANPULSE AI —{" "}
              <span className="bg-gradient-to-r from-[#006EE6] via-[#00D2D3] to-[#1CE0C6] bg-clip-text text-transparent">
                THE OCEAN'S HEALTH MONITOR
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Converting data into actionable insights. Ask the Ocean, Simulate Futures, View Global Metrics.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/dashboard"
                className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#006EE6] to-[#00D2D3] text-white font-semibold text-sm hover:shadow-lg hover:shadow-[#006EE6]/25 transition-all duration-300"
              >
                EXPLORE THE DASHBOARD
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/ask"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-secondary/50 border border-border/50 text-foreground font-semibold text-sm hover:bg-secondary/70 transition-all duration-300"
              >
                Ask The Ocean
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom wave divider */}
        <svg className="absolute bottom-0 left-0 w-full h-24" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,40 C480,100 960,0 1440,60 L1440,100 L0,100 Z" fill="hsl(214 80% 6%)" opacity="0.5" />
          <path d="M0,60 C360,10 720,90 1080,30 C1260,10 1360,50 1440,40 L1440,100 L0,100 Z" fill="hsl(214 80% 6%)" opacity="0.8" />
        </svg>
      </section>

      {/* Features */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-4">
              Ocean Intelligence, <span className="text-[#00D2D3]">Simplified</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Powerful tools to understand, analyze, and protect the world's oceans.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border/30 hover:border-[#00D2D3]/30 hover:bg-card/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#006EE6]/20 to-[#00D2D3]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <f.icon className="w-6 h-6 text-[#00D2D3]" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="relative py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A3BB6]/30 to-[#00D2D3]/20 backdrop-blur-xl" />
            <div className="absolute inset-0 border border-[#00D2D3]/10 rounded-2xl" />
            <div className="relative p-8 sm:p-12 md:p-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Wind className="w-10 h-10 text-[#00D2D3] mb-6" />
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-6">
                  Our Mission: Ocean Health for Everyone
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mb-4">
                  Oceans cover 71% of our planet yet remain the least understood ecosystem. Satellites and sensors generate terabytes of marine data daily — but it stays locked behind scientific jargon and complex formats.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                  OceanPulse AI bridges that gap. We use artificial intelligence to translate raw oceanographic data into clear, actionable insights that anyone — from policy makers to everyday ocean advocates — can understand and act on.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-4">
              How It <span className="text-[#00D2D3]">Works</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="text-5xl font-display font-bold bg-gradient-to-b from-[#006EE6] to-[#00D2D3] bg-clip-text text-transparent mb-3">
                  {s.num}
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-6">
              Start Exploring Ocean Health Today
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Dive into real-time metrics, AI-powered analysis, and environmental simulations.
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-gradient-to-r from-[#006EE6] to-[#00D2D3] text-white font-semibold hover:shadow-lg hover:shadow-[#006EE6]/25 transition-all duration-300"
            >
              Launch Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}