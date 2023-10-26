import './globals.css'
import { UserProvider } from '@auth0/nextjs-auth0/client';
export const metadata = {
  title: 'Hello World', // title element, shown in the browser tab
  description: 'This is a description of my website', // description meta tag, for search engines
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <UserProvider>  {/* This is needed for Auth0 to work*/}
      <body>{children}</body>
      </UserProvider>
    </html>
  )
}
