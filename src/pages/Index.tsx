import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import DAOSection from "@/components/dao/DAOSection";
import RevMinerGame from "@/components/gaming/RevMinerGame";
import Footer from "@/components/Footer";
import { AdminBackoffice } from "@/components/admin/AdminBackoffice";

const Index = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [showAdmin, setShowAdmin] = useState(false);

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Admin keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey && event.ctrlKey && event.key.toLowerCase() === 'a') {
        event.preventDefault();
        setShowAdmin(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Smooth scroll observation for navigation highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={handleNavigate} />
      
      <main>
        <section id="hero">
          <HeroSection onNavigate={handleNavigate} />
        </section>
        
        <section id="about">
          <AboutSection />
        </section>
        
        <DAOSection />
        
        <RevMinerGame />
      </main>
      
      <Footer />
      
      <AdminBackoffice 
        isVisible={showAdmin} 
        onClose={() => setShowAdmin(false)} 
      />
    </div>
  );
};

export default Index;
