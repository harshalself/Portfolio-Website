import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  ExternalLink,
  Briefcase,
  Users,
  Trophy,
  Star,
  Award,
} from "lucide-react";
import GlassCard from "./GlassCard";
import { Badge } from "./ui/badge";
import TiltedCard from "./TiltedCard";

interface ItemCardProps {
  item: {
    id: number;
    title: string;
    organization?: string;
    company?: string;
    position?: string;
    role?: string;
    duration?: string;
    date?: string;
    location?: string;
    description: string;
    skills?: string[];
    technologies?: string[];
    achievements?: string[];
    certificate?: string;
    link?: string;
    category?: string;
  };
  index: number;
  type?: "internship" | "co-curricular" | "extra-curricular";
}

const ItemCard = ({ item, index, type }: ItemCardProps) => {
  const skills = item.skills || item.technologies || [];
  const organizationName = item.organization || item.company;
  const dateOrDuration = item.date || item.duration;

  const getIconForType = () => {
    if (type === "internship") {
      return (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="briefcase-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <Briefcase className="w-full h-full" fill="url(#briefcase-gradient)" stroke="url(#briefcase-gradient)" />
        </svg>
      );
    } else if (type === "co-curricular") {
      return (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="award-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffd700" />
              <stop offset="100%" stopColor="#ff8c00" />
            </linearGradient>
          </defs>
          <circle cx="12" cy="8" r="6" fill="none" stroke="url(#award-gradient)" strokeWidth="2"/>
          <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" fill="none" stroke="url(#award-gradient)" strokeWidth="2"/>
          <path d="M12 6v2" fill="none" stroke="url(#award-gradient)" strokeWidth="2"/>
          <path d="M12 2v2" fill="none" stroke="url(#award-gradient)" strokeWidth="2"/>
          <path d="M4.93 4.93l1.41 1.41" fill="none" stroke="url(#award-gradient)" strokeWidth="2"/>
          <path d="M17.66 6.34l1.41-1.41" fill="none" stroke="url(#award-gradient)" strokeWidth="2"/>
        </svg>
      );
    } else if (type === "extra-curricular") {
      return (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="star-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <Star className="w-full h-full" fill="url(#star-gradient)" stroke="url(#star-gradient)" />
        </svg>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full">
      <TiltedCard
        containerHeight="100%"
        containerWidth="100%"
        rotateAmplitude={8}
        scaleOnHover={1.05}
        className="h-full">
        <GlassCard className="h-full flex flex-col relative p-2">
          <div className="flex items-start gap-2 mb-2 flex-shrink-0">
            {getIconForType() && (
              <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                {getIconForType()}
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-white mb-1 line-clamp-2">
                {item.title}
              </h3>
              {organizationName && (
                <p className="text-purple-300 font-medium text-base mb-1">
                  {organizationName}
                </p>
              )}
            </div>
            
            {(item.certificate || item.link) && (
              <a
                href={item.certificate || item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-2 py-1 bg-white/10 hover:bg-white/20 rounded text-white text-sm flex-shrink-0">
                <ExternalLink size={12} />
              </a>
            )}
          </div>

          {dateOrDuration && (
            <div className="flex gap-2 mb-2 text-base text-white/60 flex-shrink-0">
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                {dateOrDuration}
              </div>
            </div>
          )}

          <div className="flex-1 flex flex-col">
            <p className="text-white/70 mb-2 text-base leading-relaxed flex-1">
              {item.description}
            </p>

            {skills.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-auto flex-shrink-0">
                {skills.slice(0, 4).map((skill, skillIndex) => (
                  <Badge key={skillIndex} variant="secondary" className="text-base px-2 py-1">
                    {skill}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </GlassCard>
      </TiltedCard>
    </motion.div>
  );
};

export default ItemCard;
