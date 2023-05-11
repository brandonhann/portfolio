import '../styles/globals.css';
import Head from 'next/head';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import About from "./about";
import Projects from "./projects"
import Contact from "./contact"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faLinkedin, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons"

export default function App() {
  const [activeComponent, setActiveComponent] = useState('About');
  const [showAside, setShowAside] = useState(false);

  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const changeComponent = (component) => {
    setActiveComponent(component);
    setShowAside(false);

    if (component === 'About') {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (component === 'Projects') {
      projectsRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (component === 'Contact') {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div>
      <Head>
        <title>Brandon Hann</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='h-screen flex'>
        <aside className={`min-h-screen  bg-zinc-800 text-zinc-50 md:border-r md:border-zinc-700 w-full flex flex-col fixed inset-0 z-10 md:relative md:w-2/4 md:flex ${showAside ? '' : 'hidden md:block'}`}>
          <button className="md:hidden text-zinc-50 text-2xl px-2 py-1" onClick={() => setShowAside(false)}>×</button>
          <div className='my-auto flex items-center m-0 p-4'>
            <Image
              src="/logo.png"
              width={124}
              height={124}
              alt="BH Logo"
              className='m-auto'
            />
          </div>
          <header className='my-auto'>
            <nav className='flex flex-col items-center'>
              <ul className='flex flex-col items-center w-full text-lg list-none'>
                <li className={`w-full text-center cursor-pointer p-4 border-y border-zinc-700 hover:text-cyan-300 transition duration-300 ${activeComponent === 'About' ? 'text-cyan-300' : ''}`} onClick={() => changeComponent('About')}>About</li>
                <li className={`w-full text-center cursor-pointer p-4 border-b border-zinc-700 hover:text-cyan-300 transition duration-300 ${activeComponent === 'Projects' ? 'text-cyan-300' : ''}`} onClick={() => changeComponent('Projects')}>Projects</li>
                <li className={`w-full text-center cursor-pointer p-4 border-b border-zinc-700 hover:text-cyan-300 transition duration-300 ${activeComponent === 'Contact' ? 'text-cyan-300' : ''}`} onClick={() => changeComponent('Contact')}>Contact</li>
              </ul>
              <ul className='flex flex-row gap-4 items-center justify-center w-full text-2xl list-none p-4'>
                <a href="#" target='_blank' className='hover:text-cyan-300 transition duration-300'><li><FontAwesomeIcon icon={faLinkedin} /></li></a>
                <a href="#" target='_blank' className='hover:text-cyan-300 transition duration-300'><li><FontAwesomeIcon icon={faGithub} /></li></a>
                <a href="#" target='_blank' className='hover:text-cyan-300 transition duration-300'><li><FontAwesomeIcon icon={faTwitter} /></li></a>
              </ul>
            </nav>
          </header>
          <footer className='text-center p-4 my-auto'>
            <p className='opacity-40'>&copy; 2023 Brandon Hann</p>
          </footer>
        </aside>

        <button className={`md:hidden fixed top-0 right-0 m-4 p-2 rounded-full bg-gray-500 text-zinc-50 ${showAside ? 'hidden' : 'block'}`} onClick={() => setShowAside(true)}>Menu</button>

        <div className="overscroll-none overflow-hidden">
          <About ref={aboutRef} />
          <Projects ref={projectsRef} />
          <Contact ref={contactRef} />
        </div>

      </div>

    </div>
  )
}