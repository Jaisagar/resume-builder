import Image from 'next/image';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faYoutube, } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faEnvelopeOpen, faLocation } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../public/img/logo.png';
import Link from 'next/link';
const Footer = () => {
    return (
        <>
            <section className='footer'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-3'>
                            <Image src={Logo} alt="" />
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae debitis sed similique numquam, ratione quibusdam accusamus dolore quam ipsa? Repellat exercitationem reprehenderit sed, vero eligendi neque consectetur debitis vitae? Quaerat!</p>
                        </div>
                        <div className='col-md-3'>
                            <h5>Quick Links</h5>
                            <ul>
                                <li><Link href={`/`}>Home </Link> </li>
                                <li><Link href={`/about`}>About</Link> </li>
                                <li><Link href={`/resume`}>Resume</Link> </li>
                                <li><Link href={`/blog`}>Blog</Link> </li>
                                <li><Link href={`/portfolio`}>Portfolio</Link> </li>
                                <li><Link href={`/dashboard`}>Dashboard</Link> </li>
                                <li><Link href={`/contact`}>Contact </Link> </li>
                            </ul>
                        </div>
                        <div className='col-md-3'>
                            <h5>Quick Links</h5>
                            <ul>
                                <li><Link href={`/`}>Home </Link> </li>
                                <li><Link href={`/about`}>About</Link> </li>
                                <li><Link href={`/resume`}>Resume</Link> </li>
                                <li><Link href={`/blog`}>Blog</Link> </li>
                                <li><Link href={`/portfolio`}>Portfolio</Link> </li>
                                <li><Link href={`/dashboard`}>Dashboard</Link> </li>
                                <li><Link href={`/contact`}>Contact </Link> </li>
                            </ul>
                        </div>
                        <div className='col-md-3'>
                            <h5>Contact Info</h5>
                            <ul>
                                <li><Link href={`/`}><FontAwesomeIcon icon={faPhone} /> + 9000000000 </Link> </li>
                                <li><Link href={`/`}><FontAwesomeIcon icon={faEnvelopeOpen} /> find@starfinder.com</Link> </li>
                                <li><Link href={`/`}><FontAwesomeIcon icon={faLocation} /> Address, Country, City, State </Link> </li>
                            </ul>
                            <ul className='socal-media'>
                                <li><Link href={`/`}><FontAwesomeIcon icon={faFacebook} /> </Link> </li>
                                <li><Link href={`/`}><FontAwesomeIcon icon={faTwitter} /> </Link> </li>
                                <li><Link href={`/`}><FontAwesomeIcon icon={faLinkedin} /> </Link> </li>
                                <li><Link href={`/`}><FontAwesomeIcon icon={faYoutube} /> </Link> </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Footer