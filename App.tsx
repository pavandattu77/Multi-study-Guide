import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ExamMode from './pages/ExamMode';
import ScanBoard from './pages/ScanBoard';
import PaperGenerator from './pages/PaperGenerator';
import Tutor from './pages/Tutor';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exam-mode" element={<ExamMode />} />
            <Route path="/scan-board" element={<ScanBoard />} />
            <Route path="/paper-generator" element={<PaperGenerator />} />
            <Route path="/tutor" element={<Tutor />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
