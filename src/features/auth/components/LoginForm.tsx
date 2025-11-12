import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useAuth';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formVariants = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  return (
    <div className="relative flex flex-col items-center  min-h-screen px-4 bg-white  transition-colors">
      {/* Back Button (fixed at top-left) */}

      <button
        onClick={() => navigate(-1)}
        className="absolute top-9  left-4 md:left-11  text-gray-800 p-2 rounded-full hover:bg-neutral-800 hover:text-gray-100 transition"
      >
        <ArrowLeft className="w-5 h-5 " />
      </button>

      <div className="w-full max-w-sm mt-48">
        <AnimatePresence mode="wait">
          {/*           
            <motion.div
              key="login"
              variants={formVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 ">
                Login
              </h2>

              <div className="space-y-4">
                <div className="relative">
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
                    
                
              </div>

              <button
                onClick={handleSubmit}
                className="w-full py-3 rounded-md bg-[#010922] text-white font-semibold"
              >
                Login
              </button>

              <p className="text-xs text-gray-500  text-center">
                By continuing you agree to the{" "}
                <a href="#" className="underline">
                  terms and conditions
                </a>{" "}
                of StudyRok
              </p>
            </motion.div> */}
          <motion.div
            key="login"
            variants={formVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-6"
          ></motion.div>
          <h2 className="text-3xl font-bold text-center mb-2">Login</h2>
          <p className="text-gray-600 text-center mb-6">
            Continue your studying journey with StudyRok
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                placeholder="At least 6 characters"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {isPending ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-purple-600 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </AnimatePresence>
      </div>
    </div>
  );
}
