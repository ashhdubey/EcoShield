import { useState, useEffect } from 'react';
import apiClient from '@/lib/apiClient';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Globe, MapPin, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton
import PageHeader from '@/components/ui/PageHeader'; // Import PageHeader
import { motion } from 'framer-motion'; // Import motion
import { cn } from '@/lib/utils'; // Import cn utility

interface EcoShieldData {
  locationName: string;
  ecoShieldGrade: string;
  temperature: number; // Keep this even if not displayed, might be useful later
  uvIndex: number;
  aqi: number;
}

// --- NEW: Helper to get color for grade badge ---
const getGradeColor = (grade: string) => {
  switch (grade) {
    case "A": return "text-green-500";
    case "B": return "text-yellow-500";
    case "C": return "text-orange-500";
    case "D": return "text-red-500";
    case "E": return "text-red-700";
    default: return "text-gray-500";
  }
};

// --- UPDATED: RankingTable component with Winner Highlight ---
const RankingTable = ({ data }: { data: EcoShieldData[] }) => {
  if (!data || data.length === 0) {
    return <p className="text-muted-foreground text-center p-4">No ranking data available.</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[60px] text-center">Rank</TableHead>
          <TableHead>City</TableHead>
          <TableHead className="text-center">Grade</TableHead>
          <TableHead className="text-right">UV Index</TableHead>
          <TableHead className="text-right">AQI (1-5)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((city, index) => (
          <TableRow key={city.locationName} className={cn(index === 0 && "bg-primary/10")}>
            <TableCell className="font-bold text-center">
              {index === 0 ? <Trophy className="h-5 w-5 inline-block text-amber-400" /> : index + 1}
            </TableCell>
            <TableCell className="font-medium">{city.locationName}</TableCell>
            <TableCell className={cn("text-center font-bold", getGradeColor(city.ecoShieldGrade))}>
              {city.ecoShieldGrade}
            </TableCell>
            <TableCell className="text-right">{city.uvIndex?.toFixed(1) ?? 'N/A'}</TableCell>
            <TableCell className="text-right">{city.aqi ?? 'N/A'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

// --- Main RankingPage Component ---
export default function RankingPage() {
  const [worldRankings, setWorldRankings] = useState<EcoShieldData[]>([]);
  const [indiaRankings, setIndiaRankings] = useState<EcoShieldData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRankings = async () => {
      setLoading(true);
      setError(null);
      try {
        const [worldResponse, indiaResponse] = await Promise.all([
          apiClient.get<EcoShieldData[]>('/rankings/world'),
          apiClient.get<EcoShieldData[]>('/rankings/india'),
        ]);
        setWorldRankings(worldResponse.data);
        setIndiaRankings(indiaResponse.data);
      } catch (err) {
        console.error('Failed to fetch ranking data:', err);
        setError('Could not fetch ranking data. The external API might be temporarily unavailable. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, []);

  return (
    <div className="aurora-bg min-h-screen w-full overflow-hidden"> {/* Apply aurora background */}
      <div className="container mx-auto p-4 space-y-8 pt-12 pb-12"> {/* Adjusted padding */}
        <PageHeader /* Use PageHeader */
          title="City Environmental Rankings"
          description="Discover the top cities with the best environmental conditions based on live EcoShield Grade and Air Quality Index (AQI)."
        />

        {loading && <LoadingSkeleton />} {/* Keep loading state */}

        {error && ( /* Keep error state */
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Alert variant="destructive" className="max-w-4xl mx-auto">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error Loading Rankings</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}

        {!loading && !error && (
          <motion.div /* Add animation container */
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Tabs defaultValue="world" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 mb-6"> {/* Add margin bottom */}
                <TabsTrigger value="world">
                  <Globe className="h-4 w-4 mr-2" />
                  World's Best
                </TabsTrigger>
                <TabsTrigger value="india">
                  <MapPin className="h-4 w-4 mr-2" />
                  India's Best
                </TabsTrigger>
              </TabsList>

              <TabsContent value="world">
                <motion.div variants={itemVariants}> {/* Animate card */}
                  <Card className="bg-card/80 backdrop-blur-sm border-border/20 shadow-lg"> {/* Apply Card styling */}
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        Top 10 Cities Globally
                      </CardTitle>
                      <CardDescription>Based on current EcoShield environmental metrics.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0"> {/* Remove default padding */}
                      <RankingTable data={worldRankings} />
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="india">
                <motion.div variants={itemVariants}> {/* Animate card */}
                  <Card className="bg-card/80 backdrop-blur-sm border-border/20 shadow-lg"> {/* Apply Card styling */}
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        Top 10 Cities in India
                      </CardTitle>
                      <CardDescription>Based on current EcoShield environmental metrics.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0"> {/* Remove default padding */}
                      <RankingTable data={indiaRankings} />
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// --- Loading Skeleton Component ---
const LoadingSkeleton = () => (
  <div className="max-w-4xl mx-auto space-y-6">
    <Skeleton className="h-10 w-1/2 mx-auto" /> {/* Tabs Skeleton */}
    <Card className="bg-card/80 backdrop-blur-sm border-border/20">
      <CardHeader>
        <Skeleton className="h-6 w-1/3 mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-2 p-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex justify-between items-center h-10">
              <Skeleton className="h-4 w-[50px]" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-[40px]" />
              <Skeleton className="h-4 w-[60px]" />
              <Skeleton className="h-4 w-[40px]" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);