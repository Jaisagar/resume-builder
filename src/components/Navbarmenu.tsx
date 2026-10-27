'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Logo from'../../public/img/logo.png'
import { navbarLinks } from './NavbarLinks';


const Navbar = () => {
  return (
    <>
      <header>
        <div className='container'>
           <nav>
            <div className='logo'>
          <Link href={{}}> 
          <Image src={Logo  } alt=""/>
          </Link>
        </div>
         <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', margin: 0 }}>
              {navbarLinks.map(({ id, label, href, external }) => (
                <li key={id}>
                  {external ? (
                    <span>{label}</span>
                  ) : (
                    <Link href={href}>
                      <span>{label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <Link className='btn' href={`/myaccounts`}>My Account </Link>
           </nav>
        </div>
      </header>
    </>
  );
};


export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
