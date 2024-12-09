'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const CancelPage = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/dashboard/upgrade');  // Redirect to the upgrade page or wherever you prefer
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Cancelled</h1>
        <p className="text-lg text-gray-700 mb-6">
          We're sorry to see you go! Your payment has not been processed.
          Please check your payment details and try again.
        </p>
        <button
          onClick={handleGoBack}
          className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-all duration-300"
        >
          Go Back to Upgrade
        </button>
        <p className="mt-6 text-sm text-gray-500">
          If you have any issues, feel free to contact our support team.
        </p>
      </div>
    </div>
  );
};

export default CancelPage;
