import Image from 'next/image'
import Profile from '../../../../public/img/profile.jpg'
import React from 'react'
import InnerBanner from '@/src/components/Innerbaner'

const page = () => {
    return (
        <>
            <InnerBanner />
            <div className='container'>
                <div className="row">
                    <div className='col-lg-9'>
                        <div className='row'>
                            <div className='col-md-3'>
                                <div className="user-main">
                                    <span>01</span>
                                    <h4> Total User</h4>
                                    <p>Empowering smarter hiring decisions through data.</p>
                                </div>
                            </div>
                            <div className='col-md-3'>
                                <div className="user-main">
                                    <span>01</span>
                                    <h4> Application Sent</h4>
                                    <p>Monitor your hiring journey with real-time insights and analytics</p>
                                </div>
                            </div>
                            <div className='col-md-3'>
                                <div className="user-main">
                                    <span>01</span>
                                    <h4> New Resume</h4>
                                    <p>Connecting talent with opportunity</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-3'>
                        <div className="profile-user-main">
                            <Image src={Profile} alt='' />
                            <h3>User Name</h3>
                            <h5>UX Designer</h5>

                            <div className="job-proccess-bar">
                                <ul>
                                    <li>
                                        <span>86%</span>
                                        <h6>Research</h6>
                                    </li>
                                    <li>
                                        <span>60%</span>
                                        <h6>Figma</h6>
                                    </li>
                                    <li>
                                        <span>30%</span>
                                        <h6>Photoshop</h6>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page
