
import { motion } from "framer-motion";
import { monthlyReports, sectionIcons } from "@/data/regenEarthData";
import { ReportCard } from "./ReportCard";

export function MonthlyReportsSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-ecoshield-sky-blue/20 p-2 rounded-full">
          {sectionIcons.monthlyReports}
        </div>
        <h2 className="text-2xl font-semibold">Monthly Environmental Reports</h2>
      </div>

      <div className="space-y-8">
        {monthlyReports.map((report, index) => (
          <ReportCard key={index} report={report} index={index} />
        ))}
      </div>
    </motion.section>
  );
}
