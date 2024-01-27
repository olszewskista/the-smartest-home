import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

export default function LoginPage() {
    return (
        <>
            <h1 className='font-bold uppercase text-center text-3xl'>Login</h1>
            <div className="flex gap-12 items-center justify-evenly">
                <LoginForm />
                <RegisterForm />
            </div>
        </>
    );
}
