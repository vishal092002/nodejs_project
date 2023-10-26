import styles from './page.module.css' // Import css modules stylesheet as styles
import { getSession } from "@auth0/nextjs-auth0";
export default async function Home() {
  const session = await getSession();
  let loggedIn = session && session.user && session.user["name"];
  return ( 
    <main className={styles.main}> 
      <h1 className={styles.title}>Hello {loggedIn ? session.user["name"] : "World"}!</h1>
      <a href={loggedIn ? "/api/auth/logout" : "/api/auth/login"}>{loggedIn ? "Logout" : "Login"}</a>
      {loggedIn && (<>
      

      <h3 className={styles.JWT} >JWT:</h3>
      <pre className={styles.JWT}>
  {(session?.idToken)}
</pre>      
</>
      )}

   
    </main>
  )
}
 