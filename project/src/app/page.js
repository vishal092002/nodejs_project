import styles from './page.module.css' // Import css modules stylesheet as styles
import { getSession } from "@auth0/nextjs-auth0";
import Form from "@/components/Form";
import processForm from './action';
import { headers } from 'next/headers';
export default async function Home() {
  let session = null;
  try {
    session = await getSession();
  } catch (error) {
  session = {}
  }
  let loggedIn = session && session.user && session.user["name"];
  let JWTParssed =loggedIn? JSON.parse(Buffer.from(session?.idToken.split('.')[1], 'base64').toString()):{};
  const csrfToken = headers().get('X-CSRF-Token') || 'missing';
  return ( 
    <main className={styles.main}> 
      <h1 className={styles.title}>Hello {loggedIn ? session.user["name"] : "World"}!</h1>
      {!loggedIn && (<>
        <p style={{textAlign: "center",color: "red"}}>You are missing the .env file</p>
      </>)}
      <a href={loggedIn ? "/api/auth/logout" : "/api/auth/login"}>{loggedIn ? "Logout" : "Login"}</a>
      {loggedIn && (<>
        <h3 className={styles.JWT} >JWT:</h3>
        <pre className={styles.JWT}>
          {(session?.idToken)}
          <br />
          <br />
          <br />
          <br />
          {Object.keys(JWTParssed).map((key, index) => (
          <span key={index}>
            {key} : {JWTParssed[key]}
            <br />
          </span>
          ))}
        </pre>      
      </>)}
      <Form processForm={processForm} csrfToken={csrfToken}/>{/* pass the processForm function to the Form component b/c we can only get it in a server context for some reason */}
    </main>
  )
}
 