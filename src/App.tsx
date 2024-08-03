import './App.css';
import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, auth } from './services/firebase';
import { SignIn } from './components/SignIn/SignIn';
import { ChatRoom } from './components/ChatRoom/ChatRoom';
import { User } from 'firebase/auth';

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
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

  const signOutFirebase = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <header>
        <button onClick={createUserFirebase}>Criar Usuário</button>
        <button onClick={signOutFirebase}>Deslogar</button>
      </header>

      <section>
        {user ? <ChatRoom user={user} /> : <SignIn />}
      </section>
    </>
  );
}

export default App;
