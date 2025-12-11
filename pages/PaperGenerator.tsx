import React, { useState } from 'react';
import { FileText, Play, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { generateQuiz } from '../services/geminiService';
import { QuizQuestion } from '../types';

const PaperGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('Medium');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    setQuestions([]);
    setSelectedAnswers({});
    setShowResults(false);
    try {
      const result = await generateQuiz(topic, difficulty);
      setQuestions(result);
    } catch (e) {
      alert("Error generating quiz");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (qIndex: number, option: string) => {
    if (showResults) return;
    setSelectedAnswers(prev => ({ ...prev, [qIndex]: option }));
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
           <div className="inline-flex items-center justify-center w-16 h-16 bg-saffron-100 rounded-2xl mb-4 text-saffron-600">
             <FileText className="w-8 h-8" />
           </div>
           <h1 className="text-4xl font-bold text-slate-900 mb-2">Paper Generator</h1>
           <p className="text-slate-600">Instant practice sets based on any topic or chapter.</p>
        </div>

        {/* Configuration Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
           <div className="grid md:grid-cols-3 gap-4">
             <div className="md:col-span-2">
               <label className="block text-sm font-medium text-slate-700 mb-1">Topic / Chapter</label>
               <input 
                 type="text" 
                 value={topic}
                 onChange={(e) => setTopic(e.target.value)}
                 className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-saffron-400"
                 placeholder="e.g. Photosynthesis, Calculus Limits"
               />
             </div>
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Difficulty</label>
               <select 
                 value={difficulty} 
                 onChange={(e) => setDifficulty(e.target.value)}
                 className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-saffron-400 bg-white"
               >
                 <option>Easy</option>
                 <option>Medium</option>
                 <option>Hard (JEE/NEET Level)</option>
               </select>
             </div>
           </div>
           <button 
             onClick={handleGenerate}
             disabled={loading || !topic}
             className="w-full mt-4 py-3 bg-saffron-500 hover:bg-saffron-600 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
           >
             {loading ? <Loader2 className="animate-spin" /> : "Generate Paper"}
           </button>
        </div>

        {/* Quiz Area */}
        <div className="space-y-6">
          {questions.map((q, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 animate-fade-in-up" style={{animationDelay: `${idx * 100}ms`}}>
              <div className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </span>
                <div className="w-full">
                  <h3 className="text-lg font-medium text-slate-800 mb-4">{q.question}</h3>
                  <div className="grid gap-3">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[idx] === opt;
                      const isCorrect = q.correctAnswer === opt;
                      let btnClass = "border-slate-200 hover:bg-slate-50";
                      
                      if (showResults) {
                         if (isCorrect) btnClass = "bg-green-100 border-green-300 text-green-800";
                         else if (isSelected && !isCorrect) btnClass = "bg-red-50 border-red-200 text-red-800";
                      } else if (isSelected) {
                        btnClass = "border-saffron-500 bg-saffron-50 text-saffron-900 ring-1 ring-saffron-500";
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelect(idx, opt)}
                          disabled={showResults}
                          className={`w-full text-left p-3 rounded-lg border text-sm transition-all ${btnClass}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {showResults && (
                    <div className="mt-4 p-4 bg-blue-50 text-blue-800 text-sm rounded-lg flex items-start gap-2">
                       <AlertCircle className="w-5 h-5 shrink-0" />
                       <p><span className="font-bold">Explanation:</span> {q.explanation}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {questions.length > 0 && !showResults && (
            <button 
              onClick={() => setShowResults(true)}
              className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-colors"
            >
              Submit Test
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaperGenerator;
