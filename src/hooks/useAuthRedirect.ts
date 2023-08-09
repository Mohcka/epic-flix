import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

/**  This function checks if the user is logged in and redirects them to the login page if not. */
const useAuthRedirect = (redirectPath = "/auth") => {
  const session = useSession();
  const router = useRouter();

  const [isValidSession, setIsValidSession] = useState(true);

  useEffect(() => {
    if (session.status === "unauthenticated") {
      setIsValidSession(false);
      router.push(redirectPath);
    }
  }, [session, router, redirectPath]);

  return { isValidSession, isLoading: session.status === "loading" };
};

export default useAuthRedirect;
