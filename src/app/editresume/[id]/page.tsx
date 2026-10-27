'use client'

import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

interface Experience {
    jobtitle: string
    organizationname: string
    organizationlocation: string
    datesemployment: string
    usetechnology: string
    responsibilitiesachievements: string
}

interface ResumeFormData {
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
    summary: string
    experiences: Experience[]
    technicalskills: string[]
    languages: string[]
    softwareItems: string[]
    sourceResume: string
}

type TextField = Exclude<keyof ResumeFormData, 'experiences' | 'technicalskills' | 'languages' | 'softwareItems' | 'sourceResume'>
type RepeatedField = 'technicalskills' | 'languages' | 'softwareItems'

const createExperience = (): Experience => ({
    jobtitle: '',
    organizationname: '',
    organizationlocation: '',
    datesemployment: '',
    usetechnology: '',
    responsibilitiesachievements: '',
})

const createEmptyResume = (): ResumeFormData => ({
    firstname: '',
    lastname: '',
    profilePic: '',
    email: '',
    phone: '',
    fulladdress: '',
    city: '',
    country: '',
    linkedinurl: '',
    facebookurl: '',
    twitterurl: '',
    degreequalification: '',
    degreeinstitutionname: '',
    degreeinstitutionlocation: '',
    degreepassingyears: '',
    degreegradescgpa: '',
    collageboardname: '',
    collagename: '',
    collagelocation: '',
    collagecgpa: '',
    collagepassingyears: '',
    schoolboardname: '',
    schoolname: '',
    schoollocation: '',
    schoolcgpa: '',
    schoolpassingyears: '',
    summary: '',
    experiences: [createExperience()],
    technicalskills: [''],
    languages: [''],
    softwareItems: [''],
    sourceResume: '',
})

const text = (value: unknown) => typeof value === 'string' ? value : ''

const toList = (value: unknown, legacyValue: unknown) => {
    if (Array.isArray(value) && value.length) {
        return value.map(text)
    }
    const legacyItems = text(legacyValue).split(',').map((item) => item.trim()).filter(Boolean)
    return legacyItems.length ? legacyItems : ['']
}

const normalizeResume = (record: Record<string, unknown>): ResumeFormData => {
    const empty = createEmptyResume()
    const rawExperiences = Array.isArray(record.experiences) ? record.experiences : []
    const experiences = rawExperiences
        .filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === 'object')
        .map((item) => ({
            jobtitle: text(item.jobtitle),
            organizationname: text(item.organizationname),
            organizationlocation: text(item.organizationlocation),
            datesemployment: text(item.datesemployment),
            usetechnology: text(item.usetechnology),
            responsibilitiesachievements: text(item.responsibilitiesachievements),
        }))

    return {
        ...empty,
        firstname: text(record.firstname),
        lastname: text(record.lastname),
        profilePic: text(record.profilePic),
        email: text(record.email),
        phone: text(record.phone),
        fulladdress: text(record.fulladdress),
        city: text(record.city),
        country: text(record.country),
        linkedinurl: text(record.linkedinurl),
        facebookurl: text(record.facebookurl),
        twitterurl: text(record.twitterurl),
        degreequalification: text(record.degreequalification),
        degreeinstitutionname: text(record.degreeinstitutionname),
        degreeinstitutionlocation: text(record.degreeinstitutionlocation),
        degreepassingyears: text(record.degreepassingyears),
        degreegradescgpa: text(record.degreegradescgpa),
        collageboardname: text(record.collageboardname),
        collagename: text(record.collagename),
        collagelocation: text(record.collagelocation),
        collagecgpa: text(record.collagecgpa),
        collagepassingyears: text(record.collagepassingyears),
        schoolboardname: text(record.schoolboardname),
        schoolname: text(record.schoolname),
        schoollocation: text(record.schoollocation),
        schoolcgpa: text(record.schoolcgpa),
        schoolpassingyears: text(record.schoolpassingyears),
        summary: text(record.summary),
        experiences: experiences.length ? experiences : [{
            jobtitle: text(record.jobtitle),
            organizationname: text(record.organizationname),
            organizationlocation: text(record.organizationlocation),
            datesemployment: text(record.datesemployment),
            usetechnology: text(record.usetechnology),
            responsibilitiesachievements: text(record.responsibilitiesachievements),
        }],
        technicalskills: toList(record.technicalskills, record.technicalskill),
        languages: toList(record.languages, record.language),
        softwareItems: toList(record.softwareItems, record.software),
        sourceResume: text(record.sourceResume),
    }
}

