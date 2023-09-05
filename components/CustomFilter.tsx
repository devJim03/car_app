'use client'
import React from 'react'
import { useState, Fragment } from 'react'
import Image from 'next/image' 
import { useRouter } from 'next/navigation'
import { Listbox, Transition } from '@headlessui/react'
import { CustomFilterProps } from '@/types'
import { updateSearchParams } from '@/utils'


const CustomFilter = ({title,options, setFilter}:CustomFilterProps) => {

  const [selected,setSelected] = useState(options[0])

  return (
    <div className='w-fit'>
      {/*there is an extra {} after (event)=> because we want to send the event to 2 differnt locations*/}
      <Listbox value={selected} onChange={(event)=>{
        setSelected(event)
        setFilter(event.value)
      }}>
        <div className='relative w-fit z-10'>
          <Listbox.Button className='custom-filter__btn'>
            <span className='block truncate'>{selected.title}</span>
            <Image src='/chevron-up-down.svg' width={20} height={20} className='ml-4 object-contain' alt='chevron up and down'/>
          </Listbox.Button>
          {/*this transition slowly opens up the menu box to choose other filters*/}
          <Transition as={Fragment} leave='transition ease in duration-100' leaveFrom='opacity-100' leaveTo='opacity-0'>
            {/*listbox.options is the contain that holds the option and listbox.option is the option itself*/}
            <Listbox.Options className='custom-filter__options'>
              {options.map((option)=>(
                                                                            //this is pretty cool, headless ui allows you to define "active" right in the classname, active I guess is a reserved keyword and it knows if you define it like such as a callback function in the classname its talking about whether or not you have clicked the listbox option
                                                                            //I just want to clarify active means is the mouse hovering over, selected is the actual is selected or not
                <Listbox.Option key={option.title} value={option} className={({active})=>`relative cursor-default select-none py-2 px-4 ${active?'bg-primary-blue text-white' : 'text-gray-900'}`}>
                  {({selected})=>(
                    <span className={`block truncate ${selected?'font-medium':'font-normal'}`}>{option.title}</span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default CustomFilter