'use client';

import Home from '@/components/Home';
import { useAppContext } from './context';
import { LoginForm } from '@/components/Login';
import { ThemeProvider, useTheme } from 'next-themes';
import { useEffect } from 'react';

export default function Page() {
  const { userState } = useAppContext();
  const { setTheme } = useTheme();
  useEffect(() => {
    setTheme('dark');
  }, []);

  return (
    <main className='main'>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        {/* {userState?.username && userState?.password ? <Home /> : <LoginForm />} */}
        <Home />
      </ThemeProvider>
    </main>
  );
}
