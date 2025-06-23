import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Package, 
  Wrench,
  Calendar,
  Filter,
  Download,
  Eye,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Target,
  Award,
  Zap
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Badge } from '../components/UI/Badge';
import { format, subDays, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

export function Analytics() {
  const { state } = useApp();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [chartType, setChartType] = useState<'revenue' | 'sales' | 'repairs' | 'inventory'>('revenue');

  // Calculate analytics data
  const totalRevenue = state.sales.reduce((sum, sale) => sum + sale.total, 0);
  const totalSales = state.sales.length;
  const totalCustomers = state.customers.length;
  const activeRepairs = state.repairs.filter(r => r.status !== 'completed' && r.status !== 'cancelled').length;
  const completedRepairs = state.repairs.filter(r => r.status === 'completed').length;
  const lowStockItems = state.products.filter(p => p.stock <= p.minStock).length;

  // Calculate growth metrics (mock data for demo)
  const revenueGrowth = 12.5;
  const salesGrowth = 8.3;
  const customerGrowth = 15.2;
  const repairGrowth = -5.1;

  // Generate chart data
  const generateRevenueData = () => {
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : timeRange === '90d' ? 90 : 365;
    const data = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const dayRevenue = Math.random() * 1000 + 200;
      data.push({
        date: format(date, 'MMM dd'),
        revenue: dayRevenue,
        sales: Math.floor(Math.random() * 10) + 1,
        repairs: Math.floor(Math.random() * 5) + 1,
      });
    }
    return data;
  };

  const generateCategoryData = () => {
    const categories = ['Phone Parts', 'Laptop Parts', 'Accessories', 'Tools', 'Other'];
    return categories.map(category => ({
      name: category,
      value: Math.floor(Math.random() * 1000) + 100,
      sales: Math.floor(Math.random() * 50) + 10,
    }));
  };

  const generateRepairStatusData = () => [
    { name: 'Completed', value: completedRepairs, color: '#10B981' },
    { name: 'In Progress', value: state.repairs.filter(r => r.status === 'in-progress').length, color: '#3B82F6' },
    { name: 'Pending', value: state.repairs.filter(r => r.status === 'pending').length, color: '#F59E0B' },
    { name: 'Cancelled', value: state.repairs.filter(r => r.status === 'cancelled').length, color: '#EF4444' },
  ];

  const chartData = generateRevenueData();
  const categoryData = generateCategoryData();
  const repairStatusData = generateRepairStatusData();

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 mt-1">Track your business performance and insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white/50 backdrop-blur-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <Button variant="secondary" className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Total Revenue</p>
              <p className="text-3xl font-bold mt-1">${totalRevenue.toFixed(0)}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm">+{revenueGrowth}%</span>
              </div>
            </div>
            <div className="bg-white/20 p-3 rounded-xl">
              <DollarSign className="w-8 h-8" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Sales</p>
              <p className="text-3xl font-bold mt-1">{totalSales}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm">+{salesGrowth}%</span>
              </div>
            </div>
            <div className="bg-white/20 p-3 rounded-xl">
              <BarChart3 className="w-8 h-8" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white border-0 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Active Customers</p>
              <p className="text-3xl font-bold mt-1">{totalCustomers}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm">+{customerGrowth}%</span>
              </div>
            </div>
            <div className="bg-white/20 p-3 rounded-xl">
              <Users className="w-8 h-8" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white border-0 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Active Repairs</p>
              <p className="text-3xl font-bold mt-1">{activeRepairs}</p>
              <div className="flex items-center mt-2">
                {repairGrowth > 0 ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                <span className="text-sm">{repairGrowth > 0 ? '+' : ''}{repairGrowth}%</span>
              </div>
            </div>
            <div className="bg-white/20 p-3 rounded-xl">
              <Wrench className="w-8 h-8" />
            </div>
          </div>
        </Card>
      </div>

      {/* Chart Controls */}
      <Card className="backdrop-blur-sm bg-white/80 border border-white/20">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-gray-500" />
            <span className="font-medium text-gray-700">Chart Type:</span>
          </div>
          <div className="flex bg-gray-100 rounded-lg p-1">
            {[
              { key: 'revenue', label: 'Revenue', icon: DollarSign },
              { key: 'sales', label: 'Sales', icon: BarChart3 },
              { key: 'repairs', label: 'Repairs', icon: Wrench },
              { key: 'inventory', label: 'Inventory', icon: Package },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setChartType(key as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                  chartType === key ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue/Sales Trend */}
        <Card className="bg-white/80 backdrop-blur-sm border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {chartType === 'revenue' ? 'Revenue' : chartType === 'sales' ? 'Sales' : chartType === 'repairs' ? 'Repairs' : 'Inventory'} Trend
            </h3>
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-blue-500" />
              <Badge variant="info">{timeRange.toUpperCase()}</Badge>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="date" 
                  stroke="#6B7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6B7280"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey={chartType}
                  stroke="#3B82F6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Repair Status Distribution */}
        <Card className="bg-white/80 backdrop-blur-sm border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Repair Status Distribution</h3>
            <PieChartIcon className="w-5 h-5 text-purple-500" />
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={repairStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {repairStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {repairStatusData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600">{item.name}</span>
                <span className="text-sm font-medium text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Category Performance & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Performance */}
        <Card className="bg-white/80 backdrop-blur-sm border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Category Performance</h3>
            <Target className="w-5 h-5 text-green-500" />
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="name" 
                  stroke="#6B7280"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  stroke="#6B7280"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="#3B82F6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Performance Insights */}
        <Card className="bg-white/80 backdrop-blur-sm border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Performance Insights</h3>
            <Zap className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-3">
                <div className="bg-green-500 p-2 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-green-800">Revenue Growth</p>
                  <p className="text-sm text-green-600">+{revenueGrowth}% increase this month</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-500 p-2 rounded-lg">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-blue-800">Customer Growth</p>
                  <p className="text-sm text-blue-600">+{customerGrowth}% new customers</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-500 p-2 rounded-lg">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-orange-800">Low Stock Alert</p>
                  <p className="text-sm text-orange-600">{lowStockItems} items need restocking</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-500 p-2 rounded-lg">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-purple-800">Repair Efficiency</p>
                  <p className="text-sm text-purple-600">{completedRepairs} repairs completed</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity Summary */}
      <Card className="bg-white/80 backdrop-blur-sm border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity Summary</h3>
          <Calendar className="w-5 h-5 text-gray-500" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
            <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-blue-800">${(totalRevenue / 30).toFixed(0)}</p>
            <p className="text-sm text-blue-600">Avg. Daily Revenue</p>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-100">
            <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-green-800">{Math.round(totalSales / 30)}</p>
            <p className="text-sm text-green-600">Avg. Daily Sales</p>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-100">
            <div className="bg-purple-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-purple-800">{Math.round(state.repairs.length / 30)}</p>
            <p className="text-sm text-purple-600">Avg. Daily Repairs</p>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg border border-orange-100">
            <div className="bg-orange-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-orange-800">{Math.round(totalCustomers / 30)}</p>
            <p className="text-sm text-orange-600">New Customers/Month</p>
          </div>
        </div>
      </Card>
    </div>
  );
}