import React, { useState } from 'react';
import { Plus, Search, Wrench, Clock, CheckCircle, XCircle, User, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Badge } from '../components/UI/Badge';
import { Modal } from '../components/UI/Modal';
import { Repair } from '../types';
import { format } from 'date-fns';

export function Repairs() {
  const { state, dispatch } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingRepair, setEditingRepair] = useState<Repair | null>(null);

  const filteredRepairs = state.repairs.filter(repair => {
    const matchesSearch = repair.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         repair.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         repair.issue.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || repair.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const repairStats = {
    total: state.repairs.length,
    pending: state.repairs.filter(r => r.status === 'pending').length,
    inProgress: state.repairs.filter(r => r.status === 'in-progress').length,
    completed: state.repairs.filter(r => r.status === 'completed').length,
  };

  const handleAddRepair = (repairData: Omit<Repair, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newRepair: Repair = {
      ...repairData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    dispatch({ type: 'ADD_REPAIR', payload: newRepair });
    setIsAddModalOpen(false);
  };

  const handleUpdateRepair = (repairData: Omit<Repair, 'id' | 'createdAt'>) => {
    if (editingRepair) {
      const updatedRepair: Repair = {
        ...repairData,
        id: editingRepair.id,
        createdAt: editingRepair.createdAt,
        updatedAt: new Date(),
      };
      dispatch({ type: 'UPDATE_REPAIR', payload: updatedRepair });
      setEditingRepair(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'info';
      case 'pending': return 'warning';
      case 'cancelled': return 'danger';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Repair Management</h1>
          <p className="text-gray-600">Track and manage device repairs and service requests</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Repair
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center">
          <Wrench className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Total Repairs</p>
          <p className="text-2xl font-bold text-gray-900">{repairStats.total}</p>
        </Card>
        <Card className="text-center">
          <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-2xl font-bold text-gray-900">{repairStats.pending}</p>
        </Card>
        <Card className="text-center">
          <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <p className="text-sm text-gray-600">In Progress</p>
          <p className="text-2xl font-bold text-gray-900">{repairStats.inProgress}</p>
        </Card>
        <Card className="text-center">
          <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Completed</p>
          <p className="text-2xl font-bold text-gray-900">{repairStats.completed}</p>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search repairs by customer, device, or issue..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </Card>

      {/* Repairs List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Device</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Issue</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Technician</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Cost</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRepairs.map((repair) => (
                <tr key={repair.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900">{repair.customerName}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900">{repair.device}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-gray-600 max-w-xs truncate">{repair.issue}</div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={getStatusColor(repair.status) as any}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(repair.status)}
                        <span className="capitalize">{repair.status.replace('-', ' ')}</span>
                      </div>
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{repair.technicianName || 'Unassigned'}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900">
                      ${repair.actualCost?.toFixed(2) || repair.estimatedCost.toFixed(2)}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{format(repair.createdAt, 'MMM dd, yyyy')}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingRepair(repair)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add/Edit Repair Modal */}
      <RepairModal
        isOpen={isAddModalOpen || !!editingRepair}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingRepair(null);
        }}
        onSave={editingRepair ? handleUpdateRepair : handleAddRepair}
        repair={editingRepair}
        customers={state.customers}
        users={state.user ? [state.user] : []}
      />
    </div>
  );
}

// Repair Modal Component
interface RepairModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (repair: any) => void;
  repair?: Repair | null;
  customers: any[];
  users: any[];
}

function RepairModal({ isOpen, onClose, onSave, repair, customers, users }: RepairModalProps) {
  const [formData, setFormData] = useState({
    customerId: '',
    customerName: '',
    device: '',
    issue: '',
    status: 'pending' as const,
    technicianId: '',
    technicianName: '',
    estimatedCost: 0,
    actualCost: 0,
    notes: [] as string[],
  });

  React.useEffect(() => {
    if (repair) {
      setFormData({
        customerId: repair.customerId,
        customerName: repair.customerName,
        device: repair.device,
        issue: repair.issue,
        status: repair.status,
        technicianId: repair.technicianId || '',
        technicianName: repair.technicianName || '',
        estimatedCost: repair.estimatedCost,
        actualCost: repair.actualCost || 0,
        notes: repair.notes,
      });
    } else {
      setFormData({
        customerId: '',
        customerName: '',
        device: '',
        issue: '',
        status: 'pending',
        technicianId: '',
        technicianName: '',
        estimatedCost: 0,
        actualCost: 0,
        notes: [],
      });
    }
  }, [repair, isOpen]);

  const handleCustomerChange = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    setFormData({
      ...formData,
      customerId,
      customerName: customer?.name || '',
    });
  };

  const handleTechnicianChange = (technicianId: string) => {
    const technician = users.find(u => u.id === technicianId);
    setFormData({
      ...formData,
      technicianId,
      technicianName: technician?.name || '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.customerId && formData.device && formData.issue) {
      const repairData = {
        ...formData,
        completedAt: formData.status === 'completed' ? new Date() : undefined,
      };
      onSave(repairData);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={repair ? 'Edit Repair' : 'New Repair'}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {repair ? 'Update' : 'Create'} Repair
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Customer
          </label>
          <select
            value={formData.customerId}
            onChange={(e) => handleCustomerChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            required
          >
            <option value="">Select a customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Device
            </label>
            <input
              type="text"
              value={formData.device}
              onChange={(e) => setFormData({ ...formData, device: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="e.g., iPhone 14 Pro"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Issue Description
          </label>
          <textarea
            value={formData.issue}
            onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="Describe the issue..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Technician
          </label>
          <select
            value={formData.technicianId}
            onChange={(e) => handleTechnicianChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="">Unassigned</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estimated Cost ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.estimatedCost}
              onChange={(e) => setFormData({ ...formData, estimatedCost: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Actual Cost ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.actualCost}
              onChange={(e) => setFormData({ ...formData, actualCost: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
      </form>
    </Modal>
  );
}