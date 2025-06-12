import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClerkProvider, SignIn, SignUp, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import SetUserCookie from './components/SetUserCookie';


const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export default function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <SignedIn>
      <SetUserCookie />
                    
                  </SignedIn>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/dashboard"
              element={
                <>
                  <SignedIn>
                    <Dashboard />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
            <Route 
              path="/signin" 
              element={
                <div className="flex items-center justify-center min-h-screen">
                  <SignIn routing="path" path="/signin" />
                </div>
              } 
            />
            <Route 
              path="/signup" 
              element={
                <div className="flex items-center justify-center min-h-screen">
                  <SignUp routing="path" path="/signup" />
                </div>
              } 
            />
          </Routes>
        </div>
      </Router>
    </ClerkProvider>
  )
}

