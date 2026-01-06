import AshishImg from '../images/Ashish.jpeg';
import AshutoshImg from '../images/Ashutosh.jpg';
import geminiImg from '../images/gemini.jpeg';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Import CardHeader/Title
import { 
  AlertTriangle,
  Earth, 
  Mail, 
  MessageSquare, 
  Shield, 
  User,
  Github,
  Linkedin,
  Link as LinkIcon
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import PageHeader from "@/components/ui/PageHeader"; // Import PageHeader
import { motion } from "framer-motion"; // Import motion

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Animate children one by one
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  const teamMembers = [
    {
      name: "Ashish Kumar Dubey",
      role: "Technical Lead & Backend Engineer",
      bio: "BCA student, backend developer & team lead with interest in Java, springboot and AI.",
      image: AshishImg,
      socials: {
        github: "https://github.com/ashhdubey",
        linkedin: "https://www.linkedin.com/in/ashhdubey/"
      }
    },
    {
      name: "Ashutosh Pandey",
      role: "Data Engineer & Research Analyst",
      bio: "BCA student with skills in design and research. Interested in Data and System Design roles.",
      image: AshutoshImg,
      socials: {
        github: "https://github.com/AshutoshPdy22",
        linkedin: "https://www.linkedin.com/in/ashutoshpdy/"
      }
    },
    {
      name: "Gemini",
      role: "Debugger & QA Specialist",
      bio: "Generative AI model assisting in debugging and quality assurance for the EcoShield project.",
      image: geminiImg,
      socials: {
        official: "https://gemini.google.com/"
      }
    }
  ];

  return (
    // NEW: Apply aurora background and theme padding
    <div className="aurora-bg min-h-screen w-full overflow-hidden">
      <div className="container mx-auto p-4 space-y-8 pt-12 pb-12">
        
        {/* NEW: Use PageHeader */}
        <PageHeader
          title="About EcoShield"
          description="Learn about our mission, our team, and how we're working to protect both you and the environment."
        />

        {/* NEW: Animation container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12" // Add spacing between cards
        >

          {/* Mission Section */}
          <motion.section variants={itemVariants}>
            {/* NEW: Wrap in blurred Card */}
            <Card className="bg-card/80 backdrop-blur-sm border-border/20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="bg-ecoshield-sky-blue/20 p-2 rounded-full">
                    <Earth className="h-6 w-6 text-ecoshield-sky-blue" />
                  </div>
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="space-y-4">
                      <p>
                        EcoShield was founded with a clear purpose: to empower individuals with knowledge and tools to protect themselves from 
                        UV radiation while promoting environmental awareness and action to address ozone depletion.
                      </p>
                      <p>
                        Our platform combines educational resources, personalized protection recommendations, and community initiatives to create 
                        a holistic approach to addressing this global environmental challenge.
                      </p>
                      <div className="pt-4">
                        <h3 className="text-xl font-semibold mb-3">Our Core Values</h3>
                        <ul className="space-y-2">
                          {["Protection", "Education", "Action", "Accessibility"].map((val, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <div className="bg-ecoshield-deep-green/20 p-1 rounded-full mt-1">
                                <Shield className="h-4 w-4 text-ecoshield-deep-green" />
                              </div>
                              <div>
                                <span className="font-medium">{val}</span> - {val === "Protection" && "Providing practical tools for personal safety"}
                                {val === "Education" && "Increasing understanding of environmental issues"}
                                {val === "Action" && "Inspiring community participation in solutions"}
                                {val === "Accessibility" && "Making information available to everyone"}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1469474968028-56623f02e42e" 
                        alt="Beautiful landscape showing earth's environment" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Decorative elements remain */}
                    <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-ecoshield-sky-blue/10 rounded-lg -z-10"></div>
                    <div className="absolute -top-6 -right-6 w-40 h-40 bg-ecoshield-deep-green/10 rounded-lg -z-10"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Vision Section */}
          <motion.section variants={itemVariants}>
            {/* NEW: Wrap in blurred Card */}
            <Card className="bg-card/80 backdrop-blur-sm border-border/20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="bg-ecoshield-sky-blue/20 p-2 rounded-full">
                    <AlertTriangle className="h-6 w-6 text-ecoshield-sky-blue" />
                  </div>
                  The Challenge We Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="relative order-2 lg:order-1">
                    <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1518495973542-4542c06a5843" 
                        alt="Sun shining through trees showing protection from UV rays" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-ecoshield-sky-blue/10 rounded-lg -z-10"></div>
                    <div className="absolute -top-6 -left-6 w-40 h-40 bg-ecoshield-deep-green/10 rounded-lg -z-10"></div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <div className="space-y-4">
                      <p>
                        Ozone depletion and increased UV radiation pose significant risks to human health and ecosystems worldwide. 
                        Despite progress in reducing ozone-depleting substances, the ozone layer remains vulnerable, and UV radiation 
                        continues to cause millions of skin cancer cases annually.
                      </p>
                      <p>
                        Yet, there's a gap in accessible, personalized information that connects environmental monitoring with practical, 
                        everyday protection strategies. EcoShield aims to bridge this gap by providing a comprehensive platform that makes 
                        environmental science actionable at an individual level.
                      </p>
                      <div className="mt-6 bg-muted/80 p-6 rounded-lg"> {/* NEW: Made vision box slightly transparent */}
                        <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
                        <p className="italic">
                          "A world where everyone has the knowledge and tools to protect themselves from environmental hazards, 
                          and where collective action leads to a restored and healthy atmosphere for future generations."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Team Section */}
          <motion.section variants={itemVariants}>
            {/* NEW: Wrap in blurred Card */}
            <Card className="bg-card/80 backdrop-blur-sm border-border/20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="bg-ecoshield-sky-blue/20 p-2 rounded-full">
                    <User className="h-6 w-6 text-ecoshield-sky-blue" />
                  </div>
                  Meet Our Team
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))] auto-rows-fr">
                  {teamMembers.map((member, index) => (
                    // Your existing team card styling is preserved
                    <Card key={index} className="overflow-hidden eco-card flex flex-col bg-card/90"> {/* NEW: Added bg-card/90 */}
                      <div className="aspect-square overflow-hidden">
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="pt-6 flex flex-col flex-grow">
                        <h3 className="font-semibold text-lg">{member.name}</h3>
                        <p className="text-ecoshield-sky-blue font-medium text-sm mb-3">{member.role}</p>
                        <p className="text-muted-foreground text-sm flex-grow">{member.bio}</p>
                        <div className="flex gap-3 mt-4">
                          {member.socials?.github && (
                            <a href={member.socials.github} target="_blank" rel="noopener noreferrer"
                              className="p-2 rounded-full bg-muted hover:bg-ecoshield-sky-blue/20 transition-colors">
                              <Github className="h-5 w-5 text-foreground hover:text-ecoshield-sky-blue" />
                            </a>
                          )}
                          {member.socials?.linkedin && (
                            <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer"
                              className="p-2 rounded-full bg-muted hover:bg-ecoshield-sky-blue/20 transition-colors">
                              <Linkedin className="h-5 w-5 text-foreground hover:text-ecoshield-sky-blue" />
                            </a>
                          )}
                          {member.socials?.official && (
                            <a href={member.socials.official} target="_blank" rel="noopener noreferrer"
                              className="p-2 rounded-full bg-muted hover:bg-ecoshield-sky-blue/20 transition-colors">
                              <LinkIcon className="h-5 w-5 text-foreground hover:text-ecoshield-sky-blue" />
                            </a>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Contact Section */}
          <motion.section variants={itemVariants} id="contact">
            {/* NEW: Wrap in blurred Card */}
            <Card className="bg-card/80 backdrop-blur-sm border-border/20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="bg-ecoshield-sky-blue/20 p-2 rounded-full">
                    <MessageSquare className="h-6 w-6 text-ecoshield-sky-blue" />
                  </div>
                  Contact Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                    <p className="text-muted-foreground mb-6">
                      Have questions, suggestions, or want to collaborate? We'd love to hear from you. 
                      Fill out the form, and our team will get back to you as soon as possible.
                    </p>
                    
                    <div className="flex items-start gap-4 mb-6">
                      <div className="bg-ecoshield-sky-blue/20 p-2 rounded-full mt-1">
                        <Mail className="h-5 w-5 text-ecoshield-sky-blue" />
                      </div>
                      <div>
                        <h4 className="font-medium">Email</h4>
                        <p className="text-muted-foreground">contact@ecoshield.example</p>
                      </div>
                    </div>
                    
                    <div className="bg-muted/80 p-6 rounded-lg"> {/* NEW: Made box slightly transparent */}
                      <h4 className="font-medium mb-3">Join Our Mission</h4>
                      <p className="text-muted-foreground">
                        Interested in working with us? We're always looking for passionate individuals who share our commitment 
                        to environmental protection and education.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-2">
                            Name
                          </label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Email
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your.email@example.com"
                          />
                        </div>
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium mb-2">
                            Message
                          </label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="How can we help you?"
                            rows={5}
                          />
                        </div>
                      </div>
                      <Button type="submit" className="w-full">
                        Send Message
                      </Button>
                    </form>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.section>

        </motion.div>
      </div>
    </div>
  );
}