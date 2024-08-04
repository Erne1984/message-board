import './App.css';
import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, auth } from './services/firebase';
import { SignIn } from './components/SignIn/SignIn';
import { ChatRoom } from './components/ChatRoom/ChatRoom';
import { User } from 'firebase/auth';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const createUserFirebase = async () => {
    try {
      await createUserWithEmailAndPassword(auth, "teste@gmail.com", "123456");
      console.log("Usuário criado com sucesso!");
    } catch (err) {
      console.log(err);
    }
  }



  return (
    <>

      <section className='app-section'>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          user ? <ChatRoom user={user} /> : <SignIn />
        )}
      </section>
    </>
  );
}

export default App;
