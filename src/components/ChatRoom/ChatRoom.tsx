import './ChatRoom.css';

import { useState, useEffect, useRef } from "react";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../services/firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { User } from 'firebase/auth';

import Header from '../Header/Header';

interface ChatRoomProps {
    user: User | null;
}

interface Message {
    userId: string;
    userName: string;
    userPhotoURL: string;
    content: string;
    timestamp: any;
}

function ChatRoom({ user }: ChatRoomProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const msgRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const messagesCollection = collection(db, "messages");
        const messagesQuery = query(messagesCollection, orderBy("timestamp", "asc"));

        const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
            const messagesList: Message[] = querySnapshot.docs.map(doc => ({
                ...doc.data(),
                timestamp: doc.data().timestamp.toDate()
            })) as Message[];
            setMessages(messagesList);
        }, (error) => {
            console.error("Error fetching messages: ", error);
        });

        return () => unsubscribe();
    }, []);

    const handleAddMessage = async () => {
        if (user && msgRef.current) {
            try {
                await addDoc(collection(db, "messages"), {
                    userId: user.uid,
                    userName: user.displayName || "Anônimo",
                    userPhotoURL: user.photoURL || "",
                    content: msgRef.current.value,
                    timestamp: new Date()
                });
                console.log("Mensagem enviada com sucesso");
                msgRef.current.value = "";
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div className='container-chatRoom'>

            <div>
                <Header />
                <section className="container-messages">
                    {messages.map((message, index) => (
                        <div key={index} className={`message-${message.userId === user?.uid ? 'sent' : 'received'}`}>

                            <div className='message'>

                                <div className='message-header'>

                                    <div className='user-box'>
                                        <img src={message.userPhotoURL} alt={`${message.userName}'s profile`} className="profile-pic" />

                                        <span className='username' >{message.userName}</span>
                                    </div>


                                    <small className='created-at'>{message.timestamp.toLocaleTimeString()}</small>

                                </div>

                                <p className='content'>{message.content}</p>

                            </div>

                        </div>
                    ))}
                </section>
            </div>

            <div className="message-box">
                <input type="text" ref={msgRef} />
                <span className='icon' onClick={handleAddMessage}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                </span>
            </div>

        </div>
    );
}

export { ChatRoom }