
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { GoogleGenAI, Type, Chat } from "@google/genai";
import Header from './Header';
import JobList from './JobList';
import JobDetails from './JobDetails';
import ApplyModal from './ApplyModal';
import ApplicationList from './ApplicationList';
import ApplicationDetails from './ApplicationDetails';
import StudentList from './StudentList';
import StudentDetails from './StudentDetails';
import AdminJobDetails from './AdminJobDetails';
import ComparisonResultsModal from './ComparisonResultsModal';
import TwoResumeComparisonModal from './TwoResumeComparisonModal';
import Chatbot from './Chatbot';
import { JOBS } from '../constants';
import type { Job, Application, User, Student } from '../types';
import { InboxIcon } from './icons/InboxIcon';
import { UserGroupIcon } from './icons/UserGroupIcon';
import { BriefcaseIcon } from './icons/BriefcaseIcon';

interface MainAppProps {
  loggedInUser: User;
  onLogout: () => void;
  applications: Application[];
  onApply: (applicationData: Omit<Application, 'id' | 'jobId' | 'studentId'>, jobId: number) => void;
  users: User[];
}

export interface ComparisonResult {
    studentId: number;
    score: number;
    justification: string;
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

const MainApp: React.FC<MainAppProps> = ({ loggedInUser, onLogout, applications, onApply, users }) => {
  // Common state
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Student-specific state
  const [isApplyModalOpen, setIsApplyModalOpen] = useState<boolean>(false);
  
  // Admin-specific state
  const [adminTab, setAdminTab] = useState<'jobs' | 'applications' | 'students'>('jobs');
  const [selectedAdminJob, setSelectedAdminJob] = useState<Job | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isComparing, setIsComparing] = useState(false);
  const [comparisonResults, setComparisonResults] = useState<ComparisonResult[] | null>(null);
  const [comparisonError, setComparisonError] = useState('');

  // Admin two-resume comparison state
  const [selectedStudentsForComparison, setSelectedStudentsForComparison] = useState<number[]>([]);
  const [isComparingTwoResumes, setIsComparingTwoResumes] = useState(false);
  const [twoResumeComparisonResult, setTwoResumeComparisonResult] = useState<string | null>(null);
  const [twoResumeComparisonError, setTwoResumeComparisonError] = useState('');


  // Chatbot state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);

