
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import GlassCard from './GlassCard';
import { Badge } from './ui/badge';
import TiltedCard from './TiltedCard';

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    link: string;
    liveLink?: string;
  };
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <TiltedCard
        containerHeight="100%"
        containerWidth="100%"
        rotateAmplitude={10}
        scaleOnHover={1.05}
        className="h-full"
      >
        <GlassCard className="h-full flex flex-col">
          <div className="relative overflow-hidden rounded-lg mb-4 flex-shrink-0">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover transition-transform duration-300"
            />
          </div>
          
          <div className="flex-1 flex flex-col">
            <h3 className="text-xl font-semibold text-white mb-2 flex-shrink-0">{project.title}</h3>
            <p className="text-white/70 mb-4 text-sm leading-relaxed flex-1">{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4 flex-shrink-0">
              {project.technologies.map((tech, techIndex) => (
                <Badge key={techIndex} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
            
            <div className="flex gap-3 mt-auto flex-shrink-0">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white text-sm"
              >
                <Github size={16} />
                Code
              </a>
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-white text-sm"
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </GlassCard>
      </TiltedCard>
    </motion.div>
  );
};

export default ProjectCard;
