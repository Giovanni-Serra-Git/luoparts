/* eslint-disable react/no-unescaped-entities */
import { Button, Navbar, TextInput } from "flowbite-react"
import { Link, NavLink, useLocation } from "react-router-dom"
import {AiOutlineSearch} from "react-icons/ai"
import {FaMoon} from "react-icons/fa"

function Header() {

    const path = useLocation().pathname;
    console.log(path)
    return (
        <Navbar className="border-b-2">
    
            <NavLink to="/" className="self-center whitespace-nowraLinktext-sm sm:text-xl font-semibold dark:text-white" >
                <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Luoparts'</span>
                Blog
            </NavLink>

            <form onClick={(e) => e.preventDefault() }>
                <TextInput type="text" placeholder="search" rightIcon={AiOutlineSearch} className="hidden lg:inline" />
            </form>

            <Button className="w-12 h-10 lg:hidden" color="grey" pill>
                    <AiOutlineSearch/>
            </Button>

            <div className="flex gap-2 md:order-2">
                <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
                    <FaMoon></FaMoon>
                </Button>
                <Link to="/sign-in">
                    <Button gradientDuoTone="purpleToBlue">
                        Sign In
                    </Button>
                </Link>
                <Navbar.Toggle className="sm:hidden" />
            </div>
            <Navbar.Collapse className="sm:block">
                <Navbar.Link as={"div"}>
                    <Link to="/">Home</Link>
                </Navbar.Link>
                <Navbar.Link as={"div"}>
                    <Link to="/about">About</Link>
                </Navbar.Link>
                <Navbar.Link as={"div"}>
                    <Link to="/projects">Projects</Link>
                </Navbar.Link>
            </Navbar.Collapse>

        </Navbar>
    )
}

export default Header
