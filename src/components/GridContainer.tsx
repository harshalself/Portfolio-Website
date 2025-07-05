
import { ReactNode } from 'react';

interface GridContainerProps {
  children: ReactNode;
  className?: string;
}

const GridContainer = ({ children, className = '' }: GridContainerProps) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr ${className}`}>
      {children}
    </div>
  );
};

export default GridContainer;
