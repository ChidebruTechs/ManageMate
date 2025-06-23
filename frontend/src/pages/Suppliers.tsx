import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Truck, 
  Mail, 
  Phone, 
  MapPin, 
  Package,
  Edit,
  Trash2,
  Eye,
  Building,
  User,
  Calendar,
  Star,
  TrendingUp
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Badge } from '../components/UI/Badge';
import { Modal } from '../components/UI/Modal';
import { Supplier } from '../types';
import { format } from 'date-fns';

export function Suppliers() {
  const { state, dispatch } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  const filteredSuppliers = state.suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSupplier = (supplierData: Omit<Supplier, 'id'>) => {
    const newSupplier: Supplier = {
      ...supplierData,
      id: Date.now().toString(),
    };
    dispatch({ type: 'ADD_SUPPLIER', payload: newSupplier });
    setIsAddModalOpen(false);
  };

  const handleUpdateSupplier = (supplierData: Omit<Supplier, 'id'>) => {
    if (editingSupplier) {
      const updatedSupplier: Supplier = {
        ...supplierData,
        id: editingSupplier.id,
      };
      dispatch({ type: 'ADD_SUPPLIER', payload: updatedSupplier });
      setEditingSupplier(null);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
            Supplier Management
          </h1>
          <p className="text-gray-600 mt-1">Manage your supplier relationships and product sourcing</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Supplier
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Suppliers</p>
              <p className="text-3xl font-bold mt-1">{state.suppliers.length}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-xl">
              <Truck className="w-8 h-8" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Active Suppliers</p>
              <p className="text-3xl font-bold mt-1">{state.suppliers.length}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-xl">
              <TrendingUp className="w-8 h-8" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white border-0 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Total Products</p>
              <p className="text-3xl font-bold mt-1">
                {state.suppliers.reduce((sum, s) => sum + s.products.length, 0)}
              </p>
            </div>
            <div className="bg-white/20 p-3 rounded-xl">
              <Package className="w-8 h-8" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white border-0 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Avg. Products</p>
              <p className="text-3xl font-bold mt-1">
                {state.suppliers.length > 0 
                  ? Math.round(state.suppliers.reduce((sum, s) => sum + s.products.length, 0) / state.suppliers.length)
                  : 0
                }
              </p>
            </div>
            <div className="bg-white/20 p-3 rounded-xl">
              <Star className="w-8 h-8" />
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card className="backdrop-blur-sm bg-white/80 border border-white/20">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search suppliers by name, contact, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white/50 backdrop-blur-sm"
          />
        </div>
      </Card>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuppliers.map((supplier) => (
          <Card key={supplier.id} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm border border-white/20">
            <div className="relative overflow-hidden">
              {/* Supplier Header */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                  <Building className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
                    {supplier.name}
                  </h3>
                  <p className="text-gray-500 text-sm flex items-center">
                    <User className="w-3 h-3 mr-1" />
                    {supplier.contact}
                  </p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <p className="text-sm truncate">{supplier.email}</p>
                </div>
                <div className="flex items-center space-x-3 text-gray-600 hover:text-green-600 transition-colors">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <p className="text-sm">{supplier.phone}</p>
                </div>
                <div className="flex items-start space-x-3 text-gray-600 hover:text-purple-600 transition-colors">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <p className="text-sm line-clamp-2">{supplier.address}</p>
                </div>
              </div>

              {/* Products */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900 flex items-center">
                    <Package className="w-4 h-4 mr-2 text-blue-500" />
                    Products ({supplier.products.length})
                  </h4>
                </div>
                <div className="space-y-2 max-h-24 overflow-y-auto">
                  {supplier.products.slice(0, 3).map((product, index) => (
                    <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 p-2 rounded-lg border border-blue-100">
                      <p className="text-sm font-medium text-gray-800">{product}</p>
                    </div>
                  ))}
                  {supplier.products.length > 3 && (
                    <div className="text-xs text-gray-500 text-center py-1">
                      +{supplier.products.length - 3} more products
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedSupplier(supplier)}
                  className="flex-1 group-hover:bg-blue-50 group-hover:text-blue-600"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  View
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingSupplier(supplier)}
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
        ))}
      </div>

      {/* Supplier Detail Modal */}
      {selectedSupplier && (
        <SupplierDetailModal
          supplier={selectedSupplier}
          isOpen={!!selectedSupplier}
          onClose={() => setSelectedSupplier(null)}
        />
      )}

      {/* Add/Edit Supplier Modal */}
      <SupplierFormModal
        isOpen={isAddModalOpen || !!editingSupplier}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingSupplier(null);
        }}
        onSave={editingSupplier ? handleUpdateSupplier : handleAddSupplier}
        supplier={editingSupplier}
      />
    </div>
  );
}

