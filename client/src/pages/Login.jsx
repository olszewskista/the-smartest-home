import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

export default function LoginPage() {
    return (
        <>
            <h1>Login</h1>
            <LoginForm />
            <br />
            <RegisterForm />
        </>
    );
}