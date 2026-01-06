import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface SuggestionCardProps {
  title: string;
  suggestion: string;
  icon: LucideIcon;
}

const SuggestionCard = ({ title, suggestion, icon: Icon }: SuggestionCardProps) => (
  <Card className="shadow-sm">
    <CardHeader className="flex flex-row items-center space-x-4 space-y-0">
      <div className="p-3 rounded-full bg-primary/10">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">{suggestion}</p>
    </CardContent>
  </Card>
);

export default SuggestionCard;