import React from 'react';

interface BlurBackgroundProps {
  type: 'dashboard' | 'expenses' | 'goals' | 'explorer';
  children: React.ReactNode;
}

const BlurBackground: React.FC<BlurBackgroundProps> = ({ type, children }) => {
  const images = {
    dashboard: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=2011',
    expenses: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&q=80&w=2070',
    goals: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=2071',
    explorer: 'https://images.unsplash.com/photo-1611974714024-462ba99aa3e8?auto=format&fit=crop&q=80&w=2070'
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white font-sans">
      {/* Background Image with blur */}
      <div 
        className="fixed inset-0 z-0 scale-105"
        style={{
          backgroundImage: `url(${images[type]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(60px) brightness(0.25)',
          opacity: 0.7
        }}
      />
      
      {/* Dynamic Gradients for more depth */}
      <div className="fixed inset-0 z-0 bg-gradient-to-tr from-indigo-900/20 via-transparent to-emerald-900/20" />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BlurBackground;
