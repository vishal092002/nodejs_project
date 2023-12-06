"use client"
import { useFormState } from 'react-dom'
import React, { useEffect, useState } from 'react'

export const LoginForm = ({loginAction,csrfToken}) => {
  let result ={} 
  const [state, formAction] = useFormState(loginAction,result);
  let [origin, setOrigin] = useState('') 
  useEffect(() => {
    setOrigin(window.location.origin) 
  }, []);
  // if the state.data property is not null, then we will redirect the user to /form?id=id
  if(state.data&&state.data.length>0&&state.data[0]?.id!==null){
    window.location.href = '/pets?id='+state?.data[0].id;
  }

  return (
    <>
<form action={formAction}
    style={{display: 'flex', flexDirection: 'column', width: '200px', margin: 'auto', paddingTop:"100px",gap:"10px"}} 
    >
    <input type="hidden" name="csrf_token" value={csrfToken} />
      <input type="text" placeholder="Enter your email" name="email" />
      <input type="hidden" name="BASE_URL" value={origin} />
      <button type="submit">Submit</button>
    </form>
    </>
  )
}
