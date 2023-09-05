import { MouseEventHandler } from "react";
import internal from "stream";
import { StringLiteral } from "typescript";

//interface specifies how a structure should look like, what variables and values should it have
//tldr typescript is annoying and makes you specify what are the types of props a user defined component should recieve, this is defined in an interface
//the ? after containerStyles means its optional same with handleClick
export interface CustomButtonProps{
    title:string;
    containerStyles?:string;
    btnType?: "button" | "submit"
    handleClick?:MouseEventHandler<HTMLButtonElement>
    textStyles?:string;
    rightIcon?:string;
    isDisabled?:boolean;
}

//button type is optional either 'button' or 'submit'
//setManu is going to recieve a function that recivees manu which is a string and returns nothing
export interface SearchManufacturerProps{
    manufacturer:string;
    setManufacturer:(manufacturer:string)=>void;
}

export interface CarProps{
    city_mpg: number;
    class: string;
    combination_mpg: number;
    cylinders: number;
    displacement: number;
    drive: string;
    fuel_type: string;
    highway_mpg: number;
    make: string;
    model: string;
    transmission: string;
    year:number;
}

export interface FilterProps{
    manufacturer:string,
    year: number,
    fuel: string,
    limit: number,
    model: string,
}

export interface OptionProps{
    title:string,
    value:string,
}

export interface CustomFilterProps{
    title:string,
    options: OptionProps[], //interface within an interface
}

export interface ShowMoreProps{
    pageNumber: number;
    isNext:boolean;
}