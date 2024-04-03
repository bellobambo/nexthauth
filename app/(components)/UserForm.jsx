'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const UserForm = () => {

    const router = useRouter()
    const [formData, setFormData] = useState({})
    const [errorMessage, setErrorMessage] = useState("")


    const handleChange = (e) => {
        const value = e.target.value
        const name = e.target.name
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage('')

        const res = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ formData }), // Fix here
            headers: { "Content-Type": 'application/json' }, // Fix: Content-Type should be in headers
        })

        if (!res.ok) {
            const response = await res.json();
            setErrorMessage(response.message)
        } else {
            router.refresh()
            router.push('/')
        }
    };



    return (
        <>
            <form onSubmit={handleSubmit} method='post' className='flex flex-col gap-3 w-1/2' action="">
                <h1>Create New User</h1>
                <label>Full Name</label>
                <input type="text" name='name' id='name' onChange={handleChange} required value={formData.name}  className='m-2 bg-slate rounded-md'/>
                <label> Email</label>
                <input type="email" name='email' id='email' onChange={handleChange} required value={formData.email}  className='m-2 bg-slate rounded-md'/>
                <label> Password</label>
                <input type="password" name='password' id='password' onChange={handleChange} required value={formData.password}  className='m-2 bg-slate rounded-md'/>

                <input type="submit"  value='create User' className='bg-blue-300 hover:bg-blue-100'/>
            </form>

            <p className='text-red-500'>{errorMessage}</p>
        </>
    )
}

export default UserForm