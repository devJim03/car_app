//using javascript fetch

import { manufacturers } from "@/constants";
import { CarProps } from "@/types";
import { FilterProps } from "@/types";
//copied the headers from the options

//this is interesting, too lazy to write all the props recieved here so we wrote it in utils and made it an interface, all we have to do here is import the interface where it wants props aka FilterProps
export async function fetchCars(filters: FilterProps){

    const { manufacturer, year, model, limit, fuel, } = filters; //destructuring the props
    const headers = {
		'X-RapidAPI-Key': '185b1aadcbmsh2c6e1a6fa166985p1203b6jsnb36e939bca57',
		'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
	}

    //typical api linking stuff
    //tldr you send the search paramters to the api by updating the url you send, basically these props are obtained from the search bar and written into the url here to be sent to the api
    const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&fuel_type=${fuel}&limit=${limit}`,{headers:headers,});

    //async function bc it isnt instant, then parse into json obj
    const result = await response.json();

    return result
}

export const calculateCarRent = (city_mpg: number, year: number) =>{
    const basePrice = 50;
    const mileageFactor = 0.1;
    const ageFactor = 0.05;

    const mileageRate = city_mpg*mileageFactor;
    const ageRate = (new Date().getFullYear()-year)*ageFactor;

    const rate = basePrice + mileageRate + ageRate;
    return rate.toFixed(0);
    //perhaps just do a random num generator
}

export const generateCarImageUrl = (car:CarProps, angle?:string) => {
    const url = new URL('https://cdn.imagin.studio/getimage')

    const { make, year, model } = car;

    url.searchParams.append('customer','hrjavascript-mastery');
    url.searchParams.append('make',make);
    url.searchParams.append('modelFamily',model.split(' ')[0]);
    url.searchParams.append('zoomType','fullscreen');
    url.searchParams.append('modelYear',`${year}`);
    url.searchParams.append('angle',`${angle}`);

    return `${url}`;
}

export const updateSearchParams=(type:string,value:string)=>{
        //this line of code gets the current url
        const searchParams = new URLSearchParams(window.location.search)
        //updates the url with our new filter stuff
        searchParams.set(type,value)
        //creates a new url
        const newPathname=`${window.location.pathname}?${searchParams.toString()}`
        //pushes the new url
        return newPathname;
}