import React, { useState } from 'react';
import type { UserRole } from '../types';
import AuthLayout from './AuthLayout';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import { UserIcon } from './icons/UserIcon';
import { AcademicCapIcon } from './icons/AcademicCapIcon';
import { BuildingOfficeIcon } from './icons/BuildingOfficeIcon';

interface RegisterPageProps {
  onRegister: (name: string, email: string, password: string, role: UserRole) => boolean;
  onNavigate: () => void;
  onBack: () => void;
}

const ROLES: { role: UserRole; name: string; icon: React.FC<React.SVGProps<SVGSVGElement>> }[] = [
  { role: 'student', name: 'Student', icon: UserIcon },
  { role: 'teacher', name: 'Teacher', icon: AcademicCapIcon },
  { role: 'hod', name: 'HOD', icon: AcademicCapIcon },
  { role: 'pto', name: 'Placement Officer', icon: BuildingOfficeIcon },
];

const RegisterPage: React.FC<RegisterPageProps> = ({ onRegister, onNavigate, onBack }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole | ''>('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
      setError('Please select a role.');
      return;
    }
    const success = onRegister(name, email, password, selectedRole);
    if (!success) {
      setError('An account with this email already exists.');
    }
  };

  return (
    <AuthLayout title="Create Your Account" subtitle="Join our network of students and employers." onBack={onBack}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm" role="alert">
            {error}
          </div>
        )}
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
          <input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} className="mt-1 appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
          <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
          <input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
        </div>

        <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Select Your Role</label>
            <div className="grid grid-cols-2 gap-3">
                {ROLES.map(({ role, name, icon: Icon }) => (
                    <button
                        type="button"
                        key={role}
                        onClick={() => setSelectedRole(role)}
                        className={`p-3 rounded-md border-2 flex flex-col items-center justify-center space-y-2 transition-colors ${selectedRole === role ? 'bg-primary-50 border-primary-500' : 'bg-white border-slate-300 hover:bg-slate-50'}`}
                    >
                       <Icon className={`w-6 h-6 ${selectedRole === role ? 'text-primary-600' : 'text-slate-500'}`} />
                       <span className={`text-sm font-semibold ${selectedRole === role ? 'text-primary-700' : 'text-slate-800'}`}>{name}</span>
                    </button>
                ))}
            </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Sign Up <ArrowRightIcon className="w-5 h-5 ml-2" />
          </button>
        </div>
      </form>
       <div className="mt-6 text-center">
        <p className="text-sm text-slate-600">
          Already have an account?{' '}
          <button onClick={onNavigate} className="font-medium text-primary-600 hover:text-primary-500">
            Log in
          </button>
        </p>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
