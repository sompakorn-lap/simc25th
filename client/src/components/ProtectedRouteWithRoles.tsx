import { ReactNode } from "react";
import { useRefresh } from "../api/auth.api";

type ProtectedRouteWithRolesProps = {
  allowedRoles: string[];
  children: ReactNode;
};

function ProtectedRouteWithRoles({
  allowedRoles,
  children,
}: ProtectedRouteWithRolesProps) {
  const { auth } = useRefresh();
  const allow: boolean = allowedRoles.includes(auth?.userRole as string);

  if (allow) return <>{children}</>;
  else if (auth) return <h1>You dont have permission</h1>;
  else return <h1>please login</h1>;
}

export default ProtectedRouteWithRoles;
