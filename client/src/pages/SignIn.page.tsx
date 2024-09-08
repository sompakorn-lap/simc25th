import { Navigate, useParams } from "react-router-dom";
import { useSignIn } from "../api/auth.api";
import { AxiosError } from "axios";

function SignInPage() {
  const { signinToken } = useParams();

  const { isLoading, isSuccess, error } = useSignIn(signinToken as string);
  const errorMessage = (error as AxiosError)?.response?.data as string;

  if (isLoading) return <h1>loading</h1>;
  if (error) return <h1>{errorMessage}</h1>;
  if (isSuccess) return <Navigate to="/dashboard" />;
}

export default SignInPage;
