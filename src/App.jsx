import React, { useState } from "react";
import { modules, teamMembers } from "./data/pubmats";
import ModuleCard from "./components/ModuleCard";
import PubmatModal from "./components/PubmatModal";
import TeamMemberCard from "./components/TeamMemberCard";
import "./App.css";

export default function App() {
  const [modalData, setModalData] = useState(null);

  return (
    <div className="app-root">
      <header className="hero">
        <div className="hero-inner">
          <h1>🗺️ TrabaHow Adventure Hub 🎒</h1>
          <p className="subtitle">Your Career Journey Starts Here - Let's Go KUBO 12!</p>
          <div className="hero-description">
            <p>Explore our comprehensive career development modules. Each card contains valuable resources to guide your professional journey.</p>
          </div>
        </div>
      </header>

      <main className="container">
        <section className="modules-grid">
          {modules.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              onOpenModule={(module) => setModalData({ type: "module", module })}
            />
          ))}
        </section>

        {/* Meet the Team Section */}
        <section className="team-section">
          <div className="team-title">
            <h2>Our KadaKareer "Trabahow"</h2>
            <p>Meet the amazing team behind this career adventure!</p>
          </div>
          <div className="team-grid">
            {teamMembers.map((member) => (
              <TeamMemberCard
                key={member.id}
                member={member}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>🌟 KadaKareer  • Kapstone • TrabaHow 🌟</p>
        <p className="footer-sub">Empowering Filipino youth for career success</p>
      </footer>

      <PubmatModal data={modalData} onClose={() => setModalData(null)} />
    </div>
  );
}
