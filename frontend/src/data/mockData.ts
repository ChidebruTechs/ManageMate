import { User, Product, Customer, Sale, Repair, Supplier } from '../types';

export const mockData = {
  users: [
    {
      id: '1',
      name: 'John Admin',
      email: 'admin@managemate.com',
      role: 'admin' as const,
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'Sarah Employee',
      email: 'sarah@managemate.com',
      role: 'employee' as const,
    }
  ] as User[],

  products: [
    {
      id: '1',
      name: 'iPhone 14 Screen',
      description: 'Original replacement screen for iPhone 14',
      category: 'Phone Parts',
      price: 299.99,
      cost: 180.00,
      stock: 15,
      minStock: 5,
      sku: 'IP14-SCR-001',
      supplier: 'TechParts Inc',
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'Samsung Galaxy S23 Battery',
      description: 'High-capacity replacement battery',
      category: 'Phone Parts',
      price: 89.99,
      cost: 45.00,
      stock: 3,
      minStock: 10,
      sku: 'SGS23-BAT-001',
      supplier: 'Mobile Parts Co',
      createdAt: new Date('2024-01-20')
    },
    {
      id: '3',
      name: 'MacBook Pro Keyboard',
      description: 'Replacement keyboard for MacBook Pro 13"',
      category: 'Laptop Parts',
      price: 199.99,
      cost: 120.00,
      stock: 8,
      minStock: 3,
      sku: 'MBP13-KB-001',
      supplier: 'Apple Parts Direct',
      createdAt: new Date('2024-02-01')
    }
  ] as Product[],

  customers: [
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@email.com',
      phone: '+1 555-0123',
      address: '123 Main St, City, State 12345',
      createdAt: new Date('2024-01-10'),
      totalSpent: 1299.97,
      repairHistory: []
    },
    {
      id: '2',
      name: 'Bob Smith',
      email: 'bob@email.com',
      phone: '+1 555-0456',
      address: '456 Oak Ave, City, State 12345',
      createdAt: new Date('2024-01-15'),
      totalSpent: 450.50,
      repairHistory: []
    }
  ] as Customer[],

  sales: [
    {
      id: '1',
      customerId: '1',
      customerName: 'Alice Johnson',
      items: [
        {
          productId: '1',
          productName: 'iPhone 14 Screen',
          quantity: 1,
          price: 299.99,
          total: 299.99
        }
      ],
      total: 299.99,
      paymentStatus: 'paid' as const,
      paymentMethod: 'card' as const,
      date: new Date('2024-02-15'),
      invoiceNumber: 'INV-2024-001'
    },
    {
      id: '2',
      customerId: '2',
      customerName: 'Bob Smith',
      items: [
        {
          productId: '2',
          productName: 'Samsung Galaxy S23 Battery',
          quantity: 1,
          price: 89.99,
          total: 89.99
        }
      ],
      total: 89.99,
      paymentStatus: 'pending' as const,
      paymentMethod: 'cash' as const,
      date: new Date('2024-02-16'),
      invoiceNumber: 'INV-2024-002'
    }
  ] as Sale[],

  repairs: [
    {
      id: '1',
      customerId: '1',
      customerName: 'Alice Johnson',
      device: 'iPhone 14 Pro',
      issue: 'Cracked screen replacement',
      status: 'completed' as const,
      technicianId: '2',
      technicianName: 'Sarah Employee',
      estimatedCost: 299.99,
      actualCost: 299.99,
      createdAt: new Date('2024-02-10'),
      updatedAt: new Date('2024-02-15'),
      completedAt: new Date('2024-02-15'),
      notes: ['Customer dropped phone', 'Screen completely shattered', 'Replaced with OEM part']
    },
    {
      id: '2',
      customerId: '2',
      customerName: 'Bob Smith',
      device: 'Samsung Galaxy S23',
      issue: 'Battery drains quickly',
      status: 'in-progress' as const,
      technicianId: '2',
      technicianName: 'Sarah Employee',
      estimatedCost: 89.99,
      createdAt: new Date('2024-02-16'),
      updatedAt: new Date('2024-02-16'),
      notes: ['Battery test shows degradation', 'Ordered replacement battery']
    }
  ] as Repair[],

  suppliers: [
    {
      id: '1',
      name: 'TechParts Inc',
      contact: 'Mike Johnson',
      email: 'mike@techparts.com',
      phone: '+1 555-1000',
      address: '789 Industrial Blvd, Tech City, TC 54321',
      products: ['iPhone 14 Screen', 'iPhone 13 Screen']
    },
    {
      id: '2',
      name: 'Mobile Parts Co',
      contact: 'Lisa Chen',
      email: 'lisa@mobileparts.com',
      phone: '+1 555-2000',
      address: '321 Supply Chain Dr, Parts Town, PT 98765',
      products: ['Samsung Galaxy S23 Battery', 'Samsung Galaxy S22 Battery']
    }
  ] as Supplier[]
};