export interface User {
  name: string;
  onboarded: boolean;
  currency: string;
}

export type ExpenseCategory = 
  | 'Housing' 
  | 'Transport' 
  | 'Food' 
  | 'Utilities' 
  | 'Insurance' 
  | 'Healthcare' 
  | 'Education' 
  | 'Entertainment' 
  | 'Personal' 
  | 'Debt' 
  | 'Other';

export interface Expense {
  id: string;
  category: ExpenseCategory;
  name: string;
  amount: number;
  isRecurring: boolean;
  dueDate?: string; // ISO date or day of month
  isPaid: boolean;
  disabled: boolean;
}

export type GoalType = 'Short-term' | 'Mid-term' | 'Long-term';

export interface FinancialGoal {
  id: string;
  type: GoalType;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
}

export interface InvestmentOpportunity {
  id: string;
  title: string;
  description: string;
  capitalRange: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  timeHorizon: string;
  location: 'Kenya' | 'Africa' | 'Global';
  category: string;
}

export interface Quote {
  text: string;
  source: string;
  type: 'Wisdom' | 'Scripture';
}
