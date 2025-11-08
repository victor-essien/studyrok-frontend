import { useState } from "react";
import {motion} from 'framer-motion'
import {
  Home,
  LayoutGrid,
  Clock,
  Calendar,
  Book,
  FileText,
  PenTool,
  Notebook,
  X,
} from "lucide-react";
import clsx from "clsx";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, darkMode }) => {
  const [active, setActive] = useState("Comp");

  const menuItems = [
    { name: "Home", icon: <Home size={18} /> },
    { name: "My Boards", icon: <LayoutGrid size={18} /> },
    { name: "My Sessions", icon: <Clock size={18} /> },
    { name: "Planner", icon: <Calendar size={18} /> },
    { name: "Comp", icon: <Book size={18} /> },
    { name: "Flashcards", icon: <FileText size={18} /> },
    { name: "RokQuiz", icon: <PenTool size={18} /> },
    { name: "Notes & Materials", icon: <Notebook size={18} /> },
  ];
//  <motion.aside
//           initial={false}
//           animate={{ x: sidebarOpen ? 0 : -320 }}
//           className="fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white shadow-xl lg:shadow-none"
//         ></motion.aside>
  return (
    <motion.aside
      initial={false}
      animate={{ x: isOpen ? 0 : -320 }}
      className={clsx(
        "fixed top-0 left-0 h-full w-64 shadow-lg transition-transform duration-300 ease-in-out z-50",
        isOpen ? "translate-x-0" : "-translate-x-full",
        darkMode ? "bg-black text-white" : "bg-white text-gray-800"
      )}
    >
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
            S
          </div>
          <h1 className="font-bold text-lg">Studyrok</h1>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <X size={18} />
        </button>
      </div>

      <nav className="mt-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActive(item.name)}
            className={clsx(
              "flex items-center gap-3 w-full px-4 py-2 text-sm font-medium rounded-md transition-colors",
              active === item.name
                ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-800 dark:text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
          >
            {item.icon}
            <span>{item.name}</span>
          </button>
        ))}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
