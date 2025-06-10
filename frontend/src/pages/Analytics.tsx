import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Download, TrendingUp, PieChart, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';
import * as XLSX from 'xlsx';

const filingsByYear = [
  { year: '2020', patents: 1200 },
  { year: '2021', patents: 1500 },
  { year: '2022', patents: 1800 },
  { year: '2023', patents: 2200 },
  { year: '2024', patents: 1800 },
];

const topCategories = [
  { name: 'Electronics', value: 35, color: '#2563eb' },
  { name: 'Furniture', value: 25, color: '#4f46e5' },
  { name: 'Automotive', value: 20, color: '#10b981' },
  { name: 'Appliances', value: 12, color: '#f59e0b' },
  { name: 'Others', value: 8, color: '#6b7280' },
];

const geographicDistribution = [
  { country: 'United States', patents: 4500, color: '#2563eb' },
  { country: 'European Union', patents: 3200, color: '#4f46e5' },
  { country: 'Japan', patents: 2800, color: '#10b981' },
  { country: 'China', patents: 2100, color: '#f59e0b' },
  { country: 'South Korea', patents: 1200, color: '#ef4444' },
];

const monthlyTrends = [
  { month: 'Jan', filed: 180, granted: 120 },
  { month: 'Feb', filed: 200, granted: 150 },
  { month: 'Mar', filed: 220, granted: 160 },
  { month: 'Apr', filed: 190, granted: 140 },
  { month: 'May', filed: 240, granted: 180 },
  { month: 'Jun', filed: 260, granted: 200 },
  { month: 'Jul', filed: 230, granted: 170 },
  { month: 'Aug', filed: 210, granted: 160 },
  { month: 'Sep', filed: 250, granted: 190 },
  { month: 'Oct', filed: 270, granted: 210 },
  { month: 'Nov', filed: 240, granted: 180 },
  { month: 'Dec', filed: 220, granted: 170 },
];

const handleExportReport = () => {
  // Prepare data for export
  const filingsSheet = XLSX.utils.json_to_sheet(filingsByYear);
  const categoriesSheet = XLSX.utils.json_to_sheet(topCategories);
  const geoSheet = XLSX.utils.json_to_sheet(geographicDistribution);
  const monthlySheet = XLSX.utils.json_to_sheet(monthlyTrends);

  // Create a new workbook and append sheets
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, filingsSheet, 'FilingsByYear');
  XLSX.utils.book_append_sheet(wb, categoriesSheet, 'TopCategories');
  XLSX.utils.book_append_sheet(wb, geoSheet, 'GeographicDistribution');
  XLSX.utils.book_append_sheet(wb, monthlySheet, 'MonthlyTrends');

  // Export to Excel file
  XLSX.writeFile(wb, 'analytics_report.xlsx');
};

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Comprehensive insights into patent filing trends and patterns.</p>
        </div>
        <button onClick={handleExportReport} className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
          <Download className="h-4 w-4" />
          <span>Export Report</span>
        </button>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Patents Analyzed', value: '12,450', change: '+15%', icon: BarChart3 },
          { label: 'Avg. Filing Time', value: '18 months', change: '-2%', icon: Calendar },
          { label: 'Success Rate', value: '78%', change: '+5%', icon: TrendingUp },
          { label: 'Active Categories', value: '24', change: '+3', icon: PieChart },
        ].map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                <p className="text-sm text-green-600 mt-1">{metric.change}</p>
              </div>
              <div className="p-3 bg-primary-50 rounded-xl">
                <metric.icon className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Filing Trends by Year */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Patent Filings by Year</h3>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={filingsByYear}>
              <defs>
                <linearGradient id="colorPatents" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="year" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="patents" 
                stroke="#2563eb" 
                fillOpacity={1} 
                fill="url(#colorPatents)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Top Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Top Categories</h3>
            <PieChart className="h-5 w-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={topCategories}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {topCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {topCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{category.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{category.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Geographic Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Geographic Distribution</h3>
          <BarChart3 className="h-5 w-5 text-gray-400" />
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={geographicDistribution} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis type="number" stroke="#64748b" />
            <YAxis dataKey="country" type="category" width={100} stroke="#64748b" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }} 
            />
            <Bar dataKey="patents" fill="#2563eb" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Monthly Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Monthly Filing vs Grant Trends</h3>
          <Calendar className="h-5 w-5 text-gray-400" />
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={monthlyTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="filed" 
              stroke="#2563eb" 
              strokeWidth={3}
              dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
              name="Filed"
            />
            <Line 
              type="monotone" 
              dataKey="granted" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              name="Granted"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default Analytics;