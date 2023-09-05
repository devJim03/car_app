'use client' //for the combobox to work

import { SearchManufacturerProps } from '@/types'
import React from 'react'
import { useState, Fragment } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import Image from 'next/image'
import { manufacturers } from '@/constants'

const SearchManufacturer = ({selected, setSelected}:SearchManufacturerProps) => {

    const[query,setQuery]=useState('')

    //get list of all manu and filter it based on search query aka dont want to display bmw if user types "a"
    const filteredManufacturers = query === '' ?  manufacturers : manufacturers.filter((item)=>(
        //replace all empty spaces with an empty string
        //tldr check if the item after lowercased and no spaces matches the search query after being lowercased and no spaced
        item.toLowerCase().replace(/\s+/g,'').includes(query.toLowerCase().replace(/\s+/g,''))
    ))

    return (
    <div className='search-manufacturer'>
        {/*combobox is the special search box I described before, its not from react nor nextjs its from headlessui which is another external library we installed with npm install*/}
        {/*the value and onChange is updating the state aka the currently selected manufacturer state*/}
        <Combobox value={selected} onChange={setSelected}>
            <div className='relative w-full'>
                <Combobox.Button className='absolute top-[14px]'>
                    <Image src='/car-logo.svg' width={20} height={20} alt='logo' className='ml-4'/>
                </Combobox.Button>
                {/*the displayValue takes a function, we just want it to display manu so its a function that takes manu and returns manu, yep, and bc typescript we specify manu is a string*/}
                {/*for the only change we basically just want to trigger setQuery, but bc its react we gotta use a function in onChange so onchange takes a function that takes an event and when triggered triggers setQuery with that event's value*/}
                <Combobox.Input className='search-manufacturer__input' placeholder='Volkswagen' displayValue={(manufacturer:string)=>manufacturer} onChange={(event)=>setQuery(event.target.value)}/>
                {/*the transition is for the dropdown of the search, the fragment stuff is just required so yep, after the transition empty the query*/}
                <Transition as={Fragment} leave='transition ease-in duration-100' leaveFrom='opacity-100' leaveTo='opacity-0' afterLeave={()=>setQuery('')}>
                    <Combobox.Options>
                        {filteredManufacturers.length === 0 && query !== '' ?(
                            //no manufacturers found
                            <Combobox.Option value={query} className='search-manufacturer__option'>No matches found</Combobox.Option>
                        ):(
                            //manufacturers found looping through options
                            //whats going on here is that for every make in filteredmanu aka alreading matching ones, genereate a combobox option, then styling them differently if they are active or not aka is the mouse hovering over em
                            filteredManufacturers.map((make)=>(                                                                                                                                 //this is destructing aka keep track of whats currently selected and whats currently active
                                <Combobox.Option value={make} key={make} className={({active})=>`relative search-manufacturer__option ${active?'bg-primary-blue text-white':'text-gray-900'}`}>{({selected,active})=>(
                                    //code I 'borrowed' from headless ui dev team, also the <></> is apparently a fragment
                                    <>
                                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{make}</span>
                                        {selected ? (
                                        <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${ active ? 'text-white' : 'text-teal-600'}`}></span>
                                        ) : null}
                                    </>
                                )}</Combobox.Option>
                            ))
                        )}
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    </div>
  )
}

export default SearchManufacturer 