import React from 'react';
import type { Student, Application, Job } from '../types';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { BriefcaseIcon } from './icons/BriefcaseIcon';

interface StudentDetailsProps {
  student: Student;
  applications: Application[];
  jobsById: Record<number, Job>;
  onClose: () => void;
}

const StudentDetails: React.FC<StudentDetailsProps> = ({ student, applications, jobsById, onClose }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 h-full">
      <div className="relative h-[calc(100vh-14rem)] overflow-y-auto p-6">
        <button onClick={onClose} className="md:hidden absolute top-4 left-4 flex items-center text-sm font-semibold text-slate-600 hover:text-primary-600">
          <ChevronLeftIcon className="w-5 h-5 mr-1" />
          Back
        </button>

        <div className="pt-8 md:pt-0">
          <h2 className="text-3xl font-extrabold text-slate-900">{student.name}</h2>
          <p className="text-lg text-slate-600">{student.email}</p>
          <p className="text-md text-primary-700 font-semibold mt-1">{student.department}</p>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold text-slate-800 border-b pb-2 mb-4">Application History ({applications.length})</h3>
          {applications.length > 0 ? (
            <div className="space-y-4">
              {applications.map(app => {
                const job = jobsById[app.jobId];
                return (
                  <div key={app.id} className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <p className="font-bold text-slate-800">{job.title}</p>
                    <p className="text-sm text-slate-600">{job.company}</p>
                    <p className="text-xs text-slate-400 mt-1">Applied on: {new Date(app.id).toLocaleDateString()}</p>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center p-8 rounded-lg bg-slate-50">
              <BriefcaseIcon className="w-12 h-12 mx-auto text-slate-300" />
              <p className="mt-4 text-slate-500">This student has not applied for any jobs yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;