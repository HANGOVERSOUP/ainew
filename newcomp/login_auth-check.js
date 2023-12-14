'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import RedirectAfterLogin from './login_redirect-login';

const checkAuthentication = () => {
  console.log("checkAuthentication");
  if (typeof window !== 'undefined') {
    const token = sessionStorage.getItem('token'); // Change localStorage to sessionStorage here

    // console.log("token", token);
    return token !== null;
  }
  return false;
};

const AuthCheck = ({children}) => {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = checkAuthentication();
    // console.log("isAuthenticated", isAuthenticated);
    // console.log("redirect1");

    if (!isAuthenticated) {
      // console.log("redirect2");
      router.replace('/new/login');
      sessionStorage.setItem('intendedRoute', router.asPath); // Change localStorage to sessionStorage here
    }
  }, [router]);

  return (
    <RedirectAfterLogin>
      {children}
    </RedirectAfterLogin>
  );
};

export default AuthCheck;
