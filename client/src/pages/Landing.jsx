import { Link } from 'react-router-dom';
import styles from './Landing.module.css';

export default function Landing() {
  const features = [
    { title: 'Smart Recording', icon: '🎥', description: 'Record your meetings with a single click' },
    { title: 'AI Summaries', icon: '🤖', description: 'Get instant AI-powered meeting summaries' },
    { title: 'Time Stamps', icon: '⏱️', description: 'Navigate through key moments easily' },
    { title: 'Cloud Sync', icon: '☁️', description: 'Access your notes from anywhere' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient */}
      <div className={styles.heroSection}>
        <div className={styles.gradientBackground} />
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12 md:py-20">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Transform Your</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Learning Experience
              </span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Record your online classes and get AI-powered summaries in real-time.
              Never miss important details again.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8 gap-4">
              <Link to="/signup" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-all shadow-lg hover:shadow-xl">
                Get Started
              </Link>
              <a href="#features" className="mt-3 sm:mt-0 w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-all">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the content without gradient */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Features Grid */}
        <div id="features" className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Powerful Features</h2>
            <p className="mt-4 text-gray-500">Everything you need to enhance your learning experience</p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="relative group">
                <div className="relative bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="py-16 border-t border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-gray-500">Three simple steps to get started</p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex-1 text-center p-6">
              <div className="text-4xl mb-4">1️⃣</div>
              <h3 className="text-lg font-medium">Install Extension</h3>
              <p className="mt-2 text-gray-500">Add our Chrome extension to your browser</p>
            </div>
            <div className="flex-1 text-center p-6">
              <div className="text-4xl mb-4">2️⃣</div>
              <h3 className="text-lg font-medium">Record Meeting</h3>
              <p className="mt-2 text-gray-500">Click to start recording your online class</p>
            </div>
            <div className="flex-1 text-center p-6">
              <div className="text-4xl mb-4">3️⃣</div>
              <h3 className="text-lg font-medium">Get Summary</h3>
              <p className="mt-2 text-gray-500">Receive AI-generated notes and summaries</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 border-t border-gray-100">
          <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Learning?</h2>
            <p className="mb-8 text-blue-100">Join thousands of students already using EchoNote</p>
            <Link to="/signup" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10 transition-all">
              Start For Free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}