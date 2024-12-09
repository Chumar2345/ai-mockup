"use client";
import Image from 'next/image';
import Link from 'next/link';
// Import the useUser hook
import { useRouter } from 'next/navigation'; // Import useRouter for handling routing
import { useAuth, useUser,UserButton } from "@clerk/nextjs";

export default function Home() {
  // const { isSignedIn } = useUser(); // Check if the user is signed in
  const router = useRouter(); // Initialize the router
  const { isSignedIn } = useAuth();
  // Handler to reset the URL to the domain root when clicking AI MOCK INTERVIEW or refreshing the page
  const resetUrl = () => {
    router.replace('/'); // Replaces the current URL with just the domain
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scrolls to the top of the page
  };

  // Scroll to the top of the page when "AI MOCK INTERVIEW" is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scroll effect
    });
  };

  const handleAuthRedirect = (e, path) => {
    e.preventDefault();
    window.location.href = path; // Redirect to the desired path
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 text-gray-900 font-sans">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 shadow-md sticky top-0 bg-white z-10">
        <div
          className="text-2xl font-bold text-blue-600 cursor-pointer"
          onClick={resetUrl} // Reset URL and scroll to the top when clicked
        >
          AI MOCK INTERVIEW
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="#overview" className="hover:text-blue-600">Overview</a>
          <a href="#how-it-works" className="hover:text-blue-600">How It Works</a>
          <a href="#pricing" className="hover:text-blue-600">Pricing</a>
        </nav>
        <div className="space-x-4">
        {isSignedIn ? (
        // When the user is authenticated
        <>
        <button
          onClick={(e) => handleAuthRedirect(e, '/dashboard')}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Go to Dashboard
        </button>
         <UserButton />
        </>
      ) : (
          
          <>

          <button
            onClick={(e) => handleAuthRedirect(e, '/sign-in')}
            className="hidden md:inline-block bg-white border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50"
          >
            Sign In
          </button>
        
          <button
            onClick={(e) => handleAuthRedirect(e, '/sign-up')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Try For Free
          </button>
          </>
      )}
        </div>
      </header>

      {/* Hero Section with Image */}
      <section className="flex flex-col-reverse md:flex-row items-center px-8 py-16 md:py-32">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl font-bold leading-tight">
            Your real-time <span className="text-blue-600">AI Interview Assistant</span>
          </h1>
          <p className="text-lg text-gray-700">
            Automatically get an answer to every job interview question with ChatGPT.
          </p>
          {/* Try For Free Button */}
          <button
            onClick={(e) => handleAuthRedirect(e, '/auth/sign-up')}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            Try For Free
          </button>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/hero.png"  // Replace with your image path
            alt="AI MOCK INTERVIEW demo"
            width={500}
            height={300}
            className="rounded-lg shadow-md"
          />
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="bg-white px-8 py-16">
        <h2 className="text-center text-3xl font-bold text-gray-800">Overview</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-blue-600 text-5xl mb-4">🤖</div>
            <h3 className="font-semibold">100% Accurate Responses</h3>
            <p className="text-gray-700">Provides the most accurate and helpful answers for your job interview questions.</p>
          </div>
          <div className="text-center">
            <div className="text-blue-600 text-5xl mb-4">🎤</div>
            <h3 className="font-semibold">AI-Powered Mock Interviews</h3>
            <p className="text-gray-700">Get personalized interview simulations with tailored feedback based on real-world scenarios.</p>
          </div>
          <div className="text-center">
            <div className="text-blue-600 text-5xl mb-4">💬</div>
            <h3 className="font-semibold">Instant Feedback</h3>
            <p className="text-gray-700">Receive detailed feedback on your answers to improve your performance in future interviews.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-blue-50 px-8 py-16">
        <h2 className="text-center text-3xl font-bold text-gray-800">How It Works</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-blue-600 text-5xl mb-4">🔍</div>
            <h3 className="font-semibold">Choose Your Mock Interview</h3>
            <p className="text-gray-700">Select a mock interview tailored to your desired role and industry.</p>
          </div>
          <div className="text-center">
            <div className="text-blue-600 text-5xl mb-4">💬</div>
            <h3 className="font-semibold">Answer Questions</h3>
            <p className="text-gray-700">Respond to interview questions using real-time AI feedback for improvement.</p>
          </div>
          <div className="text-center">
            <div className="text-blue-600 text-5xl mb-4">📈</div>
            <h3 className="font-semibold">Instant Analysis & Feedback</h3>
            <p className="text-gray-700">Receive immediate feedback, suggestions, and areas for improvement to refine your answers.</p>
          </div>
        </div>
      </section>

     {/* Pricing Section */}
<section id="pricing" className="bg-gradient-to-b from-blue-50 to-white px-8 py-16">
  <h2 className="text-center text-4xl font-extrabold text-gray-800 mb-12 animate__animated animate__fadeIn animate__delay-1s">
    Pricing Plans
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
    {/* Basic Plan */}
    <div className="bg-white rounded-2xl shadow-lg p-8 text-center transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-xl">
      <h3 className="font-semibold text-2xl mb-4 text-gray-800">Basic</h3>
      <p className="text-gray-700 mb-6">3 mock interviews with real-time feedback to help you prepare for job interviews.</p>
      <p className="text-blue-600 text-4xl font-bold mb-6">$0/month</p>
      <button className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg transform transition duration-300 ease-in-out hover:bg-blue-700 hover:scale-105">
        Sign Up
      </button>
    </div>

    {/* Pro Plan */}
    <div className="bg-white rounded-2xl shadow-lg p-8 text-center transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-xl">
      <h3 className="font-semibold text-2xl mb-4 text-gray-800">Pro</h3>
      <p className="text-gray-700 mb-6">Unlimited mock interviews with tailored questions and unlimited feedback to refine your skills.</p>
      <p className="text-blue-600 text-4xl font-bold mb-6">$19.99/month</p>
      <button className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg transform transition duration-300 ease-in-out hover:bg-blue-700 hover:scale-105">
        Sign Up
      </button>
    </div>

  </div>
</section>


      {/* Footer */}
      <footer className="bg-gray-800 text-gray-200 px-8 py-4">
        <p className="text-center">© 2024 AI MOCK INTERVIEW. All rights reserved.</p>
      </footer>
    </div>
  );
}
