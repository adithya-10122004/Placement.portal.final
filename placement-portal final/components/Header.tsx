import React from 'react';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import type { User, UserRole } from '../types';

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const roleDisplayNames: Record<UserRole, string> = {
    student: 'Student',
    teacher: 'Teacher',
    hod: 'HOD',
    pto: 'Placement Officer',
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <BriefcaseIcon className="w-8 h-8 text-primary-600" />
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              Placement Portal
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-right">
              <div className="font-semibold text-slate-800">{user.name}</div>
              <div className="text-slate-600">{roleDisplayNames[user.role]}</div>
            </div>
            <button
              onClick={onLogout}
              className="px-3 py-2 text-sm font-medium text-primary-600 bg-primary-100 rounded-md hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;