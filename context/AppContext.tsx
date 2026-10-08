import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductCategory, CartItem, Order, OrderStatus, GreetingCardData } from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS } from '../data/initialData';

export type AppView = 
  | 'home' 
  | 'catalog' 
  | 'product-detail' 
  | 'checkout' 
  | 'order-success' 
  | 'order-tracking' 
  | 'about' 
  | 'admin';

export type AdminTab = 'overview' | 'products' | 'orders';

interface AppContextType {
  // Navigation
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  navigateTo: (view: AppView, productId?: string) => void;
  
  // Catalog filter state
  selectedCategory: ProductCategory | 'Semua';
  setSelectedCategory: (cat: ProductCategory | 'Semua') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeProductId: string | null;
  setActiveProductId: (id: string | null) => void;
  
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Cart
  cart: CartItem[];
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity: number, ribbonColor: string, greetingCard: GreetingCardData) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;

  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  deleteOrder: (orderId: string) => void;
  lastCreatedOrder: Order | null;
  setLastCreatedOrder: (order: Order | null) => void;

  // Admin
  adminTab: AdminTab;
  setAdminTab: (tab: AdminTab) => void;

  // Utilities
  resetToDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'bloom_glow_products_v3',
  ORDERS: 'bloom_glow_orders_v3',
  CART: 'bloom_glow_cart_v3',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products state
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI state
  const [activeView, setActiveView] = useState<AppView>('home');
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'Semua'>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [lastCreatedOrder, setLastCreatedOrder] = useState<Order | null>(null);
  const [adminTab, setAdminTab] = useState<AdminTab>('overview');

  // Persistence effects
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.warn('Could not save products to localStorage', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.warn('Could not save orders to localStorage', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not save cart to localStorage', e);
    }
  }, [cart]);

  // Navigate helper
  const navigateTo = (view: AppView, productId?: string) => {
    if (productId) {
      setActiveProductId(productId);
    }
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Product CRUD
  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const id = `prod-${Date.now()}`;
    const product: Product = { ...newProd, id };
    setProducts((prev) => [product, ...prev]);
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Cart operations
  const addToCart = (
    product: Product,
    quantity: number,
    ribbonColor: string,
    greetingCard: GreetingCardData
  ) => {
    const newItem: CartItem = {
      id: `cart-item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      productId: product.id,
      product,
      quantity,
      ribbonColor,
      greetingCard,
    };
    setCart((prev) => [...prev, newItem]);
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === cartItemId) {
          const maxStock = item.product.stock || 99;
          const safeQty = Math.min(quantity, maxStock);
          return { ...item, quantity: safeQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Orders operations
  const createOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Order => {
    const timestamp = new Date();
    const dateFormatted = timestamp.toISOString().slice(0, 10).replace(/-/g, '');
    const randomDigits = Math.floor(100 + Math.random() * 900);
    const orderId = `BG-${dateFormatted}-${randomDigits}`;

    const newOrder: Order = {
      ...orderData,
      id: orderId,
      createdAt: timestamp.toISOString(),
      status: 'Diproses',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastCreatedOrder(newOrder);

    // Deduct stock for products ordered
    setProducts((prevProducts) =>
      prevProducts.map((prod) => {
        const orderedItem = orderData.items.find((item) => item.productId === prod.id);
        if (orderedItem) {
          return {
            ...prod,
            stock: Math.max(0, prod.stock - orderedItem.quantity),
          };
        }
        return prod;
      })
    );

    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((ord) => ord.id !== orderId));
  };

  const resetToDemoData = () => {
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setCart([]);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.CART);
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        navigateTo,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        activeProductId,
        setActiveProductId,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        orders,
        createOrder,
        updateOrderStatus,
        deleteOrder,
        lastCreatedOrder,
        setLastCreatedOrder,
        adminTab,
        setAdminTab,
        resetToDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
