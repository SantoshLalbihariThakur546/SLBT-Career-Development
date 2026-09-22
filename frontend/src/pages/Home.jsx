import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { 
  PlayCircle, Target, TrendingUp, Award, Users, Shield, 
  Zap, CheckCircle, GraduationCap, Briefcase, Calculator, 
  Stethoscope, Code, Cpu, BarChart, Database, Globe, 
  Phone, User, ArrowRight, BookMarked, MapPin, X, Lock, Mail, ChevronDown,
  Info, Clock, Send
} from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  // Consultation Form State
  const [formData, setFormData] = useState({
    name: '', objective: '', qualification: '', mobile: ''
  });

  // Contact Form State
  const [contactData, setContactData] = useState({
    name: '', email: '', message: ''
  });

  // Auth Modal State
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [authData, setAuthData] = useState({
    name: '', email: '', password: ''
  });

  // Handle Consultation Form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleConsultationSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/consultations/book', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Success: Consultation request received!');
        setFormData({ name: '', objective: '', qualification: '', mobile: '' });
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      alert('Failed to connect to the server.');
    }
  };

  // Handle Contact Form
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for reaching out! Our team will contact you shortly.');
    setContactData({ name: '', email: '', message: '' });
  };

  // Handle Authentication (Login/Register)
  const handleAuthChange = (e) => {
    const { name, value } = e.target;
    setAuthData(prev => ({ ...prev, [name]: value }));
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLoginMode ? '/api/auth/login' : '/api/auth/register';
    
    // Default role for new signups is Student
    const payload = isLoginMode 
      ? { email: authData.email, password: authData.password }
      : { ...authData, role: 'Student' };

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert(`${isLoginMode ? 'Login' : 'Registration'} Successful! Welcome ${data.name || ''}`);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));
        setIsAuthOpen(false);
        setAuthData({ name: '', email: '', password: '' });
        navigate('/dashboard');
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      alert('Server connection failed. Is your backend running?');
    }
  };

  // Function passed to Navbar to open the auth modal
  const openAuthModal = (mode) => {
    setIsLoginMode(mode === 'login');
    setIsAuthOpen(true);
  };

  const careerPaths = [
    { title: 'UPSC', subtitle: 'Civil Services', icon: <Award className="w-6 h-6 text-blue-600" /> },
    { title: 'State PSC', subtitle: 'BPSC, UPPSC, MPPSC etc.', icon: <MapPin className="w-6 h-6 text-blue-600" /> },
    { title: 'SSC', subtitle: 'Staff Selection Commission', icon: <Users className="w-6 h-6 text-green-600" /> },
    { title: 'Railway', subtitle: 'RRB, ALP, NTPC, Group D', icon: <TrendingUp className="w-6 h-6 text-red-600" /> },
    { title: 'Banking', subtitle: 'IBPS, SBI, RBI etc.', icon: <Briefcase className="w-6 h-6 text-indigo-600" /> },
    { title: 'Defence', subtitle: 'NDA, CDS, AFCAT etc.', icon: <Shield className="w-6 h-6 text-orange-600" /> },
    { title: 'JEE', subtitle: 'Main & Advanced', icon: <Calculator className="w-6 h-6 text-purple-600" /> },
    { title: 'NEET', subtitle: 'Medical Entrance', icon: <Stethoscope className="w-6 h-6 text-teal-600" /> },
    { title: 'GATE', subtitle: 'Graduate Aptitude Test', icon: <Cpu className="w-6 h-6 text-slate-800" /> },
    { title: 'Diploma / ITI', subtitle: 'Polytechnic, ITI, Skill Courses', icon: <GraduationCap className="w-6 h-6 text-blue-800" /> },
    { title: 'Engineering', subtitle: 'B.Tech / M.Tech', icon: <Code className="w-6 h-6 text-blue-500" /> },
    { title: 'Data Analytics', subtitle: 'Data Science, BI, Python', icon: <BarChart className="w-6 h-6 text-cyan-600" /> },
    { title: 'Cyber Security', subtitle: 'Security Analyst, Ethical Hacking', icon: <Database className="w-6 h-6 text-blue-900" /> },
    { title: 'Other Careers', subtitle: 'Govt Jobs, Private Jobs, Skill etc.', icon: <Globe className="w-6 h-6 text-gray-700" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
      
      {/* AUTHENTICATION MODAL */}
      {isAuthOpen && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden relative">
            <button onClick={() => setIsAuthOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800">
              <X className="w-5 h-5" />
            </button>
            
            <div className="bg-[#0b1c3c] p-6 text-white text-center">
              <div className="flex justify-center mb-2">
                 <div className="w-10 h-10 rounded-lg flex items-center justify-center text-yellow-400">
                   <BookMarked className="w-8 h-8 stroke-[2.5]" />
                 </div>
              </div>
              <h2 className="text-2xl font-bold">{isLoginMode ? 'Welcome Back' : 'Create an Account'}</h2>
              <p className="text-sm text-blue-200 mt-1">
                {isLoginMode ? 'Login to access your dashboard' : 'Join SLBT to start your journey'}
              </p>
            </div>

            <form onSubmit={handleAuthSubmit} className="p-6 space-y-4">
              {!isLoginMode && (
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input type="text" name="name" value={authData.name} onChange={handleAuthChange} placeholder="Full Name" required className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
              )}
              
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input type="email" name="email" value={authData.email} onChange={handleAuthChange} placeholder="Email Address" required className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
              </div>

              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input type="password" name="password" value={authData.password} onChange={handleAuthChange} placeholder="Password" required className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
              </div>

              <button type="submit" className="w-full bg-yellow-400 text-[#0b1c3c] font-bold py-2.5 rounded-md hover:bg-yellow-300 transition-colors shadow-md">
                {isLoginMode ? 'Login' : 'Sign Up'}
              </button>

              <div className="text-center text-sm text-gray-500 mt-4 border-t pt-4">
                {isLoginMode ? "Don't have an account? " : "Already have an account? "}
                <button type="button" onClick={() => setIsLoginMode(!isLoginMode)} className="text-blue-600 font-bold hover:underline">
                  {isLoginMode ? 'Sign Up here' : 'Login here'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* GLOBAL NAVBAR */}
      <Navbar onOpenAuth={openAuthModal} />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative bg-[#0d2247] text-white pt-16 pb-20 px-6 md:px-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d2247] via-[#112d5e] to-transparent z-0"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#1a3266] text-blue-200 text-sm px-4 py-1.5 rounded-full">
                <Target className="w-4 h-4" />
                <span>Your Career Guide, Our Mission &rarr;</span>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-extrabold leading-tight">
                Right Guidance <br />
                <span className="text-yellow-400">Brighter Future</span>
              </h2>
              
              <p className="text-lg text-gray-300 max-w-2xl">
                SLBT Career Development helps you discover your true potential, choose the right career path and achieve your dreams with expert guidance, personalized plans and complete support.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button 
                  onClick={() => openAuthModal('signup')} 
                  className="bg-yellow-400 text-[#0b1c3c] px-6 py-3 rounded-md font-bold hover:bg-yellow-300 transition-colors flex items-center gap-2"
                >
                  Start Your Career Journey <ArrowRight className="w-5 h-5" />
                </button>
                <button className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-[#0b1c3c] transition-colors flex items-center gap-2">
                  <PlayCircle className="w-5 h-5" /> Watch Intro Video
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-[#1a3266] mt-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#1a3266] rounded-full"><Users className="w-5 h-5 text-yellow-400" /></div>
                  <div><p className="text-sm font-semibold">Expert Counselors</p><p className="text-xs text-gray-400">Personalized Guidance</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#1a3266] rounded-full"><Target className="w-5 h-5 text-yellow-400" /></div>
                  <div><p className="text-sm font-semibold">Career Assessment</p><p className="text-xs text-gray-400">Know Your Strengths</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#1a3266] rounded-full"><BookMarked className="w-5 h-5 text-yellow-400" /></div>
                  <div><p className="text-sm font-semibold">Study Resources</p><p className="text-xs text-gray-400">Curated & Updated</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#1a3266] rounded-full"><TrendingUp className="w-5 h-5 text-yellow-400" /></div>
                  <div><p className="text-sm font-semibold">Progress Tracking</p><p className="text-xs text-gray-400">Achieve Your Goals</p></div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative hidden lg:block h-[500px]">
              <div className="absolute top-0 right-10 flex flex-col gap-2 items-end z-20 font-bold text-sm">
                <div className="bg-red-600 text-white px-6 py-1 clip-path-polygon">UPSC</div>
                <div className="bg-orange-500 text-white px-8 py-1 clip-path-polygon">SSC</div>
                <div className="bg-green-600 text-white px-10 py-1 clip-path-polygon">RAILWAY</div>
                <div className="bg-blue-600 text-white px-12 py-1 clip-path-polygon">BANKING</div>
                <div className="bg-orange-700 text-white px-14 py-1 clip-path-polygon">DEFENCE</div>
                <div className="bg-indigo-800 text-white px-16 py-1 clip-path-polygon">ENGINEERING</div>
                <div className="bg-pink-600 text-white px-14 py-1 clip-path-polygon">GATE</div>
                <div className="bg-purple-600 text-white px-12 py-1 clip-path-polygon">JEE</div>
                <div className="bg-teal-600 text-white px-10 py-1 clip-path-polygon">NEET</div>
                <div className="bg-yellow-600 text-white px-8 py-1 clip-path-polygon">DIPLOMA / ITI</div>
                <div className="bg-slate-800 text-white px-6 py-1 clip-path-polygon">& MORE...</div>
              </div>

              <div className="absolute top-10 -right-4 z-30 transform rotate-12 bg-transparent">
                <h3 className="text-4xl font-black text-blue-200" style={{ fontFamily: 'cursive' }}>Dream<br/>Plan<br/>Achieve</h3>
              </div>
              
              <div className="absolute bottom-0 left-0 w-full h-[400px] bg-slate-800 rounded-t-full flex items-end justify-center border-4 border-[#0b1c3c] overflow-hidden opacity-50">
                <User className="w-64 h-64 text-slate-600 mb-[-20px]" />
              </div>
            </div>
          </div>
        </section>

        {/* MAIN CONTENT (Career Paths + Sidebar) */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-12">
            
            <div>
              <div className="flex justify-between items-end mb-6">
                <div>
                  <div className="flex items-center gap-2 text-[#0b1c3c] mb-1">
                    <Target className="w-6 h-6" />
                    <h3 className="text-2xl font-bold">Popular Career Paths</h3>
                  </div>
                  <p className="text-gray-500 text-sm">Explore your options. Get expert guidance for the best career choice.</p>
                </div>
                <a href="#" className="text-blue-600 font-medium text-sm flex items-center hover:underline">
                  View All Career Paths <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {careerPaths.map((path, index) => (
                  <div key={index} className="bg-white border border-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-start gap-3 cursor-pointer">
                    <div className="p-2 bg-gray-50 rounded-md">
                      {path.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm">{path.title}</h4>
                      <p className="text-xs text-gray-500">{path.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 text-[#0b1c3c] mb-2">
                <Award className="w-6 h-6" />
                <h3 className="text-xl font-bold">Why Choose SLBT Career Development?</h3>
              </div>
              <p className="text-gray-500 text-sm mb-6">We provide the right direction, resources and support to help you succeed.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex items-center gap-3">
                  <div className="bg-[#0b1c3c] text-yellow-400 p-3 rounded-full"><Users className="w-5 h-5"/></div>
                  <div><h5 className="font-bold text-sm">Expert Guidance</h5><p className="text-xs text-gray-500">From experienced mentors</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-[#0b1c3c] text-yellow-400 p-3 rounded-full"><Zap className="w-5 h-5"/></div>
                  <div><h5 className="font-bold text-sm">AI-Powered Insights</h5><p className="text-xs text-gray-500">Personalized career suggestions</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-[#0b1c3c] text-yellow-400 p-3 rounded-full"><CheckCircle className="w-5 h-5"/></div>
                  <div><h5 className="font-bold text-sm">Proven Success</h5><p className="text-xs text-gray-500">Thousands of happy students</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-[#0b1c3c] text-yellow-400 p-3 rounded-full"><Shield className="w-5 h-5"/></div>
                  <div><h5 className="font-bold text-sm">Complete Support</h5><p className="text-xs text-gray-500">From planning to placement</p></div>
                </div>
              </div>
            </div>

          </div>

          <div className="lg:col-span-4 relative">
            <div className="sticky top-24 space-y-6">
              
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-[#0b1c3c] p-6 text-white text-center">
                  <div className="flex justify-center mb-3">
                    <div className="bg-yellow-400 p-3 rounded-full">
                      <Users className="w-8 h-8 text-[#0b1c3c]" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold">Free Career Consultation</h3>
                  <p className="text-sm text-blue-200 mt-1">Talk to our experts and get personalized guidance for your future.</p>
                </div>
                
                <form onSubmit={handleConsultationSubmit} className="p-6 space-y-4">
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Your Name" required className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
                  </div>
                  
                  <div className="relative">
                    <Target className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select name="objective" value={formData.objective} onChange={handleInputChange} required className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md text-sm text-gray-600 focus:ring-1 focus:ring-blue-500 outline-none appearance-none">
                      <option value="" disabled>Select Career Objective</option>
                      <option value="UPSC">UPSC / Civil Services</option>
                      <option value="SSC">SSC / Banking</option>
                      <option value="Engineering">Engineering / Tech</option>
                      <option value="Medical">Medical / NEET</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>

                  <div className="relative">
                    <GraduationCap className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select name="qualification" value={formData.qualification} onChange={handleInputChange} required className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md text-sm text-gray-600 focus:ring-1 focus:ring-blue-500 outline-none appearance-none">
                      <option value="" disabled>Your Qualification</option>
                      <option value="10th">10th Pass</option>
                      <option value="12th">12th Pass</option>
                      <option value="Graduate">Graduate</option>
                      <option value="PostGraduate">Post Graduate</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>

                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} placeholder="Mobile Number" required className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
                  </div>

                  <button type="submit" className="w-full bg-yellow-400 text-[#0b1c3c] font-bold py-3 rounded-md hover:bg-yellow-300 transition-colors shadow-md">
                    Book Consultation &rarr;
                  </button>

                  <div className="flex justify-between items-center text-[11px] text-gray-500 pt-2 border-t border-gray-100">
                    <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-green-600"/> 100% Free Initial Guidance</span>
                    <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-blue-600"/> Confidential & Secure</span>
                  </div>
                </form>
              </div>

              <div className="bg-[#0b1c3c] rounded-xl p-6 text-white flex items-center gap-4 relative overflow-hidden shadow-lg">
                <div className="absolute right-[-20px] top-[-20px] opacity-10">
                  <Users className="w-32 h-32" />
                </div>
                <div className="w-16 h-16 bg-blue-900 rounded-full flex-shrink-0 flex items-center justify-center border-2 border-yellow-400">
                  <User className="w-8 h-8 text-yellow-400" />
                </div>
                <div>
                  <p className="text-yellow-400 font-bold italic text-lg leading-tight">"Your Dream<br/>Our Guidance"</p>
                  <p className="text-xs text-blue-200 mt-1">Let's build your future together!</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="bg-white border-y border-gray-100 py-16 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                  <Info className="w-4 h-4" /> About SLBT Career Development
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1c3c] leading-tight">
                  Empowering Students to Achieve Their <span className="text-yellow-500">True Potential</span>
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  SLBT Career Development was founded with a singular vision: to bridge the gap between student aspirations and career success. We understand that navigating the multitude of career options in today's competitive landscape can be overwhelming.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Through AI-driven insights, expert one-on-one counseling, and highly structured study roadmaps, we provide a crystal-clear path for aspirants targeting competitive exams, government jobs, and top-tier private sector roles. Your success is our mission.
                </p>
                <div className="pt-4 flex gap-4">
                  <div className="bg-gray-50 border border-gray-100 p-4 rounded-lg flex-1">
                    <h4 className="font-bold text-[#0b1c3c] text-xl mb-1">Our Mission</h4>
                    <p className="text-xs text-gray-500">To provide accessible, high-quality career mentorship to every student.</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-100 p-4 rounded-lg flex-1">
                    <h4 className="font-bold text-[#0b1c3c] text-xl mb-1">Our Vision</h4>
                    <p className="text-xs text-gray-500">To be the most trusted educational planning platform globally.</p>
                  </div>
                </div>
              </div>
              <div className="relative h-full min-h-[400px] bg-gradient-to-br from-[#0d2247] to-blue-900 rounded-2xl overflow-hidden flex items-center justify-center shadow-xl border-4 border-gray-50">
                <div className="absolute inset-0 opacity-20">
                  <Globe className="w-full h-full text-white scale-150 transform translate-x-1/4 translate-y-1/4" />
                </div>
                <div className="relative z-10 text-center px-8">
                  <BookMarked className="w-20 h-20 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Join the SLBT Community</h3>
                  <p className="text-blue-200 text-sm">Thousands of students have already accelerated their careers with our strategic guidance.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-16 px-6 md:px-12 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1c3c] mb-4">Get In Touch</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Have questions about our mentorship programs or need help getting started? Our support team is here to assist you every step of the way.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Contact Info Cards */}
              <div className="lg:col-span-4 space-y-4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-start gap-4 transition-transform hover:-translate-y-1">
                   <div className="bg-blue-50 p-3 rounded-full text-blue-600">
                     <MapPin className="w-6 h-6" />
                   </div>
                   <div>
                     <h4 className="font-bold text-[#0b1c3c] mb-1">Office Location</h4>
                     <p className="text-sm text-gray-500">SLBT Education Hub<br/>Tech Park, City Center</p>
                   </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-start gap-4 transition-transform hover:-translate-y-1">
                   <div className="bg-green-50 p-3 rounded-full text-green-600">
                     <Phone className="w-6 h-6" />
                   </div>
                   <div>
                     <h4 className="font-bold text-[#0b1c3c] mb-1">Phone Number</h4>
                     <p className="text-sm text-gray-500">+91 98765 43210<br/>+91 98765 43211</p>
                   </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-start gap-4 transition-transform hover:-translate-y-1">
                   <div className="bg-orange-50 p-3 rounded-full text-orange-600">
                     <Mail className="w-6 h-6" />
                   </div>
                   <div>
                     <h4 className="font-bold text-[#0b1c3c] mb-1">Email Address</h4>
                     <p className="text-sm text-gray-500">support@slbtcareer.com<br/>info@slbtcareer.com</p>
                   </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-start gap-4 transition-transform hover:-translate-y-1">
                   <div className="bg-purple-50 p-3 rounded-full text-purple-600">
                     <Clock className="w-6 h-6" />
                   </div>
                   <div>
                     <h4 className="font-bold text-[#0b1c3c] mb-1">Working Hours</h4>
                     <p className="text-sm text-gray-500">Monday - Saturday<br/>09:00 AM - 07:00 PM</p>
                   </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-8 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-[#0b1c3c]">Send us a Message</h3>
                  <p className="text-sm text-gray-500 mt-1">Fill out the form below and we will get back to you within 24 hours.</p>
                </div>
                
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Full Name</label>
                      <input 
                        type="text" name="name" required
                        value={contactData.name} onChange={handleContactChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-gray-50 focus:bg-white transition-colors" 
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Email Address</label>
                      <input 
                        type="email" name="email" required
                        value={contactData.email} onChange={handleContactChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-gray-50 focus:bg-white transition-colors" 
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Your Message</label>
                    <textarea 
                      name="message" required rows="5"
                      value={contactData.message} onChange={handleContactChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-gray-50 focus:bg-white transition-colors resize-none" 
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="bg-[#0b1c3c] hover:bg-blue-900 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center gap-2">
                    Send Message <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#08152e] text-white pt-12 pb-6 px-6 md:px-12 border-t-4 border-yellow-400 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          
          <div className="flex items-center gap-3">
            <BookMarked className="w-10 h-10 text-yellow-400" />
            <div>
              <h2 className="text-xl font-bold tracking-wide">SLBT</h2>
              <p className="text-[10px] text-gray-400 tracking-widest">CAREER DEVELOPMENT</p>
              <p className="text-[8px] text-gray-500">Dream | Plan | Achieve</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6 text-yellow-400" />
              <div><p className="font-bold">10,000+</p><p className="text-xs text-gray-400">Students Guided</p></div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-6 h-6 text-yellow-400" />
              <div><p className="font-bold">50+</p><p className="text-xs text-gray-400">Career Paths</p></div>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-yellow-400" />
              <div><p className="font-bold">100%</p><p className="text-xs text-gray-400">Support & Mentorship</p></div>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold mb-2 text-center md:text-right">Follow Us</p>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-[#112347] rounded-full hover:bg-yellow-400 hover:text-[#08152e] transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="p-2 bg-[#112347] rounded-full hover:bg-yellow-400 hover:text-[#08152e] transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href="#" className="p-2 bg-[#112347] rounded-full hover:bg-yellow-400 hover:text-[#08152e] transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="#" className="p-2 bg-[#112347] rounded-full hover:bg-yellow-400 hover:text-[#08152e] transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto border-t border-[#1a3266] pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; 2026 SLBT Career Development. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-gray-300">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300">Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  );
}