import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Bookmark, 
  TrendingUp, 
  Users,
  Search,
  Eye,
  Clock,
  Award
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const stats = [
  { name: 'Total Patents Tracked', value: '1,234', change: '+12%', icon: FileText, color: 'text-primary-600', bgColor: 'bg-primary-50' },
  { name: 'Active Watchlists', value: '23', change: '+3', icon: Bookmark, color: 'text-secondary-600', bgColor: 'bg-secondary-50' },
  { name: 'Searches This Month', value: '456', change: '+18%', icon: Search, color: 'text-accent-600', bgColor: 'bg-accent-50' },
  { name: 'Patent Views', value: '2,891', change: '+7%', icon: Eye, color: 'text-orange-600', bgColor: 'bg-orange-50' },
];

const filingTrends = [
  { month: 'Jan', patents: 120 },
  { month: 'Feb', patents: 150 },
  { month: 'Mar', patents: 180 },
  { month: 'Apr', patents: 140 },
  { month: 'May', patents: 190 },
  { month: 'Jun', patents: 220 },
];

const topApplicants = [
  { name: 'TechCorp Inc.', value: 35, color: '#2563eb' },
  { name: 'InnovateTech', value: 25, color: '#4f46e5' },
  { name: 'DesignPro Ltd.', value: 20, color: '#10b981' },
  { name: 'Others', value: 20, color: '#6b7280' },
];

const recentActivity = [
  { action: 'New patent added to "Mobile Designs" watchlist', time: '2 hours ago', icon: Bookmark },
  { action: 'Search performed for "smartphone camera"', time: '4 hours ago', icon: Search },
  { action: 'Patent US1234567 viewed', time: '6 hours ago', icon: Eye },
  { action: 'Watchlist "Furniture Patents" created', time: '1 day ago', icon: Bookmark },
  { action: 'Analytics report generated', time: '2 days ago', icon: TrendingUp },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's your patent intelligence overview.</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Filing Trends Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Filing Trends</h3>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filingTrends}>
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
                dataKey="patents" 
                stroke="#2563eb" 
                strokeWidth={3}
                dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Top Applicants */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Top Applicants</h3>
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={topApplicants}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {topApplicants.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {topApplicants.map((applicant, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: applicant.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{applicant.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{applicant.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <Clock className="h-5 w-5 text-gray-400" />
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="p-2 bg-primary-50 rounded-lg">
                <activity.icon className="h-4 w-4 text-primary-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;