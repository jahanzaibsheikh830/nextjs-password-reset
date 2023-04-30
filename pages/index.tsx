import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  
  async function fetchData() {
    const response = await fetch('/api/resetPassword')
    const data = await response.json()
    console.log(data)
  }

  return (
    <div className='flex justify-center mt-4 h-screen'>
        <div>
          <h1 className='mb-4'>Reset Password</h1>
          <input className='py-3 pl-2' type="email" placeholder='Enter your email' />
          <button className='block bg-white mt-4 py-2 px-4' onClick={()=> fetchData()}>Send</button>
        </div>
    </div>
  )
}
