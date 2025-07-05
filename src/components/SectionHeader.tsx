
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  delay?: number;
}

const SectionHeader = ({ title, subtitle, delay = 0 }: SectionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="text-center mb-8"
    >
      <h2 className="text-3xl font-bold gradient-text mb-2">{title}</h2>
      {subtitle && (
        <p className="text-white/70 text-lg">{subtitle}</p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
