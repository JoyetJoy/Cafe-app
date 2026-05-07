import React, { useState } from 'react';
import {
  RefreshCw,
  PlusCircle,
  Search,
  MoreVertical,
  Clock,
  ChevronDown,
  LayoutGrid,
  List,
  CalendarDays,
  ClipboardCheck,
  Timer,
  Loader,
  Truck,
  CheckCircle2,
  XCircle,
  MapPin,
  ShoppingBag,
  Bike,
  Info,
  ChevronUp,
  X,
} from 'lucide-react';

/* ─── Order type icon + color ─── */
const orderTypeMeta = {
  'Dine In': { icon: MapPin, bg: 'bg-blue-100', text: 'text-blue-600', iconColor: 'text-blue-500' },
  'Take Away': { icon: ShoppingBag, bg: 'bg-green-100', text: 'text-green-600', iconColor: 'text-green-500' },
  'Delivery': { icon: Bike, bg: 'bg-purple-100', text: 'text-purple-600', iconColor: 'text-purple-500' },
};

/* ─── Status dropdown options ─── */
const statusOptions = ['Pending', 'In Progress', 'Completed', 'Cancelled'];
const statusColors = {
  Pending: 'text-amber-600 bg-amber-50 border-amber-200',
  'In Progress': 'text-blue-600 bg-blue-50 border-blue-200',
  Completed: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  Cancelled: 'text-red-500 bg-red-50 border-red-200',
};

/* ─── Sample orders data ─── */
const sampleOrders = [
  {
    id: '#56998',
    type: 'Dine In',
    table: 'Table No : 3',
    tokenNo: 24,
    time: '06:24 PM',
    status: 'Pending',
    billed: true,
    items: [
      { name: 'Grilled Chicken', qty: 1, veg: false },
      { name: 'Chicken Taco - Medium', qty: 1, veg: false },
      { name: 'Lobster Thermidor', qty: 1, veg: false },
      { name: 'Caesar Salad', qty: 1, veg: true },
      { name: 'Pumpkin Soup', qty: 1, veg: true },
      { name: 'Garlic Bread', qty: 2, veg: true },
      { name: 'Chocolate Mousse', qty: 1, veg: true },
    ],
    notes: 'Extra Spicy',
  },
  {
    id: '#57001',
    type: 'Take Away',
    table: null,
    tokenNo: 25,
    time: '06:55 PM',
    status: 'Pending',
    billed: true,
    items: [
      { name: 'Vegan Burger', qty: 1, veg: true },
      { name: 'Sweet Potato Fries', qty: 1, veg: true },
      { name: 'Chocolate Lava Cake', qty: 1, veg: true },
      { name: 'Caesar Salad', qty: 1, veg: true },
      { name: 'Pumpkin Soup', qty: 1, veg: true },
      { name: 'Iced Tea', qty: 2, veg: true },
    ],
    notes: 'Extra Spicy',
  },
  {
    id: '#57002',
    type: 'Delivery',
    table: null,
    tokenNo: 26,
    time: '07:00 PM',
    status: 'Pending',
    billed: true,
    items: [
      { name: 'Margherita Pizza', qty: 1, veg: true },
      { name: 'Pasta Primavera', qty: 1, veg: true },
      { name: 'Grilled Salmon Steak', qty: 1, veg: false },
      { name: 'Cheese Burst Pizza', qty: 1, veg: true },
      { name: 'Chicken Noodle Soup', qty: 1, veg: false },
      { name: 'Tiramisu', qty: 1, veg: true },
      { name: 'Bruschetta', qty: 2, veg: true },
    ],
    notes: 'Extra Spicy',
  },
  {
    id: '#57003',
    type: 'Dine In',
    table: 'Table No : 7',
    tokenNo: 27,
    time: '07:15 PM',
    status: 'In Progress',
    billed: false,
    items: [
      { name: 'Beef Tacos', qty: 2, veg: false },
      { name: 'Spinach & Corn Pizza', qty: 1, veg: true },
      { name: 'Fresh Greek Salad', qty: 1, veg: true },
    ],
    notes: null,
  },
  {
    id: '#57004',
    type: 'Take Away',
    table: null,
    tokenNo: 28,
    time: '07:30 PM',
    status: 'Completed',
    billed: true,
    items: [
      { name: 'Garlic Butter Shrimp', qty: 1, veg: false },
      { name: 'Lobster Thermidor', qty: 1, veg: false },
      { name: 'Caesar Salad', qty: 1, veg: true },
      { name: 'Lemon Sorbet', qty: 2, veg: true },
    ],
    notes: 'No onions',
  },
  {
    id: '#57005',
    type: 'Delivery',
    table: null,
    tokenNo: 29,
    time: '07:45 PM',
    status: 'In Progress',
    billed: true,
    items: [
      { name: 'Cheese Burst Pizza', qty: 2, veg: true },
      { name: 'Chicken Taco', qty: 1, veg: false },
      { name: 'Pumpkin Soup', qty: 1, veg: true },
      { name: 'Garlic Bread', qty: 1, veg: true },
      { name: 'Brownie Sundae', qty: 1, veg: true },
    ],
    notes: 'Ring doorbell',
  },
  {
    id: '#57006',
    type: 'Dine In',
    table: 'Table No : 1',
    tokenNo: 30,
    time: '08:00 PM',
    status: 'Cancelled',
    billed: false,
    items: [
      { name: 'Grilled Salmon Steak', qty: 1, veg: false },
      { name: 'Fresh Greek Salad', qty: 1, veg: true },
    ],
    notes: null,
  },
  {
    id: '#57007',
    type: 'Take Away',
    table: null,
    tokenNo: 31,
    time: '08:10 PM',
    status: 'Completed',
    billed: true,
    items: [
      { name: 'Vegan Burger', qty: 2, veg: true },
      { name: 'Sweet Potato Fries', qty: 2, veg: true },
      { name: 'Chocolate Lava Cake', qty: 1, veg: true },
    ],
    notes: 'Extra ketchup',
  },
  {
    id: '#57008',
    type: 'Delivery',
    table: null,
    tokenNo: 32,
    time: '08:20 PM',
    status: 'Pending',
    billed: true,
    items: [
      { name: 'Beef Tacos', qty: 3, veg: false },
      { name: 'Spinach & Corn Pizza', qty: 1, veg: true },
      { name: 'Pumpkin Soup', qty: 2, veg: true },
      { name: 'Tiramisu', qty: 1, veg: true },
    ],
    notes: 'Leave at door',
  },
];

