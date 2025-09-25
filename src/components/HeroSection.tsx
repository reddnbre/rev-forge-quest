import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onNavigate: (section: string) => void;
}

const HeroSection = ({ onNavigate }: HeroSectionProps) => {
  return (
    <section className="relative py-20 px-4 text-center bg-gradient-hero text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative container mx-auto max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Help Shape the Future
          <br />
          <span className="text-empire-secondary">of RevEmpire</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-10 text-white/90 leading-relaxed">
          Vote on catalysts, test your knowledge, and play our idle game to learn how ad-shares grow.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={() => onNavigate('dao')}
            className="bg-white text-empire-primary hover:bg-white/90 px-8 py-3 text-lg font-semibold"
          >
            Join the Council
          </Button>
          <Button 
            onClick={() => onNavigate('polls')}
            className="bg-empire-secondary hover:bg-empire-secondary/90 text-empire-dark px-8 py-3 text-lg font-semibold"
          >
            Take a Poll
          </Button>
          <Button 
            onClick={() => onNavigate('gaming')}
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-empire-primary px-8 py-3 text-lg font-semibold"
          >
            Play Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;