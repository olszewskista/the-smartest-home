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
    console.log(room)
    return (
        <section>
            <div>
                <input type="text" value={message} onChange={e => setMessage(e.target.value)}/>
                <button onClick={handleSend}>Send message</button>
            </div>
            <div>
                <select name="room" id="room" onChange={e => setRoom(e.target.value)}>
                    <option value="all">All</option>
                    <option value="livingRoom">Living Room</option>
                    <option value="kitchen">Kitchen</option>
                </select>
                <button onClick={handleJoinRoom}>Join room</button>
                <button onClick={handleLeaveRoom}>Exit room</button>
            </div>
            <ul>
                {messages.map((mess, ix) => {
                    return (
                        <li key={ix}>
                            {mess.user}: {mess.message}
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
