import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '@/components/layout/Sidebar';
import SidebarDesk from '@/components/layout/Sidebar/SidebarDesk';
import HeaderMobile from '@/components/layout/Header/HeaderMobile';
import {
  Calendar,
  Clock,
  Plus,
  Bell,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  BookOpen,
  AlertCircle,
  Filter,
  Search,
  Repeat,
  BellRing,
} from 'lucide-react';

// Types
interface StudyBoard {
  id: string;
  title: string;
  icon: string;
  color: string;
}

interface StudySession {
  id: string;
  boardId: string;
  boardTitle: string;
  boardIcon: string;
  boardColor: string;
  date: string;
  time: string;
  duration: number;
  reminder: boolean;
  reminderTime: number;
  repeat: 'none' | 'daily' | 'weekly' | 'monthly';
  notes?: string;
  completed: boolean;
}

// Mock Study Boards
const mockBoards: StudyBoard[] = [
  { id: '1', title: 'Cellular Biology', icon: '🧬', color: '#c4b5fd' },
  { id: '2', title: 'Calculus', icon: '📐', color: '#93c5fd' },
  { id: '3', title: 'World History', icon: '🏛️', color: '#fca5a5' },
  { id: '4', title: 'Physics', icon: '⚛️', color: '#a3e635' },
  { id: '5', title: 'Literature', icon: '📚', color: '#fbbf24' },
];

