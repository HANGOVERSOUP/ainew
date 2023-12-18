import { useEffect } from 'react';
import { useRouter } from 'next/router';

const RedirectAfterLogin = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const intendedRoute = localStorage.getItem('intendedRoute');

    // Clear the intended route from localStorage
    localStorage.removeItem('intendedRoute');

    if (intendedRoute && intendedRoute !== router.asPath) {
      router.replace(intendedRoute); // Redirect to the intended route
      console.log("intendedRoute",intendedRoute);
    }
  }, [router]);

  return <>{children}</>;
};

export default RedirectAfterLogin;
