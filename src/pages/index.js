import Head from 'next/head';
import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';

export default function Home({ toggleTheme }) {
  const [isDark, setIsDark] = useState(false)

  const handleToggle = () => {
    setIsDark(!isDark)
    toggleTheme()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Brandon Hann</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="w-full flex items-center justify-between p-6">
        <h1 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-300 uppercase">Brandon Hann</h1>
        <button
          className="py-1 px-4 border shadow-md rounded-md focus:outline-none hover:bg-opacity-80 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-300 font-bold"
          onClick={handleToggle}
        >
          {isDark ? 'Light Theme' : 'Dark Theme'}
        </button>
      </header>

      <span className='bg-gradient-to-r from-cyan-500 to-blue-300 w-full h-1 mb-4 md:mb-0 flex justify-center items-center shadow-md'></span>

      <main className="flex flex-col items-center justify-center w-full flex-1 text-center">
        <section className='px-4 '>
          <h3 className="text-2xl md:text-3xl font-bold mb-6 ">Showcase Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mx-0 md:mx-10">
            {[
              { title: 'KnowTools', description: 'AI powered tools utilizing Open AI', githubLink: 'https://github.com/brandonhann/knowtools', link: 'https://know.tools/' },
              { title: 'Georgian College Open Concert', description: 'My COMM 1016 final project is a single responsive webpage promoting and providing information about the Global Rhythms Open Concert Night at Georgian College, an event I created to showcase student talent, creativity, and cultural diversity.', githubLink: 'https://github.com/brandonhann/gc-open-concert-night', link: 'https://gc-concert.vercel.app/' },
              { title: 'Sacred Geometry Generator', description: 'Generate random shapes.', githubLink: 'https://github.com/brandonhann/sacred-geometry-generator', link: 'https://sacred-geometry-generator.vercel.app/' },
              { title: 'Project 4', description: 'A brief description of Project 4.', githubLink: 'https://github.com/brandonhann/', link: 'https://sacred-geometry-generator.vercel.app/' },
            ].map((project, index) => (
              <div
                key={index}
                className="card text-left shadow-md rounded-lg p-6 flex flex-col"
              >
                <div className='flex align-middle gap-2 mb-4'>
                  <h4 className="text-xl font-semibold">{project.title}</h4>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fa text-gray-600 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
                  >
                    <FaGithub size={24} />
                  </a>
                </div>
                <p><a className='font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-300 hover:underline' href={project.link} target='_blank'>View app</a></p>
                <p className="break-words">{project.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-gray-300 dark:border-gray-800 mt-4 md:mt-0 w-full h-12 flex justify-center items-center border-t">
        <p className="text-sm">&copy; {new Date().getFullYear()} - Brandon Hann</p>
      </footer>
    </div>
  )
}