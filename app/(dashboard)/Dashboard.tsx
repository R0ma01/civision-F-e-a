'use client';
import React, { useEffect } from 'react';
import Carte from '@/components/component/carte/Carte';
import Sidebar from '@/components/component/sidebar/sidebar';
import MobileWarningPopup from '@/components/component/mobile-popup/mobile-popup';
import { usePathname } from 'next/navigation';

interface DashboardProps {
    children: any;
}

const Dashboard = ({ children }: DashboardProps) => {
    // useEffect(() => {
    //     const handleBeforeUnload = async (event: BeforeUnloadEvent) => {
    //         event.preventDefault();

    //         localStorage.setItem('isClosing', 'true');
    //         clearZustandStore();
    //         clearCookies();

    //         event.returnValue = ''; // Some browsers need this for confirmation
    //         return ''; // Detect if this is a refresh
    //     };

    //     const handleLoad = () => {
    //         const isClosing = localStorage.getItem('isClosing');
    //         localStorage.removeItem('isClosing'); // Reset flag on page load
    //     };

    //     window.addEventListener('beforeunload', handleBeforeUnload);
    //     window.addEventListener('load', handleLoad);

    //     return () => {
    //         window.removeEventListener('beforeunload', handleBeforeUnload);
    //         window.removeEventListener('load', handleLoad);
    //     };
    // }, [setUser]);

    const path = usePathname();

    return (
        <>
            <MobileWarningPopup />
            <div className="relative h-screen overflow-hidden">
                <div className="relative w-full h-full">
                    <div className="fixed top-0 left-0 w-full h-full">
                        {!path.startsWith('/login') &&
                            !path.startsWith('/signup') && <Carte />}
                    </div>
                    <div className="flex h-full absolute top-0">
                        {!path.startsWith('/login') &&
                            !path.startsWith('/signup') && <Sidebar />}
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;

// Helper to clear cookies
function clearCookies() {
    localStorage.removeItem('token');
    localStorage.removeItem('adminToken');
}

function clearZustandStore() {
    // Replace 'zustand_store_key' with the actual key used by Zustand in localStorage
    localStorage.removeItem('global-data-store');
    //localStorage.removeItem('global-page-store');
    localStorage.removeItem('global-user-store');
}
