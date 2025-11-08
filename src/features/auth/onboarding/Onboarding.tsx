import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import StudyGoals from './components/StudyGoals';
import EducationLevel from './components/EducationLevel';

export default function Onboarding() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get current step from URL (default to education_level)
  const currentStep = searchParams.get('currentStep') || 'educational_level';

  // Function to move to next step
  const nextStep = () => {
  
     if (currentStep === 'education_level') {
      setSearchParams({ currentStep: 'study_goals' });
    }
    else if (currentStep === 'study_goals') {
      setSearchParams({ currentStep: 'summary' });
    }
  };

  // Go back to previous step
  const prevStep = () => {
    if (currentStep === 'study_goals') {
      setSearchParams({ currentStep: 'education_level' });
    } else if (currentStep === 'summary') {
      setSearchParams({ currentStep: 'study_goals' });
    }
  };

  // Optional: redirect if no step is set
  useEffect(() => {
    if (!searchParams.get('currentStep')) {
      setSearchParams({ currentStep: 'education_level' });
    }
  }, [searchParams, setSearchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {currentStep === 'education_level' && <EducationLevel onNext={nextStep} />}
      {currentStep === 'study_goals' && <StudyGoals onNext={nextStep} onBack={prevStep} />}
      {/* {currentStep === "summary" && <Summary onBack={prevStep} />} */}

      <div className="text-gray-500 mt-4">
        Current Step: <strong>{currentStep}</strong>
      </div>
    </div>
  );
}
// feat: Add LandingPage component with animated sections, navigation, testimonials, and pricing plans

// feat: Implement modal slice for managing modal states and actions

// feat: Create notification slice for handling notifications and their states

// feat: Develop UI slice for managing theme, sidebar, and mobile menu states

// feat: Establish user slice for user authentication, preferences, and actions