import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Target, 
  TrendingUp, 
  Calendar, 
  Trash2, 
  Edit2,
  Trophy,
  ChevronRight
} from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';
import BlurBackground from '../components/BlurBackground';
import Layout from '../components/Layout';
import { FinancialGoal, GoalType } from '../types';

const Goals: React.FC = () => {
  const { goals, addGoal, updateGoal, deleteGoal, user } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<FinancialGoal, 'id'>>({
    title: '',
    targetAmount: 0,
    currentAmount: 0,
    type: 'Short-term',
    deadline: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateGoal(editingId, formData);
      setEditingId(null);
    } else {
      addGoal(formData);
    }
    setFormData({
      title: '',
      targetAmount: 0,
      currentAmount: 0,
      type: 'Short-term',
      deadline: new Date().toISOString().split('T')[0]
    });
    setIsModalOpen(false);
  };

  const handleEdit = (goal: FinancialGoal) => {
    setFormData({
      title: goal.title,
      targetAmount: goal.targetAmount,
      currentAmount: goal.currentAmount,
      type: goal.type,
      deadline: goal.deadline
    });
    setEditingId(goal.id);
    setIsModalOpen(true);
  };

  const goalTypes: GoalType[] = ['Short-term', 'Mid-term', 'Long-term'];

  return (
    <BlurBackground type="goals">
      <Layout title="Financial Planning">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-white">Your Financial Goals</h2>
            <p className="text-white/60">Plan for the future with small, consistent steps.</p>
          </div>
          <button 
            onClick={() => {
              setEditingId(null);
              setFormData({
                title: '',
                targetAmount: 0,
                currentAmount: 0,
                type: 'Short-term',
                deadline: new Date().toISOString().split('T')[0]
              });
              setIsModalOpen(true);
            }}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
          >
            <Plus size={24} />
            Set New Goal
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {goalTypes.map((type) => {
            const typeGoals = goals.filter(g => g.type === type);
            const totalSaved = typeGoals.reduce((acc, curr) => acc + curr.currentAmount, 0);
            const totalTarget = typeGoals.reduce((acc, curr) => acc + curr.targetAmount, 0);
            const progress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

            return (
              <motion.div 
                key={type}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem]"
              >
                <h4 className="text-white/40 font-bold uppercase tracking-widest text-[10px] mb-4">{type} Overview</h4>
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <p className="text-3xl font-bold text-white">{progress.toFixed(0)}%</p>
                    <p className="text-white/40 text-sm">Overall Progress</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-2xl">
                    <TrendingUp size={24} className="text-emerald-400" />
                  </div>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${progress}%` }} />
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {goals.map((goal) => (
              <motion.div
                layout
                key={goal.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-[1.25rem] bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <Target size={32} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="text-2xl font-bold text-white">{goal.title}</h4>
                        <span className="bg-white/5 border border-white/10 text-white/60 text-[10px] uppercase px-2 py-1 rounded-full font-bold">
                          {goal.type}
                        </span>
                      </div>
                      <p className="text-white/40 flex items-center gap-2">
                        <Calendar size={14} /> Deadline: {new Date(goal.deadline).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 max-w-md">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white font-medium">{user.currency} {goal.currentAmount.toLocaleString()} saved</span>
                      <span className="text-white/40">Target: {user.currency} {goal.targetAmount.toLocaleString()}</span>
                    </div>
                    <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" 
                        style={{ width: `${(goal.currentAmount / goal.targetAmount * 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleEdit(goal)}
                      className="p-3 rounded-2xl bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all"
                    >
                      <Edit2 size={20} />
                    </button>
                    <button 
                      onClick={() => deleteGoal(goal.id)}
                      className="p-3 rounded-2xl bg-white/5 text-red-400/60 hover:text-red-400 hover:bg-red-400/10 transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                    <div className="ml-4 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/20 group-hover:border-indigo-500/50 group-hover:text-indigo-400 transition-all cursor-pointer">
                      <ChevronRight size={20} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {goals.length === 0 && (
            <div className="text-center py-24 bg-white/5 rounded-[2rem] border border-dashed border-white/10">
              <Trophy size={48} className="text-white/10 mx-auto mb-4" />
              <p className="text-white/40 text-lg">No goals set yet. What are you dreaming of?</p>
            </div>
          )}
        </div>

        {/* Goal Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl p-8 relative z-10 shadow-2xl"
            >
              <h2 className="text-2xl font-bold text-white mb-6">{editingId ? 'Edit Goal' : 'Set New Goal'}</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Goal Title</label>
                  <input 
                    required
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="e.g. New Home, Emergency Fund, Car"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Target Amount</label>
                    <input 
                      required
                      type="number"
                      value={formData.targetAmount}
                      onChange={(e) => setFormData({...formData, targetAmount: parseFloat(e.target.value) || 0})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Current Savings</label>
                    <input 
                      type="number"
                      value={formData.currentAmount}
                      onChange={(e) => setFormData({...formData, currentAmount: parseFloat(e.target.value) || 0})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Time Horizon</label>
                    <select 
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    >
                      <option value="Short-term">Short-term (&lt; 1 year)</option>
                      <option value="Mid-term">Mid-term (1-3 years)</option>
                      <option value="Long-term">Long-term (3+ years)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Target Date</label>
                    <input 
                      required
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-500/20"
                  >
                    {editingId ? 'Update Goal' : 'Start Saving'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </Layout>
    </BlurBackground>
  );
};

export default Goals;
