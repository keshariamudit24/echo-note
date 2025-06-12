import { useState, useEffect } from 'react';
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';
import { SetUserCookie } from '../components/cookieFunctions';

function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn && user) {
      fetchSessions();
    }
  }, [isSignedIn, user]);

  const fetchSessions = async () => {
    try {
      const response = await fetch(`http://localhost:3000/user/sessions/${user.primaryEmailAddress.emailAddress}`);
      const data = await response.json();
      setSessions(data.sessions);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  const handleSessionClick = (sessionId) => {
    navigate(`/summary/${sessionId}`);
  };

  if (!isLoaded || !isSignedIn) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SetUserCookie />
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Sessions</h1>
      
      {sessions.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500 text-lg">You don't have any sessions yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((session) => (
            <div
              key={session._id}
              onClick={() => handleSessionClick(session._id)}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer border border-gray-100"
            >
              <h3 className="text-lg font-semibold mb-2">{session.title}</h3>
              <p className="text-gray-500 text-sm">
                {new Date(session.date).toLocaleDateString()}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className={`px-2 py-1 text-xs rounded-full ${session.finalSummary ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {session.finalSummary ? 'Ready' : 'Processing'}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      )}

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            Generating summary...
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
