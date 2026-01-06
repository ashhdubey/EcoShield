import React, { useState } from "react";
import { motion } from "framer-motion";
import { getComparisonData } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import PageHeader from "@/components/ui/PageHeader";
import { 
  AlertCircle, 
  GitCompareArrows, 
  Thermometer, 
  Sun, 
  Wind, 
  Info 
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Data Interfaces (unchanged) ---
interface EcoShieldData {
  temperature: number;
  description: string;
  uvIndex: number;
  aqi: number;
  ecoShieldGrade: string;
  locationName: string;
}
interface ComparisonResponse {
  city1Data: EcoShieldData | null;
  city2Data: EcoShieldData | null;
}

// --- Main Page Component ---
export default function ComparePage() {
  const [city1, setCity1] = useState('');
  const [city2, setCity2] = useState('');
  const [comparisonData, setComparisonData] = useState<ComparisonResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCompare = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city1 || !city2) {
      setError("Please enter two cities to compare.");
      return;
    }
    setLoading(true);
    setError(null);
    setComparisonData(null);
    try {
      const response = await getComparisonData(city1, city2);
      setComparisonData(response.data);
    } catch (err) {
      setError("An API error occurred. Please ensure your API key is active and try again.");
    } finally {
      setLoading(false);
    }
  };

  const city1Data = comparisonData?.city1Data;
  const city2Data = comparisonData?.city2Data;
  const bothCitiesFound = city1Data && city2Data;
  const searchFailed = !loading && comparisonData && (!city1Data || !city2Data);

  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Stagger animation for cards and "VS"
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="aurora-bg min-h-screen w-full overflow-hidden">
      <div className="container mx-auto p-4 space-y-8 pt-12 pb-12">
        <PageHeader title="City vs. City" description="Enter two cities to compare their real-time environmental conditions." />

        <form onSubmit={handleCompare} className="max-w-xl mx-auto space-y-4 md:space-y-0 md:flex md:gap-4 items-end">
          <div className="w-full space-y-2">
            <label htmlFor="city1" className="text-sm font-medium">City 1</label>
            <Input id="city1" placeholder="e.g., Prayagraj" value={city1} onChange={(e) => setCity1(e.target.value)} />
          </div>
          <div className="w-full space-y-2">
            <label htmlFor="city2" className="text-sm font-medium">City 2</label>
            <Input id="city2" placeholder="e.g., Delhi" value={city2} onChange={(e) => setCity2(e.target.value)} />
          </div>
          <Button type="submit" disabled={loading} className="w-full md:w-auto"><GitCompareArrows className="mr-2 h-4 w-4" /> Compare</Button>
        </form>

        <div className="mt-8">
          {loading && <LoadingSkeleton />}
          {error && <ErrorAlert message={error} />}
          
          {searchFailed && (
            <Alert variant="destructive" className="max-w-md mx-auto">
              <AlertCircle className="h-4 w-4" /><AlertTitle>City Not Found</AlertTitle>
              <AlertDescription>
                We could not find data for one or both cities. Please check the spelling.
                {!city1Data && <p className="mt-2">- Could not find: <strong>{city1}</strong></p>}
                {!city2Data && <p className="mt-2">- Could not find: <strong>{city2}</strong></p>}
              </AlertDescription>
            </Alert>
          )}

          {!loading && !comparisonData && !error && <InitialState />}
          
          {bothCitiesFound && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              // NEW: 3-col grid to center the "VS" separator
              className="grid md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-8 items-center max-w-5xl mx-auto"
            >
              <motion.div variants={itemVariants}>
                <ComparisonCard data={city1Data} />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <VsSeparator />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <ComparisonCard data={city2Data} />
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Helper Functions & Components ---

/**
 * NEW: Helper to get color for grade badge
 */
const getGradeColor = (grade: string) => {
  switch (grade) {
    case "A": return "bg-green-500/20 text-green-500 border-green-500/30";
    case "B": return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
    case "C": return "bg-orange-500/20 text-orange-500 border-orange-500/30";
    case "D": return "bg-red-500/20 text-red-500 border-red-500/30";
    case "E": return "bg-red-700/20 text-red-600 border-red-700/30";
    default:  return "bg-gray-500/20 text-gray-500 border-gray-500/30";
  }
};

/**
 * NEW: The "VS" separator component
 */
const VsSeparator = () => (
  <div className="hidden md:flex items-center justify-center w-16 h-16 bg-card/80 backdrop-blur-sm border rounded-full shadow-lg">
    <span className="text-2xl font-bold text-muted-foreground">VS</span>
  </div>
);

/**
 * NEW: Re-designed data card component
 */
const ComparisonCard = ({ data }: { data: EcoShieldData }) => (
  <Card className="bg-card/80 backdrop-blur-sm border-border/20 shadow-lg">
    <CardHeader>
      <div className="flex justify-between items-start gap-4">
        <div>
          <CardTitle className="text-2xl">{data.locationName}</CardTitle>
          <CardDescription>Environmental Report</CardDescription>
        </div>
        <div
          className={cn(
            "flex-shrink-0 w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full border shadow-inner",
            getGradeColor(data.ecoShieldGrade)
          )}
        >
          <span className="text-4xl md:text-5xl font-bold">{data.ecoShieldGrade}</span>
        </div>
      </div>
    </CardHeader>
    <CardContent className="space-y-3">
      <div className="flex items-center gap-3 text-sm">
        <Thermometer className="w-5 h-5 text-blue-500" />
        <strong>Temperature:</strong>
        <span>{data.temperature.toFixed(1)}°C</span>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <Sun className="w-5 h-5 text-yellow-500" />
        <strong>UV Index:</strong>
        <span>{data.uvIndex}</span>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <Wind className="w-5 h-5 text-cyan-500" />
        <strong>Air Quality (AQI):</strong>
        <span>{data.aqi} / 5</span>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <Info className="w-5 h-5 text-gray-500" />
        <strong>Description:</strong>
        <span className="capitalize">{data.description}</span>
      </div>
    </CardContent>
  </Card>
);

/**
 * NEW: Updated skeleton to match new card layout
 */
const LoadingSkeleton = () => (
  <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-8 items-center max-w-5xl mx-auto">
    {[1, 2].map(i => (
      <Card key={i} className="bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex justify-between items-start gap-4">
            <div>
              <Skeleton className="h-7 w-40 mb-2" />
              <Skeleton className="h-5 w-32" />
            </div>
            <Skeleton className="w-20 h-20 md:w-24 md:h-24 rounded-full" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-5 w-3/4" />
        </CardContent>
      </Card>
    ))}
    {/* Skeleton for "VS" (hidden on mobile) */}
    <Skeleton className="hidden md:block w-16 h-16 rounded-full absolute left-1/2 -translate-x-1/2" />
  </div>
);

// --- Unchanged Components ---

const ErrorAlert = ({ message }: { message: string }) => (
  <Alert variant="destructive" className="max-w-md mx-auto">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>{message}</AlertDescription>
  </Alert>
);

const InitialState = () => (
  <div className="text-center text-muted-foreground pt-16">
    <p>Enter two cities to begin the comparison.</p>
  </div>
);