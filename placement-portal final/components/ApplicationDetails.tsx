import React, { useState, useEffect } from 'react';
import type { Application, Job, Student } from '../types';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { PaperClipIcon } from './icons/PaperClipIcon';

interface ApplicationDetailsProps {
  application: Application;
  job: Job;
  student: Student;
  onClose: () => void;
}

const ApplicationDetails: React.FC<ApplicationDetailsProps> = ({ application, job, student, onClose }) => {
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);

  useEffect(() => {
    let objectUrl: string | null = null;
    if (application.resume) {
      objectUrl = URL.createObjectURL(application.resume);
      setResumeUrl(objectUrl);
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [application]);

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 h-full">
      <div className="relative h-[calc(100vh-10rem)] overflow-y-auto p-6">
        <button onClick={onClose} className="md:hidden absolute top-4 left-4 flex items-center text-sm font-semibold text-slate-600 hover:text-primary-600">
          <ChevronLeftIcon className="w-5 h-5 mr-1" />
          Back
        </button>

        <div className="pt-8 md:pt-0">
          <p className="text-sm font-semibold text-primary-600">Application for {job.title}</p>
          <h2 className="text-3xl font-extrabold text-slate-900">{student?.name}</h2>
          <p className="text-lg text-slate-600">{student?.email}</p>
        </div>
        
        <div className="mt-6">
            {resumeUrl ? (
                 <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-2 w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-white transition-colors duration-200 bg-primary-600 hover:bg-primary-700"
                >
                    <PaperClipIcon className="w-5 h-5" />
                    <span>View Resume</span>
                </a>
            ) : (
                <p className="text-slate-500">No resume was submitted with this application.</p>
            )}
        </div>

        <div className="mt-8 prose prose-slate max-w-none">
          <h4 className="font-bold text-lg mt-6">Cover Letter</h4>
          <p className="whitespace-pre-wrap">
            {application.coverLetter ? application.coverLetter : <span className="text-slate-400 italic">No cover letter provided.</span>}
          </p>
          
          <hr className="my-8"/>

          <h4 className="font-bold text-lg mt-6">Applied To</h4>
          <div>
            <p className="font-bold text-slate-800">{job.title}</p>
            <p>{job.company} - {job.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;