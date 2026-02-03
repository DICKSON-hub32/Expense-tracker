import React from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Moon, 
  Globe, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';
import BlurBackground from '../components/BlurBackground';
import Layout from '../components/Layout';

const Settings: React.FC = () => {
  const { user } = useAppContext();

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
      localStorage.clear();
      window.location.href = '/';
    }
  };

  const sections = [
    {
      title: 'Profile Settings',
      items: [
        { icon: User, label: 'Personal Information', value: user.name },
        { icon: CreditCard, label: 'Default Currency', value: user.currency },
      ]
    },
    {
      title: 'App Preferences',
      items: [
        { icon: Bell, label: 'Notifications', value: 'Enabled' },
        { icon: Moon, label: 'Appearance', value: 'System Dark' },
        { icon: Globe, label: 'Language', value: 'English' },
      ]
    },
    {
      title: 'Security',
      items: [
        { icon: Shield, label: 'Data Privacy', value: 'Cloud Sync Off' },
      ]
    }
  ];

  return (
    <BlurBackground type="dashboard">
      <Layout title="Application Settings">
        <div className="max-w-2xl mx-auto space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white/40 font-bold uppercase tracking-widest text-xs mb-6 ml-4">{section.title}</h3>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
                {section.items.map((item, idx) => (
                  <button 
                    key={item.label}
                    className={cn(
                      "w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors group text-left",
                      idx !== section.items.length - 1 && "border-bottom border-white/5"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/5 rounded-2xl text-white/40 group-hover:text-indigo-400 transition-colors">
                        <item.icon size={20} />
                      </div>
                      <div>
                        <p className="text-white font-medium">{item.label}</p>
                        <p className="text-white/40 text-sm">{item.value}</p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-white/20" />
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="pt-6">
            <button 
              onClick={handleReset}
              className="w-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 font-bold py-5 rounded-3xl flex items-center justify-center gap-3 transition-all"
            >
              <LogOut size={22} />
              Reset All Application Data
            </button>
            <p className="text-center mt-6 text-white/20 text-sm italic">
              FinSmart v1.0.0 — Crafted with Wisdom
            </p>
          </div>
        </div>
      </Layout>
    </BlurBackground>
  );
};

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default Settings;
