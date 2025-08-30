'use client'

import { useEffect, useState } from 'react'

export default function TestDB() {
  const [status, setStatus] = useState('Loading...')
  const [error, setError] = useState('')

  useEffect(() => {
    const testDB = async () => {
      try {
        const response = await fetch('/api/test-db')
        const data = await response.json()
        
        if (response.ok) {
          setStatus('✅ Database connection successful!')
        } else {
          setError(data.error || 'Database connection failed')
        }
      } catch (err) {
        setError(`Connection error: ${err}`)
      }
    }

    testDB()
  }, [])

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Database Connection Test</h1>
      <div className="bg-gray-100 p-4 rounded">
        <p className="text-lg">{status}</p>
        {error && (
          <p className="text-red-600 mt-2">Error: {error}</p>
        )}
      </div>
    </div>
  )
}
