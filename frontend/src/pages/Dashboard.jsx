import { useEffect } from 'react';
import useStore from '../store/useStore';
import { 
  UserGroupIcon, 
  UserIcon, 
  ClipboardDocumentListIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  CheckCircleIcon,
  SparklesIcon,
  PlusCircleIcon,
  CloudArrowUpIcon,
  ChartBarIcon,
  BoltIcon,
  StarIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';
import { 
  UserGroupIcon as UserGroupIconSolid,
  UserIcon as UserIconSolid,
  ClipboardDocumentListIcon as ClipboardDocumentListIconSolid,
  ExclamationTriangleIcon as ExclamationTriangleIconSolid
} from '@heroicons/react/24/solid';

function Dashboard() {
  const { 
    employees, 
    patients, 
    assignments, 
    fetchEmployees, 
    fetchPatients, 
    fetchAssignments,
    loading 
  } = useStore();

  useEffect(() => {
    fetchEmployees();
    fetchPatients();
    fetchAssignments();
  }, []);

  const stats = [
    {
      name: 'Total Employees',
      value: employees.length,
      icon: UserGroupIcon,
      iconSolid: UserGroupIconSolid,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'from-blue-50 to-indigo-50',
      textColor: 'text-blue-600',
      change: '+12%',
      changeType: 'increase'
    },
    {
      name: 'Total Patients',
      value: patients.length,
      icon: UserIcon,
      iconSolid: UserIconSolid,
      color: 'from-emerald-500 to-green-600',
      bgColor: 'from-emerald-50 to-green-50',
      textColor: 'text-emerald-600',
      change: '+8%',
      changeType: 'increase'
    },
    {
      name: 'Active Assignments',
      value: assignments.length,
      icon: ClipboardDocumentListIcon,
      iconSolid: ClipboardDocumentListIconSolid,
      color: 'from-purple-500 to-violet-600',
      bgColor: 'from-purple-50 to-violet-50',
      textColor: 'text-purple-600',
      change: '+24%',
      changeType: 'increase'
    },
    {
      name: 'Pending Assignments',
      value: Math.max(0, patients.length - assignments.length),
      icon: ExclamationTriangleIcon,
      iconSolid: ExclamationTriangleIconSolid,
      color: 'from-amber-500 to-orange-600',
      bgColor: 'from-amber-50 to-orange-50',
      textColor: 'text-amber-600',
      change: '-15%',
      changeType: 'decrease'
    }
  ];

  const recentAssignments = assignments.slice(0, 5);
  const pendingCount = Math.max(0, patients.length - assignments.length);

  return (
    <div className="space-y-10 fade-in">
      {/* Welcome Section */}
      <div className="text-center mb-12 slide-up">
        <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6 hover-lift glow">
          <SparklesIcon className="h-10 w-10 text-white" />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <StarIcon className="h-3 w-3 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-3">
          Welcome to Healthcare Rota
        </h1>
        <p className="text-xl text-gray-600 font-medium">AI-Powered Staff Assignment System</p>
        <div className="mt-4 inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-full border border-blue-200/50">
          <BoltIcon className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-semibold text-blue-700">Intelligent • Efficient • Reliable</span>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div 
            key={stat.name} 
            className="group relative bg-gradient-to-br from-white to-gray-50/50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/60 card-hover overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Background decoration */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-50`}></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            
            <div className="relative p-8">
              <div className="flex items-center">
                <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center shadow-xl hover-lift group-hover:scale-110 transition-transform duration-300`}>
                  <stat.iconSolid className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <div className="ml-6 flex-1">
                  <p className="text-sm font-semibold text-gray-500 truncate uppercase tracking-wide">
                    {stat.name}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {loading ? (
                      <div className="shimmer h-10 w-20 rounded-lg"></div>
                    ) : (
                      stat.value
                    )}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r ${stat.bgColor} ${stat.textColor} border border-current/20`}>
                  <div className="w-2 h-2 bg-current rounded-full mr-2 animate-pulse"></div>
                  Active
                </div>
                <div className={`flex items-center text-sm font-semibold ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <ArrowTrendingUpIcon className={`h-4 w-4 mr-1 ${
                    stat.changeType === 'decrease' ? 'rotate-180' : ''
                  }`} />
                  {stat.change}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-8 border border-blue-200/50 card-hover shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900 flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
              <SparklesIcon className="h-5 w-5 text-white" />
            </div>
            Quick Actions
          </h3>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <TrophyIcon className="h-4 w-4" />
            <span className="font-medium">Boost Productivity</span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <button className="group relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 btn-press overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <div className="relative flex items-center justify-center">
              <ClockIcon className="h-6 w-6 mr-3" />
              <span className="font-semibold">Generate Weekly Rota</span>
            </div>
          </button>
          <button className="group relative bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 py-4 rounded-2xl hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 btn-press overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <div className="relative flex items-center justify-center">
              <PlusCircleIcon className="h-6 w-6 mr-3" />
              <span className="font-semibold">Create Assignment</span>
            </div>
          </button>
          <button className="group relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 btn-press overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <div className="relative flex items-center justify-center">
              <CloudArrowUpIcon className="h-6 w-6 mr-3" />
              <span className="font-semibold">Upload New Data</span>
            </div>
          </button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Recent Assignments */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/60 card-hover">
            <div className="px-8 py-6 border-b border-gray-200/50">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mr-3">
                    <ClipboardDocumentListIcon className="h-5 w-5 text-white" />
                  </div>
                  Recent Assignments
                </h3>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <ChartBarIcon className="h-4 w-4" />
                  <span className="font-medium">Live Updates</span>
                </div>
              </div>
            </div>
            <div className="divide-y divide-gray-100/50">
              {loading ? (
                <div className="p-12 text-center">
                  <div className="loading-spinner h-12 w-12 mx-auto mb-4"></div>
                  <p className="text-gray-500 font-medium">Loading assignments...</p>
                </div>
              ) : recentAssignments.length > 0 ? (
                recentAssignments.map((assignment, index) => (
                  <div key={index} className="px-8 py-6 hover:bg-gray-50/50 transition-colors duration-300 slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center hover-lift shadow-lg">
                            <UserIcon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="text-lg font-bold text-gray-900">
                              {assignment.employee_name} → {assignment.patient_name}
                            </p>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className="text-sm text-gray-500 font-medium">
                                {assignment.service_type} • {assignment.assigned_time}
                              </span>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                <CheckCircleIcon className="h-3 w-3 mr-1" />
                                Active
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                            <span className="text-lg font-bold text-white">
                              {assignment.priority_score}/10
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1 font-medium">Priority</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-8 py-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <ClipboardDocumentListIcon className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-lg font-medium">No assignments yet</p>
                  <p className="text-gray-400 text-sm mt-1">Create your first assignment to get started</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* System Status */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/60 p-8 card-hover">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mr-3">
                <CheckCircleIcon className="h-5 w-5 text-white" />
              </div>
              System Status
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-green-50 border border-green-200">
                <span className="text-sm font-semibold text-gray-700">Database Connection</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 status-pulse"></div>
                  Connected
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50 border border-blue-200">
                <span className="text-sm font-semibold text-gray-700">AI Service</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 status-pulse"></div>
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-purple-50 border border-purple-200">
                <span className="text-sm font-semibold text-gray-700">Data Processing</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-300">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 status-pulse"></div>
                  Ready
                </span>
              </div>
            </div>
          </div>

          {/* Pending Tasks */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/60 p-8 card-hover">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl flex items-center justify-center mr-3">
                <ExclamationTriangleIcon className="h-5 w-5 text-white" />
              </div>
              Pending Tasks
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50 border border-amber-200">
                <span className="text-sm font-semibold text-gray-700">Unassigned Patients</span>
                <span className="text-lg font-bold text-amber-600">
                  {loading ? (
                    <div className="shimmer h-6 w-8 rounded"></div>
                  ) : (
                    pendingCount
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50 border border-blue-200">
                <span className="text-sm font-semibold text-gray-700">Weekly Rota Due</span>
                <span className="text-lg font-bold text-blue-600">2 days</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-green-50 border border-green-200">
                <span className="text-sm font-semibold text-gray-700">Data Updates</span>
                <span className="text-lg font-bold text-green-600">Current</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
