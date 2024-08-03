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
        <button onClick={signInWithGoogle}>Sign In With Google</button>
    );
}

export { SignIn };
