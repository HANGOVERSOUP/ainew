'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import RedirectAfterLogin from './redirect-login';
const checkAuthentication = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    return token !== null;
  }
  return false;
};



const AuthCheck = ({children}) => {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = checkAuthentication();

    if (!isAuthenticated) {
      router.replace('/loginpage'); // Redirect to login page if not authenticated
      localStorage.setItem('intendedRoute', router.asPath);
    }
  }, [router]);

  return (
    <RedirectAfterLogin>
      {children}
    </RedirectAfterLogin>
  );
};

export default AuthCheck;
