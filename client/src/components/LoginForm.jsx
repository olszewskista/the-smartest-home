import { useFormik } from 'formik';

export default function LoginForm() {
    const formik = useFormik({
        initialValues: {
            name: '',
            password: '',
        },
        onSubmit: async (values, actions) => {
            alert(JSON.stringify(values, null, 2));
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    {...formik.getFieldProps('name')}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    {...formik.getFieldProps('password')}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
}
