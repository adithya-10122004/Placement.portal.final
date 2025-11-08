import React, { useMemo } from 'react';
import type { User } from '../types';
import { ComparisonResult } from './MainApp';
import { XIcon } from './icons/XIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { TrophyIcon } from './icons/TrophyIcon';


interface ComparisonResultsModalProps {
  results: ComparisonResult[];
  onClose: () => void;
  usersById: Record<number, User>;
}

const getScoreColor = (score: number) => {
    if (score > 80) return 'bg-green-500';
    if (score > 60) return 'bg-yellow-500';
    return 'bg-red-500';
};

const Medal: React.FC<{ rank: number }> = ({ rank }) => {
    if (rank > 2) return null;
    const colors = ['text-yellow-400', 'text-slate-400', 'text-amber-600'];
    return <TrophyIcon className={`w-6 h-6 ${colors[rank]}`} />;
}

const ComparisonResultsModal: React.FC<ComparisonResultsModalProps> = ({ results, onClose, usersById }) => {
  const sortedResults = useMemo(() => {
    return [...results].sort((a, b) => b.score - a.score);
  }, [results]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <SparklesIcon className="w-8 h-8 text-primary-600"/>
            <div>
                <h2 className="text-2xl font-bold text-slate-800">AI Comparison Results</h2>
                <p className="text-slate-500">Applicants ranked by relevance to the job description.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-4 overflow-y-auto">
            {sortedResults.map((result, index) => {
                const student = usersById[result.studentId];
                if (!student) return null;
                return (
                    <div key={result.studentId} className="p-4 rounded-lg border border-slate-200 bg-slate-50/50">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-4">
                               <div className="text-2xl font-bold text-slate-400 w-8 text-center">{index + 1}</div>
                               <div>
                                    <div className="flex items-center space-x-2">
                                        <h3 className="text-lg font-bold text-slate-800">{student.name}</h3>
                                        <Medal rank={index} />
                                    </div>
                                    <p className="text-sm text-slate-500">{student.email}</p>
                               </div>
                            </div>
                            <div className="text-right">
                               <p className="text-2xl font-extrabold text-slate-800">{result.score}<span className="text-base font-medium text-slate-500">/100</span></p>
                               <p className="text-sm font-semibold text-slate-600">Compatibility</p>
                            </div>
                        </div>
                         <div className="mt-3">
                            <div className="w-full bg-slate-200 rounded-full h-2.5">
                                <div className={`${getScoreColor(result.score)} h-2.5 rounded-full`} style={{ width: `${result.score}%` }}></div>
                            </div>
                        </div>
                        <div className="mt-3 p-3 bg-white rounded-md border border-slate-200">
                            <p className="text-sm text-slate-700 italic">"{result.justification}"</p>
                        </div>
                    </div>
                )
            })}
        </div>
        
        <div className="p-6 border-t border-slate-200 bg-slate-50 rounded-b-xl flex justify-end">
          <button onClick={onClose} type="button" className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComparisonResultsModal;
