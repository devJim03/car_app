'use client' //unfortunately going to have to make it a client side rendered not server side to fix the reset scroll issue

import { Hero, SearchBar, CustomFilter, CarCard, ShowMore } from "@/components"
import { fuels, yearsOfProduction } from "@/constants";
import { fetchCars } from "@/utils"
import { getCookieParser } from "next/dist/server/api-utils";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home({}) {
  
  //unforutnatly need all of these states for client side
  const [allCars,setAllCars]=useState([]);
  const [loading,setLoading]=useState(false);

  //search states
  const [manufacturer,setManufacturer] = useState('')
  const [model, setModel] = useState('')

  //filter states
  const [fuel, setFuel] = useState('')
  const [year, setYear] = useState(2023)

  //page states
  const [limit, setLimit] = useState(10)

  const getCars = async()=>{
    setLoading(true);
    try{
        //allCars will be an array of objects
        //passing the search paramters into the fetch cars function the or's are default values
        const result = await fetchCars({manufacturer:manufacturer || '',
        year: year || 2023, //passing all the states
        fuel: fuel || '',
        limit: limit || 10,
        model: model || '',
        });

        setAllCars(result)
      }catch(error){
        console.log(error)
      }finally{
        setLoading(false);
      }
  }
  //so to do with states we have all of these vairables saved in state and a useeffect hook that calls a function to get the new cars everytime state changes
  useEffect(()=>{
    getCars();

  },[fuel,year,limit,manufacturer,model,])

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars

  return (
    <main className="overflow-hidden">
      <Hero/>
      <div className="mt-12 padding-x padding-y max-width" id='discover'>
        {/*id discover means navbar can be clicked to move into this section, max-width makes it take the full width*/}
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars we have to offer</p>
        </div>
        
        <div className="home__filters">
          <SearchBar setManufacturer={setManufacturer} setModel={setModel}/>
          <div className="home__filter-container">
            {/*notice the naming of the classnames the div inside home__filters is called home__filters-container*/}
            <CustomFilter title='fuel' options={fuels} setFilter={setFuel}/>
            <CustomFilter title='year'options={yearsOfProduction} setFilter={setYear}/>
          </div>
        </div>


        {allCars.length > 0 ?(
          //we have cars 
          <section>
            <div className="home__cars-wrapper">
              {/*?.map means dont even try to map if the array is undefined*/}
              {allCars?.map((car)=> <CarCard car={car} />)}
            </div>
            {loading && (
              <div className="mt-16 w-full flex-center">
                <Image src='/loader.svg' alt='loading' width={50} height={50} className='object-contain'/>
              </div>
            )}
            <ShowMore pageNumber={(limit)/10} isNext={(limit) > allCars.length} setLimit={setLimit}/>
          </section>
        ):(
          //we dont have cars
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            {/*<p>{allCars?.message}</p>*/}
          </div>
        )}
      </div>
    </main>
  )
}
