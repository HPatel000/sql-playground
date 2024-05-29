'use client';

import MainWindow from '@/components/MainWindow';
import { useAppContext } from './context';
import Login from './login/page';

export default function Home() {
  const { userState } = useAppContext();
  return (
    <main className='main'>
      {userState?.username && userState?.password ? <MainWindow /> : <Login />}
    </main>
  );
}
