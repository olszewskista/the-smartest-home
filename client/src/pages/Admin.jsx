import { useEffect, useState } from 'react';

export default function AdminPage() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/user/', {
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [users]);
    async function handleDelete(name) {
        try {
            const response = await fetch(
                `http://localhost:3000/user/delete/${name}`,
                {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <h1 className="font-bold text-3xl text-center uppercase mb-2">
                Admin
            </h1>
            {users.length > 0 && <ul className='flex justify-center items-center flex-col gap-2'>
                {users.map((user) => (
                    <li key={user._id} className='flex gap-4 p-4 bg-neutral-200 rounded justify-center items-center'>
                        <div>{user.name}</div>
                        <div>({user.role})</div>
                        <button onClick={() => handleDelete(user.name)} className='bg-red-500 text-white p-2 rounded' >Delete</button>
                    </li>
                ))}
            </ul>}
        </>
    );
}
