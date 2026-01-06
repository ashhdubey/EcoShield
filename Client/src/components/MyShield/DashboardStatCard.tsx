// Location: Client/src/components/MyShield/DashboardStatCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils"; // Import cn

interface DashboardStatCardProps {
  title: string;
  value: string | number;
  description: string;
  isGrade?: boolean; // Add this prop
}

// --- FIX: Add color mapping logic ---
const getGradeColorClass = (grade: string | number) => {
  const gradeStr = String(grade);
  switch (gradeStr) {
    case "A": return "text-green-500";
    case "B": return "text-yellow-500";
    case "C": return "text-orange-500";
    case "D": return "text-red-500";
    case "E": return "text-red-700";
    default: return "text-foreground"; // Default color
  }
};
// --- END FIX ---

// Make sure this is a default export
export default function DashboardStatCard({ title, value, description, isGrade = false }: DashboardStatCardProps) {
  // --- FIX: Apply color class conditionally ---
  const valueColorClass = isGrade ? getGradeColorClass(value) : "text-foreground";
  // --- END FIX ---

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow bg-card/80 backdrop-blur-sm border-border/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* --- FIX: Apply the dynamic color class --- */}
        <div className={cn("text-3xl font-bold", valueColorClass)}>
          {value}
        </div>
        {/* --- END FIX --- */}
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}