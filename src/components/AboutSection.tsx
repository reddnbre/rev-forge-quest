const AboutSection = () => {
  return (
    <section className="py-16 px-4 bg-gradient-card">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-bold mb-6 text-empire-primary">
          What is RevGovern DAO & Gaming Hub?
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          RevGovern DAO is a lightweight governance hub where the community decides which catalysts 
          RevEmpire launches next. Participate in proposals, vote on decisions, and shape the future 
          of our ecosystem. To learn the mechanics and economics of RevEmpire, try our AdShare Idle Game 
          where you can simulate how ad-shares and referrals grow over time.
        </p>
        <div className="grid md:grid-cols-2 gap-8 text-left">
          <div className="bg-white p-6 rounded-lg shadow-empire">
            <h3 className="text-xl font-semibold mb-4 text-empire-primary">Governance Hub</h3>
            <p className="text-muted-foreground">
              Submit proposals, vote on catalysts, and participate in community polls. 
              Your voice matters in shaping RevEmpire's direction.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-empire">
            <h3 className="text-xl font-semibold mb-4 text-empire-primary">Learn Through Gaming</h3>
            <p className="text-muted-foreground">
              Experience RevEmpire's economics firsthand through our educational idle game. 
              Understand ad-shares, referrals, and compound growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;