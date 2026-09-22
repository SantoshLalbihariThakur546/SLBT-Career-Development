import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Target, TrendingUp, BookOpen, CheckCircle, Calendar, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    // Animation variants for staggered card loading
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Mobile Header & Hamburger */}
            <div className="md:hidden fixed top-0 w-full bg-[#0d2344] text-white p-4 z-50 flex justify-between items-center shadow-md">
                <h2 className="text-lg font-black">SLBT <span className="text-[#f0a500]">CAREER</span></h2>
                <button onClick={toggleSidebar} className="focus:outline-none p-1 bg-white/10 rounded">
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar (Responsive Overlay) */}
            <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0d2344] text-white shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:h-screen`}>
                <div className="p-6 hidden md:block">
                    <h2 className="text-2xl font-black text-white tracking-tight">SLBT <span className="text-[#f0a500]">CAREER</span></h2>
                    <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Student Portal</p>
                </div>
                
                <nav className="flex-1 px-4 mt-20 md:mt-4 space-y-2">
                    <Link to="/dashboard" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-xl text-sm font-semibold shadow-inner border border-white/5 transition-all">
                        <TrendingUp size={18} className="text-[#f0a500]" /> Overview
                    </Link>
                    <Link to="/ai-assistant" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-all">
                        <Target size={18} /> AI Career Plan
                    </Link>
                </nav>

                <div className="p-4 border-t border-slate-700/50 bg-black/10">
                    <div className="text-sm mb-4 px-2">
                        <p className="font-bold truncate">{user?.name || 'Student'}</p>
                        <p className="text-xs text-slate-400 truncate">{user?.email || 'student@slbt.com'}</p>
                    </div>
                    <button onClick={logout} className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 py-2.5 rounded-lg text-sm font-bold transition-colors border border-red-500/20">
                        Logout
                    </button>
                </div>
            </div>

            {/* Mobile Overlay Background */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Main Content Area */}
            <div className="flex-1 p-6 md:p-10 w-full mt-16 md:mt-0 max-h-screen overflow-y-auto custom-scrollbar">
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">Welcome, {user?.name?.split(' ')[0] || 'Aspirant'}! 🚀</h1>
                    <p className="text-slate-500 mt-1">Let's continue building your future today.</p>
                </motion.div>
                
                <motion.div 
                    variants={containerVariants} 
                    initial="hidden" 
                    animate="show" 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                >
                    {/* Goal Card */}
                    <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow group">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-amber-50 rounded-lg group-hover:bg-amber-100 transition-colors">
                                <Target className="text-[#f0a500]" size={20} />
                            </div>
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">My Career Goal</h3>
                        </div>
                        <p className="text-xl font-black text-[#0d2344]">UPSC Civil Services</p>
                    </motion.div>

                    {/* Progress Card */}
                    <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow group">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition-colors">
                                    <TrendingUp className="text-emerald-500" size={20} />
                                </div>
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Preparation</h3>
                            </div>
                            <span className="text-xl font-black text-emerald-600">68%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-3 mt-4 overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }} 
                                animate={{ width: '68%' }} 
                                transition={{ duration: 1, delay: 0.5 }}
                                className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-3 rounded-full"
                            ></motion.div>
                        </div>
                    </motion.div>
                    
                    {/* Next Test Card */}
                    <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow group">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                                <Calendar className="text-blue-500" size={20} />
                            </div>
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Upcoming Test</h3>
                        </div>
                        <p className="text-lg font-bold text-[#0d2344]">Mock Test #12</p>
                        <p className="text-xs text-slate-500 mt-1 font-medium">Full-Length Syllabus • Tomorrow, 10 AM</p>
                    </motion.div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Today's Tasks */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col"
                    >
                        <div className="p-5 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
                            <BookOpen className="text-[#0d2344]" size={18} />
                            <h2 className="font-bold text-slate-800">Today's Tasks</h2>
                        </div>
                        <div className="p-6 space-y-5 flex-1">
                            {/* Task Items */}
                            {[
                                { title: 'Polity Revision', desc: '2 Hours • Fundamental Rights' },
                                { title: 'Current Affairs', desc: '1 Hour • Monthly Magazine' },
                                { title: 'MCQ Practice', desc: '50 Questions • History' }
                            ].map((task, idx) => (
                                <label key={idx} className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors border border-transparent hover:border-slate-100">
                                    <div className="relative flex items-center justify-center mt-0.5">
                                        <input type="checkbox" className="peer w-5 h-5 rounded border-slate-300 text-[#0d2344] focus:ring-[#0d2344] transition-all cursor-pointer" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-slate-800 peer-checked:line-through peer-checked:text-slate-400 transition-all">{task.title}</p>
                                        <p className="text-xs text-slate-500 mt-0.5">{task.desc}</p>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </motion.div>

                    {/* Roadmap Timeline */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
                    >
                        <div className="p-5 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
                            <Target className="text-[#0d2344]" size={18} />
                            <h2 className="font-bold text-slate-800">Roadmap Tracking</h2>
                        </div>
                        <div className="p-6 space-y-0">
                            {/* Timeline Item 1 */}
                            <div className="flex gap-5 group">
                                <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-sm">
                                        <CheckCircle size={18} />
                                    </div>
                                    <div className="w-0.5 h-12 bg-emerald-200 mt-2 group-last:hidden"></div>
                                </div>
                                <div className="pb-6 pt-1">
                                    <p className="font-bold text-sm text-slate-800">Month 1: Foundation</p>
                                    <p className="text-xs text-slate-500 mt-1">Completed NCERTs & Basic Concepts</p>
                                </div>
                            </div>
                            
                            {/* Timeline Item 2 */}
                            <div className="flex gap-5 group">
                                <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 rounded-full bg-[#f0a500] text-white flex items-center justify-center text-sm shadow-md ring-4 ring-amber-50">
                                        <span className="animate-spin-slow">🔄</span>
                                    </div>
                                    <div className="w-0.5 h-12 bg-slate-100 mt-2 group-last:hidden"></div>
                                </div>
                                <div className="pb-6 pt-1">
                                    <p className="font-bold text-sm text-[#0d2344]">Month 2: Core Subjects</p>
                                    <p className="text-xs text-[#f0a500] font-semibold mt-1">Currently in Progress</p>
                                </div>
                            </div>

                            {/* Timeline Item 3 */}
                            <div className="flex gap-5 group">
                                <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-sm shadow-sm border border-slate-200">
                                        🔒
                                    </div>
                                </div>
                                <div className="pb-2 pt-1">
                                    <p className="font-bold text-sm text-slate-400">Month 3: Advanced Topics</p>
                                    <p className="text-xs text-slate-400 mt-1">Locked until Month 2 completion</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;