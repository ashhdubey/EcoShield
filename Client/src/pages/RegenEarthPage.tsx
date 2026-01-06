import { motion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MissionCard from "@/components/regen-earth/MissionCard";
import PageHeader from "@/components/ui/PageHeader";
import { ecoMissions, socialPreventions, monthlyReports } from "@/data/regenEarthData";
import { HandHeart, ShieldCheck, ArrowDownToLine } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1, duration: 0.5 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export default function RegenEarthPage() {
  return (
    // --- FIX: Applying the aurora background and ensuring it fills the screen ---
    <div className="aurora-bg min-h-screen w-full overflow-hidden">
      <div className="container mx-auto p-4 space-y-8 pt-12 pb-12">
        <PageHeader
          title="RegenEarth Community Hub"
          description="Join missions, learn prevention tactics, and track our collective progress towards healing the planet. Your action matters."
        />

        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <Tabs defaultValue="missions" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto">
              <TabsTrigger value="missions">EcoMissions</TabsTrigger>
              <TabsTrigger value="tips">Prevention Tips</TabsTrigger>
              <TabsTrigger value="reports">Monthly Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="missions">
              <motion.div variants={containerVariants} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
                {ecoMissions.map((mission, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <MissionCard mission={mission} />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="tips">
              <motion.div variants={containerVariants} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
                {socialPreventions.map((tip, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card className="h-full hover:border-primary transition-colors">
                      <CardHeader>
                        <CardTitle className="flex items-start gap-3">
                          <HandHeart className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                          <span>{tip.title}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{tip.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="reports">
               <motion.div variants={containerVariants} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
                 {monthlyReports.map((report, index) => (
                    <motion.div key={index} variants={itemVariants}>
                        <Card className="h-full hover:border-primary transition-colors">
                            <CardHeader>
                                <CardTitle className="flex items-start gap-3">
                                <ShieldCheck className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                                <span>{report.title}</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{report.description}</p>
                            </CardContent>
                            <div className="p-6 pt-0">
                                <Button className="w-full" variant="outline" onClick={() => toast.info(`Downloading ${report.title}...`)}>
                                    <ArrowDownToLine className="mr-2 h-4 w-4" />
                                    Download Report
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                 ))}
                </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}