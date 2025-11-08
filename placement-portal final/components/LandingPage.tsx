import React from 'react';
import { JOBS } from '../constants';
import FeaturedJobCard from './FeaturedJobCard';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { UserGroupIcon } from './icons/UserGroupIcon';
import { ArrowsRightLeftIcon } from './icons/ArrowsRightLeftIcon';

interface LandingPageProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLoginClick, onRegisterClick }) => {
  
  const features = [
    {
      icon: BriefcaseIcon,
      title: 'Explore Opportunities',
      description: 'Discover a wide range of job openings and internships from top companies tailored to your profile.'
    },
    {
      icon: SparklesIcon,
      title: 'AI-Powered Insights',
      description: 'Leverage our intelligent tools to compare resumes and match with the perfect job opportunities.'
    },
    {
      icon: UserGroupIcon,
      title: 'Connect with Employers',
      description: 'Streamline your application process and get noticed by recruiters from leading industries.'
    }
  ];

  return (
    <div className="bg-white text-slate-800 font-sans">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <BriefcaseIcon className="w-8 h-8 text-primary-600" />
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                Placement Portal
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={onLoginClick}
                className="hidden sm:block px-4 py-2 text-sm font-medium text-primary-600 rounded-md hover:bg-primary-50 focus:outline-none"
              >
                Log In
              </button>
              <button
                onClick={onRegisterClick}
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="py-24 sm:py-32 bg-slate-50/50">
          <div className="container mx-auto px-4 text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
              Your Career Journey Starts Here.
            </h1>
            <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-slate-600">
              Connecting talented students with incredible opportunities. Apply, get discovered, and launch your dream career with our AI-enhanced placement portal.
            </p>
            <div className="mt-10 flex justify-center gap-x-6">
              <button
                onClick={onRegisterClick}
                className="px-8 py-3 bg-primary-600 text-white font-semibold rounded-lg shadow-lg hover:bg-primary-700 transition-transform hover:scale-105 duration-300 ease-in-out"
              >
                Get Started
              </button>
               <button
                onClick={onLoginClick}
                className="px-8 py-3 text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors"
              >
                Log In
              </button>
            </div>
          </div>
        </section>

        <section id="features" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">Why Choose Us?</h2>
              <p className="mt-2 text-lg text-slate-500">A smarter way to manage placements.</p>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              {features.map((feature, index) => (
                <div key={feature.title} className="animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl">
                    <feature.icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-slate-900">{feature.title}</h3>
                  <p className="mt-2 text-slate-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section id="featured-jobs" className="py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">Featured Jobs</h2>
              <p className="mt-2 text-lg text-slate-500">Here are some of the most recent job openings</p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {JOBS.slice(0, 3).map(job => (
                <FeaturedJobCard key={job.id} job={job} onViewJob={onRegisterClick} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-800 text-white">
        <div className="container mx-auto px-4 py-12 text-center">
          <p>&copy; {new Date().getFullYear()} Placement Portal. All rights reserved.</p>
          <p className="text-sm text-slate-400 mt-2">Designed to empower students and connect them with top employers.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
