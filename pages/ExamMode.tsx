import React, { useState } from 'react';
import { Calendar, CheckCircle, Clock, Book, Loader2 } from 'lucide-react';
import { generateStudyPlan } from '../services/geminiService';
import { StudyPlanDay } from '../types';

const ExamMode: React.FC = () => {
  const [syllabus, setSyllabus] = useState('');
  const [days, setDays] = useState(7);
  const [plan, setPlan] = useState<StudyPlanDay[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!syllabus) return;
    setLoading(true);
    try {
      const result = await generateStudyPlan(syllabus, days);
      setPlan(result);
    } catch (e) {
      alert("Failed to generate plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-royal-100 rounded-2xl mb-4 text-royal-600">
            <Calendar className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Exam Preparation Mode</h1>
          <p className="text-slate-600">Upload your syllabus and get a personalized, AI-optimized roadmap.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-slate-100">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Paste your Syllabus / Topics / Exam Name (e.g., JEE Mains Physics)
              </label>
              <textarea
                value={syllabus}
                onChange={(e) => setSyllabus(e.target.value)}
                className="w-full h-32 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-royal-500 focus:border-transparent transition-all outline-none resize-none"
                placeholder="e.g. Kinematics, Laws of Motion, Thermodynamics, Electrostatics..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Days until Exam
              </label>
              <input 
                type="number" 
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                min={1}
                max={60}
                className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-royal-500"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !syllabus}
              className="w-full py-4 bg-gradient-to-r from-royal-600 to-teal-500 hover:from-royal-700 hover:to-teal-600 text-white font-bold rounded-xl shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Generate Study Plan"}
            </button>
          </div>
        </div>

        {plan.length > 0 && (
          <div className="space-y-6 animate-fade-in-up">
            <h2 className="text-2xl font-bold text-slate-900">Your {days}-Day Strategy</h2>
            <div className="grid gap-4">
              {plan.map((day) => (
                <div key={day.day} className="bg-white p-6 rounded-2xl border-l-4 border-teal-500 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-xs font-bold text-teal-600 uppercase tracking-wide">Day {day.day}</span>
                      <h3 className="text-xl font-bold text-slate-800 mt-1">{day.topic}</h3>
                    </div>
                    <div className="bg-teal-50 p-2 rounded-lg">
                      <Clock className="w-5 h-5 text-teal-600" />
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {day.activities.map((act, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-600">
                        <CheckCircle className="w-5 h-5 text-royal-400 shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamMode;
