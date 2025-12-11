import React from 'react';
import { Brain, Heart, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-royal-500 to-teal-400 rounded-lg flex items-center justify-center">
                  <Brain className="text-white w-5 h-5" />
                </div>
                <span className="font-bold text-xl tracking-tight">GeniusPrep</span>
              </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              India's first Multimodal AI Exam Coach. Empowering students with personalized learning, instant doubt solving, and exam readiness.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-slate-100">Features</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition">Exam Mode</a></li>
              <li><a href="#" className="hover:text-white transition">Scan Board</a></li>
              <li><a href="#" className="hover:text-white transition">Paper Generator</a></li>
              <li><a href="#" className="hover:text-white transition">AI Tutor</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-slate-100">Exams</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition">JEE Main & Advanced</a></li>
              <li><a href="#" className="hover:text-white transition">NEET UG</a></li>
              <li><a href="#" className="hover:text-white transition">CBSE Class 10 & 12</a></li>
              <li><a href="#" className="hover:text-white transition">UGC NET</a></li>
            </ul>
          </div>

          <div>
             <h3 className="font-semibold text-lg mb-4 text-slate-100">Connect</h3>
             <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-white transition"><Twitter className="w-5 h-5"/></a>
                <a href="#" className="text-slate-400 hover:text-white transition"><Instagram className="w-5 h-5"/></a>
                <a href="#" className="text-slate-400 hover:text-white transition"><Linkedin className="w-5 h-5"/></a>
             </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>© 2024 GeniusPrep. Made with <Heart className="w-3 h-3 inline text-red-500 mx-1" fill="currentColor"/> in India.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
