import UserMenu from '@/app/components/dashboard/UserMenu'
import { ReactNode } from "react";
import {
  Home,
  Gitlab,
  Dumbbell,
  Utensils,
  Trophy,
  Users,
} from "lucide-react";

import HorseHeadIcon from '@/app/components/icons/HorseHeadIcon';

export const metadata = {
  title: "Happy Horsing",
  description: "Pferde-Community und Trainings-App",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
        <main className="min-h-screen flex flex-col">
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <section className="flex-1 p-4 overflow-y-auto">{children}</section>
          </div>
        </main>
  );
}

function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-4 shadow">
      <h1 className="text-xl font-bold">Happy Horsing</h1>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Suche..."
          className="border rounded px-2 py-1"
        />
        <UserMenu />
      </div>
    </header>
  );
}

function Sidebar() {
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <Home size={20} /> },
    { name: "Meine Pferde", path: "/dashboard/pferde", icon: <HorseHeadIcon/> },
    { name: "Training", path: "/dashboard/training", icon: <Dumbbell size={20} /> },
    { name: "Ernährung", path: "/dashboard/ernaehrung", icon: <Utensils size={20} /> },
    { name: "Turniere", path: "/dashboard/turniere", icon: <Trophy size={20} /> },
    { name: "Community", path: "/dashboard/community", icon: <Users size={20} /> },
  ];

  return (
    <aside className="group w-16 hover:w-48 transition-all duration-200 border-r p-2 overflow-hidden">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <a
            key={item.path}
            href={item.path}
            className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-100 text-sm"
          >
            <span>{item.icon}</span>
            <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {item.name}
            </span>
          </a>
        ))}
      </nav>
    </aside>
  );
}
