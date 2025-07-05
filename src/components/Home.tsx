import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Github, Linkedin, Instagram } from 'lucide-react';
import GlassCard from './GlassCard';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from './ui/tooltip';
import Spline from '@splinetool/react-spline';

interface HomeData {
  name: string;
  sop: string;
  contact: {
    city: string;
    email: string;
    linkedin: string;
    instagram: string;
    github: string;
  };
  education: {
    degree: string;
    branch: string;
    college: string;
    location: string;
    year: string;
    cgpa: string;
  };
  stats: {
    projectsCompleted: number;
    technologiesLearned: number;
    toolsUsed: number;
    hackathonsParticipated: number;
  };
  softSkills: string[];
}

const Home = () => {
  const [data, setData] = useState<HomeData | null>(null);

  useEffect(() => {
    fetch('/data/home.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) {
    return null;
  }

  const technologies = [
    'HTML', 'CSS', 'JavaScript', 'React.js', 'Node.js', 'Express.js', 
    'MongoDB', 'PostgreSQL', 'Python', 'C++', 'Tailwind CSS', 
    'Firebase', 'TypeScript', 'Git', 'GitHub'
  ];

  const tools = [
    'Canva', 'Lightroom', 'Snapseed', 'CapCut', 'Cursor AI Editor',
    'Lovable Dev', 'Supabase', 'Vercel', 'Visual Studio Code (VS Code)',
    'Figma', 'Postman', 'Notion', 'GitHub Projects', 'Render',
    'Google Colab', 'Replit'
  ];

  const softSkills = [
    'Communication', 'Teamwork', 'Leadership', 'Adaptability',
    'Problem Solving', 'Time Management', 'Creativity', 'Ideation',
    'Decision Making', 'Quick Learner'
  ];

  const passionSkills = [
    'Photography', 'Videography', 'Lightroom (editing)',
    'Snapseed (editing)', 'CapCut (video editing)', 'Canva (design)'
  ];

  const socialLinks = [
    { icon: Github, url: data.contact.github, label: 'GitHub' },
    { icon: Linkedin, url: data.contact.linkedin, label: 'LinkedIn' },
    { icon: Instagram, url: data.contact.instagram, label: 'Instagram' },
  ];

  const statsData = [
    { 
      label: 'Projects', 
      value: data.stats.projectsCompleted,
      hoverContent: null,
      showTooltip: true
    },
    { 
      label: 'Technologies', 
      value: technologies.length,
      hoverContent: (
        <div className="space-y-3">
          <h4 className="font-semibold text-white mb-2">Technologies</h4>
          <div className="grid grid-cols-2 gap-2">
            {technologies.map((tech, index) => (
              <div key={index} className="text-sm text-white/80 bg-white/5 px-2 py-1 rounded">
                {tech}
              </div>
            ))}
          </div>
        </div>
      ),
      showTooltip: false
    },
    { 
      label: 'Tools', 
      value: tools.length,
      hoverContent: (
        <div className="space-y-3">
          <h4 className="font-semibold text-white mb-2">Tools</h4>
          <div className="grid grid-cols-2 gap-2">
            {tools.map((tool, index) => (
              <div key={index} className="text-sm text-white/80 bg-white/5 px-2 py-1 rounded">
                {tool}
              </div>
            ))}
          </div>
        </div>
      ),
      showTooltip: false
    },
    { 
      label: 'Skills', 
      value: softSkills.length + passionSkills.length,
      hoverContent: (
        <div className="space-y-4 w-60 max-h-80 overflow-y-auto">
          <div>
            <h4 className="font-semibold text-white mb-2">Soft Skills</h4>
            <div className="space-y-1">
              {softSkills.map((skill, index) => (
                <div key={index} className="text-sm text-white/80 bg-white/5 px-2 py-1 rounded">
                  {skill}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Passion</h4>
            <div className="space-y-1">
              {passionSkills.map((skill, index) => (
                <div key={index} className="text-sm text-white/80 bg-white/5 px-2 py-1 rounded">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
      showTooltip: false
    },
  ];

  return (
    <TooltipProvider>
      <div className="h-full flex flex-col overflow-hidden">
        {/* Hero Section - Fixed height */}
        <div className="flex-shrink-0">
          <GlassCard className="py-4 sm:py-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-center"
            >
              {/* Left Side - Information */}
              <div className="space-y-3 sm:space-y-4 order-2 lg:order-1">
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-2 sm:mb-3">
                    {data.name}
                  </h1>
                  <p className="subtitle text-sm sm:text-base lg:text-lg text-white max-w-lg leading-relaxed">
                    {data.sop}
                  </p>
                </div>

                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white text-sm sm:text-base">
                    <MapPin size={16} className="sm:w-[18px] sm:h-[18px]" />
                    <span>{data.contact.city}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white text-sm sm:text-base">
                    <Mail size={16} className="sm:w-[18px] sm:h-[18px]" />
                    <a href={`mailto:${data.contact.email}`} className="hover:text-purple-300 transition-colors break-all">
                      {data.contact.email}
                    </a>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-3 sm:gap-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="p-2 sm:p-3 glass rounded-lg hover-glow hover:scale-110 transition-all duration-300"
                      >
                        <Icon size={18} className="sm:w-5 sm:h-5 text-white" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              {/* Right Side - Profile Image */}
              <div className="flex justify-center order-1 lg:order-2 lg:justify-end">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-2xl overflow-hidden border-2 border-purple-500/30 shadow-lg"
                >
                  <img 
                    src="https://avatars.githubusercontent.com/u/119789631?v=4"
                    alt="Harshal Patil"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>
          </GlassCard>
        </div>

        {/* Main Content Grid - Flexible height */}
        <div className="flex-1 min-h-0 mt-4">
          <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-4">
            
            {/* Stats - Column 1 */}
            <div className="grid grid-cols-2 gap-3 h-fit lg:h-full">
              {statsData.map((stat, index) => (
                <div key={stat.label} className="h-full">
                  {stat.showTooltip ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="cursor-pointer h-full">
                          <GlassCard delay={index * 0.1} className="flex flex-col items-center justify-center text-center h-full hover:bg-white/15 transition-all duration-300">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.3 + index * 0.1, type: "spring", damping: 15 }}
                              className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text mb-1 sm:mb-2"
                            >
                              {stat.value}+
                            </motion.div>
                            <div className="subtitle text-white text-xs sm:text-sm font-medium">{stat.label}</div>
                          </GlassCard>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="glass border-purple-500/30">
                        <p className="text-white">Check out projects section</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : stat.hoverContent ? (
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <div className="cursor-pointer h-full">
                          <GlassCard delay={index * 0.1} className="flex flex-col items-center justify-center text-center h-full hover:bg-white/15 transition-all duration-300">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.3 + index * 0.1, type: "spring", damping: 15 }}
                              className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text mb-1 sm:mb-2"
                            >
                              {stat.value}+
                            </motion.div>
                            <div className="subtitle text-white text-xs sm:text-sm font-medium">{stat.label}</div>
                          </GlassCard>
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80 glass border-purple-500/30">
                        {stat.hoverContent}
                      </HoverCardContent>
                    </HoverCard>
                  ) : (
                    <GlassCard delay={index * 0.1} className="flex flex-col items-center justify-center text-center h-full">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1, type: "spring", damping: 15 }}
                        className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text mb-1 sm:mb-2"
                      >
                        {stat.value}+
                      </motion.div>
                      <div className="subtitle text-white text-xs sm:text-sm font-medium">{stat.label}</div>
                    </GlassCard>
                  )}
                </div>
              ))}
            </div>

            {/* 3D Spline Model - Column 2 - Constrained height */}
            <div className="h-full max-h-[50vh] lg:max-h-full relative overflow-hidden rounded-lg">
              <Spline scene="https://prod.spline.design/uuHpudnGcAe4fZee/scene.splinecode" />
            </div>

            {/* Education - Column 3 */}
            <div className="h-fit lg:h-full">
              <GlassCard delay={0.4} className="h-full flex flex-col justify-center py-4">
                <h3 className="text-base sm:text-lg font-bold gradient-text mb-3">Education</h3>
                <div className="space-y-2">
                  <div>
                    <h4 className="subtitle text-sm sm:text-base font-semibold text-white">{data.education.degree}</h4>
                  </div>
                  <div className="space-y-1">
                    <p className="text-white text-xs sm:text-sm">{data.education.college}</p>
                    <p className="text-white text-xs sm:text-sm">{data.education.location}</p>
                    <p className="text-white text-xs sm:text-sm">Class of {data.education.year}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="subtitle text-white text-xs sm:text-sm">CGPA</span>
                    <span className="text-base sm:text-lg font-bold gradient-text">{data.education.cgpa}/10</span>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Home;
