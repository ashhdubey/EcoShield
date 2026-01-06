// Location: Client/src/pages/ProfilePage.tsx
import { useEffect, useState } from 'react';
import apiClient from '@/lib/apiClient';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Bell, Phone, Clock, HeartPulse, AlertCircle } from 'lucide-react'; // NEW: Import new icons
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox'; // NEW: Import Checkbox
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'; // NEW: Import Alert
import PageHeader from '@/components/ui/PageHeader'; // NEW: Import PageHeader
import { motion } from 'framer-motion'; // NEW: Import motion
import { Skeleton } from '@/components/ui/skeleton'; // NEW: Import Skeleton

interface UserProfile {
    id: number;
    username: string;
    email: string;
    skinType: string | null;
    age: number | null;
    gender: string | null;
    phoneNumber: string | null;
    notificationTime: string | null;
    // NEW: Add health fields
    hasAsthma: boolean | null;
    hasAllergies: boolean | null;
}

const skinTypes = [
    { value: "NORMAL", label: "Normal" }, { value: "OILY", label: "Oily" },
    { value: "DRY", label: "Dry" }, { value: "COMBINATION", label: "Combination" },
    { value: "SENSITIVE", label: "Sensitive" },
];

const genders = [
    { value: "MALE", label: "Male" }, { value: "FEMALE", label: "Female" },
    { value: "OTHER", label: "Other" }, { value: "PREFER_NOT_TO_SAY", label: "Prefer not to say" },
];

// NEW: Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function ProfilePage() {
    const { isAuthenticated, loading: authLoading } = useAuth();
    
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [pageLoading, setPageLoading] = useState(true);

    // State for form fields (YOURS)
    const [age, setAge] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [skinType, setSkinType] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [notificationTime, setNotificationTime] = useState<string>('');
    
    // NEW: State for health fields
    const [hasAsthma, setHasAsthma] = useState<boolean>(false);
    const [hasAllergies, setHasAllergies] = useState<boolean>(false);


    useEffect(() => {
        const fetchProfile = async () => {
            if (!authLoading && isAuthenticated) {
                try {
                    const response = await apiClient.get<UserProfile>('/users/me');
                    const userProfile = response.data;
                    setProfile(userProfile);
                    // Set initial form values
                    setAge(userProfile.age ? String(userProfile.age) : '');
                    setGender(userProfile.gender || '');
                    setSkinType(userProfile.skinType || '');
                    setPhoneNumber(userProfile.phoneNumber || '');
                    setNotificationTime(userProfile.notificationTime || '');
                    // NEW: Set health states
                    setHasAsthma(userProfile.hasAsthma || false);
                    setHasAllergies(userProfile.hasAllergies || false);

                } catch (error) {
                    console.error("Failed to fetch profile", error);
                    toast.error("Could not load your profile data.");
                } finally {
                    setPageLoading(false);
                }
            } else if (!authLoading) {
                setPageLoading(false);
            }
        };

        fetchProfile();
    }, [isAuthenticated, authLoading]);

    const handleSaveChanges = async () => {
        try {
            const updatedProfileData = {
                age: age ? parseInt(age, 10) : null,
                gender: gender || null,
                skinType: skinType || null,
                phoneNumber: phoneNumber || null,
                notificationTime: notificationTime || null,
                // NEW: Add health states to payload
                hasAsthma: hasAsthma,
                hasAllergies: hasAllergies,
            };
            
            const response = await apiClient.put<UserProfile>('/users/me', updatedProfileData);
            setProfile(response.data); // Update full profile state
            toast.success("Profile updated successfully!");
        } catch (error)
 {
            console.error("Failed to update profile", error);
            toast.error("There was an error saving your profile.");
        }
    };

    if (authLoading || pageLoading) {
        return <ProfileLoadingSkeleton />; // NEW: Use a loading skeleton
    }

    if (!profile) {
        return <div className="container py-12 text-center">Could not load profile. Please log in again.</div>;
    }

    return (
        // NEW: Added theme wrapper
        <div className="aurora-bg min-h-screen w-full overflow-hidden">
            <div className="container mx-auto p-4 space-y-8 pt-12 pb-12 max-w-4xl">
                
                {/* NEW: Replaced h1/p with PageHeader */}
                <PageHeader
                    title="Your Profile"
                    description="Manage your personal information and notification settings."
                />
                
                {/* NEW: Added animation wrapper */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8" // This will space out the cards
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Personal Information Card */}
                        <motion.div variants={itemVariants}>
                            {/* NEW: Added theme classes to Card */}
                            <Card className="bg-card/80 backdrop-blur-sm border-border/20 shadow-lg h-full">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2"><User /> Personal Information</CardTitle>
                                    <CardDescription>This helps us personalize your experience.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label>Username</Label>
                                        <p className="text-muted-foreground">{profile.username}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Email</Label>
                                        <p className="text-muted-foreground">{profile.email}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="age">Age</Label>
                                        <Input id="age" type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Enter your age" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Gender</Label>
                                        <RadioGroup value={gender} onValueChange={setGender} className="flex flex-wrap gap-4">
                                            {genders.map((g) => (
                                                <div key={g.value} className="flex items-center space-x-2">
                                                    <RadioGroupItem value={g.value} id={`gender-${g.value}`} />
                                                    <Label htmlFor={`gender-${g.value}`}>{g.label}</Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="skinType">Skin Type</Label>
                                        <Select value={skinType} onValueChange={setSkinType}>
                                            <SelectTrigger id="skinType"><SelectValue placeholder="Select your skin type" /></SelectTrigger>
                                            <SelectContent>
                                                {skinTypes.map((type) => (
                                                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Notification Settings Card */}
                        <motion.div variants={itemVariants}>
                            {/* NEW: Added theme classes to Card */}
                            <Card className="bg-card/80 backdrop-blur-sm border-border/20 shadow-lg h-full">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2"><Bell /> Notification Settings</CardTitle>
                                    <CardDescription>Receive daily updates via Email and WhatsApp.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="phoneNumber" className="flex items-center gap-2"><Phone className="h-4 w-4" /> WhatsApp Number</Label>
                                        <Input
                                            id="phoneNumber"
                                            type="tel"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            placeholder="+919876543210"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Must include country code (e.g., +91 for India).
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="notificationTime" className="flex items-center gap-2"><Clock className="h-4 w-4" /> Preferred Time</Label>
                                        <Input
                                            id="notificationTime"
                                            type="time"
                                            value={notificationTime}
                                            onChange={(e) => setNotificationTime(e.target.value)}
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            The time of day you want to receive your alert.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    {/* NEW: Health Conditions Card */}
                    <motion.div variants={itemVariants}>
                        <Card className="bg-card/80 backdrop-blur-sm border-border/20 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><HeartPulse /> Health Conditions</CardTitle>
                                <CardDescription>This information helps us provide tailored health tips.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <Alert variant="default" className="bg-blue-500/10 border-blue-500/30">
                                    <AlertCircle className="h-4 w-4 text-blue-500" />
                                    <AlertTitle>Personalized Advice</AlertTitle>
                                    <AlertDescription>
                                        This information helps us provide tailored health tips, especially during poor air quality.
                                    </AlertDescription>
                                </Alert>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="hasAsthma"
                                        checked={hasAsthma}
                                        onCheckedChange={(checked) => setHasAsthma(checked as boolean)}
                                    />
                                    <Label htmlFor="hasAsthma" className="cursor-pointer">
                                        I have asthma or other respiratory conditions
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="hasAllergies"
                                        checked={hasAllergies}
                                        onCheckedChange={(checked) => setHasAllergies(checked as boolean)}
                                    />
                                    <Label htmlFor="hasAllergies" className="cursor-pointer">
                                        I have seasonal allergies (e.g., pollen)
                                    </Label>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="text-center">
                        <Button onClick={handleSaveChanges}>Save All Changes</Button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

// NEW: Added a loading skeleton
const ProfileLoadingSkeleton = () => (
    <div className="aurora-bg min-h-screen w-full overflow-hidden">
        <div className="container mx-auto p-4 space-y-8 pt-12 pb-12 max-w-4xl">
            <PageHeader
                title="Your Profile"
                description="Manage your personal information and notification settings."
            />
            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="bg-card/80 backdrop-blur-sm border-border/20 shadow-lg">
                        <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
                        <CardContent className="space-y-6">
                            <Skeleton className="h-4 w-1/3" />
                            <Skeleton className="h-5 w-2/3" />
                            <Skeleton className="h-4 w-1/3" />
                            <Skeleton className="h-5 w-2/3" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </CardContent>
                    </Card>
                    <Card className="bg-card/80 backdrop-blur-sm border-border/20 shadow-lg">
                        <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
                        <CardContent className="space-y-6">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </CardContent>
                    </Card>
                </div>
                <Card className="bg-card/80 backdrop-blur-sm border-border/20 shadow-lg">
                    <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
                    <CardContent className="space-y-6">
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-6 w-3/4" />
                    </CardContent>
                </Card>
                <div className="text-center">
                    <Skeleton className="h-10 w-32" />
                </div>
            </div>
        </div>
    </div>
);