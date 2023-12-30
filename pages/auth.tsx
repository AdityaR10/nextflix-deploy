  import Input from "@/components/input";
  import axios from "axios";
  import { useCallback, useState } from "react"; 
  import { signIn } from "next-auth/react";
  import {FcGoogle} from "react-icons/fc";
  import {FaGithub} from "react-icons/fa"; 
  const Auth=()=>{ 

    const [email,setEmail]=useState('');
    const [name,setUsername]=useState('');
    const [password,setPassword]=useState('');

    const [variant,setVariant]=useState('login');

    const toggleVariant=useCallback(()=>{
        setVariant((currVar)=> currVar==='login'?'register':'login')
    },[]);

    const Login=useCallback(async ()=>{
        try{ 
            console.log("before req",password);
            await signIn('credentials',{
                email,
                password, 
                callbackUrl:'/profiles',
            });
 
        }
        catch(err)
        {
            console.log("suka",err);
        }
    },[email,password]);

    const register=useCallback(async()=>{
        try{
            await axios.post('/api/register',{
                email,
                name,
                password
            })

            Login();
        }
        catch(err){
            console.log(err);
        }
    },[email,name,password,Login]);
    
    return (
        <div className="bg-hero-pattern bg-no-repeat bg-center bg-cover relative h-full w-full">
             <div className="w-full h-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <img src="/images/logo.png" alt="Netflix-clone-logo" className="h-12"/>
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 px-8 py-4 self-center mt-2 w-[450px] lg:w-2/5 lg:max-w-md rounded-md sm:w-4/5">
                        <h2 className="text-white text-4xl nb-8 font-semibold mb-4">{variant==='login'? 'Sign In':'Register'}</h2>
                        <div className="flex flex-col gap-4">
                            {variant==='register' && (
                                 <Input
                                 label="Username"
                                 onChange={(e:any)=>setUsername(e.target.value)}
                                 id="name"
                                 value={name}/>
                            )}
                            <Input
                            label="Email"
                            onChange={(e:any)=>setEmail(e.target.value)}
                            id="email"
                            type="email"
                            value={email}/>
                             <Input
                            label="Password"
                            onChange={(e:any)=>setPassword(e.target.value)}
                            id="password"
                            type="password"
                            value={password}/>
                        </div>
                        <button onClick={variant==='login' ? Login:register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">{variant==='login'?'Login':'Sign Up'}</button>
                        <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                            <div  onClick={()=>signIn('google',{callbackUrl:'http://localhost:3000'})}className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                                <FcGoogle size={30}/>
                            </div>
                            <div onClick={()=>signIn('github',{callbackUrl:'http://localhost:3000'})} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                                <FaGithub size={30}/>
                            </div>
                        </div>
                        <p className="text-neutral-500 mt-12">{variant==='login'?'first time using Netflix? ':'Already have an account? '}
                        <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">{variant==='login'?'Create an Account':'Login'}</span></p>
                    </div>
                </div>
             </div>
        </div>
    );
}
export default Auth;