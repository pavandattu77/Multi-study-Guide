import React, { useState } from 'react';
import { Camera, RefreshCw, Download, ArrowRight, Loader2, Maximize2 } from 'lucide-react';
import { cleanNotes } from '../services/geminiService';

const ScanBoard: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [cleanedNotes, setCleanedNotes] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setCleanedNotes(""); 
    }
  };

  const handleProcess = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const text = await cleanNotes(image);
      setCleanedNotes(text);
    } catch (err) {
      console.error(err);
      setCleanedNotes("Error processing image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
           <h1 className="text-4xl font-bold text-slate-900 mb-2">Scan Board Mode</h1>
           <p className="text-slate-600 text-lg">Turn messy whiteboard photos into crisp, organized Markdown notes.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <div className="relative aspect-[4/3] bg-slate-100 rounded-3xl border-2 border-dashed border-slate-300 overflow-hidden flex flex-col items-center justify-center group hover:border-royal-400 transition-colors">
              {preview ? (
                <img src={preview} alt="Upload" className="w-full h-full object-contain" />
              ) : (
                <div className="text-center p-6">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md mx-auto mb-4">
                    <Camera className="w-10 h-10 text-slate-400 group-hover:text-royal-600 transition-colors" />
                  </div>
                  <p className="text-slate-500 font-medium">Click to upload or drag photo</p>
                  <p className="text-xs text-slate-400 mt-2">Supports JPG, PNG</p>
                </div>
              )}
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                className="absolute inset-0 opacity-0 cursor-pointer" 
              />
            </div>

            <button
              onClick={handleProcess}
              disabled={!image || loading}
              className="w-full py-4 bg-royal-600 hover:bg-royal-700 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
            >
              {loading ? <Loader2 className="animate-spin" /> : <>Clean & Summarize <ArrowRight className="w-5 h-5"/></>}
            </button>
          </div>

          {/* Result Section */}
          <div className="bg-slate-50 rounded-3xl border border-slate-200 p-8 shadow-inner min-h-[500px] flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-800 text-xl flex items-center gap-2">
                <Maximize2 className="w-5 h-5 text-teal-500"/> Digital Notes
              </h3>
              {cleanedNotes && (
                <button className="text-sm text-royal-600 hover:underline flex items-center gap-1">
                  <Download className="w-4 h-4" /> Save PDF
                </button>
              )}
            </div>
            
            <div className="flex-1 font-mono text-sm text-slate-700 overflow-y-auto whitespace-pre-wrap leading-relaxed">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-4">
                  <RefreshCw className="w-8 h-8 animate-spin text-teal-500" />
                  <p>Deciphering handwriting...</p>
                  <p className="text-xs">Using Gemini 3 Pro Vision</p>
                </div>
              ) : cleanedNotes ? (
                cleanedNotes
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400 italic">
                  Processed notes will appear here...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanBoard;
