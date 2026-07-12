import React from "react";
import { Heart } from "lucide-react";
import WaveLogo from "@/components/common/WaveLogo";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative border-t border-border/30 bg-background/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <WaveLogo size={30} />
              <span className="font-display font-bold text-foreground">
                OceanPulse <span className="text-[#00D2D3]">AI</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Converting complex oceanographic data into actionable environmental insights.
            </p>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-sm text-foreground mb-3">Navigate</h4>
            <div className="space-y-2">
              {[
                { label: "Dashboard", path: "/dashboard" },
                { label: "Ask The Ocean", path: "/ask" },
                { label: "Simulator", path: "/simulator" },
                { label: "Future Plans", path: "/future" },
              ].map((l) => (
                <Link key={l.path} to={l.path} className="block text-sm text-muted-foreground hover:text-[#00D2D3] transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-sm text-foreground mb-3">About</h4>
            <div className="space-y-2">
              <Link to="/about" className="block text-sm text-muted-foreground hover:text-[#00D2D3] transition-colors">
                Our Mission
              </Link>
              <Link to="/future" className="block text-sm text-muted-foreground hover:text-[#00D2D3] transition-colors">
                Roadmap
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-[#FF5252]" /> for the ocean
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} OceanPulse AI
          </p>
        </div>
      </div>
    </footer>
  );
}
