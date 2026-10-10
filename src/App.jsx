import React, { useMemo, useState } from 'react'
import {
  LayoutDashboard, Map as MapIcon, Compass, Users, Ticket, CreditCard, CalendarDays,
  Search, Bell, Plus, ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal,
  ArrowUpRight, ArrowDownRight, TrendingUp, MapPin, Clock3, Star, SlidersHorizontal,
  Download, Eye, Pencil, Trash2, X, Check, AlertCircle, Menu, Plane, Hotel,
  CircleDollarSign, CheckCircle2, CircleDashed, Wallet, Filter, Calendar,
  ArrowUpDown, Sparkles, LogOut, Settings, HelpCircle
} from 'lucide-react'
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts'

const initialTrips = [
  { id: 'TR-1048', name: 'Bali Island Escape', destination: 'Bali, Indonesia', category: 'Beach', start: '2026-10-14', end: '2026-10-20', price: 1299, seats: 18, booked: 14, status: 'Active', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85', rating: 4.9 },
  { id: 'TR-1047', name: 'Swiss Alps Adventure', destination: 'Interlaken, Switzerland', category: 'Adventure', start: '2026-10-18', end: '2026-10-25', price: 2490, seats: 16, booked: 11, status: 'Active', image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=900&q=85', rating: 4.8 },
  { id: 'TR-1046', name: 'Kyoto Cultural Journey', destination: 'Kyoto, Japan', category: 'Culture', start: '2026-10-21', end: '2026-10-26', price: 1590, seats: 20, booked: 17, status: 'Active', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=85', rating: 4.7 },
  { id: 'TR-1045', name: 'Santorini Blue Escape', destination: 'Santorini, Greece', category: 'Beach', start: '2026-10-25', end: '2026-10-30', price: 1890, seats: 14, booked: 14, status: 'Sold out', image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=900&q=85', rating: 4.9 },
  { id: 'TR-1044', name: 'Marrakech Market Trails', destination: 'Marrakech, Morocco', category: 'Culture', start: '2026-11-02', end: '2026-11-07', price: 980, seats: 22, booked: 8, status: 'Active', image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=900&q=85', rating: 4.6 },
  { id: 'TR-1043', name: 'Patagonia Wild Trek', destination: 'Patagonia, Chile', category: 'Adventure', start: '2026-11-10', end: '2026-11-18', price: 2890, seats: 12, booked: 5, status: 'Draft', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85', rating: 4.8 },
]
const initialBookings = [
  { id: 'BK-5821', customer: 'Olivia Rhye', email: 'olivia.rhye@example.com', tripId: 'TR-1048', trip: 'Bali Island Escape', destination: 'Bali, Indonesia', date: '2026-10-04', travelers: 2, amount: 2598, booking: 'Confirmed', payment: 'Paid', avatar: 'OR' },
  { id: 'BK-5820', customer: 'Phoenix Baker', email: 'phoenix.baker@example.com', tripId: 'TR-1047', trip: 'Swiss Alps Adventure', destination: 'Interlaken, Switzerland', date: '2026-10-04', travelers: 1, amount: 2490, booking: 'Confirmed', payment: 'Paid', avatar: 'PB' },
  { id: 'BK-5819', customer: 'Lana Steiner', email: 'lana.steiner@example.com', tripId: 'TR-1046', trip: 'Kyoto Cultural Journey', destination: 'Kyoto, Japan', date: '2026-10-03', travelers: 2, amount: 3180, booking: 'Pending', payment: 'Pending', avatar: 'LS' },
  { id: 'BK-5818', customer: 'Demi Wilkinson', email: 'demi.wilkinson@example.com', tripId: 'TR-1045', trip: 'Santorini Blue Escape', destination: 'Santorini, Greece', date: '2026-10-02', travelers: 2, amount: 3780, booking: 'Confirmed', payment: 'Paid', avatar: 'DW' },
  { id: 'BK-5817', customer: 'Candice Wu', email: 'candice.wu@example.com', tripId: 'TR-1044', trip: 'Marrakech Market Trails', destination: 'Marrakech, Morocco', date: '2026-10-02', travelers: 1, amount: 980, booking: 'Cancelled', payment: 'Refunded', avatar: 'CW' },
  { id: 'BK-5816', customer: 'Natali Craig', email: 'natali.craig@example.com', tripId: 'TR-1048', trip: 'Bali Island Escape', destination: 'Bali, Indonesia', date: '2026-10-01', travelers: 3, amount: 3897, booking: 'Confirmed', payment: 'Paid', avatar: 'NC' },
  { id: 'BK-5815', customer: 'Drew Cano', email: 'drew.cano@example.com', tripId: 'TR-1047', trip: 'Swiss Alps Adventure', destination: 'Interlaken, Switzerland', date: '2026-09-30', travelers: 2, amount: 4980, booking: 'Pending', payment: 'Pending', avatar: 'DC' },
]
const revenue = [
  { month: 'May', revenue: 18400, bookings: 130 }, { month: 'Jun', revenue: 22100, bookings: 168 },
  { month: 'Jul', revenue: 19700, bookings: 148 }, { month: 'Aug', revenue: 28400, bookings: 205 },
  { month: 'Sep', revenue: 25200, bookings: 189 }, { month: 'Oct', revenue: 32600, bookings: 246 },
]
const destinations = [
  { name: 'Bali, Indonesia', trips: 12, bookings: 184, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=700&q=80', tag: 'Trending' },
  { name: 'Kyoto, Japan', trips: 8, bookings: 126, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=700&q=80', tag: 'Culture' },
  { name: 'Santorini, Greece', trips: 6, bookings: 98, image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=700&q=80', tag: 'Popular' },
  { name: 'Swiss Alps, Switzerland', trips: 5, bookings: 76, image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=700&q=80', tag: 'Adventure' },
]
const money = n => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
const shortDate = d => new Date(`${d}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
const navItems = [
  { label: 'Overview', icon: LayoutDashboard, section: 'GENERAL' },
  { label: 'Trips', icon: Compass, section: 'GENERAL' },
  { label: 'Destinations', icon: MapIcon, section: 'GENERAL' },
  { label: 'Bookings', icon: Ticket, section: 'MANAGEMENT' },
  { label: 'Customers', icon: Users, section: 'MANAGEMENT' },
  { label: 'Payments', icon: CreditCard, section: 'MANAGEMENT' },
  { label: 'Calendar', icon: CalendarDays, section: 'MANAGEMENT' },
]
function Status({ children }) {
  const value = String(children || '').toLowerCase()
  return <span className={`status status-${value.replace(/\s/g, '-')}`}><i />{children}</span>
}
function Avatar({ name, index = 0 }) {
  const colors = ['lavender', 'peach', 'mint', 'blue', 'pink', 'sand']
  const initials = name.split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase()
  return <span className={`avatar ${colors[index % colors.length]}`}>{initials}</span>
}
function Toast({ toast, close }) {
  if (!toast) return null
  return <div className={`toast ${toast.type || ''}`}><CheckCircle2 size={18} /><span>{toast.message}</span><button onClick={close} aria-label="Close notification"><X size={16}/></button></div>
}
function Modal({ title, subtitle, onClose, children, wide = false }) {
  return <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && onClose()}><section className={`modal ${wide ? 'modal-wide' : ''}`} role="dialog" aria-modal="true" aria-label={title}><header className="modal-header"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div><button className="icon-button" onClick={onClose} aria-label="Close"><X size={19}/></button></header>{children}</section></div>
}
function TripForm({ trip, onSave, onCancel }) {
  const [form, setForm] = useState(trip || { name: '', destination: '', category: 'Beach', start: '', end: '', price: '', seats: 16, booked: 0, status: 'Active', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85', rating: 4.8 })
  const [error, setError] = useState('')
  const change = e => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = e => {
    e.preventDefault()
    if (!form.name.trim() || !form.destination.trim() || !form.start || !form.end || Number(form.price) <= 0) return setError('Complete all required fields and enter a price above zero.')
    if (form.end < form.start) return setError('End date must be on or after the start date.')
    onSave({ ...form, price: Number(form.price), seats: Number(form.seats), booked: Number(form.booked || 0) })
  }
  return <form onSubmit={submit} className="trip-form">
    <label>Trip name *<input name="name" value={form.name} onChange={change} placeholder="e.g. Bali Island Escape" required /></label>
    <label>Destination *<input name="destination" value={form.destination} onChange={change} placeholder="City, country" required /></label>
    <div className="form-grid"><label>Category<select name="category" value={form.category} onChange={change}><option>Beach</option><option>Adventure</option><option>Culture</option><option>City break</option><option>Nature</option></select></label><label>Status<select name="status" value={form.status} onChange={change}><option>Active</option><option>Draft</option><option>Sold out</option></select></label></div>
    <div className="form-grid"><label>Start date *<input type="date" name="start" value={form.start} onChange={change} required /></label><label>End date *<input type="date" name="end" value={form.end} min={form.start || undefined} onChange={change} required /></label></div>
    <div className="form-grid"><label>Price (USD) *<input type="number" name="price" min="1" value={form.price} onChange={change} placeholder="1299" required /></label><label>Total seats<input type="number" name="seats" min="1" value={form.seats} onChange={change} required /></label></div>
    {error && <p className="form-error"><AlertCircle size={15}/>{error}</p>}
    <footer className="modal-actions"><button type="button" className="btn btn-light" onClick={onCancel}>Cancel</button><button type="submit" className="btn btn-primary"><Check size={16}/> Save trip</button></footer>
  </form>
}
export default function App() {
  const [page, setPage] = useState('Overview')
  const [trips, setTrips] = useState(initialTrips)
  const [bookings, setBookings] = useState(initialBookings)
  const [query, setQuery] = useState('')
  const [destinationFilter, setDestinationFilter] = useState('All destinations')
  const [statusFilter, setStatusFilter] = useState('All statuses')
  const [priceFilter, setPriceFilter] = useState('Any price')
  const [dateFilter, setDateFilter] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [modal, setModal] = useState(null)
  const [toast, setToast] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [monthOffset, setMonthOffset] = useState(0)
  const [customerQuery, setCustomerQuery] = useState('')
  const notify = message => { setToast({ message }); window.setTimeout(() => setToast(null), 3200) }
  const allDestinations = [...new Set(trips.map(t => t.destination))]
  const filteredTrips = useMemo(() => {
    let data = [...trips].filter(t => `${t.name} ${t.destination} ${t.id} ${t.category}`.toLowerCase().includes(query.toLowerCase()))
    if (destinationFilter !== 'All destinations') data = data.filter(t => t.destination === destinationFilter)
    if (statusFilter !== 'All statuses') data = data.filter(t => t.status === statusFilter)
    if (priceFilter === 'Under $1,000') data = data.filter(t => t.price < 1000)
    if (priceFilter === '$1,000–$2,000') data = data.filter(t => t.price >= 1000 && t.price <= 2000)
    if (priceFilter === 'Over $2,000') data = data.filter(t => t.price > 2000)
    if (dateFilter) data = data.filter(t => t.start === dateFilter)
    if (sortBy === 'price-low') data.sort((a,b) => a.price-b.price)
    if (sortBy === 'price-high') data.sort((a,b) => b.price-a.price)
    if (sortBy === 'name') data.sort((a,b) => a.name.localeCompare(b.name))
    if (sortBy === 'newest') data.sort((a,b) => b.start.localeCompare(a.start))
    return data
  }, [trips, query, destinationFilter, statusFilter, priceFilter, dateFilter, sortBy])
  const filteredBookings = useMemo(() => bookings.filter(b => `${b.customer} ${b.email} ${b.trip} ${b.id}`.toLowerCase().includes(query.toLowerCase()) && (statusFilter === 'All statuses' || b.booking === statusFilter || b.payment === statusFilter)), [bookings, query, statusFilter])
  const filteredCustomers = useMemo(() => {
    const map = new Map()
    bookings.forEach(b => { const prev = map.get(b.email); if (prev) { prev.bookings += 1; prev.spent += b.amount } else map.set(b.email, { name: b.customer, email: b.email, bookings: 1, spent: b.amount, avatar: b.avatar }) })
    return [...map.values()].filter(c => `${c.name} ${c.email}`.toLowerCase().includes(customerQuery.toLowerCase()))
  }, [bookings, customerQuery])
  const pages = Math.max(1, Math.ceil((page === 'Trips' ? filteredTrips.length : filteredBookings.length) / pageSize))
  const visibleTrips = filteredTrips.slice((pageNumber-1)*pageSize, pageNumber*pageSize)
  const visibleBookings = filteredBookings.slice((pageNumber-1)*pageSize, pageNumber*pageSize)
  const totalRevenue = bookings.filter(b => b.payment === 'Paid').reduce((sum,b) => sum+b.amount, 0)
  const confirmed = bookings.filter(b => b.booking === 'Confirmed').length
  const totalTravelers = bookings.filter(b => b.booking !== 'Cancelled').reduce((sum,b) => sum+b.travelers, 0)
  const saveTrip = trip => {
    if (trip.id) setTrips(old => old.map(t => t.id === trip.id ? { ...trip } : t))
    else setTrips(old => [{ ...trip, id: `TR-${1050 + old.length}` }, ...old])
    setModal(null); notify(trip.id ? 'Trip updated successfully.' : 'New trip created successfully.')
  }
  const deleteTrip = trip => setModal({ type: 'confirm', title: 'Delete this trip?', message: `“${trip.name}” will be removed from your trip list. Existing bookings will remain in the booking records.`, action: () => { setTrips(old => old.filter(t => t.id !== trip.id)); setModal(null); notify('Trip deleted.') } })
  const changeBookingStatus = (id, status) => { setBookings(old => old.map(b => b.id === id ? { ...b, booking: status } : b)); notify(`Booking ${id} marked ${status.toLowerCase()}.`) }
  const resetFilters = () => { setQuery(''); setDestinationFilter('All destinations'); setStatusFilter('All statuses'); setPriceFilter('Any price'); setDateFilter(''); setPageNumber(1) }
  const go = p => { setPage(p); setPageNumber(1); setQuery(''); setStatusFilter('All statuses'); setSidebarOpen(false) }
  const exportBookings = () => {
    const rows = [['Booking ID','Customer','Email','Trip','Destination','Booking Date','Travelers','Amount USD','Booking Status','Payment Status'], ...filteredBookings.map(b => [b.id,b.customer,b.email,b.trip,b.destination,b.date,b.travelers,b.amount,b.booking,b.payment])]
    const csv = rows.map(r => r.map(v => `"${String(v).replaceAll('"','""')}"`).join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }))
    const a = document.createElement('a'); a.href = url; a.download = 'wanderly-bookings.csv'; a.click(); URL.revokeObjectURL(url); notify('Booking report exported.')
  }
  const sidebar = <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
    <div className="brand"><span className="brand-mark"><Plane size={20}/></span><span>Wanderly<span className="brand-dot">.</span><small>TRAVEL ADMIN</small></span><button className="mobile-close" onClick={() => setSidebarOpen(false)}><X size={18}/></button></div>
    {['GENERAL','MANAGEMENT'].map(section => <div className="nav-section" key={section}><p>{section}</p>{navItems.filter(n=>n.section===section).map(n=><button key={n.label} onClick={()=>go(n.label)} className={`nav-link ${page===n.label?'active':''}`}><n.icon size={18}/><span>{n.label}</span>{n.label==='Bookings'&&<span className="nav-count">{bookings.length}</span>}</button>)}</div>)}
    <div className="sidebar-bottom"><div className="help-card"><div className="help-icon"><Sparkles size={17}/></div><strong>Need a hand?</strong><p>Visit our help center for tips and guides.</p><button onClick={()=>notify('Help center is coming soon.')}>Visit help center <ArrowUpRight size={14}/></button></div><button className="profile-row" onClick={()=>notify('Account settings are not connected in this demo.')}><Avatar name="Alex Morgan" index={3}/><span><b>Alex Morgan</b><small>Administrator</small></span><MoreHorizontal size={18}/></button></div>
  </aside>
  const pageTitle = page === 'Overview' ? 'Good morning, Alex 👋' : page
  return <div className="app-shell">
    {sidebar}
    {sidebarOpen && <button className="sidebar-scrim" onClick={()=>setSidebarOpen(false)} aria-label="Close navigation"/>}
    <main className="main-area">
      <header className="topbar"><div className="topbar-left"><button className="mobile-menu icon-button" onClick={()=>setSidebarOpen(true)} aria-label="Open navigation"><Menu size={20}/></button><div className="breadcrumb">Workspace <ChevronRight size={14}/> <span>{page}</span></div></div><div className="topbar-actions"><div className="search-global"><Search size={17}/><input placeholder="Search anything..." value={query} onChange={e=>{setQuery(e.target.value);setPageNumber(1)}}/><kbd>⌘ K</kbd></div><button className="icon-button notification-button" onClick={()=>notify('You’re all caught up!')} aria-label="Notifications"><Bell size={19}/><i/></button><span className="top-divider"/><button className="top-user" onClick={()=>notify('Signed in as Alex Morgan')}><Avatar name="Alex Morgan" index={3}/><ChevronDown size={15}/></button></div></header>
      <div className="page-content">
        <div className="page-heading"><div><p className="eyebrow">{page==='Overview'?'YOUR BUSINESS AT A GLANCE':'WANDERLY WORKSPACE'}</p><h1>{pageTitle}</h1><p className="heading-sub">{page==='Overview'?'Here’s what’s happening with your travel business today.':`Manage your ${page.toLowerCase()} and keep every journey running smoothly.`}</p></div><div className="heading-actions">{page==='Trips'&&<button className="btn btn-primary" onClick={()=>setModal({type:'trip'})}><Plus size={17}/> Create trip</button>}{page==='Bookings'&&<button className="btn btn-primary" onClick={exportBookings}><Download size={16}/> Export report</button>}{page==='Overview'&&<button className="btn btn-primary" onClick={()=>setModal({type:'trip'})}><Plus size={17}/> Create trip</button>}</div></div>
        {page==='Overview'&&<Overview trips={trips} bookings={bookings} totalRevenue={totalRevenue} confirmed={confirmed} totalTravelers={totalTravelers} go={go} setSelectedBooking={setSelectedBooking} setModal={setModal}/>}
        {page==='Trips'&&<section className="panel">
          <div className="panel-heading"><div><h2>All trips <span className="count-pill">{filteredTrips.length}</span></h2><p>Manage your tour packages and availability.</p></div><button className="btn btn-light btn-sm" onClick={()=>{resetFilters();notify('Filters cleared.')}}><SlidersHorizontal size={15}/> Reset filters</button></div>
          <div className="filter-row"><div className="search-field"><Search size={16}/><input placeholder="Search trips..." value={query} onChange={e=>{setQuery(e.target.value);setPageNumber(1)}}/></div><select value={destinationFilter} onChange={e=>{setDestinationFilter(e.target.value);setPageNumber(1)}}><option>All destinations</option>{allDestinations.map(d=><option key={d}>{d}</option>)}</select><select value={statusFilter} onChange={e=>{setStatusFilter(e.target.value);setPageNumber(1)}}><option>All statuses</option><option>Active</option><option>Draft</option><option>Sold out</option></select><select value={priceFilter} onChange={e=>{setPriceFilter(e.target.value);setPageNumber(1)}}><option>Any price</option><option>Under $1,000</option><option>$1,000–$2,000</option><option>Over $2,000</option></select><label className="date-filter"><Calendar size={15}/><input type="date" value={dateFilter} onChange={e=>{setDateFilter(e.target.value);setPageNumber(1)}} aria-label="Filter by start date"/></label><select value={sortBy} onChange={e=>setSortBy(e.target.value)} aria-label="Sort trips"><option value="newest">Date: newest</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name: A–Z</option></select></div>
          <div className="trip-table-wrap"><table className="data-table trip-table"><thead><tr><th>TRIP DETAILS</th><th>DESTINATION</th><th>DATES</th><th>PRICE / PERSON</th><th>AVAILABILITY</th><th>STATUS</th><th></th></tr></thead><tbody>{visibleTrips.map(t=><tr key={t.id}><td><div className="trip-name-cell"><img src={t.image} alt="" onError={e=>e.currentTarget.style.visibility='hidden'}/><div><b>{t.name}</b><small>{t.id} <span>·</span> {t.category}</small></div></div></td><td><span className="destination-cell"><MapPin size={14}/>{t.destination}</span></td><td><span className="date-cell">{shortDate(t.start)}<small>to {shortDate(t.end)}</small></span></td><td><b className="price-cell">{money(t.price)}</b></td><td><div className="availability"><div><span>{t.booked}/{t.seats} booked</span><small>{Math.max(0,t.seats-t.booked)} seats left</small></div><div className="progress"><i style={{width:`${Math.min(100,t.booked/t.seats*100)}%`}}/></div></div></td><td><Status>{t.status}</Status></td><td><div className="row-actions"><button className="icon-button" title="View trip" onClick={()=>setModal({type:'view-trip',trip:t})}><Eye size={16}/></button><button className="icon-button" title="Edit trip" onClick={()=>setModal({type:'trip',trip:t})}><Pencil size={15}/></button><button className="icon-button danger-hover" title="Delete trip" onClick={()=>deleteTrip(t)}><Trash2 size={15}/></button></div></td></tr>)}</tbody></table></div>
          {visibleTrips.length===0&&<EmptyState title="No trips found" text="Try changing your filters or create a new trip." action="Clear filters" onAction={resetFilters}/>}
          <Pagination count={filteredTrips.length} page={pageNumber} pages={pages} pageSize={pageSize} setPage={setPageNumber} setPageSize={setPageSize}/>
        </section>}
        {page==='Bookings'&&<section className="panel"><div className="panel-heading"><div><h2>Booking management <span className="count-pill">{filteredBookings.length}</span></h2><p>Track reservations, travelers, and booking status.</p></div><button className="btn btn-light btn-sm" onClick={exportBookings}><Download size={15}/> Export CSV</button></div><div className="filter-row"><div className="search-field"><Search size={16}/><input placeholder="Search customer, trip or ID..." value={query} onChange={e=>{setQuery(e.target.value);setPageNumber(1)}}/></div><select value={statusFilter} onChange={e=>{setStatusFilter(e.target.value);setPageNumber(1)}}><option>All statuses</option><option>Confirmed</option><option>Pending</option><option>Cancelled</option><option>Paid</option><option>Refunded</option></select><span className="filter-hint"><Filter size={14}/> Live filters</span></div><div className="trip-table-wrap"><table className="data-table"><thead><tr><th>BOOKING ID</th><th>CUSTOMER</th><th>TRIP</th><th>BOOKED ON</th><th>TRAVELERS</th><th>AMOUNT</th><th>BOOKING</th><th>PAYMENT</th><th></th></tr></thead><tbody>{visibleBookings.map((b,i)=><tr key={b.id}><td><button className="text-link" onClick={()=>setSelectedBooking(b)}>{b.id}</button></td><td><div className="customer-cell"><Avatar name={b.customer} index={i}/><div><b>{b.customer}</b><small>{b.email}</small></div></div></td><td><span className="trip-cell">{b.trip}</span><small className="cell-sub">{b.destination}</small></td><td>{shortDate(b.date)}</td><td>{b.travelers} {b.travelers===1?'person':'people'}</td><td><b>{money(b.amount)}</b></td><td><Status>{b.booking}</Status></td><td><Status>{b.payment}</Status></td><td><button className="icon-button" title="View booking" onClick={()=>setSelectedBooking(b)}><Eye size={16}/></button></td></tr>)}</tbody></table></div>{visibleBookings.length===0&&<EmptyState title="No bookings found" text="Try another search or status filter." action="Clear filters" onAction={resetFilters}/>}<Pagination count={filteredBookings.length} page={pageNumber} pages={pages} pageSize={pageSize} setPage={setPageNumber} setPageSize={setPageSize}/></section>}
        {page==='Destinations'&&<Destinations trips={trips} notify={notify} setDestinationFilter={setDestinationFilter} go={go}/>}
        {page==='Customers'&&<section className="panel"><div className="panel-heading"><div><h2>Customer directory <span className="count-pill">{filteredCustomers.length}</span></h2><p>Get to know your travelers and their booking history.</p></div></div><div className="filter-row"><div className="search-field"><Search size={16}/><input placeholder="Search customers..." value={customerQuery} onChange={e=>setCustomerQuery(e.target.value)}/></div><span className="filter-hint"><Users size={15}/> {filteredCustomers.length} customers</span></div><div className="customer-grid">{filteredCustomers.map((c,i)=><article className="customer-card" key={c.email}><div className="customer-card-top"><Avatar name={c.name} index={i}/><button className="icon-button" onClick={()=>notify(`Customer: ${c.name} · ${c.email}`)}><MoreHorizontal size={18}/></button></div><h3>{c.name}</h3><p>{c.email}</p><div className="customer-stats"><div><small>Total bookings</small><b>{c.bookings}</b></div><div><small>Total spent</small><b>{money(c.spent)}</b></div></div><button className="btn btn-light btn-sm customer-view" onClick={()=>{setQuery(c.name);go('Bookings')}}>View bookings <ArrowUpRight size={14}/></button></article>)}</div>{filteredCustomers.length===0&&<EmptyState title="No customers found" text="Try searching by another name or email."/>}</section>}
        {page==='Payments'&&<Payments bookings={bookings} totalRevenue={totalRevenue} notify={notify}/>}
        {page==='Calendar'&&<CalendarPage trips={trips} bookings={bookings} monthOffset={monthOffset} setMonthOffset={setMonthOffset} setModal={setModal}/>}
        <footer className="app-footer"><span>© 2026 Wanderly Inc.</span><span><span className="online-dot"/> All systems operational</span><span>Made for better journeys <span className="footer-heart">♥</span></span></footer>
      </div>
    </main>
    {modal?.type==='trip'&&<Modal title={modal.trip?'Edit trip':'Create a new trip'} subtitle="Add the details travelers need to plan their next adventure." onClose={()=>setModal(null)}><TripForm trip={modal.trip} onSave={saveTrip} onCancel={()=>setModal(null)}/></Modal>}
    {modal?.type==='view-trip'&&<Modal title={modal.trip.name} subtitle={modal.trip.id} onClose={()=>setModal(null)}><div className="view-trip"><img src={modal.trip.image} alt={modal.trip.name}/><div className="view-trip-tags"><Status>{modal.trip.status}</Status><span className="rating"><Star size={14} fill="currentColor"/>{modal.trip.rating}</span><span className="category-pill">{modal.trip.category}</span></div><h3>{modal.trip.destination}</h3><p><Calendar size={15}/> {shortDate(modal.trip.start)} — {shortDate(modal.trip.end)}</p><div className="view-trip-price">{money(modal.trip.price)} <small>/ person</small></div><div className="view-trip-availability">{modal.trip.booked} booked of {modal.trip.seats} seats</div><button className="btn btn-primary btn-full" onClick={()=>setModal({type:'trip',trip:modal.trip})}><Pencil size={16}/> Edit trip</button></div></Modal>}
    {modal?.type==='confirm'&&<Modal title={modal.title} subtitle="This action cannot be undone." onClose={()=>setModal(null)}><div className="confirm-body"><span className="confirm-icon"><AlertCircle size={24}/></span><p>{modal.message}</p><div className="modal-actions"><button className="btn btn-light" onClick={()=>setModal(null)}>Keep it</button><button className="btn btn-danger" onClick={modal.action}><Trash2 size={15}/> Delete trip</button></div></div></Modal>}
    {selectedBooking&&<Modal title={`Booking ${selectedBooking.id}`} subtitle="Booking details and payment information" onClose={()=>setSelectedBooking(null)}><div className="booking-detail"><div className="booking-detail-person"><Avatar name={selectedBooking.customer}/><div><b>{selectedBooking.customer}</b><small>{selectedBooking.email}</small></div></div><div className="detail-pair"><span>Trip</span><b>{selectedBooking.trip}</b></div><div className="detail-pair"><span>Destination</span><b>{selectedBooking.destination}</b></div><div className="detail-pair"><span>Booking date</span><b>{shortDate(selectedBooking.date)}</b></div><div className="detail-pair"><span>Travelers</span><b>{selectedBooking.travelers}</b></div><div className="detail-pair"><span>Total amount</span><b className="detail-amount">{money(selectedBooking.amount)}</b></div><div className="detail-pair"><span>Booking status</span><Status>{selectedBooking.booking}</Status></div><div className="detail-pair"><span>Payment status</span><Status>{selectedBooking.payment}</Status></div><div className="modal-actions booking-actions"><button className="btn btn-light" onClick={()=>{setBookings(old=>old.map(b=>b.id===selectedBooking.id?{...b,payment:'Refunded',booking:'Cancelled'}:b));setSelectedBooking(null);notify('Booking cancelled and marked for refund.')}} disabled={selectedBooking.booking==='Cancelled'}>Cancel booking</button><button className="btn btn-primary" onClick={()=>{changeBookingStatus(selectedBooking.id,'Confirmed');setSelectedBooking(null)}} disabled={selectedBooking.booking==='Confirmed'}><Check size={16}/> Confirm booking</button></div></div></Modal>}
    <Toast toast={toast} close={()=>setToast(null)}/>
  </div>
}
function StatCard({ title, value, change, trend = 'up', icon: Icon, tone = 'purple', note }) {
  return <article className="stat-card"><div className="stat-top"><span>{title}</span><span className={`stat-icon ${tone}`}><Icon size={18}/></span></div><div className="stat-value">{value}</div><div className="stat-bottom"><span className={`trend ${trend}`} >{trend==='up'?<ArrowUpRight size={14}/>:<ArrowDownRight size={14}/>} {change}</span><span>{note || 'vs. last month'}</span></div></article>
}
function Overview({ trips, bookings, totalRevenue, confirmed, totalTravelers, go, setSelectedBooking, setModal }) {
  const upcoming = [...trips].filter(t=>t.start>='2026-10-09').sort((a,b)=>a.start.localeCompare(b.start)).slice(0,3)
  return <>
    <div className="stats-grid"><StatCard title="Total revenue" value={money(totalRevenue)} change="12.8%" icon={CircleDollarSign} tone="purple"/><StatCard title="Total bookings" value="1,284" change="8.2%" icon={Ticket} tone="blue"/><StatCard title="Active trips" value={trips.filter(t=>t.status==='Active').length} change="2 new" icon={Compass} tone="orange"/><StatCard title="Total travelers" value={totalTravelers+1260} change="6.4%" icon={Users} tone="green"/></div>
    <div className="analytics-grid"><section className="panel revenue-panel"><div className="panel-heading"><div><h2>Revenue overview</h2><p>Track your revenue performance over time.</p></div><select className="compact-select" defaultValue="6 months"><option>6 months</option><option>12 months</option></select></div><div className="revenue-summary"><strong>$32,600</strong><span className="trend up"><ArrowUpRight size={14}/> 18.4%</span><small>Revenue this month</small></div><div className="chart-area"><ResponsiveContainer width="100%" height="100%"><AreaChart data={revenue} margin={{top:10,right:8,left:-22,bottom:0}}><defs><linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6c63ff" stopOpacity={0.22}/><stop offset="100%" stopColor="#6c63ff" stopOpacity={0.01}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#edf0f6"/><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill:'#9298a8',fontSize:12}} dy={10}/><YAxis axisLine={false} tickLine={false} tick={{fill:'#9298a8',fontSize:11}} tickFormatter={v=>`$${v/1000}k`}/><Tooltip formatter={v=>money(v)} contentStyle={{border:'1px solid #eceef5',borderRadius:12,boxShadow:'0 8px 30px #20284a12'}}/><Area type="monotone" dataKey="revenue" stroke="#6c63ff" strokeWidth={2.5} fill="url(#revFill)" activeDot={{r:5,strokeWidth:0}}/></AreaChart></ResponsiveContainer></div><div className="chart-legend"><span><i/> Revenue</span><span>Monthly revenue in USD</span></div></section>
      <section className="panel source-panel"><div className="panel-heading"><div><h2>Booking sources</h2><p>Where your travelers find you.</p></div><button className="icon-button" onClick={()=>go('Bookings')}><MoreHorizontal size={19}/></button></div><div className="donut-wrap"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={[{name:'Website',value:46},{name:'Mobile app',value:32},{name:'Partners',value:22}]} dataKey="value" nameKey="name" innerRadius={65} outerRadius={88} paddingAngle={4} stroke="none"><Cell fill="#7167f8"/><Cell fill="#f5a65b"/><Cell fill="#4fc6aa"/></Pie><Tooltip formatter={v=>`${v}%`}/></PieChart></ResponsiveContainer><div className="donut-center"><strong>1,284</strong><small>Total bookings</small></div></div><div className="source-legend">{[['Website','46%','#7167f8'],['Mobile app','32%','#f5a65b'],['Partners','22%','#4fc6aa']].map(([name,val,color])=><div key={name}><span><i style={{background:color}}/>{name}</span><b>{val}</b></div>)}</div></section></div>
    <div className="overview-lower"><section className="panel recent-panel"><div className="panel-heading"><div><h2>Recent bookings</h2><p>Latest activity from your travelers.</p></div><button className="text-link view-all" onClick={()=>go('Bookings')}>View all <ArrowUpRight size={14}/></button></div><div className="recent-list">{bookings.slice(0,5).map((b,i)=><button className="recent-row" key={b.id} onClick={()=>setSelectedBooking(b)}><Avatar name={b.customer} index={i}/><span className="recent-person"><b>{b.customer}</b><small>{b.trip}</small></span><span className="recent-date">{shortDate(b.date)}</span><span className="recent-amount">{money(b.amount)}</span><Status>{b.booking}</Status></button>)}</div></section>
      <section className="panel upcoming-panel"><div className="panel-heading"><div><h2>Upcoming trips</h2><p>Keep an eye on what's next.</p></div><button className="icon-button" onClick={()=>go('Trips')}><ArrowUpRight size={17}/></button></div><div className="upcoming-list">{upcoming.map(t=><div className="upcoming-item" key={t.id}><img src={t.image} alt=""/><div className="upcoming-info"><b>{t.name}</b><span><MapPin size={12}/>{t.destination}</span><small><Calendar size={12}/>{shortDate(t.start)}</small></div><span className="upcoming-price">{money(t.price)}</span></div>)}</div><button className="btn btn-light btn-full" onClick={()=>go('Trips')}>Manage all trips <ArrowUpRight size={15}/></button></section></div>
    <section className="destination-strip"><div className="strip-heading"><div><p className="eyebrow">EXPLORE THE WORLD</p><h2>Popular destinations</h2></div><button className="text-link" onClick={()=>go('Destinations')}>All destinations <ArrowUpRight size={14}/></button></div><div className="destination-cards">{destinations.slice(0,3).map((d,i)=><button className="destination-card" key={d.name} onClick={()=>go('Destinations')}><img src={d.image} alt={d.name}/><span className="destination-tag">{d.tag}</span><span className="destination-card-info"><b>{d.name}</b><small><Compass size={13}/>{d.trips} trips available <span>·</span> {d.bookings} bookings</small></span></button>)}</div></section>
  </>
}
function Pagination({ count, page, pages, pageSize, setPage, setPageSize }) {
  if (!count) return <div className="pagination"><span>No results to display</span><span>0 items</span></div>
  const start=(page-1)*pageSize+1, end=Math.min(page*pageSize,count)
  return <div className="pagination"><span>Showing <b>{start}–{end}</b> of <b>{count}</b> results</span><div className="pagination-right"><label>Rows <select value={pageSize} onChange={e=>{setPageSize(Number(e.target.value));setPage(1)}}><option value={5}>5</option><option value={10}>10</option><option value={20}>20</option></select></label><button className="page-btn" disabled={page<=1} onClick={()=>setPage(page-1)} aria-label="Previous page"><ChevronLeft size={16}/></button><span className="page-indicator">{page} / {pages}</span><button className="page-btn" disabled={page>=pages} onClick={()=>setPage(page+1)} aria-label="Next page"><ChevronRight size={16}/></button></div></div>
}
function EmptyState({ title, text, action, onAction }) {
  return <div className="empty-state"><span><Search size={23}/></span><h3>{title}</h3><p>{text}</p>{action&&<button className="btn btn-light" onClick={onAction}>{action}</button>}</div>
}
function Destinations({ trips, notify, setDestinationFilter, go }) {
  const [q,setQ]=useState('')
  const [sort,setSort]=useState('popular')
  const items=destinations.filter(d=>d.name.toLowerCase().includes(q.toLowerCase())).sort((a,b)=>sort==='name'?a.name.localeCompare(b.name):b.bookings-a.bookings)
  return <><div className="destination-toolbar"><div className="search-field"><Search size={16}/><input placeholder="Search destinations..." value={q} onChange={e=>setQ(e.target.value)}/></div><select value={sort} onChange={e=>setSort(e.target.value)}><option value="popular">Most popular</option><option value="name">Name A–Z</option></select><button className="btn btn-primary" onClick={()=>notify('Destination creation form can be connected to your backend.')}><Plus size={16}/> Add destination</button></div><div className="destination-management-grid">{items.map((d,i)=>{const linked=trips.filter(t=>t.destination.includes(d.name.split(',')[0])||d.name.includes(t.destination.split(',')[0]));return <article className="destination-management-card" key={d.name}><div className="destination-management-image"><img src={d.image} alt={d.name}/><span className="destination-tag">{d.tag}</span><button className="icon-button" onClick={()=>notify(`${d.name} · ${d.trips} trips · ${d.bookings} bookings`)}><MoreHorizontal size={18}/></button></div><div className="destination-management-body"><h3>{d.name}</h3><div className="destination-metrics"><div><small>Trips</small><b>{d.trips}</b></div><div><small>Bookings</small><b>{d.bookings}</b></div><div><small>Available in demo</small><b>{linked.length || Math.min(d.trips,3)}</b></div></div><button className="btn btn-light btn-full" onClick={()=>{const dest=trips.find(t=>t.destination.includes(d.name.split(',')[0]))?.destination;if(dest){setDestinationFilter(dest);go('Trips')}else notify('No matching trips yet.')}}>View related trips <ArrowUpRight size={14}/></button></div></article>})}</div>{items.length===0&&<EmptyState title="No destinations found" text="Try another search term."/>}</>
}
function Payments({ bookings, totalRevenue, notify }) {
  const paid=bookings.filter(b=>b.payment==='Paid'), pending=bookings.filter(b=>b.payment==='Pending'), refunded=bookings.filter(b=>b.payment==='Refunded')
  return <><div className="stats-grid payment-stats"><StatCard title="Collected payments" value={money(totalRevenue)} change={`${paid.length} transactions`} icon={Wallet} tone="green" note="Successfully received"/><StatCard title="Pending payments" value={money(pending.reduce((s,b)=>s+b.amount,0))} change={`${pending.length} awaiting`} icon={Clock3} tone="orange" note="Need follow-up"/><StatCard title="Refunded amount" value={money(refunded.reduce((s,b)=>s+b.amount,0))} change={`${refunded.length} refunds`} trend="down" icon={CircleDollarSign} tone="blue" note="Processed refunds"/><StatCard title="Success rate" value={`${Math.round(paid.length/Math.max(1,bookings.length)*100)}%`} change="Payment health" icon={CheckCircle2} tone="purple" note="Of recorded bookings"/></div><section className="panel"><div className="panel-heading"><div><h2>Transaction history</h2><p>Payment records from all booking activity.</p></div><button className="btn btn-light btn-sm" onClick={()=>notify('Payment export is ready to connect to your payment provider.')}><Download size={15}/> Export payments</button></div><div className="trip-table-wrap"><table className="data-table"><thead><tr><th>TRANSACTION</th><th>CUSTOMER</th><th>DATE</th><th>PAYMENT METHOD</th><th>AMOUNT</th><th>STATUS</th><th></th></tr></thead><tbody>{bookings.map((b,i)=><tr key={b.id}><td><b>{`TX-${b.id.slice(3)}`}</b><small className="cell-sub">{b.id}</small></td><td><div className="customer-cell"><Avatar name={b.customer} index={i}/><div><b>{b.customer}</b><small>{b.email}</small></div></div></td><td>{shortDate(b.date)}</td><td><span className="payment-method"><CreditCard size={15}/> {i%2===0?'Visa •••• 4242':'Mastercard •••• 8210'}</span></td><td><b>{money(b.amount)}</b></td><td><Status>{b.payment}</Status></td><td><button className="icon-button" onClick={()=>notify(`Transaction TX-${b.id.slice(3)} details opened.`)}><Eye size={16}/></button></td></tr>)}</tbody></table></div><div className="pagination"><span>Showing <b>{bookings.length}</b> transactions</span><span>Currency: USD</span></div></section><div className="payment-note"><span><AlertCircle size={18}/></span><div><b>Demo payment data</b><p>This dashboard uses sample payment records. Connect a payment provider such as Stripe or Razorpay and a secure backend before processing real transactions.</p></div></div></>
}
function CalendarPage({ trips, bookings, monthOffset, setMonthOffset, setModal }) {
  const [view,setView]=useState('Month')
  const base=new Date(2026,9+monthOffset,1), year=base.getFullYear(), month=base.getMonth(), first=base.getDay(), days=new Date(year,month+1,0).getDate()
  const monthName=base.toLocaleDateString('en-US',{month:'long',year:'numeric'})
  const events={}
  trips.forEach(t=>{const d=new Date(`${t.start}T12:00:00`);if(d.getFullYear()===year&&d.getMonth()===month)(events[d.getDate()] ||= []).push({label:t.name,type:'trip',item:t})})
  bookings.forEach(b=>{const d=new Date(`${b.date}T12:00:00`);if(d.getFullYear()===year&&d.getMonth()===month)(events[d.getDate()] ||= []).push({label:`${b.customer} · booking`,type:'booking',item:b})})
  const cells=[...Array(first).fill(null),...Array.from({length:days},(_,i)=>i+1)]
  return <section className="panel calendar-panel"><div className="panel-heading"><div><h2>Travel calendar</h2><p>See trip departures and booking activity at a glance.</p></div><div className="calendar-view-toggle">{['Month','Agenda'].map(v=><button key={v} className={view===v?'selected':''} onClick={()=>setView(v)}>{v}</button>)}</div></div><div className="calendar-controls"><div className="calendar-month-control"><button className="icon-button" onClick={()=>setMonthOffset(monthOffset-1)} aria-label="Previous month"><ChevronLeft size={18}/></button><h3>{monthName}</h3><button className="icon-button" onClick={()=>setMonthOffset(monthOffset+1)} aria-label="Next month"><ChevronRight size={18}/></button><button className="btn btn-light btn-sm" onClick={()=>setMonthOffset(0)}>Today</button></div><div className="calendar-legend"><span><i className="trip-dot"/> Trip departure</span><span><i className="booking-dot"/> Booking</span></div></div>{view==='Month'?<div className="calendar-grid">{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d=><div className="calendar-weekday" key={d}>{d}</div>)}{cells.map((d,i)=><div className={`calendar-day ${!d?'blank':''}`} key={`${d}-${i}`}><span className="day-number">{d}</span>{d&&events[d]?.slice(0,3).map((ev,j)=><button key={`${ev.type}-${j}`} className={`calendar-event ${ev.type}`} title={ev.label} onClick={()=>ev.type==='trip'?setModal({type:'view-trip',trip:ev.item}):null}>{ev.label}</button>)}{d&&events[d]?.length>3&&<small className="more-events">+{events[d].length-3} more</small>}</div>)}</div>:<div className="agenda-list">{Object.entries(events).sort((a,b)=>Number(a[0])-Number(b[0])).map(([d,evs])=><div className="agenda-day" key={d}><div className="agenda-date"><b>{d.padStart(2,'0')}</b><small>{new Date(year,month,Number(d)).toLocaleDateString('en-US',{weekday:'short'})}</small></div><div className="agenda-events">{evs.map((ev,i)=><button key={i} className={`agenda-event ${ev.type}`} onClick={()=>ev.type==='trip'&&setModal({type:'view-trip',trip:ev.item})}><span>{ev.type==='trip'?<Plane size={16}/>:<Ticket size={16}/>}</span><div><b>{ev.label}</b><small>{ev.type==='trip'?`${ev.item.destination} · ${money(ev.item.price)}`:`${ev.item.id} · ${ev.item.booking}`}</small></div></button>)}</div></div>)}{Object.keys(events).length===0&&<EmptyState title="Nothing scheduled" text="There are no trips or bookings for this month."/>}</div>}<div className="calendar-footer"><span><i className="trip-dot"/> Trips are clickable to view details</span><span>{Object.values(events).flat().length} events this month</span></div></section>
}
