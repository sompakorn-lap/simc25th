import { ReactNode, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";

type ProtectedRouteWithRolesProps = {
  allowedRoles: string[];
  children: ReactNode;
};

function ProtectedRouteWithRoles({
  allowedRoles,
  children,
}: ProtectedRouteWithRolesProps) {
  const { auth, setAuth } = useAuth();
  const allow: boolean = allowedRoles.includes(auth?.userRole as string);

  async function refresh() {
    try {
      const res = await axios.get("/api/auth/refresh");
      setAuth(res.data);
    } catch (err) {}
  }

  useEffect(() => {
    if (auth) return;
    refresh();
  }, []);

  if (allow) return <>{children}</>;
  else if (auth) return <h1>You dont have permission</h1>;
  else return <h1>please login</h1>;
}

export default ProtectedRouteWithRoles;
