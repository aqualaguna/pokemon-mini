import { useState } from "react"
import Sidebar from "react-sidebar"
import SidebarContent from "./SidebarContent";
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Navigation({ main }) {
    const [showSidebar, updateShowSidebar] = useState(false);
    const router = useRouter()
    return (
        <>
            <Sidebar

                sidebar={<SidebarContent />}
                open={showSidebar}
                onSetOpen={updateShowSidebar}
                styles={{ sidebar: { background: "white" } }}
            >
                <nav className="bg-pokeball w-full sticky top-0 z-50" >
                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between h-16">
                            <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white sm:hidden p-3 m-2" aria-expanded="false" onClick={() => updateShowSidebar(true)}>
                                <span className="sr-only">Open main menu</span>
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>

                                <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex-shrink-0 flex items-center">
                                    <img className="block lg:hidden h-8 w-auto" src="https://pokedex.stevenhansel.com/assets/images/pokeball.png" alt="Pokemon Mini" />
                                    <img className="hidden lg:block h-8 w-auto" src="https://pokedex.stevenhansel.com/assets/images/pokeball.png" alt="Pokemon Mini" />
                                </div>
                                <div className="hidden sm:block sm:ml-6">
                                    <div className="flex space-x-4">

                                        <Link href="/">
                                            <a className="text-white px-3 py-2 rounded-md text-lg hover:underline font-medium subpixel-antialiased" style={{ background: router.pathname == '/' ? "#991b1b" : null }}>List Pokemon</a>
                                        </Link>
                                        <Link href="/my-pokemon">
                                            <a
                                                className="text-white px-3 py-2 rounded-md text-lg hover:underline font-medium subpixel-antialiased"
                                                style={{ background: router.pathname == '/my-pokemon' ? "#991b1b" : null }}>
                                                My Pokemon
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </nav>
                {main}
            </Sidebar>
        </>
    )
}