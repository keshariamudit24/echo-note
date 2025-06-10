import { Link } from 'react-router-dom';
import { useAuth, UserButton } from "@clerk/clerk-react";

function Navbar() {
  const { isSignedIn } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              EchoNote
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {!isSignedIn ? (
              <>
                <Link to="/signin" className="px-4 py-2 text-gray-600 hover:text-gray-800">
                  Sign In
                </Link>
                <Link to="/signup" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="px-4 py-2 text-gray-600 hover:text-gray-800">
                  Dashboard
                </Link>
                <UserButton afterSignOutUrl="/" />
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
