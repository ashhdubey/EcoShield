import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  description: string;
}

const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <motion.div
      className="space-y-4 text-center mb-12"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="text-muted-foreground max-w-3xl mx-auto">
        {description}
      </p>
    </motion.div>
  );
};

export default PageHeader;