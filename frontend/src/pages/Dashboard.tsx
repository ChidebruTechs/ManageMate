import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Package, 
  Wrench, 
  DollarSign, 
  AlertTriangle 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/UI/Card';
import { Badge } from '../components/UI/Badge';
import { format } from 'date-fns';

export function Dashboard() {
  const { state } = useApp();

  // Calculate dashboard statistics
  const totalRevenue = state.sales.reduce((sum, sale) => sum + sale.total, 0);
  const totalCustomers = state.customers.length;
  const activeRepairs = state.repairs.filter(r => r.status !== 'completed' && r.status !== 'cancelled').length;
  const lowStockItems = state.products.filter(p => p.stock <= p.minStock);

  const recentSales = state.sales.slice(-5).reverse();
  const recentRepairs = state.repairs.slice(-5).reverse();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'info';
      case 'pending': return 'warning';
      case 'paid': return 'success';
      case 'pending': return 'warning';
      case 'overdue': return 'danger';
      default: return 'default';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card hover className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-4">
            <DollarSign className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
          <p className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
        </Card>

        <Card hover className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Customers</p>
          <p className="text-2xl font-bold text-gray-900">{totalCustomers}</p>
        </Card>

        <Card hover className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4">
            <Wrench className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Active Repairs</p>
          <p className="text-2xl font-bold text-gray-900">{activeRepairs}</p>
        </Card>

        <Card hover className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg mx-auto mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Low Stock Items</p>
          <p className="text-2xl font-bold text-gray-900">{lowStockItems.length}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sales */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Sales</h3>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="space-y-4">
            {recentSales.map((sale) => (
              <div key={sale.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div>
                  <p className="font-medium text-gray-900">{sale.customerName}</p>
                  <p className="text-sm text-gray-600">{sale.invoiceNumber}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">${sale.total.toFixed(2)}</p>
                  <Badge variant={getStatusColor(sale.paymentStatus) as any}>
                    {sale.paymentStatus}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Repairs */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Repairs</h3>
            <Wrench className="w-5 h-5 text-blue-500" />
          </div>
          <div className="space-y-4">
            {recentRepairs.map((repair) => (
              <div key={repair.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div>
                  <p className="font-medium text-gray-900">{repair.customerName}</p>
                  <p className="text-sm text-gray-600">{repair.device}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{format(repair.createdAt, 'MMM dd')}</p>
                  <Badge variant={getStatusColor(repair.status) as any}>
                    {repair.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h3 className="text-lg font-semibold text-red-900">Low Stock Alert</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {lowStockItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-3 border border-red-200">
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-red-600">
                  Stock: {item.stock} (Min: {item.minStock})
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}