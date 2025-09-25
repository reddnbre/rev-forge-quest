import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, ThumbsDown, Users } from "lucide-react";

const mockProposals = [
  {
    id: 1,
    title: "Launch Premium AdShare Tier",
    description: "Introduce a Tier 4 AdShare with $500 cost and $1.00/sec earnings to attract high-value investors.",
    author: "EmpireBuilder",
    status: "Active",
    votesFor: 127,
    votesAgainst: 23,
    endDate: "2024-01-15"
  },
  {
    id: 2,
    title: "Referral Bonus System",
    description: "Implement a one-time bonus system where successful referrals provide an immediate $5 bonus to the referrer.",
    author: "GrowthHacker",
    status: "Active", 
    votesFor: 89,
    votesAgainst: 45,
    endDate: "2024-01-12"
  },
  {
    id: 3,
    title: "Mobile App Development",
    description: "Allocate resources to develop a mobile application for easier access to RevEmpire features.",
    author: "TechLead",
    status: "Passed",
    votesFor: 234,
    votesAgainst: 12,
    endDate: "2023-12-28"
  }
];

const ProposalsTab = () => {
  return (
    <div className="space-y-6">
      {mockProposals.map((proposal) => (
        <Card key={proposal.id} className="bg-white shadow-empire">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-empire-primary">{proposal.title}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  by {proposal.author} • Ends {proposal.endDate}
                </p>
              </div>
              <Badge 
                variant={proposal.status === "Active" ? "default" : "secondary"}
                className={proposal.status === "Active" ? "bg-empire-primary" : ""}
              >
                {proposal.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{proposal.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <ThumbsUp className="h-4 w-4 text-success" />
                  <span className="text-sm font-medium">{proposal.votesFor}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ThumbsDown className="h-4 w-4 text-destructive" />
                  <span className="text-sm font-medium">{proposal.votesAgainst}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {proposal.votesFor + proposal.votesAgainst} votes
                  </span>
                </div>
              </div>
              
              {proposal.status === "Active" && (
                <div className="space-x-2">
                  <Button size="sm" className="bg-success hover:bg-success/90">
                    Vote For
                  </Button>
                  <Button size="sm" variant="destructive">
                    Vote Against
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProposalsTab;