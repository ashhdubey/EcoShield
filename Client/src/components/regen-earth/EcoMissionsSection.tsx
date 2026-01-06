
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { ecoMissions, sectionIcons } from "@/data/regenEarthData";
import { MissionCard } from "./MissionCard";

interface EcoMissionsSectionProps {
  joinedMissions: number[];
  onJoinMission: (missionId: number) => void;
}

export function EcoMissionsSection({ joinedMissions, onJoinMission }: EcoMissionsSectionProps) {
  return (
    <motion.section 
      className="mb-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-between gap-3 mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-ecoshield-sky-blue/20 p-2 rounded-full">
            {sectionIcons.ecoMissions}
          </div>
          <h2 className="text-2xl font-semibold">EcoMissions</h2>
        </div>
        <motion.div 
          className="flex items-center gap-2"
          animate={{ 
            scale: joinedMissions.length > 0 ? [1, 1.1, 1] : 1,
          }}
          transition={{ duration: 0.5 }}
        >
          <Trophy className="h-5 w-5 text-amber-500" />
          <span className="font-medium">Your Missions: {joinedMissions.length}</span>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {ecoMissions.map((mission) => (
          <MissionCard 
            key={mission.id} 
            mission={mission} 
            isJoined={joinedMissions.includes(mission.id)} 
            onJoinMission={onJoinMission}
          />
        ))}
      </div>
    </motion.section>
  );
}
