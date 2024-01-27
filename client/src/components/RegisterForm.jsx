import { useFormik } from 'formik';
import { useUser } from '../context/UserProvider';
import {useNavigate} from 'react-router-dom';

export default function RegisterForm() {
    const navigate = useNavigate();
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
                actions.resetForm();
                navigate('/');
            } catch (error) {
                console.log(error);
            }
        },
    });
    return (
        <form onSubmit={formik.handleSubmit} className='flex flex-col gap-2'>
            <div className='flex flex-col'>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    {...formik.getFieldProps('name')}
                />
            </div>
            <div className='flex flex-col'>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    {...formik.getFieldProps('password')}
                />
            </div>
            <div className='flex flex-col'>
                <label htmlFor="role">Role</label>
                <select
                    name="role"
                    id="role"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                >
                    <option value="adult">Adult</option>
                    <option value="child">Child</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <button className='bg-orange-300 p-2 rounded' type="submit">Register</button>
        </form>
    );
}
