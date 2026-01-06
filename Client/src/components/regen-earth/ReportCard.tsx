
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info, Leaf } from "lucide-react";
import { MonthlyReport } from "@/data/regenEarthData";
import { motion } from "framer-motion";
import data from "@/assest/SEPTEMBER UV INDEX REPORT.pdf";
import data2 from "@/assest/AUGUST UV INDEX REPORT.pdf";

const datas = [data, data2];

interface ReportCardProps {
  report: MonthlyReport;
  index: number;
}


export function ReportCard({ report, index }: ReportCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{report.month} Report</CardTitle>
            {index === 0 && <Badge className="bg-ecoshield-sky-blue hover:bg-ecoshield-sky-blue/90">Latest</Badge>}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Leaf className="h-5 w-5 text-ecoshield-deep-green" />
              <h3 className="font-medium">Highlights</h3>
            </div>
            <ul className="list-disc pl-10 space-y-2 text-muted-foreground">
              {report.highlights.map((highlight, idx) => (
                <li key={idx}>{highlight}</li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Info className="h-5 w-5 text-amber-500" />
              <h3 className="font-medium">Challenge Areas</h3>
            </div>
            <ul className="list-disc pl-10 space-y-2 text-muted-foreground">
              {report.challengeAreas.map((challenge, idx) => (
                <li key={idx}>{challenge}</li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            <a href={datas[index]}>Download Full Report</a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
