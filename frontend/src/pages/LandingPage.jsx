import React from "react";
import LandingHero from "../components/LandingPage/LandingHero";
import Features from "../components/LandingPage/Features";
import HowItWorks from "../components/LandingPage/HowItWorks";
import LandingCTA from "../components/LandingPage/LandingCTA";
import Footer from "../components/Footer";
import LandingNavbar from "../components/Navbar/LandingNavbar";
export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <LandingNavbar />
      <LandingHero />
      <Features />
      <HowItWorks />
      <LandingCTA />
      <Footer />
    </div>
  );
}
