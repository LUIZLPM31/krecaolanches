
import { useState } from "react";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSuccessfulSignUp = () => {
    // Switch to sign in mode after successful signup
    setIsSignUp(false);
  };

  return (
    <div className="min-h-screen bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-gray-900 rounded-lg p-8 border border-gray-800">
          {isSignUp ? (
            <SignUpForm onToggleForm={toggleForm} onSuccessfulSignUp={handleSuccessfulSignUp} />
          ) : (
            <SignInForm onToggleForm={toggleForm} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
