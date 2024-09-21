import { Navigate, useParams } from "react-router-dom";
// import { useSignIn } from "../api/auth.api";
import axios, { AxiosError } from "axios";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";

function SignInPage() {
  const { signinToken } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // const { isLoading, isSuccess, error } = useSignIn(signinToken as string);
  // const errorMessage = (error as AxiosError)?.response?.data as string;

  async function signin() {
    try {
      setIsLoading(true);
      await axios.get(`/api/auth/signin/${signinToken}`);
      setIsSuccess(true);
    } catch (err) {
      setError(true);
      if (err instanceof AxiosError) setErrorMessage(err?.response?.data);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    signin();
  }, []);

  if (isLoading) return <Loading />;
  if (error) return <h1>{errorMessage}</h1>;
  if (isSuccess) return <Navigate to="/dashboard" />;
}

export default SignInPage;
