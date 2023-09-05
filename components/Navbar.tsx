//'use client';
import React from 'react'
import Link from 'next/link' //ok turns out nextjs has its own link and image components as well if you want to use em
import Image from 'next/image'
import CustomButton from './CustomButton'

const Navbar = () => {
  return (
    //the trick here is really w-full that allows the navbar to take the full width aka entire screen
    <header className='w-full absolute z-10'>
        <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4'>
            <Link href="/" className='flex justify-center items-center'>
                {/*href of / just means clicking it bring you to home aka root, the object-contain allows you to maintain aspect ratio of the image*/}
                <Image src="/logo.svg" alt='logo' width={118} height={18} className='object-contain'/>
            </Link>
            <CustomButton title='Sign in' btnType='button' containerStyles='text-primary-blue rounded-full bg-white min-w-[130px]'/>
        </nav>
    </header>
  )
}

export default Navbar