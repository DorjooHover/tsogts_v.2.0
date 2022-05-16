import { auth, provider } from "../../../config/firebase";
import { signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { Button, Grid } from "@mui/material"
import {Google} from '@mui/icons-material'
import { useState } from "react";
import SignUp from './Signup'
import { useRouter } from "next/router";
const Login = ({ setUserData, userData}) => {
    const [isLogin, setIsLogin] = useState(true)
    const [login, setLogin] = useState({email: '', password: ''})
    const [loading, setLoading] = useState(false)
    const [forgetPass, setForgetPass] = useState('')
    const router = useRouter()
    const loginWithGoogle = () => {
        signInWithPopup(auth, provider)
    } 

    const loginUser = () => {
        router.replace('/')
        console.log(login.email, login.password)
        setLoading(true)
        signInWithEmailAndPassword(auth, login.email, login.password).then((res) => console.log(res)).catch((err) => console.log(err)).finally(() => setLoading(false))
    }

    const forgetPassword = () => {
        return sendPasswordResetEmail(auth, forgetPass)
    }
    return (
        <>
        {isLogin && (
            <>
            <Grid container spacing={0} direction='column' alignItems={'center'} justifyContent={'center'} style={{minHeight: '100vh'}}>
            <Button variant="contained" startIcon={<Google />} onClick={loginWithGoogle}>Sign in Google</Button>
            <button onClick={() => setIsLogin(false)}>signup</button>
        <div >
            <input type="email" name="email" id="email" onChange={(e) => setLogin(login => ({...login, email:e.target.value}))} value={login.email} />
            <input type="password" name="password" id="password" onChange={(e) => setLogin(login => ({...login, password:e.target.value}))} value={login.password} />
            <button onClick={loginUser}>login</button>
            <input type="email" name="forgetPass" id="forgetPass" onChange={(e) => setForgetPass(e.target.value)} />
            <button onClick={forgetPassword}>forget pass</button>
        </div>
        </Grid>
            </>
        )}
        {
            !isLogin && (
                <div>
                    <SignUp setUserData={setUserData}  userData={userData}/>
                    <button onClick={() => setIsLogin(true)}>login</button>
                </div>
            )}
        
        </>
    )
}

export default Login