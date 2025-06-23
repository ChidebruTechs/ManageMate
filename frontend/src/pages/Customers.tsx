import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  DollarSign,
  Wrench,
  Edit,
  Trash2,
  Eye,
  Download,
  Star,
  TrendingUp,
  Clock,
  User
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Badge } from '../components/UI/Badge';
import { Modal } from '../components/UI/Modal';
import { Customer } from '../types';
import { format } from 'date-fns';

export function Customers() {
  const { state, dispatch } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'totalSpent' | 'createdAt'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter and sort customers
  const filteredCustomers = useMemo(() => {
    return state.customers
      .filter(customer => {
        const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            customer.phone.includes(searchTerm);
        
        const matchesFilter = filterStatus === 'all' || 
                            (filterStatus === 'active' && customer.totalSpent > 0) ||
                            (filterStatus === 'inactive' && customer.totalSpent === 0);
        
        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => {
        let aValue: any = a[sortBy];
        let bValue: any = b[sortBy];
        
        if (sortBy === 'createdAt') {
          aValue = a.createdAt.getTime();
          bValue = b.createdAt.getTime();
        }
        
        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
  }, [state.customers, searchTerm, filterStatus, sortBy, sortOrder]);

  // Calculate stats
  const totalCustomers = state.customers.length;
  const activeCustomers = state.customers.filter(c => c.totalSpent > 0).length;
  const totalRevenue = state.customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const avgSpending = totalCustomers > 0 ? totalRevenue / totalCustomers : 0;

  const handleAddCustomer = (customerData: Omit<Customer, 'id' | 'createdAt' | 'totalSpent' | 'repairHistory'>) => {
    const newCustomer: Customer = {
      ...customerData,
      id: Date.now().toString(),
      createdAt: new Date(),
      totalSpent: 0,
      repairHistory: [],
    };
    dispatch({ type: 'ADD_CUSTOMER', payload: newCustomer });
    setIsAddModalOpen(false);
  };

  const handleUpdateCustomer = (customerData: Omit<Customer, 'id' | 'createdAt'>) => {
    if (editingCustomer) {
      const updatedCustomer: Customer = {
        ...customerData,
        id: editingCustomer.id,
        createdAt: editingCustomer.createdAt,
      };
      dispatch({ type: 'UPDATE_CUSTOMER', payload: updatedCustomer });
      setEditingCustomer(null);
    }
  };

  const getCustomerTier = (totalSpent: number) => {
    if (totalSpent >= 1000) return { label: 'VIP', color: 'bg-gradient-to-r from-amber-500 to-orange-500', icon: Star };
    if (totalSpent >= 500) return { label: 'Gold', color: 'bg-gradient-to-r from-yellow-400 to-yellow-600', icon: TrendingUp };
    if (totalSpent >= 100) return { label: 'Silver', color: 'bg-gradient-to-r from-gray-400 to-gray-600', icon: User };
    return { label: 'Bronze', color: 'bg-gradient-to-r from-amber-600 to-amber-800', icon: User };
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
            Customer Management
          </h1>
          <p className="text-gray-600 mt-1">Manage your customer relationships and track their journey</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="secondary" className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </Button>
          <Button onClick={() => setIsAddModalOpen(true)} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Customers</p>
              <p className="text-3xl font-bold mt-1">{totalCustomers}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-xl">
              <Users className="w-8 h-8" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Active Customers</p>
              <p className="text-3xl font-bold mt-1">{activeCustomers}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-xl">
              <TrendingUp className="w-8 h-8" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white border-0 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Total Revenue</p>
              <p className="text-3xl font-bold mt-1">${totalRevenue.toFixed(0)}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-xl">
              <DollarSign className="w-8 h-8" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white border-0 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Avg. Spending</p>
              <p className="text-3xl font-bold mt-1">${avgSpending.toFixed(0)}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-xl">
              <Star className="w-8 h-8" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="backdrop-blur-sm bg-white/80 border border-white/20">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white/50 backdrop-blur-sm"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white/50 backdrop-blur-sm"
              >
                <option value="all">All Customers</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field as any);
                setSortOrder(order as any);
              }}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white/50 backdrop-blur-sm"
            >
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="totalSpent-desc">Highest Spending</option>
              <option value="totalSpent-asc">Lowest Spending</option>
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
            </select>

            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
              >
                <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
              >
                <div className="w-4 h-4 flex flex-col gap-1">
                  <div className="h-0.5 bg-current rounded"></div>
                  <div className="h-0.5 bg-current rounded"></div>
                  <div className="h-0.5 bg-current rounded"></div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Customers Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer) => {
            const tier = getCustomerTier(customer.totalSpent);
            const TierIcon = tier.icon;
            
            return (
              <Card key={customer.id} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm border border-white/20">
                <div className="relative overflow-hidden">
                  {/* Tier Badge */}
                  <div className={`absolute top-0 right-0 ${tier.color} text-white px-3 py-1 rounded-bl-lg text-xs font-bold flex items-center space-x-1`}>
                    <TierIcon className="w-3 h-3" />
                    <span>{tier.label}</span>
                  </div>

                  {/* Customer Avatar */}
                  <div className="flex items-center space-x-4 mb-4 pt-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                      {customer.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
                        {customer.name}
                      </h3>
                      <p className="text-gray-500 text-sm">Customer since {format(customer.createdAt, 'MMM yyyy')}</p>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors">
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      <p className="text-sm truncate">{customer.email}</p>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600 hover:text-green-600 transition-colors">
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      <p className="text-sm">{customer.phone}</p>
                    </div>
                    <div className="flex items-start space-x-3 text-gray-600 hover:text-purple-600 transition-colors">
                      <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <p className="text-sm line-clamp-2">{customer.address}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-lg border border-green-100">
                      <p className="text-green-600 text-xs font-medium">Total Spent</p>
                      <p className="text-green-800 font-bold text-lg">${customer.totalSpent.toFixed(2)}</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 rounded-lg border border-blue-100">
                      <p className="text-blue-600 text-xs font-medium">Repairs</p>
                      <p className="text-blue-800 font-bold text-lg">{customer.repairHistory.length}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedCustomer(customer)}
                      className="flex-1 group-hover:bg-blue-50 group-hover:text-blue-600"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingCustomer(customer)}
                      className="group-hover:bg-amber-50 group-hover:text-amber-600"
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="group-hover:bg-red-50 group-hover:text-red-600"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="overflow-hidden bg-white/80 backdrop-blur-sm border border-white/20">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Customer</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Contact</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Tier</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Total Spent</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Repairs</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Joined</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer, index) => {
                  const tier = getCustomerTier(customer.totalSpent);
                  const TierIcon = tier.icon;
                  
                  return (
                    <tr 
                      key={customer.id} 
                      className={`border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 ${
                        index % 2 === 0 ? 'bg-white/50' : 'bg-gray-50/30'
                      }`}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                            {customer.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{customer.name}</p>
                            <p className="text-sm text-gray-500">{customer.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <p className="text-sm text-gray-900">{customer.phone}</p>
                          <p className="text-xs text-gray-500 line-clamp-1">{customer.address}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className={`inline-flex items-center space-x-1 ${tier.color} text-white px-2 py-1 rounded-full text-xs font-bold`}>
                          <TierIcon className="w-3 h-3" />
                          <span>{tier.label}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-bold text-green-600">${customer.totalSpent.toFixed(2)}</p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-medium text-blue-600">{customer.repairHistory.length}</p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm text-gray-600">{format(customer.createdAt, 'MMM dd, yyyy')}</p>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedCustomer(customer)}
                            className="hover:bg-blue-100 hover:text-blue-600"
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingCustomer(customer)}
                            className="hover:bg-amber-100 hover:text-amber-600"
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-red-100 hover:text-red-600"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <CustomerDetailModal
          customer={selectedCustomer}
          isOpen={!!selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          repairs={state.repairs.filter(r => r.customerId === selectedCustomer.id)}
          sales={state.sales.filter(s => s.customerId === selectedCustomer.id)}
        />
      )}

      {/* Add/Edit Customer Modal */}
      <CustomerFormModal
        isOpen={isAddModalOpen || !!editingCustomer}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingCustomer(null);
        }}
        onSave={editingCustomer ? handleUpdateCustomer : handleAddCustomer}
        customer={editingCustomer}
      />
    </div>
  );
}

