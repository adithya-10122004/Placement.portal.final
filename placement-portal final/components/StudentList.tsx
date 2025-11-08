import React from 'react';
import StudentCard from './StudentCard';
import type { Student } from '../types';
import { UserGroupIcon } from './icons/UserGroupIcon';
import { ArrowsRightLeftIcon } from './icons/ArrowsRightLeftIcon';

interface StudentListProps {
  students: Student[];
  onSelectStudent: (student: Student) => void;
  selectedStudentId: number | undefined;
  selectedForComparison: number[];
  onToggleCompare: (studentId: number) => void;
  onCompare: () => void;
}

const StudentList: React.FC<StudentListProps> = ({ students, onSelectStudent, selectedStudentId, selectedForComparison, onToggleCompare, onCompare }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 h-[calc(100vh-14rem)] flex flex-col">
      <div className="p-4 border-b border-slate-200 sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <div className="flex items-center space-x-2">
          <UserGroupIcon className="w-6 h-6 text-primary-600" />
          <h2 className="text-xl font-bold text-slate-800">Students</h2>
        </div>
        <p className="text-sm text-slate-500">{students.length} students registered</p>
        <div className="mt-3">
             <button
                onClick={onCompare}
                disabled={selectedForComparison.length !== 2}
                className="w-full px-4 py-2 rounded-lg font-semibold text-white transition-colors duration-200 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
             >
                <ArrowsRightLeftIcon className="w-5 h-5" />
                <span>Compare Selected ({selectedForComparison.length}/2)</span>
             </button>
        </div>
      </div>
      <div className="space-y-2 p-2 overflow-y-auto">
        {students.map((student) => (
          <StudentCard 
            key={student.id} 
            student={student} 
            onSelectStudent={onSelectStudent} 
            isSelected={student.id === selectedStudentId}
            isSelectedForComparison={selectedForComparison.includes(student.id)}
            onToggleSelection={() => onToggleCompare(student.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default StudentList;