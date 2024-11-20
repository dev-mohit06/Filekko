import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import BackgroundDecorations from './background-decorations';
import { BookMarked, BookOpen, Clock, LogOut, Menu, Settings, Upload, User2, X } from 'lucide-react';
import logo from '../imgs/logo.svg';

const HomeLayout = () => {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Sidebar navigation items
    const sidebarNavigation = [
        { name: 'All Resources', icon: BookOpen, id: 'all', path: '/' },
        { name: 'My Uploads', icon: Upload, id: 'uploads', path: '/uploads' },
        { name: 'Bookmarked', icon: BookMarked, id: 'bookmarked', path: '/bookmarked' },
        { divider: true },
        { name: 'Settings', icon: Settings, id: 'settings', path: '/settings' },
        { name: 'Profile', icon: User2, id: 'profile', path: '/profile' },
        { name: 'Logout', icon: LogOut, id: 'logout', path: '/logout' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
            {/* Main Content */}
            <div className="flex h-screen">
                <BackgroundDecorations />
                {/* Sidebar */}
                <div className={`fixed lg:relative inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} bg-gray-900/50 backdrop-blur-xl border-r border-gray-800`}>
                    <div className="flex flex-col h-full">
                        {/* Sidebar Header */}
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <img src={logo} alt="Filekko logo" className="h-10 w-10" />
                                <h2 className="text-xl font-bold">Filekko</h2>
                            </div>
                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className="lg:hidden p-2 rounded-lg hover:bg-white/5"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Sidebar Navigation */}
                        <nav className="flex-1 px-2 py-4 space-y-1">
                            {sidebarNavigation.map((item, index) =>
                                item.divider ? (
                                    <hr key={index} className="my-4 border-gray-800" />
                                ) : (
                                    <Link to={item.path}
                                        key={item.id}
                                        onClick={() => setIsSidebarOpen(false)}
                                        className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${location.pathname === item.path
                                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                            }`}
                                    >
                                        <item.icon className="w-5 h-5 mr-3" />
                                        <span>{item.name}</span>
                                    </Link>
                                )
                            )}
                        </nav>
                    </div>
                </div>
                {/* Mobile Sidebar Toggle */}
                {
                    !isSidebarOpen ? <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="lg:hidden fixed bottom-4 left-4 z-40 p-3 rounded-full bg-purple-600 shadow-lg"
                    >
                        <Menu className="w-6 h-6" />
                    </button> : null
                }

                <Outlet />
            </div>
        </div>
    );
}

export default HomeLayout;