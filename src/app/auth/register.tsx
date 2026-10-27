import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';

type RegisterForm = {
  email: string;
  password: string;
};

export default function Register() {
  const { register, handleSubmit } = useForm<RegisterForm>();
  const router = useRouter();

  const onSubmit = async (data: RegisterForm) => {
    const existingUser = await axios.get(`http://localhost:8000/users?email=${data.email}`);
    if (existingUser.data.length) return alert('User already exists!');
    await axios.post(`http://localhost:8000/users`, data);
    router.push('../auth/login');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="Email" required />
      <input type="password" {...register('password')} placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  );
}