// Customer Detail Modal Component
interface CustomerDetailModalProps {
  customer: Customer;
  isOpen: boolean;
  onClose: () => void;
  repairs: any[];
  sales: any[];
}

function CustomerDetailModal({ customer, isOpen, onClose, repairs, sales }: CustomerDetailModalProps) {
  const tier = customer.totalSpent >= 1000 ? { label: 'VIP', color: 'from-amber-500 to-orange-500' } :
              customer.totalSpent >= 500 ? { label: 'Gold', color: 'from-yellow-400 to-yellow-600' } :
              customer.totalSpent >= 100 ? { label: 'Silver', color: 'from-gray-400 to-gray-600' } :
              { label: 'Bronze', color: 'from-amber-600 to-amber-800' };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Customer Profile: ${customer.name}`}
      footer={
        <Button onClick={onClose}>Close</Button>
      }
    >
      <div className="space-y-6 max-h-96 overflow-y-auto">
        {/* Customer Header */}
        <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {customer.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900">{customer.name}</h3>
            <div className={`inline-flex items-center bg-gradient-to-r ${tier.color} text-white px-3 py-1 rounded-full text-sm font-bold mt-1`}>
              <Star className="w-3 h-3 mr-1" />
              {tier.label} Customer
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">Contact Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-500" />
                <span>{customer.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-green-500" />
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-purple-500 mt-0.5" />
                <span>{customer.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-orange-500" />
                <span>Customer since {format(customer.createdAt, 'MMMM dd, yyyy')}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">Statistics</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <p className="text-green-600 text-xs font-medium">Total Spent</p>
                <p className="text-green-800 font-bold text-lg">${customer.totalSpent.toFixed(2)}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <p className="text-blue-600 text-xs font-medium">Total Repairs</p>
                <p className="text-blue-800 font-bold text-lg">{repairs.length}</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                <p className="text-purple-600 text-xs font-medium">Total Orders</p>
                <p className="text-purple-800 font-bold text-lg">{sales.length}</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                <p className="text-orange-600 text-xs font-medium">Avg. Order</p>
                <p className="text-orange-800 font-bold text-lg">
                  ${sales.length > 0 ? (customer.totalSpent / sales.length).toFixed(2) : '0.00'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">Recent Activity</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {[...repairs, ...sales]
              .sort((a, b) => new Date(b.createdAt || b.date).getTime() - new Date(a.createdAt || a.date).getTime())
              .slice(0, 5)
              .map((item, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                  {'device' in item ? (
                    <>
                      <Wrench className="w-4 h-4 text-blue-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Repair: {item.device}</p>
                        <p className="text-xs text-gray-500">{format(item.createdAt, 'MMM dd, yyyy')}</p>
                      </div>
                      <Badge variant={item.status === 'completed' ? 'success' : 'info'}>
                        {item.status}
                      </Badge>
                    </>
                  ) : (
                    <>
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Sale: {item.invoiceNumber}</p>
                        <p className="text-xs text-gray-500">{format(item.date, 'MMM dd, yyyy')}</p>
                      </div>
                      <span className="text-sm font-bold text-green-600">${item.total.toFixed(2)}</span>
                    </>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}

// Customer Form Modal Component
interface CustomerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (customer: any) => void;
  customer?: Customer | null;
}

function CustomerFormModal({ isOpen, onClose, onSave, customer }: CustomerFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    totalSpent: 0,
    repairHistory: [],
  });

  React.useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        totalSpent: customer.totalSpent,
        repairHistory: customer.repairHistory,
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        totalSpent: 0,
        repairHistory: [],
      });
    }
  }, [customer, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={customer ? 'Edit Customer' : 'Add New Customer'}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-gradient-to-r from-blue-600 to-purple-600">
            {customer ? 'Update' : 'Add'} Customer
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <textarea
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="Enter customer's full address..."
          />
        </div>

        {customer && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Spent ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.totalSpent}
              onChange={(e) => setFormData({ ...formData, totalSpent: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        )}
      </form>
    </Modal>
  );
}