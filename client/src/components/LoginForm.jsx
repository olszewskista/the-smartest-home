import { useFormik } from 'formik';
import { useUser } from '../context/UserProvider';


export default function LoginForm() {
    const {dispatch, state} = useUser()
    console.log(state)
    const formik = useFormik({
        initialValues: {
            name: '',
            password: '',
        },
        onSubmit: async (values, actions) => {
            // alert(JSON.stringify(values, null, 2));
            try {
                const response = await fetch('http://localhost:3000/auth/login', {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const response2 = await fetch('http://localhost:3000/auth/', {
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' }
                });
                if (!response2.ok) {
                    throw new Error('Network response2 was not ok');
                }
                const data = await response2.json();
                dispatch({type: 'LOGIN', payload: data})
                actions.resetForm();
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
            <button type="submit">Login</button>
        </form>
    );
}
