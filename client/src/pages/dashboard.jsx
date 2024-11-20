import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { 
    LayoutDashboard, 
    UserCircle, 
    Settings, 
    LineChart, 
    Users, 
    FolderKanban 
} from 'lucide-react'

const Dashboard = () => {
    const navItems = [
        { 
            path: '/dashboard', 
            label: 'Dashboard', 
            icon: <LayoutDashboard className="w-5 h-5" /> 
        },
        { 
            path: '/dashboard/profile', 
            label: 'Profile', 
            icon: <UserCircle className="w-5 h-5" /> 
        },
        { 
            path: '/dashboard/settings', 
            label: 'Settings', 
            icon: <Settings className="w-5 h-5" /> 
        },
        { 
            path: '/dashboard/analytics', 
            label: 'Analytics', 
            icon: <LineChart className="w-5 h-5" /> 
        },
        { 
            path: '/dashboard/users', 
            label: 'Users', 
            icon: <Users className="w-5 h-5" /> 
        },
        { 
            path: '/dashboard/projects', 
            label: 'Projects', 
            icon: <FolderKanban className="w-5 h-5" /> 
        }
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md">
                <div className="p-4">
                    <h1 className="text-xl font-bold">Your App</h1>
                </div>
                <nav className="mt-4">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-4 py-2 transition-colors ${
                                    isActive 
                                        ? 'bg-blue-50 text-blue-600' 
                                        : 'text-gray-600 hover:bg-gray-50'
                                }`
                            }
                            end={item.path === '/dashboard'}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-auto p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default Dashboard;