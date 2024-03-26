const FooterComponent = () => {
  return (
    <footer className="w-full bg-white dark:bg-gray-900 border-b-2  border-t-teal-500">
      <div className="mx-auto max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex justify-center items-center space-x-4 mb-4 sm:mb-0">
            <a
              href="#"
              className="flex items-center text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white hover:underline"
            >
              <span className="sr-only">About</span>
              About
            </a>
            <a
              href="#"
              className="flex items-center text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white hover:underline"
            >
              <span className="sr-only">Contact</span>
              Contact
            </a>
            <a
              href="#"
              className="flex items-center text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white hover:underline"
            >
              <span className="sr-only">Projects</span>
              Projects
            </a>
          </div>
          <div className="flex justify-center">
            <a
              href="https://www.linkedin.com/in/sumit-kumar-57890a7b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-blue-400 mr-5"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 0h-14c-2.8 0-5 2.2-5 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5v-14c0-2.8-2.2-5-5-5zm-14 4h3v2h-3v-2zm0 4h3v12h-3v-12zm5 0h3v1.6h.1c.4-.8 1.5-1.6 3.1-1.6 3.3 0 3.9 2.2 3.9 5v7h-3v-6c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1v6.1h-3v-12z" />
              </svg>
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href="https://github.com/sumitsharnov"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0c-6.6 0-12 5.4-12 12 0 5.3 3.4 9.8 8.2 11.5.6.1.8-.3.8-.6v-2.3c-3.3.7-4-1.6-4-1.6-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.3-3.2-.1-.3-.6-1.5.1-3.2 0 0 1.1-.3 3.5 1.3 1-.3 2.1-.4 3.2-.4s2.2.1 3.2.4c2.4-1.6 3.5-1.3 3.5-1.3.7 1.7.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.4 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.8-1.7 8.2-6.2 8.2-11.5 0-6.6-5.4-12-12-12z" />
              </svg>
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
