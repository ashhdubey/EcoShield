
import { motion } from "framer-motion";
import { PreventionTip } from "@/data/regenEarthData";

interface PreventionTipCardProps {
  tip: PreventionTip;
}

export function PreventionTipCard({ tip }: PreventionTipCardProps) {
  return (
    <motion.div 
      whileHover={{ 
        y: -5,
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
      }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-border hover:border-ecoshield-sky-blue/50 transition-all"
    >
      <div className="flex items-start gap-4">
        <div className="mt-1">{tip.icon}</div>
        <div>
          <h3 className="font-medium mb-2">{tip.title}</h3>
          <p className="text-sm text-muted-foreground">{tip.description}</p>
        </div>
      </div>
    </motion.div>
  );
}
