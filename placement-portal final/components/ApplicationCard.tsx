import React from 'react';
import type { Application, Job, User } from '../types';
import { UserCircleIcon } from './icons/UserCircleIcon';
import { BriefcaseIcon } from './icons/BriefcaseIcon';

interface ApplicationCardProps {
  application: Application;
  job: Job;
  applicant?: User;
  onSelectApplication: (application: Application) => void;
  isSelected: boolean;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application, job, applicant, onSelectApplication, isSelected }) => {
  const cardClasses = `
    p-4 rounded-lg cursor-pointer transition-all duration-200 border-2 
    ${isSelected ? 'bg-primary-50 border-primary-500 shadow-lg' : 'bg-white hover:bg-slate-50 border-transparent hover:shadow-md'}
  `;

  return (
    <div className={cardClasses} onClick={() => onSelectApplication(application)}>
      <div className="flex items-start space-x-4">
        <div className="p-2 bg-slate-100 rounded-full">
            <UserCircleIcon className="w-10 h-10 text-slate-500" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-800">{applicant?.name || 'Unknown Applicant'}</h3>
          <p className="text-sm text-slate-500">{applicant?.email}</p>
          <div className="mt-2 flex items-center space-x-1.5 text-sm text-slate-600">
            <BriefcaseIcon className="w-4 h-4" />
            <span>Applied for {job?.title || 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;