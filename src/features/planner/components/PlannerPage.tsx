import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [showNewSessionModal, setShowNewSessionModal] = useState(false);
  const [editingSession, setEditingSession] = useState<StudySession | null>(null);
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');

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

  console.log('heeeeeeeeeeee')
  // Request notification permission
  useEffect(() => {
    console.log('YUOOO')
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
    setSessions(
      sessions.map((s) =>
        s.id === sessionId ? { ...s, completed: !s.completed } : s
      )
    );
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Study Planner</h1>
              <p className="text-gray-600 mt-1">Schedule and manage your study sessions</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddSession}
              className="flex items-center gap-2 px-4 md:px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden md:inline">New Session</span>
            </motion.button>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                viewMode === 'calendar'
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Calendar
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                viewMode === 'list'
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              List
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        {viewMode === 'calendar' ? (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-xl p-6">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {currentDate.toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePreviousMonth}
                      className="p-2 hover:bg-gray-100 rounded-lg transition"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        setCurrentDate(new Date());
                        setSelectedDate(new Date());
                      }}
                      className="px-4 py-2 text-sm font-semibold text-purple-600 hover:bg-purple-50 rounded-lg transition"
                    >
                      Today
                    </button>
                    <button
                      onClick={handleNextMonth}
                      className="p-2 hover:bg-gray-100 rounded-lg transition"
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
                      className="text-center text-sm font-semibold text-gray-600 py-2"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-2">
                  {days.map((date, index) => {
                    const daySessions = getSessionsForDate(date);
                    const hasSession = daySessions.length > 0;

                    return (
                      <motion.button
                        key={index}
                        whileHover={{ scale: date ? 1.05 : 1 }}
                        whileTap={{ scale: date ? 0.95 : 1 }}
                        onClick={() => date && handleDateClick(date)}
                        disabled={!date}
                        className={`aspect-square p-2 rounded-xl transition relative ${
                          !date
                            ? 'invisible'
                            : isToday(date)
                            ? 'bg-purple-600 text-white font-bold'
                            : isSelectedDate(date)
                            ? 'bg-purple-100 text-purple-900 font-bold ring-2 ring-purple-600'
                            : 'hover:bg-gray-100 text-gray-900'
                        }`}
                      >
                        {date && (
                          <>
                            <span className="text-sm md:text-base">{date.getDate()}</span>
                            {hasSession && (
                              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
                                {daySessions.slice(0, 3).map((session, i) => (
                                  <div
                                    key={i}
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{ backgroundColor: session.boardColor }}
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

            {/* Selected Date Sessions */}
            <div>
              <div className="bg-white rounded-3xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {formatDate(selectedDate)}
                </h3>

                {selectedDateSessions.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 mb-4">No sessions scheduled</p>
                    <button
                      onClick={handleAddSession}
                      className="text-purple-600 font-semibold hover:underline"
                    >
                      Add a session
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedDateSessions.map((session) => (
                      <motion.div
                        key={session.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-xl border-2 ${
                          session.completed
                            ? 'bg-green-50 border-green-200'
                            : 'bg-white border-gray-200'
                        }`}
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                            style={{ backgroundColor: session.boardColor }}
                          >
                            {session.boardIcon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4
                              className={`font-bold mb-1 ${
                                session.completed
                                  ? 'text-gray-500 line-through'
                                  : 'text-gray-900'
                              }`}
                            >
                              {session.boardTitle}
                            </h4>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {formatTime(session.time)}
                              </div>
                              <div>{session.duration} min</div>
                            </div>
                            {session.reminder && (
                              <div className="flex items-center gap-1 text-xs text-purple-600 mt-1">
                                <Bell className="w-3 h-3" />
                                Reminder {session.reminderTime}m before
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleComplete(session.id)}
                            className={`flex-1 px-3 py-2 rounded-lg font-semibold text-sm transition ${
                              session.completed
                                ? 'bg-gray-100 text-gray-600'
                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                            }`}
                          >
                            {session.completed ? 'Completed' : 'Mark Complete'}
                          </button>
                          <button
                            onClick={() => handleEditSession(session)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition"
                          >
                            <Edit2 className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            onClick={() => handleDeleteSession(session.id)}
                            className="p-2 hover:bg-red-100 rounded-lg transition"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          // List View
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">All Sessions</h2>
            
            {sessions.length === 0 ? (
              <div className="text-center py-20">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-6">No study sessions scheduled yet</p>
                <button
                  onClick={handleAddSession}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg"
                >
                  Schedule Your First Session
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {sessions
                  .sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime())
                  .map((session) => (
                    <motion.div
                      key={session.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-6 rounded-2xl border-2 flex items-center gap-4 ${
                        session.completed
                          ? 'bg-green-50 border-green-200'
                          : 'bg-white border-gray-200'
                      }`}
                    >
                      <div
                        className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                        style={{ backgroundColor: session.boardColor }}
                      >
                        {session.boardIcon}
                      </div>

                      <div className="flex-1">
                        <h3
                          className={`text-xl font-bold mb-2 ${
                            session.completed
                              ? 'text-gray-500 line-through'
                              : 'text-gray-900'
                          }`}
                        >
                          {session.boardTitle}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(session.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {formatTime(session.time)}
                          </div>
                          <div>{session.duration} minutes</div>
                          {session.reminder && (
                            <div className="flex items-center gap-1 text-purple-600">
                              <Bell className="w-4 h-4" />
                              {session.reminderTime}m reminder
                            </div>
                          )}
                          {session.repeat !== 'none' && (
                            <div className="flex items-center gap-1 text-blue-600">
                              <Repeat className="w-4 h-4" />
                              {session.repeat}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleComplete(session.id)}
                          className={`px-4 py-2 rounded-lg font-semibold transition ${
                            session.completed
                              ? 'bg-gray-100 text-gray-600'
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                        >
                          {session.completed ? 'Completed' : 'Complete'}
                        </button>
                        <button
                          onClick={() => handleEditSession(session)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition"
                        >
                          <Edit2 className="w-5 h-5 text-gray-600" />
                        </button>
                        <button
                          onClick={() => handleDeleteSession(session.id)}
                          className="p-2 hover:bg-red-100 rounded-lg transition"
                        >
                          <Trash2 className="w-5 h-5 text-red-600" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* New/Edit Session Modal */}
      <AnimatePresence>
        {showNewSessionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowNewSessionModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingSession ? 'Edit Session' : 'Schedule Study Session'}
                </h2>
                <button
                  onClick={() => setShowNewSessionModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Study Board Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Study Board *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {mockBoards.map((board) => (
                      <button
                        key={board.id}
                        onClick={() => setFormData({ ...formData, boardId: board.id })}
                        className={`p-4 rounded-xl border-2 transition ${
                          formData.boardId === board.id
                            ? 'border-purple-600 ring-2 ring-purple-300'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                        style={{
                          backgroundColor:
                            formData.boardId === board.id ? board.color : 'white',
                        }}
                      >
                        <div className="text-3xl mb-2">{board.icon}</div>
                        <div className="font-semibold text-sm text-gray-900">
                          {board.title}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date and Time */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Time *
                    </label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) =>
                        setFormData({ ...formData, time: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 outline-none transition"
                    />
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Duration (minutes)
                  </label>
                  <input
                    type="range"
                    min="15"
                    max="180"
                    step="15"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: Number(e.target.value) })
                    }
                    className="w-full"
                  />
                  <div className="text-center text-2xl font-bold text-purple-600 mt-2">
                    {formData.duration} min
                  </div>
                </div>

                {/* Reminder */}
                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.reminder}
                      onChange={(e) =>
                        setFormData({ ...formData, reminder: e.target.checked })
                      }
                      className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">Enable Reminder</div>
                      <div className="text-sm text-gray-600">
                        Get notified before your session starts
                      </div>
                    </div>
                  </label>

                  {formData.reminder && (
                    <div className="mt-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Remind me
                      </label>
                      <select
                        value={formData.reminderTime}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            reminderTime: Number(e.target.value),
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 outline-none transition"
                      >
                        <option value={5}>5 minutes before</option>
                        <option value={10}>10 minutes before</option>
                        <option value={15}>15 minutes before</option>
                        <option value={30}>30 minutes before</option>
                        <option value={60}>1 hour before</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Repeat */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Repeat
                  </label>
                  <select
                    value={formData.repeat}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        repeat: e.target.value as any,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 outline-none transition"
                  >
                    <option value="none">Does not repeat</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    rows={3}
                    placeholder="Add any notes or goals for this session..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 outline-none resize-none transition"
                  />
                </div>

                {/* Notification Permission Warning */}
                {notificationPermission !== 'granted' && formData.reminder && (
                  <div className="p-4 bg-orange-50 border-2 border-orange-200 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-semibold text-orange-900 mb-1">
                        Notifications Disabled
                      </div>
                      <p className="text-sm text-orange-700">
                        Please enable notifications to receive reminders.
                      </p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => setShowNewSessionModal(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveSession}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition"
                  >
                    {editingSession ? 'Update Session' : 'Schedule Session'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudyPlanner;