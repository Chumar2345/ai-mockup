'use client';

import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useUser } from '@clerk/nextjs'; // Import useUser from Clerk

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const plans = [
  {
    id: 'plan_free',
    name: 'Free',
    price: '$0',
    features: [
      'Basic Features',
      'Limited Support',
      '3 Mock Interviews',
    ],
  },
  {
    id: 'plan_basic',
    name: 'Basic',
    price: '$9.99/month',
    features: [
      'Standard Features',
      'Email Support',
      '5 Mock Interviews',
    ],
  },
  {
    id: 'plan_pro',
    name: 'Pro',
    price: '$19.99/month',
    features: [
      'Advanced Features',
      'Priority Support',
      'Unlimited Mock Interviews',
    ],
  },
];

const UpgradePage = () => {
  const { user, isLoaded, isSignedIn } = useUser(); // Use Clerk's useUser hook
  const [email, setEmail] = useState('');

  // If the user is signed in, set the email
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      setEmail(user?.primaryEmailAddress?.emailAddress); // Get the email from the Clerk user object
    }
  }, [isLoaded, isSignedIn, user]);

  const handleCheckout = async (planId) => {
    if (!email) {
      console.error('No user is logged in');
      return;
    }

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        body: JSON.stringify({ planId, email }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { id } = await response.json();
      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({ sessionId: id });

      if (result.error) {
        console.error('Stripe Checkout error:', result.error.message);
      }
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>; // Show loading state while Clerk user data is loading
  }

  if (!isSignedIn) {
    return <div>Please sign in to access the plans.</div>; // If user is not signed in
  }

  return (
    <div className="p-6 mt-16 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Upgrade Your Plan</h1>
      <p className="text-center text-gray-600 mb-12">
        Choose a plan that suits your needs and unlock additional features.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="border rounded-lg p-6 shadow-lg text-center bg-white hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-2xl font-semibold mb-4">{plan.name}</h2>
            <p className="text-xl font-bold text-green-600 mb-6">{plan.price}</p>
            <ul className="mb-6 space-y-3">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2 text-gray-700">
                  <span className="text-green-500 text-lg">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            {plan.price !== '$0' ? (
              <button
                className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300"
                onClick={() => handleCheckout(plan.id)}
              >
                Buy {plan.name}
              </button>
            ) : (
              <button
                className="bg-gray-300 text-gray-700 py-2 px-6 rounded-full cursor-not-allowed"
                disabled
              >
                Free Plan
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpgradePage;
