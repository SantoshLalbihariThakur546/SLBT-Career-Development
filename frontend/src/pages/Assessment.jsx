import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit, BookOpen, Target, Clock, Zap } from 'lucide-react';

export default function Assessment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    education: '',
    interest: '',
    skills: '',
    timeCommitment: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:5000/api/assessments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` // Secure route requires token
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Assessment Complete! Your personalized roadmap is ready.');
        navigate('/dashboard'); // Send them back to see their unlocked roadmap
      } else {
        const data = await response.json();
        alert('Error: ' + data.message);
      }
    } catch (error) {
      alert('Failed to connect to the server.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="bg-[#0b1c3c] p-8 text-white text-center">
          <BrainCircuit className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold">AI Career Assessment</h2>
          <p className="text-blue-200 mt-2">Let's find the perfect career path for you.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="flex items-center gap-2 font-bold text-gray-700 mb-2">
              <BookOpen className="w-5 h-5 text-blue-600" /> Current Education Level
            </label>
            <select name="education" value={formData.education} onChange={handleChange} required className="w-full p-3 border border-gray-200 rounded-md outline-none focus:ring-2 focus:ring-yellow-400">
              <option value="" disabled>Select your background...</option>
              <option value="12th PCM">12th Science (PCM)</option>
              <option value="12th PCB">12th Science (PCB)</option>
              <option value="Arts/Commerce">12th Arts/Commerce</option>
              <option value="B.Tech/BE">B.Tech / B.E.</option>
              <option value="Other Graduate">Other Graduate</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 font-bold text-gray-700 mb-2">
              <Target className="w-5 h-5 text-red-500" /> Primary Career Interest
            </label>
            <select name="interest" value={formData.interest} onChange={handleChange} required className="w-full p-3 border border-gray-200 rounded-md outline-none focus:ring-2 focus:ring-yellow-400">
              <option value="" disabled>What excites you the most?</option>
              <option value="Technology">Technology & Software</option>
              <option value="Government">Government & Administration</option>
              <option value="Data">Data & Analytics</option>
              <option value="Engineering">Core Engineering</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 font-bold text-gray-700 mb-2">
              <Zap className="w-5 h-5 text-yellow-500" /> Current Skills (Comma separated)
            </label>
            <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="e.g., Coding, Communication, Math, Python" required className="w-full p-3 border border-gray-200 rounded-md outline-none focus:ring-2 focus:ring-yellow-400" />
          </div>

          <div>
            <label className="flex items-center gap-2 font-bold text-gray-700 mb-2">
              <Clock className="w-5 h-5 text-green-500" /> Daily Time Commitment
            </label>
            <select name="timeCommitment" value={formData.timeCommitment} onChange={handleChange} required className="w-full p-3 border border-gray-200 rounded-md outline-none focus:ring-2 focus:ring-yellow-400">
              <option value="" disabled>How much time can you study?</option>
              <option value="2-4 hours">2 - 4 hours/day</option>
              <option value="4-6 hours">4 - 6 hours/day</option>
              <option value="8+ hours">8+ hours/day (Full-time prep)</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-yellow-400 text-[#0b1c3c] font-bold text-lg py-4 rounded-md hover:bg-yellow-300 transition-colors shadow-md mt-4">
            Generate My Roadmap &rarr;
          </button>
        </form>
      </div>
    </div>
  );
}