'use client';

const SuccessPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full text-center">
        <div className="mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 text-green-500 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 11l3 3L22 4M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-semibold text-green-600 mb-4">Payment Successful!</h1>
        <p className="text-lg text-gray-700 mb-4">
          Thank you for your purchase! Your payment has been successfully processed, and you're all set.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          An email confirmation will be sent to you shortly.
        </p>
        <a
          href="/dashboard/"
          className="inline-block px-6 py-3 bg-green-500 text-white rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-300"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
};

export default SuccessPage;
