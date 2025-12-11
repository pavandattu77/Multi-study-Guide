import React from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';

const Tutor: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
           <MessageSquare className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">AI Personal Tutor</h1>
        <p className="text-slate-600 mb-8">
          The adaptive conversation mode is coming soon. Imagine a tutor that quizzes you, identifies your weak spots, and explains concepts using analogies you love.
        </p>
        <button className="px-6 py-3 bg-white border border-slate-300 rounded-full text-slate-600 hover:bg-slate-50 font-medium transition-colors">
          Get notified when live
        </button>
      </div>
    </div>
  );
};

export default Tutor;
