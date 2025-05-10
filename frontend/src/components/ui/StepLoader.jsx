import { useState, useEffect } from "react";
import Loader from "./Loader";

const steps = [
  "AI is getting ready",
  "AI is fetching the data",
  "AI is analyzing stock data",
  "AI is forming the report",
];

const StepLoader = ({ currentStep = 0, isLoading = true }) => {
  const [displayStep, setDisplayStep] = useState(currentStep);

  useEffect(() => {
    setDisplayStep(currentStep);
  }, [currentStep]);

  if (!isLoading) return null;

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-8">
      <Loader />
      <div className="flex flex-col items-center space-y-4 w-full max-w-md">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`w-full transition-all duration-500 ease-in-out ${
              index <= displayStep ? "opacity-100" : "opacity-30"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div
                className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${
                  index < displayStep
                    ? "bg-primary text-white"
                    : index === displayStep
                    ? "bg-primary/20 border-2 border-primary"
                    : "bg-muted border border-muted-foreground"
                }`}
              >
                {index < displayStep ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <span className="text-xs">{index + 1}</span>
                )}
              </div>
              <span
                className={`text-sm font-medium ${
                  index === displayStep
                    ? "text-primary"
                    : index < displayStep
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`ml-3 mt-1 mb-1 w-0.5 h-4 bg-muted ${
                  index < displayStep ? "bg-primary/50" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepLoader;
