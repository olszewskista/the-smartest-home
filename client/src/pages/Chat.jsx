import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useUser } from '../context/UserProvider';
const socket = io('http://localhost:3000');

export default function ChatPage() {
    const {state} = useUser();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('')
    const [room, setRoom] = useState('all')

    useEffect(() => {
        socket.on('receive-message', data => {
            console.log('git')
            setMessages(prev => [...prev, {user: data.user, message: data.message}])
        })
        return () => {
            socket.off('receive-message')
        }
    }, [])

    function handleSend() {
        if (!state) {
            alert('You must login to send message')
            return
        }
        setMessages(prev => [...prev, {user: state.name, message}])
        socket.emit('send-message', state.name, message, room)
    }

    function handleJoinRoom() {
        socket.emit('join-room', room, message => {
            setMessages(prev => [...prev, {user: 'Info', message}])
        })
    }

    function handleLeaveRoom() {
        socket.emit('leave-room', room, message => {
            setMessages(prev => [...prev, {user: "Info", message}])
        })
    }
    return (
        <section className='flex flex-col justify-center items-center gap-4'>
            <h1 className='font-bold uppercase text-3xl'>Chat</h1>
            <div className='flex flex-col gap-1'>
                <input type="text" value={message} onChange={e => setMessage(e.target.value)}/>
                <button className='bg-orange-300 p-1 rounded' onClick={handleSend}>Send message</button>
            </div>
            <div className='flex gap-2'>
                <button className='bg-red-300 p-1 rounded' onClick={handleLeaveRoom}>Exit room</button>
                <select name="room" id="room" onChange={e => setRoom(e.target.value)}>
                    <option value="all">All</option>
                    <option value="livingRoom">Living Room</option>
                    <option value="kitchen">Kitchen</option>
                </select>
                <button className='bg-green-300 rounded p-1' onClick={handleJoinRoom}>Join room</button>
            </div>
            <ul className='flex flex-col gap-4 overflow-y-auto max-h-[60vh]'>
                {messages.map((mess, ix) => {
                    return (
                        <li key={ix} className='bg-orange-100 p-2 rounded'>
                            <span className='font-bold'>{mess.user}: </span>
                            <span>{mess.message}</span>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
