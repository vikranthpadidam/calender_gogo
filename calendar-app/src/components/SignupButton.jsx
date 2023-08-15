
import React from 'react';

const SignUpButton = () => {
  const handleSignUp = () => {
    // Replace 'YOUR_BACKEND_ENDPOINT' with the actual URL of your backend endpoint
    const backendEndpoint = 'http://localhost:8000/google';

    // Redirect the user to the backend endpoint
    window.location.href = backendEndpoint;
  };

  return (
    <button onClick={handleSignUp}>
      Sign up with Backend
    </button>
  );
};

export default SignUpButton;