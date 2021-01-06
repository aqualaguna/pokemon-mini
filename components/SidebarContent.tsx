import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function SidebarContent() {
    const router = useRouter();
    return (
        <div style={{ marginTop: '70px', width: '250px' }}>
            <ul className="space-y-2 text-sm">
                <li>
                    <Link href="/">
                        <a className={`flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:shadow-outline ${router.pathname == '/' ? 'bg-gray-200' : ''}`}>
                            <span className="text-gray-600">
                                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </span>
                            <span>List Pokemon</span>
                        </a>
                    </Link>
                </li>

                <li>
                    <Link href="/my-pokemon">
                        <a className={`flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:shadow-outline ${router.pathname == '/my-pokemon' ? 'bg-gray-200' : ''}`}>
                            <span className="text-gray-600">
                                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </span>
                            <span>My Pokemon</span>
                        </a>
                    </Link>
                </li>

            </ul>
        </div>
    )
}