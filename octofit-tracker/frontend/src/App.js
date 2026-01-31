import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src="/octofitapp-logo.png" alt="OctoFit Logo" className="navbar-logo" />
              OctoFit Tracker
            </Link>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav" 
              aria-controls="navbarNav" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">Activities</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">Teams</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">Workouts</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
            <div className="container mt-4">
              <h1 className="text-center mb-4">Welcome to OctoFit Tracker</h1>
              <p className="lead text-center mb-5">Track your fitness activities, compete with your team, and achieve your goals!</p>
              <div className="row mt-4 home-cards">
                <div className="col-md-4 mb-4">
                  <div className="card h-100">
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">🏃 Activities</h5>
                      <p className="card-text flex-grow-1">Log and track your fitness activities</p>
                      <Link to="/activities" className="btn btn-primary w-100">View Activities</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="card h-100">
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">🏆 Leaderboard</h5>
                      <p className="card-text flex-grow-1">See who's leading the competition</p>
                      <Link to="/leaderboard" className="btn btn-primary w-100">View Leaderboard</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="card h-100">
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">👥 Teams</h5>
                      <p className="card-text flex-grow-1">Join or create a fitness team</p>
                      <Link to="/teams" className="btn btn-primary w-100">View Teams</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-3 home-cards">
                <div className="col-md-6 mb-4">
                  <div className="card h-100">
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">👤 Users</h5>
                      <p className="card-text flex-grow-1">View all registered users and their teams</p>
                      <Link to="/users" className="btn btn-primary w-100">View Users</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="card h-100">
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">💪 Workouts</h5>
                      <p className="card-text flex-grow-1">Get personalized workout suggestions</p>
                      <Link to="/workouts" className="btn btn-primary w-100">View Workouts</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          } />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