// Supplier Detail Modal Component
interface SupplierDetailModalProps {
  supplier: Supplier;
  isOpen: boolean;
  onClose: () => void;
}

function SupplierDetailModal({ supplier, isOpen, onClose }: SupplierDetailModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Supplier Profile: ${supplier.name}`}
      footer={
        <Button onClick={onClose}>Close</Button>
      }
    >
      <div className="space-y-6 max-h-96 overflow-y-auto">
        {/* Supplier Header */}
        <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            <Building className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900">{supplier.name}</h3>
            <p className="text-gray-600 flex items-center mt-1">
              <User className="w-4 h-4 mr-1" />
              Contact: {supplier.contact}
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">Contact Information</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-blue-500" />
              <span>{supplier.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-green-500" />
              <span>{supplier.phone}</span>
            </div>
            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-purple-500 mt-0.5" />
              <span>{supplier.address}</span>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900 flex items-center">
            <Package className="w-4 h-4 mr-2 text-blue-500" />
            Products ({supplier.products.length})
          </h4>
          <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
            {supplier.products.map((product, index) => (
              <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg border border-blue-100">
                <p className="font-medium text-gray-800">{product}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}

// Supplier Form Modal Component
interface SupplierFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (supplier: any) => void;
  supplier?: Supplier | null;
}

function SupplierFormModal({ isOpen, onClose, onSave, supplier }: SupplierFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    phone: '',
    address: '',
    products: [] as string[],
  });

  const [newProduct, setNewProduct] = useState('');

  React.useEffect(() => {
    if (supplier) {
      setFormData({
        name: supplier.name,
        contact: supplier.contact,
        email: supplier.email,
        phone: supplier.phone,
        address: supplier.address,
        products: supplier.products,
      });
    } else {
      setFormData({
        name: '',
        contact: '',
        email: '',
        phone: '',
        address: '',
        products: [],
      });
    }
  }, [supplier, isOpen]);

  const addProduct = () => {
    if (newProduct.trim()) {
      setFormData({
        ...formData,
        products: [...formData.products, newProduct.trim()],
      });
      setNewProduct('');
    }
  };

  const removeProduct = (index: number) => {
    setFormData({
      ...formData,
      products: formData.products.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={supplier ? 'Edit Supplier' : 'Add New Supplier'}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-gradient-to-r from-blue-600 to-purple-600">
            {supplier ? 'Update' : 'Add'} Supplier
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name *
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
              Contact Person *
            </label>
            <input
              type="text"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            placeholder="Enter supplier's full address..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Products
          </label>
          <div className="space-y-2">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newProduct}
                onChange={(e) => setNewProduct(e.target.value)}
                placeholder="Add a product..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addProduct())}
              />
              <Button type="button" onClick={addProduct} size="sm">
                Add
              </Button>
            </div>
            {formData.products.length > 0 && (
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {formData.products.map((product, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm">{product}</span>
                    <Button
                      type="button"
                      variant="danger"
                      size="sm"
                      onClick={() => removeProduct(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </form>
    </Modal>
  );
}