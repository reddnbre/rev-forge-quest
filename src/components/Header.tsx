import { Button } from "@/components/ui/button";

interface HeaderProps {
  onNavigate: (section: string) => void;
}

const Header = ({ onNavigate }: HeaderProps) => {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-empire-primary">RevGovern DAO</h1>
        
        <nav className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => onNavigate('proposals')}
            className="text-foreground hover:text-empire-primary transition-colors"
          >
            Proposals
          </button>
          <button 
            onClick={() => onNavigate('polls')}
            className="text-foreground hover:text-empire-primary transition-colors"
          >
            Polls
          </button>
          <button 
            onClick={() => onNavigate('leaderboard')}
            className="text-foreground hover:text-empire-primary transition-colors"
          >
            Leaderboard
          </button>
          <button 
            onClick={() => onNavigate('gaming')}
            className="text-foreground hover:text-empire-primary transition-colors"
          >
            Gaming Hub
          </button>
        </nav>

        <Button 
          onClick={() => onNavigate('dao')} 
          className="bg-empire-primary hover:bg-empire-primary-light text-white"
        >
          Join the Council
        </Button>
      </div>
    </header>
  );
};

export default Header;