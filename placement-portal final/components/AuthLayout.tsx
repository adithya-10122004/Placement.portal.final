import React from 'react';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  onBack: () => void;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, subtitle, onBack, children }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans animate-fade-in">
       <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <BriefcaseIcon className="w-12 h-12 text-primary-600 mx-auto" />
            <h1 className="text-3xl font-extrabold text-slate-800 mt-2 tracking-tight">
              Placement Portal
            </h1>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 relative">
           <button 
                onClick={onBack} 
                className="absolute top-4 left-4 flex items-center text-sm font-semibold text-slate-500 hover:text-primary-600"
                aria-label="Go back"
            >
                <ChevronLeftIcon className="w-5 h-5 mr-1" />
                Back
            </button>

            <div className="text-center mb-6 pt-4">
                <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
                <p className="text-slate-500 mt-1">{subtitle}</p>
            </div>
            {children}
        </div>
       </div>
    </div>
  );
};

export default AuthLayout;