const StudyPlanner = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [showNewSessionModal, setShowNewSessionModal] = useState(false);
  const [editingSession, setEditingSession] = useState<StudySession | null>(null);
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [notificationPermission, setNotificationPermission] =
    useState<NotificationPermission>('default');

  // Form state
  const [formData, setFormData] = useState({
    boardId: '',
    date: '',
    time: '',
    duration: 60,
    reminder: true,
    reminderTime: 15,
    repeat: 'none' as 'none' | 'daily' | 'weekly' | 'monthly',
    notes: '',
  });

  console.log('heeeeeeeeeeee');
  // Request notification permission
  useEffect(() => {
    console.log('YUOOO');
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
      console.log('Notification permission:', Notification.permission);
      if (Notification.permission === 'default') {
        Notification.requestPermission().then((permission) => {
          setNotificationPermission(permission);
        });
      }
    }
  });

  // Check for upcoming sessions and send notifications
  useEffect(() => {
    const checkNotifications = () => {
      const now = new Date();

      sessions.forEach((session) => {
        if (!session.completed && session.reminder) {
          const sessionDateTime = new Date(`${session.date}T${session.time}`);
          const reminderTime = new Date(sessionDateTime.getTime() - session.reminderTime * 60000);

          // Check if it's time to send reminder
          if (now >= reminderTime && now < sessionDateTime) {
            sendNotification(session);
          }
        }
      });
    };

    const interval = setInterval(checkNotifications, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [sessions]);

  const sendNotification = (session: StudySession) => {
    if (notificationPermission === 'granted') {
      new Notification('StudyRok Reminder', {
        body: `Time to study ${session.boardTitle}! Session starts in ${session.reminderTime} minutes.`,
        icon: session.boardIcon,
        badge: session.boardIcon,
        tag: session.id,
        requireInteraction: true,
      });
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Previous month days
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const getSessionsForDate = (date: Date | null) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    return sessions.filter((session) => session.date === dateStr);
  };

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleAddSession = () => {
    setFormData({
      boardId: '',
      date: selectedDate.toISOString().split('T')[0],
      time: '',
      duration: 60,
      reminder: true,
      reminderTime: 15,
      repeat: 'none',
      notes: '',
    });
    setEditingSession(null);
    setShowNewSessionModal(true);
  };

  const handleEditSession = (session: StudySession) => {
    const board = mockBoards.find((b) => b.id === session.boardId);
    setFormData({
      boardId: session.boardId,
      date: session.date,
      time: session.time,
      duration: session.duration,
      reminder: session.reminder,
      reminderTime: session.reminderTime,
      repeat: session.repeat,
      notes: session.notes || '',
    });
    setEditingSession(session);
    setShowNewSessionModal(true);
  };

  const handleDeleteSession = (sessionId: string) => {
    setSessions(sessions.filter((s) => s.id !== sessionId));
  };

  const handleToggleComplete = (sessionId: string) => {
    setSessions(sessions.map((s) => (s.id === sessionId ? { ...s, completed: !s.completed } : s)));
  };

  const handleSaveSession = () => {
    if (!formData.boardId || !formData.date || !formData.time) {
      alert('Please fill in all required fields');
      return;
    }

    const board = mockBoards.find((b) => b.id === formData.boardId);
    if (!board) return;

    const sessionData: StudySession = {
      id: editingSession?.id || `session-${Date.now()}`,
      boardId: formData.boardId,
      boardTitle: board.title,
      boardIcon: board.icon,
      boardColor: board.color,
      date: formData.date,
      time: formData.time,
      duration: formData.duration,
      reminder: formData.reminder,
      reminderTime: formData.reminderTime,
      repeat: formData.repeat,
      notes: formData.notes,
      completed: editingSession?.completed || false,
    };

    if (editingSession) {
      setSessions(sessions.map((s) => (s.id === editingSession.id ? sessionData : s)));
    } else {
      setSessions([...sessions, sessionData]);
    }

    setShowNewSessionModal(false);
    setFormData({
      boardId: '',
      date: '',
      time: '',
      duration: 60,
      reminder: true,
      reminderTime: 15,
      repeat: 'none',
      notes: '',
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelectedDate = (date: Date | null) => {
    if (!date) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const selectedDateSessions = getSessionsForDate(selectedDate);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <SidebarDesk />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64 min-h-screen">
        <HeaderMobile onOpen={() => setSidebarOpen(true)} />

        {/* Page Container */}
        <div className="flex-1 p-4 lg:p-8 ">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5 md:p-7 mb-8">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    Study Planner
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    Schedule and manage your study sessions
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddSession}
                  className="flex items-center gap-2 px-4 md:px-6 py-3 bg-purple-600 hover:bg-purple-700 
                       text-white rounded-xl font-semibold shadow transition"
                >
                  <Plus className="w-5 h-5" />
                  <span className="hidden md:inline">New Session</span>
                </motion.button>
              </div>

              {/* Toggle Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    viewMode === 'calendar'
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Calendar
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    viewMode === 'list'
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  List
                </button>
              </div>
            </div>

            {/* MAIN VIEW */}
            <main className="space-y-8">
              {viewMode === 'calendar' ? (
                /* ────────────── CALENDAR VIEW ────────────── */
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* CALENDAR */}
                  <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
                      {/* Calendar Header */}
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {currentDate.toLocaleDateString('en-US', {
                            month: 'long',
                            year: 'numeric',
                          })}
                        </h2>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={handlePreviousMonth}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>

                          <button
                            onClick={() => {
                              setCurrentDate(new Date());
                              setSelectedDate(new Date());
                            }}
                            className="px-4 py-2 text-sm font-semibold text-purple-600 hover:bg-purple-50 
                                 dark:text-purple-400 dark:hover:bg-gray-700 rounded-lg"
                          >
                            Today
                          </button>

                          <button
                            onClick={handleNextMonth}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Week Days */}
                      <div className="grid grid-cols-7 gap-2 mb-2">
                        {weekDays.map((day) => (
                          <div
                            key={day}
                            className="text-center text-sm font-semibold text-gray-600 dark:text-gray-300 py-2"
                          >
                            {day}
                          </div>
                        ))}
                      </div>

                      {/* Calendar Days */}
                      <div className="grid grid-cols-7 gap-2">
                        {days.map((date, index) => {
                          const sessionsForDay = getSessionsForDate(date);

                          return (
                            <motion.button
                              key={index}
                              whileHover={{ scale: date ? 1.05 : 1 }}
                              whileTap={{ scale: date ? 0.95 : 1 }}
                              disabled={!date}
                              onClick={() => date && handleDateClick(date)}
                              className={`aspect-square p-2 rounded-xl relative transition ${
                                !date
                                  ? 'opacity-0'
                                  : isToday(date)
                                    ? 'bg-purple-600 text-white font-bold'
                                    : isSelectedDate(date)
                                      ? 'bg-purple-100 text-purple-900 font-bold ring-2 ring-purple-500'
                                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-200'
                              }`}
                            >
                              {date && (
                                <>
                                  <span>{date.getDate()}</span>

                                  {/* Dots */}
                                  {sessionsForDay.length > 0 && (
                                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
                                      {sessionsForDay.slice(0, 3).map((s, i) => (
                                        <span
                                          key={i}
                                          className="w-1.5 h-1.5 rounded-full"
                                          style={{ backgroundColor: s.boardColor }}
                                        />
                                      ))}
                                    </div>
                                  )}
                                </>
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT PANEL */}
                  <div>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        {formatDate(selectedDate)}
                      </h3>

                      {selectedDateSessions.length === 0 ? (
                        <div className="text-center py-12">
                          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                          <p className="text-gray-500 dark:text-gray-400 mb-4">
                            No sessions scheduled
                          </p>
                          <button
                            onClick={handleAddSession}
                            className="text-purple-600 dark:text-purple-400 font-semibold hover:underline"
                          >
                            Add a session
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {/* LOOP SESSIONS */}
                          {selectedDateSessions.map((session) => (
                            <motion.div
                              key={session.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`p-4 rounded-xl border-2 ${
                                session.completed
                                  ? 'bg-green-50 border-green-200'
                                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                              }`}
                            ></motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* ────────────── LIST VIEW ────────────── */
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    All Sessions
                  </h2>

                  {/* ... LIST VIEW CONTENT ... */}
                </div>
              )}
            </main>

            {/* MODAL stays the same – only UI tweaks optional */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlanner;
