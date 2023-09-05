'use client';

import React from 'react'
import { useState } from 'react';
import { SearchManufacturer } from './';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const SearchButton = ({otherClasses}:{otherClasses:string}) =>(
    <button type='submit' className={`-ml-3 z-10 ${otherClasses}`}>
        <Image src='/magnifying-glass.svg' alt='search' width={40} height={40} className='object-contain'/>
    </button>
)

//this is the code that allows the search bar to work and ask for the right api requests 
const SearchBar = ({setManufacturer, setModel}) => {
    
    const [searchManufacturer, setSearchManufacturer] = useState('') //using state to keep track of which is selected at the moment
    const [searchModel, setSearchModel] = useState('') //using state to keep track of which is selected at the moment
    const router = useRouter()
    
    const handleSearch = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()//dont want browser to refresh on submit
        if(searchManufacturer === '' && searchModel === ''){
            return alert('Please fill the search bar') //alerts are the browser pop up things
        }
        setModel(searchModel)
        setManufacturer(searchManufacturer)
    }


    return (
    //onsubmit is a brower side thing so you must have useclient at the top
    <form className='searchbar' onSubmit={handleSearch}>
        <div className='searchbar__item'>
            {/*this isnt a regular search bar its a combo search bar aka once you start typing it gives you options to choose from like a search bar and a select list put together*/}
            {/*we pass the state and its function as props into this special search bar*/}
            <SearchManufacturer selected={searchManufacturer} setSelected={setSearchManufacturer}/>
            <SearchButton otherClasses='sm:hidden'/> {/*only for mobile*/}
        </div>
        <div className='searchbar__item'>
            <Image src='/model-icon.png' width={25} height={25} alt='car logo' className='absolute w-[20px] h-[20px] ml-4'/>
            <input type='text' name='model' value={searchModel} onChange={(event)=> setSearchModel(event.target.value)} placeholder='Golf' className='searchbar__input'/>
            <SearchButton otherClasses='sm:hidden'/>{/*only for mobile*/}
        </div>
        <SearchButton otherClasses='max-sm:hidden'/> {/*only for non mobile*/}
    </form>
  )
}

export default SearchBar