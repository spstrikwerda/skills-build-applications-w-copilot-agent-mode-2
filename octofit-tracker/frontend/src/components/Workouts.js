import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
      
      console.log('Workouts API Endpoint:', apiUrl);
      
      try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Workouts - Fetched data:', data);
        
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        console.log('Workouts - Processed data:', workoutsData);
        
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
        setLoading(false);
      } catch (err) {
        console.error('Workouts - Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) return <div className="container mt-4">Loading workouts...</div>;
  if (error) return <div className="container mt-4 alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>💪 Workout Suggestions</h2>
      <p className="lead mb-4">Get personalized workout suggestions</p>
      
      {workouts.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <h4 className="alert-heading">No Workout Suggestions</h4>
          <p>There are currently no workout suggestions available. Check back later!</p>
        </div>
      ) : (
        <div className="row">
          {workouts.map((workout) => (
            <div key={workout.id} className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-header bg-primary text-white">
                  <h5 className="card-title mb-0">{workout.name}</h5>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <span className="badge bg-info me-2">{workout.workout_type}</span>
                    <span className={`badge ${workout.difficulty_level === 'Beginner' ? 'bg-success' : workout.difficulty_level === 'Intermediate' ? 'bg-warning' : 'bg-danger'} me-2`}>
                      {workout.difficulty_level}
                    </span>
                    <span className="badge bg-secondary">⏱ {workout.duration} min</span>
                  </div>
                  <p className="card-text">{workout.description || 'No description available'}</p>
                  {workout.instructions && (
                    <div className="mt-3">
                      <h6 className="text-primary">Instructions:</h6>
                      <p className="small text-muted">{workout.instructions}</p>
                    </div>
                  )}
                </div>
                <div className="card-footer bg-light">
                  <button className="btn btn-primary btn-sm w-100">Start Workout</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Workouts;
