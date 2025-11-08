import React from 'react';
import type { Job } from '../types';
import { LocationMarkerIcon } from './icons/LocationMarkerIcon';

interface FeaturedJobCardProps {
  job: Job;
  onViewJob: () => void;
}

const FeaturedJobCard: React.FC<FeaturedJobCardProps> = ({ job, onViewJob }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 flex flex-col group transform hover:-translate-y-1">
      <div className="flex items-start space-x-4">
        <img src={job.logo} alt={`${job.company} logo`} className="w-14 h-14 rounded-md object-cover" />
        <div className="flex-1">
          <p className="text-md font-semibold text-primary-600">{job.company}</p>
          <h3 className="text-lg font-bold text-slate-800 group-hover:text-primary-700">{job.title}</h3>
        </div>
      </div>
      <div className="mt-4 flex-grow">
        <div className="flex items-center space-x-2 text-sm text-slate-500">
            <LocationMarkerIcon className="w-4 h-4" />
            <span>{job.location}</span>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-800">{job.type}</span>
        <button
            onClick={onViewJob}
            className="font-semibold text-primary-600 hover:text-primary-800 transition-colors"
        >
            View Job &rarr;
        </button>
      </div>
    </div>
  );
};

export default FeaturedJobCard;
