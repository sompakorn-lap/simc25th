import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function SignInPage() {
  const { setAuth } = useAuth();
  const { signinToken } = useParams();

  async function signin() {
    try {
      const res = await axios.get(`/api/auth/signin/${signinToken}`);
      // console.log(res.data);
      setAuth(res.data);
    } catch (err) {}
  }

  useEffect(() => {
    signin();
  }, []);

  return <></>;
}

export default SignInPage;
