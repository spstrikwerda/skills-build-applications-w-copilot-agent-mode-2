import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
      
      console.log('Teams API Endpoint:', apiUrl);
      
      try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Teams - Fetched data:', data);
        
        // Handle both paginated (.results) and plain array responses
        const teamsData = data.results || data;
        console.log('Teams - Processed data:', teamsData);
        
        setTeams(Array.isArray(teamsData) ? teamsData : []);
        setLoading(false);
      } catch (err) {
        console.error('Teams - Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return <div className="container mt-4">Loading teams...</div>;
  if (error) return <div className="container mt-4 alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>👥 Teams</h2>
      <p className="lead mb-4">Join or create a fitness team</p>
      
      {teams.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <h4 className="alert-heading">No Teams Found</h4>
          <p>There are currently no teams to display. Create your team and start competing!</p>
        </div>
      ) : (
        <div className="row">
          {teams.map((team) => (
            <div key={team.id} className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-header bg-primary text-white">
                  <h5 className="card-title mb-0">{team.name}</h5>
                </div>
                <div className="card-body">
                  <p className="card-text">{team.description || 'No description available'}</p>
                  <hr />
                  <ul className="list-unstyled">
                    <li><strong>👤 Members:</strong> {team.member_count || team.members?.length || 0}</li>
                    <li><strong>📅 Created:</strong> {new Date(team.created_at).toLocaleDateString()}</li>
                  </ul>
                </div>
                <div className="card-footer bg-light">
                  <button className="btn btn-primary btn-sm w-100">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Teams;
