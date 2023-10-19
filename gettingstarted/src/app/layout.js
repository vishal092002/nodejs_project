import './globals.css'

export const metadata = {
  title: 'Hello World',
  description: 'This is a description of my website',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
