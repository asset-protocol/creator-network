const Header: React.FC = () => {
  return (<header>
    <nav className="[ nav ] [ blur-bg ]">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <a href="" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowra text-774FF8">CREATOR</span>
        </a>
        <div className="flex items-center lg:order-2">
          <a href="https://t.me/deschoolcommunity" className="text-whit e bg-#774FF8 hover:bg-#774FF9 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Contact Us Now</a>
        </div>
        <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
          <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li>
              <a href="#" className="font-bold block py-2 pr-4 pl-3 text-774FF8 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" aria-current="page">About</a>
            </li>
            <li>
              <a href="https://assethub-test.deschool.app/home" className="cursor-pointer font-bold block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Demo</a>
            </li>
            <li>
              <a href="https://creator-network.netlify.app/" className="cursor-pointer font-bold block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Creator Network</a>
            </li>
            <li>
              <a href="https://creator-network-docs.netlify.app/" className="cursor-pointer font-bold block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Docs</a>
            </li>
            <li>
              <a href="http://3.87.189.32:3000/graphql" className="cursor-pointer font-bold block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Api</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</header>)
}

export default Header