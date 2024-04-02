'use client'

import React from 'react'
// import { getServerSession } from 'next-auth'
import {useSession} from 'next-auth/react'
import { options } from '../api/auth/[...nextauth]/options'
import { useRouter } from 'next/navigation'



const Member =  () => {
  const router = useRouter()

  const {data : session} =  useSession({
    required : true,
    onUnauthenticated (){
      router.push('/api/auth/signin?callbackUrl=/clientmember')
    }
  })


  // if (!session) {
  //   redirect('api/auth/signin?callbackUrl=/member')
  // }
  return (
    <div>
        <h1>Member Client Session</h1>
        <p>{session?.user?.email}</p>
      <p>{session?.user?.role}</p>
    </div>
  )
}

export default Member