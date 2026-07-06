"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    if (!isAdmin) {
      router.replace("/admin-login");
      return;
    }

    setAuthorized(true);
  }, [router]);

  if (!authorized) {
    return null; // or a spinner/skeleton
  }

  return <>{children}</>;
}