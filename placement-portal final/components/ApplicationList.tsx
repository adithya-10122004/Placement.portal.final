import React from 'react';
import ApplicationCard from './ApplicationCard';
import type { Application, Job, User } from '../types';
import { InboxIcon } from './icons/InboxIcon';

interface ApplicationListProps {
  applications: Application[];
  jobsById: Record<number, Job>;
  usersById: Record<number, User>;
  onSelectApplication: (application: Application) => void;
  selectedApplicationId: number | undefined;
}

const ApplicationList: React.FC<ApplicationListProps> = ({ applications, jobsById, usersById, onSelectApplication, selectedApplicationId }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 h-[calc(100vh-14rem)] overflow-y-auto">
      <div className="p-4 border-b border-slate-200 sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <div className="flex items-center space-x-2">
          <InboxIcon className="w-6 h-6 text-primary-600" />
          <h2 className="text-xl font-bold text-slate-800">Received Applications</h2>
        </div>
        <p className="text-sm text-slate-500">{applications.length} total applications</p>
      </div>
      <div className="space-y-2 p-2">
        {applications.length > 0 ? (
          applications.map((app) => (
            <ApplicationCard 
              key={app.id} 
              application={app}
              applicant={usersById[app.studentId]}
              job={jobsById[app.jobId]}
              onSelectApplication={onSelectApplication} 
              isSelected={app.id === selectedApplicationId}
            />
          ))
        ) : (
          <div className="text-center p-8 text-slate-500">
            <p>No applications yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationList;