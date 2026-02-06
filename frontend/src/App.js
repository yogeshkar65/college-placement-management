import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import UpcomingDrives from "./components/UpcomingDrives";
import PastDrives from "./components/PastDrives";
import PlacedStudents from "./components/PlacedStudents";
import CompanyList from "./components/CompanyList";
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import AddCompany from "./components/admin/forms/AddCompany";
import AddDrive from "./components/admin/forms/AddDrive";
import AddStudent from "./components/admin/forms/AddStudent";
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import "./index.css";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upcoming" element={<UpcomingDrives />} />
          <Route path="/past" element={<PastDrives />} />
          <Route path="/placed" element={<PlacedStudents />} />
          <Route path="/companies" element={<CompanyList />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<div className="text-center mt-4"><h3>Select an option above to get started.</h3></div>} />
            <Route path="dashboard" element={<div className="text-center mt-4"><h3>Dashboard Stats Loading...</h3></div>} />
          </Route>

          {/* Standalone Admin Forms */}
          <Route path="/admin/add-company" element={<AddCompany />} />
          <Route path="/admin/add-drive" element={<AddDrive />} />
          <Route path="/admin/add-student" element={<AddStudent />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;