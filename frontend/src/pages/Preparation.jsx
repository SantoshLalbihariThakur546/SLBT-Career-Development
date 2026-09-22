import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, FileText, CheckCircle, BarChart2 } from 'lucide-react';

export default function Preparation() {
  const [activeCategory, setActiveCategory] = useState('UPSC');
  const [resources, setResources] = useState([]);
  const [studyLogs, setStudyLogs] = useState([]);
  const [logData, setLogData] = useState({ subject: '', hours: '', notes: '' });

  const categories = ['UPSC', 'GATE', 'SSC', 'Railway', 'Engineering'];

  // For portfolio demonstration, we use mock data if backend isn't populated yet
  const mockResources = [
    { _id: '1', title: 'Polity Notes (M. Laxmikanth summary)', type: 'PDF', category: 'UPSC' },
    { _id: '2', title: 'Data Structures & Algorithms Cheat Sheet', type: 'PDF', category: 'GATE' },
    { _id: '3', title: 'Quant Aptitude Mock Test 1', type: 'Mock Test', category: 'SSC' }
  ];

  useEffect(() => {
    // In a real flow, fetch from: http://localhost:5000/api/preparation/resources/${activeCategory}
    // and http://localhost:5000/api/preparation/logs
    setResources(mockResources.filter(r => r.category === activeCategory));
  }, [activeCategory]);

  const handleLogSubmit = (e) => {
    e.preventDefault();
    // In a real flow, POST to /api/preparation/log here
    const newLog = { ...logData, _id: Date.now().toString(), date: new Date().toISOString() };
    setStudyLogs([newLog, ...studyLogs]);
    setLogData({ subject: '', hours: '', notes: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#0b1c3c] mb-8 flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-yellow-500" />
          Study Resources & Preparation
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Resource Library (66%) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Exam Materials</h2>
              
              {/* Category Tabs */}
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                      activeCategory === cat 
                        ? 'bg-[#0b1c3c] text-yellow-400' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Resource List */}
              <div className="space-y-3">
                {resources.length === 0 ? (
                  <p className="text-gray-500 text-sm py-4">No resources uploaded for this category yet.</p>
                ) : (
                  resources.map(resource => (
                    <div key={resource._id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3">
                        <FileText className="w-6 h-6 text-blue-600" />
                        <div>
                          <p className="font-bold text-gray-800 text-sm">{resource.title}</p>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded mt-1 inline-block">
                            {resource.type}
                          </span>
                        </div>
                      </div>
                      <button className="text-sm font-bold text-blue-600 hover:text-blue-800">
                        Access &rarr;
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Study Tracker (33%) */}
          <div className="space-y-6">
            <div className="bg-[#0b1c3c] p-6 rounded-xl shadow-sm text-white">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-yellow-400" />
                <h2 className="text-lg font-bold">Daily Study Tracker</h2>
              </div>
              
              <form onSubmit={handleLogSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-blue-200 mb-1">Subject / Topic</label>
                  <input type="text" required value={logData.subject} onChange={(e) => setLogData({...logData, subject: e.target.value})} className="w-full p-2 bg-[#1a3266] border border-blue-800 rounded text-sm text-white outline-none focus:border-yellow-400" placeholder="e.g., Data Analytics" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-blue-200 mb-1">Hours Studied</label>
                  <input type="number" step="0.5" required value={logData.hours} onChange={(e) => setLogData({...logData, hours: e.target.value})} className="w-full p-2 bg-[#1a3266] border border-blue-800 rounded text-sm text-white outline-none focus:border-yellow-400" placeholder="e.g., 2.5" />
                </div>
                <button type="submit" className="w-full bg-yellow-400 text-[#0b1c3c] font-bold py-2 rounded text-sm hover:bg-yellow-300 transition-colors">
                  Log Hours
                </button>
              </form>
            </div>

            {/* Recent Logs */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-green-600" /> Recent Progress
              </h3>
              <div className="space-y-3">
                {studyLogs.length === 0 ? (
                  <p className="text-xs text-gray-500">No study hours logged yet today.</p>
                ) : (
                  studyLogs.map((log) => (
                    <div key={log._id} className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                      <span className="font-medium text-gray-700">{log.subject}</span>
                      <span className="font-bold text-green-600">{log.hours} hrs</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}