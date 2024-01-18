import { useFormik } from 'formik';
import { useUser } from '../context/UserProvider';

export default function RegisterForm() {
    const { dispatch } = useUser();
    const formik = useFormik({
        initialValues: {
            name: '',
            password: '',
            role: 'user',
        },
        onSubmit: async (values, actions) => {
            try {
                const response = await fetch(
                    'http://localhost:3000/auth/register',
                    {
                        method: 'POST',
                        credentials: 'include',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(values),
                    }
                );
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const response2 = await fetch('http://localhost:3000/auth/', {
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                });
                if (!response2.ok) {
                    throw new Error('Network response2 was not ok');
                }
                const data = await response2.json();
                dispatch({ type: 'LOGIN', payload: data });
            } catch (error) {
                console.log(error);
            }
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
            <div>
                <label htmlFor="role">Role</label>
                <select
                    name="role"
                    id="role"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
            </div>
            <button type="submit">Register</button>
        </form>
    );
}
