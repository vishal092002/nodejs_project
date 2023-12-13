import styles from '../page.module.css' // Import css modules stylesheet as styles
import { getSession } from "@auth0/nextjs-auth0";
import Form from "@/components/Form";
import processForm from '../action';
import { cookies, headers } from 'next/headers';
export default async function Home() {
  let jwt = cookies().get('jwt')?.value;
  // let JWTParssed =loggedIn? JSON.parse(Buffer.from(session?.idToken.split('.')[1], 'base64').toString()):{};
  if(!jwt){
    return <a 
    style={{
     fontSize: "1.5rem",
     textAlign: "center",
     color: "#000",
      textDecoration: "none",
      display: "inline-block",
      marginTop: "1rem",
      border: "1px solid #000",
      padding: "1rem 2rem",
      borderRadius: "10px",
      
    }}
    href="/">Login</a>
    
  }
  let jwtParsed = jwt&&jwt.length>0? JSON.parse(Buffer.from(jwt.split('.')[1], 'base64').toString()):{};
  let user = await fetch(jwtParsed["baseURL"]+`/api/user/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ "email":jwtParsed["email"] }),
  }).then(res => res.json());
  const csrfToken = headers().get('X-CSRF-Token') || 'missing';
  //id is the urls ?id query parameter
async function logout(e){
  "use server";
  cookies().delete('jwt');
}
  return ( 
    <main className={styles.main}> 
      <h1 className={styles.title}>Hello World!</h1>
      {/* <a href={loggedIn ? "/api/auth/logout" : "/api/auth/login"}>{loggedIn ? "Logout" : "Login"}</a> */}
      
      <form action={logout}>
        <button type="submit">Logout</button>
        <input type="hidden" name="csrf_token" value={csrfToken}/>
      </form>
      <Form processForm={processForm} csrfToken={csrfToken} user={user}/>{/* pass the processForm function to the Form component b/c we can only get it in a server context for some reason */}
    </main>
  )
}
 