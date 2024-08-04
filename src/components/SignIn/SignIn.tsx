import './SignIn.css';
import { GoogleAuthProvider, signInWithPopup, auth } from "../../services/firebase";

function SignIn() {
    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <section className="btn-box">
            <button onClick={signInWithGoogle}>Sign In With Google</button>
        </section>

    );
}

export { SignIn };
