export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'employee' | 'customer';
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  sku: string;
  supplier: string;
  createdAt: Date;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: Date;
  totalSpent: number;
  repairHistory: Repair[];
}

export interface Sale {
  id: string;
  customerId: string;
  customerName: string;
  items: SaleItem[];
  total: number;
  paymentStatus: 'paid' | 'pending' | 'overdue';
  paymentMethod: 'cash' | 'card' | 'transfer';
  date: Date;
  invoiceNumber: string;
}

export interface SaleItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Repair {
  id: string;
  customerId: string;
  customerName: string;
  device: string;
  issue: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  technicianId?: string;
  technicianName?: string;
  estimatedCost: number;
  actualCost?: number;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  notes: string[];
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  products: string[];
}

export interface DashboardStats {
  totalSales: number;
  totalRevenue: number;
  totalCustomers: number;
  activeRepairs: number;
  lowStockItems: number;
  monthlyGrowth: number;
}