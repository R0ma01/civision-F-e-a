import Dashboard from './Dashboard';

interface DashboardProps {
    children: any;
}

export default async function DashboardLayout({ children }: DashboardProps) {
    return (
        <main className="w-full h-full bg-black font-sans">
            <Dashboard>{children}</Dashboard>
        </main>
    );
}
