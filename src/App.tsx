import {  Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import WelcomeScreen from "./features/auth/components/Welcome";
import AuthForm from "./features/auth/components/AuthForm";
import Onboarding from "./features/auth/onboarding/Onboarding";
import LoginForm from "./features/auth/components/LoginForm";

function App() {
 

  return (
    <>
   <Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/welcome" element={<WelcomeScreen />} />
  <Route path="/signup" element={<AuthForm />} />
  <Route path="/login" element={<LoginForm />} />signup
  <Route path="/onboarding" element={<Onboarding/>}/>
   </Routes>
    </>
  )
}

export default App
