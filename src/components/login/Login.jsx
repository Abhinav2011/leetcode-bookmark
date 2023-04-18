import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithGoogle, logout } from "../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import google from "../../assets/google.svg";

const Login = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/homepage");
    }
  }, [user]);

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="title">Sign in</h2>
        <div className="google-login">
          <button className="google-btn" onClick={signInWithGoogle}>
            <img alt="Google" src={google} />
            <p class="btn-text">Sign in with Google</p>
          </button>
        </div>
        <div className="register-redirect-text">
          Don't have an account ?<Link to="/register"> Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
