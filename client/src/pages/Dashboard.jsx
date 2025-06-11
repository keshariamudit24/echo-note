import { useUser } from "@clerk/clerk-react";
import SetUserCookie from '../components/SetUserCookie';

function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    // Handle loading state
    return <div className="flex items-center justify-center min-h-screen">Loading dashboard...</div>;
  }

  // If the user is not signed in (should be caught by RedirectToSignIn in App.jsx, but good for robustness)
  if (!isSignedIn) {
    return <div className="flex items-center justify-center min-h-screen">Please sign in to view the dashboard.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Set the user cookies as soon as the dashboard loads and user is signed in */}
      <SetUserCookie />
      <h1 className="text-3xl font-bold text-gray-900">
        Welcome, {user.firstName || user.emailAddresses[0].emailAddress}
      </h1>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Summary Cards */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-gray-900">Recent Summary</h3>
            <p className="mt-1 text-sm text-gray-500">Last recorded: 2 hours ago</p>
          </div>
        </div>
        
        {/* Extension Status */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-gray-900">Browser Extension</h3>
            <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Install Extension
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
