import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  ChevronDown, 
  Search, 
  Menu, 
  X,
  Compass,
  FileText,
  Video,
  Shield,
  Code,
  GraduationCap
} from 'lucide-react';

export default function Navbar({ onOpenAuth }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.trim().toLowerCase();
    
    if (query.includes('upsc') || query.includes('gate') || query.includes('ssc')) {
      navigate('/preparation');
    } else {
      navigate('/assessment');
    }
    setSearchQuery('');
  };

  const toggleDropdown = (menuName) => {
    setActiveDropdown(prev => (prev === menuName ? null : menuName));
  };

  return (
    <nav className="bg-[#081735] text-white sticky top-0 z-50 shadow-lg border-b border-[#142850]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">

          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-yellow-400 group-hover:scale-105 transition-transform">
              <BookOpen className="w-8 h-8 stroke-[2.5]" />
            </div>
            <div className="border-l-2 border-gray-400/50 pl-3">
              <div className="text-xl font-black tracking-tight leading-none text-white flex items-center gap-1">
                SLBT
              </div>
              <div className="text-[10px] tracking-widest uppercase font-semibold text-gray-300 leading-tight">
                Career Development
              </div>
              <div className="text-[9px] text-gray-400 font-medium">
                Dream | Plan | Achieve
              </div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-6 xl:gap-8" ref={dropdownRef}>
            <Link 
              to="/" 
              className={`text-sm font-semibold transition-colors pb-1 ${
                location.pathname === '/' 
                  ? 'text-white border-b-2 border-yellow-400' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Home
            </Link>

            <Link 
              to="/about" 
              className={`text-sm font-semibold transition-colors pb-1 ${
                location.pathname === '/about' 
                  ? 'text-white border-b-2 border-yellow-400' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              About Us
            </Link>

            <div className="relative">
              <button 
                onClick={() => toggleDropdown('careerPaths')}
                className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                  activeDropdown === 'careerPaths' ? 'text-yellow-400' : 'text-gray-300 hover:text-white'
                }`}
              >
                Career Paths
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                  activeDropdown === 'careerPaths' ? 'rotate-180 text-yellow-400' : ''
                }`} />
              </button>

              {activeDropdown === 'careerPaths' && (
                <div className="absolute top-full mt-3 w-64 bg-[#0d2047] rounded-xl shadow-2xl border border-[#1d3568] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link 
                    to="/preparation" 
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-200 hover:bg-[#163065] hover:text-yellow-400"
                  >
                    <GraduationCap className="w-4 h-4 text-yellow-400" />
                    Civil Services (UPSC / State PSC)
                  </Link>
                  <Link 
                    to="/preparation" 
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-200 hover:bg-[#163065] hover:text-yellow-400"
                  >
                    <Shield className="w-4 h-4 text-blue-400" />
                    Defence & SSC
                  </Link>
                  <Link 
                    to="/preparation" 
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-200 hover:bg-[#163065] hover:text-yellow-400"
                  >
                    <Code className="w-4 h-4 text-green-400" />
                    Engineering & GATE
                  </Link>
                  <Link 
                    to="/preparation" 
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-200 hover:bg-[#163065] hover:text-yellow-400"
                  >
                    <Compass className="w-4 h-4 text-purple-400" />
                    Data Analytics & Cyber Security
                  </Link>
                </div>
              )}
            </div>

            <div className="relative">
              <button 
                onClick={() => toggleDropdown('services')}
                className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                  activeDropdown === 'services' ? 'text-yellow-400' : 'text-gray-300 hover:text-white'
                }`}
              >
                Services
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                  activeDropdown === 'services' ? 'rotate-180 text-yellow-400' : ''
                }`} />
              </button>

              {activeDropdown === 'services' && (
                <div className="absolute top-full mt-3 w-56 bg-[#0d2047] rounded-xl shadow-2xl border border-[#1d3568] py-2 z-50">
                  <Link 
                    to="/assessment" 
                    onClick={() => setActiveDropdown(null)}
                    className="block px-4 py-2 text-sm text-gray-200 hover:bg-[#163065] hover:text-yellow-400"
                  >
                    Career Assessment
                  </Link>
                  <Link 
                    to="/dashboard" 
                    onClick={() => setActiveDropdown(null)}
                    className="block px-4 py-2 text-sm text-gray-200 hover:bg-[#163065] hover:text-yellow-400"
                  >
                    1-on-1 Consultation
                  </Link>
                  <Link 
                    to="/dashboard" 
                    onClick={() => setActiveDropdown(null)}
                    className="block px-4 py-2 text-sm text-gray-200 hover:bg-[#163065] hover:text-yellow-400"
                  >
                    Personalized Roadmap
                  </Link>
                </div>
              )}
            </div>

            <div className="relative">
              <button 
                onClick={() => toggleDropdown('resources')}
                className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                  activeDropdown === 'resources' ? 'text-yellow-400' : 'text-gray-300 hover:text-white'
                }`}
              >
                Resources
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                  activeDropdown === 'resources' ? 'rotate-180 text-yellow-400' : ''
                }`} />
              </button>

              {activeDropdown === 'resources' && (
                <div className="absolute top-full mt-3 w-56 bg-[#0d2047] rounded-xl shadow-2xl border border-[#1d3568] py-2 z-50">
                  <Link 
                    to="/preparation" 
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-200 hover:bg-[#163065] hover:text-yellow-400"
                  >
                    <FileText className="w-4 h-4 text-blue-400" /> Exam Notes & Syllabi
                  </Link>
                  <Link 
                    to="/preparation" 
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-200 hover:bg-[#163065] hover:text-yellow-400"
                  >
                    <Video className="w-4 h-4 text-red-400" /> Mock Test Series
                  </Link>
                </div>
              )}
            </div>

            <Link 
              to="/contact" 
              className={`text-sm font-semibold transition-colors pb-1 ${
                location.pathname === '/contact' 
                  ? 'text-white border-b-2 border-yellow-400' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <form onSubmit={handleSearch} className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search career, exam, etc..."
                className="bg-[#10244c] hover:bg-[#132a58] focus:bg-[#152e60] text-xs text-white placeholder-gray-400 pl-9 pr-4 py-2 rounded-full w-52 focus:w-64 transition-all duration-300 border border-[#1f3a73] focus:border-yellow-400 focus:outline-none"
              />
            </form>

            <button
              onClick={() => {
                if (onOpenAuth) onOpenAuth('login');
                else navigate('/dashboard');
              }}
              className="text-xs font-semibold px-4 py-2 rounded-md border border-gray-400/50 hover:bg-white/10 transition-colors text-white"
            >
              Login
            </button>

            <button
              onClick={() => {
                if (onOpenAuth) onOpenAuth('signup');
                else navigate('/dashboard');
              }}
              className="text-xs font-bold px-4 py-2 rounded-md bg-[#f5b301] text-[#081735] hover:bg-yellow-300 transition-colors shadow-sm"
            >
              Sign Up
            </button>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a1b3e] border-t border-[#1a3260] px-4 pt-3 pb-6 space-y-3">
          <form onSubmit={handleSearch} className="relative mb-3">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search career, exam..."
              className="w-full bg-[#122854] text-xs text-white placeholder-gray-400 pl-9 pr-3 py-2 rounded-full border border-gray-700"
            />
          </form>

          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-gray-200">
            Home
          </Link>
          <Link to="/assessment" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-gray-200">
            Career Assessment
          </Link>
          <Link to="/preparation" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-gray-200">
            Study Resources
          </Link>
          <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-gray-200">
            Student Dashboard
          </Link>

          <div className="pt-4 flex gap-3">
            <button 
              onClick={() => { setMobileMenuOpen(false); navigate('/dashboard'); }}
              className="w-1/2 py-2 text-xs font-bold border border-gray-400 text-white rounded-md"
            >
              Login
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); navigate('/dashboard'); }}
              className="w-1/2 py-2 text-xs font-bold bg-yellow-400 text-[#081735] rounded-md"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}