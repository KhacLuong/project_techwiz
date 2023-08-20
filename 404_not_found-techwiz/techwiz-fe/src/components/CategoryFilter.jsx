import React, {useEffect, useState} from 'react';
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import Checkbox from '@mui/material/Checkbox';

const CategoryFilter = ({categories, setCategories, setCategoryIds}) => {
    const [openCategories, setOpenCategories] = useState([]);
    const toggleCategory = (categoryId) => {
        setOpenCategories(prevOpenCategories => {
            if (prevOpenCategories.includes(categoryId)) {
                return prevOpenCategories.filter(id => id !== categoryId);
            } else {
                return [...prevOpenCategories, categoryId];
            }
        });
    };

    const handleChangeCheckBox = (event) => {
        const checkboxValue = event.target.value;
        const isChecked = event.target.checked;

        const updatedCategories = categories.map((category) => {
            if (category.id === +checkboxValue) {
                category.checked = isChecked;
                if (category.listChildrenCategory.length > 0) {
                    category.listChildrenCategory.forEach((childCategory) => {
                        childCategory.checked = isChecked;
                    });
                }
            } else if (category.listChildrenCategory.length > 0) {
                category.listChildrenCategory = category.listChildrenCategory.map((childCategory) => {
                    if (childCategory.id === +checkboxValue) {
                        childCategory.checked = isChecked;
                    }
                    return childCategory;
                });
            }
            return category;
        });
        setCategories(updatedCategories);
    };
    const getCheckedCategoryIds = () => {
        const checkedCategoryIds = [];

        const traverseCategories = (categories) => {
            for (const category of categories) {
                if (category.checked) {
                    checkedCategoryIds.push(category.id);
                }
                if (category.listChildrenCategory.length > 0) {
                    traverseCategories(category.listChildrenCategory);
                }
            }
        };
        traverseCategories(categories);
        return checkedCategoryIds.join('|');
    }
    useEffect(() => {
        setCategoryIds(getCheckedCategoryIds())
    }, [categories])
    const renderCategories = (categories) => {
        return categories.map((category, index) => (
            <div key={index} className="p-2 mt-2">
                <div className="cursor-pointer flex items-center justify-between">
                    <div className={`flex items-center`}>
                        <Checkbox className={`p-0 mr-2`}
                                  onChange={handleChangeCheckBox}
                                  value={category.id}
                                  checked={category.checked || false}
                                  sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}/>
                       <span className={`flex items-center`}>
                         {category.categoryName}
                           {
                               category.countProduct > 0 && (
                                   <span
                                       className={`text-black ml-2`}>({category.countProduct})</span>
                               )
                           }
                    </span>
                    </div>
                    {category.listChildrenCategory.length > 0 && (
                        <span onClick={() => toggleCategory(category.id)}
                              className={`flex items-center transition-transform duration-300 ${openCategories.includes(category.id) ? 'rotate-180' : ''}`}
                        >
                            {
                                openCategories.includes(category.id) ?
                                    <AiOutlineMinus className={`w-7 h-7`}/> :
                                    <AiOutlinePlus className={`w-7 h-7`}/>
                            }

                        </span>
                    )}
                </div>
                <div className={`ml-4 space-y-2 transition-all duration-300 ease-in-out overflow-hidden ${openCategories.includes(category.id) ? 'max-h-96 visible' : 'max-h-0 invisible'}`}>
                    {renderCategories(category.listChildrenCategory)}
                </div>
            </div>
        ));
    };
    return (
        <>
            {renderCategories(categories)}
        </>
    );
};

export default CategoryFilter;