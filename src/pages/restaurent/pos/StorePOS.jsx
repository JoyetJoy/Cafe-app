import React, { useState, useEffect } from 'react';
import {
  LayoutGrid,
  Monitor,
  ReceiptText,
  ChefHat,
  CalendarCheck,
  Armchair,
  TrendingUp,
  Moon,
  Bell,
  Settings,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  MapPin,
  Search,
  RefreshCw,
  SlidersHorizontal,
  Minus,
  Plus,
  X,
  ChevronDown,
  Pencil,
  ShoppingBag,
  Flame,
  Star,
  Heart,
  Info,
  Utensils,
  Timer
} from 'lucide-react';

const StorePOS = () => {
  const [activeTab, setActiveTab] = useState('pos');
  const [activeOrderFilter, setActiveOrderFilter] = useState('all');
  const [cart, setCart] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalQuantity, setModalQuantity] = useState(1);
  const [isModalClosing, setIsModalClosing] = useState(false);

  // Menu items data
  const menuItems = [
    { id: 1, name: 'Grilled Salmon Steak', category: 'Sea Food', price: 80, oldPrice: null, label: 'Trending', type: 'Non Veg', image: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?q=80&w=400&auto=format&fit=crop', rating: 4.8, reviews: 124, calories: 420, prepTime: '25 min', description: 'Fresh Atlantic salmon grilled to perfection with a smoky char, served with seasonal vegetables and lemon butter sauce.' },
    { id: 2, name: 'Cheese Burst Pizza', category: 'Pizza', price: 66, oldPrice: null, label: 'Must Try', type: 'Veg', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=400&auto=format&fit=crop', rating: 4.6, reviews: 89, calories: 580, prepTime: '20 min', description: 'Loaded with extra mozzarella cheese that bursts with every bite, topped with fresh herbs and our signature tomato sauce.' },
    { id: 3, name: 'Garlic Butter Shrimp', category: 'Sea Food', price: 25, oldPrice: null, label: '', type: 'Non Veg', image: 'https://images.unsplash.com/photo-1625937712144-0c68a4d711a3?q=80&w=400&auto=format&fit=crop', rating: 4.5, reviews: 67, calories: 310, prepTime: '15 min', description: 'Succulent shrimp sautéed in rich garlic butter with a hint of chili flakes and fresh parsley.' },
    { id: 4, name: 'Chicken Taco', category: 'Tacos', price: 33, oldPrice: 38, label: '', type: 'Non Veg', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=400&auto=format&fit=crop', rating: 4.3, reviews: 112, calories: 350, prepTime: '12 min', description: 'Crispy corn tortilla filled with seasoned grilled chicken, fresh salsa, guacamole, and sour cream.' },
    { id: 5, name: 'Lobster Thermidor', category: 'Sea Food', price: 120, oldPrice: null, label: '', type: 'Non Veg', image: 'https://images.unsplash.com/photo-1559742811-822873691fc8?q=80&w=400&auto=format&fit=crop', rating: 4.9, reviews: 45, calories: 480, prepTime: '35 min', description: 'Classic French-style lobster baked in a creamy mustard and brandy sauce, topped with gruyère cheese.' },
    { id: 6, name: 'Spinach & Corn Pizza', category: 'Pizza', price: 45, oldPrice: null, label: '', type: 'Veg', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=400&auto=format&fit=crop', rating: 4.4, reviews: 73, calories: 520, prepTime: '18 min', description: 'A wholesome pizza topped with baby spinach, sweet corn kernels, mozzarella, and a drizzle of garlic oil.' },
    { id: 7, name: 'Fresh Greek Salad', category: 'Salads', price: 18, oldPrice: 22, label: 'Must Try', type: 'Veg', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&auto=format&fit=crop', rating: 4.7, reviews: 98, calories: 180, prepTime: '8 min', description: 'A refreshing mix of crisp romaine, cherry tomatoes, cucumber, Kalamata olives, and crumbled feta cheese.' },
    { id: 8, name: 'Beef Tacos', category: 'Tacos', price: 35, oldPrice: null, label: 'Trending', type: 'Non Veg', image: 'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?q=80&w=400&auto=format&fit=crop', rating: 4.6, reviews: 156, calories: 390, prepTime: '15 min', description: 'Juicy seasoned ground beef in warm flour tortillas with cheddar cheese, lettuce, and house-made pico de gallo.' },
  ];

  const recentOrders = [
    { id: '#14589', name: 'James Smith', time: '11:30 AM', status: 'Delivery', progress: 80, timeRem: '12 Mins', type: 'positive' },
    { id: '#56998', name: 'Maria Gonzalez', time: '11:45 AM', status: 'Take Away', progress: 30, timeRem: '-8 Mins', type: 'negative' },
    { id: '#65698', name: 'Liam O\'Connor', time: '11:10 AM', table: 'Table 1', status: 'Dine In', progress: 60, timeRem: '45 Mins', type: 'positive' },
  ];

  const handleAddToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((cartItem) => cartItem.id === item.id);
      if (existing) {
        return prev.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1, note: '' }];
    });
  };

  const handleQuantityChange = (id, delta) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: Math.max(1, item.quantity + delta) };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const openItemModal = (item) => {
    setSelectedItem(item);
    setModalQuantity(1);
    setIsModalClosing(false);
  };

  const closeItemModal = () => {
    setIsModalClosing(true);
    setTimeout(() => {
      setSelectedItem(null);
      setIsModalClosing(false);
    }, 250);
  };

  const handleAddFromModal = () => {
    if (!selectedItem) return;
    setCart((prev) => {
      const existing = prev.find((cartItem) => cartItem.id === selectedItem.id);
      if (existing) {
        return prev.map((cartItem) =>
          cartItem.id === selectedItem.id
            ? { ...cartItem, quantity: cartItem.quantity + modalQuantity }
            : cartItem
        );
      }
      return [...prev, { ...selectedItem, quantity: modalQuantity, note: '' }];
    });
    closeItemModal();
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedItem) closeItemModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem]);


  return (
    <div className="flex flex-col h-screen bg-[#f8f9fc] font-sans text-gray-800 overflow-hidden w-full">
      {/* Top Navigation */}
      <header className="h-[72px] bg-white w-full border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-10">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex bg-[#ff9800] p-1.5 rounded-lg text-white">
              <ShoppingBag size={24} className="fill-current text-white" />
            </div>
            <div>
              <div className="text-[#0ea5e9] text-[10px] font-bold tracking-widest leading-none ml-6 uppercase">POS</div>
              <div className="text-2xl font-bold leading-none tracking-tight text-gray-900 flex">
                d<span className="opacity-90">r</span>eams
              </div>
            </div>
          </div>

          <div className="text-gray-400 hover:text-gray-600 cursor-pointer ml-4">
            <LayoutGrid size={24} />
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-6 ml-8">
            <button
              onClick={() => setActiveTab('pos')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'pos' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <Monitor size={20} /> POS
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'orders' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <ReceiptText size={20} /> Orders
            </button>
            <button
              onClick={() => setActiveTab('kitchen')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'kitchen' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <ChefHat size={20} /> Kitchen
            </button>
            <button
              onClick={() => setActiveTab('reservation')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'reservation' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <CalendarCheck size={20} /> Reservation
            </button>
            <button
              onClick={() => setActiveTab('table')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'table' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <Armchair size={20} /> Table
            </button>
          </nav>
        </div>

        {/* Top Right Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors border border-gray-200"><TrendingUp size={20} /></button>
          <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors border border-gray-200"><Moon size={20} /></button>
          <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors border border-gray-200"><Bell size={20} /></button>
          <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors border border-gray-200"><Settings size={20} /></button>
          <img src="https://i.pravatar.cc/150?img=11" alt="User" className="w-10 h-10 rounded-full object-cover ml-2 border border-blue-500" />
        </div>
      </header>

      {/* Main Layout Area */}
      <div className="flex flex-1 overflow-hidden w-full">
        {/* Left Section (pos layout) */}
        <div className="flex-1 flex flex-col p-6 overflow-y-auto">

          {/* Recent Orders Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h2 className="text-[22px] font-bold text-[#1a233a] mr-2">Recent Orders</h2>
              <div className="flex bg-white rounded flex-wrap gap-2">
                <button onClick={() => setActiveOrderFilter('all')} className={`px-4 py-2 rounded-md font-medium text-sm transition-all shadow-sm border border-transparent cursor-pointer hover:shadow ${activeOrderFilter === 'all' ? 'bg-[#1875f0] text-white' : 'bg-white text-gray-600 border-gray-200'}`}>All Orders</button>
                <button onClick={() => setActiveOrderFilter('dineIn')} className={`px-4 py-2 rounded-md font-medium text-sm transition-all shadow-sm border border-transparent cursor-pointer hover:shadow ${activeOrderFilter === 'dineIn' ? 'bg-[#1875f0] text-white' : 'bg-white text-gray-600 border-gray-200'}`}>Dine In</button>
                <button onClick={() => setActiveOrderFilter('takeaway')} className={`px-4 py-2 rounded-md font-medium text-sm transition-all shadow-sm border border-transparent cursor-pointer hover:shadow ${activeOrderFilter === 'takeaway' ? 'bg-[#1875f0] text-white' : 'bg-white text-gray-600 border-gray-200'}`}>Take Away</button>
                <button onClick={() => setActiveOrderFilter('delivery')} className={`px-4 py-2 rounded-md font-medium text-sm transition-all shadow-sm border border-transparent cursor-pointer hover:shadow ${activeOrderFilter === 'delivery' ? 'bg-[#1875f0] text-white' : 'bg-white text-gray-600 border-gray-200'}`}>Delivery</button>
                <button onClick={() => setActiveOrderFilter('table')} className={`px-4 py-2 rounded-md font-medium text-sm transition-all shadow-sm border border-transparent cursor-pointer hover:shadow ${activeOrderFilter === 'table' ? 'bg-[#1875f0] text-white' : 'bg-white text-gray-600 border-gray-200'}`}>Table</button>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-white bg-transparent"><ArrowLeft size={18} /></button>
              <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-800 hover:bg-white bg-white shadow-sm"><ArrowRight size={18} /></button>
            </div>
          </div>

          {/* Recent Orders List */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {recentOrders.map((order, index) => (
              <div key={index} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-gray-400 text-sm font-medium">{order.id}</div>
                    <div className="font-bold text-[#1a233a] mt-1">{order.name}</div>
                    <div className="text-gray-500 text-sm mt-1 flex items-center gap-2">
                      {order.time} {order.table && <span className="text-gray-400">|</span>} {order.table}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 text-gray-700 text-xs font-semibold rounded-full border border-gray-100">
                      {order.status === 'Delivery' && <CheckCircle2 size={14} className="text-gray-500" />}
                      {order.status === 'Take Away' && <CheckCircle2 size={14} className="text-gray-500" />}
                      {order.status === 'Dine In' && <MapPin size={14} className="text-gray-500 fill-gray-500" />}
                      {order.status}
                    </span>
                    <span className={`mt-3 px-3 py-1 text-xs font-bold rounded-full text-white flex items-center gap-1 ${order.type === 'positive' ? 'bg-[#10b981]' : 'bg-[#ef4444]'}`}>
                      <Clock size={12} strokeWidth={3} /> {order.timeRem}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2 mt-4 relative">
                    <div className={`h-1.5 rounded-full ${order.type === 'positive' ? 'bg-[#10b981]' : 'bg-[#ef4444]'}`} style={{ width: `${order.progress}%` }}></div>
                  </div>
                  <div className="flex justify-end text-xs text-gray-400 font-medium">
                    <Clock size={14} className="inline mr-1" /> 20:00
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Menu Categories Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-6">
              <h2 className="text-[22px] font-bold text-[#1a233a]">Menu Categories</h2>
              <div className="flex items-center gap-4 text-sm font-medium text-gray-600">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className="w-4 h-4 rounded-sm border-2 border-gray-300 flex items-center justify-center bg-[#1875f0] border-[#1875f0]">
                    <CheckCircle2 size={12} strokeWidth={3} className="text-white" />
                  </div>
                  <div className="flex items-center justify-center w-4 h-4 rounded border-2 border-green-500"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div></div>
                  Veg
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className="w-4 h-4 rounded-sm border-2 border-gray-300"></div>
                  <div className="flex items-center justify-center w-4 h-4 rounded border-2 border-red-500"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div></div>
                  Non Veg
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className="w-4 h-4 rounded-sm border-2 border-gray-300"></div>
                  <div className="flex items-center justify-center w-4 h-4 rounded border-2 border-yellow-500"><div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div></div>
                  Egg
                </label>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-4 pr-10 py-2 rounded-full border border-gray-200 outline-none w-64 text-sm focus:border-blue-400"
                />
                <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 bg-white hover:bg-gray-50"><RefreshCw size={18} /></button>
              <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 bg-white hover:bg-gray-50"><SlidersHorizontal size={18} /></button>
              <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-white bg-transparent"><ArrowLeft size={18} /></button>
              <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-800 hover:bg-white bg-white shadow-sm"><ArrowRight size={18} /></button>
            </div>
          </div>

          {/* Menu Categories List */}
          <div className="flex gap-4 mb-6 overflow-x-auto pb-2 scrollbar-none min-h-18">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-blue-200 bg-[#f0f7ff] shadow-[0_4px_10px_rgba(24,117,240,0.1)] min-w-max cursor-pointer">
              <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=100&auto=format&fit=crop" className="w-12 h-12 rounded-full object-cover shadow-sm" alt="All Menus" />
              <div>
                <div className="font-bold text-[#1a233a] text-sm">All Menus</div>
                <div className="text-gray-500 text-xs mt-0.5">200 Menus</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow min-w-max cursor-pointer transition-shadow">
              <img src="https://images.unsplash.com/photo-1485921325833-c519f76c4927?q=80&w=100&auto=format&fit=crop" className="w-12 h-12 rounded-full object-cover opacity-90 p-0.5" alt="Sea Food" />
              <div>
                <div className="font-bold text-[#1a233a] text-sm">Sea Food</div>
                <div className="text-gray-500 text-xs mt-0.5">200 Menus</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow min-w-max cursor-pointer transition-shadow">
              <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=100&auto=format&fit=crop" className="w-12 h-12 rounded-full object-cover opacity-90 p-0.5" alt="Pizza" />
              <div>
                <div className="font-bold text-[#1a233a] text-sm">Pizza</div>
                <div className="text-gray-500 text-xs mt-0.5">180 Menus</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow min-w-max cursor-pointer transition-shadow">
              <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=100&auto=format&fit=crop" className="w-12 h-12 rounded-full object-cover opacity-90 p-0.5 border" alt="Salads" />
              <div>
                <div className="font-bold text-[#1a233a] text-sm">Salads</div>
                <div className="text-gray-500 text-xs mt-0.5">180 Menus</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow min-w-max cursor-pointer transition-shadow">
              <img src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=100&auto=format&fit=crop" className="w-12 h-12 rounded-full object-cover opacity-90 p-0.5 border" alt="Tacos" />
              <div>
                <div className="font-bold text-[#1a233a] text-sm">Tacos</div>
                <div className="text-gray-500 text-xs mt-0.5">150 Menus</div>
              </div>
            </div>
          </div>

          {/* Menus Grid */}
          <div className={`grid ${cart?.length > 0 ? 'grid-cols-4' : 'grid-cols-5'} gap-6 pb-20`}>
            {menuItems.map((item) => (
              <div key={item.id} onClick={() => openItemModal(item)} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col group cursor-pointer">
                <div className="relative h-32 w-full bg-gray-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  {item.label && (
                    <div className={`absolute top-3 left-3 px-2 py-1 flex items-center gap-1 rounded text-xs font-bold text-white shadow-sm
                      ${item.label === 'Trending' ? 'bg-[#ff3b30]' : 'bg-[#1875f0]'}`}>
                      {item.label === 'Trending' ? <Flame size={12} className="mr-0.5 fill-current" /> : <TrendingUp size={12} strokeWidth={3} className="mr-0.5" />}
                      {item.label}
                    </div>
                  )}
                </div>
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <div className="flex justify-between items-center text-xs text-gray-500 font-medium">
                    {item.category}
                    <div className="flex items-center gap-1 relative">
                      <div className={`flex items-center justify-center w-3.5 h-3.5 rounded-sm border-2 ${item.type === 'Veg' ? 'border-green-500' : 'border-red-500'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${item.type === 'Veg' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      </div>
                      <span className="text-gray-600 font-medium">{item.type}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-[#1a233a] leading-tight block truncate" title={item.name}>{item.name}</h3>
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <div className="flex items-center gap-1.5 font-bold text-[#1a233a]">
                      {item.oldPrice && <span className="text-gray-400 line-through text-sm font-medium pr-1">${item.oldPrice}</span>}
                      <span>${item.price}</span>
                    </div>
                    <div className="flex items-center border border-gray-200 rounded-full px-1 py-1">
                      <button className="w-6 h-6 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer" onClick={(e) => { e.stopPropagation(); handleAddToCart(item); }}><Plus size={12} /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right Section (Cart/Sidebar) */}
        {cart.length > 0 && (
          <div className="w-[500px] overflow-y-auto bg-white border-l border-gray-200 flex flex-col shrink-0 right-sidebar-scroll shadow-[-4px_0_15px_rgba(0,0,0,0.02)]">
            <div className="p-6 pb-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[20px] font-bold text-[#1a233a]">New Order</h2>
                <span className="text-gray-500 text-sm font-medium">Auto-generated</span>
              </div>

              <div className="grid grid-cols-4 gap-2 mb-6 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
                <button className="flex flex-col items-center justify-center gap-1.5 bg-[#1875f0] text-white py-2.5 px-2 rounded-lg shadow-sm cursor-pointer">
                  <MapPin size={18} className="fill-current" />
                  <span className="text-xs font-bold leading-none">Dine In</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-1.5 text-gray-600 hover:bg-white py-2.5 px-2 rounded-lg font-medium transition-colors cursor-pointer">
                  <ShoppingBag size={18} />
                  <span className="text-xs leading-none">Take Away</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-1.5 text-gray-600 hover:bg-white py-2.5 px-2 rounded-lg font-medium transition-colors cursor-pointer">
                  <CheckCircle2 size={18} />
                  <span className="text-xs leading-none">Delivery</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-1.5 text-gray-600 hover:bg-white py-2.5 px-2 rounded-lg font-medium transition-colors cursor-pointer">
                  <Armchair size={18} />
                  <span className="text-xs leading-none">Table</span>
                </button>
              </div>

              <div className="flex gap-4 mb-4">
                <div className="relative flex-1">
                  <select className="w-full appearance-none border border-gray-200 rounded-lg pl-4 pr-10 py-3 text-sm text-gray-700 outline-none focus:border-blue-400 bg-white cursor-pointer">
                    <option>Waiter</option>
                    <option>Waiter 1</option>
                    <option>Waiter 2</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
                <div className="relative flex-[1.5]">
                  <input type="text" placeholder="Select Customer" className="w-full border border-gray-200 rounded-lg pl-4 pr-16 py-3 text-sm text-gray-700 outline-none focus:border-blue-400" />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <button className="w-7 h-7 rounded bg-[#1875f0] text-white flex items-center justify-center hover:bg-blue-600 cursor-pointer"><Plus size={16} strokeWidth={3} /></button>
                    <button className="w-7 h-7 rounded bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 cursor-pointer"><Pencil size={14} /></button>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 flex justify-between items-center py-2 bg-white sticky top-0 border-b border-gray-100 z-10">
              <h3 className="font-bold text-[#1a233a] text-[18px]">Ordered Menus</h3>
              <span className="text-gray-500 text-sm font-medium">Total Menus: <span className="text-gray-800 font-bold ml-1 bg-gray-50 border px-1.5 py-0.5 rounded-full">{cart.reduce((sum, i) => sum + i.quantity, 0)}</span></span>
            </div>

            <div className=" p-6 flex flex-col gap-4 bg-[#fafbfc]">
              {cart.map((item, idx) => (
                <div key={item.id} className="border hover:border-blue-400 border-gray-100 rounded-xl p-3 bg-white shadow-sm relative overflow-hidden transition-all group">
                  {idx === 0 && <div className="absolute top-0 left-0 w-1 h-full bg-[#1875f0]"></div>}
                  <div className="flex gap-3 pl-1">
                    <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover" />
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="font-bold text-[#1a233a] text-sm">{item.name}</div>
                      <div className="text-[11px] font-medium text-gray-500 mt-0.5 bg-gray-50 inline-block px-1.5 py-0.5 rounded border border-gray-100 self-start">{item.category}</div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center border border-gray-200 rounded-full px-1 py-0.5 mt-1">
                        <button onClick={() => handleQuantityChange(item.id, -1)} className="w-6 h-6 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 cursor-pointer"><Minus size={12} strokeWidth={3} /></button>
                        <span className="w-5 text-center text-sm font-bold text-gray-800">{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(item.id, 1)} className="w-6 h-6 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 cursor-pointer"><Plus size={12} strokeWidth={3} /></button>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-between ml-1 pt-0.5">
                      {idx === 0 ? (
                        <button className="text-[11px] font-semibold text-gray-600 border border-gray-200 rounded px-2 hover:bg-gray-50 py-1 flex-1 mb-1 shadow-sm w-max whitespace-nowrap cursor-pointer">Add Note</button>
                      ) : (
                        <button className="text-[11px] font-semibold text-gray-600 border border-gray-200 rounded px-2 hover:bg-gray-50 py-1 shadow-sm whitespace-nowrap hidden group-hover:block cursor-pointer">Add Note</button>
                      )}
                      <button onClick={() => handleRemoveItem(item.id)} className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center border border-gray-200 text-gray-400 hover:text-red-500 transition-colors self-end cursor-pointer"><X size={12} strokeWidth={3} /></button>
                    </div>
                  </div>
                  {idx === 0 && (
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100 pl-1">
                      <div className="flex flex-col">
                        <span className="text-[11px] text-gray-500 font-medium">Item Rate</span>
                        <span className="font-semibold text-gray-400 mt-0.5 text-sm">${item.price}</span>
                      </div>
                      <div className="flex flex-col items-center -ml-4">
                        <span className="text-[11px] text-gray-500 font-medium">Amount</span>
                        <span className="font-semibold text-gray-400 mt-0.5 text-sm">${item.price * item.quantity}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[11px] text-gray-500 font-medium tracking-wide">Total</span>
                        <span className="font-bold text-[#1a233a] text-lg leading-none mt-0.5">${item.price * item.quantity}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Total Footer */}
            <div className=" border-t border-gray-100 bg-white shrink-0 shadow-[0_-4px_10px_rgba(0,0,0,0.02)] z-10">
              <div className="flex flex-col justify-between p-6">
                <h2 className="text-[17px] font-bold text-[#1a233a] mb-4">Payment Summary</h2>
                <div className='flex justify-between'><span className="text-gray-700 text-sm">Sub Total</span>
                  <span className=" text-black text-sm font-medium">${cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}</span></div>
                <div className='flex justify-between'><span className="text-gray-700 text-sm">Tax (18%)</span>
                  <span className=" text-black text-sm font-medium">${(cart.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.18).toFixed(2)}</span></div>

              </div>
              <hr className="border-gray-300 " />
              <div className="flex justify-between p-4">
                <h2 className="text-[20px] font-bold text-[#1a233a]">Amount to be paid</h2>
                <span className=" text-black text-xl font-bold">${cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}</span>

              </div>
              <hr className="border-gray-300 " />

              <div className="p-4">
                <button className="w-full h-12 bg-[#1875f0] hover:bg-blue-600 text-white text-sm font-semibold py-3.5 rounded-lg shadow-[0_4px_14px_rgba(24,117,240,0.3)] transition-all flex justify-center items-center cursor-pointer">
                  Place an Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-250 ${isModalClosing ? 'opacity-0' : 'opacity-100'}`}
          onClick={closeItemModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Modal Content */}
          <div
            className={`relative bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-[520px] flex flex-col transition-all duration-250 ${isModalClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: '90vh' }}
          >
            {/* Close Button */}
            <button
              onClick={closeItemModal}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-white transition-all cursor-pointer border border-gray-100"
            >
              <X size={18} strokeWidth={2.5} />
            </button>

            {/* Favorite Button */}
            <button
              className="absolute top-4 left-4 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-gray-400 hover:text-red-500 transition-all cursor-pointer border border-gray-100"
            >
              <Heart size={18} />
            </button>

            {/* Item Image */}
            <div className="relative h-[240px] w-full overflow-hidden">
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              {/* Label Badge */}
              {selectedItem.label && (
                <div className={`absolute bottom-4 left-4 px-3 py-1.5 flex items-center gap-1.5 rounded-lg text-xs font-bold text-white shadow-lg
                  ${selectedItem.label === 'Trending' ? 'bg-[#ff3b30]' : 'bg-[#1875f0]'}`}>
                  {selectedItem.label === 'Trending' ? <Flame size={14} className="fill-current" /> : <TrendingUp size={14} strokeWidth={3} />}
                  {selectedItem.label}
                </div>
              )}
            </div>

            {/* Item Details */}
            <div className="p-6 overflow-y-auto flex-1">
              {/* Category & Type */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-[#1875f0] bg-blue-50 px-3 py-1 rounded-full">{selectedItem.category}</span>
                <div className="flex items-center gap-1.5">
                  <div className={`flex items-center justify-center w-4 h-4 rounded-sm border-2 ${selectedItem.type === 'Veg' ? 'border-green-500' : 'border-red-500'}`}>
                    <div className={`w-2 h-2 rounded-full ${selectedItem.type === 'Veg' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  </div>
                  <span className={`text-sm font-semibold ${selectedItem.type === 'Veg' ? 'text-green-600' : 'text-red-600'}`}>{selectedItem.type}</span>
                </div>
              </div>

              {/* Name */}
              <h2 className="text-2xl font-bold text-[#1a233a] mb-2 leading-tight">{selectedItem.name}</h2>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-amber-400 fill-amber-400" />
                  <span className="text-sm font-bold text-[#1a233a]">{selectedItem.rating}</span>
                </div>
                <span className="text-sm text-gray-400">({selectedItem.reviews} reviews)</span>
              </div>

              {/* Info Pills */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 px-3 py-2 rounded-xl">
                  <Flame size={15} className="text-orange-500" />
                  <span className="text-xs font-semibold text-gray-700">{selectedItem.calories} cal</span>
                </div>
                <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 px-3 py-2 rounded-xl">
                  <Timer size={15} className="text-blue-500" />
                  <span className="text-xs font-semibold text-gray-700">{selectedItem.prepTime}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 px-3 py-2 rounded-xl">
                  <Utensils size={15} className="text-purple-500" />
                  <span className="text-xs font-semibold text-gray-700">Serves 1</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-[#1a233a] mb-1.5 flex items-center gap-1.5">
                  <Info size={14} className="text-gray-400" />
                  Description
                </h4>
                <p className="text-sm text-gray-500 leading-relaxed">{selectedItem.description}</p>
              </div>

              {/* Special Instructions */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-[#1a233a] mb-1.5">Special Instructions</h4>
                <textarea
                  placeholder="Add any special requests (e.g., no onions, extra sauce)..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 outline-none resize-none focus:border-blue-400 transition-colors bg-gray-50/50"
                  rows={2}
                />
              </div>
            </div>

            {/* Footer - Price & Add to Cart */}
            <div className="px-6 py-5 border-t border-gray-100 bg-gradient-to-t from-gray-50/80 to-white flex items-center justify-between gap-4 shrink-0">
              {/* Price */}
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 font-medium">Price</span>
                <div className="flex items-center gap-2">
                  {selectedItem.oldPrice && (
                    <span className="text-gray-400 line-through text-sm font-medium">${selectedItem.oldPrice}</span>
                  )}
                  <span className="text-2xl font-bold text-[#1a233a]">${selectedItem.price}</span>
                </div>
              </div>

              {/* Quantity + Add to Cart */}
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-200 rounded-xl bg-white shadow-sm">
                  <button
                    onClick={() => setModalQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-50 rounded-l-xl transition-colors cursor-pointer"
                  >
                    <Minus size={16} strokeWidth={2.5} />
                  </button>
                  <span className="w-10 text-center text-base font-bold text-[#1a233a] select-none">{modalQuantity}</span>
                  <button
                    onClick={() => setModalQuantity((q) => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-50 rounded-r-xl transition-colors cursor-pointer"
                  >
                    <Plus size={16} strokeWidth={2.5} />
                  </button>
                </div>

                <button
                  onClick={handleAddFromModal}
                  className="bg-[#1875f0] hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-xl shadow-[0_4px_14px_rgba(24,117,240,0.3)] transition-all flex items-center gap-2 cursor-pointer active:scale-[0.97]"
                >
                  <ShoppingBag size={18} />
                  Add — ${selectedItem.price * modalQuantity}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StorePOS;
