import Sidebar from "@/components/Sidebar";
import '@/app/globals.css';

import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-60 bg-gray-800 text-white">
                <Sidebar />
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4">
                {children}
            </main>
        </div>
    );
};

export default Layout;
