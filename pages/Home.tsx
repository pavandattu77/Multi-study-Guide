import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Upload, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  FileText, 
  Camera, 
  PenTool, 
  BrainCircuit,
  Loader2,
  Sparkles
} from 'lucide-react';
import { analyzeImage } from '../services/geminiService';

const Home: React.FC = () => {
  const [demoFile, setDemoFile] = useState<File | null>(null);
  const [demoResult, setDemoResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDemoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setDemoFile(file);
      setIsLoading(true);
      setDemoResult(null);

      try {
        const result = await analyzeImage(file, "Explain this concept simply for a high school student. If there are equations, solve them. If there is a diagram, explain its parts.");
        setDemoResult(result || "Could not analyze image.");
      } catch (error) {
        setDemoResult("Error analyzing image. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-royal-50 to-white pt-12 pb-24 lg:pt-32 lg:pb-40 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 left-0 -ml-20 -mt-20 w-96 h-96 bg-royal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-20 w-96 h-96 bg-saffron-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-royal-100 shadow-sm mb-8 animate-fade-in-up">
            <span className="flex h-2 w-2 rounded-full bg-saffron-500"></span>
            <span className="text-sm font-medium text-slate-600">Powered by Gemini 3 Pro</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
            Study Smarter with India’s<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-600 via-teal-500 to-royal-600"> First Multimodal AI Coach</span>
          </h1>
          
          <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Upload a textbook page, a photo of your notes, a PDF, or a diagram. 
            GeniusPrep explains it instantly, quizzes you, and builds a full exam plan.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
            <button className="px-8 py-4 bg-royal-600 hover:bg-royal-700 text-white rounded-full font-semibold text-lg shadow-lg shadow-royal-200 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
              Try Now Free <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 rounded-full font-semibold text-lg shadow-sm transition-all flex items-center justify-center gap-2">
              Watch Demo
            </button>
          </div>

          {/* Live Interactive Demo Widget */}
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transform hover:scale-[1.01] transition-duration-500">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <span className="ml-4 text-sm font-medium text-slate-500">GeniusPrep Magic Scan</span>
              </div>
              <div className="text-xs text-royal-600 font-semibold bg-royal-50 px-3 py-1 rounded-full">LIVE PREVIEW</div>
            </div>
            
            <div className="p-8 grid md:grid-cols-2 gap-8 items-start min-h-[400px]">
              <div className="flex flex-col h-full">
                <label className="flex-1 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-8 cursor-pointer hover:border-royal-400 hover:bg-royal-50 transition-colors group h-64 md:h-auto relative overflow-hidden bg-slate-50">
                  <input type="file" className="hidden" accept="image/*" onChange={handleDemoUpload} />
                   {demoFile ? (
                     <img src={URL.createObjectURL(demoFile)} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                   ) : (
                     <>
                      <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Upload className="w-8 h-8 text-royal-600" />
                      </div>
                      <p className="text-slate-900 font-medium mb-1">Upload a problem</p>
                      <p className="text-slate-500 text-sm">Math, Physics, Bio, Notes...</p>
                     </>
                   )}
                </label>
                {demoFile && !isLoading && !demoResult && (
                   <div className="mt-4 text-center text-sm text-slate-500 animate-pulse">Analyzing...</div>
                )}
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 h-full border border-slate-100 overflow-y-auto max-h-[400px]">
                {isLoading ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400">
                    <Loader2 className="w-10 h-10 animate-spin text-royal-600 mb-3" />
                    <p>Gemini 3 Pro is thinking...</p>
                  </div>
                ) : demoResult ? (
                  <div className="prose prose-sm prose-slate">
                     <div className="flex items-center gap-2 mb-3 text-teal-600 font-semibold">
                       <Sparkles className="w-4 h-4"/> AI Explanation
                     </div>
                     <div className="text-slate-700 whitespace-pre-line">{demoResult}</div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center">
                    <BrainCircuit className="w-12 h-12 mb-3 opacity-20" />
                    <p>Result will appear here.<br/>Try uploading a photo of a math problem or a biology diagram!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything you need to ace exams</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">From messy notes to final revision, GeniusPrep supports every step of your academic journey.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
             <FeatureCard 
               icon={<Zap className="w-6 h-6 text-white" />}
               color="bg-royal-500"
               title="Exam Mode"
               description="Auto-generate 30-day study plans & predicted questions from your syllabus."
               link="/exam-mode"
             />
             <FeatureCard 
               icon={<Camera className="w-6 h-6 text-white" />}
               color="bg-teal-500"
               title="Scan Board Mode"
               description="Turn photos of classroom whiteboards into clean, summarized digital notes."
               link="/scan-board"
             />
             <FeatureCard 
               icon={<FileText className="w-6 h-6 text-white" />}
               color="bg-saffron-500"
               title="Paper Generator"
               description="Create unlimited mock exams and quizzes from any textbook PDF or chapter."
               link="/paper-generator"
             />
             <FeatureCard 
               icon={<PenTool className="w-6 h-6 text-white" />}
               color="bg-indigo-500"
               title="Smart Notes"
               description="Condense 100-page PDFs into 1-page mind maps and formula sheets."
               link="#"
             />
          </div>
        </div>
      </section>

      {/* Multimodal Showcase Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid lg:grid-cols-2 gap-16 items-center">
             <div>
               <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                 It understands <span className="text-teal-600">photos</span>, diagrams, and messy handwriting.
               </h2>
               <div className="space-y-6">
                 <div className="flex items-start gap-4">
                   <div className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center text-teal-600 shrink-0">
                     <CheckCircle2 className="w-6 h-6" />
                   </div>
                   <div>
                     <h3 className="font-semibold text-lg text-slate-900">Chemistry Structures</h3>
                     <p className="text-slate-600">Upload a photo of an organic molecule. We'll name it, explain its properties, and reaction mechanisms.</p>
                   </div>
                 </div>
                 <div className="flex items-start gap-4">
                   <div className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center text-royal-600 shrink-0">
                     <CheckCircle2 className="w-6 h-6" />
                   </div>
                   <div>
                     <h3 className="font-semibold text-lg text-slate-900">Physics Circuits</h3>
                     <p className="text-slate-600">Snap a circuit diagram. GeniusPrep calculates resistance, current, and explains the flow.</p>
                   </div>
                 </div>
                 <div className="flex items-start gap-4">
                   <div className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center text-saffron-500 shrink-0">
                     <CheckCircle2 className="w-6 h-6" />
                   </div>
                   <div>
                     <h3 className="font-semibold text-lg text-slate-900">Handwritten Derivations</h3>
                     <p className="text-slate-600">Understand complex math derivations from your teacher's board instantly.</p>
                   </div>
                 </div>
               </div>
             </div>
             <div className="relative">
                {/* Decorative image arrangement */}
                <div className="relative z-10 bg-white p-2 rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img src="https://picsum.photos/600/400?random=1" alt="Student studying with tablet" className="rounded-xl w-full" />
                  <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce-slow">
                     <div className="bg-green-100 p-2 rounded-full text-green-600"><CheckCircle2 className="w-5 h-5" /></div>
                     <div>
                       <p className="text-xs text-slate-500 font-semibold uppercase">Answer Verified</p>
                       <p className="font-bold text-slate-900">98% Accuracy</p>
                     </div>
                  </div>
                </div>
                <div className="absolute top-10 -left-10 w-full h-full border-2 border-dashed border-slate-300 rounded-2xl z-0"></div>
             </div>
           </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard: React.FC<{icon: React.ReactNode, color: string, title: string, description: string, link: string}> = ({ icon, color, title, description, link }) => (
  <Link to={link} className="group p-8 bg-white rounded-3xl border border-slate-100 shadow-lg hover:shadow-2xl hover:border-royal-100 transition-all duration-300">
    <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-royal-600 transition-colors">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </Link>
);

export default Home;
