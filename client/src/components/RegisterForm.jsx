import {useFormik} from 'formik'

export default function RegisterForm() {
    const formik = useFormik({
        initialValues: {
            name: '',
            password: '',
            role: 'user'
        },
        onSubmit: async (values, actions) => {
            alert(JSON.stringify(values, null, 2));
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });
        },
    
    })
    return <form>
        <div>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" {...formik.getFieldProps('name')}/>
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" {...formik.getFieldProps('password')}/>
        </div>
        <div>
            <label htmlFor="role">Role</label>
            <select name="role" id="role" value={formik.values.role} onChange={formik.handleChange}>
                <option value="admin">Admin</option>
                <option value="user">User</option>
            </select>
        </div>
        <button type="submit">Register</button>
    </form>
}