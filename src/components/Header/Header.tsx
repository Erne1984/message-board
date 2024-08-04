import './Header.css'
import { signOut, auth } from '../../services/firebase';

export default function Header(){
    
    const signOutFirebase = async () => {
        try {
          await signOut(auth);
        } catch (err) {
          console.log(err);
        }
      }
    
    return(
        <header>
            <h2>Chat Room</h2>

            <button onClick={signOutFirebase}>Deslogar</button>
        </header>
    )
}