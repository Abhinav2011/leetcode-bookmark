import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithGoogle, logout } from "../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Login = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if(user){
        navigate("/homepage");
    }
  },[user]);
  
  return (
    <div>
      <div className="google-login">
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      </div>
      <div className="register-redirect-text">
        Don't have an account ?<Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default Login;
