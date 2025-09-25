import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award } from "lucide-react";

const mockLeaderboard = [
  { rank: 1, name: "EmpireBuilder", proposals: 5, votes: 342, contribution: "Top Contributor" },
  { rank: 2, name: "GrowthHacker", proposals: 3, votes: 289, contribution: "Innovation Leader" },
  { rank: 3, name: "TechLead", proposals: 4, votes: 267, contribution: "Tech Expert" },
  { rank: 4, name: "CommunityMod", proposals: 2, votes: 234, contribution: "Community Voice" },
  { rank: 5, name: "StrategyMaster", proposals: 3, votes: 198, contribution: "Strategic Thinker" },
  { rank: 6, name: "DataDriven", proposals: 2, votes: 156, contribution: "Analytics Pro" },
  { rank: 7, name: "VisionaryX", proposals: 1, votes: 134, contribution: "Creative Catalyst" },
  { rank: 8, name: "NetworkGuru", proposals: 2, votes: 122, contribution: "Networking Expert" }
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="h-5 w-5 text-warning" />;
    case 2:
      return <Medal className="h-5 w-5 text-muted-foreground" />;
    case 3:
      return <Award className="h-5 w-5 text-orange-500" />;
    default:
      return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-muted-foreground">#{rank}</span>;
  }
};

const LeaderboardTab = () => {
  return (
    <Card className="bg-white shadow-empire">
      <CardHeader>
        <CardTitle className="text-empire-primary">Top Contributors</CardTitle>
        <p className="text-muted-foreground">
          Community members ranked by their governance participation and contribution quality.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockLeaderboard.map((member) => (
            <div 
              key={member.rank} 
              className="flex items-center justify-between p-4 rounded-lg border bg-gradient-card hover:shadow-glow transition-all"
            >
              <div className="flex items-center space-x-4">
                {getRankIcon(member.rank)}
                <div>
                  <h3 className="font-semibold text-empire-primary">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.contribution}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <p className="text-sm font-medium">{member.proposals}</p>
                  <p className="text-xs text-muted-foreground">Proposals</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">{member.votes}</p>
                  <p className="text-xs text-muted-foreground">Votes Cast</p>
                </div>
                <Badge 
                  variant="secondary" 
                  className={member.rank <= 3 ? "bg-empire-accent" : ""}
                >
                  Rank #{member.rank}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardTab;