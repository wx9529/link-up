import { useState } from "react";

const AuthModal = ({setShowModal, isSignUp}) => {

  const [firstName, setFirstName] =useState(null)
  const [lastName, setLastName] = useState(null)
  const [email, setEmail] =useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [error, setError] = useState(null)

  const handleClick = () => {
    setShowModal(false)
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    try {
      if(isSignUp && (password !== confirmPassword)){
        setError('Passwords need to match')
      }
      console.log('make a post request to our database')
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <div className="auth-modal">
      <div className="close-icon" onClick={handleClick}>
        x
      </div>
      <h2>{isSignUp ? 'CREATE ACCOUNT' : 'LOG IN'}</h2>
      <p>By clicking Log In, you agree to our terms. Learn how we process your data in our privacy policy</p>
     <form onSubmit={handleSubmit}>
        {isSignUp && <input
          type="name"
          id="first-name"
          name="first-name"
          placeholder="first-name"
          required={true}
          onChange={(e) => setFirstName(e.target.value)}
        />}
        {isSignUp && <input
          type="name"
          id="last-name"
          name="last-name"
          placeholder="last-name"
          required={true}
          onChange={(e) => setLastName(e.target.value)}
        />}
       <input
         type="email"
         id="email"
         name="email"
         placeholder="email"
         required={true}
         onChange={(e)=>setEmail(e.target.value)}
       />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isSignUp && <input
          type="password"
          id="confirm-password"
          name="confirm-password"
          placeholder="confirm password"
          required={true}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />}
        <input className="secondary-button" type="submit"/>
        <p>{error}</p>
     </form>
     <hr/>
     <h2>Get the App</h2>
    </div>
  )
}
export default AuthModal