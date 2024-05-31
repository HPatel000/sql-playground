import { useAppContext } from '@/app/context';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export function LoginForm() {
  const { authenticate, setCurrUserInfo } = useAppContext();
  const [error, setError] = useState();
  const authenticateUser = async (e) => {
    setError(null);
    e.preventDefault();
    const username = e.target[0].value.trim();
    const password = e.target[1].value.trim();
    if (!username || !password) {
      setError('Please Enter Username and Password!');
      return;
    }
    try {
      const res = await authenticate({
        username: username,
        password: password,
      });
      if (res.error) {
        setError(res.error.toString());
      } else {
        setCurrUserInfo(username, password);
      }
    } catch (e) {
      setError(e.error.toString());
    }
  };
  return (
    <Card className='w-full max-w-sm'>
      <form onSubmit={authenticateUser}>
        <CardHeader>
          <CardTitle className='text-2xl'>Login</CardTitle>
        </CardHeader>
        <CardContent className='grid gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='username'>Username</Label>
            <Input id='username' type='username' required />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='password'>Password</Label>
            <Input id='password' type='password' required />
          </div>
          {error && <p class='text-red-500 text-xs italic'>{error}</p>}
        </CardContent>
        <CardFooter>
          <Button type='submit' className='w-full'>
            OK
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
