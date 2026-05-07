import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  RefreshCw,
  PlusCircle,
  MoreVertical,
  X,
  Pencil,
  Trash2,
  Eye,
  Users,
  Layers,
  ChevronDown,
} from 'lucide-react';

/* ─── SVG Table illustrations ─── */
/* Each capacity (2,4,6,8,10,12) renders exactly that many chairs */
const TableIllustration = ({ capacity, status }) => {
  const palette = {
    Available: { table: '#d0e2ff', seat: '#a0c4ff', accent: '#5b9aff' },
    Booked: { table: '#ffe0cc', seat: '#ffb380', accent: '#ff7a33' },
    Occupied: { table: '#e0d4f5', seat: '#c4aee8', accent: '#9b6fd4' },
  };
  const c = palette[status] || palette.Available;
  const cap = parseInt(capacity) || 4;

  /* ── 2 seats: small round table, 1 top + 1 bottom ── */
  if (cap === 2) {
    return (
      <svg viewBox="0 0 160 100" className="w-full h-full" fill="none">
        <rect x="71" y="8" width="18" height="8" rx="4" fill={c.seat} />
        <rect x="52" y="24" width="56" height="52" rx="14" fill={c.table} stroke={c.accent} strokeWidth="1.5" strokeDasharray="4 3" />
        <line x1="80" y1="30" x2="80" y2="70" stroke={c.accent} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
        <rect x="71" y="82" width="18" height="8" rx="4" fill={c.seat} />
      </svg>
    );
  }

  /* ── 4 seats: square table, 1 each side ── */
  if (cap === 4) {
    return (
      <svg viewBox="0 0 160 100" className="w-full h-full" fill="none">
        {/* top – 1 centered */}
        <rect x="72" y="6" width="16" height="7" rx="3.5" fill={c.seat} />
        {/* table */}
        <rect x="48" y="20" width="64" height="56" rx="8" fill={c.table} stroke={c.accent} strokeWidth="1.5" />
        {/* left – 1 */}
        <rect x="30" y="38" width="7" height="20" rx="3.5" fill={c.seat} />
        {/* right – 1 */}
        <rect x="123" y="38" width="7" height="20" rx="3.5" fill={c.seat} />
        {/* bottom – 1 centered */}
        <rect x="72" y="84" width="16" height="7" rx="3.5" fill={c.seat} />
        <circle cx="80" cy="48" r="5" fill={c.accent} opacity="0.15" />
      </svg>
    );
  }

  /* ── 6 seats: rectangular, 2 top + 2 bottom + 1 left + 1 right ── */
  if (cap === 6) {
    return (
      <svg viewBox="0 0 160 100" className="w-full h-full" fill="none">
        {/* top – 2 */}
        <rect x="58" y="6" width="16" height="7" rx="3.5" fill={c.seat} />
        <rect x="86" y="6" width="16" height="7" rx="3.5" fill={c.seat} />
        {/* table */}
        <rect x="42" y="20" width="76" height="56" rx="8" fill={c.table} stroke={c.accent} strokeWidth="1.5" />
        {/* left – 1 */}
        <rect x="24" y="38" width="7" height="20" rx="3.5" fill={c.seat} />
        {/* right – 1 */}
        <rect x="129" y="38" width="7" height="20" rx="3.5" fill={c.seat} />
        {/* bottom – 2 */}
        <rect x="58" y="84" width="16" height="7" rx="3.5" fill={c.seat} />
        <rect x="86" y="84" width="16" height="7" rx="3.5" fill={c.seat} />
        <line x1="80" y1="26" x2="80" y2="70" stroke={c.accent} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.35" />
      </svg>
    );
  }

  /* ── 8 seats: longer table, 3 top + 3 bottom + 1 left + 1 right ── */
  if (cap === 8) {
    return (
      <svg viewBox="0 0 160 100" className="w-full h-full" fill="none">
        {/* top – 3 */}
        <rect x="42" y="4" width="16" height="7" rx="3.5" fill={c.seat} />
        <rect x="72" y="4" width="16" height="7" rx="3.5" fill={c.seat} />
        <rect x="102" y="4" width="16" height="7" rx="3.5" fill={c.seat} />
        {/* table */}
        <rect x="32" y="18" width="96" height="60" rx="10" fill={c.table} stroke={c.accent} strokeWidth="1.5" />
        {/* left – 1 */}
        <rect x="16" y="40" width="7" height="16" rx="3.5" fill={c.seat} />
        {/* right – 1 */}
        <rect x="137" y="40" width="7" height="16" rx="3.5" fill={c.seat} />
        {/* bottom – 3 */}
        <rect x="42" y="86" width="16" height="7" rx="3.5" fill={c.seat} />
        <rect x="72" y="86" width="16" height="7" rx="3.5" fill={c.seat} />
        <rect x="102" y="86" width="16" height="7" rx="3.5" fill={c.seat} />
        <rect x="60" y="38" width="40" height="20" rx="6" fill={c.accent} opacity="0.1" />
      </svg>
    );
  }

  /* ── 10 seats: long table, 3 top + 3 bottom + 2 left + 2 right ── */
  if (cap === 10) {
    return (
      <svg viewBox="0 0 160 100" className="w-full h-full" fill="none">
        {/* top – 3 */}
        <rect x="42" y="4" width="16" height="7" rx="3.5" fill={c.seat} />
        <rect x="72" y="4" width="16" height="7" rx="3.5" fill={c.seat} />
        <rect x="102" y="4" width="16" height="7" rx="3.5" fill={c.seat} />
        {/* table */}
        <rect x="32" y="18" width="96" height="60" rx="10" fill={c.table} stroke={c.accent} strokeWidth="1.5" />
        {/* left – 2 */}
        <rect x="16" y="30" width="7" height="14" rx="3.5" fill={c.seat} />
        <rect x="16" y="54" width="7" height="14" rx="3.5" fill={c.seat} />
        {/* right – 2 */}
        <rect x="137" y="30" width="7" height="14" rx="3.5" fill={c.seat} />
        <rect x="137" y="54" width="7" height="14" rx="3.5" fill={c.seat} />
        {/* bottom – 3 */}
        <rect x="42" y="86" width="16" height="7" rx="3.5" fill={c.seat} />
        <rect x="72" y="86" width="16" height="7" rx="3.5" fill={c.seat} />
        <rect x="102" y="86" width="16" height="7" rx="3.5" fill={c.seat} />
        <rect x="60" y="38" width="40" height="20" rx="6" fill={c.accent} opacity="0.1" />
      </svg>
    );
  }

  /* ── 12 seats: large banquet table, 4 top + 4 bottom + 2 left + 2 right ── */
  return (
    <svg viewBox="0 0 160 100" className="w-full h-full" fill="none">
      {/* top – 4 */}
      <rect x="30" y="4" width="14" height="7" rx="3.5" fill={c.seat} />
      <rect x="56" y="4" width="14" height="7" rx="3.5" fill={c.seat} />
      <rect x="82" y="4" width="14" height="7" rx="3.5" fill={c.seat} />
      <rect x="108" y="4" width="14" height="7" rx="3.5" fill={c.seat} />
      {/* table */}
      <rect x="22" y="18" width="116" height="60" rx="10" fill={c.table} stroke={c.accent} strokeWidth="1.5" />
      {/* left – 2 */}
      <rect x="8" y="30" width="7" height="14" rx="3.5" fill={c.seat} />
      <rect x="8" y="54" width="7" height="14" rx="3.5" fill={c.seat} />
      {/* right – 2 */}
      <rect x="145" y="30" width="7" height="14" rx="3.5" fill={c.seat} />
      <rect x="145" y="54" width="7" height="14" rx="3.5" fill={c.seat} />
      {/* bottom – 4 */}
      <rect x="30" y="86" width="14" height="7" rx="3.5" fill={c.seat} />
      <rect x="56" y="86" width="14" height="7" rx="3.5" fill={c.seat} />
      <rect x="82" y="86" width="14" height="7" rx="3.5" fill={c.seat} />
      <rect x="108" y="86" width="14" height="7" rx="3.5" fill={c.seat} />
      <rect x="55" y="38" width="50" height="20" rx="6" fill={c.accent} opacity="0.1" />
    </svg>
  );
};

