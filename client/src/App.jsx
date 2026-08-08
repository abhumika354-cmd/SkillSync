import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Jobs from "./pages/jobs";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import NotFound from "./pages/notfound";
import JobDetails from "./pages/jobDetails";

import Applications from "./pages/applications";
import SavedJobs from "./pages/savedJobs";
import Messages from "./pages/messages";
import Notifications from "./pages/notifications";
import Settings from "./pages/settings";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/jobs" element={<Jobs />} />

        <Route path="/job-details/:id" element={<JobDetails />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* My Applications */}
        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <Applications />
            </ProtectedRoute>
          }
        />

        {/* Saved Jobs */}
        <Route
          path="/saved-jobs"
          element={
            <ProtectedRoute>
              <SavedJobs />
            </ProtectedRoute>
          }
        />

        {/* Messages */}
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />

        {/* Notifications */}
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />

        {/* Settings */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 - always keep at the end */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </>
  );
}

export default App;