  useEffect(() => {
    const initializeChat = () => {
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const jobContext = JSON.stringify(JOBS.map(j => ({
                id: j.id,
                title: j.title,
                company: j.company,
                location: j.location,
                type: j.type,
                description: j.description,
                requirements: j.requirements,
            })), null, 2);

            const systemInstruction = `You are a helpful AI assistant for a university's Placement Portal. Your primary role is to answer questions about available job openings based ONLY on the provided JSON data. Do not invent information or provide details not present in the data. Be friendly and concise. Current user is ${loggedInUser.name} (${loggedInUser.role}). Here is the list of available jobs: \n${jobContext}`;
            
            chatRef.current = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: systemInstruction,
                },
            });
            setChatMessages([{
                role: 'model',
                text: `Hi ${loggedInUser.name}! I'm your AI assistant. How can I help you with your job search today?`
            }]);
        } catch (e) {
            console.error("Failed to initialize AI Chat:", e);
             setChatMessages([{
                role: 'model',
                text: `Sorry, the AI assistant could not be initialized.`
            }]);
        }
    };
    initializeChat();
  }, [loggedInUser]);


  const handleSendMessage = async (message: string) => {
    if (!chatRef.current || isChatLoading) return;

    const newUserMessage: ChatMessage = { role: 'user', text: message };
    setChatMessages(prev => [...prev, newUserMessage]);
    setIsChatLoading(true);

    try {
        const response = await chatRef.current.sendMessage({ message });
        const modelMessage: ChatMessage = { role: 'model', text: response.text };
        setChatMessages(prev => [...prev, modelMessage]);
    } catch (error) {
        console.error("Chatbot error:", error);
        const errorMessage: ChatMessage = { role: 'model', text: "Sorry, I encountered an error. Please try again." };
        setChatMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsChatLoading(false);
    }
  };

  const jobsById = useMemo(() => JOBS.reduce((acc, job) => {
    acc[job.id] = job;
    return acc;
  }, {} as Record<number, Job>), []);
  
  const usersById = useMemo(() => users.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
  }, {} as Record<number, User>), [users]);

  const students = useMemo(() => users.filter(u => u.role === 'student') as Student[], [users]);

  const appliedJobIds = useMemo(() => {
    if (loggedInUser.role === 'student') {
        return new Set(applications.filter(app => app.studentId === loggedInUser.id).map(app => app.jobId));
    }
    return new Set<number>();
  }, [applications, loggedInUser]);
  
  const applicationsForAdminJob = useMemo(() => {
    if (!selectedAdminJob) return [];
    return applications.filter(app => app.jobId === selectedAdminJob.id);
  }, [selectedAdminJob, applications]);

  const handleSelectJob = (job: Job) => {
    setSelectedJob(job);
  };

  const handleSelectAdminJob = (job: Job) => {
    setSelectedAdminJob(job);
    setSelectedApplication(null);
    setSelectedStudent(null);
  }

  const handleCloseDetails = () => setSelectedJob(null);
  
  const handleOpenApplyModal = () => {
    if (selectedJob) setIsApplyModalOpen(true);
  };

  const handleCloseApplyModal = () => setIsApplyModalOpen(false);

  const handleStudentApply = (applicationData: Omit<Application, 'jobId' | 'id' | 'studentId'>) => {
    if (selectedJob) {
      onApply(applicationData, selectedJob.id);
      handleCloseApplyModal();
    }
  };

  const handleSelectApplication = (application: Application) => {
    setSelectedApplication(application);
    setSelectedStudent(null);
    setSelectedAdminJob(null);
  };
  
  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student);
    setSelectedApplication(null);
    setSelectedAdminJob(null);
  };

  const handleToggleStudentForComparison = (studentId: number) => {
    setSelectedStudentsForComparison(prev => {
        const isSelected = prev.includes(studentId);
        if (isSelected) {
            return prev.filter(id => id !== studentId);
        } else {
            if (prev.length < 2) {
                return [...prev, studentId];
            }
            return prev; // Do not add more than 2
        }
    });
  };

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (!file) {
            resolve('');
            return;
        }
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsText(file);
    });
};

  const handleCompareResumes = async (job: Job) => {
    setIsComparing(true);
    setComparisonError('');
    setComparisonResults(null);

    const applicationsForJob = applications.filter(app => app.jobId === job.id);

    if (applicationsForJob.length < 1) {
        setComparisonError('There are no applicants for this job yet.');
        setIsComparing(false);
        return;
    }

    try {
        const resumeReadPromises = applicationsForJob.map(app => readFileAsText(app.resume!));
        const resumeTexts = await Promise.all(resumeReadPromises);

        const candidatesInfo = applicationsForJob.map((app, index) => {
            const student = usersById[app.studentId] as Student;
            return {
                student: student,
                resumeText: resumeTexts[index] || 'No resume text available.',
                coverLetter: app.coverLetter || 'No cover letter provided.'
            }
        });

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

        const prompt = `
            You are an expert technical recruiter and hiring manager with decades of experience. Your task is to analyze the resumes and cover letters of several candidates who have applied for a specific job opening.

            First, carefully review the job details provided below. Pay close attention to the required skills, experience, and responsibilities.

            **Job Details:**
            - **Title:** ${job.title}
            - **Company:** ${job.company}
            - **Description:** ${job.description}
            - **Responsibilities:**
            ${job.responsibilities.map(r => `- ${r}`).join('\n')}
            - **Requirements:**
            ${job.requirements.map(r => `- ${r}`).join('\n')}

            **Candidate Information:**
            Now, review the information for the following candidates.

            ${candidatesInfo.map(c => `
            ---
            **Candidate Name:** ${c.student.name}
            **Candidate ID:** ${c.student.id}
            **Department:** ${c.student.department}
            **Resume/CV Text:**
            ${c.resumeText}
            **Cover Letter:**
            ${c.coverLetter}
            ---
            `).join('\n')}

            **Your Task:**
            Based on the provided job details and candidate information, evaluate each candidate's suitability for the role. Provide a score from 0 to 100, where 100 is a perfect match. Also, provide a concise, 2-3 sentence justification for your score, highlighting the candidate's key strengths and weaknesses in relation to the job requirements. Return your analysis in the specified JSON format.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        studentId: {
                          type: Type.NUMBER,
                          description: "The unique ID of the student."
                        },
                        score: {
                          type: Type.NUMBER,
                          description: 'Score from 0 to 100 based on job fit.'
                        },
                        justification: {
                          type: Type.STRING,
                          description: 'A concise 2-3 sentence justification for the score.'
                        },
                      },
                      required: ['studentId', 'score', 'justification'],
                    },
                  },
            },
        });
        
        const results = JSON.parse(response.text);
        setComparisonResults(results);

    } catch (error) {
        console.error("AI comparison failed:", error);
        setComparisonError('An error occurred while analyzing resumes. The content may be too large or the API may be unavailable. Please try again.');
    } finally {
        setIsComparing(false);
    }
  };

  const handleCompareTwoResumes = async () => {
    if (selectedStudentsForComparison.length !== 2) return;

    setIsComparingTwoResumes(true);
    setTwoResumeComparisonError('');
    setTwoResumeComparisonResult(null);

    try {
        const studentInfos = await Promise.all(selectedStudentsForComparison.map(async (studentId) => {
            const student = usersById[studentId] as Student;
            // Find the most recent application for this student to get their resume
            const studentApplications = applications.filter(a => a.studentId === studentId).sort((a,b) => b.id - a.id);
            if (studentApplications.length === 0 || !studentApplications[0].resume) {
                throw new Error(`Student ${student.name} has not submitted any resumes.`);
            }
            const resumeText = await readFileAsText(studentApplications[0].resume);
            return {
                name: student.name,
                department: student.department,
                resumeText: resumeText || 'No resume text available.',
            };
        }));

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

        const prompt = `
            You are an expert recruiter with a keen eye for talent. Your task is to compare two student resumes. Provide a detailed, professional analysis.

            **Candidate 1: ${studentInfos[0].name}**
            - Department: ${studentInfos[0].department}
            - Resume:
            ---
            ${studentInfos[0].resumeText}
            ---

            **Candidate 2: ${studentInfos[1].name}**
            - Department: ${studentInfos[1].department}
            - Resume:
            ---
            ${studentInfos[1].resumeText}
            ---

            **Your Analysis:**
            Please provide a comparison of the two candidates. Structure your response with the following sections:
            1.  **Summary:** A brief, one-paragraph overview of both candidates.
            2.  **Strengths of ${studentInfos[0].name}:** Use bullet points to list key strengths.
            3.  **Strengths of ${studentInfos[1].name}:** Use bullet points to list key strengths.
            4.  **Areas for Improvement:** Briefly mention potential weaknesses or areas for improvement for each candidate, if any.
            5.  **Recommendation:** Conclude with a final recommendation. Based purely on the resumes, who would you recommend for a general entry-level technical or business role and why?

            Format the entire response in Markdown.
        `;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: prompt,
        });

        setTwoResumeComparisonResult(response.text);

    } catch (error: any) {
        console.error("Two-resume comparison failed:", error);
        setTwoResumeComparisonError(error.message || 'An error occurred during comparison. Please ensure both students have submitted resumes.');
    } finally {
        setIsComparingTwoResumes(false);
    }
};


  const studentView = (
    <div className="flex flex-col md:flex-row gap-8">
      <div className={`w-full md:w-1/3 transition-transform duration-300 ease-in-out ${selectedJob ? 'hidden md:block' : 'block'}`}>
        <JobList jobs={JOBS} onSelectJob={handleSelectJob} selectedJobId={selectedJob?.id} appliedJobIds={appliedJobIds} />
      </div>

      <div className={`w-full md:w-2/3 transition-opacity duration-300 ease-in-out ${selectedJob ? 'block' : 'hidden md:block'}`}>
        {selectedJob && loggedInUser.role === 'student' ? (
          <JobDetails
            job={selectedJob}
            onClose={handleCloseDetails}
            onApply={handleOpenApplyModal}
            isApplied={appliedJobIds.has(selectedJob.id)}
          />
        ) : (
          <div className="h-full hidden md:flex items-center justify-center bg-white rounded-xl shadow-md border border-slate-200">
            <div className="text-center p-8">
              <h2 className="text-2xl font-bold text-slate-700">Welcome, {loggedInUser.name}</h2>
              <p className="mt-2 text-slate-500">Select a job from the list to view its details.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const adminView = (
    <div>
        <div className="mb-6 border-b border-gray-200">
            <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                 <button onClick={() => setAdminTab('jobs')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${adminTab === 'jobs' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                    <BriefcaseIcon className="w-5 h-5" />
                    <span>Jobs</span>
                </button>
                <button onClick={() => setAdminTab('applications')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${adminTab === 'applications' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                    <InboxIcon className="w-5 h-5" />
                    <span>Applications</span>
                </button>
                <button onClick={() => setAdminTab('students')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${adminTab === 'students' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                    <UserGroupIcon className="w-5 h-5" />
                    <span>Students</span>
                </button>
            </nav>
        </div>
        
        {adminTab === 'jobs' && (
            <div className="flex flex-col md:flex-row gap-8">
                <div className={`w-full md:w-1/3`}>
                    <JobList jobs={JOBS} onSelectJob={handleSelectAdminJob} selectedJobId={selectedAdminJob?.id} appliedJobIds={new Set()} />
                </div>
                 <div className={`w-full md:w-2/3`}>
                    {selectedAdminJob ? (
                        <AdminJobDetails
                            job={selectedAdminJob}
                            applicants={applicationsForAdminJob.map(app => usersById[app.studentId] as Student)}
                            onCompare={() => handleCompareResumes(selectedAdminJob)}
                            isComparing={isComparing}
                            comparisonError={comparisonError}
                        />
                    ) : (
                        <div className="h-full hidden md:flex items-center justify-center bg-white rounded-xl shadow-md border border-slate-200">
                            <div className="text-center p-8">
                                <BriefcaseIcon className="w-16 h-16 mx-auto text-slate-300" />
                                <h2 className="mt-4 text-2xl font-bold text-slate-700">Job Details</h2>
                                <p className="mt-2 text-slate-500">Select a job to view its details and applicants.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )}

        {adminTab === 'applications' && (
             <div className="flex flex-col md:flex-row gap-8">
                <div className={`w-full md:w-1/3 transition-transform duration-300 ease-in-out ${selectedApplication ? 'hidden md:block' : 'block'}`}>
                    <ApplicationList 
                        applications={applications} 
                        usersById={usersById}
                        jobsById={jobsById}
                        onSelectApplication={handleSelectApplication}
                        selectedApplicationId={selectedApplication?.id}
                    />
                </div>
                <div className={`w-full md:w-2/3 transition-opacity duration-300 ease-in-out ${selectedApplication ? 'block' : 'hidden md:block'}`}>
                    {selectedApplication ? (
                    <ApplicationDetails
                        application={selectedApplication}
                        job={jobsById[selectedApplication.jobId]}
                        student={usersById[selectedApplication.studentId] as Student}
                        onClose={() => setSelectedApplication(null)}
                    />
                    ) : (
                    <div className="h-full hidden md:flex items-center justify-center bg-white rounded-xl shadow-md border border-slate-200">
                        <div className="text-center p-8">
                        <InboxIcon className="w-16 h-16 mx-auto text-slate-300" />
                        <h2 className="mt-4 text-2xl font-bold text-slate-700">Application Viewer</h2>
                        <p className="mt-2 text-slate-500">
                            {applications.length > 0 
                            ? "Select an application to view details."
                            : "No applications have been submitted yet."
                            }
                        </p>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        )}

        {adminTab === 'students' && (
            <div className="flex flex-col md:flex-row gap-8">
                <div className={`w-full md:w-1/3 transition-transform duration-300 ease-in-out ${selectedStudent ? 'hidden md:block' : 'block'}`}>
                   <StudentList
                    students={students}
                    onSelectStudent={handleSelectStudent}
                    selectedStudentId={selectedStudent?.id}
                    selectedForComparison={selectedStudentsForComparison}
                    onToggleCompare={handleToggleStudentForComparison}
                    onCompare={handleCompareTwoResumes}
                   />
                </div>
                <div className={`w-full md:w-2/3 transition-opacity duration-300 ease-in-out ${selectedStudent ? 'block' : 'hidden md:block'}`}>
                    {selectedStudent ? (
                        <StudentDetails 
                            student={selectedStudent}
                            applications={applications.filter(app => app.studentId === selectedStudent.id)}
                            jobsById={jobsById}
                            onClose={() => setSelectedStudent(null)}
                        />
                    ) : (
                        <div className="h-full hidden md:flex items-center justify-center bg-white rounded-xl shadow-md border border-slate-200">
                            <div className="text-center p-8">
                                <UserGroupIcon className="w-16 h-16 mx-auto text-slate-300" />
                                <h2 className="mt-4 text-2xl font-bold text-slate-700">Student Directory</h2>
                                <p className="mt-2 text-slate-500">Select a student to view their profile and application history.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header user={loggedInUser} onLogout={onLogout} />
      <main className="container mx-auto px-4 py-8">
        {loggedInUser.role === 'student' ? studentView : adminView}
      </main>
      {isApplyModalOpen && selectedJob && loggedInUser.role === 'student' && (
        <ApplyModal 
            job={selectedJob} 
            student={loggedInUser} 
            onClose={handleCloseApplyModal} 
            onSubmit={handleStudentApply} 
        />
      )}
      {comparisonResults && (
        <ComparisonResultsModal
            results={comparisonResults}
            onClose={() => setComparisonResults(null)}
            usersById={usersById}
        />
      )}
      {(isComparingTwoResumes || twoResumeComparisonResult || twoResumeComparisonError) && (
        <TwoResumeComparisonModal
            isOpen={true}
            onClose={() => {
                setTwoResumeComparisonResult(null);
                setTwoResumeComparisonError('');
            }}
            isLoading={isComparingTwoResumes}
            error={twoResumeComparisonError}
            result={twoResumeComparisonResult}
            students={selectedStudentsForComparison.map(id => usersById[id] as Student)}
        />
      )}
       <Chatbot 
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        messages={chatMessages}
        onSendMessage={handleSendMessage}
        isLoading={isChatLoading}
      />
    </div>
  );
};

export default MainApp;