import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; 
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CounselorDashboard from './pages/CounselorDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AICareerAssistant from './pages/AICareerAssistant';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Student Protected Route */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />

      {/* AI Assistant Protected Route */}
      <Route 
        path="/ai-assistant" 
        element={
          <ProtectedRoute>
            <AICareerAssistant />
          </ProtectedRoute>
        } 
      />

      {/* Counselor/Admin Protected Route */}
      <Route 
        path="/counselor" 
        element={
          <ProtectedRoute>
            <CounselorDashboard />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

export default App;