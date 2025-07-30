import { useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import DataUpload from './pages/DataUpload';
import Employees from './pages/Employees';
import Patients from './pages/Patients';
import Assignments from './pages/Assignments';
import CreateAssignment from './pages/CreateAssignment';
import { 
  HomeIcon, 
  CloudArrowUpIcon, 
  UserGroupIcon, 
  UserIcon, 
  ClipboardDocumentListIcon,
  PlusCircleIcon,
  Bars3Icon,
  XMarkIcon,
  SignalIcon,
  BellIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { 
  HomeIcon as HomeIconSolid,
  CloudArrowUpIcon as CloudArrowUpIconSolid,
  UserGroupIcon as UserGroupIconSolid,
  UserIcon as UserIconSolid,
  ClipboardDocumentListIcon as ClipboardDocumentListIconSolid,
  PlusCircleIcon as PlusCircleIconSolid
} from '@heroicons/react/24/solid';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { 
      name: 'Dashboard', 
      href: '/', 
      icon: HomeIcon, 
      iconSolid: HomeIconSolid,
      current: location.pathname === '/',
      color: 'from-blue-500 to-indigo-600'
    },
    { 
      name: 'Upload Data', 
      href: '/upload', 
      icon: CloudArrowUpIcon, 
      iconSolid: CloudArrowUpIconSolid,
      current: location.pathname === '/upload',
      color: 'from-green-500 to-emerald-600'
    },
    { 
      name: 'Employees', 
      href: '/employees', 
      icon: UserGroupIcon, 
      iconSolid: UserGroupIconSolid,
      current: location.pathname === '/employees',
      color: 'from-purple-500 to-violet-600'
    },
    { 
      name: 'Patients', 
      href: '/patients', 
      icon: UserIcon, 
      iconSolid: UserIconSolid,
      current: location.pathname === '/patients',
      color: 'from-pink-500 to-rose-600'
    },
    { 
      name: 'Assignments', 
      href: '/assignments', 
      icon: ClipboardDocumentListIcon, 
      iconSolid: ClipboardDocumentListIconSolid,
      current: location.pathname === '/assignments',
      color: 'from-orange-500 to-amber-600'
    },
    { 
      name: 'Create Assignment', 
      href: '/create-assignment', 
      icon: PlusCircleIcon, 
      iconSolid: PlusCircleIconSolid,
      current: location.pathname === '/create-assignment',
      color: 'from-teal-500 to-cyan-600'
    },
  ];

  const handleNavigation = (href) => {
    navigate(href);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-72 flex-col bg-white/95 backdrop-blur-xl shadow-2xl transform transition-transform duration-300 ease-in-out border-r border-white/20">
          <div className="flex h-20 items-center justify-between px-6 border-b border-gray-200/50">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg ring-2 ring-white/20">
                <HomeIconSolid className="h-6 w-6 text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Healthcare Rota</h1>
                <p className="text-xs text-gray-500 font-medium">AI-Powered System</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 rounded-xl hover:bg-gray-100/50"
              aria-label="Close sidebar"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 space-y-2 px-4 py-6">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className={`group flex items-center w-full px-4 py-3 text-sm font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                  item.current
                    ? `bg-gradient-to-r ${item.color} text-white shadow-xl shadow-blue-500/25`
                    : 'text-gray-700 hover:bg-white/60 hover:text-gray-900 hover:shadow-lg'
                }`}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.current ? (
                  <item.iconSolid className="mr-4 h-6 w-6 flex-shrink-0 text-white" />
                ) : (
                  <item.icon className="mr-4 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-600" />
                )}
                <span className="flex-1 text-left">{item.name}</span>
                {item.current && (
                  <div className="w-2 h-2 bg-white rounded-full opacity-75"></div>
                )}
              </button>
            ))}
          </nav>
          
          {/* Mobile sidebar footer */}
          <div className="p-4 border-t border-gray-200/50">
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">System Online</p>
                <p className="text-xs text-gray-500">All services running</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col z-40">
        <div className="flex flex-col flex-grow bg-white/80 backdrop-blur-xl shadow-2xl border-r border-white/20">
          <div className="flex h-20 items-center px-6 border-b border-gray-200/50">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg ring-2 ring-white/20">
                <HomeIconSolid className="h-6 w-6 text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Healthcare Rota</h1>
                <p className="text-xs text-gray-500 font-medium">AI-Powered System</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 space-y-2 px-4 py-6">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className={`group flex items-center w-full px-4 py-3 text-sm font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                  item.current
                    ? `bg-gradient-to-r ${item.color} text-white shadow-xl shadow-blue-500/25`
                    : 'text-gray-700 hover:bg-white/60 hover:text-gray-900 hover:shadow-lg'
                }`} />
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white/95 backdrop-blur-sm shadow-2xl border-r border-gray-200">
          <div className="flex h-16 items-center px-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                <HomeIcon className="h-5 w-5 text-white" />
              </div>
              <h1 className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Healthcare Rota</h1>
            </div>
          </div>
          <nav className="flex-1 space-y-1 px-4 py-4">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className={`group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  item.current
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
                aria-current={item.current ? 'page' : undefined}
      {/* Main content */}
      <div className="lg:pl-72 relative z-10">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-lg">
          <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700 transition-colors duration-200 p-2 rounded-xl hover:bg-white/50"
                aria-label="Open sidebar"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
              <div className="hidden sm:block ml-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {navigation.find(item => item.href === location.pathname)?.name || 'Dashboard'}
                </h2>
                <p className="text-sm text-gray-500 font-medium">Healthcare Rota Management</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              {/* Search bar */}
              <div className="hidden md:block relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-64 pl-10 pr-3 py-2 border border-gray-200 rounded-xl leading-5 bg-white/50 backdrop-blur-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Search..."
                />
              </div>
              
              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 rounded-xl hover:bg-white/50">
                <BellIcon className="h-6 w-6" />
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
              </button>
              
              {/* Settings */}
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 rounded-xl hover:bg-white/50">
                <Cog6ToothIcon className="h-6 w-6" />
              </button>
              
              {/* Status indicator */}
              <div className="flex items-center space-x-3 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-full border border-green-200/50 shadow-sm">
                <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-700 font-semibold">System Online</span>
              </div>
              
              {/* AI indicator */}
              <div className="hidden lg:flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-2 rounded-full border border-blue-200/50">
                <SignalIcon className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-700 font-semibold">AI-Powered</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-8 relative">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 min-h-[calc(100vh-12rem)]">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/upload" element={<DataUpload />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/patients" element={<Patients />} />
                <Route path="/assignments" element={<Assignments />} />
                <Route path="/create-assignment" element={<CreateAssignment />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
