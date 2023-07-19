import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from "firebase/auth";

export const Navbar = () => {
  const [ user ] = useAuthState(auth);

  const signUserOut = async () => {
    await signOut(auth);
  }

  return (
    <nav className="navbar">
      <Link to='/'>Home</Link>
      {!user ? <Link to='/login'>Login</Link> : <Link to='/createpost'>Create Post</Link>}
      {user && (
        <div className="navbar-user">
          <p>{user?.displayName}</p>
          <img src={user?.photoURL || ''} />
          {user?.uid && <button onClick={signUserOut} className="logout">Log Out</button>}
        </div>
      )}
    </nav>
  )
}