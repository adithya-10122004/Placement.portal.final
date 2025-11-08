
import React from 'react';
import type { Job } from '../types';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface JobDetailsProps {
  job: Job;
  onClose: () => void;
  onApply: () => void;
  isApplied: boolean;
}

const JobDetails: React.FC<JobDetailsProps> = ({ job, onClose, onApply, isApplied }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 h-full">
      <div className="relative h-[calc(100vh-10rem)] overflow-y-auto p-6">
        <button onClick={onClose} className="md:hidden absolute top-4 left-4 flex items-center text-sm font-semibold text-slate-600 hover:text-primary-600">
          <ChevronLeftIcon className="w-5 h-5 mr-1" />
          Back
        </button>

        <div className="flex items-start space-x-5 pt-8 md:pt-0">
          <img src={job.logo} alt={`${job.company} logo`} className="w-20 h-20 rounded-lg object-cover" />
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">{job.title}</h2>
            <p className="text-xl font-semibold text-slate-700">{job.company}</p>
            <p className="text-md text-slate-500 mt-1">{job.location}</p>
          </div>
        </div>
        
        <div className="mt-6">
          <button
            onClick={onApply}
            disabled={isApplied}
            className="w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-white transition-colors duration-200 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isApplied ? (
              <>
                <CheckCircleIcon className="w-5 h-5" />
                <span>Applied</span>
              </>
            ) : (
              <span>Apply Now</span>
            )}
          </button>
        </div>

        <div className="mt-8 prose prose-slate max-w-none">
          <p className="lead">{job.description}</p>
          
          <h4 className="font-bold text-lg mt-6">Job Type</h4>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">{job.type}</span>
          
          <h4 className="font-bold text-lg mt-6">Salary</h4>
          <p>{job.salary}</p>

          <h4 className="font-bold text-lg mt-6">Responsibilities</h4>
          <ul>
            {job.responsibilities.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
          
          <h4 className="font-bold text-lg mt-6">Requirements</h4>
          <ul>
            {job.requirements.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