/* ─── Main Component ─── */
const StoreTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFloor, setActiveFloor] = useState('all');
  const [activeStatus, setActiveStatus] = useState('all');
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const menuRef = useRef(null);

  // Sample data
  const [tables, setTables] = useState([
    { id: 1, name: 'Table 1', floor: '1st', capacity: 6, status: 'Available' },
    { id: 2, name: 'Table 2', floor: '1st', capacity: 4, status: 'Available' },
    { id: 3, name: 'Table 3', floor: '1st', capacity: 6, status: 'Booked' },
    { id: 4, name: 'Table 4', floor: '1st', capacity: 10, status: 'Booked' },
    { id: 5, name: 'Table 5', floor: '1st', capacity: 10, status: 'Booked' },
    { id: 6, name: 'Table 6', floor: '1st', capacity: 10, status: 'Available' },
    { id: 7, name: 'Table 7', floor: '1st', capacity: 6, status: 'Available' },
    { id: 8, name: 'Table 8', floor: '1st', capacity: 6, status: 'Booked' },
    { id: 9, name: 'Table 9', floor: '2nd', capacity: 4, status: 'Available' },
    { id: 10, name: 'Table 10', floor: '2nd', capacity: 2, status: 'Occupied' },
    { id: 11, name: 'Table 11', floor: '2nd', capacity: 6, status: 'Available' },
    { id: 12, name: 'Table 12', floor: '2nd', capacity: 10, status: 'Occupied' },
    { id: 13, name: 'Table 13', floor: '3rd', capacity: 8, status: 'Available' },
    { id: 14, name: 'Table 14', floor: '3rd', capacity: 4, status: 'Booked' },
    { id: 15, name: 'Table 15', floor: '3rd', capacity: 6, status: 'Available' },
    { id: 16, name: 'Table 16', floor: '3rd', capacity: 2, status: 'Occupied' },
  ]);

  // New table form
  const [newTable, setNewTable] = useState({ name: '', floor: '1st', capacity: 4 });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Filtering
  const filteredTables = tables.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFloor = activeFloor === 'all' || t.floor === activeFloor;
    const matchesStatus = activeStatus === 'all' || t.status === activeStatus;
    return matchesSearch && matchesFloor && matchesStatus;
  });

  const floors = ['all', ...new Set(tables.map((t) => t.floor))];

  const statusBadge = (status) => {
    const map = {
      Available: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      Booked: 'bg-red-50 text-red-500 border-red-200',
      Occupied: 'bg-purple-50 text-purple-600 border-purple-200',
    };
    return map[status] || '';
  };

  const openAddModal = () => {
    setShowAddModal(true);
    setIsModalClosing(false);
    setNewTable({ name: '', floor: '1st', capacity: 4 });
  };

  const closeAddModal = () => {
    setIsModalClosing(true);
    setTimeout(() => {
      setShowAddModal(false);
      setIsModalClosing(false);
    }, 250);
  };

  const handleAddTable = () => {
    if (!newTable.name.trim()) return;
    setTables((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newTable.name,
        floor: newTable.floor,
        capacity: parseInt(newTable.capacity) || 4,
        status: 'Available',
      },
    ]);
    closeAddModal();
  };

  const handleDeleteTable = (id) => {
    setTables((prev) => prev.filter((t) => t.id !== id));
    setOpenMenuId(null);
  };

  const toggleStatus = (id) => {
    setTables((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const next = t.status === 'Available' ? 'Booked' : t.status === 'Booked' ? 'Occupied' : 'Available';
        return { ...t, status: next };
      })
    );
    setOpenMenuId(null);
  };

  // Stats
  const totalTables = tables.length;
  const availableCount = tables.filter((t) => t.status === 'Available').length;
  const bookedCount = tables.filter((t) => t.status === 'Booked').length;
  const occupiedCount = tables.filter((t) => t.status === 'Occupied').length;

  return (
    <div className="min-h-screen bg-[#f8f9fc] font-sans text-gray-800 ">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-[26px] font-bold text-[#1a233a] tracking-tight">Tables</h1>
          <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-white hover:shadow-sm transition-all bg-white cursor-pointer">
            <RefreshCw size={16} />
          </button>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4 pr-10 py-2.5 rounded-lg border border-gray-200 outline-none w-56 text-sm focus:border-blue-400 bg-white transition-colors"
            />
            <Search size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Add New */}
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-[#1875f0] hover:bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-lg shadow-[0_4px_14px_rgba(24,117,240,0.25)] transition-all cursor-pointer active:scale-[0.97]"
          >
            <PlusCircle size={18} />
            Add New
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-[#1875f0]">
            <Layers size={20} />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-medium">Total Tables</div>
            <div className="text-xl font-bold text-[#1a233a]">{totalTables}</div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500">
            <Layers size={20} />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-medium">Available</div>
            <div className="text-xl font-bold text-emerald-600">{availableCount}</div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-500">
            <Layers size={20} />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-medium">Booked</div>
            <div className="text-xl font-bold text-red-500">{bookedCount}</div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-500">
            <Layers size={20} />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-medium">Occupied</div>
            <div className="text-xl font-bold text-purple-600">{occupiedCount}</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* Floor filter */}
        <div className="flex bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
          {floors.map((floor) => (
            <button
              key={floor}
              onClick={() => setActiveFloor(floor)}
              className={`px-4 py-2 text-sm font-medium transition-all cursor-pointer ${activeFloor === floor
                  ? 'bg-[#1875f0] text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              {floor === 'all' ? 'All Floors' : `Floor ${floor}`}
            </button>
          ))}
        </div>

        {/* Status filter */}
        <div className="flex bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
          {['all', 'Available', 'Booked', 'Occupied'].map((s) => (
            <button
              key={s}
              onClick={() => setActiveStatus(s)}
              className={`px-4 py-2 text-sm font-medium transition-all cursor-pointer ${activeStatus === s
                  ? 'bg-[#1875f0] text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              {s === 'all' ? 'All Status' : s}
            </button>
          ))}
        </div>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredTables.map((table) => (
          <div
            key={table.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden group relative"
          >
            {/* Illustration */}
            <div className="h-[130px] bg-gradient-to-br from-[#f8f9fc] to-white flex items-center justify-center px-6 pt-3 pb-1">
              <TableIllustration capacity={table.capacity} status={table.status} variant={table.id % 3} />
            </div>

            {/* Info */}
            <div className="px-5 pb-4 pt-2 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-[#1a233a] text-[15px]">{table.name}</h3>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${statusBadge(table.status)}`}>
                    {table.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Layers size={13} className="text-gray-400" />
                    Floor : {table.floor}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={13} className="text-gray-400" />
                    Capacity : {table.capacity}
                  </span>
                </div>
              </div>

              {/* 3-dot menu */}
              <div className="relative" ref={openMenuId === table.id ? menuRef : null}>
                <button
                  onClick={() => setOpenMenuId(openMenuId === table.id ? null : table.id)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  <MoreVertical size={18} />
                </button>

                {openMenuId === table.id && (
                  <div className="absolute right-0 top-10 bg-white border border-gray-100 rounded-xl shadow-xl z-20 w-44 py-1.5 animate-in fade-in slide-in-from-top-1">
                    <button
                      onClick={() => toggleStatus(table.id)}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <Eye size={15} className="text-gray-400" />
                      Toggle Status
                    </button>
                    <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
                      <Pencil size={15} className="text-gray-400" />
                      Edit Table
                    </button>
                    <div className="border-t border-gray-100 my-1" />
                    <button
                      onClick={() => handleDeleteTable(table.id)}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <Trash2 size={15} />
                      Delete Table
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredTables.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400">
            <Layers size={48} strokeWidth={1.2} className="mb-3 opacity-40" />
            <p className="text-lg font-medium">No tables found</p>
            <p className="text-sm mt-1">Try adjusting your filters or add a new table</p>
          </div>
        )}
      </div>

      {/* Add New Table Modal */}
      {showAddModal && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-250 ${isModalClosing ? 'opacity-0' : 'opacity-100'}`}
          onClick={closeAddModal}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className={`relative bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-md transition-all duration-250 ${isModalClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-3">
              <h2 className="text-xl font-bold text-[#1a233a]">Add New Table</h2>
              <button
                onClick={closeAddModal}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <X size={16} strokeWidth={2.5} />
              </button>
            </div>

            {/* Form */}
            <div className="px-6 pb-6 flex flex-col gap-4">
              {/* Table Name */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Table Name</label>
                <input
                  type="text"
                  placeholder="e.g. Table 17"
                  value={newTable.name}
                  onChange={(e) => setNewTable({ ...newTable, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 transition-colors"
                />
              </div>

              {/* Floor */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Floor</label>
                <div className="relative">
                  <select
                    value={newTable.floor}
                    onChange={(e) => setNewTable({ ...newTable, floor: e.target.value })}
                    className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 bg-white cursor-pointer transition-colors"
                  >
                    <option value="1st">1st Floor</option>
                    <option value="2nd">2nd Floor</option>
                    <option value="3rd">3rd Floor</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Capacity */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Capacity</label>
                <div className="relative">
                  <select
                    value={newTable.capacity}
                    onChange={(e) => setNewTable({ ...newTable, capacity: e.target.value })}
                    className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 bg-white cursor-pointer transition-colors"
                  >
                    {[2, 4, 6, 8, 10, 12].map((num) => (
                      <option key={num} value={num}>
                        {num} Persons
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Preview */}
              <div className="bg-[#f8f9fc] rounded-xl p-4 flex items-center justify-center h-[110px] border border-gray-100">
                <TableIllustration capacity={parseInt(newTable.capacity) || 4} status="Available" />
              </div>

              {/* Submit */}
              <button
                onClick={handleAddTable}
                disabled={!newTable.name.trim()}
                className="w-full bg-[#1875f0] hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl shadow-[0_4px_14px_rgba(24,117,240,0.3)] transition-all cursor-pointer active:scale-[0.97]"
              >
                Add Table
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreTable;
