// Location: Client/src/components/MyShield/SuggestionCategory.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

interface SuggestionCategoryProps {
  title: string;
  icon: React.ReactNode;
  tips: string[];
}

export default function SuggestionCategory({ title, icon, tips }: SuggestionCategoryProps) {
  if (!tips || tips.length === 0) {
    return null;
  }

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border/20 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          {icon}
          <span className="text-xl">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {tips.map((tip, index) => (
          <div key={index} className="flex items-start gap-3">
            <Check className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <p className="text-muted-foreground">{tip}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}