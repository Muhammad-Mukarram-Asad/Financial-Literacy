import React, { useState } from 'react';
import { Calculator, PiggyBank, TrendingUp, DollarSign, Target, CheckCircle } from 'lucide-react';

const FinancialLiteracyGuide = () => {
  const [activeTab, setActiveTab] = useState('budgeting');
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState({
    housing: '',
    food: '',
    transport: '',
    utilities: '',
    other: ''
  });
  const [savingsGoal, setSavingsGoal] = useState('');
  const [timeframe, setTimeframe] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [years, setYears] = useState('');
  const [returnRate, setReturnRate] = useState('7');

  // Budget Calculator
  const calculateBudget = () => {
    const totalExpenses = Object.values(expenses).reduce((sum, expense) => 
      sum + (parseFloat(expense) || 0), 0);
    const remaining = parseFloat(income) - totalExpenses;
    const savingsRate = income ? ((remaining / parseFloat(income)) * 100).toFixed(1) : 0;
    
    return { totalExpenses, remaining, savingsRate };
  };

  // Savings Calculator
  const calculateSavings = () => {
    if (!savingsGoal || !timeframe) return null;
    const monthlyNeeded = parseFloat(savingsGoal) / parseInt(timeframe);
    return monthlyNeeded.toFixed(2);
  };

  // Investment Calculator (Compound Interest)
  const calculateInvestment = () => {
    if (!investmentAmount || !years || !returnRate) return null;
    const principal = parseFloat(investmentAmount);
    const rate = parseFloat(returnRate) / 100;
    const time = parseInt(years);
    
    const futureValue = principal * Math.pow((1 + rate), time);
    const totalGain = futureValue - principal;
    
    return {
      futureValue: futureValue.toFixed(2),
      totalGain: totalGain.toFixed(2)
    };
  };

  const budgetResult = calculateBudget();
  const savingsNeeded = calculateSavings();
  const investmentResult = calculateInvestment();

  const tabs = [
    { id: 'budgeting', label: 'Budgeting', icon: Calculator },
    { id: 'savings', label: 'Savings', icon: PiggyBank },
    { id: 'investments', label: 'Investments', icon: TrendingUp }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <DollarSign className="h-8 w-8" />
            Your Financial Literacy Guide
          </h1>
          <p className="text-blue-100 mt-2">Master budgeting, savings, and investments with practical tools</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Budgeting Tab */}
        {activeTab === 'budgeting' && (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">50/30/20 Budget Calculator</h2>
            <p className="text-gray-600 mb-6">Track your income and expenses using the popular 50/30/20 rule: 50% needs, 30% wants, 20% savings.</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Income (after tax)</label>
                  <input
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your monthly income"
                  />
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">Monthly Expenses</h3>
                  {Object.entries(expenses).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm text-gray-600 mb-1 capitalize">{key}</label>
                      <input
                        type="number"
                        value={value}
                        onChange={(e) => setExpenses({...expenses, [key]: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={`${key} expenses`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-4">Budget Analysis</h3>
                
                {income && (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Monthly Income:</span>
                      <span className="font-semibold text-green-600">${parseFloat(income).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Expenses:</span>
                      <span className="font-semibold text-red-600">${budgetResult.totalExpenses.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span>Remaining:</span>
                      <span className={`font-bold ${budgetResult.remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${budgetResult.remaining.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Savings Rate:</span>
                      <span className="font-semibold">{budgetResult.savingsRate}%</span>
                    </div>
                    
                    <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">50/30/20 Targets:</h4>
                      <div className="text-sm space-y-1">
                        <div>Needs (50%): ${(parseFloat(income) * 0.5).toLocaleString()}</div>
                        <div>Wants (30%): ${(parseFloat(income) * 0.3).toLocaleString()}</div>
                        <div>Savings (20%): ${(parseFloat(income) * 0.2).toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <h4 className="font-semibold text-yellow-800">Quick Tips:</h4>
              <ul className="text-yellow-700 text-sm mt-2 space-y-1">
                <li>• Track expenses for a month to get accurate numbers</li>
                <li>• Aim for at least 20% savings rate</li>
                <li>• Review and adjust your budget monthly</li>
                <li>• Use apps like Mint or YNAB for automatic tracking</li>
              </ul>
            </div>
          </div>
        )}

        {/* Savings Tab */}
        {activeTab === 'savings' && (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Savings Goal Calculator</h2>
            <p className="text-gray-600 mb-6">Plan your savings strategy and build your emergency fund.</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Savings Goal ($)</label>
                  <input
                    type="number"
                    value={savingsGoal}
                    onChange={(e) => setSavingsGoal(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 10000 for emergency fund"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timeframe (months)</label>
                  <input
                    type="number"
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 12 for one year"
                  />
                </div>

                {savingsNeeded && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-800 mb-2">Monthly Savings Needed:</h3>
                    <div className="text-2xl font-bold text-green-600">${savingsNeeded}</div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Savings Priorities
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>1. $1,000 starter emergency fund</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>2. Pay off high-interest debt</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>3. 3-6 months of expenses saved</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>4. Retirement & other goals</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Best Savings Accounts:</h3>
                  <div className="text-sm space-y-2">
                    <div>• High-yield savings: 4-5% APY</div>
                    <div>• Money market accounts</div>
                    <div>• CDs for longer-term goals</div>
                    <div>• Avoid regular checking accounts</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-green-50 border-l-4 border-green-400 p-4">
              <h4 className="font-semibold text-green-800">Savings Tips:</h4>
              <ul className="text-green-700 text-sm mt-2 space-y-1">
                <li>• Automate your savings - "pay yourself first"</li>
                <li>• Keep emergency fund in a separate high-yield account</li>
                <li>• Start small - even $25/month builds the habit</li>
                <li>• Use the envelope method for discretionary spending</li>
              </ul>
            </div>
          </div>
        )}

        {/* Investments Tab */}
        {activeTab === 'investments' && (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Investment Growth Calculator</h2>
            <p className="text-gray-600 mb-6">See how compound interest can grow your investments over time.</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Initial Investment ($)</label>
                  <input
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 1000"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Years to Invest</label>
                  <input
                    type="number"
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expected Annual Return (%)</label>
                  <input
                    type="number"
                    value={returnRate}
                    onChange={(e) => setReturnRate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="7 (stock market average)"
                  />
                  <p className="text-xs text-gray-500 mt-1">S&P 500 historical average: ~7-10%</p>
                </div>

                {investmentResult && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-800 mb-2">Investment Results:</h3>
                    <div className="space-y-1">
                      <div>Future Value: <span className="font-bold text-green-600">${parseFloat(investmentResult.futureValue).toLocaleString()}</span></div>
                      <div>Total Gain: <span className="font-bold text-green-600">${parseFloat(investmentResult.totalGain).toLocaleString()}</span></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-800 mb-3">Investment Basics for Beginners:</h3>
                  <div className="text-sm space-y-2">
                    <div><strong>Index Funds:</strong> Diversified, low-cost (great starting point)</div>
                    <div><strong>ETFs:</strong> Like index funds but trade like stocks</div>
                    <div><strong>Target-Date Funds:</strong> Auto-adjusts as you age</div>
                    <div><strong>Robo-Advisors:</strong> Automated investing (Betterment, Wealthfront)</div>
                  </div>
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <h3 className="font-semibold text-orange-800 mb-3">Asset Allocation by Age:</h3>
                  <div className="text-sm space-y-1">
                    <div>20s-30s: 80-90% stocks, 10-20% bonds</div>
                    <div>40s: 70% stocks, 30% bonds</div>
                    <div>50s: 60% stocks, 40% bonds</div>
                    <div>60s+: 50% stocks, 50% bonds</div>
                  </div>
                </div>

                <div className="bg-red-50 rounded-lg p-4">
                  <h3 className="font-semibold text-red-800 mb-3">⚠️ Investment Rules:</h3>
                  <div className="text-sm space-y-1">
                    <div>• Never invest money you need within 5 years</div>
                    <div>• Diversify - don't put all eggs in one basket</div>
                    <div>• Keep fees low (under 0.5% expense ratio)</div>
                    <div>• Don't try to time the market</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4">
              <h4 className="font-semibold text-blue-800">Getting Started:</h4>
              <ul className="text-blue-700 text-sm mt-2 space-y-1">
                <li>• Open a brokerage account (Fidelity, Vanguard, Schwab)</li>
                <li>• Start with target-date funds or broad market index funds</li>
                <li>• Contribute to 401(k) up to company match first</li>
                <li>• Then max out Roth IRA ($6,500/year for 2023)</li>
                <li>• Invest consistently, regardless of market conditions</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialLiteracyGuide;
