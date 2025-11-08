import React from 'react';
import type { Job, Student } from '../types';
import { UserGroupIcon } from './icons/UserGroupIcon';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';


interface AdminJobDetailsProps {
  job: Job;
  applicants: Student[];
  onCompare: () => void;
  isComparing: boolean;
  comparisonError: string;
}

const AdminJobDetails: React.FC<AdminJobDetailsProps> = ({ job, applicants, onCompare, isComparing, comparisonError }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 h-full">
      <div className="relative h-[calc(100vh-14rem)] overflow-y-auto p-6">
        <div className="flex items-start space-x-5">
          <img src={job.logo} alt={`${job.company} logo`} className="w-20 h-20 rounded-lg object-cover" />
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">{job.title}</h2>
            <p className="text-xl font-semibold text-slate-700">{job.company}</p>
            <p className="text-md text-slate-500 mt-1">{job.location}</p>
          </div>
        </div>
        
        <div className="mt-6 p-4 rounded-lg bg-slate-50 border border-slate-200">
            <h3 className="font-bold text-slate-800">AI-Powered Resume Analysis</h3>
            <p className="text-sm text-slate-600 mt-1">
                Automatically compare all applicants against the job description to find the best candidates. 
                This feature works best with text-based resumes (.txt).
            </p>
            <button
                onClick={onCompare}
                disabled={isComparing || applicants.length === 0}
                className="mt-3 w-full sm:w-auto px-5 py-2.5 rounded-lg font-semibold text-white transition-colors duration-200 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
                {isComparing ? (
                    <>
                        <SpinnerIcon className="w-5 h-5 animate-spin" />
                        <span>Analyzing...</span>
                    </>
                ) : (
                    <>
                        <SparklesIcon className="w-5 h-5" />
                        <span>AI Compare Applicants</span>
                    </>
                )}
            </button>
            {comparisonError && <p className="text-sm text-red-600 mt-2">{comparisonError}</p>}
        </div>

        <div className="mt-8">
          <div className="flex items-center space-x-2 border-b pb-2 mb-4">
            <UserGroupIcon className="w-6 h-6 text-slate-500" />
            <h3 className="text-xl font-bold text-slate-800">
              Applicants ({applicants.length})
            </h3>
          </div>
          {applicants.length > 0 ? (
            <div className="space-y-3">
              {applicants.map(student => (
                  <div key={student.id} className="p-3 rounded-md bg-white border border-slate-200">
                    <p className="font-semibold text-slate-800">{student.name}</p>
                    <p className="text-sm text-slate-500">{student.email}</p>
                    <p className="text-sm text-slate-500">{student.department}</p>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="text-center p-8 rounded-lg bg-slate-50">
              <BriefcaseIcon className="w-12 h-12 mx-auto text-slate-300" />
              <p className="mt-4 text-slate-500">No one has applied for this job yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminJobDetails;
