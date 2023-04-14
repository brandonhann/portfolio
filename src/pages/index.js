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
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Brandon Hann</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="w-full flex items-center justify-between p-6">
        <h1 className="text-2xl font-bold">Brandon Hann</h1>
        <button
          className="py-1 px-4 border rounded-md focus:outline-none hover:bg-opacity-80"
          onClick={handleToggle}
        >
          {isDark ? 'Light Theme' : 'Dark Theme'}
        </button>
      </header>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* Add your project cards here */}
          {[
            { title: 'KnowTools', description: 'AI powered tools utilizing Open AI', githubLink: 'https://github.com/brandonhann/knowtools', link: 'https://know.tools/' },
            { title: 'Sacred Geometry Generator', description: 'Generate random shapes.', githubLink: 'https://github.com/brandonhann/sacred-geometry-generator', link: 'https://sacred-geometry-generator.vercel.app/' },
            { title: 'Project 3', description: 'A brief description of Project 3.', githubLink: 'https://github.com/brandonhann/', link: 'https://sacred-geometry-generator.vercel.app/' },
            { title: 'Project 4', description: 'A brief description of Project 4.', githubLink: 'https://github.com/brandonhann/', link: 'https://sacred-geometry-generator.vercel.app/' },
          ].map((project, index) => (
            <div
              key={index}
              className="card text-left shadow-md rounded-lg p-6 flex flex-col"
            >
              <div className='flex align-middle gap-2 mb-4'>
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fa text-gray-600 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
                >
                  <FaGithub size={24} />
                </a>
              </div>
              <a className='text-blue-400 hover:underline' href={project.link} target='_blank'>Try app</a>
              <p className="break-words">{project.description}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-gray-300 dark:border-gray-800 mt-8 w-full h-12 flex justify-center items-center border-t">
        <p className="text-sm">&copy; {new Date().getFullYear()} - Brandon Hann</p>
      </footer>
    </div>
  )
}