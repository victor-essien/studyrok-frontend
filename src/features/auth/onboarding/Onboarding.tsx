import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import StudyObjectives from './components/StudyObjectives';
import EducationLevel from './components/EducationLevel';
import { useStore } from '@/store/store';
import { useCompleteOnboarding } from '../hooks/useAuth';

export default function Onboarding() {
  const user = useStore((state) => state.user);
  const [searchParams, setSearchParams] = useSearchParams();
  const [educationLevel, setEducationLevel] = useState("");
const [studyObjective, setStudyObjective] = useState("");


  const { mutate: completeOnboarding } = useCompleteOnboarding();
  // Get current step from URL (default to education_level)
  const currentStep = searchParams.get('currentStep') || 'educational_level';
 
  // Function to move to next step
const nextStep = (data?: any) => {
  if (!user) return;

  if (currentStep === 'education_level') {
    if (data) setEducationLevel(data); // ✅ set immediately before move

    setSearchParams({ currentStep: 'study_objectives' });
  } else if (currentStep === 'study_objectives') {
    if (data) setStudyObjective(data); // ✅ set immediately before using

    console.log({
      educationLevel,
      studyObjective: data || studyObjective,
    });

    completeOnboarding({
      userId: user.id,
      studyObjective: data || studyObjective,
      educationLevel,
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



// Optional: redirect if no step is set
useEffect(() => {
  if (!searchParams.get("currentStep")) {
    setSearchParams({ currentStep: "education_level" });
  }
}, [searchParams, setSearchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {currentStep === 'education_level' && (
        <EducationLevel  onNext={nextStep} />
      )}
      {currentStep === 'study_objectives' && (
        <StudyObjectives onNext={nextStep} onBack={prevStep} />
      )}
      {/* {currentStep === "summary" && <Summary onBack={prevStep} />} */}

      {/* <div className="text-gray-500 mt-4">
        Current Step: <strong>{currentStep}</strong>
      </div> */}
    </div>
  );
}
