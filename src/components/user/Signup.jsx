import { sendEmailVerification, createUserWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { auth } from "../../../config/firebase"

const SignUp = ({setUserData, userData}) => {
   
    const registerByEmail = () => {
        createUserWithEmailAndPassword(auth, userData.email, userData.password)
        .catch((err) => console.log(err))
        console.log(auth.currentUser)
        // setCurrentUser()

    }
    return (
        
        // <form onSubmit={requestOTP}>
        //     <input type="tel" name="phone" id="phone" required onChange={(e) => (setPhoneNumber(e.target.value))}/>
        //     <input type="submit" value="send"  />
        //     <div id="recaptcha-container"></div>
        // </form>
        <div >
            <input type="email" name="email" id="email" value={userData.email} onChange={(e) => setUserData((userData) => ({
                ...userData, email: e.target.value
            }))} required/>
            <input type="password" name="password" id="password" value={userData.password} onChange={(e) => setUserData((userData) => ({...userData, password: e.target.value}))} required/>
            <button onClick={registerByEmail}>submit</button>
        </div>
    )
}

export default SignUp