const sections: { title: string; fields: { name: TextField; label: string; type?: string }[] }[] = [
    {
        title: 'Personal Information',
        fields: [
            { name: 'firstname', label: 'First name' },
            { name: 'lastname', label: 'Last name' },
            { name: 'email', label: 'Email', type: 'email' },
            { name: 'phone', label: 'Phone', type: 'tel' },
            { name: 'fulladdress', label: 'Full address' },
            { name: 'city', label: 'City' },
            { name: 'country', label: 'Country' },
            { name: 'linkedinurl', label: 'LinkedIn URL', type: 'url' },
            { name: 'facebookurl', label: 'Facebook URL', type: 'url' },
            { name: 'twitterurl', label: 'X or Twitter URL', type: 'url' },
        ],
    },
    {
        title: 'Education',
        fields: [
            { name: 'degreequalification', label: 'Degree or qualification' },
            { name: 'degreeinstitutionname', label: 'Degree institution' },
            { name: 'degreeinstitutionlocation', label: 'Degree institution location' },
            { name: 'degreepassingyears', label: 'Degree passing years' },
            { name: 'degreegradescgpa', label: 'Degree grades or CGPA' },
            { name: 'collageboardname', label: 'College board name' },
            { name: 'collagename', label: 'College name' },
            { name: 'collagelocation', label: 'College location' },
            { name: 'collagecgpa', label: 'College CGPA' },
            { name: 'collagepassingyears', label: 'College passing years' },
            { name: 'schoolboardname', label: 'School board name' },
            { name: 'schoolname', label: 'School name' },
            { name: 'schoollocation', label: 'School location' },
            { name: 'schoolcgpa', label: 'School CGPA' },
            { name: 'schoolpassingyears', label: 'School passing years' },
        ],
    },
]

const experienceFields: { name: keyof Experience; label: string }[] = [
    { name: 'jobtitle', label: 'Job title' },
    { name: 'organizationname', label: 'Organization name' },
    { name: 'organizationlocation', label: 'Organization location' },
    { name: 'datesemployment', label: 'Dates of employment' },
    { name: 'usetechnology', label: 'Technology used' },
    { name: 'responsibilitiesachievements', label: 'Responsibilities and achievements' },
]

const repeatableFields: { name: RepeatedField; label: string; itemLabel: string; placeholder: string }[] = [
    { name: 'technicalskills', label: 'Technical Skills', itemLabel: 'Skill', placeholder: 'e.g. TypeScript' },
    { name: 'languages', label: 'Languages', itemLabel: 'Language', placeholder: 'e.g. English' },
    { name: 'softwareItems', label: 'Software', itemLabel: 'Software', placeholder: 'e.g. Excel' },
]

