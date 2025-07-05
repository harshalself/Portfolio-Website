import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface TiltedCardProps {
  children: React.ReactNode;
  imageSrc?: string;
  containerHeight?: string;
  containerWidth?: string;
  imageHeight?: string;
  imageWidth?: string;
  rotateAmplitude?: number;
  scaleOnHover?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  className?: string;
}

const TiltedCard: React.FC<TiltedCardProps> = ({
  children,
  imageSrc,
  containerHeight = "300px",
  containerWidth = "300px",
  imageHeight = "300px",
  imageWidth = "300px",
  rotateAmplitude = 12,
  scaleOnHover = 1.2,
  showMobileWarning = false,
  showTooltip = true,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotateXValue =
      ((e.clientY - centerY) / (rect.height / 2)) * -rotateAmplitude;
    const rotateYValue =
      ((e.clientX - centerX) / (rect.width / 2)) * rotateAmplitude;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        height: containerHeight,
        width: containerWidth,
        perspective: "1000px",
        willChange: "transform",
        backfaceVisibility: "hidden",
        transformStyle: "preserve-3d",
        transform: "translateZ(0)",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        scale: isHovered ? scaleOnHover : 1,
        rotateX: rotateX,
        rotateY: rotateY,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}>
      {imageSrc && (
        <img
          src={imageSrc}
          alt=""
          style={{
            height: imageHeight,
            width: imageWidth,
          }}
          className="absolute inset-0 object-cover rounded-lg"
        />
      )}
      <div className="relative z-10 h-full w-full">{children}</div>
    </motion.div>
  );
};

export default TiltedCard;
