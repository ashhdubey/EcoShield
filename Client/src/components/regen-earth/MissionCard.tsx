import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Users, Target, Leaf, Recycle, Droplets } from "lucide-react";
import { toast } from "sonner";
import React from "react";

// --- FIX: Icon map is now inside the component that needs it ---
const iconMap: { [key: string]: React.ElementType } = {
  Leaf,
  Recycle,
  Droplets,
};

interface MissionCardProps {
  mission: {
    title: string;
    description: string;
    participants: number;
    goal: number;
    iconName: string; // The card now expects the name of the icon
  };
}

export default function MissionCard({ mission }: MissionCardProps) {
  const progress = (mission.participants / mission.goal) * 100;

  const handleJoin = () => {
    toast.success(`You've joined the "${mission.title}" mission!`);
  };

  // --- FIX: Look up the icon component from the map ---
  const IconComponent = iconMap[mission.iconName] || Leaf;

  return (
    <Card className="flex flex-col h-full bg-card/80 backdrop-blur-sm hover:border-primary transition-all duration-300 shadow-sm hover:shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-4">
          <IconComponent className="h-8 w-8 text-primary" />
          <div>
            <CardTitle>{mission.title}</CardTitle>
            <CardDescription>{mission.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="h-4 w-4" /> Participants
            </span>
            <span className="text-sm font-semibold">
              {mission.participants.toLocaleString()} / {mission.goal.toLocaleString()}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full group" onClick={handleJoin}>
          Join Mission
          <Target className="ml-2 h-4 w-4 group-hover:animate-pulse" />
        </Button>
      </CardFooter>
    </Card>
  );
}