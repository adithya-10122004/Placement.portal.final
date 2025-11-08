import React, { useState, useRef } from 'react';
import type { Job, Application, Student } from '../types';
import { XIcon } from './icons/XIcon';
import { PaperClipIcon } from './icons/PaperClipIcon';

interface ApplyModalProps {
  job: Job;
  student: Student;
  onClose: () => void;
  onSubmit: (applicationData: Omit<Application, 'jobId' | 'id' | 'studentId'>) => void;
}

const ApplyModal: React.FC<ApplyModalProps> = ({ job, student, onClose, onSubmit }) => {
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResume(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume) {
      setError('Please upload your resume to apply.');
      return;
    }
    setError('');
    onSubmit({ resume, coverLetter });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Apply for {job.title}</h2>
            <p className="text-slate-500">at {job.company}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">{error}</div>}
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
            <input type="text" id="name" value={student.name} readOnly className="mt-1 block w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-md shadow-sm sm:text-sm text-slate-500 cursor-not-allowed" />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
            <input type="email" id="email" value={student.email} readOnly className="mt-1 block w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-md shadow-sm sm:text-sm text-slate-500 cursor-not-allowed" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Resume/CV <span className="text-red-500">*</span></label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md cursor-pointer hover:border-primary-400"
            >
              <div className="space-y-1 text-center">
                <PaperClipIcon className="mx-auto h-12 w-12 text-slate-400" />
                <div className="flex text-sm text-slate-600">
                  <span className="relative font-medium text-primary-600 hover:text-primary-500">
                    <span>{resume ? resume.name : 'Upload a file'}</span>
                    <input ref={fileInputRef} id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf,.doc,.docx,.txt" required />
                  </span>
                  {!resume && <p className="pl-1">or drag and drop</p>}
                </div>
                <p className="text-xs text-slate-500">PDF, DOCX, TXT up to 10MB</p>
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="coverLetter" className="block text-sm font-medium text-slate-700">Cover Letter (Optional)</label>
            <textarea id="coverLetter" value={coverLetter} onChange={e => setCoverLetter(e.target.value)} rows={4} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"></textarea>
          </div>
        </form>
        
        <div className="p-6 border-t border-slate-200 bg-slate-50 rounded-b-xl flex justify-end space-x-3">
          <button onClick={onClose} type="button" className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            Cancel
          </button>
          <button onClick={handleSubmit} type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;
