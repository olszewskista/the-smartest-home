import { NavLink, Outlet, useLoaderData } from 'react-router-dom';
import { useUser } from '../context/UserProvider';
import { useLayoutEffect } from 'react';

export default function RootLayout() {
    const {state, dispatch} = useUser();
    const data = useLoaderData();
    useLayoutEffect(() => {
        if (data) {
            dispatch({type: 'LOGIN', payload: data})
        }
    }, [dispatch, data])
    return (
        <>
            <nav className='flex gap-4 justify-between p-4 bg-orange-300 mb-4'>
                <ul className='flex gap-4'>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard">Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink to="/posts">Posts</NavLink>
                    </li>
                    <li>
                        <NavLink to="/chat">Chat</NavLink>
                    </li>
                    <li>
                        <NavLink to="/login">Login</NavLink>
                    </li>
                </ul>
                {state && <ul className='flex gap-4'>
                    <li>
                        <span>{state.name}</span>
                    </li>
                    <li>
                        <span>{state.role}</span>
                    </li>
                </ul>}
            </nav>
            <main>
                <Outlet />
            </main>
        </>
    );
}
