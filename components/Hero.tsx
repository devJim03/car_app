'use client';
//hero is also a client therefore use client at the top, so far it seems like whenver you get an error just do use client at the top
import React from 'react'
import CustomButton from './CustomButton'
import Image from 'next/image' //ok so apprently nextjs has its own image thing but you will need to import it from next/image, its not a self made component by you, its a self made component by nextJs
const Hero = () => {

  const handleScroll = () =>{}

  return (
    <div className='hero'> {/*hero, hero__title is predefined in the globals.css file basically anything that isnt standard is defined in globals.css*/}
      <div className='flex-1 pt-36 padding-x'>
        <h1 className='hero__title'>Find, book, or rent a car — quickly and easily!</h1>
        <p className='hero__subtitle'>Streamline your rental experience with our effortless booking process.</p>
        {/*literally passing the styles in to the button as a prop cant get more reusable than an unstyled button*/}
        <CustomButton title='Explore Cars' containerStyles="bg-primary-blue text-white rounded-full mt-10" handleClick={handleScroll}/>
      </div>
      <div className='hero__image-container'>
        <div className='hero__image'>
          {/*nextjs has its own image tag which looks different dont forget to import image from next/image, also once again all the styles are predefined in globals.css*/}
          <Image src="/hero.png" fill className='object-contain' alt='car'/> 
        </div>
          <div className='hero__image-overlay'/>
      </div>
    </div>
  )
}

export default Hero