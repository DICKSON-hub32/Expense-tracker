import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Wallet, 
  PieChart as PieChartIcon,
  Bell,
  ArrowUpRight,
  Plus
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip
} from 'recharts';
import { useAppContext } from '../hooks/useAppContext';
import { QUOTES } from '../lib/constants';
import BlurBackground from '../components/BlurBackground';
import Layout from '../components/Layout';

const Dashboard: React.FC = () => {
  const { user, expenses, goals } = useAppContext();

  const totalExpenses = useMemo(() => 
    expenses.filter(e => !e.disabled).reduce((acc, curr) => acc + curr.amount, 0),
  [expenses]);

  const categoryData = useMemo(() => {
    const data: Record<string, number> = {};
    expenses.filter(e => !e.disabled).forEach(e => {
      data[e.category] = (data[e.category] || 0) + e.amount;
    });
    return Object.entries(data).map(([name, value]) => ({ name, value }));
  }, [expenses]);

  const randomQuote = useMemo(() => 
    QUOTES[Math.floor(Math.random() * QUOTES.length)],
  []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <BlurBackground type="dashboard">
      <Layout title="Dashboard Overview">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {/* Summary Cards */}
          <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-indigo-500/20 rounded-2xl text-indigo-400">
                <Wallet size={24} />
              </div>
              <span className="flex items-center text-emerald-400 text-sm font-medium">
                +2.5% <ArrowUpRight size={16} />
              </span>
            </div>
            <p className="text-white/60 text-sm mb-1">Monthly Expenses</p>
            <h3 className="text-2xl font-bold text-white">{user.currency} {totalExpenses.toLocaleString()}</h3>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-emerald-500/20 rounded-2xl text-emerald-400">
                <TrendingUp size={24} />
              </div>
              <span className="flex items-center text-emerald-400 text-sm font-medium">
                Good <ArrowUpRight size={16} />
              </span>
            </div>
            <p className="text-white/60 text-sm mb-1">Savings Progress</p>
            <h3 className="text-2xl font-bold text-white">42% of Goal</h3>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-amber-500/20 rounded-2xl text-amber-400">
                <Bell size={24} />
              </div>
              <span className="bg-amber-500/20 text-amber-400 text-[10px] uppercase px-2 py-1 rounded-full font-bold">
                Pending
              </span>
            </div>
            <p className="text-white/60 text-sm mb-1">Upcoming Bills</p>
            <h3 className="text-2xl font-bold text-white">3 Unpaid</h3>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition-colors group">
            <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center text-white/40 group-hover:scale-110 group-hover:text-white group-hover:border-white transition-all">
              <Plus size={24} />
            </div>
            <p className="mt-2 text-white/40 group-hover:text-white transition-colors">Add Expense</p>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Chart */}
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            animate="show"
            className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-white">Expense Distribution</h3>
              <div className="flex gap-2">
                <button className="px-4 py-1.5 rounded-lg bg-indigo-500 text-white text-sm font-medium">Monthly</button>
                <button className="px-4 py-1.5 rounded-lg bg-white/5 text-white/60 text-sm font-medium hover:text-white transition-colors">Yearly</button>
              </div>
            </div>
            
            <div className="h-[300px] w-full">
              {categoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData}>
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-white/20">
                  <PieChartIcon size={48} className="mb-4" />
                  <p>No expense data to display yet.</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Side Panel: Quote & Goals */}
          <div className="space-y-8">
            {/* Reminders Section */}
            {expenses.filter(e => !e.isPaid && !e.disabled).length > 0 && (
              <motion.div 
                variants={itemVariants}
                initial="hidden"
                animate="show"
                className="bg-amber-500/10 border border-amber-500/20 p-8 rounded-3xl"
              >
                <div className="flex items-center gap-2 text-amber-400 mb-4">
                  <Bell size={18} />
                  <h3 className="font-bold uppercase tracking-widest text-[10px]">Upcoming Reminders</h3>
                </div>
                <div className="space-y-4">
                  {expenses.filter(e => !e.isPaid && !e.disabled).slice(0, 3).map(e => (
                    <div key={e.id} className="flex justify-between items-center group">
                      <div>
                        <p className="text-white font-medium text-sm">{e.name}</p>
                        <p className="text-white/40 text-[10px]">{e.category}</p>
                      </div>
                      <p className="text-amber-400 font-bold text-sm">{user.currency} {e.amount.toLocaleString()}</p>
                    </div>
                  ))}
                  {expenses.filter(e => !e.isPaid && !e.disabled).length > 3 && (
                    <button className="text-[10px] text-white/40 hover:text-white transition-colors font-bold uppercase">
                      + {expenses.filter(e => !e.isPaid && !e.disabled).length - 3} more unpaid
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            <motion.div 
              variants={itemVariants}
              initial="hidden"
              animate="show"
              className="bg-indigo-600/20 border border-indigo-500/30 p-8 rounded-3xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 text-indigo-500/20 group-hover:scale-110 transition-transform">
                <TrendingUp size={80} />
              </div>
              <div className="relative z-10">
                <h4 className="text-indigo-400 font-bold uppercase tracking-widest text-[10px] mb-4">Daily Wisdom</h4>
                <p className="text-lg font-medium text-white mb-4 italic leading-relaxed">
                  "{randomQuote.text}"
                </p>
                <p className="text-indigo-300 text-sm font-bold">— {randomQuote.source}</p>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              initial="hidden"
              animate="show"
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl"
            >
              <h3 className="text-xl font-bold text-white mb-6">Active Goals</h3>
              <div className="space-y-6">
                {goals.slice(0, 3).map((goal) => (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-white font-medium">{goal.title}</span>
                      <span className="text-white/60">{(goal.currentAmount / goal.targetAmount * 100).toFixed(0)}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded-full" 
                        style={{ width: `${(goal.currentAmount / goal.targetAmount * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
                {goals.length === 0 && (
                  <p className="text-white/40 text-center py-4">No active goals. Start planning!</p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </Layout>
    </BlurBackground>
  );
};

export default Dashboard;
