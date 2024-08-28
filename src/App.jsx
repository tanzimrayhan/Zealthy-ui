import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OnboardingWizard from './components/onboarding-wizard/Onboarding-wizard.component';
import DataTable from './pages/datatable/Datatable';
import Admin from './pages/admin/Admin';

const Home = () => <h1>Home Page</h1>;
// const Admin = () => <h1>Admin Page</h1>;


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OnboardingWizard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/data" element={<DataTable/>} />
      </Routes>
    </Router>
  );
}

export default App;