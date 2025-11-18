import React from 'react';

const ProgressBar = ({ currentStep, totalSteps, steps = [] }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="relative mb-8">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="absolute -top-1 left-0 right-0 flex justify-between">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
            <div
              key={step}
              className={`w-4 h-4 rounded-full transition-all ${
                step <= currentStep
                  ? 'bg-primary scale-110'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step Labels */}
      {steps.length > 0 && (
        <div className="flex justify-between mb-6">
          {steps.map((label, index) => (
            <div
              key={index}
              className={`text-sm font-semibold transition-colors ${
                index + 1 === currentStep
                  ? 'text-primary'
                  : index + 1 < currentStep
                  ? 'text-gray-600'
                  : 'text-gray-400'
              }`}
            >
              {label}
            </div>
          ))}
        </div>
      )}

      {/* Step Counter */}
      <div className="text-center mb-6">
        <span className="text-lg font-bold text-primary">{currentStep}</span>
        <span className="text-gray-400 mx-2">/</span>
        <span className="text-lg font-bold text-gray-600">{totalSteps}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
