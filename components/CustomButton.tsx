'use client';
//might need to do 'use client' here if it gives an error, yup so apparently default components are server components so if you want to make it a client side component do the use component
//why is a button a client side component? bc users click on it I guess
import React from 'react'
import Image from 'next/image'
import { CustomButtonProps } from '@/types/index'; //annd gotta import it too
//remember how we specified which types of props this component is going to recieve in index.ts in types? well you gotta link that with this hence the :CustomButtonProps
const CustomButton = ({ title, containerStyles, handleClick, btnType, textStyles, rightIcon, isDisabled}:CustomButtonProps) => {
  return (
    //firstly a bunch of properties such as disabled, and type will be resued later, onClick is a callback function which I think just means we will pass a function into this custom button as a prop and onClick will trigger that function hence the callback func
    //tldr if you want to pass a function in as a prop, then in the component the onClick has to be onClick={()=>{prop.functionName}//nvm I am capping
    //notice how since we got {``} we can put ${} inside to put code inside and the code is literally a string of more styles, this is how you style a button by passing in the styling as props
    <button disabled={false} type={btnType || 'button'} className={`custom-btn ${containerStyles}`} onClick={handleClick}>
        {/*the reason why we are using template strings aka {``} for classnames is reuseability we want the button to be reuseable therefore we want to be able to pass in different props and modify the appearing and function of the button therefore conditional statements therefore template literals*/}
        <span className={`flex-1 ${textStyles}`}>{title}</span>
        {rightIcon&&( //remember && is an easy way to check if something exists, this basically says if righticon exits then render this div
          <div className='relative w-6 h-6'>
            <Image src={rightIcon} alt='icon' fill className='object-contain'/>
          </div>
        )}
    </button>
  )
}

export default CustomButton