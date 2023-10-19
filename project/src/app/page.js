import styles from './page.module.css' // Import css modules stylesheet as styles

export default function Home() {
  return ( 
    <main className={styles.main}> 
      <h1 className={styles.title}>Goodbye World</h1>
    </main>
  )
}
 