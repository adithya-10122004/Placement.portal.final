
import React from 'react';
import type { Job } from '../types';
import { LocationMarkerIcon } from './icons/LocationMarkerIcon';
import { CurrencyDollarIcon } from './icons/CurrencyDollarIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface JobCardProps {
  job: Job;
  onSelectJob: (job: Job) => void;
  isSelected: boolean;
  isApplied: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, onSelectJob, isSelected, isApplied }) => {
  const cardClasses = `
    p-4 rounded-lg cursor-pointer transition-all duration-200 border-2 
    ${isSelected ? 'bg-primary-50 border-primary-500 shadow-lg' : 'bg-white hover:bg-slate-50 border-transparent hover:shadow-md'}
  `;

  return (
    <div className={cardClasses} onClick={() => onSelectJob(job)}>
      <div className="flex items-start space-x-4">
        <img src={job.logo} alt={`${job.company} logo`} className="w-14 h-14 rounded-md object-cover" />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-800">{job.title}</h3>
            {isApplied && (
               <div className="flex items-center space-x-1 text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  <CheckCircleIcon className="w-4 h-4" />
                  <span>Applied</span>
               </div>
            )}
          </div>
          <p className="text-md font-semibold text-slate-600">{job.company}</p>
          <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-sm text-slate-500">
            <div className="flex items-center space-x-1.5">
              <LocationMarkerIcon className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CurrencyDollarIcon className="w-4 h-4" />
              <span>{job.salary}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
