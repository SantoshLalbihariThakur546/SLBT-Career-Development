import React, { useState } from 'react';
import { Bot, Sparkles, Send, GraduationCap, Target, Clock, Code, Heart } from 'lucide-react';

const AICareerAssistant = () => {
    const [formData, setFormData] = useState({
        education: '',
        interest: '',
        goal: '',
        time: '',
        skills: ''
    });
    
    const [roadmap, setRoadmap] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const generateRoadmap = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setRoadmap('');

        try {
            const token = localStorage.getItem('token');
            
            // Standardized fetch to match your backend structure
            const response = await fetch('http://localhost:5000/api/ai/roadmap', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Pass the token so the protected AI route allows the request
                    'Authorization': token ? `Bearer ${token}` : '' 
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setRoadmap(result.data);
            } else {
                setError(result.message || 'AI generation failed. Please try again.');
            }
        } catch (err) {
            setError('Failed to connect to the AI server. Please ensure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-8">
                
                {/* Header */}
                <div className="text-center">
                    <div className="inline-flex items-center justify-center p-4 bg-blue-100 rounded-full mb-4 shadow-sm">
                        <Bot size={40} className="text-[#0d2344]" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-[#0d2344]">AI Career Assistant</h1>
                    <p className="mt-3 text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
                        Tell us where you are and where you want to go. Our AI will analyze your profile and instantly generate a personalized roadmap for your success.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Input Form (Left Side) */}
                    <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
                        <h2 className="font-bold text-xl mb-6 flex items-center gap-2 text-slate-800 border-b pb-3">
                            <Sparkles className="text-[#f0a500]" size={24} /> Your Profile
                        </h2>
                        
                        <form onSubmit={generateRoadmap} className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Current Education</label>
                                <div className="relative">
                                    <GraduationCap className="absolute left-3 top-3 text-slate-400" size={18} />
                                    <input required name="education" value={formData.education} onChange={handleChange} placeholder="e.g., B.Tech CSE 6th Semester" className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-[#0d2344] focus:ring-1 focus:ring-[#0d2344] focus:outline-none transition-all" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Career Goal</label>
                                <div className="relative">
                                    <Target className="absolute left-3 top-3 text-slate-400" size={18} />
                                    <input required name="goal" value={formData.goal} onChange={handleChange} placeholder="e.g., Cyber Security Analyst, UPSC, Data Scientist" className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-[#0d2344] focus:ring-1 focus:ring-[#0d2344] focus:outline-none transition-all" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Key Interests</label>
                                <div className="relative">
                                    <Heart className="absolute left-3 top-3 text-slate-400" size={18} />
                                    <input name="interest" value={formData.interest} onChange={handleChange} placeholder="e.g., Coding, Networking, Public Service" className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-[#0d2344] focus:ring-1 focus:ring-[#0d2344] focus:outline-none transition-all" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Current Skills</label>
                                <div className="relative">
                                    <Code className="absolute left-3 top-3 text-slate-400" size={18} />
                                    <input name="skills" value={formData.skills} onChange={handleChange} placeholder="e.g., Python, C++, Analytical Thinking" className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-[#0d2344] focus:ring-1 focus:ring-[#0d2344] focus:outline-none transition-all" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Time Available</label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-3 text-slate-400" size={18} />
                                    <input name="time" value={formData.time} onChange={handleChange} placeholder="e.g., 1 Year, 4 hours daily" className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-[#0d2344] focus:ring-1 focus:ring-[#0d2344] focus:outline-none transition-all" />
                                </div>
                            </div>

                            <button type="submit" disabled={loading} className="w-full mt-4 bg-[#0d2344] hover:bg-[#1a3a6b] text-white py-3.5 rounded-lg text-sm font-bold shadow-md transition-all active:scale-95 disabled:opacity-70 disabled:active:scale-100 flex justify-center items-center gap-2">
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                        Analyzing Profile...
                                    </>
                                ) : (
                                    <><Send size={18} /> Generate Roadmap</>
                                )}
                            </button>
                        </form>
                        {error && <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">{error}</div>}
                    </div>

                    {/* AI Output Window (Right Side) */}
                    <div className="lg:col-span-7 bg-[#0b1b33] text-white p-6 md:p-8 rounded-2xl shadow-xl border border-slate-700 flex flex-col h-[600px] relative overflow-hidden">
                        
                        {/* Background subtle decoration */}
                        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                            <Bot size={200} />
                        </div>

                        <h2 className="font-bold text-xl mb-4 flex items-center gap-2 border-b border-slate-600 pb-4 relative z-10">
                            <Sparkles className="text-[#f0a500]" size={24} /> Your Personalized Plan
                        </h2>
                        
                        <div className="flex-grow overflow-y-auto pr-4 relative z-10 custom-scrollbar">
                            {loading ? (
                                <div className="h-full flex flex-col items-center justify-center space-y-5 text-slate-400">
                                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#f0a500] border-t-transparent shadow-lg"></div>
                                    <div className="text-center">
                                        <p className="animate-pulse font-semibold text-slate-300">Synthesizing data models...</p>
                                        <p className="text-xs text-slate-500 mt-2">Mapping skills to industry requirements</p>
                                    </div>
                                </div>
                            ) : roadmap ? (
                                <div className="text-sm md:text-base text-slate-200 whitespace-pre-wrap leading-relaxed pb-6">
                                    {roadmap}
                                </div>
                            ) : (
                                <div className="h-full flex items-center justify-center text-slate-500 text-center px-8">
                                    <p className="text-lg">Fill out your profile on the left to see your custom AI-generated career roadmap here.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AICareerAssistant;