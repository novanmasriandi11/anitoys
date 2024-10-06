import { useState } from "react"
import { FaSearch } from 'react-icons/fa';
import { RiShutDownLine } from 'react-icons/ri';

const Navbar = ({onLogout}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-blue-500 p-4 flex flex-col md:flex-row md:items-center md:justify-between shadow-lg">
            <div className="flex items-center justify-between">
                <img src="https://via.placeholder.com/100x40" alt="anitoys logo" className="h-10" />
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none" aria-label="Toggle menu">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className={`flex-col md:flex-row md:items-center md:space-x-4 mt-2 md:mt-0 ${isOpen ? 'flex' : 'hidden'} md:flex transition-all duration-300`}>
                <a href="#" className="text-white hover:text-blue-200 transition-colors duration-300 relative group">
                    Home
                    <span className="absolute bottom-0 left-0 w-0 h-1 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#" className="text-white hover:text-blue-200 transition-colors duration-300 relative group">
                    Product
                    <span className="absolute bottom-0 left-0 w-0 h-1 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#" className="text-white hover:text-blue-200 transition-colors duration-300 relative group">
                    On Sale
                    <span className="absolute bottom-0 left-0 w-0 h-1 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <div className="flex mt-2 md:mt-0">
                    <input type="text" placeholder="Search..." className="px-2 py-1 rounded-l-md border border-gray-300 focus:outline-none" />
                    <button className="bg-blue-700 text-white px-3 rounded-r-md flex items-center">
                        <FaSearch className="mr-1" />
                        Search
                    </button>
                </div>
                <button onClick={onLogout} className="bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center mt-2 md:mt-0 transform transition-transform duration-300 hover:scale-105">
                    <RiShutDownLine className="w-5 h-5" />
                </button>
            </div>
        </nav>
    )
}

export default Navbar;