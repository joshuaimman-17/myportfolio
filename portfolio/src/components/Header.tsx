"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { path: '/', label: 'HOME' },
        { path: '/about', label: 'ABOUT' },
        { path: '/projects', label: 'PROJECTS' },
        { path: '/skills', label: 'SKILLS' },
        { path: '/blog', label: 'BLOG' },
    ];

    return (
        <header className={`fixed-top w-100 transition-all ${scrolled ? 'pt-2' : 'pt-4'}`} style={{ zIndex: 1030, transition: 'padding 0.3s ease' }}>
            <div className="container">
                <nav className="navbar navbar-expand-lg glass-nav rounded-4 px-3 py-2">
                    <div className="container-fluid">
                        <Link href="/" className="navbar-brand navbar-brand-custom fw-bold">
                            Joshua<span>.Dev</span>
                        </Link>

                        <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#portfolioNavbar" aria-controls="portfolioNavbar" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse justify-content-end" id="portfolioNavbar" style={{ visibility: 'visible' }}>
                            <ul className="navbar-nav align-items-center gap-2 mt-3 mt-lg-0">
                                {navItems.map((item) => (
                                    <li className="nav-item" key={item.path}>
                                        <Link
                                            href={item.path}
                                            className={`nav-link nav-link-custom px-3 py-2 ${pathname === item.path ? 'active' : ''}`}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                                <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                                    <Link href="/contact" className="btn btn-primary rounded-pill px-4 py-2 fw-semibold shadow-sm">
                                        CONTACT
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
