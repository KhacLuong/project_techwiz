import React from 'react';
import Checkbox from "@mui/material/Checkbox";

const BrandFilter = ({brands, setBranchIds}) => {
    const handleChange = (event) => {
        const checkboxValue = event.target.value;
        setBranchIds((prevType) => {
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
    const renderBrands = (brands) => {
        return brands.map((brand, index) => (
            <div key={index} className="cursor-pointer flex items-center justify-between p-2 mt-2">
                <div className={`flex items-center`}>
                    <Checkbox className={`p-0 mr-2`}
                              value={brand.id}
                              onChange={handleChange}
                              sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}/>
                    <span className={`flex items-center`}>
                         {brand?.brandName}
                        {
                            brand.countProduct > 0 && (
                                <span
                                    className={`text-black ml-2`}>({brand.countProduct})</span>
                            )
                        }
                    </span>
                </div>
            </div>
        ))
    }
    return (
        <>
            {renderBrands(brands)}
        </>
    );
};

export default BrandFilter;