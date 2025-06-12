import { useState, useEffect } from 'react';
import { useUser } from "@clerk/clerk-react";
import {SetUserCookie} from '../components/cookieFunctions';
import ReactMarkdown from 'react-markdown';

function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSessionClick = async (sessionId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/user/generate-summary/${sessionId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.primaryEmailAddress.emailAddress })
      });
      const data = await response.json();
      setSelectedSession(data);
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
    setIsLoading(false);
  };

  if (!isLoaded || !isSignedIn) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SetUserCookie />
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Sessions</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions.map((session) => (
          <div
            key={session._id}
            onClick={() => handleSessionClick(session._id)}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <h3 className="text-lg font-semibold mb-2">{session.title}</h3>
            <p className="text-gray-500 text-sm">
              {new Date(session.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {selectedSession && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">{selectedSession.title}</h2>
          <div className="prose max-w-none">
            <ReactMarkdown>{selectedSession.summary}</ReactMarkdown>
          </div>
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
