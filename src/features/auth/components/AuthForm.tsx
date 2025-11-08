import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Input from '@/components/ui/Input/Input';

export default function AuthForm() {
  const [step, setStep] = useState<"email" | "password">("email");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("")
  const [showPassword, setShowPassword] = useState(false);


  // === EMAIL VALIDATION ===
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNext = () => {
    if (!email) {
      setEmailError("Email is required");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setEmailError("");
    setStep("password");
  };

  const handleBack = () => setStep("email");

  const handleSubmit = () => {
      if (!password || !confirmPassword) {
      setPasswordError("Please fill in both password fields");
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setPasswordError("");
    console.log({ email, password });
    alert("Account created successfully ✅");
  };

  const formVariants = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  return (
    <div className="relative flex flex-col items-center  min-h-screen px-4 bg-white  transition-colors">
      {/* Back Button (fixed at top-left) */}
      {step === "password" && (
        <button
          onClick={handleBack}
          className="absolute top-6 text-white left-4 md:left-11 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
        >
          <ArrowLeft className="w-5 h-5 text-gray-800 " />
        </button>
      )}

      <div className="w-full max-w-sm mt-48">
        <AnimatePresence mode="wait">
          {step === "email" ? (
            <motion.div
              key="email-step"
              variants={formVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 ">
                What’s your email?
              </h2>

              <div>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  fullWidth
                  inputSize="md"
                  className="text-gray-900"
                  error={emailError}
                />
              </div>

              <button
                onClick={handleNext}
                className="w-full py-3 rounded-md bg-[#010922] text-white font-semibold"
              >
                Next
              </button>

              <p className="text-xs text-gray-500  text-center">
                By continuing you agree to the{" "}
                <a href="#" className="underline">
                  terms and conditions
                </a>{" "}
                of StudyRok
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="password-step"
              variants={formVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 ">
                Create a password
              </h2>

              <div className="space-y-4">
                <div className="relative">
                    <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-[#b6b6b6] rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-600"
                    error={passwordError}

                    />
                  
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                    <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border border-[#b6b6b6] rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-600"
                    error={passwordError}

                    />
                
              </div>

              <button
                onClick={handleSubmit}
                className="w-full py-3 rounded-md bg-[#010922] text-white font-semibold"
              >
                Create Account
              </button>

              <p className="text-xs text-gray-500  text-center">
                By continuing you agree to the{" "}
                <a href="#" className="underline">
                  terms and conditions
                </a>{" "}
                of StudyRok
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
