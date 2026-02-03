import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Eye, 
  EyeOff, 
  Search, 
  Filter,
  Calendar,
  Tag
} from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';
import { CATEGORIES } from '../lib/constants';
import BlurBackground from '../components/BlurBackground';
import Layout from '../components/Layout';
import { Expense, ExpenseCategory } from '../types';

const Expenses: React.FC = () => {
  const { expenses, addExpense, updateExpense, deleteExpense, user } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<ExpenseCategory | 'All'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<Omit<Expense, 'id'>>({
    name: '',
    amount: 0,
    category: 'Housing',
    isRecurring: true,
    isPaid: false,
    disabled: false
  });

  const filteredExpenses = useMemo(() => {
    return expenses.filter(e => {
      const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'All' || e.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [expenses, searchTerm, filterCategory]);

  const totalFiltered = filteredExpenses.reduce((acc, curr) => acc + (curr.disabled ? 0 : curr.amount), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateExpense(editingId, formData);
      setEditingId(null);
    } else {
      addExpense(formData);
    }
    setFormData({
      name: '',
      amount: 0,
      category: 'Housing',
      isRecurring: true,
      isPaid: false,
      disabled: false
    });
    setIsModalOpen(false);
  };

  const handleEdit = (expense: Expense) => {
    setFormData({
      name: expense.name,
      amount: expense.amount,
      category: expense.category,
      isRecurring: expense.isRecurring,
      isPaid: expense.isPaid,
      disabled: expense.disabled
    });
    setEditingId(expense.id);
    setIsModalOpen(true);
  };

  return (
    <BlurBackground type="expenses">
      <Layout title="Expense Management">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
            <input 
              type="text"
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>
          <div className="flex gap-4">
            <select 
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as any)}
              className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <button 
              onClick={() => {
                setEditingId(null);
                setFormData({
                  name: '',
                  amount: 0,
                  category: 'Housing',
                  isRecurring: true,
                  isPaid: false,
                  disabled: false
                });
                setIsModalOpen(true);
              }}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20"
            >
              <Plus size={20} />
              Add Expense
            </button>
          </div>
        </div>

        {/* Total Summary */}
        <div className="bg-indigo-500/10 border border-indigo-500/20 p-6 rounded-3xl mb-8 flex justify-between items-center">
          <div>
            <p className="text-indigo-400 text-sm font-medium uppercase tracking-wider">Total Active Expenses</p>
            <h2 className="text-3xl font-bold text-white">{user.currency} {totalFiltered.toLocaleString()}</h2>
          </div>
          <div className="hidden md:block">
            <p className="text-white/40 text-sm text-right">Filtered Expenses: {filteredExpenses.length}</p>
          </div>
        </div>

        {/* Expenses List */}
        <div className="grid grid-cols-1 gap-4">
          <AnimatePresence mode='popLayout'>
            {filteredExpenses.map((expense) => (
              <motion.div
                layout
                key={expense.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={cn(
                  "bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-3xl flex items-center justify-between group",
                  expense.disabled && "opacity-50 grayscale"
                )}
              >
                <div className="flex items-center gap-5">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center",
                    expense.isPaid ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
                  )}>
                    <Tag size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">{expense.name}</h4>
                    <div className="flex items-center gap-3 text-white/40 text-sm">
                      <span className="flex items-center gap-1"><Filter size={14} /> {expense.category}</span>
                      {expense.isRecurring && <span className="flex items-center gap-1"><Calendar size={14} /> Recurring</span>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-xl font-bold text-white">{user.currency} {expense.amount.toLocaleString()}</p>
                    <p className={cn(
                      "text-[10px] uppercase font-bold tracking-widest",
                      expense.isPaid ? "text-emerald-400" : "text-amber-400"
                    )}>
                      {expense.isPaid ? 'Paid' : 'Unpaid'}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => updateExpense(expense.id, { disabled: !expense.disabled })}
                      className="p-2 rounded-xl bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all"
                      title={expense.disabled ? "Enable" : "Disable"}
                    >
                      {expense.disabled ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                    <button 
                      onClick={() => handleEdit(expense)}
                      className="p-2 rounded-xl bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => deleteExpense(expense.id)}
                      className="p-2 rounded-xl bg-white/5 text-red-400/60 hover:text-red-400 hover:bg-red-400/10 transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredExpenses.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-white/20">
                <Receipt size={40} />
              </div>
              <p className="text-white/40 text-lg">No expenses found matching your search.</p>
            </div>
          )}
        </div>

        {/* Add/Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl p-8 relative z-10 shadow-2xl"
            >
              <h2 className="text-2xl font-bold text-white mb-6">{editingId ? 'Edit Expense' : 'Add New Expense'}</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Expense Name</label>
                  <input 
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Rent, Internet, Netflix"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Amount</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-sm">{user.currency}</div>
                      <input 
                        required
                        type="number"
                        value={formData.amount}
                        onChange={(e) => setFormData({...formData, amount: parseFloat(e.target.value) || 0})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Category</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-6 py-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={formData.isRecurring}
                      onChange={(e) => setFormData({...formData, isRecurring: e.target.checked})}
                      className="w-5 h-5 rounded-lg border-white/10 bg-white/5 text-indigo-500 focus:ring-indigo-500/50"
                    />
                    <span className="text-sm text-slate-300">Recurring Monthly</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={formData.isPaid}
                      onChange={(e) => setFormData({...formData, isPaid: e.target.checked})}
                      className="w-5 h-5 rounded-lg border-white/10 bg-white/5 text-emerald-500 focus:ring-emerald-500/50"
                    />
                    <span className="text-sm text-slate-300">Paid for this Month</span>
                  </label>
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
                    className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-500/20"
                  >
                    {editingId ? 'Save Changes' : 'Create Expense'}
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

// Internal utility since I didn't want to export it from everywhere
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

import { Receipt } from 'lucide-react';

export default Expenses;
