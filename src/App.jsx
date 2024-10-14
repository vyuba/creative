import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Work from './pages/Work';
import Loader from './components/Loader';
import { useState, useEffect } from 'react';
import Data from './components/Data.js'
import About from './pages/About.jsx';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading for 2 seconds (or replace this with actual loading logic)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  // Use state to manage the currently selected project
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
    // Get the currently selected project
    const currentProject = Data[0].director.projects[currentProjectIndex];
  return (
    <Router>
      {/* Show loader when the app is loading */}
      {isLoading ? <Loader /> : (
        <>
          <Navbar />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/work" element={<Work project={currentProject} setCurrentProjectIndex={setCurrentProjectIndex} />} />
            <Route path="/about" element={<About/>} />
          </Routes>
        </>
      )}
    </Router>
  );
}

export default App;
