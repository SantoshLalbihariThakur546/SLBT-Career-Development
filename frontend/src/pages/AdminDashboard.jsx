import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();
  // Using 'consultations' to match the backend schema and routes we built
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Fetching from the consultations route we set up in server.js
        const response = await fetch('http://localhost:5000/api/consultations', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const result = await response.json();
        
        // Our backend wraps the array inside result.data
        if (response.ok && result.success) {
          setConsultations(result.data);
        } else {
          setError(result.message || 'Failed to fetch data');
        }
      } catch (err) {
        setError('Server connection error. Please ensure backend is running.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchConsultations();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/consultations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      const result = await response.json();

      if (response.ok && result.success) {
        // BEST PRACTICE: Update local React state instead of reloading the page
        setConsultations((prevConsultations) => 
          prevConsultations.map((item) => 
            item._id === id ? { ...item, status: newStatus } : item
          )
        );
      } else {
        alert(result.message || 'Failed to update status');
      }
    } catch (err) {
      alert('Error connecting to server to update status');
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-[#081735]">Loading Dashboard...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-red-600">{error}</div>;
  }

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-[#081735] border-b-4 border-yellow-400 inline-block pb-2">
          Admin Panel: Consultation Requests
        </h1>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          {consultations.length === 0 ? (
            <p className="p-8 text-gray-500 text-center text-lg">No consultation requests found.</p>
          ) : (
            <div className="divide-y divide-gray-200">
              {consultations.map((item) => (
                <div key={item._id} className="p-6 flex flex-col md:flex-row justify-between items-center hover:bg-blue-50 transition-colors duration-200">
                  
                  {/* Student Details */}
                  <div className="mb-4 md:mb-0 w-full md:w-3/4">
                    <h2 className="text-xl font-bold text-gray-900">{item.name}</h2>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                      <p><span className="font-semibold text-gray-800">Target:</span> {item.objective}</p>
                      <p><span className="font-semibold text-gray-800">Qualification:</span> {item.qualification}</p>
                      <p><span className="font-semibold text-gray-800">Mobile:</span> {item.mobile}</p>
                      <p><span className="font-semibold text-gray-800">Date:</span> {new Date(item.createdAt).toLocaleDateString()}</p>
                    </div>
                    
                    {/* Status Badge */}
                    <div className="mt-3">
                       <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                         item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                         item.status === 'Assigned' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                         item.status === 'Resolved' ? 'bg-green-100 text-green-800 border border-green-200' :
                         'bg-gray-100 text-gray-800 border border-gray-200'
                       }`}>
                         {item.status}
                       </span>
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  {item.status === 'Pending' && (
                    <button 
                      onClick={() => handleUpdateStatus(item._id, 'Assigned')}
                      className="w-full md:w-auto bg-[#081735] hover:bg-blue-800 text-white px-6 py-2.5 rounded-lg font-semibold shadow-md transition-all active:scale-95"
                    >
                      Assign Counselor
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}