import React from 'react';
import type { Student } from '../types';
import { UserCircleIcon } from './icons/UserCircleIcon';

interface StudentCardProps {
  student: Student;
  onSelectStudent: (student: Student) => void;
  isSelected: boolean;
  isSelectedForComparison: boolean;
  onToggleSelection: () => void;
}

const StudentCard: React.FC<StudentCardProps> = ({ student, onSelectStudent, isSelected, isSelectedForComparison, onToggleSelection }) => {
  const cardClasses = `
    p-4 rounded-lg cursor-pointer transition-all duration-200 border-2 
    ${isSelected ? 'bg-primary-50 border-primary-500 shadow-lg' : 'bg-white hover:bg-slate-50 border-transparent hover:shadow-md'}
    ${isSelectedForComparison ? '!border-primary-600 ring-2 ring-primary-500' : ''}
  `;

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleSelection();
  }

  return (
    <div className={cardClasses} onClick={() => onSelectStudent(student)}>
      <div className="flex items-center space-x-4">
         <div onClick={handleCheckboxClick} className="flex items-center h-full">
            <input
                type="checkbox"
                checked={isSelectedForComparison}
                onChange={() => {}} // The parent div's onClick handles the logic
                className="h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
            />
        </div>
        <div className="p-2 bg-slate-100 rounded-full">
            <UserCircleIcon className="w-10 h-10 text-slate-500" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-800">{student.name}</h3>
          <p className="text-sm text-slate-500">{student.email}</p>
           <p className="text-sm text-slate-500 mt-1">{student.department}</p>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;