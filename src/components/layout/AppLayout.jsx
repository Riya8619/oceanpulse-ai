import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Global ocean ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#041C32] via-[#064273] to-[#041C32]" />
        <div className="absolute inset-0 thermal-overlay" />
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#006EE6]/5 blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#00D2D3]/5 blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#0A3BB6]/3 blur-3xl animate-pulse-glow" style={{ animationDelay: "3s" }} />
      </div>
      <div className="relative z-10">
        <Navbar />
        <main className="pt-16 min-h-screen">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}