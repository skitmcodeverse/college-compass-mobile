
import React from 'react';
import { cn } from '@/lib/utils';

interface PageTitleProps {
  title: string;
  description?: string;
  className?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, description, className }) => {
  return (
    <div className={cn("mb-4 md:mb-6 animate-fade-in", className)}>
      <h1 className="text-xl md:text-2xl font-bold tracking-tight">{title}</h1>
      {description && (
        <p className="text-sm md:text-base text-muted-foreground mt-1 max-w-3xl">
          {description}
        </p>
      )}
    </div>
  );
};

export default PageTitle;
