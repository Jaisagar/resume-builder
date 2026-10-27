'use client'

import Innerbaner from '@/src/components/Innerbaner'
import { faEdit, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'

type ResumeMode = 'upload' | 'scratch'

const Page: React.FC = () => {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [mode, setMode] = useState<ResumeMode | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (!selectedFile) return

    const allowedExtensions = /\.(pdf|doc|docx)$/i
    if (!allowedExtensions.test(selectedFile.name)) {
      setFile(null)
      setError('Choose a PDF, DOC, or DOCX resume.')
      event.target.value = ''
      return
    }

    if (selectedFile.size === 0 || selectedFile.size > 10 * 1024 * 1024) {
      setFile(null)
      setError('Resume file must be smaller than 10 MB.')
      event.target.value = ''
      return
    }

    setFile(selectedFile)
    setError('')
  }

  const handleContinue = async () => {
    if (mode === 'scratch') {
      router.push('/resume/formsection')
      return
    }

    if (mode !== 'upload' || !file) {
      setError('Choose a resume file before continuing.')
      return
    }

    const uploadData = new FormData()
    uploadData.append('file', file)
    setIsUploading(true)
    setError('')

    try {
      const response = await fetch('/api/upload/resume-file', {
        method: 'POST',
        body: uploadData,
      })
      const result: { resumeFile?: string; error?: string } = await response.json()

      if (!response.ok || !result.resumeFile) {
        throw new Error(result.error || 'Resume upload failed.')
      }

      router.push(`/resume/formsection?sourceResume=${encodeURIComponent(result.resumeFile)}`)
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Resume upload failed.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <>
      <Innerbaner />
      <section className='space select-resume-page'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h2>How would you like to build your resume?</h2>
              <ul className='selectresume43'>
                <li className={mode === 'upload' ? 'selected' : ''}>
                  <button
                    type="button"
                    className={`resume-mode${mode === 'upload' ? ' selected' : ''}`}
                    aria-pressed={mode === 'upload'}
                    onClick={() => {
                      setMode('upload')
                      setError('')
                    }}
                  >
                    <span><FontAwesomeIcon icon={faUpload} /></span>
                    <h5>Yes, upload my resume</h5>
                    <p>Attach a PDF, DOC, or DOCX file and continue to review your details.</p>
                  </button>
                </li>
                <li className={mode === 'scratch' ? 'selected' : ''}>
                  <button
                    type="button"
                    className={`resume-mode${mode === 'scratch' ? ' selected' : ''}`}
                    aria-pressed={mode === 'scratch'}
                    onClick={() => {
                      setMode('scratch')
                      setError('')
                    }}
                  >
                    <span><FontAwesomeIcon icon={faEdit} /></span>
                    <h5>No, start from scratch</h5>
                    <p>Enter your personal, education, experience, and skills details.</p>
                  </button>
                </li>
              </ul>

              {mode === 'upload' && (
                <div className="resume-upload-control">
                  <label htmlFor="resume-file">Resume file</label>
                  <input
                    ref={fileInputRef}
                    id="resume-file"
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleFileChange}
                    disabled={isUploading}
                  />
                  {file && <p>{file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)</p>}
                  <p>Maximum file size: 10 MB.</p>
                </div>
              )}

              {error && <p role="alert">{error}</p>}
              {isUploading && <p role="status">Uploading resume...</p>}

              <div className='btns-group'>
                <button type="button" className='btn btn-secondary' onClick={() => router.push('/resume/choosetemplate')} disabled={isUploading}>
                  Back
                </button>
                <button type="button" className='btn' onClick={handleContinue} disabled={!mode || isUploading || (mode === 'upload' && !file)}>
                  {isUploading ? 'Uploading...' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Page

