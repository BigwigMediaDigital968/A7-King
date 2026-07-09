'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    Edit,
    PlusCircle,
    HelpCircle,
    User,
    Contact,
    BarChart3,
    Menu,
    X,
    ChevronDown,
    ChevronUp,
    LogOut,
    UserCircle,
    Gamepad2
} from 'lucide-react';
import AdminGuard from './AdminGuard';
import { Toaster, toast } from 'react-hot-toast';
import Link from 'next/link';

interface LayoutProps {
    children: React.ReactNode;
}

interface SubMenuItem {
    name: string;
    href: string;
}

interface MenuItem {
    name: string;
    icon: React.ReactNode;
    href?: string;
    subMenu?: SubMenuItem[];
}

export default function AdminLayout({ children }: LayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false); // Top profile dropdown state
    const profileRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const router = useRouter();

    // Close profile dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const menuItems: MenuItem[] = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/admin' },
        { name: 'Top Edit', icon: <Edit size={20} />, href: '/admin/#' },
        {
            name: 'Add Satta',
            icon: <PlusCircle size={20} />,
            subMenu: [
                { name: 'All Satta Games', href: '/admin/game' },
                { name: 'Add New Satta', href: '/admin/game/new' },
                { name: 'All Results', href: '/admin/results' },
                { name: 'Add New Result', href: '/admin/results/new' },
            ]
        },
        { name: 'FAQ', icon: <HelpCircle size={20} />, href: '/admin/#' },
        { name: 'Edit Khaiwal Data', icon: <User size={20} />, href: '/admin/#' },
        { name: 'Edit Contact Data', icon: <Contact size={20} />, href: '/admin/#' },
        { name: 'Yearly Chart', icon: <BarChart3 size={20} />, href: '/admin/#' },
    ];

    const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(() => {
        const initialStates: Record<string, boolean> = {};
        menuItems.forEach((item) => {
            if (item.subMenu?.some(sub => pathname === sub.href)) {
                initialStates[item.name] = true;
            }
        });
        return initialStates;
    });

    const toggleDropdown = (name: string) => {
        setOpenDropdowns(prev => ({ ...prev, [name]: !prev[name] }));
    };

    const handleNavigation = (href: string) => {
        router.push(href);
        setIsSidebarOpen(false);
        setIsProfileOpen(false);
    };

    const handleLogout = () => {
        toast.success('Logged out successfully');

        window.localStorage.removeItem('isAdmin'); // Clear admin status
        // Handle your actual logout logic here (clear cookies/tokens)
        router.push('/admin-login');
    };

    return (
        <>
            <Toaster position="top-center" />
            <AdminGuard>
                <div className="min-h-screen bg-gray-100 font-sans flex flex-col text-slate-800">

                    {/* --- TOP NAVBAR --- */}
                    <header className="bg-[#1f2937] text-white h-16 fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 shadow-md">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="p-2 rounded-md hover:bg-gray-700 md:hidden transition-colors"
                                aria-label="Toggle Sidebar"
                            >
                                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>

                            <Link href="/admin" className="font-semibold text-lg tracking-wide text-gray-200 sm:block hidden">
                                A7 SATTA KING
                            </Link>
                        </div>

                        {/* --- TOP RIGHT PROFILE DROPDOWN --- */}
                        <div className="relative" ref={profileRef}>
                            <button 
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="cursor-pointer flex items-center gap-2 p-1.5 rounded-md hover:bg-gray-700 transition-colors focus:outline-none"
                            >
                                <UserCircle size={24} className="text-gray-300" />
                                <span className="text-sm font-medium hidden sm:inline">Admin</span>
                                <ChevronDown size={14} className={`text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-700 border border-gray-200 z-50">
                                    <button
                                        onClick={() => handleNavigation('/admin/profile')}
                                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
                                    >
                                        <User size={16} /> My Profile
                                    </button>
                                    <hr className="my-1 border-gray-200" />
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                    >
                                        <LogOut size={16} /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </header>

                    <div className="flex flex-1 pt-16">
                        {/* --- SIDEBAR --- */}
                        {isSidebarOpen && (
                            <div
                                className="fixed inset-0 bg-black/40 z-40 md:hidden"
                                onClick={() => setIsSidebarOpen(false)}
                            />
                        )}

                        <aside className={`
                            fixed md:sticky top-16 left-0 bottom-0 z-40
                            w-64 bg-[#2d3748] text-gray-300 flex flex-col justify-between
                            transform transition-transform duration-300 ease-in-out
                            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                            md:translate-x-0 md:h-[calc(100vh-64px)]
                        `}>
                            {/* Navigation Links Area */}
                            <nav className="flex-1 py-4 overflow-y-auto custom-scrollbar">
                                <ul className="space-y-1">
                                    {menuItems.map((item, index) => {
                                        const isSimpleActive = item.href && pathname === item.href;
                                        const isSubMenuActive = item.subMenu?.some(sub => pathname === sub.href);
                                        const isDropdownOpen = !!openDropdowns[item.name];

                                        return (
                                            <li key={index}>
                                                <div 
                                                    onClick={() => {
                                                        if (item.subMenu) {
                                                            toggleDropdown(item.name);
                                                        } else if (item.href) {
                                                            handleNavigation(item.href);
                                                        }
                                                    }}
                                                    className={`
                                                        flex items-center justify-between px-4 py-3 cursor-pointer transition-colors
                                                        ${isSimpleActive ? 'bg-[#e11d48] text-white font-medium' : 'hover:bg-[#1a202c] hover:text-white'}
                                                        ${isSubMenuActive && !isDropdownOpen ? 'border-r-4 border-[#e11d48] bg-[#1f2937]' : ''}
                                                    `}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        {item.icon}
                                                        <span className="text-sm">{item.name}</span>
                                                    </div>
                                                    {item.subMenu && (
                                                        <div className="text-gray-400">
                                                            {isDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                                        </div>
                                                    )}
                                                </div>

                                                {item.subMenu && isDropdownOpen && (
                                                    <ul className="bg-[#1a202c] py-1 border-l-2 border-gray-600 ml-4 my-1 space-y-0.5">
                                                        {item.subMenu.map((sub, subIdx) => {
                                                            const isChildActive = pathname === sub.href;
                                                            return (
                                                                <li
                                                                    key={subIdx}
                                                                    onClick={() => handleNavigation(sub.href)}
                                                                    className={`px-6 py-2 text-xs cursor-pointer rounded-l-md transition-colors block
                                                                        ${isChildActive 
                                                                            ? 'text-white font-semibold bg-[#e11d48]/20 border-l-2 border-[#e11d48]' 
                                                                            : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                                                        }
                                                                    `}
                                                                >
                                                                    {sub.name}
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </nav>

                            {/* --- SIDEBAR BOTTOM FIXED LOGOUT BUTTON --- */}
                            <div className="p-4 border-t border-gray-700 bg-[#1f2937]">
                                <button
                                    onClick={handleLogout}
                                    className="cursor-pointer w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-rose-400 hover:text-white hover:bg-rose-600/20 rounded-md border border-rose-500/30 hover:border-rose-500 transition-all duration-200"
                                >
                                    <LogOut size={18} />
                                    <span>Logout Account</span>
                                </button>
                            </div>
                        </aside>

                        {/* --- MAIN CONTENT WINDOW --- */}
                        <main className="flex-1 p-6 md:p-6 bg-[#f3f4f6] min-h-[calc(100vh-64px)] w-full overflow-x-hidden">
                            <div className="max-w-8xl mx-auto">
                                {children}
                            </div>
                        </main>
                    </div>
                </div>
            </AdminGuard>
        </>
    );
}