'use client'

import React, { useEffect, useState } from 'react';
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import { useRef } from "react"
import { useParams } from "next/navigation"
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLocation, faPhone, faVoicemail } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons'

interface Resume {
    degreeinstitutionname: string
    degreepassingyears: string
    degreequalification: string
    degreeinstitutionlocation: string
    degreegradescgpa: string
    collagename: string
    collageboardname: string
    collagelocation: string
    collagecgpa: string
    schoolname: string
    schoolpassingyears: string
    schoolboardname: string
    schoollocation: string
    schoolcgpa: string
    summary: string
    organizationname: string
    datesemployment: string
    jobtitle: string
    usetechnology: string
    software: string
    language: string
    responsibilitiesachievements: string
    technicalskill: string
    technicalskills?: string[]
    languages?: string[]
    softwareItems?: string[]
    twitterurl: string
    facebookurl: string
    linkedinurl: string
    fulladdress: string
    phone: string
    lastname: string
    firstname: string
    id: number
    name: string
    email: string
    profilePic: string
    sourceResume?: string
    experiences?: {
        jobtitle: string
        organizationname: string
        organizationlocation: string
        datesemployment: string
        usetechnology: string
        responsibilitiesachievements: string
    }[]
}

const Page = () => {
    const params = useParams()
    const id = params.id
    const [resume, setResume] = useState<Resume | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [loadError, setLoadError] = useState('')
    const resumeRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let isCurrent = true
        setIsLoading(true)
        setLoadError('')

        fetch(`http://localhost:8000/users/${id}`)
            .then(async (response) => {
                if (!response.ok) throw new Error('Could not load the saved resume.')
                return response.json() as Promise<Resume>
            })
            .then((data) => {
                if (isCurrent) setResume(data)
            })
            .catch((error: unknown) => {
                if (isCurrent) {
                    setLoadError(error instanceof Error ? error.message : 'Could not load the saved resume.')
                }
            })
            .finally(() => {
                if (isCurrent) setIsLoading(false)
            })

        return () => {
            isCurrent = false
        }
    }, [id])

    if (isLoading) return <p role="status">Loading resume...</p>
    if (loadError || !resume) return <p role="alert">{loadError || 'Resume not found.'}</p>
    const downloadPDF = async () => {
        const element = resumeRef.current
        if (!element) return

        const canvas = await html2canvas(element, {
            scale: 2
        })

        const imgData = canvas.toDataURL("image/png")

        const pdf = new jsPDF("p", "mm", "a4")

        const imgWidth = 210
        const pageHeight = 297
        const imgHeight = (canvas.height * imgWidth) / canvas.width

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)

        pdf.save("resume.pdf")
    }
    return (
        <>
            <div className="container mt-4">
                <div className='row d-flex justify-content-center align-items-center text-center'>
                    <div className='col-md-6'>
                        <h2>Resume</h2>
                    </div>
                    <div className='col-md-6'>
                        <div className=''>
                            <Link className='btn btn-secondary me-2' href={`/editresume/${resume.id}`}>
                                Edit Resume
                            </Link>
                            <button className='btn' onClick={downloadPDF}>
                                Download PDF
                            </button>
                        </div>
                    </div>
                </div>

                <div className='resumefarmet-main' ref={resumeRef}>
                    <div className='resumefarmet-left'>
                        <div className='user-profile-pic'>
                            <h5>User Profile </h5>
                            <Image src={resume.profilePic?.startsWith('/') ? resume.profilePic : '/img/profile.jpg'} alt={resume.firstname} width={150} height={150} className="rounded mb-3" />
                            <h6> {resume.firstname}  {resume.lastname}</h6>
                        </div>
                        <div className='user-contact'>
                            <h5>Contact Information</h5>
                            <p><FontAwesomeIcon icon={faEnvelope} /> {resume.email} </p>
                            <p><FontAwesomeIcon icon={faPhone} /> {resume.phone} </p>
                            <p><FontAwesomeIcon icon={faLocation} /> {resume.fulladdress} </p>
                            <p><FontAwesomeIcon icon={faLinkedinIn} /> {resume.linkedinurl} </p>
                            <p><FontAwesomeIcon icon={faFacebook} /> {resume.facebookurl} </p>
                            <p><FontAwesomeIcon icon={faTwitter} /> {resume.twitterurl} </p>
                        </div>
                        {resume.sourceResume?.startsWith('/uploads/') && (
                            <div className='user-contact'>
                                <h5>Uploaded Resume</h5>
                                <a href={resume.sourceResume} target="_blank" rel="noreferrer">Open original resume</a>
                            </div>
                        )}

                        <div className='user-skills'>
                            <h5>Skills</h5>
                            <ul>
                                {resume.technicalskills?.length ? resume.technicalskills.map((skill, index) => (
                                    <li key={`${skill}-${index}`}>{skill}</li>
                                )) : <li>{resume.technicalskill}</li>}
                            </ul>
                        </div>
                        <div className='user-skills'>
                            <h5>Software</h5>
                            <ul>
                                {resume.softwareItems?.length ? resume.softwareItems.map((software, index) => (
                                    <li key={`${software}-${index}`}>{software}</li>
                                )) : <li>{resume.software}</li>}
                            </ul>
                        </div>
                        <div className='user-skills'>
                            <h5>Language</h5>
                            <ul>
                                {resume.languages?.length ? resume.languages.map((language, index) => (
                                    <li key={`${language}-${index}`}>{language}</li>
                                )) : <li>{resume.language}</li>}
                            </ul>
                        </div>
                        <div className='user-skills'>
                            <h5>Responsibilities  & Achievements</h5>
                            <ul>
                                <li>{resume.responsibilitiesachievements}</li>
                            </ul>
                        </div>
                    </div>
                    <div className='resumefarmet-right'>
                        <div className='user-summary'>
                            <h5>Profiles</h5>
                            <p>{resume.summary}</p>
                        </div>
                        <div className='user-work-expriance'>
                            <h5>Work Expriance</h5>
                            {resume.experiences?.length ? resume.experiences.map((experience, index) => (
                                <div className='user-work-wapper' key={`${experience.organizationname}-${index}`}>
                                    <div className='user-work-left'>
                                        <h6>{experience.organizationname}</h6>
                                        <p>{experience.organizationlocation}</p>
                                        <p>{experience.datesemployment}</p>
                                    </div>
                                    <div className='user-work-right'>
                                        <h6>{experience.jobtitle}</h6>
                                        <p>{experience.usetechnology}</p>
                                        <p>{experience.responsibilitiesachievements}</p>
                                    </div>
                                </div>
                            )) : (
                                <div className='user-work-wapper'>
                                    <div className='user-work-left'>
                                        <h6>{resume.organizationname}</h6>
                                        <p>{resume.datesemployment}</p>
                                    </div>
                                    <div className='user-work-right'>
                                        <h6>{resume.jobtitle}</h6>
                                        <p>{resume.usetechnology}</p>
                                        <p>{resume.responsibilitiesachievements}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='user-education'>
                            <h5>Education</h5>
                            <div className='user-work-wapper'>
                                <div className='user-work-left'>
                                    <h6>{resume.degreeinstitutionname}</h6>
                                    <p>{resume.degreepassingyears}</p>
                                </div>
                                <div className='user-work-right'>
                                    <h6>{resume.degreequalification}</h6>
                                    <p>{resume.degreeinstitutionlocation}</p>
                                    <p>{resume.degreegradescgpa}</p>
                                </div>
                            </div>
                            <div className='user-work-wapper'>
                                <div className='user-work-left'>
                                    <h6>{resume.collagename}</h6>
                                    <p>{resume.schoolpassingyears}</p>
                                </div>
                                <div className='user-work-right'>
                                    <h6>{resume.collageboardname}</h6>
                                    <p>{resume.collagelocation}</p>
                                    <p>{resume.collagecgpa}</p>
                                </div>
                            </div>
                            <div className='user-work-wapper'>
                                <div className='user-work-left'>
                                    <h6>{resume.schoolname}</h6>
                                    <p>{resume.schoolpassingyears}</p>
                                </div>
                                <div className='user-work-right'>
                                    <h6>{resume.schoolboardname}</h6>
                                    <p>{resume.schoollocation}</p>
                                    <p>{resume.schoolcgpa}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Page
