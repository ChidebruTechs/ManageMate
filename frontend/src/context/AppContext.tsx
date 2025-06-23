import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, Product, Customer, Sale, Repair, Supplier } from '../types';
import { mockData } from '../data/mockData';

interface AppState {
  user: User | null;
  products: Product[];
  customers: Customer[];
  sales: Sale[];
  repairs: Repair[];
  suppliers: Supplier[];
}

type AppAction = 
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'DELETE_PRODUCT'; payload: string }
  | { type: 'ADD_CUSTOMER'; payload: Customer }
  | { type: 'UPDATE_CUSTOMER'; payload: Customer }
  | { type: 'ADD_SALE'; payload: Sale }
  | { type: 'ADD_REPAIR'; payload: Repair }
  | { type: 'UPDATE_REPAIR'; payload: Repair }
  | { type: 'ADD_SUPPLIER'; payload: Supplier };

const initialState: AppState = {
  user: mockData.users[0], // Default admin user
  products: mockData.products,
  customers: mockData.customers,
  sales: mockData.sales,
  repairs: mockData.repairs,
  suppliers: mockData.suppliers,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(p => p.id === action.payload.id ? action.payload : p)
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(p => p.id !== action.payload)
      };
    case 'ADD_CUSTOMER':
      return { ...state, customers: [...state.customers, action.payload] };
    case 'UPDATE_CUSTOMER':
      return {
        ...state,
        customers: state.customers.map(c => c.id === action.payload.id ? action.payload : c)
      };
    case 'ADD_SALE':
      return { ...state, sales: [...state.sales, action.payload] };
    case 'ADD_REPAIR':
      return { ...state, repairs: [...state.repairs, action.payload] };
    case 'UPDATE_REPAIR':
      return {
        ...state,
        repairs: state.repairs.map(r => r.id === action.payload.id ? action.payload : r)
      };
    case 'ADD_SUPPLIER':
      return { ...state, suppliers: [...state.suppliers, action.payload] };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}