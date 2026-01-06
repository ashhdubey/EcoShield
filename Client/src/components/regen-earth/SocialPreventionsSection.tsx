
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { containerAnimation, itemAnimation, preventionTips, sectionIcons } from "@/data/regenEarthData";
import { PreventionTipCard } from "./PreventionTipCard";

export function SocialPreventionsSection() {
  return (
    <motion.section 
      className="mb-16"
      variants={containerAnimation}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-ecoshield-sky-blue/20 p-2 rounded-full">
          {sectionIcons.socialPrevention}
        </div>
        <h2 className="text-2xl font-semibold">Social Preventions</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {preventionTips.map((tip, index) => (
          <motion.div key={index} variants={itemAnimation}>
            <PreventionTipCard tip={tip} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
