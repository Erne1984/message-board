import { useRef } from "react";
import { collection, addDoc, doc, setDoc, getDocs } from "firebase/firestore";
import { db, auth } from "../../services/firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { User } from 'firebase/auth';

interface ChatRoomProps {
    user: User | null;
}

function ChatRoom({ user }: ChatRoomProps) {
    const msgRef = useRef<HTMLInputElement | null>(null);

    const addMessage = async () => {
        if (user && msgRef.current) {
            try {
                await addDoc(collection(db, "messages"), {
                    userId: user.uid, 
                    userName: user.displayName || "Anônimo",
                    content: msgRef.current.value,
                    timestamp: new Date() 
                });
                console.log("Mensagem enviada com sucesso");
                msgRef.current.value = "";
            } catch (err) {
                console.log(err);
            }
        }
    }

    const getMessages = async () => {
        try{
            
        }catch(err){
            console.log(err)
        }
    }

    return (
        <>
            <h3>Chat Room</h3>
            <section className="container-messages">
                {}
            </section>
            <div className="message-box">
                <input type="text" ref={msgRef} />
                <span onClick={addMessage}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                </span>
            </div>
        </>
    );
}

export { ChatRoom }