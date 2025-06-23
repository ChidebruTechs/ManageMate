import React, { useState } from 'react';
import { Plus, Search, Receipt, DollarSign, CreditCard, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Badge } from '../components/UI/Badge';
import { Modal } from '../components/UI/Modal';
import { Sale, SaleItem } from '../types';
import { format } from 'date-fns';

export function Sales() {
  const { state, dispatch } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredSales = state.sales.filter(sale =>
    sale.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = state.sales.reduce((sum, sale) => sum + sale.total, 0);
  const paidSales = state.sales.filter(s => s.paymentStatus === 'paid');
  const pendingSales = state.sales.filter(s => s.paymentStatus === 'pending');

  const handleAddSale = (saleData: Omit<Sale, 'id' | 'date' | 'invoiceNumber'>) => {
    const newSale: Sale = {
      ...saleData,
      id: Date.now().toString(),
      date: new Date(),
      invoiceNumber: `INV-${new Date().getFullYear()}-${String(state.sales.length + 1).padStart(3, '0')}`,
    };
    dispatch({ type: 'ADD_SALE', payload: newSale });
    setIsAddModalOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'success';
      case 'pending': return 'warning';
      case 'overdue': return 'danger';
      default: return 'default';
    }
  };

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case 'card': return <CreditCard className="w-4 h-4" />;
      case 'cash': return <DollarSign className="w-4 h-4" />;
      case 'transfer': return <CreditCard className="w-4 h-4" />;
      default: return <DollarSign className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales & Transactions</h1>
          <p className="text-gray-600">Track sales, payments, and generate invoices</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Sale
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center">
          <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Total Revenue</p>
          <p className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
        </Card>
        <Card className="text-center">
          <Receipt className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Total Sales</p>
          <p className="text-2xl font-bold text-gray-900">{state.sales.length}</p>
        </Card>
        <Card className="text-center">
          <CreditCard className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Paid Sales</p>
          <p className="text-2xl font-bold text-gray-900">{paidSales.length}</p>
        </Card>
        <Card className="text-center">
          <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Pending Payments</p>
          <p className="text-2xl font-bold text-gray-900">{pendingSales.length}</p>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search sales by customer name or invoice number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
      </Card>

      {/* Sales List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Invoice</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Items</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Total</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Payment</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map((sale) => (
                <tr key={sale.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900">{sale.invoiceNumber}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900">{sale.customerName}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-gray-600">{format(sale.date, 'MMM dd, yyyy')}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-gray-600">{sale.items.length} item(s)</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900">${sale.total.toFixed(2)}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-1">
                      {getPaymentIcon(sale.paymentMethod)}
                      <span className="text-gray-600 capitalize">{sale.paymentMethod}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={getStatusColor(sale.paymentStatus) as any}>
                      {sale.paymentStatus}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm">
                      View Invoice
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Sale Modal */}
      <SaleModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddSale}
        customers={state.customers}
        products={state.products}
      />
    </div>
  );
}

// Sale Modal Component
interface SaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (sale: Omit<Sale, 'id' | 'date' | 'invoiceNumber'>) => void;
  customers: any[];
  products: any[];
}

function SaleModal({ isOpen, onClose, onSave, customers, products }: SaleModalProps) {
  const [formData, setFormData] = useState({
    customerId: '',
    customerName: '',
    items: [] as SaleItem[],
    total: 0,
    paymentStatus: 'paid' as const,
    paymentMethod: 'cash' as const,
  });

  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleCustomerChange = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    setFormData({
      ...formData,
      customerId,
      customerName: customer?.name || '',
    });
  };

  const addItem = () => {
    const product = products.find(p => p.id === selectedProduct);
    if (product && quantity > 0) {
      const newItem: SaleItem = {
        productId: product.id,
        productName: product.name,
        quantity,
        price: product.price,
        total: product.price * quantity,
      };

      const updatedItems = [...formData.items, newItem];
      const newTotal = updatedItems.reduce((sum, item) => sum + item.total, 0);

      setFormData({
        ...formData,
        items: updatedItems,
        total: newTotal,
      });

      setSelectedProduct('');
      setQuantity(1);
    }
  };

  const removeItem = (index: number) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    const newTotal = updatedItems.reduce((sum, item) => sum + item.total, 0);
    
    setFormData({
      ...formData,
      items: updatedItems,
      total: newTotal,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.items.length > 0 && formData.customerId) {
      onSave(formData);
      // Reset form
      setFormData({
        customerId: '',
        customerName: '',
        items: [],
        total: 0,
        paymentStatus: 'paid',
        paymentMethod: 'cash',
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="New Sale"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={formData.items.length === 0}>
            Create Sale
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

        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Add Items</h4>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} - ${product.price}
                </option>
              ))}
            </select>
            <div className="flex space-x-2">
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                placeholder="Qty"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <Button type="button" onClick={addItem} size="sm">
                Add
              </Button>
            </div>
          </div>

          {formData.items.length > 0 && (
            <div className="space-y-2">
              <h5 className="font-medium text-gray-900">Items:</h5>
              {formData.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <div>
                    <span className="font-medium">{item.productName}</span>
                    <span className="text-gray-600 ml-2">x{item.quantity}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">${item.total.toFixed(2)}</span>
                    <Button
                      type="button"
                      variant="danger"
                      size="sm"
                      onClick={() => removeItem(index)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
              <div className="text-right font-bold text-lg">
                Total: ${formData.total.toFixed(2)}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Method
            </label>
            <select
              value={formData.paymentMethod}
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="transfer">Bank Transfer</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Status
            </label>
            <select
              value={formData.paymentStatus}
              onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>
      </form>
    </Modal>
  );
}