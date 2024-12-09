'use client';

import React, { useState } from 'react';

const steps = [
  {
    title: 'Add a New Interview',
    description: 'Add a new interview by providing a description, skills required, and the number of years of experience needed.',
    icon: '📋',
  },
  {
    title: 'Generate Questions with AI',
    description: 'Let AI generate 5 interview questions based on the role and skills you provided.',
    icon: '🤖',
  },
  {
    title: 'Record Your Answers',
    description: 'Allow access to your mic and camera to record your answers to each question.',
    icon: '🎤',
  },
  {
    title: 'Start/Stop Recording',
    description: 'Click "Start" to begin recording, and "Stop" to finish. Move to the next or previous question easily.',
    icon: '⏺️',
  },
  {
    title: 'Receive Feedback',
    description: 'After finishing the interview, you\'ll receive feedback and a rating.',
    icon: '💬',
  },
  {
    title: 'Retry Interview',
    description: 'You can always retry the interview if needed.',
    icon: '🔄',
  },
  {
    title: 'Different Plans',
    description: 'Free Plan gives you 3 mock interviews, Basic offers 5, and Pro offers unlimited interviews.',
    icon: '💳',
  },
];

const HowItWorks = () => {
  const [expandedSteps, setExpandedSteps] = useState(
    new Array(steps.length).fill(true)
  );

  const toggleStep = (index) => {
    setExpandedSteps((prev) =>
      prev.map((isExpanded, idx) =>
        idx === index ? !isExpanded : isExpanded
      )
    );
  };

  return (
    <div className="p-6 mt-16">
      <h1 className="text-2xl font-bold mb-4">How It Works</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-md">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleStep(index)}
            >
              <span className="text-xl font-semibold">{step.title}</span>
              <span className="text-2xl">{expandedSteps[index] ? '-' : '+'}</span>
            </div>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                expandedSteps[index]
                  ? 'max-h-[1000px] h-auto' // Allow the content to expand fully
                  : 'max-h-0 h-0' // Collapse height to 0
              }`}
            >
              <div className={`${expandedSteps[index] ? 'block' : 'hidden'}`}>
                <p className="text-gray-700">
                  {step.icon} {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
