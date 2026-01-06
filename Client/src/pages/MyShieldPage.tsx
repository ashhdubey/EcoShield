// Location: Client/src/pages/MyShieldPage.tsx
import React, { useEffect, useState, useMemo } from "react";
import {
  getEcoShieldData,
  getHistoryData,
  getSuggestions,
  EcoShieldData,
  HistoryData,
  SuggestionResponse,
  TodayForecastData,
  getTodayForecast,
  HourlyDataPoint,
} from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Sun, Wind, HeartPulse, ShieldCheck, ClipboardList, Info, Thermometer } from "lucide-react";
import DashboardStatCard from "@/components/MyShield/DashboardStatCard";
import TrendChart, { TrendDataPoint } from "@/components/MyShield/TrendChart";
import { Skeleton } from "@/components/ui/skeleton";
import PageHeader from "@/components/ui/PageHeader";
import { motion } from "framer-motion";
import SuggestionCategory from "@/components/MyShield/SuggestionCategory";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Helper map for suggestions
const categoryDetails: Record<string, { title: string; icon: React.ReactNode }> = {
  HEALTH_TIP: { title: "Personal Health Advisory", icon: <HeartPulse className="h-6 w-6 text-red-500" /> },
  UV_TIP: { title: "UV Protection Tips", icon: <Sun className="h-6 w-6 text-yellow-500" /> },
  AQI_TIP: { title: "Air Quality Tips", icon: <Wind className="h-6 w-6 text-cyan-500" /> },
  PRODUCT: { title: "Product Recommendations", icon: <ShieldCheck className="h-6 w-6 text-blue-500" /> },
  GENERAL_TIP: { title: "General Advice", icon: <ClipboardList className="h-6 w-6 text-gray-500" /> },
};


