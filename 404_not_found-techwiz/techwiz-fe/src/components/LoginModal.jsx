import React, {useContext, useRef, useState} from 'react';
import {Context} from "../context/ContextProvider.jsx";
import {useDispatch} from "react-redux";
import {AiFillEye, AiFillEyeInvisible, AiOutlineClose} from "react-icons/ai";
import {fetchLogin, fetchRegister} from "../redux/slices/authSlice.jsx";
import {toast} from "react-toastify";

const LoginModal = () => {
    const {openLoginModal, setOpenLoginModal} = useContext(Context);
    const modal = useRef(null);
    const dispatch = useDispatch()
    const [openModalSignUp, setOpenModalSignUp] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [formState, setFormState] = useState({
        id: 0,
        email: "",
        phoneNumber: "",
        gender: "",
        fullName: "",
        dateOfBirth: "",
        password: ""
    })
    const handleCloseModal = () => {
        setOpenLoginModal(false)
        setOpenModalSignUp(false)
        setFormState({
            id: 0,
            email: "",
            phoneNumber: "",
            gender: "",
            fullName: "",
            dateOfBirth: "",
            password: ""
        })
    }
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        if (name !== 'phoneNumber') {
            // For other input fields, update the state normally
            setFormState((prevState) => ({
                ...prevState,
                [name]: value
            }));
        } else {
            const isValidNumber = /^\d*[.]?\d*$/.test(value);
            if (isValidNumber || value === '') {
                // setErrorPhoneNumber('');
                setFormState((prevState) => ({
                    ...prevState,
                    [name]: value
                }));
            } else {
                // setErrorPhoneNumber(message.error.phoneNumber.isInvalid);
            }
        }
    }
    const handleSignUp = async (e) => {
        e.preventDefault()
        const data = {
            id: formState.id,
            fullName: formState.fullName,
            dateOfBirth: formState.dateOfBirth,
            phoneNumber: formState.phoneNumber,
            gender: formState.gender,
            email: formState.email,
            password: formState.password
        }
        const res = await dispatch(fetchRegister({data})).unwrap()
        console.log(res)
        if (res && res.code === 201) {
            toast.success("Successful account registration")
            handleToggleModal()
        } else {
            toast.error("Account registration failed!")
        }
    }
    const handleToggleModal = () => {
        setOpenModalSignUp(!openModalSignUp)
        setFormState({
            id: 0,
            email: "",
            phoneNumber: "",
            gender: "",
            fullName: "",
            dateOfBirth: "",
            password: ""
        })
    }
    const handleSignIn = async (e) => {
        e.preventDefault()
        const data = {
            email: formState.email,
            password: formState.password,
        }
        const res = await dispatch(fetchLogin({data})).unwrap()
        console.log(res)
        if (res && res.code === 200) {
            toast.success("Successful login")
            handleCloseModal()
        } else {
            toast.error("Login failed!")
        }
    }

    return (
        <div ref={modal}
             className={`${openLoginModal ? 'block' : 'hidden'} fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[105] w-[520px]`}>
            <div className="relative w-full max-w-2xl">
                <div className="relative bg-white rounded-lg shadow">
                    <div className="flex items-center justify-center p-4 border-b rounded-t relative">
                        <div>
                            <h3 className="text-4xl text-center font-semibold text-gray-900 capitalize">
                                {
                                    openModalSignUp ? 'Sign Up' : 'Sign In'
                                }
                            </h3>
                        </div>
                        <button type="button"
                                onClick={() => handleCloseModal()}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center absolute right-2">
                            <AiOutlineClose className={`w-9 h-9 text-dangerColor-default_2`}/>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className={`h-full p-[20px] rounded-b-lg`}>
                        {
                            openModalSignUp ?
                                <>
                                    <form action={``} method={``}>
                                        <div>
                                            <label htmlFor={`email`}
                                                   className={`text-[14px] leading-normal`}>Email <span
                                                className={`text-dangerColor-default_2`}>*</span>
                                            </label>
                                            <span
                                                className={`p-0 m-0 mt-2 mb-0.5 text-[14px] leading-normal relative inline-block w-full text-start`}>
                                                <input id={`email`} value={formState.email}
                                                       name={`email`}
                                                       autoComplete={`off`}
                                                       type={`text`}
                                                       onChange={handleInputChange}
                                                       className={` min-h-full relative h-[40px] py-[6px] px-[11px] text-[16px] w-full inline-block leading-normal border-[1px] outline-none border-borderColor rounded-lg`}/>
                                            </span>
                                        </div>
                                        <div className="mt-6">
                                            <label htmlFor={`phoneNumber`} className={`text-[14px] leading-normal`}>
                                                Phone number <span className={`text-dangerColor-default_2`}>*</span>
                                            </label>
                                            <span
                                                className={`p-0 m-0 mt-2 mb-0.5 text-[14px] leading-normal relative inline-block w-full text-start`}>
                                                <span
                                                    className={`z-[2] absolute left-[12px] top-1/2 flex items-center -translate-y-1/2 after:inline-block after:content-[''] after:w-[10px] after:h-[22px] after:border-r-[1px]`}>
                                                    +84
                                                </span>
                                                <input id={`phoneNumber`} value={formState.phoneNumber}
                                                       name={`phoneNumber`} onChange={handleInputChange}
                                                       autoComplete={`off`}
                                                       type={`text`}
                                                       className={`pl-[55px] min-h-full relative h-[40px] py-[6px] px-[11px] text-[16px] w-full inline-block leading-normal border-[1px] duration-300 transition-all bg-white outline-none focus:outline-none ring-0 border-borderColor rounded-lg`}/>
                                            </span>
                                        </div>

                                        <div className="mt-6">
                                            <label htmlFor={`fullName`} className={`text-[14px] leading-normal`}>
                                                Full name <span className={`text-dangerColor-default_2`}>*</span>
                                            </label>
                                            <span
                                                className={`p-0 m-0 mt-2 mb-0.5 text-[14px] leading-normal relative inline-block w-full text-start`}>
                                                <input id={`fullName`} value={formState.fullName}
                                                       name={`fullName`} onChange={handleInputChange}
                                                       autoComplete={`off`}
                                                       type={`text`}
                                                       className={`min-h-full relative h-[40px] py-[6px] px-[11px] text-[16px] w-full inline-block leading-normal border-[1px] duration-300 transition-all bg-white outline-none focus:outline-none ring-0 border-borderColor rounded-lg`}/>
                                            </span>
                                        </div>
                                        <div className="mt-6">
                                            <label htmlFor={`password`} className={`text-[14px] leading-normal`}>
                                                Password <span className={`text-dangerColor-default_2`}>*</span>
                                            </label>
                                            <span
                                                className={`p-0 m-0 mt-2 mb-0.5 text-[14px] leading-normal relative inline-block w-full text-start`}>
                                                <input id={`password`} value={formState.password}
                                                       name={`password`} onChange={handleInputChange}
                                                       autoComplete={`off`}
                                                       type={showPassword ? `password` : 'text'}
                                                       className={`min-h-full relative h-[40px] py-[6px] px-[11px] text-[16px] w-full inline-block leading-normal border-[1px] duration-300 transition-all bg-white outline-none focus:outline-none ring-0 border-borderColor rounded-lg`}/>
                                                <span
                                                    className={`absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer`}
                                                    onClick={() => setShowPassword(!showPassword)}>
                                                    {
                                                        showPassword ?
                                                            <AiFillEye className={`w-9 h-9 text-[#000000a6]`}/> :
                                                            <AiFillEyeInvisible className={`w-9 h-9 text-[#000000a6]`}/>
                                                    }
                                                </span>
                                            </span>
                                        </div>
                                        <div className="mt-6">
                                            <h3 className={`text-[14px] leading-normal`}>Gender</h3>
                                            <ul className="mt-2 items-center w-full font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex">
                                                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                                                    <div className="flex items-center pl-3">
                                                        <input id="male" type="radio" value="Male"
                                                               name="gender"
                                                               onChange={handleInputChange}
                                                               className=""/>
                                                        <label htmlFor="male"
                                                               className="w-full py-3 ml-2 font-medium text-gray-900">Male</label>
                                                    </div>
                                                </li>
                                                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                                                    <div className="flex items-center pl-3">
                                                        <input id="female" type="radio" value="Female"
                                                               name="gender"
                                                               onChange={handleInputChange}
                                                               className=""/>
                                                        <label htmlFor="female"
                                                               className="w-full py-3 ml-2 font-medium text-gray-900">Female</label>
                                                    </div>
                                                </li>
                                                <li className="w-full">
                                                    <div className="flex items-center pl-3">
                                                        <input id="other" type="radio" value="Other"
                                                               onChange={handleInputChange}
                                                               name="gender"
                                                               className=""/>
                                                        <label htmlFor="other"
                                                               className="w-full py-3 ml-2 font-medium text-gray-900">Other</label>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="mt-6">
                                            <label htmlFor={`dateOfBirth`} className={`text-[14px] leading-normal`}>
                                                Birthday
                                            </label>
                                            <span
                                                className={`p-0 m-0 mt-2 mb-0.5 text-[14px] leading-normal relative inline-block w-full text-start`}>
                                                <input id={`dateOfBirth`} value={formState.dateOfBirth}
                                                       name={`dateOfBirth`} onChange={handleInputChange}
                                                       autoComplete={`off`}
                                                       type={`date`}
                                                       className={`min-h-full relative h-[40px] py-[6px] px-[11px] text-[16px] w-full inline-block leading-normal border-[1px] duration-300 transition-all bg-white outline-none focus:outline-none ring-0 border-borderColor rounded-lg`}/>
                                            </span>
                                        </div>
                                        <button onClick={handleSignUp}
                                                className={`w-full mt-[15px] h-[40px] px-[15px] text-[16px] rounded-lg duration-300 bg-lightGreenColor hover:bg-lime-600 text-white`}>
                                            Sign Up
                                        </button>
                                        <p className={`signup mt-4`}>Already have an account? <a
                                            className={`cursor-pointer text-lightGreenColor`}
                                            onClick={handleToggleModal}>Sign
                                            in</a>
                                        </p>
                                    </form>
                                </> :
                                <>
                                    <form action={``} method={``}>
                                        <div className={`mb-6`}>
                                            <label htmlFor={`email`} className={`text-[14px] leading-normal`}>
                                                Email
                                            </label>
                                            <span
                                                className={`p-0 m-0 mt-2 mb-0.5 text-[14px] leading-normal relative inline-block w-full text-start`}>
                                                <input id={`email`} value={formState.email}
                                                       name={`email`} onChange={handleInputChange}
                                                       autoComplete={`off`}
                                                       type={`text`}
                                                       className={` min-h-full relative h-[40px] py-[6px] px-[11px] text-[16px] w-full inline-block leading-normal border-[1px] duration-300 transition-all bg-white outline-none focus:outline-none ring-0 border-borderColor rounded-lg`}/>
                                            </span>
                                        </div>
                                        <div className={``}>
                                            <label htmlFor={`password`} className={`text-[14px] leading-normal`}>
                                                Password
                                            </label>
                                            <span
                                                className={`p-0 m-0 mt-2 mb-0.5 text-[14px] leading-normal relative inline-block w-full text-start`}>
                                                <input id={`password`} value={formState.password}
                                                       name={`password`} onChange={handleInputChange}
                                                       autoComplete={`off`}
                                                       type={showPassword ? `password` : 'text'}
                                                       className={` min-h-full relative h-[40px] py-[6px] px-[11px] text-[16px] w-full inline-block leading-normal border-[1px] duration-300 transition-all bg-white outline-none focus:outline-none ring-0 border-borderColor rounded-lg`}/>
                                                   <span
                                                       className={`absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer`}
                                                       onClick={() => setShowPassword(!showPassword)}>
                                                        {
                                                            showPassword ?
                                                                <AiFillEye className={`w-9 h-9 text-[#000000a6]`}/> :
                                                                <AiFillEyeInvisible className={`w-9 h-9 text-[#000000a6]`}/>
                                                        }
                                                </span>
                                            </span>
                                        </div>

                                        <button onClick={handleSignIn}
                                                className={`w-full mt-[15px] h-[40px] px-[15px] text-[16px] rounded-lg duration-300 bg-lightGreenColor hover:bg-lime-600 text-white`}>
                                            Sign in
                                        </button>
                                    </form>

                                    <div
                                        className={`text-[16px] table text-center my-[16px] after:relative after:content-[''] after:translate-y-1/2 after:w-1/2 after:top-1/2 after:table-cell after:border-t-[0.5px] after:border-borderColor before:relative before:content-[''] before:translate-y-1/2 before:w-1/2 before:top-1/2 before:table-cell before:border-t-[1px] before:border-t-borderColor`}>
                                        <span className={`text-[13px] px-[10px]`}>OR</span>
                                    </div>
                                    <p className={`signup`}>Don't have an account? <a
                                        className={`text-lightGreenColor cursor-pointer`}
                                        onClick={handleToggleModal}>Sign
                                        up</a>
                                    </p>
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;