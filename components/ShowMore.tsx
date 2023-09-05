'use client'

import { ShowMoreProps } from '@/types'
import { updateSearchParams } from '@/utils'
import { useRouter } from 'next/navigation'
import React from 'react'
import CustomButton from './CustomButton'

const ShowMore = ({pageNumber,isNext, setLimit}:ShowMoreProps) => {

    const router = useRouter()

    const handleNavigation = () => {
        //literally showing more is once again just updating the url bc the only thing we really want to change is the limit variable we send to the api
        //for client side ignore above that was server side for client side just call the setter func
        const newLimit = (pageNumber+1)*10
        setLimit(newLimit)
    }

    return (
        <div className='w-full flex-center gap-5 mt-10'>
            {!isNext&&(
                <CustomButton title='Show More' btnType='button' containerStyles='bg-primary-blue rounded-full text-white' handleClick={handleNavigation}/>
            )}
        </div>
    )
}

export default ShowMore