export default function MyShieldPage() {
  const { user } = useAuth();
  const [ecoShieldData, setEcoShieldData] = useState<EcoShieldData | null>(null);
  const [historyData, setHistoryData] = useState<HistoryData[] | null>(null);
  const [suggestions, setSuggestions] = useState<Record<string, string[]> | null>(null);
  const [todayForecast, setTodayForecast] = useState<TodayForecastData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);

  useEffect(() => {
    // Get location
    if (!navigator.geolocation) {
      setError("Geolocation is not supported. Please use search."); setLoading(false); return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      () => { setError("Location access denied."); setLoading(false); }
    );
  }, []);

  useEffect(() => {
    // Fetch all data
    if (location && user) {
      const fetchData = async () => {
        setLoading(true); setError(null);
        try {
          const [ecoShieldRes, historyRes, suggestionsRes, todayForecastRes] = await Promise.all([
            getEcoShieldData(location.lat, location.lon),
            getHistoryData(),
            getSuggestions(location.lat, location.lon),
            getTodayForecast(location.lat, location.lon)
          ]);
          setEcoShieldData(ecoShieldRes.data ?? null);
          setHistoryData(historyRes.data ?? null);
          setSuggestions(suggestionsRes.data?.suggestions ?? null);
          setTodayForecast(todayForecastRes.data ?? null);
        } catch (err) {
          console.error("Fetch error:", err); setError("Failed to load dashboard.");
        } finally { setLoading(false); }
      };
      fetchData();
    }
  }, [location, user]);

  // Map data for charts
  const todayChartData = useMemo((): TrendDataPoint[] => {
    if (!todayForecast?.forecast) return [];
    return todayForecast.forecast.map(item => ({
      label: item.time,
      aqi: item.aqi ?? null,
      uv: item.uv ?? null,
      temp: item.temperature ?? null,
    }));
  }, [todayForecast]);

  const historyChartData = useMemo((): TrendDataPoint[] => {
    if (!historyData) return [];
    const sortedHistory = [...historyData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return sortedHistory.map(item => ({
      label: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      aqi: item.aqi ?? null,
      uv: item.uvIndex ?? null,
      temp: item.temperature ?? null,
    }));
  }, [historyData]);


  // --- Render Logic ---
  if (!user) return <div className="container p-12 text-center"><p>Please log in.</p></div>;
  if (error) return <div className="container p-12 max-w-xl mx-auto"><Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert></div>;

  // --- Show Skeleton if loading OR if essential data is missing after loading ---
  if (loading || !ecoShieldData || !historyData || !suggestions || !todayForecast) {
    // Display loading skeleton if still loading, otherwise check data validity below
     if (loading) {
         return <LoadingSkeleton />;
     }
     // If not loading but data is still missing, show 'No data' (could refine this)
     if (!ecoShieldData || !historyData || !suggestions || !todayForecast) {
        console.error("Data missing after load:", { ecoShieldData, historyData, suggestions, todayForecast });
        return <div className="container p-12 text-center">No essential data available to display the shield.</div>;
     }
  }


  const suggestionCategories = Object.keys(suggestions);

  return (
    <div className="aurora-bg min-h-screen w-full overflow-hidden">
      <div className="container mx-auto p-4 space-y-8 pt-12 pb-12">
        <PageHeader
          title={`My Shield for ${ecoShieldData.locationName ?? 'your location'}`}
          description={`Your personalized dashboard and recommendations.`}
        />

        {/* Main Dashboard Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <DashboardStatCard title="EcoShield Grade" value={ecoShieldData.ecoShieldGrade ?? 'N/A'} description="Overall safety grade" isGrade />
          <DashboardStatCard title="Temperature" value={`${ecoShieldData.temperature?.toFixed(1) ?? 'N/A'}°C`} description={ecoShieldData.description ?? 'Current conditions'} />
          <DashboardStatCard title="UV Index" value={ecoShieldData.uvIndex?.toString() ?? 'N/A'} description="Current sun exposure risk" />
          <DashboardStatCard title="Air Quality (AQI)" value={`${ecoShieldData.aqi?.toString() ?? 'N/A'} / 5`} description="Current air pollution level" />
        </motion.div>

        {/* Suggestions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-4">Your Personalized Suggestions</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {suggestionCategories.length > 0 ? (
              suggestionCategories.sort((a, b) => a === "HEALTH_TIP" ? -1 : b === "HEALTH_TIP" ? 1 : 0).map((key) => {
                const details = categoryDetails[key] || { title: "Other Tips", icon: <Info /> };
                return <SuggestionCategory key={key} title={details.title} icon={details.icon} tips={suggestions[key]} />;
              })
            ) : (
              <Card className="bg-card/80 backdrop-blur-sm border-border/20 shadow-lg lg:col-span-2"><CardContent className="pt-6"><p className="text-muted-foreground">No specific suggestions.</p></CardContent></Card>
            )}
          </div>
        </motion.div>

        {/* Environmental Trend Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        >
          <Tabs defaultValue="today" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Environmental Trend</h2>
              <TabsList>
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="7day">7-Day History</TabsTrigger>
              </TabsList>
            </div>

            {/* Today's Trend Chart */}
            <TabsContent value="today">
              <Card className="bg-card/80 backdrop-blur-sm border-border/20 shadow-lg">
                <CardContent className="pt-6">
                  {todayChartData.length > 0 ? (
                    <TrendChart data={todayChartData} title="Today's Forecast Trend" showAverages={true} />
                  ) : (
                    <p className="text-muted-foreground">Today's forecast data is not available.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* 7-Day History Trend Chart */}
            <TabsContent value="7day">
              <Card className="bg-card/80 backdrop-blur-sm border-border/20 shadow-lg">
                <CardContent className="pt-6">
                  {historyChartData.length > 0 ? (
                    <TrendChart data={historyChartData} title="7-Day Trend" showAverages={true} chartType="bar" />
                  ) : (
                    <p className="text-muted-foreground">No history data found yet.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}

// --- FIX: Restore the actual Loading Skeleton JSX ---
const LoadingSkeleton = () => (
    <div className="container mx-auto p-4 space-y-8 pt-12 pb-12">
      <PageHeader title="Loading Your Shield..." description="Fetching your personalized data." />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Skeleton className="h-36" />
        <Skeleton className="h-36" />
        <Skeleton className="h-36" />
        <Skeleton className="h-36" />
      </div>
      <h2 className="text-2xl font-bold mb-4"><Skeleton className="h-8 w-64" /></h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
      </div>
      <h2 className="text-2xl font-bold mb-4"><Skeleton className="h-8 w-48" /></h2>
      <Skeleton className="h-72" />
    </div>
  );
// --- END FIX ---