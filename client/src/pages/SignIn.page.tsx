import axios from "axios";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function SignInPage() {
  const { setAuth } = useAuth();
  const { signinToken } = useParams();

  async function signin() {
    try {
      const res = await axios.get(`/api/auth/signin/${signinToken}`);
      setAuth(res.data);
    } catch (err) {}
  }

  useEffect(() => {
    signin();
  }, []);

  return <Navigate to="/dashboard" />;
}

export default SignInPage;
