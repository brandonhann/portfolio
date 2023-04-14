import '../styles/globals.css'
import { useState, useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  useEffect(() => {
    document.documentElement.className = `theme-${theme}`
  }, [theme])

  return (
    <div className={`min-h-screen bg-${theme === 'light' ? 'light-bg' : 'dark-bg'} text-${theme === 'light' ? 'light-text' : 'dark-text'
      }`}>
      <Component {...pageProps} toggleTheme={toggleTheme} />
    </div>
  )
}

export default MyApp
