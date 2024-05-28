'use client';

import { useAppContext } from '../context';

export default function Login() {
  const context = useAppContext();
  return (
    <div>
      <h1>LOGIN</h1>
      <p>{context.username}</p>
    </div>
  );
}
