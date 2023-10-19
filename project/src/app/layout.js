import './globals.css'

export const metadata = {
  title: 'Hello World', // title element, shown in the browser tab
  description: 'This is a description of my website', // description meta tag, for search engines
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
