import React, {useState} from 'react';
import Checkbox from "@mui/material/Checkbox";

const SizeFilter = ({setSizes}) => {
    const [listCheckSize, setListCheckSize] = useState([])
    const handleChange = (event) => {
        const checkboxValue = event.target.value;
        setSizes((prevType) => {
            if (event.target.checked) {
                // Add the value to typeRow if the checkbox is checked
                if (!prevType) {
                    return checkboxValue;
                } else {
                    return prevType + '|' + checkboxValue;
                }
            } else {
                // Remove the value from typeRow if the checkbox is unchecked
                return prevType.replace(new RegExp('\\b' + checkboxValue + '\\b', 'g'), '').replace(/\|+/g, '|').replace(/^\||\|$/g, '');
            }
        });
    }

    return (
        <div className={`grid grid-cols-2 mt-2`}>
            {
                listSize.length > 0 && listSize.map((item, index) => (
                    <div key={index} className={`col-span-1 flex items-center p-2`}>
                        <Checkbox className={`p-0 mr-2`}
                                  value={item.name}
                                  onChange={handleChange}
                                  sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}/>
                        <span>{item.name}</span>
                    </div>
                ))
            }
        </div>
    );
};
const listSize = [
    {
        id: 1,
        name: 'XXS'
    },
    {
        id: 2,
        name: 'XS'
    },
    {
        id: 3,
        name: 'S'
    },
    {
        id: 4,
        name: 'M'
    },
    {
        id: 5,
        name: 'L'
    },
    {
        id: 6,
        name: 'XL'
    },
    {
        id: 7,
        name: 'XXL'
    }
]
export default SizeFilter;
//     XXS,
//     XS,
//     S,
//     M,
//     L,
//     XL,
//     XXL