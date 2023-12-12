"use client";
import { useFormState } from 'react-dom'
import { useEffect, useRef, useState } from "react";
import DataTable from './DataTable';

export default function Form({processForm, csrfToken}) {
let [origin, setOrigin] = useState('') //set the origin to the current window location, we need this for the form action to know where to send the data since we are using a relative path in the action
let [id, setId] = useState(null) //set the id to null, we will get this from the url query parameter
useEffect(() => {
  setOrigin(window.location.origin) //this is in a useEffect because we can't get the window object on the server and useEffect only runs on the client
try {
  // id = new URL(window.location.href).searchParams.get("id");
  setId(new URL(window.location.href).searchParams.get("id")) //get the id from the url query parameter
  
  console.log(id);
  
}catch(e){
  window.location.href="/";
}
}, [])

// console.log(id);
let [CSRFToken, setCSRFToken] = useState(csrfToken)
let FormElms = useRef({id: null, name: null, email: null, petType: null, petName: null,userID: null, method: null});
    const [selectedSchema, setSelectedSchema] = useState('pets');//set the default schema to user, this will be used to determine which radio button is selected
let result ={} // the default result object, this will be used to store the result of the form submission
const [state, formAction] = useFormState(processForm,result);  //a new react hook (https://react.dev/reference/react-dom/hooks/useFormStatus) that is like useState but it get the result of the form submission in the server action and can send it back to the client  -this takes in the form action we make and returns a new form action that we can use in the form action attribute, it also takes in the default result object and returns the result object with the data from the form submission
    return (
      <>
      <br />
      <button onClick={() => {
        setCSRFToken('missing')
      }}>{CSRFToken==='missing'?"Removed":"Remove CSRF Token"}
      </button>
        <form action={formAction}>
        <input type="hidden" name="csrf_token" value={CSRFToken} />
        <input type="hidden" name="BASE_URL" value={origin} />
        <input type="hidden" name="userid" value={id} />
            <div className="schema">
        {/* <label htmlFor="user">Schema: User </label> */}
        {/* <input type="hidden" name="schema" id="user" value="user"  checked={selectedSchema==="user"} onChange={() => setSelectedSchema('user')}/> */}
         <br />
        <label htmlFor="pet">Schema:  Pet </label>
        <input type="hidden" name="schema" id="pet" value="pets" checked={selectedSchema==="pets"} onChange={() => setSelectedSchema('pets')}/>
      </div>


      {selectedSchema === 'user' && (
        <>
        <div className="name">
        <label htmlFor="name">Name: </label>
        <input ref={ref => {
    FormElms.current.name = ref
  }} type="text" name="name" id="name" />
      </div>
      <div className="email">
        <label htmlFor="email">Email: </label>
        <input ref={ref => {
    FormElms.current.email = ref
  }} type="text" name="email" id="email" />
      </div>
      </>
        )}
        {selectedSchema === 'pets' && (
        <div className="pet">
          <label htmlFor="petType">Type of Pet: </label>
          <input ref={ref => {
    FormElms.current.petType = ref
  }} type="text" name="petType" id="petType" />
          <br />
          <label htmlFor="petName">Pet Name: </label>
          <input ref={ref => {
    FormElms.current.petName = ref
  }} type="text" name="petName" id="petName" />
        </div>
      )}
      <div className="id">
        <label htmlFor="id">ID: </label>
        <input ref={ref => {
    FormElms.current.id = ref
  }}   type="text" name="id" id="id" />
      </div>
      <div className="method">
        <label htmlFor="method">Method (Select from menu): </label>
        <select name="method" id="method" ref={ref => {
    FormElms.current.method = ref
  }}>
          <option value="GET">Read</option>
          <option value="POST">Create</option>
          <option value="PATCH">Update</option>
          <option value="DELETE">Delete</option>
        </select>
      </div>
      <div className="submit">
        <input type="submit" value="Submit" />
      </div>
    </form>
    <DataTable FormElms={FormElms} state={state} baseurl={origin} action={formAction} selectedSchema={selectedSchema} csrfToken={CSRFToken}
    uid={id}
    />

      </>
    );
}