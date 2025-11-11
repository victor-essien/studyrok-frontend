import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import StudyObjectives from './components/StudyObjectives';
import EducationLevel from './components/EducationLevel';
import { useStore } from '@/store/store';
import { useCompleteOnboarding } from '../hooks/useAuth';

export default function Onboarding() {
  const user = useStore((state) => state.user);
  const [searchParams, setSearchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    educationLevel: '',
    studyObjective: '',
  });

  const { mutate: completeOnboarding } = useCompleteOnboarding();
  // Get current step from URL (default to education_level)
  const currentStep = searchParams.get('currentStep') || 'educational_level';

  // Function to move to next step
  const nextStep = () => {
    if (!user) return;

    if (currentStep === 'education_level') {
      setSearchParams({ currentStep: 'study_objectives' });
    } else if (currentStep === 'study_objectives') {
      completeOnboarding({
        userId: user.id,
        ...formData,
      });
      setSearchParams({ currentStep: 'summary' });
    }
  };

  // Go back to previous step
  const prevStep = () => {
    if (currentStep === 'study_objectives') {
      setSearchParams({ currentStep: 'education_level' });
    } else if (currentStep === 'summary') {
      setSearchParams({ currentStep: 'study_objectives' });
    }
  };
  // Function to receive data from child
  const handleChildData = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };
  // Optional: redirect if no step is set
  useEffect(() => {
    if (!searchParams.get('currentStep')) {
      setSearchParams({ currentStep: 'education_level' });
    }
  }, [searchParams, setSearchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {currentStep === 'education_level' && (
        <EducationLevel onDataChange={handleChildData} onNext={nextStep} />
      )}
      {currentStep === 'study_objectives' && (
        <StudyObjectives onNext={nextStep} onDataChange={handleChildData} onBack={prevStep} />
      )}
      {/* {currentStep === "summary" && <Summary onBack={prevStep} />} */}

      {/* <div className="text-gray-500 mt-4">
        Current Step: <strong>{currentStep}</strong>
      </div> */}
    </div>
  );
}
// feat: Add LandingPage component with animated sections, navigation, testimonials, and pricing plans

// feat: Implement modal slice for managing modal states and actions

// feat: Create notification slice for handling notifications and their states

// feat: Develop UI slice for managing theme, sidebar, and mobile menu states

// feat: Establish user slice for user authentication, preferences, and actions
