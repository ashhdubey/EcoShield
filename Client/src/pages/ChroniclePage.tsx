
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Clock, FileText, History } from "lucide-react";
import { useEffect, useState } from "react";

export default function ChroniclePage() {
  const [activeTab, setActiveTab] = useState("basics");

  // Animate content when tab changes
  useEffect(() => {
    const content = document.getElementById(`content-${activeTab}`);
    if (content) {
      content.classList.add("animate-fade-in");
      const timer = setTimeout(() => {
        content.classList.remove("animate-fade-in");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  const timelineEvents = [
    {
      year: 1973,
      title: "Chlorofluorocarbons (CFCs) Identified",
      description: "Scientists identified CFCs as harmful to the ozone layer.",
    },
    {
      year: 1985,
      title: "Discovery of the Ozone Hole",
      description: "British Antarctic Survey discovers a hole in the ozone layer over Antarctica.",
    },
    {
      year: 1987,
      title: "Montreal Protocol",
      description: "International agreement to phase out ozone-depleting substances.",
    },
    {
      year: 1995,
      title: "Nobel Prize",
      description: "Nobel Prize in Chemistry awarded to scientists who explained ozone depletion.",
    },
    {
      year: 2000,
      title: "Peak Depletion",
      description: "Ozone layer depletion reaches its peak due to accumulated CFCs.",
    },
    {
      year: 2018,
      title: "Recovery Begins",
      description: "NASA confirms the ozone layer is beginning to heal due to global efforts.",
    },
    {
      year: 2023,
      title: "Continued Progress",
      description: "The ozone layer shows continued signs of healing and recovery.",
    },
  ];

  const impactStories = [
    {
      title: "Rising Skin Cancer Rates",
      description: "UV exposure has led to increased rates of skin cancer globally, particularly in regions with ozone depletion.",
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Marine Ecosystem Impacts",
      description: "UV radiation affects marine ecosystems, damaging plankton that form the base of marine food chains.",
      image: "https://images.unsplash.com/photo-1518146744936-3676e3d113fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Agricultural Productivity",
      description: "Increased UV exposure reduces agricultural yields in many crops, threatening food security.",
      image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    },
  ];

  return (
    <div className="container py-12 max-w-5xl">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-4xl font-bold">Ozone Depletion Chronicle</h1>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Learn about the history of ozone depletion, its causes, effects, and the global response to this environmental challenge.
        </p>
      </div>

      <Tabs defaultValue="basics" onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 h-400">
          <TabsTrigger value="basics">Ozone Basics</TabsTrigger>
          <TabsTrigger value="timeline">Historical Timeline</TabsTrigger>
          <TabsTrigger value="images">Infographics</TabsTrigger>
          <TabsTrigger value="impact">Impact Stories</TabsTrigger>
        </TabsList>

        <TabsContent value="basics" id="content-basics">
          <Card>
            <CardContent className="p-6 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-ecoshield-sky-blue/20 p-2 rounded-full">
                    <FileText className="h-6 w-6 text-ecoshield-sky-blue" />
                  </div>
                  <h2 className="text-2xl font-semibold">What is Ozone?</h2>
                </div>
                <p className="text-muted-foreground">
                  Ozone (O₃) is a molecule composed of three oxygen atoms. While ground-level ozone is a harmful air pollutant, 
                  stratospheric ozone forms a protective layer around Earth, shielding us from harmful ultraviolet (UV) radiation.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-muted/30 p-6 rounded-lg">
                    <h3 className="text-xl font-medium mb-3">The Ozone Layer</h3>
                    <p>
                      Located in the stratosphere, about 15-35 km above Earth's surface, the ozone layer absorbs 97-99% of the 
                      sun's medium-frequency ultraviolet radiation, which would otherwise damage life on Earth.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-6 rounded-lg">
                    <h3 className="text-xl font-medium mb-3">How It Protects Us</h3>
                    <p>
                      The ozone layer absorbs UV-B radiation, which can cause skin cancer, cataracts, and harm marine ecosystems 
                      and plant life. Without it, life as we know it would be impossible.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-ecoshield-sky-blue/20 p-2 rounded-full">
                    <AlertTriangle className="h-6 w-6 text-ecoshield-sky-blue" />
                  </div>
                  <h2 className="text-2xl font-semibold">Ozone Depletion Basics</h2>
                </div>
                <p className="text-muted-foreground">
                  Ozone depletion occurs when chlorofluorocarbons (CFCs) and other ozone-depleting substances (ODS) are emitted 
                  into the atmosphere. These chemicals release chlorine and bromine atoms that destroy ozone molecules.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-muted/30 p-6 rounded-lg">
                    <h3 className="text-xl font-medium mb-3">Main Causes</h3>
                    <ul className="list-disc ml-5 space-y-2">
                      <li>Chlorofluorocarbons (CFCs) from aerosols, refrigerants, and solvents</li>
                      <li>Halons used in fire extinguishers</li>
                      <li>Carbon tetrachloride and methyl chloroform</li>
                      <li>Hydrochlorofluorocarbons (HCFCs) and hydrobromofluorocarbons (HBFCs)</li>
                      <li>Methyl bromide used in pesticides</li>
                    </ul>
                  </div>
                  <div className="bg-muted/30 p-6 rounded-lg">
                    <h3 className="text-xl font-medium mb-3">The Process</h3>
                    <ol className="list-decimal ml-5 space-y-2">
                      <li>CFCs and other ODS rise to the stratosphere</li>
                      <li>UV radiation breaks down these chemicals, releasing chlorine or bromine</li>
                      <li>Chlorine and bromine catalyze the destruction of ozone molecules</li>
                      <li>A single chlorine atom can destroy over 100,000 ozone molecules</li>
                      <li>This leads to the thinning of the ozone layer, particularly over the poles</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-ecoshield-sky-blue/20 p-2 rounded-full">
                    <History className="h-6 w-6 text-ecoshield-sky-blue" />
                  </div>
                  <h2 className="text-2xl font-semibold">Global Response</h2>
                </div>
                <p className="text-muted-foreground">
                  The international community has taken significant steps to address ozone depletion, with the Montreal Protocol 
                  being the most successful environmental agreement in history.
                </p>

                <div className="bg-ecoshield-sky-blue/10 p-6 rounded-lg border border-ecoshield-sky-blue/20">
                  <h3 className="text-xl font-medium mb-3">The Montreal Protocol</h3>
                  <p className="mb-4">
                    Signed in 1987, the Montreal Protocol on Substances that Deplete the Ozone Layer is an international treaty 
                    designed to protect the ozone layer by phasing out the production and consumption of ozone-depleting substances.
                  </p>
                  <p>
                    It has been ratified by all 198 United Nations member states, making it the first universally ratified treaty 
                    in UN history. Thanks to this agreement, the ozone layer is expected to recover to 1980 levels by 2050-2070.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" id="content-timeline">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-ecoshield-sky-blue/20 p-2 rounded-full">
                  <Clock className="h-6 w-6 text-ecoshield-sky-blue" />
                </div>
                <h2 className="text-2xl font-semibold">Timeline of Major Events</h2>
              </div>

              <div className="space-y-0 pl-4">
                {timelineEvents.map((event, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-dot mt-2"></div>
                    <div className="ml-8 pb-8">
                      <span className="text-ecoshield-sky-blue font-semibold">{event.year}</span>
                      <h3 className="text-xl font-medium mt-1">{event.title}</h3>
                      <p className="text-muted-foreground mt-2">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" id="content-images">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-ecoshield-sky-blue/20 p-2 rounded-full">
                  <FileText className="h-6 w-6 text-ecoshield-sky-blue" />
                </div>
                <h2 className="text-2xl font-semibold">NASA Infographics</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1501854140801-50d01698950b" 
                      alt="Ozone hole over Antarctica" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">Antarctic Ozone Hole</h3>
                    <p className="text-sm text-muted-foreground">
                      NASA visualization showing the ozone hole over Antarctica, which reaches its maximum size during the Southern Hemisphere spring.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843" 
                      alt="Ozone recovery projection" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">Recovery Projection</h3>
                    <p className="text-sm text-muted-foreground">
                      Projection of ozone layer recovery over time, showing the effects of the Montreal Protocol and global mitigation efforts.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1426604966848-d7adac402bff" 
                      alt="UV Index Map" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">Global UV Index Map</h3>
                    <p className="text-sm text-muted-foreground">
                      NASA's global UV index map showing variation in UV radiation across different regions of the planet.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1518495973542-4542c06a5843" 
                      alt="CFC Emissions" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">CFC Emissions Decline</h3>
                    <p className="text-sm text-muted-foreground">
                      Chart showing the decline in CFC emissions worldwide following the implementation of the Montreal Protocol.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impact" id="content-impact">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-ecoshield-sky-blue/20 p-2 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-ecoshield-sky-blue" />
                </div>
                <h2 className="text-2xl font-semibold">Real Impact Stories</h2>
              </div>

              <div className="grid grid-cols-1 gap-8">
                {impactStories.map((story, index) => (
                  <div key={index} className="flex flex-col md:flex-row gap-6 eco-card overflow-hidden">
                    <div className="md:w-1/3">
                      <img 
                        src={story.image} 
                        alt={story.title} 
                        className="w-full h-full object-cover aspect-video md:aspect-auto"
                      />
                    </div>
                    <div className="p-6 md:w-2/3">
                      <h3 className="text-xl font-medium mb-3">{story.title}</h3>
                      <p className="text-muted-foreground">{story.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
