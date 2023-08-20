import React, {useEffect, useState} from 'react';
import Checkbox from "@mui/material/Checkbox";
import {BsCheckLg} from "react-icons/bs";
import {PiCheckFatFill} from "react-icons/pi";

const ColorFilter = ({setColors}) => {
    const [listChecked, setListChecked] = useState([])
    const handleSelectColor = (color) => {
        setListChecked(prevState => {
            if (listChecked.includes(color)) {
                return prevState.filter(newColor => newColor !== color)
            } else {
                return [...prevState, color]
            }
        })
    }
    useEffect(() => {
        setColors(listChecked.join('|').replace(/,\s*$/, ''))
    },[listChecked] )
    return (
        <div className={`flex items-center flex-row flex-wrap  p-2 mt-2`}>
            {
                listColor.length > 0 && listColor.map((item, index) => (
                    <div key={index}
                         onClick={() => handleSelectColor(item.name)}
                         className={`group/color relative w-14 h-14 mr-2 mb-4 ${item.colorCode} rounded-full border-[1px] border-borderColor cursor-pointer flex items-center justify-center`}>
                        {
                            listChecked.includes(item.name) &&
                            <PiCheckFatFill className={`w-7 h-7 ${item.name === 'White' ? 'text-black' : 'text-white'}`}/>
                        }
                        <span className={`group-hover/color:visible group-hover/color:opacity-100 group-hover/color:top-1/2 duration-500 transition-all absolute opacity-0 invisible top-0 z-30 right-1/2 translate-x-1/2 translate-y-[-60px] p-[4px_12px] bg-darkColor text-white rounded-lg before:content-[''] before:absolute before:-bottom-[4px] before:right-1/2 before:translate-x-1/2 before:z-10 before:rotate-45 before:w-4 before:h-4 before:bg-darkColor`}>{item.name}</span>
                    </div>
                ))

            }
        </div>
    );
};

const listColor = [
    {
        id: 1,
        name: 'BLUE',
        colorCode: 'bg-blue-600'
    },
    {
        id: 2,
        name: 'BROWN',
        colorCode: 'bg-amber-600'
    },
    {
        id: 3,
        name: 'GRAY',
        colorCode: 'bg-gray-500'
    },
    {
        id: 4,
        name: 'GREEN',
        colorCode: 'bg-green-600'
    },
    {
        id: 5,
        name: 'PINK',
        colorCode: 'bg-pink-400'
    },
    {
        id: 6,
        name: 'RED',
        colorCode: 'bg-red-500'
    },
    {
        id: 7,
        name: 'WHITE',
        colorCode: 'bg-white'
    },
    {
        id: 8,
        name: 'YELLOW',
        colorCode: 'bg-yellow-400'
    }
]

export default ColorFilter;