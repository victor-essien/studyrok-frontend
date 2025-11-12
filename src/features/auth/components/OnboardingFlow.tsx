// // src/features/auth/components/OnboardingFlow.tsx
// import React, { useState } from 'react';
// import { useCompleteOnboarding } from '../hooks/useAuth';
// import { useStore } from '@/store/store';

// export const OnboardingFlow: React.FC = () => {
//   const user = useStore((state) => state.user);
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     studyGoal: 30,
//     interests: [] as string[],
//     learningStyle: 'visual' as const,
//   });

//   const { mutate: completeOnboarding, isPending } = useCompleteOnboarding();

//   const handleSubmit = () => {
//     if (!user) return;
    
//     completeOnboarding({
//       userId: user.id,
//       ...formData,
//     });
//   };

//   const interestOptions = [
//     'Mathematics', 'Science', 'History', 'Literature', 
//     'Languages', 'Arts', 'Technology', 'Business'
//   ];

//   const toggleInterest = (interest: string) => {
//     setFormData({
//       ...formData,
//       interests: formData.interests.includes(interest)
//         ? formData.interests.filter((i) => i !== interest)
//         : [...formData.interests, interest],
//     });
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600 px-4">
//       <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-12">
//         {/* Step 1: Study Goal */}
//         {step === 1 && (
//           <div className="text-center">
//             <h2 className="text-4xl font-bold mb-4">Set Your Daily Goal</h2>
//             <p className="text-gray-600 mb-8">
//               How many minutes do you want to study each day?
//             </p>

//             <div className="flex items-center justify-center gap-4 mb-8">
//               <button
//                 onClick={() => setFormData({ ...formData, studyGoal: Math.max(15, formData.studyGoal - 15) })}
//                 className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 font-bold text-xl hover:bg-purple-200"
//               >
//                 -
//               </button>
//               <div className="text-6xl font-bold text-purple-600">{formData.studyGoal}</div>
//               <button
//                 onClick={() => setFormData({ ...formData, studyGoal: Math.min(180, formData.studyGoal + 15) })}
//                 className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 font-bold text-xl hover:bg-purple-200"
//               >
//                 +
//               </button>
//             </div>
//             <p className="text-gray-600 mb-8">minutes per day</p>

//             <button
//               onClick={() => setStep(2)}
//               className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold"
//             >
//               Continue
//             </button>
//           </div>
//         )}

//         {/* Step 2: Interests */}
//         {step === 2 && (
//           <div>
//             <h2 className="text-4xl font-bold mb-4 text-center">What interests you?</h2>
//             <p className="text-gray-600 mb-8 text-center">
//               Select your favorite subjects
//             </p>

//             <div className="grid grid-cols-2 gap-4 mb-8">
//               {interestOptions.map((interest) => (
//                 <button
//                   key={interest}
//                   onClick={() => toggleInterest(interest)}
//                   className={`p-4 rounded-xl font-semibold transition ${
//                     formData.interests.includes(interest)
//                       ? 'bg-purple-600 text-white'
//                       : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                   }`}
//                 >
//                   {interest}
//                 </button>
//               ))}
//             </div>

//             <div className="flex gap-4">
//               <button
//                 onClick={() => setStep(1)}
//                 className="flex-1 px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-semibold"
//               >
//                 Back
//               </button>
//               <button
//                 onClick={() => setStep(3)}
//                 className="flex-1 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold"
//               >
//                 Continue
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Step 3: Learning Style */}
//         {step === 3 && (
//           <div>
//             <h2 className="text-4xl font-bold mb-4 text-center">How do you learn best?</h2>
//             <p className="text-gray-600 mb-8 text-center">
//               Choose your preferred learning style
//             </p>

//             <div className="grid grid-cols-2 gap-4 mb-8">
//               {[
//                 { value: 'visual', label: 'Visual', emoji: '👁️', desc: 'Images & diagrams' },
//                 { value: 'auditory', label: 'Auditory', emoji: '👂', desc: 'Videos & audio' },
//                 { value: 'reading', label: 'Reading', emoji: '📖', desc: 'Text & articles' },
//                 { value: 'kinesthetic', label: 'Kinesthetic', emoji: '✋', desc: 'Hands-on practice' },
//               ].map((style) => (
//                 <button
//                   key={style.value}
//                   onClick={() => setFormData({ ...formData, learningStyle: style.value as any })}
//                   className={`p-6 rounded-xl text-left transition ${
//                     formData.learningStyle === style.value
//                       ? 'bg-purple-600 text-white ring-4 ring-purple-300'
//                       : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                   }`}
//                 >
//                   <div className="text-4xl mb-2">{style.emoji}</div>
//                   <div className="font-bold text-lg">{style.label}</div>
//                   <div className="text-sm opacity-80">{style.desc}</div>
//                 </button>
//               ))}
//             </div>

//             <div className="flex gap-4">
//               <button
//                 onClick={() => setStep(2)}
//                 className="flex-1 px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-semibold"
//               >
//                 Back
//               </button>
//               <button
//                 onClick={handleSubmit}
//                 disabled={isPending}
//                 className="flex-1 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold disabled:opacity-50"
//               >
//                 {isPending ? 'Setting up...' : 'Complete Setup'}
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Progress Indicators */}
//         <div className="flex justify-center gap-2 mt-8">
//           {[1, 2, 3].map((s) => (
//             <div
//               key={s}
//               className={`h-2 rounded-full transition-all ${
//                 s === step ? 'w-8 bg-purple-600' : 'w-2 bg-gray-300'
//               }`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };