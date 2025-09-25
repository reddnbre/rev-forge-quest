const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-empire-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-empire-secondary">RevGovern DAO</h3>
            <p className="text-white/80">
              Empowering the community to shape the future of RevEmpire through 
              democratic governance and educational gaming.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="#dao" className="block text-white/80 hover:text-empire-secondary transition-colors">
                DAO Proposals
              </a>
              <a href="#gaming" className="block text-white/80 hover:text-empire-secondary transition-colors">
                RevMiner Game
              </a>
              <a href="#about" className="block text-white/80 hover:text-empire-secondary transition-colors">
                About Us
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <div className="space-y-2">
              <a href="#" className="block text-white/80 hover:text-empire-secondary transition-colors">
                Discord
              </a>
              <a href="#" className="block text-white/80 hover:text-empire-secondary transition-colors">
                Telegram
              </a>
              <a href="#" className="block text-white/80 hover:text-empire-secondary transition-colors">
                Twitter
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-white/60">
            © {currentYear} RevEmpire — Community Powered
          </p>
          <div className="mt-4 space-x-6">
            <a href="#" className="text-white/60 hover:text-empire-secondary transition-colors">
              Terms
            </a>
            <a href="#" className="text-white/60 hover:text-empire-secondary transition-colors">
              Contact
            </a>
            <a href="#" className="text-white/60 hover:text-empire-secondary transition-colors">
              About
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;