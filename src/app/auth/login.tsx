import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';

type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit } = useForm<LoginForm>();
  const router = useRouter();

  const onSubmit = async (data: LoginForm) => {
    const res = await axios.get(`http://localhost:8000/users?email=${data.email}&password=${data.password}`);
    if (res.data.length) {
      localStorage.setItem('user', JSON.stringify(res.data[0]));
      router.push('../dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="Email" />
      <input type="password" {...register('password')} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}
