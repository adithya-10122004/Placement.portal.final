import React from 'react';
import type { Student } from '../types';
import { XIcon } from './icons/XIcon';
import { ArrowsRightLeftIcon } from './icons/ArrowsRightLeftIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';

interface TwoResumeComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  error: string | null;
  result: string | null;
  students: Student[];
}

const TwoResumeComparisonModal: React.FC<TwoResumeComparisonModalProps> = ({
  isOpen,
  onClose,
  isLoading,
  error,
  result,
  students,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <ArrowsRightLeftIcon className="w-8 h-8 text-primary-600" />
            <div>
              <h2 className="text-2xl font-bold text-slate-800">AI Resume Comparison</h2>
              <p className="text-slate-500">
                {students.length === 2 ? `${students[0].name} vs. ${students[1].name}` : 'Comparing resumes...'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {isLoading && (
            <div className="flex flex-col items-center justify-center text-center p-12">
              <SpinnerIcon className="w-12 h-12 animate-spin text-primary-600" />
              <h3 className="mt-4 text-lg font-semibold text-slate-700">Analyzing Resumes...</h3>
              <p className="mt-1 text-slate-500">The AI is comparing the two candidates. This might take a moment.</p>
            </div>
          )}
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}
          {result && (
            <div
              className="prose prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: result.replace(/\n/g, '<br />') }}
            />
          )}
        </div>

        <div className="p-6 border-t border-slate-200 bg-slate-50 rounded-b-xl flex justify-end">
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TwoResumeComparisonModal;