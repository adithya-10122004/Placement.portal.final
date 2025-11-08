
import React, { useState, useMemo } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import MainApp from './components/MainApp';
import type { UserRole, Application, User, Job } from './types';
import { USERS, JOBS } from './constants';
import { CheckCircleIcon } from './components/icons/CheckCircleIcon';
import { XIcon } from './components/icons/XIcon';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error';
}

const App: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [users, setUsers] = useState<User[]>(USERS);
  const [view, setView] = useState<'landing' | 'login' | 'register'>('landing');
  const [toasts, setToasts] = useState<Toast[]>([]);

  const jobsById = useMemo(() => JOBS.reduce((acc, job) => {
    acc[job.id] = job;
    return acc;
  }, {} as Record<number, Job>), []);

  const addToast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleLogin = (email: string, password: string): boolean => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (user) {
      setLoggedInUser(user);
      return true;
    }
    return false;
  };

  const handleRegister = (name: string, email: string, password: string, role: UserRole): boolean => {
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return false; // User already exists
    }
    const newUser: User = {
      id: Date.now(),
      name,
      email,
      password,
      role,
      ... (role === 'student' && { department: 'Not Specified' }) // Add department for students
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setLoggedInUser(newUser);
    return true;
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setView('landing');
  };

  const handleApply = (applicationData: Omit<Application, 'jobId' | 'id' | 'studentId'>, jobId: number) => {
    if (loggedInUser && loggedInUser.role === 'student') {
      const newApplication: Application = {
        ...applicationData,
        jobId: jobId,
        studentId: loggedInUser.id,
        id: Date.now(), // Simple unique ID
      };
      setApplications(prev => [...prev, newApplication]);
      const job = jobsById[jobId];
      if (job) {
        addToast(`Application for '${job.title}' submitted! A confirmation email has been sent to ${loggedInUser.email}.`);
      }
    }
  };

  const renderView = () => {
    if (loggedInUser) {
      return (
        <MainApp 
          loggedInUser={loggedInUser} 
          onLogout={handleLogout} 
          applications={applications}
          onApply={handleApply}
          users={users}
        />
      );
    }

    switch (view) {
      case 'login':
        return <LoginPage onLogin={handleLogin} onNavigate={() => setView('register')} onBack={() => setView('landing')} />;
      case 'register':
        return <RegisterPage onRegister={handleRegister} onNavigate={() => setView('login')} onBack={() => setView('landing')} />;
      case 'landing':
      default:
        return <LandingPage onLoginClick={() => setView('login')} onRegisterClick={() => setView('register')} />;
    }
  };

  return (
    <>
      {renderView()}
      <div className="fixed top-5 right-5 z-[100] w-full max-w-sm space-y-3">
        {toasts.map((toast) => (
          <div key={toast.id} className="p-4 bg-white rounded-xl shadow-lg border border-slate-200 flex items-start space-x-3 animate-slide-in-right">
            {toast.type === 'success' && <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />}
            <div className="flex-1">
              <p className="font-semibold text-slate-800">
                {toast.type === 'success' ? 'Success' : 'Error'}
              </p>
              <p className="text-sm text-slate-600">{toast.message}</p>
            </div>
            <button onClick={() => removeToast(toast.id)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100 flex-shrink-0" aria-label="Close">
              <XIcon className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;