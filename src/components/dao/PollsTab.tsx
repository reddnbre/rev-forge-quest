import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const mockPolls = [
  {
    id: 1,
    question: "What is the main benefit of compound interest in investing?",
    type: "Financial Literacy",
    options: [
      { text: "Earning interest on both principal and accumulated interest", votes: 89, correct: true },
      { text: "Getting a fixed return every month", votes: 23, correct: false },
      { text: "Avoiding all investment risks", votes: 12, correct: false },
      { text: "Immediate high returns", votes: 8, correct: false }
    ],
    totalVotes: 132,
    timeLeft: "2 days"
  },
  {
    id: 2,
    question: "In the RevEmpire ecosystem, what generates passive income?",
    type: "RevEmpire Knowledge",
    options: [
      { text: "AdShare ownership", votes: 67, correct: true },
      { text: "One-time purchases", votes: 15, correct: false },
      { text: "Social media following", votes: 8, correct: false },
      { text: "Website visits", votes: 5, correct: false }
    ],
    totalVotes: 95,
    timeLeft: "1 day"
  },
  {
    id: 3,
    question: "What's the best strategy for long-term wealth building?",
    type: "Financial Literacy",
    options: [
      { text: "Diversification and consistent investing", votes: 78, correct: true },
      { text: "All-in on one investment", votes: 34, correct: false },
      { text: "Day trading only", votes: 12, correct: false },
      { text: "Keeping all money in savings", votes: 19, correct: false }
    ],
    totalVotes: 143,
    timeLeft: "5 hours"
  }
];

const PollsTab = () => {
  const [votedPolls, setVotedPolls] = useState<Set<number>>(new Set());
  const { toast } = useToast();

  const handleVote = (pollId: number, optionIndex: number) => {
    if (votedPolls.has(pollId)) return;
    
    setVotedPolls(prev => new Set([...prev, pollId]));
    
    const poll = mockPolls.find(p => p.id === pollId);
    const selectedOption = poll?.options[optionIndex];
    
    if (selectedOption?.correct) {
      toast({
        title: "Correct! 🎉",
        description: "You've earned knowledge points for the correct answer.",
      });
    } else {
      toast({
        title: "Incorrect",
        description: "The correct answer has been highlighted. Keep learning!",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {mockPolls.map((poll) => {
        const hasVoted = votedPolls.has(poll.id);
        
        return (
          <Card key={poll.id} className="bg-white shadow-empire">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-empire-primary mb-2">
                    {poll.question}
                  </CardTitle>
                  <Badge variant="outline" className="border-empire-primary text-empire-primary">
                    {poll.type}
                  </Badge>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <p>{poll.totalVotes} votes</p>
                  <p>Ends in {poll.timeLeft}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {poll.options.map((option, index) => {
                  const percentage = poll.totalVotes > 0 ? Math.round((option.votes / poll.totalVotes) * 100) : 0;
                  const isCorrect = option.correct;
                  const showResults = hasVoted;
                  
                  return (
                    <div key={index} className="space-y-2">
                      <Button
                        variant="outline"
                        className={`w-full text-left justify-start h-auto p-4 ${
                          showResults && isCorrect 
                            ? "border-success bg-success/10 text-success" 
                            : ""
                        }`}
                        onClick={() => handleVote(poll.id, index)}
                        disabled={hasVoted}
                      >
                        <div className="flex justify-between items-center w-full">
                          <span>{option.text}</span>
                          {showResults && (
                            <span className="text-sm font-medium">{percentage}%</span>
                          )}
                        </div>
                      </Button>
                      {showResults && (
                        <Progress value={percentage} className="h-2" />
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default PollsTab;