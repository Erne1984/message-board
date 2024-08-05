import './App.css';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, auth } from './services/firebase';
import { SignIn } from './components/SignIn/SignIn';
import { ChatRoom } from './components/ChatRoom/ChatRoom';
import { User } from 'firebase/auth';
import Header from './components/Header/Header';

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

  return (
    <>

      <section className='app-section'>

        {user ? <Header/> : <></>}

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
