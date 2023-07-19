import { auth, provider } from "../config/firebase"
import { signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom"
 
export const Login = () => {

  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const res = await signInWithPopup(auth, provider);
    console.log(res);
    navigate('/');
  }

  return (
    <div>
      <p>Sign in with Google to continue</p>
      <button onClick={signInWithGoogle}>Sign in With Google</button>
    </div>
  )
}