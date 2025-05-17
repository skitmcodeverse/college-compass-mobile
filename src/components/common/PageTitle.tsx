
import React from 'react';

interface PageTitleProps {
  title: string;
  description?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, description }) => {
  return (
    <div className="mb-6">
      <h1 className="text-xl md:text-2xl font-bold tracking-tight">{title}</h1>
      {description && <p className="text-sm md:text-base text-muted-foreground">{description}</p>}
    </div>
  );
};

export default PageTitle;
