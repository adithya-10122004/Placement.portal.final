
import React from 'react';
import JobCard from './JobCard';
import type { Job } from '../types';

interface JobListProps {
  jobs: Job[];
  onSelectJob: (job: Job) => void;
  selectedJobId: number | undefined;
  appliedJobIds: Set<number>;
}

const JobList: React.FC<JobListProps> = ({ jobs, onSelectJob, selectedJobId, appliedJobIds }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 h-[calc(100vh-10rem)] overflow-y-auto">
      <div className="p-4 border-b border-slate-200 sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <h2 className="text-xl font-bold text-slate-800">Job Openings</h2>
        <p className="text-sm text-slate-500">{jobs.length} jobs available</p>
      </div>
      <div className="space-y-2 p-2">
        {jobs.map((job) => (
          <JobCard 
            key={job.id} 
            job={job} 
            onSelectJob={onSelectJob} 
            isSelected={job.id === selectedJobId}
            isApplied={appliedJobIds.has(job.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default JobList;
