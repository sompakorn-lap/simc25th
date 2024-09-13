import { ReactNode } from "react";

type ProtectedRouteWithDatetimeProps = {
  startDatetime: string;
  endDatetime: string;
  children: ReactNode;
};

function ProtectedRouteWithDatetime({
  startDatetime,
  endDatetime,
  children,
}: ProtectedRouteWithDatetimeProps) {
  const start: number = new Date(startDatetime).getTime();
  const end: number = new Date(endDatetime).getTime();
  const now: number = Date.now();

  const allow = (start <= now && now <= end) || true;
  if (allow) return <>{children}</>;
  else return <h1>not available</h1>;
}

export default ProtectedRouteWithDatetime;
