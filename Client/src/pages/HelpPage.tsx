import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Layers, CheckCircle, MapPin, User, Shield, HelpCircle } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion"; // Import motion

// --- Sub-components (Unchanged Content, Enhanced Styling) ---

function HeroGuide() {
  return (
    <section className="relative h-[60vh] flex items-center justify-center text-center bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')",
        }}
      />
      <div className="absolute inset-0 bg-black/60 z-10" />
      
      <div className="relative z-20 p-4 text-white">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          EcoShield Guide
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-white/80">
          Your complete guide to understanding and using EcoShield to protect
          yourself and the environment.
        </p>
        <div className="mt-8">
          {/* Pulsing animation for the button */}
          <motion.div
             animate={{ scale: [1, 1.05, 1] }}
             transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Button size="lg" onClick={() => document.getElementById('getting-started')?.scrollIntoView({ behavior: 'smooth' })}>
              Get Started
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface StepCardProps {
  step: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

function StepCard({ step, title, description, icon }: StepCardProps) {
  return (
    // Hover animation for the card
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="h-full"
    >
      <Card className="text-center h-full bg-card/80 backdrop-blur-sm border-border/20 shadow-lg">
        <CardHeader>
          <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
            {icon}
          </div>
          <CardTitle className="mt-4">
            Step {step}: {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function DetectionLogicCard() {
  return (
    <Card className="h-full bg-card/80 backdrop-blur-sm border-border/20 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Layers /> Our Grading System
        </CardTitle>
        <CardDescription>
          The EcoShield Grade is calculated to provide a simple, actionable risk level.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold">1. Data Collection</h4>
          <p className="text-sm text-muted-foreground">We fetch real-time UV Index and Air Quality Index (AQI) from reliable APIs for your specific location.</p>
        </div>
        <div>
          <h4 className="font-semibold">2. Risk Weighting</h4>
          <p className="text-sm text-muted-foreground">A UV Index above 7 or an AQI value of 4 or 5 carries a much higher weight in our calculation.</p>
        </div>
        <div>
          <h4 className="font-semibold">3. Grade Assignment</h4>
          <p className="text-sm text-muted-foreground">The combined score translates to a grade from A (Low Risk) to E (Extreme Risk).</p>
        </div>
      </CardContent>
    </Card>
  );
}

function UVTable() {
  const uvLevels = [
    { index: "0-2", level: "Low", color: "bg-green-500" },
    { index: "3-5", level: "Moderate", color: "bg-yellow-500" },
    { index: "6-7", level: "High", color: "bg-orange-500" },
    { index: "8-10", level: "Very High", color: "bg-red-500" },
    { index: "11+", level: "Extreme", color: "bg-purple-600" },
  ];

  return (
     <Card className="h-full bg-card/80 backdrop-blur-sm border-border/20 shadow-lg">
        <CardHeader>
            <CardTitle>UV Index Scale</CardTitle>
            <CardDescription>Official risk levels for UV radiation.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>UV Index</TableHead>
                  <TableHead>Risk Level</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {uvLevels.map((item) => (
                  <TableRow key={item.index}>
                    <TableCell className="font-medium">{item.index}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${item.color}`} />
                        <span>{item.level}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </CardContent>
     </Card>
  );
}

function SkinTypeTool() {
  const navigate = useNavigate();
  return (
    <Card className="flex flex-col md:flex-row items-center gap-6 p-6 bg-card/80 backdrop-blur-sm border-border/20 shadow-lg">
      <img
        src="https://images.unsplash.com/photo-1597072240233-5c2de52d238c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
        alt="Skincare"
        className="w-full md:w-1/3 h-48 object-cover rounded-lg"
      />
      <div className="flex-1">
        <CardTitle>Update Your Profile</CardTitle>
        <CardDescription className="mt-2 mb-4">
          For the most accurate recommendations, add your skin type to your
          profile. This allows EcoShield to tailor advice specifically for you.
        </CardDescription>
        <Button onClick={() => navigate('/profile')}>Go to Profile</Button>
      </div>
    </Card>
  );
}

function VideoEmbed() {
  return (
    <div className="aspect-video">
      <iframe
        className="w-full h-full rounded-lg"
        src="https://www.youtube.com/embed/9lpNctzBqa8"
        title="How to determine your skin type"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

function FAQAccordion() {
  const faqs = [
    { q: "How often is the data updated?", a: "EcoShield fetches new data every hour to ensure you have the most current information." },
    { q: "Is my location data stored?", a: "We only use your location to fetch current environmental data. We prioritize your privacy." },
    { q: "What does AQI mean?", a: "AQI stands for Air Quality Index. It's a scale from 1 (Good) to 5 (Hazardous) that tells you how polluted the air is." },
    { q: "How can I contribute to RegenEarth?", a: "Visit the RegenEarth page to see community missions and social prevention tips. You can join missions to track your contributions." },
  ];

  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem value={`item-${index}`} key={index}>
          <AccordionTrigger>{faq.q}</AccordionTrigger>
          <AccordionContent>{faq.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}


// --- Main HelpPage Component ---

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Animate sections one by one
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function HelpPage() {
  const steps = [
    { step: 1, title: "Check Location", description: "Use the homepage or MyShield page to get instant environmental data for your area.", icon: <MapPin /> },
    { step: 2, title: "Understand Grade", description: "Review your EcoShield Grade (A-E) to quickly assess your risk level based on UV and AQI data.", icon: <Shield /> },
    { step: 3, title: "Personalize Profile", description: "Add your skin type, age, and gender in your profile for tailored health recommendations.", icon: <User /> },
    { step: 4, title: "Take Action", description: "Follow suggestions on your MyShield page and explore RegenEarth to get involved.", icon: <CheckCircle /> },
  ];

  return (
    // Apply aurora background
    <div className="aurora-bg min-h-screen w-full overflow-hidden">
      <HeroGuide />
      
      <div className="container mx-auto px-4 py-12 md:py-20">
        
        {/* Wrap sections in motion.div for animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-20" // Use space-y to manage gaps
        >
          <motion.section id="getting-started" variants={itemVariants}>
            <h2 className="text-3xl font-bold text-center mb-10">
              Getting Started with EcoShield
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step) => (
                <StepCard key={step.step} {...step} />
              ))}
            </div>
          </motion.section>

          <motion.section id="grading-system" variants={itemVariants}>
            <h2 className="text-3xl font-bold text-center mb-10">
              Understanding the Data
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <DetectionLogicCard />
              <UVTable />
            </div>
          </motion.section>

          <motion.section id="skin-type" variants={itemVariants}>
            <h2 className="text-3xl font-bold text-center mb-10">
              Find Your Skin Type
            </h2>
            <div className="max-w-4xl mx-auto space-y-8">
              <p className="text-center text-muted-foreground">
                Knowing your skin type is crucial for effective UV protection. Watch the video below, then update your profile.
              </p>
              <VideoEmbed />
              <SkinTypeTool />
            </div>
          </motion.section>
          
          <motion.section id="faq" variants={itemVariants}>
            <h2 className="text-3xl font-bold text-center mb-10">
              Frequently Asked Questions
            </h2>
            {/* Wrap FAQAccordion in a blurred Card for consistency */}
            <Card className="max-w-3xl mx-auto bg-card/80 backdrop-blur-sm border-border/20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="text-primary"/>
                  Common Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FAQAccordion /> {/* Your FAQ component is preserved */}
              </CardContent>
            </Card>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
}