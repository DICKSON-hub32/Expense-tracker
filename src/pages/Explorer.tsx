import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Compass, 
  MapPin, 
  BarChart3, 
  Clock, 
  ExternalLink, 
  Search,
  AlertCircle,
  TrendingUp,
  Globe,
  Briefcase
} from 'lucide-react';
import { INVESTMENTS } from '../lib/constants';
import BlurBackground from '../components/BlurBackground';
import Layout from '../components/Layout';

const Explorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'All' | 'Kenya' | 'Africa' | 'Global'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInvestments = INVESTMENTS.filter(inv => {
    const matchesTab = activeTab === 'All' || inv.location === activeTab;
    const matchesSearch = inv.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         inv.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <BlurBackground type="explorer">
      <Layout title="Business & Investment Explorer">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">Grow Your Wealth</h2>
          <p className="text-white/60 leading-relaxed">
            Discover legal, vetted, and low-to-medium risk investment opportunities in Kenya and globally. 
            Remember, all investments carry risk. Do your own research before committing funds.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-10">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
            <input 
              type="text"
              placeholder="Search opportunities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
            {['All', 'Kenya', 'Africa', 'Global'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={cn(
                  "px-6 py-3 rounded-xl text-sm font-bold transition-all",
                  activeTab === tab ? "bg-indigo-500 text-white shadow-lg" : "text-white/40 hover:text-white"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {filteredInvestments.map((inv) => (
            <motion.div
              layout
              key={inv.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] flex flex-col group hover:border-indigo-500/30 transition-colors"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                  {inv.category === 'Agriculture' ? <TrendingUp size={28} /> : 
                   inv.category === 'Stocks' ? <BarChart3 size={28} /> : 
                   inv.category === 'Real Estate' ? <Briefcase size={28} /> :
                   <Compass size={28} />}
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                  <Globe size={14} className="text-white/40" />
                  <span className="text-[10px] uppercase font-bold text-white/60 tracking-widest">{inv.location}</span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">{inv.title}</h3>
              <p className="text-white/40 leading-relaxed mb-8 flex-1">{inv.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <p className="text-[10px] uppercase font-bold text-white/20 mb-1 tracking-widest">Capital Range</p>
                  <p className="text-white font-medium">{inv.capitalRange}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <p className="text-[10px] uppercase font-bold text-white/20 mb-1 tracking-widest">Risk Level</p>
                  <p className={cn(
                    "font-bold",
                    inv.riskLevel === 'Low' ? 'text-emerald-400' : 'text-amber-400'
                  )}>{inv.riskLevel}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <p className="text-[10px] uppercase font-bold text-white/20 mb-1 tracking-widest">Time Horizon</p>
                  <p className="text-white font-medium flex items-center gap-2"><Clock size={14} /> {inv.timeHorizon}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <p className="text-[10px] uppercase font-bold text-white/20 mb-1 tracking-widest">Location</p>
                  <p className="text-white font-medium flex items-center gap-2"><MapPin size={14} /> {inv.location}</p>
                </div>
              </div>

              <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all">
                Learn More Details <ExternalLink size={18} />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Legal Disclaimer */}
        <div className="bg-amber-500/10 border border-amber-500/20 p-8 rounded-[2rem] flex items-start gap-6">
          <div className="p-3 bg-amber-500/20 rounded-2xl text-amber-400 shrink-0">
            <AlertCircle size={24} />
          </div>
          <div>
            <h4 className="text-amber-400 font-bold mb-2">Legal Disclaimer</h4>
            <p className="text-white/60 text-sm leading-relaxed">
              The information provided on this page is for educational purposes only and does not constitute financial, investment, or legal advice. 
              Returns are never guaranteed and you may lose some or all of your invested capital. 
              Always consult with a certified financial advisor before making significant investment decisions. 
              FinSmart is not responsible for any losses incurred through these third-party opportunities.
            </p>
          </div>
        </div>
      </Layout>
    </BlurBackground>
  );
};

// Internal utility
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default Explorer;
