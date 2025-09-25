import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProposalsTab from "./ProposalsTab";
import SubmitProposalTab from "./SubmitProposalTab";
import LeaderboardTab from "./LeaderboardTab";
import PollsTab from "./PollsTab";

const DAOSection = () => {
  const [activeTab, setActiveTab] = useState("proposals");

  return (
    <section id="dao" className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-empire-primary">
          DAO
        </h2>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="proposals">Proposals</TabsTrigger>
            <TabsTrigger value="submit">Submit Proposal</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="polls">Polls</TabsTrigger>
          </TabsList>
          
          <TabsContent value="proposals">
            <ProposalsTab />
          </TabsContent>
          
          <TabsContent value="submit">
            <SubmitProposalTab />
          </TabsContent>
          
          <TabsContent value="leaderboard">
            <LeaderboardTab />
          </TabsContent>
          
          <TabsContent value="polls">
            <PollsTab />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default DAOSection;