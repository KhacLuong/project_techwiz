import React, {useEffect, useState} from 'react';
import useDocumentTitle from "../../../hooks/useDocumentTitle.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {fetchGetUserById} from "../../../redux/slices/userSlice.jsx";
import {
    fetchCreateCategory,
    fetchGetCategoryById,
    fetchUpdateCategory,
    getListCategoryExceptId
} from "../../../redux/slices/categorySlice.jsx";
import {validateEmail, validateEmpty, validateForm, validatePhoneNumber} from "../../../utils/helper.jsx";
import {messageEn} from "../../../utils/message-en.jsx";
import {toast} from "react-toastify";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
const formUserValidationRules = [
    {
        fieldName: "categoryName",
        validationFn: validateEmpty,
        errorMessage: messageEn.errors.name.isEmpty
    },
]
const CategoryForm = () => {
    useDocumentTitle("Add category", true)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [disableButton, setDisableButton] = useState(false)
    const id = useLocation().state?.id
    const [errorCategoryName, setErrCategoryName] = useState("")
    const [listCategory, setListCategory] = useState([])
    const [formState, setFormState] = useState({
        categoryName: '',
        parentId: 0,
        enable: true
    })
    useEffect(() => {
        if (id) {
            const test = async () => {
                const res = await dispatch(fetchGetCategoryById({id})).unwrap()
                if (res) {
                    console.log(res)
                    if (res.code === 200) {
                        setFormState(prevState => ({
                            ...prevState,
                            categoryName: res.data.categoryName,
                            parentId: res.data?.parentCategory?.id ,
                            enable: res.data.enable
                        }))
                    } else {
                        toast.error(res.message)
                    }
                }
                const resListCategory = await dispatch(getListCategoryExceptId({id})).unwrap()
                if (resListCategory && resListCategory.code === 200) {
                    setListCategory(resListCategory.data)
                }
            }
            test()
        } else {
            const test = async () => {
                const resListCategory = await dispatch(getListCategoryExceptId({id: 0})).unwrap()
                if (resListCategory && resListCategory.code === 200) {
                    setListCategory(resListCategory.data)
                }
            }
            test()
        }
    }, [id])
    const handleInputChange = (event) => {
        const {name, value} = event.target
        if (name === 'categoryName') {
            setErrCategoryName("")
        }
        setFormState((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }
    const renderRecursiveData = (categories, indent = "") => {
        const options = [];

        for (const category of categories) {
            options.push(
                <option key={category.id} value={category.id}>
                    {indent + category.categoryName}
                </option>
            );
        }
        return options;
    };
    const handleSubmitForm = async e => {
        e.preventDefault()
        setDisableButton(true)
        const errors = validateForm(formState, formUserValidationRules)
        if (!(Object.keys(errors).length === 0)) {
            setErrCategoryName(errors.categoryName)
            setDisableButton(false)
        } else {
            setErrCategoryName("")

            if (id) {
                const data = {
                    id: id,
                    categoryName: formState.categoryName,
                    parentId: formState.parentId,
                    enable: formState.enable
                }
                const res = await dispatch(fetchUpdateCategory({data})).unwrap()
                if (res && res.code === 200) {
                    navigate("/admin/v1/cms/categories/list")
                    setDisableButton(false)
                    toast.success(res.message)
                } else {
                    setDisableButton(false)
                }
            } else {
                const data = {
                    categoryName: formState.categoryName,
                    parentId: formState.parentId,
                    enable: formState.enable
                }
                const res = await dispatch(fetchCreateCategory({data})).unwrap()
                if (res && res.code === 201) {
                    navigate("/admin/v1/cms/categories/list")
                    setDisableButton(false)
                    toast.success(res.message)
                } else {
                    setDisableButton(false)
                }
            }
        }
    }
    const handleSelectChange = (event) => {
        const {name, value} = event.target
        setFormState((preState) => ({
            ...preState,
            [name]: +value
        }));
    }
    return (
        <>
            <div data-aos="fade-right"
                 data-aos-delay="300"
                 className={`flex flex-col p-4 my-4 mx-4 rounded-2xl shadow-xl shadow-gray-200 `}>
                <form className={``}>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="w-full">
                            <div className={`group relative z-0 w-full mb-12`}>
                                <input type="text"
                                       name="categoryName"
                                       id="categoryName"
                                       className="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:botext-lightGreenColor peer"
                                       placeholder=" "
                                       autoComplete={`off`}
                                       required
                                       onChange={handleInputChange}
                                       value={formState.categoryName}/>
                                <label htmlFor="categoryName"
                                       className="peer-focus:font-medium absolute  text-gray-500 duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-lightGreenColor  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Category name
                                </label>
                                {
                                    errorCategoryName && errorCategoryName.length > 0
                                        ? <span className={`text-dangerColor-default_2 `}>{errorCategoryName}</span>
                                        : null
                                }
                            </div>

                            <div className={`group relative z-0 w-full mb-12`}>
                                <label htmlFor="role"
                                       className="block mb-2  font-medium text-gray-500">
                                    Choose category parent
                                </label>
                                <select id="parentId"
                                        className="bg-gray-50 border border-gray-300 text-gray-500 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        name={"parentId"}
                                        value={formState.parentId}
                                        onChange={handleSelectChange}>
                                    <option value={""}>-- Chọn --</option>
                                    {renderRecursiveData(listCategory)}
                                </select>

                            </div>
                            <div className={`flex items-center justify-end`}>
                                <button type="submit"
                                        onClick={handleSubmitForm}
                                        disabled={disableButton}
                                        className="duration-300 text-white text-2xl bg-lightGreenColor hover:bg-lime-600 focus:ring-4 focus:outline-none font-medium rounded-lg w-full sm:w-auto px-6 py-4 text-center">
                                    {
                                        id ? 'Update user' : 'Create user'
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CategoryForm;