export default function EditResumePage() {
    const { id } = useParams<{ id: string }>()
    const router = useRouter()
    const [formData, setFormData] = useState(createEmptyResume)
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [isUploadingImage, setIsUploadingImage] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        const controller = new AbortController()

        const loadResume = async () => {
            try {
                const response = await fetch(`http://localhost:8000/users/${id}`, { signal: controller.signal })
                if (!response.ok) throw new Error('Could not load this resume.')
                const record = await response.json() as Record<string, unknown>
                setFormData(normalizeResume(record))
            } catch (loadError) {
                if (!controller.signal.aborted) {
                    setError(loadError instanceof Error ? loadError.message : 'Could not load this resume.')
                }
            } finally {
                if (!controller.signal.aborted) setIsLoading(false)
            }
        }

        void loadResume()
        return () => controller.abort()
    }, [id])

    const handleTextChange = (name: TextField, value: string) => {
        setFormData((previous) => ({ ...previous, [name]: value }))
        setSuccess('')
    }

    const handleExperienceChange = (index: number, name: keyof Experience, value: string) => {
        setFormData((previous) => ({
            ...previous,
            experiences: previous.experiences.map((experience, currentIndex) => (
                currentIndex === index ? { ...experience, [name]: value } : experience
            )),
        }))
        setSuccess('')
    }

    const handleRepeatedChange = (name: RepeatedField, index: number, value: string) => {
        setFormData((previous) => ({
            ...previous,
            [name]: previous[name].map((item, currentIndex) => currentIndex === index ? value : item),
        }))
        setSuccess('')
    }

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        const uploadData = new FormData()
        uploadData.append('file', file)
        setIsUploadingImage(true)
        setError('')

        try {
            const response = await fetch('/api/upload/profile-image', { method: 'POST', body: uploadData })
            const result = await response.json() as { profilePic?: string; error?: string }
            if (!response.ok || !result.profilePic) throw new Error(result.error || 'Profile image upload failed.')
            setFormData((previous) => ({ ...previous, profilePic: result.profilePic! }))
        } catch (uploadError) {
            setError(uploadError instanceof Error ? uploadError.message : 'Profile image upload failed.')
            event.target.value = ''
        } finally {
            setIsUploadingImage(false)
        }
    }

    const handleAddExperience = () => setFormData((previous) => ({
        ...previous,
        experiences: [...previous.experiences, createExperience()],
    }))

    const handleRemoveExperience = (index: number) => setFormData((previous) => ({
        ...previous,
        experiences: previous.experiences.filter((_, currentIndex) => currentIndex !== index),
    }))

    const handleAddRepeated = (name: RepeatedField) => setFormData((previous) => ({
        ...previous,
        [name]: [...previous[name], ''],
    }))

    const handleRemoveRepeated = (name: RepeatedField, index: number) => setFormData((previous) => ({
        ...previous,
        [name]: previous[name].filter((_, currentIndex) => currentIndex !== index),
    }))

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (isSaving || isUploadingImage) return

        setIsSaving(true)
        setError('')
        setSuccess('')

        try {
            const firstExperience = formData.experiences[0] || createExperience()
            const response = await fetch(`http://localhost:8000/users/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    ...firstExperience,
                    technicalskill: formData.technicalskills.filter((item) => item.trim()).join(', '),
                    language: formData.languages.filter((item) => item.trim()).join(', '),
                    software: formData.softwareItems.filter((item) => item.trim()).join(', '),
                }),
            })

            const result = await response.json().catch(() => null) as { message?: string } | null
            if (!response.ok) throw new Error(result?.message || 'Could not save changes.')
            setSuccess('Resume changes saved.')
        } catch (saveError) {
            setError(saveError instanceof Error ? saveError.message : 'Could not save changes.')
        } finally {
            setIsSaving(false)
        }
    }

    if (isLoading) return <main className="container py-5"><p role="status">Loading resume...</p></main>
    if (error && !formData.email) {
        return (
            <main className="container py-5">
                <p role="alert">{error}</p>
                <button type="button" className="btn btn-secondary" onClick={() => router.back()}>Go back</button>
            </main>
        )
    }

    return (
        <section className="space">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
                    <div>
                        <h1>Edit Resume</h1>
                        <p className="mb-0">Update your information and save the changes.</p>
                    </div>
                    <button type="button" className="btn btn-secondary" onClick={() => router.push(`/viewresume/${id}`)}>
                        Cancel
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <section className="personal-info mb-4">
                        <h2>Profile Image</h2>
                        <div className="d-flex align-items-center gap-3 flex-wrap">
                            <Image
                                src={formData.profilePic.startsWith('/') ? formData.profilePic : '/img/profile.jpg'}
                                alt="Resume profile"
                                width={120}
                                height={120}
                                className="rounded"
                            />
                            <div>
                                <label htmlFor="profile-image">Upload a new profile image</label>
                                <input id="profile-image" type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageChange} disabled={isUploadingImage} />
                                {isUploadingImage && <p role="status">Uploading image...</p>}
                            </div>
                        </div>
                    </section>

                    {sections.map((section) => (
                        <section className="personal-info mb-4" key={section.title}>
                            <h2>{section.title}</h2>
                            <div className="row">
                                {section.fields.map((field) => (
                                    <div className="col-md-6 mb-3" key={field.name}>
                                        <label htmlFor={field.name}>{field.label}</label>
                                        <input
                                            id={field.name}
                                            name={field.name}
                                            type={field.type || 'text'}
                                            value={formData[field.name]}
                                            onChange={(event) => handleTextChange(field.name, event.target.value)}
                                            className="form-control"
                                            required={field.name === 'firstname' || field.name === 'lastname' || field.name === 'email'}
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}

                    <section className="personal-info mb-4">
                        <h2>Work Experience</h2>
                        {formData.experiences.map((experience, index) => (
                            <div className="row mb-3" key={index}>
                                <div className="col-12"><h3>Organization {index + 1}</h3></div>
                                {experienceFields.map((field) => (
                                    <div className="col-md-6 mb-3" key={field.name}>
                                        <label htmlFor={`experience-${index}-${field.name}`}>{field.label}</label>
                                        <input
                                            id={`experience-${index}-${field.name}`}
                                            value={experience[field.name]}
                                            onChange={(event) => handleExperienceChange(index, field.name, event.target.value)}
                                            className="form-control"
                                        />
                                    </div>
                                ))}
                                {formData.experiences.length > 1 && (
                                    <div className="col-12">
                                        <button type="button" className="btn btn-secondary" onClick={() => handleRemoveExperience(index)}>
                                            Remove Organization
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                        <button type="button" className="btn btn-secondary" onClick={handleAddExperience}>Add Organization</button>
                    </section>

                    <section className="personal-info mb-4">
                        <h2>Summary</h2>
                        <label htmlFor="summary">Professional summary</label>
                        <textarea
                            id="summary"
                            value={formData.summary}
                            onChange={(event) => handleTextChange('summary', event.target.value)}
                            className="form-control"
                            rows={5}
                        />
                    </section>

                    {repeatableFields.map((field) => (
                        <section className="personal-info mb-4" key={field.name}>
                            <h2>{field.label}</h2>
                            <div className="row">
                                {formData[field.name].map((item, index) => (
                                    <div className="col-md-6 mb-3" key={index}>
                                        <label htmlFor={`${field.name}-${index}`}>{field.label} {index + 1}</label>
                                        <input
                                            id={`${field.name}-${index}`}
                                            value={item}
                                            placeholder={field.placeholder}
                                            onChange={(event) => handleRepeatedChange(field.name, index, event.target.value)}
                                            className="form-control"
                                        />
                                        {formData[field.name].length > 1 && (
                                            <button type="button" className="btn btn-secondary" onClick={() => handleRemoveRepeated(field.name, index)}>
                                                Remove {field.itemLabel}
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <button type="button" className="btn btn-secondary" onClick={() => handleAddRepeated(field.name)}>
                                Add {field.itemLabel}
                            </button>
                        </section>
                    ))}

                    {error && <p role="alert">{error}</p>}
                    {success && <p role="status">{success}</p>}
                    <div className="d-flex gap-2">
                        <button type="submit" className="btn" disabled={isSaving || isUploadingImage}>
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={() => router.push(`/viewresume/${id}`)}>
                            View Resume
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}