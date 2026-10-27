'use client'

import Router from 'next/router';
import { useRouter } from 'next/navigation'
import Innerbaner from '@/src/components/Innerbaner';
import { faFacebook, faInstagram, faLinkedinIn, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelopeOpen, faMapLocation, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react'
import Profile from '../../../../public/img/profile.jpg'
import Image from 'next/image';
const steps = ['Personal Information', 'Education Details', 'Experience Details', 'Skills', 'Summary', 'Finalize'];

interface FormData {
    firstname: string
    lastname: string
    profilePic: string
    email: string
    phone: string
    fulladdress: string
    city: string
    country: string
    linkedinurl: string
    facebookurl: string
    twitterurl: string
    degreequalification: string
    degreeinstitutionname: string
    degreeinstitutionlocation: string
    degreepassingyears: string
    degreegradescgpa: string
    collageboardname: string
    collagename: string
    collagelocation: string
    collagecgpa: string
    collagepassingyears: string
    schoolboardname: string
    schoolname: string
    schoollocation: string
    schoolcgpa: string
    schoolpassingyears: string
    jobtitle: string
    organizationname: string
    organizationlocation: string
    datesemployment: string
    usetechnology: string
    technicalskill: object
    language: object
    software: object
    summary: string
    responsibilitiesachievements: string

}
interface Experience {
    jobtitle: string
    organizationname: string
    organizationlocation: string
    datesemployment: string
    usetechnology: string
    responsibilitiesachievements: string
}

const createExperience = (): Experience => ({
    jobtitle: "",
    organizationname: "",
    organizationlocation: "",
    datesemployment: "",
    usetechnology: "",
    responsibilitiesachievements: "",
})

const Page = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        profilePic: "",
        email: "",
        phone: "",
        fulladdress: "",
        city: "",
        country: "",
        linkedinurl: "",
        facebookurl: "",
        twitterurl: "",
        degreequalification: "",
        degreeinstitutionname: "",
        degreeinstitutionlocation: "",
        degreepassingyears: "",
        degreegradescgpa: "",
        collageboardname: "",
        collagename: "",
        collagelocation: "",
        collagecgpa: "",
        collagepassingyears: "",
        schoolboardname: "",
        schoolname: "",
        schoollocation: "",
        schoolcgpa: "",
        schoolpassingyears: "",
        experiences: [createExperience()],
        technicalskills: [""],
        languages: [""],
        softwareItems: [""],
        summary: "",
    })
    const [preview, setPreview] = useState<string | null>(null)
    const [fileName, setFileName] = useState<string>('')
    const [isUploading, setIsUploading] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [uploadError, setUploadError] = useState('')
    const [saveError, setSaveError] = useState('')
    const imageInputRef = useRef<HTMLInputElement>(null)
    const formRef = useRef<HTMLFormElement>(null)
    // handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleExperienceChange = (index: number, field: keyof Experience, value: string) => {
        setFormData((prev) => ({
            ...prev,
            experiences: prev.experiences.map((experience, currentIndex) =>
                currentIndex === index ? { ...experience, [field]: value } : experience
            ),
        }))
    }

    const handleAddExperience = () => {
        setFormData((prev) => ({
            ...prev,
            experiences: [...prev.experiences, createExperience()],
        }))
    }

    const handleRemoveExperience = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            experiences: prev.experiences.filter((_, currentIndex) => currentIndex !== index),
        }))
    }

    const handleSkillChange = (index: number, value: string) => {
        setFormData((prev) => ({
            ...prev,
            technicalskills: prev.technicalskills.map((skill, currentIndex) =>
                currentIndex === index ? value : skill
            ),
        }))
    }

    const handleAddSkill = () => {
        setFormData((prev) => ({
            ...prev,
            technicalskills: [...prev.technicalskills, ""],
        }))
    }

    const handleRemoveSkill = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            technicalskills: prev.technicalskills.filter((_, currentIndex) => currentIndex !== index),
        }))
    }

    const handleRepeatedFieldChange = (field: 'languages' | 'softwareItems', index: number, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: prev[field].map((item, currentIndex) =>
                currentIndex === index ? value : item
            ),
        }))
    }

    const handleAddRepeatedField = (field: 'languages' | 'softwareItems') => {
        setFormData((prev) => ({
            ...prev,
            [field]: [...prev[field], ""],
        }))
    }

    const handleRemoveRepeatedField = (field: 'languages' | 'softwareItems', index: number) => {
        setFormData((prev) => ({
            ...prev,
            [field]: prev[field].filter((_, currentIndex) => currentIndex !== index),
        }))
    }

    // handle image upload
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const uploadData = new FormData()
            uploadData.append('file', file)
            setIsUploading(true)
            setUploadError('')

            try {
                const response = await fetch('/api/upload/profile-image', {
                    method: 'POST',
                    body: uploadData,
                })
                const result: { profilePic?: string; error?: string } = await response.json()

                if (!response.ok || !result.profilePic) {
                    throw new Error(result.error || 'Image upload failed.')
                }

                const profilePic = result.profilePic
                setPreview((currentPreview) => {
                    if (currentPreview) URL.revokeObjectURL(currentPreview)
                    return URL.createObjectURL(file)
                })
                setFileName(file.name)
            setFormData((prev) => ({
                ...prev,
                    profilePic,
            }))
            } catch (error) {
                setUploadError(error instanceof Error ? error.message : 'Image upload failed.')
                e.target.value = ''
            } finally {
                setIsUploading(false)
            }
        }
    }

    const handleRemovePreview = () => {
        setPreview((currentPreview) => {
            if (currentPreview) URL.revokeObjectURL(currentPreview)
            return null
        })
        setFileName('')
        setUploadError('')
        setFormData((prev) => ({ ...prev, profilePic: '' }))
        if (imageInputRef.current) imageInputRef.current.value = ''
    }
    // handle form submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (isUploading || isSaving) return

        setIsSaving(true)
        setSaveError('')
        try {
            const sourceResume = new URLSearchParams(window.location.search).get('sourceResume')
            const res = await fetch('http://localhost:8000/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    ...formData.experiences[0],
                    technicalskill: formData.technicalskills.filter((skill) => skill.trim()).join(', '),
                    language: formData.languages.filter((language) => language.trim()).join(', '),
                    software: formData.softwareItems.filter((software) => software.trim()).join(', '),
                    ...(sourceResume ? { sourceResume } : {}),
                }),
            })

            const data = await res.json().catch(() => null) as { id?: string | number; message?: string } | null
            if (!res.ok) {
                throw new Error(data?.message || 'Failed to save resume data.')
            }

            if (data?.id === undefined || data.id === null) {
                throw new Error('The server did not return the saved resume ID.')
            }

            if (preview) URL.revokeObjectURL(preview)
            router.push(`/viewresume/${data.id}`)
        } catch (error) {
            console.error(error)
            setSaveError(error instanceof Error ? error.message : 'Error while saving resume data.')
        } finally {
            setIsSaving(false)
        }
    }
    const [step, setStep] = useState(1);

    const handleNext = () => {
        if (!formRef.current?.reportValidity()) return
        setSaveError('')
        setStep((prev) => Math.min(prev + 1, 5))
    };

    const handleBack = () => {
        setStep((prev) => prev - 1);
    };
    return (
        <>
            <form ref={formRef} onSubmit={handleSubmit}>
                <div className='container'>
                    {step === 1 && (
                        <div className='personal-info'>
                            <h4><span className='step'>01</span> Personal Information</h4>
                            <div className='row'>
                                <div className='col-md-3'>
                                    <div className="profilepic-sec">
                                        {preview ? (
                                            <Image
                                                src={preview}
                                                alt="Profile Preview"
                                                width={150}
                                                height={150}
                                                className=""
                                            />
                                        ) : (
                                            <Image src={Profile} alt='' />
                                        )}
                                    </div>

                                    <input ref={imageInputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} disabled={isUploading} />

                                    {fileName && <p>{fileName}</p>}
                                    {isUploading && <p role="status">Uploading image...</p>}
                                    {uploadError && <p role="alert">{uploadError}</p>}
                                    <button type="button" onClick={handleRemovePreview} className='btn' disabled={isUploading}>
                                        Remove Preview
                                    </button>
                                </div>
                                <div className='col-md-9'>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label htmlFor="">First name</label>
                                            <input type="text" name="firstname" placeholder='First name' value={formData.firstname} onChange={handleChange} className="form-control" required />
                                        </div>
                                        <div className='col-md-6'>
                                            <label htmlFor="">Last name</label>
                                            <input type="text" name="lastname" placeholder='Last name' value={formData.lastname} onChange={handleChange} className="form-control" required />
                                        </div>
                                        <div className='col-md-6'>
                                            <label htmlFor="">Email</label>
                                            <input type="email" name="email" placeholder='Email' value={formData.email} onChange={handleChange} className="form-control" required />
                                        </div>
                                        <div className='col-md-6'>
                                            <label htmlFor="">Phone</label>
                                            <input type="tel" name="phone" placeholder='Phone' value={formData.phone} onChange={handleChange} className="form-control" required />
                                        </div>
                                        <div className='col-md-6'>
                                            <label htmlFor="">Full Address</label>
                                            <input type="text" name="fulladdress" placeholder='Full Address' value={formData.fulladdress} onChange={handleChange} className="form-control" required />
                                        </div>
                                        <div className='col-md-6'>
                                            <label htmlFor="">City</label>
                                            <input type="text" name="city" placeholder='City' value={formData.city} onChange={handleChange} className="form-control" required />
                                        </div>
                                        <div className='col-md-6'>
                                            <label htmlFor="">Country</label>
                                            <input type="text" name="country" placeholder='Country' value={formData.country} onChange={handleChange} className="form-control" required />
                                        </div>
                                        <div className='col-md-6'>
                                            <label htmlFor="">LinkedIn URL</label>
                                            <input type="url" name="linkedinurl" placeholder='https://linkedin.com/in/...' value={formData.linkedinurl} onChange={handleChange} className="form-control" required />
                                        </div>
                                        <div className='col-md-6'>
                                            <label htmlFor="">Facebook URL</label>
                                            <input type="url" name="facebookurl" placeholder='https://facebook.com/...' value={formData.facebookurl} onChange={handleChange} className="form-control" required />
                                        </div>
                                        <div className='col-md-6'>
                                            <label htmlFor="">Twitter URL</label>
                                            <input type="url" name="twitterurl" placeholder='https://x.com/...' value={formData.twitterurl} onChange={handleChange} className="form-control" required />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleNext}
                                className="btn"
                            >
                                Next →
                            </button>
                        </div>
                    )}
                    {step === 2 && (
                        <div className='personal-info'>
                            <h4><span className='step'>02</span> Education Details</h4>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label htmlFor="">Degree or Qualification</label>
                                            <input type="text" name="degreequalification" placeholder='Degree or Qualification' value={formData.degreequalification} onChange={handleChange} className="form-control" required />
                                        </div>
                                        <div className='col-md-6'>
                                            <label htmlFor="">Degree Institution Name</label>
                                            <input type="text" name="degreeinstitutionname" placeholder=' Institution Name' value={formData.degreeinstitutionname} onChange={handleChange} className="form-control" required />
                                        </div>
                                        <div className='col-md-6'>
                                            <label htmlFor="">Degree Institution Location</label>
                                            <input type="text" name="degreeinstitutionlocation" placeholder='Institution Location' value={formData.degreeinstitutionlocation} onChange={handleChange} className="form-control" required />
                                        </div>
                                        <div className='col-md-6'>
                                            <label htmlFor=""> Degree Passing Years</label>
                                            <input type="text" name="degreepassingyears" placeholder='Degree Passing Years' value={formData.degreepassingyears} onChange={handleChange} className="form-control" required />
                                        </div>
                                        <div className='col-md-6'>
                                            <label htmlFor="">Degree Grades or CGPA</label>
                                            <input type="text" name="degreegradescgpa" placeholder='Grades or CGPA' value={formData.degreegradescgpa} onChange={handleChange} className="form-control" required />
                                        </div>
                                        <div className='col-md-6'>
                                            <label htmlFor="">Collage Board Name  </label>
                                            <input type="text" name="collageboardname" placeholder='Collage Board Name ' value={formData.collageboardname} onChange={handleChange} className="form-control" required />
                                        </div>
                                        <div className='col-md-6'>
                                            <label htmlFor="">Collage Name </label>
                                            <input type="text" name="collagename" placeholder='Collage Name' value={formData.collagename} onChange={handleChange} className="form-control" required />
                                        </div>
                                        <div className='col-md-6'>
                                            <label htmlFor="">Collage Location</label>
                                            <input type="text" name="collagelocation" placeholder='Collage Location' value={formData.collagelocation} onChange={handleChange} className="form-control" required />
                                        </div>
                                        <div className='col-md-6'>
                                            <label htmlFor="">Collage CGPA</label>
                                            <input type="text" name="collagecgpa" placeholder='Collage CGPA' value={formData.collagecgpa} onChange={handleChange} className="form-control" required />
                                        </div>
                                        <div className='col-md-6'>
                                            <label htmlFor="">Collage Passing Years</label>
                                            <input type="text" name="collagepassingyears" placeholder='Collage Passing Years' value={formData.collagepassingyears} onChange={handleChange} className="form-control" required />
                                        </div>
                                        <div className='col-md-6'>
                                            <label htmlFor="">School Board Name  </label>
                                            <input type="text" name="schoolboardname" placeholder='Schools Board Name ' value={formData.schoolboardname} onChange={handleChange} className="form-control" required />
                                        </div>
                                        <div className='col-md-6'>
                                            <label htmlFor="">School Name </label>
                                            <input type="text" name="schoolname" placeholder='Schools Name' value={formData.schoolname} onChange={handleChange} className="form-control" required />
                                        </div>
                                        <div className='col-md-6'>
                                            <label htmlFor="">School Location</label>
                                            <input type="text" name="schoollocation" placeholder='Schools Location' value={formData.schoollocation} onChange={handleChange} className="form-control" required />
                                        </div>
                                        <div className='col-md-6'>
                                            <label htmlFor="">School CGPA</label>
                                            <input type="text" name="schoolcgpa" placeholder='Schools CGPA' value={formData.schoolcgpa} onChange={handleChange} className="form-control" required />
                                        </div>
                                        <div className='col-md-6'>
                                            <label htmlFor="">School Passing Years</label>
                                            <input type="text" name="schoolpassingyears" placeholder='Schools Passing Years' value={formData.schoolpassingyears} onChange={handleChange} className="form-control" required />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={handleBack}
                                className="btn"
                            >
                                ← Back
                            </button>
                            <button
                                type="button"
                                onClick={handleNext}
                                className="btn"
                            >
                                Next →
                            </button>
                        </div>
                    )}

                    {step === 3 && (
                        <div className='personal-info'>
                            <h4><span className='step'>03</span> Working Experience </h4>
                            <div className='row'>
                                <div className='col-md-12'>
                                    {formData.experiences.map((experience, index) => (
                                        <div className='row' key={index}>
                                            <div className='col-12'>
                                                <h5>Organization {index + 1}</h5>
                                            </div>
                                            <div className='col-md-6'>
                                                <label>Job Title</label>
                                                <input type="text" placeholder='Job Title' value={experience.jobtitle} onChange={(e) => handleExperienceChange(index, 'jobtitle', e.target.value)} className="form-control" required />
                                            </div>
                                            <div className='col-md-6'>
                                                <label>Organization Name</label>
                                                <input type="text" placeholder='Organization Name' value={experience.organizationname} onChange={(e) => handleExperienceChange(index, 'organizationname', e.target.value)} className="form-control" required />
                                            </div>
                                            <div className='col-md-6'>
                                                <label>Organization Location</label>
                                                <input type="text" placeholder='Organization Location' value={experience.organizationlocation} onChange={(e) => handleExperienceChange(index, 'organizationlocation', e.target.value)} className="form-control" required />
                                            </div>
                                            <div className='col-md-6'>
                                                <label>Dates of Employment</label>
                                                <input type="text" placeholder='Dates of Employment' value={experience.datesemployment} onChange={(e) => handleExperienceChange(index, 'datesemployment', e.target.value)} className="form-control" required />
                                            </div>
                                            <div className='col-md-6'>
                                                <label>Responsibilities &amp; Achievements</label>
                                                <input type="text" placeholder='Responsibilities & Achievements' value={experience.responsibilitiesachievements} onChange={(e) => handleExperienceChange(index, 'responsibilitiesachievements', e.target.value)} className="form-control" required />
                                            </div>
                                            <div className='col-md-6'>
                                                <label>Use Technology</label>
                                                <input type="text" placeholder='Use Technology' value={experience.usetechnology} onChange={(e) => handleExperienceChange(index, 'usetechnology', e.target.value)} className="form-control" required />
                                            </div>
                                            {formData.experiences.length > 1 && (
                                                <div className='col-12'>
                                                    <button type="button" onClick={() => handleRemoveExperience(index)} className='btn btn-secondary'>Remove Organization</button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    <button type="button" onClick={handleAddExperience} className='btn btn-secondary'>Add Next Organization</button>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={handleBack}
                                className="btn"
                            >
                                ← Back
                            </button>
                            <button
                                type="button"
                                onClick={handleNext}
                                className="btn"
                            >
                                Next →
                            </button>
                        </div>
                    )}
                    {step === 4 && (
                        <div className=''>
                            <div className='personal-info'>
                                <h4><span className='step'>04</span> Skills  </h4>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <div className='row'>
                                            {formData.technicalskills.map((skill, index) => (
                                                <div className='col-md-6' key={index}>
                                                    <label>Technical Skill {index + 1}</label>
                                                    <input type="text" placeholder='HTML' value={skill} onChange={(e) => handleSkillChange(index, e.target.value)} className="form-control" required />
                                                    {formData.technicalskills.length > 1 && (
                                                        <button type="button" onClick={() => handleRemoveSkill(index)} className='btn btn-secondary'>Remove Skill</button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <button type="button" onClick={handleAddSkill} className='btn btn-secondary'>Add Next Skill</button>
                                    </div>
                                </div>
                            </div>
                            <div className='personal-info'>
                                <h4><span className='step'></span> language </h4>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <div className='row'>
                                            {formData.languages.map((language, index) => (
                                                <div className='col-md-6' key={index}>
                                                    <label>Language {index + 1}</label>
                                                    <input type="text" placeholder='English' value={language} onChange={(e) => handleRepeatedFieldChange('languages', index, e.target.value)} className="form-control" required />
                                                    {formData.languages.length > 1 && (
                                                        <button type="button" onClick={() => handleRemoveRepeatedField('languages', index)} className='btn btn-secondary'>Remove Language</button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <button type="button" onClick={() => handleAddRepeatedField('languages')} className='btn btn-secondary'>Add Next Language</button>
                                    </div>
                                </div>
                            </div>
                            <div className='personal-info'>
                                <h4><span className='step'></span> Software  </h4>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <div className='row'>
                                            {formData.softwareItems.map((software, index) => (
                                                <div className='col-md-6' key={index}>
                                                    <label>Software {index + 1}</label>
                                                    <input type="text" placeholder='Excel' value={software} onChange={(e) => handleRepeatedFieldChange('softwareItems', index, e.target.value)} className="form-control" required />
                                                    {formData.softwareItems.length > 1 && (
                                                        <button type="button" onClick={() => handleRemoveRepeatedField('softwareItems', index)} className='btn btn-secondary'>Remove Software</button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <button type="button" onClick={() => handleAddRepeatedField('softwareItems')} className='btn btn-secondary'>Add Next Software</button>
                                    </div>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={handleBack}
                                className="btn"
                            >
                                ← Back
                            </button>
                            <button
                                type="button"
                                onClick={handleNext}
                                className="btn"
                            >
                                Next →
                            </button>
                        </div>
                    )}
                    {step === 5 && (
                        <div>
                            <div className='personal-info'>
                                <h4><span className='step'>05</span> Summary  </h4>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <div className='row'>
                                            <div className='col-md-12'>
                                                <label htmlFor="">Summary </label>
                                                <input type='text' name='summary' placeholder='Summary' value={formData.summary} onChange={handleChange} className="form-control" required />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={handleBack}
                                className="btn"
                            >
                                ← Back
                            </button>
                            <button className='btn' type="submit" disabled={isUploading}>Submit</button>

                        </div>

                    )}
                    {/* {step === 6 && (
                        <div>
                            <Innerbaner />
                            <section className='space'>
                                <div className="container">
                                    <div className='row'>
                                        <form>
                                            {renderStepContent()}
                                            <div className='row mt-4'>
                                                <div className='col-md-6'>
                                                    {currentStep > 0 && (
                                                        <button type="button" onClick={handlePrevious} className='btn btn-secondary'> Previous </button>
                                                    )}
                                                </div>
                                                <div className='col-md-6 text-end'>
                                                    {currentStep < steps.length - 0 ? (
                                                        <button type="button" onClick={handleNext} className='btn btn-primary'> Next </button>
                                                    ) : (
                                                        <button type="submit" className='btn btn-success'> Submit</button>
                                                    )}
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </section>

                        </div>
                    )} */}
                </div></form>
        </>
    )
};
export default Page;
