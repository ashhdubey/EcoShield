// Location: Client/src/pages/HomePage.tsx
import React, { useEffect, useState, useMemo } from "react";
import { 
  ArrowRight, 
  AlertCircle, 
  Globe2, 
  ExternalLink, 
  Earth, 
  Shield, 
  BookOpen, 
  Zap,
  ChevronRight,
  ShieldCheck,
  Activity,
  Wind,
  Sun,
  MapPin,
  ShieldAlert,
  Dna,
  Cigarette
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import apiClient from "@/lib/apiClient";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

// Assets
import earthHero from "@/assest/VIDEO-2025-10-11-09-55-45.mp4";
import appMockup from "@/assest/PHOTO-2025-10-11-09-55-32.jpg";

interface EcoData {
  temperature: number;
  description: string;
  uvIndex: number;
  aqi: number;
  ecoShieldGrade: string;
  locationName: string;
}

const partners = [
  { name: "NASA", role: "Ozone Monitoring", logo: "https://images.unsplash.com/photo-1581822261290-991b38693d1b?auto=format&fit=crop&w=200&q=80", web: "https://www.nasa.gov/" },
  { name: "WHO", role: "Safety Standards", logo: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=200&q=80", web: "https://www.who.int/" },
  { name: "AAD", role: "Dermatology Data", logo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=200&q=80", web: "https://www.icmr.gov.in/" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function HomePage() {
  const [ecoData, setEcoData] = useState<EcoData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await apiClient.get<EcoData>('/environment/public', {
            params: { lat: pos.coords.latitude, lon: pos.coords.longitude },
          });
          setEcoData(res.data);
        } catch (e) { console.error("Telemetry bridge failed."); }
        finally { setIsLoading(false); }
      },
      () => setIsLoading(false)
    );
  }, []);

  // Scientific calculation: roughly 22ug/m3 = 1 cigarette.
  // Mapping AQI 1-5 to estimated cigarettes
  const toxicityMetrics = useMemo(() => {
    const aqi = ecoData?.aqi || 1;
    const uv = ecoData?.uvIndex || 0;
    
    let cigs = 0.2; // AQI 1 (Good)
    if (aqi === 2) cigs = 0.8;
    if (aqi === 3) cigs = 1.6;
    if (aqi === 4) cigs = 2.8;
    if (aqi >= 5) cigs = 4.5;

    let dnaStatus = { label: "Stable", color: "text-emerald-400", bg: "bg-emerald-500/10" };
    if (uv > 2) dnaStatus = { label: "Compromised", color: "text-amber-400", bg: "bg-amber-500/10" };
    if (uv > 5) dnaStatus = { label: "Critical Breach", color: "text-rose-500", bg: "bg-rose-500/10" };

    return { cigs, dnaStatus };
  }, [ecoData]);

  return (
    <div className="bg-[#050505] text-white selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* --- SECTION 1: HERO - THE BIO-HAZARD COMMAND --- */}
      <section className="relative min-h-screen flex items-center pt-24 pb-20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video className="w-full h-full object-cover opacity-40 saturate-[1.5] scale-105 grayscale-[0.3]" src={earthHero} autoPlay loop muted playsInline />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-[#050505]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_85%)]" />
        </div>

        <motion.div className="container relative z-10 px-6 mx-auto" variants={containerVariants} initial="hidden" animate="visible">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-7 space-y-10 text-center lg:text-left">
              <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 backdrop-blur-xl">
                <AlertCircle className="h-4 w-4 text-red-500 animate-pulse" />
                <span className="text-[10px] font-black tracking-[0.2em] uppercase text-red-500">Hazard Detection Protocol: Active</span>
              </motion.div>
              
              <motion.h1 variants={itemVariants} className="text-6xl sm:text-7xl md:text-9xl font-black tracking-tighter leading-[0.85]">
                THE SKY IS <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 animate-gradient-slow bg-[length:200%_auto]">TURNING.</span>
              </motion.h1>

              <motion.p variants={itemVariants} className="text-xl text-neutral-400 max-w-xl font-medium leading-relaxed">
                Invisible radiation and atmospheric toxins are penetrating your sector. In <span className="text-white font-bold underline decoration-red-600 underline-offset-4">{ecoData?.locationName || 'Scanning Station...'}</span>, DNA integrity is at risk.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-5">
                <Button size="lg" className="h-16 px-10 rounded-2xl bg-red-600 text-white font-black text-lg transition-transform hover:scale-105 shadow-[0_0_50px_-10px_rgba(220,38,38,0.5)]">
                  DECODE MY SHIELD <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
                <Button variant="outline" size="lg" className="h-16 px-10 rounded-2xl border-white/10 bg-white/5 backdrop-blur-2xl hover:bg-white/10 font-bold uppercase tracking-widest text-[10px]">
                  Global Threat Map
                </Button>
              </motion.div>
            </div>

            {/* --- LIVE TELEMETRY HUD --- */}
            <motion.div variants={itemVariants} className="lg:col-span-5 flex justify-center lg:justify-end">
              <Card className="bg-white/5 backdrop-blur-3xl border-white/10 shadow-2xl overflow-hidden rounded-[2.5rem] w-full max-w-md relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-red-600/50 shadow-[0_0_15px_rgba(220,38,38,1)] animate-laser z-20" />
                
                <CardContent className="p-10 space-y-10">
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Live Telemetry: {ecoData?.locationName || "Detecting..."}</p>
                    <Badge variant="outline" className={`${toxicityMetrics.dnaStatus.color} border-current text-[10px] animate-pulse`}>{toxicityMetrics.dnaStatus.label}</Badge>
                  </div>

                  <div className="flex items-center justify-center py-6">
                    <div className="relative">
                       <svg className="w-56 h-56 transform -rotate-90">
                          <circle cx="112" cy="112" r="100" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/5" />
                          <motion.circle 
                            cx="112" cy="112" r="100" stroke="currentColor" strokeWidth="10" fill="transparent" strokeDasharray="628"
                            initial={{ strokeDashoffset: 628 }}
                            animate={{ strokeDashoffset: 628 - (628 * (Math.min(ecoData?.uvIndex || 0, 11) / 11)) }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            className="text-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]" strokeLinecap="round"
                          />
                       </svg>
                       <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-7xl font-black">{ecoData?.uvIndex ?? "—"}</span>
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">UV Toxicity</span>
                       </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 rounded-[1.5rem] bg-white/5 border border-white/5">
                       <p className="text-[10px] font-black uppercase text-neutral-500 mb-2">AQI Hazard</p>
                       <p className="text-3xl font-black text-orange-500">{ecoData?.aqi ? `${ecoData.aqi}/5` : "--"}</p>
                    </div>
                    <div className="p-5 rounded-[1.5rem] bg-white/5 border border-white/5">
                       <p className="text-[10px] font-black uppercase text-neutral-500 mb-2">Local Temp</p>
                       <p className="text-3xl font-black">{ecoData?.temperature ? `${ecoData.temperature.toFixed(1)}°` : "--"}</p>
                    </div>
                  </div>

                  <div className={`p-5 rounded-[1.5rem] border border-red-500/20 bg-red-500/5 flex items-center gap-4`}>
                    <ShieldAlert className="h-6 w-6 text-red-500" />
                    <p className="text-xs font-bold leading-tight">
                      System Status: <span className="text-red-500">DNA Degradation Detected</span>. 
                      Immediate SPF protocol activation required for your sector.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* --- SECTION 2: THE INHALATION MONITOR (SCARE COMPONENT) --- */}
      <section className="py-24 bg-red-950/10 border-y border-red-900/20 backdrop-blur-md">
        <div className="container px-6 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 rounded-full border border-red-500/20 text-[10px] font-black uppercase text-red-500 tracking-widest">
                Biological Interference Log
             </div>
             <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight uppercase">
                YOU ARE <br /> <span className="text-red-600">SMOKING THE SKY.</span>
             </h2>
             <p className="text-xl text-neutral-400 font-medium">
                In <span className="text-white font-bold">{ecoData?.locationName || 'your city'}</span>, breathing the air today is equivalent to consuming <span className="text-red-500 font-black">{toxicityMetrics.cigs.toFixed(1)} cigarettes</span>.
             </p>
             <p className="text-sm text-neutral-500 italic">
                *Calculation based on current PM2.5 levels where 22μg/m³ equals 1 cigarette/day.
             </p>
          </div>
          
          <div className="relative group">
            <div className="absolute inset-0 bg-red-600 blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative p-12 rounded-[3rem] bg-black border border-white/10 shadow-2xl flex flex-col items-center gap-8">
               <div className="flex gap-2">
                  {[...Array(5)].map((_, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0.1 }}
                      animate={{ opacity: i < Math.ceil(toxicityMetrics.cigs) ? 1 : 0.1 }}
                      className="relative"
                    >
                      <Cigarette className={`h-12 w-12 ${i < Math.ceil(toxicityMetrics.cigs) ? 'text-red-600' : 'text-neutral-800'}`} />
                      {i < Math.ceil(toxicityMetrics.cigs) && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-8 bg-gradient-to-t from-orange-500/50 to-transparent blur-sm animate-pulse" />
                      )}
                    </motion.div>
                  ))}
               </div>
               <div className="text-center">
                  <span className="text-8xl font-black text-white">{toxicityMetrics.cigs.toFixed(1)}</span>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500">Equivalent Cigarettes / Day</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: THE INVISIBLE THREAT --- */}
      <section id="how-it-works" className="py-40 bg-[#080808]">
        <div className="container px-6 max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-24 space-y-4">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter">THE SILENT CRISIS.</h2>
            <p className="text-xl text-neutral-500 max-w-2xl mx-auto font-medium leading-relaxed">90% of skin aging and atmospheric degradation is caused by factors we cannot see.</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-16">
              <div className="group space-y-4 border-l-4 border-primary pl-8 transition-all hover:border-white">
                 <h3 className="text-3xl font-bold">The Ozone Breach</h3>
                 <p className="text-neutral-400 leading-relaxed text-lg italic">
                    "Our planet's ozone layer continues to face industrial challenges. Climate change accelerates depletion, fundamentally altering how UV radiation impacts life on Earth."
                 </p>
                 <Button variant="link" className="text-primary p-0 font-bold group-hover:text-white uppercase tracking-widest text-xs">NASA RESEARCH ACCESS <ExternalLink className="ml-2 h-4 w-4" /></Button>
              </div>
              <div className="group space-y-4 border-l-4 border-secondary pl-8 transition-all hover:border-white">
                 <h3 className="text-3xl font-bold uppercase tracking-tight">Biometric Decay</h3>
                 <p className="text-neutral-400 leading-relaxed text-lg">
                    UV radiation is cumulative. Every minute of unprotected exposure accelerates DNA damage, affecting everyone regardless of baseline skin tone.
                 </p>
                 <Button variant="link" className="text-secondary p-0 font-bold group-hover:text-white uppercase tracking-widest text-xs">HEALTH WHITE PAPER <ExternalLink className="ml-2 h-4 w-4" /></Button>
              </div>
            </div>
            <motion.div className="relative aspect-video rounded-[3rem] overflow-hidden border border-white/10 group shadow-2xl">
                <img src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Laboratory" />
                <div className="absolute inset-0 bg-red-600/10 mix-blend-overlay" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: THE THREE PILLARS (BENTO STYLE) --- */}
      <section className="py-40 bg-black">
        <div className="container px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <PillarCard 
              num="01" icon={<Shield className="h-10 w-10" />} title="MyShield" tag="Individual"
              desc="Deploy custom safety barriers. By integrating your location and skin type, EcoShield predicts radiation peaks before they occur."
              features={["Biometric Data Sync", "Predictive Alerts", "Adaptive Reminders"]} link="/my-shield"
            />
            <PillarCard 
              num="02" icon={<Earth className="h-10 w-10 text-emerald-400" />} title="RegenEarth" tag="Planetary" theme="emerald"
              desc="Healing the sky starts with choices. Your vegetarian lifestyle is a key driver in lowering atmospheric carbon density and preserving the ozone."
              features={["Mission Tracking", "Vegetarian Impact", "Global Collective"]} link="/regen-earth"
            />
            <PillarCard 
              num="03" icon={<BookOpen className="h-10 w-10 text-secondary" />} title="Chronicle" tag="Scientific" theme="secondary"
              desc="Knowledge is the strongest shield. Access decades of NASA satellite telemetry and expert research modules on atmospheric survival."
              features={["Data Visualizations", "NASA Archives", "Expert Modules"]} link="/chronicle"
            />
          </div>
        </div>
      </section>

      {/* --- SECTION 5: SCIENCE AUTHORITY --- */}
      <section className="py-40 bg-[#080808] border-y border-white/5">
        <div className="container px-6 max-w-6xl mx-auto text-center space-y-24">
          <h2 className="text-4xl font-black uppercase tracking-tighter">Verified Authority.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-20">
             {partners.map(p => (
               <div key={p.name} className="flex flex-col items-center group">
                  <div className="w-20 h-20 mb-8 grayscale group-hover:grayscale-0 transition-all border border-white/5 p-4 rounded-3xl bg-white/5 shadow-inner">
                    <img src={p.logo} alt={p.name} className="w-full h-full object-contain" />
                  </div>
                  <h4 className="text-xl font-bold mb-1">{p.name}</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500">{p.role}</p>
                  <a href={p.web} target="_blank" className="mt-4 text-[9px] font-black uppercase tracking-widest text-primary hover:text-white transition-colors underline decoration-primary/30">Verify Source</a>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-60 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full translate-y-1/2" />
        <div className="container relative z-10 px-6 max-w-4xl mx-auto space-y-12">
          <h2 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-none">Activate <br /><span className="text-primary">Defense.</span></h2>
          <p className="text-2xl text-neutral-500 font-medium italic">"The future of your biology is not negotiable."</p>
          <div className="pt-10">
            <Button size="lg" className="h-20 px-16 rounded-[2rem] bg-white text-black font-black text-2xl hover:scale-105 transition-all shadow-2xl">DECODE MY SHIELD</Button>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes laser {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(480px); opacity: 0; }
        }
        .animate-laser { animation: laser 3.5s linear infinite; }
        @keyframes gradient-slow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-slow { animation: gradient-slow 8s ease infinite; }
      `}</style>
    </div>
  );
}

function PillarCard({ num, icon, title, tag, desc, features, link, theme = "primary" }: any) {
  const accentColor = theme === "emerald" ? "text-emerald-400" : theme === "secondary" ? "text-secondary" : "text-primary";
  const accentBorder = theme === "emerald" ? "border-emerald-400/10 hover:border-emerald-400/30" : theme === "secondary" ? "border-secondary/10 hover:border-secondary/30" : "border-primary/10 hover:border-primary/30";

  return (
    <motion.div whileHover={{ y: -10 }} className={`group h-full p-12 rounded-[3rem] bg-neutral-900/50 border-2 ${accentBorder} backdrop-blur-3xl transition-all cursor-pointer flex flex-col justify-between`}>
      <div className="space-y-8">
        <div className="flex justify-between items-start">
           <div className={`p-4 rounded-2xl bg-white/5 ${accentColor} group-hover:scale-110 transition-transform`}>{icon}</div>
           <span className="text-4xl font-black text-white/10">{num}</span>
        </div>
        <div className="space-y-4">
          <span className={`text-[10px] font-black uppercase tracking-widest ${accentColor}`}>{tag}</span>
          <h3 className="text-4xl font-black">{title}</h3>
          <p className="text-neutral-400 leading-relaxed font-medium">{desc}</p>
        </div>
        <ul className="space-y-3 pt-4">
           {features.map((f: string) => (
             <li key={f} className="flex items-center gap-3 text-sm font-bold text-neutral-300">
               <ShieldCheck className={`h-4 w-4 ${accentColor}`} /> {f}
             </li>
           ))}
        </ul>
      </div>
      <Button variant="ghost" className={`mt-10 p-0 text-xs font-black uppercase tracking-widest ${accentColor} hover:text-white transition-colors group-hover:translate-x-2 duration-300`} asChild>
        <a href={link}>Access Module <ChevronRight className="ml-2 h-4 w-4" /></a>
      </Button>
    </motion.div>
  );
}