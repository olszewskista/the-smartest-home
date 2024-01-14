import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
const socket = io('http://localhost:3000');

export default function ChatPage() {
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
        setMessages(prev => [...prev, {user: socket.id, message}])
        socket.emit('send-message', socket.id, message, room)
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
