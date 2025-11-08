import React from 'react';

export const TrophyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 001.05-2.922 9.75 9.75 0 00-1.05-2.922m10.038 5.844c.42.028.84.044 1.262.044a9.75 9.75 0 009.75-9.75c0-1.33-.266-2.597-.748-3.752A9.753 9.753 0 0012 3c-1.373 0-2.67.27-3.844.752A9.75 9.75 0 007.5 12c0 2.42.89 4.634 2.343 6.312M12 12a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.25h.008v.008H12v-.008z" />
    </svg>
);
