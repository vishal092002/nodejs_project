"use client"
import { useFormState } from 'react-dom'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
export const LoginForm = ({loginAction,loginAction2,csrfToken}) => {
  let router = useRouter();
  let result ={} 
  let result2 ={} 
  const [state, formAction] = useFormState(loginAction,result);
  const [state2, formAction2] = useFormState(loginAction2,result2);
  let [origin, setOrigin] = useState('') 
  useEffect(() => {
    setOrigin(window.location.origin) 
  }, []);

  useEffect(() => {
if(state&&Object.keys(state).length>0){
router.push('/pets')
}else{
  console.log(state);
}
  }, [state]);
  return (
    <>
   
<form action={formAction}
    style={{display: 'flex', flexDirection: 'column', width: '200px', margin: 'auto', paddingTop:"100px",gap:"10px"}} 
    > <h1>Login</h1>
    <input type="hidden" name="csrf_token" value={csrfToken} />
      <input type="text" placeholder="Enter your email" name="email" />
      <input type="hidden" name="BASE_URL" value={origin} />
      <button type="submit">Submit</button>
    </form>

   
    <form action={formAction2}
    style={{display: 'flex', flexDirection: 'column', width: '200px', margin: 'auto', paddingTop:"100px",gap:"10px"}} 
    > <h1>Signup</h1>
   {/* signup */}
      <input type="text" placeholder="Enter your email" name="email" />
      <input type="text" placeholder="Enter your name" name="name" />
      <input type="hidden" name="csrf_token" value={csrfToken} />
      <input type="hidden" name="BASE_URL" value={origin} />
      <button type="submit">Submit</button>
    </form>
    </>
  )
}
