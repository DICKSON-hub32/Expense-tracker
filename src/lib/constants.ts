import { Quote, InvestmentOpportunity, ExpenseCategory } from '../types';

export const CATEGORIES: ExpenseCategory[] = [
  'Housing', 'Transport', 'Food', 'Utilities', 'Insurance', 
  'Healthcare', 'Education', 'Entertainment', 'Personal', 'Debt', 'Other'
];

export const QUOTES: Quote[] = [
  { text: "The plans of the diligent lead to profit as surely as haste leads to poverty.", source: "Proverbs 21:5", type: "Scripture" },
  { text: "Wealth gained hastily will dwindle, but whoever gathers little by little will increase it.", source: "Proverbs 13:11", type: "Scripture" },
  { text: "Do not save what is left after spending, but spend what is left after saving.", source: "Warren Buffett", type: "Wisdom" },
  { text: "Beware of little expenses; a small leak will sink a great ship.", source: "Benjamin Franklin", type: "Wisdom" },
  { text: "For which of you, desiring to build a tower, does not first sit down and count the cost, whether he has enough to complete it?", source: "Luke 14:28", type: "Scripture" },
  { text: "The rich rules over the poor, and the borrower is the slave of the lender.", source: "Proverbs 22:7", type: "Scripture" },
];

export const INVESTMENTS: InvestmentOpportunity[] = [
  {
    id: '1',
    title: 'Kenya Treasury Bills',
    description: 'Short-term debt instruments issued by the Government of Kenya. Very low risk and reliable.',
    capitalRange: 'KES 50,000 - 10M+',
    riskLevel: 'Low',
    timeHorizon: '91, 182, or 364 days',
    location: 'Kenya',
    category: 'Government Bonds'
  },
  {
    id: '2',
    title: 'Small-Scale Greenhouse Farming',
    description: 'Investing in controlled environment agriculture for high-value crops like tomatoes or capsicums.',
    capitalRange: 'KES 150,000 - 500,000',
    riskLevel: 'Medium',
    timeHorizon: '6 - 12 months',
    location: 'Africa',
    category: 'Agriculture'
  },
  {
    id: '3',
    title: 'Global S&P 500 ETF',
    description: 'Invest in the 500 largest US companies. Great for long-term wealth building and diversification.',
    capitalRange: '$50 - $10,000+',
    riskLevel: 'Medium',
    timeHorizon: '5 - 10+ years',
    location: 'Global',
    category: 'Stocks'
  },
  {
    id: '4',
    title: 'Real Estate Investment Trusts (REITs)',
    description: 'Invest in commercial real estate without owning physical property. Listed on Nairobi Securities Exchange.',
    capitalRange: 'KES 5,000 - 1M+',
    riskLevel: 'Medium',
    timeHorizon: '3 - 5 years',
    location: 'Kenya',
    category: 'Real Estate'
  }
];
