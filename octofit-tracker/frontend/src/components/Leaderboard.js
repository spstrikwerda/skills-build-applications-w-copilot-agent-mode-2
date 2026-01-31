import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
      
      console.log('Leaderboard API Endpoint:', apiUrl);
      
      try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Leaderboard - Fetched data:', data);
        
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        console.log('Leaderboard - Processed data:', leaderboardData);
        
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
        setLoading(false);
      } catch (err) {
        console.error('Leaderboard - Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <div className="container mt-4">Loading leaderboard...</div>;
  if (error) return <div className="container mt-4 alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>🏆 Leaderboard</h2>
      <p className="lead mb-4">See who's leading the competition</p>
      
      {leaderboard.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <h4 className="alert-heading">No Leaderboard Data</h4>
          <p>There is currently no leaderboard data to display.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">User</th>
                <th scope="col">Team</th>
                <th scope="col">Total Points</th>
                <th scope="col">Period</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry.id}>
                  <td>
                    <span className={`badge ${index === 0 ? 'bg-warning' : index === 1 ? 'bg-secondary' : index === 2 ? 'bg-danger' : 'bg-primary'}`}>
                      #{entry.rank || index + 1}
                    </span>
                  </td>
                  <td><strong>{entry.user_name || entry.user}</strong></td>
                  <td>{entry.team_name || entry.team || 'N/A'}</td>
                  <td><strong>{entry.total_points}</strong> pts</td>
                  <td><span className="badge bg-info">{entry.period}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
