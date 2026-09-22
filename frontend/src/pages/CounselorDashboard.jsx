import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';
import { 
    Users, 
    CheckCircle, 
    Clock, 
    Video, 
    Save, 
    FileText,
    Search
} from 'lucide-react';

const CounselorDashboard = () => {
    const { user } = useContext(AuthContext);
    const [consultations, setConsultations] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updateForm, setUpdateForm] = useState({ status: '', notes: '', meetingLink: '' });

    useEffect(() => {
        fetchQueue();
    }, []);

    const fetchQueue = async () => {
        try {
            // Fetch all if Admin, or just assigned queue if Counselor
            const endpoint = user.role === 'Admin' ? '/consultations' : '/consultations/my-queue';
            const response = await API.get(endpoint);
            setConsultations(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching consultations:', error);
            setLoading(false);
        }
    };

    const handleSelect = (req) => {
        setSelectedRequest(req);
        setUpdateForm({
            status: req.status || 'Pending',
            notes: req.notes || '',
            meetingLink: req.meetingLink || ''
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await API.put(`/consultations/${selectedRequest._id}`, updateForm);
            
            // Update local state to reflect changes
            setConsultations(consultations.map(c => 
                c._id === selectedRequest._id ? response.data.data : c
            ));
            setSelectedRequest(response.data.data);
            alert('Student record updated successfully.');
        } catch (error) {
            alert('Failed to update record.');
        }
    };

    const handleAssignToMe = async (id) => {
        try {
            await API.put(`/consultations/${id}/assign`);
            fetchQueue(); // Refresh queue to show assignment
        } catch (error) {
            alert('Failed to assign request.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
            {/* Left Sidebar - Queue */}
            <div className="w-full md:w-1/3 bg-white border-r border-slate-200 h-screen overflow-y-auto">
                <div className="p-4 bg-[#0b1b33] text-white sticky top-0 z-10 flex justify-between items-center">
                    <h2 className="font-bold flex items-center gap-2">
                        <Users size={18} /> Student Queue
                    </h2>
                    <span className="text-xs bg-[#f0a500] text-[#0b1b33] px-2 py-1 rounded font-bold">
                        {consultations.length} Active
                    </span>
                </div>
                
                <div className="p-4">
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                        <input 
                            type="text" 
                            placeholder="Search students..." 
                            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded text-sm focus:outline-none focus:border-[#0d2344]"
                        />
                    </div>

                    {loading ? (
                        <div className="text-center text-sm text-slate-500 py-4">Loading queue...</div>
                    ) : (
                        <div className="space-y-3">
                            {consultations.map((req) => (
                                <div 
                                    key={req._id} 
                                    onClick={() => handleSelect(req)}
                                    className={`p-4 rounded-lg cursor-pointer border transition-all ${
                                        selectedRequest?._id === req._id 
                                        ? 'border-[#0d2344] bg-blue-50' 
                                        : 'border-slate-200 bg-white hover:border-[#0d2344]'
                                    }`}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-bold text-slate-800 text-sm">{req.name}</h3>
                                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                                            req.status === 'Pending' ? 'bg-red-100 text-red-700' : 
                                            req.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' : 
                                            'bg-amber-100 text-amber-700'
                                        }`}>
                                            {req.status}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 font-medium">{req.objective}</p>
                                    <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                                        <Clock size={12} /> {new Date(req.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Right Panel - Active Workspace */}
            <div className="w-full md:w-2/3 h-screen overflow-y-auto bg-slate-50 p-6">
                {selectedRequest ? (
                    <div className="max-w-3xl mx-auto space-y-6">
                        {/* Student Profile Header */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-2xl font-black text-[#0d2344]">{selectedRequest.name}</h1>
                                    <p className="text-sm text-slate-500 mt-1">Target: <strong className="text-slate-700">{selectedRequest.objective}</strong></p>
                                    <p className="text-sm text-slate-500">Education: {selectedRequest.qualification}</p>
                                    <p className="text-sm text-slate-500">Contact: {selectedRequest.mobile}</p>
                                </div>
                                {!selectedRequest.assignedCounselor && (
                                    <button 
                                        onClick={() => handleAssignToMe(selectedRequest._id)}
                                        className="bg-[#0d2344] text-white px-4 py-2 rounded text-sm font-semibold hover:bg-[#1a3a6b]"
                                    >
                                        Claim Student
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Update Form */}
                        <form onSubmit={handleUpdate} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-5">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2 border-b pb-3">
                                <FileText size={18} className="text-[#f0a500]" /> Counselor Notes & Roadmap
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Request Status</label>
                                    <select 
                                        value={updateForm.status}
                                        onChange={(e) => setUpdateForm({...updateForm, status: e.target.value})}
                                        className="w-full p-2.5 border border-slate-300 rounded text-sm focus:outline-none focus:border-[#0d2344]"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Assigned">Assigned</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Resolved">Resolved</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Meeting Link (GMeet / Zoom)</label>
                                    <div className="relative">
                                        <Video className="absolute left-3 top-2.5 text-slate-400" size={16} />
                                        <input 
                                            type="url" 
                                            value={updateForm.meetingLink}
                                            onChange={(e) => setUpdateForm({...updateForm, meetingLink: e.target.value})}
                                            placeholder="https://meet.google.com/..."
                                            className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded text-sm focus:outline-none focus:border-[#0d2344]"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Assessment Notes & Plan</label>
                                <textarea 
                                    rows="6"
                                    value={updateForm.notes}
                                    onChange={(e) => setUpdateForm({...updateForm, notes: e.target.value})}
                                    placeholder="Add student weaknesses, strengths, and recommended study plan..."
                                    className="w-full p-3 border border-slate-300 rounded text-sm focus:outline-none focus:border-[#0d2344]"
                                ></textarea>
                            </div>

                            <div className="flex justify-end pt-2">
                                <button 
                                    type="submit" 
                                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded font-bold transition-colors"
                                >
                                    <Save size={16} /> Save Updates
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="h-full flex items-center justify-center text-slate-400">
                        <div className="text-center">
                            <Users size={48} className="mx-auto mb-3 opacity-50" />
                            <p>Select a student request from the queue to view details.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CounselorDashboard;