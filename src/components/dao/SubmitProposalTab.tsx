import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const SubmitProposalTab = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Proposal Submitted!",
      description: "Your catalyst proposal has been submitted for community review.",
    });
    
    setTitle("");
    setDescription("");
  };

  return (
    <Card className="bg-white shadow-empire">
      <CardHeader>
        <CardTitle className="text-empire-primary">Submit New Catalyst Proposal</CardTitle>
        <p className="text-muted-foreground">
          Share your ideas to help grow the RevEmpire ecosystem. Community voting will determine implementation.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title">Proposal Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Launch Premium AdShare Tier"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your catalyst idea in detail. How will it benefit RevEmpire? What resources are needed?"
              className="mt-1 min-h-[120px]"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-empire-primary hover:bg-empire-primary-light"
          >
            Submit Proposal
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SubmitProposalTab;