/* ─── Stat card data ─── */
const statsMeta = [
  { label: 'Confirmed', value: 98, icon: ClipboardCheck, color: 'text-blue-500', bg: 'bg-blue-50' },
  { label: 'Pending', value: 32, icon: Timer, color: 'text-amber-500', bg: 'bg-amber-50' },
  { label: 'Processing', value: 66, icon: Loader, color: 'text-orange-500', bg: 'bg-orange-50' },
  { label: 'Out For Delivery', value: 45, icon: Truck, color: 'text-pink-500', bg: 'bg-pink-50' },
  { label: 'Delivered', value: 69, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { label: 'Cancelled', value: 18, icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' },
];

/* ─── Order Card Component ─── */
const OrderCard = ({ order, onStatusChange }) => {
  const [expanded, setExpanded] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const meta = orderTypeMeta[order.type] || orderTypeMeta['Dine In'];
  const TypeIcon = meta.icon;
  const visibleItems = expanded ? order.items : order.items.slice(0, 5);
  const hiddenCount = order.items.length - 5;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col">
      {/* Card Header */}
      <div className="px-5 pt-4 pb-3 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${meta.bg} flex items-center justify-center`}>
            <TypeIcon size={18} className={meta.iconColor} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#1a233a] text-[15px]">{order.id}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
              <span className={`font-medium ${meta.text}`}>{order.type}</span>
              {order.table && (
                <>
                  <span className="text-gray-300">|</span>
                  <span>{order.table}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 3-dot menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <MoreVertical size={16} />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-9 bg-white border border-gray-100 rounded-xl shadow-xl z-20 w-40 py-1.5">
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">View Details</button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">Print Bill</button>
              <div className="border-t border-gray-100 my-1" />
              <button className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 cursor-pointer">Cancel Order</button>
            </div>
          )}
        </div>
      </div>

      {/* Token & Time */}
      <div className="px-5 pb-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-[#1a233a]">Token No : {order.tokenNo}</span>
        <span className="text-xs text-gray-500 flex items-center gap-1">
          <Clock size={12} className="text-gray-400" />
          {order.time}
        </span>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Items List */}
      <div className="px-5 py-3 flex-1 flex flex-col gap-1.5">
        {visibleItems.map((item, idx) => (
          <div key={idx}>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className={`flex items-center justify-center w-3.5 h-3.5 rounded-sm border ${item.veg ? 'border-green-500' : 'border-red-500'}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${item.veg ? 'bg-green-500' : 'bg-red-500'}`} />
                </div>
                <span className="text-gray-700">{item.name}</span>
              </div>
              <span className="text-gray-400 text-xs font-medium">x{item.qty}</span>
            </div>
            {/* Show notes after the 2nd item */}
            {idx === 1 && order.notes && (
              <div className="flex items-center gap-1.5 mt-1.5 ml-5.5 text-xs text-gray-500">
                <Info size={11} className="text-gray-400 shrink-0" />
                <span>Notes : {order.notes}</span>
              </div>
            )}
          </div>
        ))}

        {/* Expand / Collapse */}
        {hiddenCount > 0 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs font-semibold text-[#1875f0] mt-1 flex items-center gap-1 hover:underline cursor-pointer self-start"
          >
            {expanded ? (
              <>
                <ChevronUp size={12} /> Show Less
              </>
            ) : (
              <>
                +{hiddenCount} More Items
              </>
            )}
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 px-5 py-3 flex items-center justify-between mt-auto">
        {order.billed ? (
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
            Billed
          </span>
        ) : (
          <span className="text-xs font-semibold text-gray-400 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-md">
            Unbilled
          </span>
        )}

        {/* Status Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowStatusDropdown(!showStatusDropdown)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-md border flex items-center gap-1.5 cursor-pointer transition-colors ${statusColors[order.status]}`}
          >
            {order.status}
            <ChevronDown size={12} />
          </button>
          {showStatusDropdown && (
            <div className="absolute right-0 bottom-9 bg-white border border-gray-100 rounded-xl shadow-xl z-20 w-36 py-1">
              {statusOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    onStatusChange(order.id, s);
                    setShowStatusDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs font-medium hover:bg-gray-50 cursor-pointer ${
                    order.status === s ? 'text-[#1875f0] font-bold' : 'text-gray-700'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Main Orders Page ─── */
const StoreOrders = () => {
  const [orders, setOrders] = useState(sampleOrders);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  // Filter counts
  const filterCounts = {
    all: orders.length,
    Pending: orders.filter((o) => o.status === 'Pending').length,
    'In Progress': orders.filter((o) => o.status === 'In Progress').length,
    Completed: orders.filter((o) => o.status === 'Completed').length,
    Cancelled: orders.filter((o) => o.status === 'Cancelled').length,
  };

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    const matchesFilter = activeFilter === 'all' || o.status === activeFilter;
    const matchesSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.items.some((i) => i.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const filters = [
    { key: 'all', label: 'All Orders' },
    { key: 'Pending', label: 'Pending' },
    { key: 'In Progress', label: 'In Progress' },
    { key: 'Completed', label: 'Completed' },
    { key: 'Cancelled', label: 'Cancelled' },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fc] font-sans text-gray-800">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-[26px] font-bold text-[#1a233a] tracking-tight">Orders</h1>
          <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-white hover:shadow-sm transition-all bg-white cursor-pointer">
            <RefreshCw size={16} />
          </button>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Date Range */}
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 font-medium hover:shadow-sm transition-all cursor-pointer">
            <CalendarDays size={15} className="text-gray-400" />
            2 May 26 - 2 May 26
          </button>

          {/* Add New */}
          <button className="flex items-center gap-2 bg-[#1875f0] hover:bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-lg shadow-[0_4px_14px_rgba(24,117,240,0.25)] transition-all cursor-pointer active:scale-[0.97]">
            <PlusCircle size={18} />
            Add New
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {statsMeta.map((stat) => {
          const StatIcon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
                <div className="text-2xl font-bold text-[#1a233a] mt-0.5">{stat.value}</div>
              </div>
              <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center ${stat.color}`}>
                <StatIcon size={20} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
        <div className="flex bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden flex-wrap">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-4 py-2 text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === f.key
                  ? 'bg-[#1875f0] text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {f.label} ({filterCounts[f.key]})
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2.5 transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-[#1875f0] text-white' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2.5 transition-colors cursor-pointer ${
                viewMode === 'list' ? 'bg-[#1875f0] text-white' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <List size={16} />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4 pr-10 py-2.5 rounded-lg border border-gray-200 outline-none w-48 text-sm focus:border-blue-400 bg-white transition-colors"
            />
            <Search size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Orders Grid */}
      <div
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'
            : 'flex flex-col gap-4'
        }
      >
        {filteredOrders.map((order) => (
          <OrderCard key={order.id} order={order} onStatusChange={handleStatusChange} />
        ))}

        {filteredOrders.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400">
            <ClipboardCheck size={48} strokeWidth={1.2} className="mb-3 opacity-40" />
            <p className="text-lg font-medium">No orders found</p>
            <p className="text-sm mt-1">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreOrders;
