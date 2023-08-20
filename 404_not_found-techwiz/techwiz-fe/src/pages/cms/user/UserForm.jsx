import React, {useEffect, useRef, useState} from 'react';
import moment from "moment";
import {useLocation, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import useDocumentTitle from "../../../hooks/useDocumentTitle.jsx";
import {
    handleOpenFileInput, validateConfirmPassword,
    validateEmail, validateEmpty, validateFile,
    validateForm, validateLengthOfString, validatePhoneNumber
} from "../../../utils/helper.jsx";
import {messageEn} from "../../../utils/message-en.jsx";
import {fetchRegister} from "../../../redux/slices/authSlice.jsx";
import {useDispatch} from "react-redux";
import {fetchGetUserById, fetchUpdateUser} from "../../../redux/slices/userSlice.jsx";

const initialUserFormState = {
    email: "",
    phoneNumber: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    role: ""
}
const formUserValidationRules = [
    {
        fieldName: "email",
        validationFn: validateEmail,
        errorMessage: messageEn.errors.email.isInvalid
    },
    {
        fieldName: "fullName",
        validationFn: validateEmpty,
        errorMessage: messageEn.errors.name.isEmpty
    },
    {
        fieldName: "phoneNumber",
        validationFn: validatePhoneNumber,
        errorMessage: messageEn.errors.phoneNumber.isInvalid
    },
    {
        fieldName: "role",
        validationFn: validateEmpty,
        errorMessage: messageEn.errors.role.isEmpty
    },
]

const UserForm = () => {
    useDocumentTitle("Add user", true)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const id = useLocation().state?.id
    const [disableButton, setDisableButton] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [formState, setFormState] = useState(initialUserFormState)
    const [errorFullName, setErrorFullName] = useState("")
    const [errorEmail, setErrorEmail] = useState("")
    const [errorRole, setErrorRole] = useState("")
    const [errorPhoneNumber, setErrorPhoneNumber] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("")

    useEffect(() => {
        if (id) {
            const test = async () => {
                const res = await dispatch(fetchGetUserById({id})).unwrap()
                console.log(res)
                if (res) {
                    if (res.code === 200) {
                        setFormState(prevState => ({
                            ...prevState,
                            fullName: res.data.fullName,
                            email: res.data.email,
                            phoneNumber: res.data.phoneNumber,
                            role: res.data.role
                        }))
                    } else {
                        toast.error(res.message)
                    }
                }
            }
            test()
        }
    }, [id])

    const handleTogglePassword = () => {
        setShowPassword((showPassword) => !showPassword)
    }
    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword)
    }
    const handleSelectChange = (event) => {
        const {name, value} = event.target
        setErrorRole("")
        setFormState((preState) => ({
            ...preState,
            [name]: value
        }));
    }
    const handleInputChange = (event) => {
        const {name, value} = event.target
        if (name === 'email') {
            setErrorEmail("")
        } else if (name === 'fullName') {
            setErrorFullName("")
        } else if (name === 'phoneNumber') {
            setErrorPhoneNumber("")
        } else if (name === 'password') {
            setErrorPassword("")
        }else if (name === 'confirmPassword') {
            setErrorConfirmPassword("")
        }
        setFormState((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleSubmitForm = async e => {
        e.preventDefault()
        setDisableButton(true)
        const errors = validateForm(formState, formUserValidationRules)
        const passwordLengthError = validateLengthOfString(formState.password, 6, 100)
        const confirmPasswordError = validateConfirmPassword(formState.password, formState.confirmPassword)
        if (!id) {
            if (passwordLengthError && !id) {
                errors.password = passwordLengthError
            }
            if (confirmPasswordError && !id) {
                errors.confirmPassword = confirmPasswordError
            }
        }

        if (!(Object.keys(errors).length === 0)) {
            setErrorFullName(errors.fullName)
            setErrorEmail(errors.email)
            setErrorRole(errors.role)
            setErrorPhoneNumber(errors.phoneNumber)
            setErrorPassword(errors.password)
            setErrorConfirmPassword(errors.confirmPassword)
            setDisableButton(false)
        } else {
            setErrorFullName("")
            setErrorEmail("")
            setErrorRole("")
            setErrorPhoneNumber("")
            setErrorPassword("")
            setErrorConfirmPassword("")

            if (id) {
                const data = {
                    id: id,
                    email: formState.email,
                    phoneNumber: formState.phoneNumber,
                    role: formState.role,
                    fullName: formState.fullName,
                }
                const res = await dispatch(fetchUpdateUser({data})).unwrap()
                if (res && res.code === 200) {
                    navigate("/admin/v1/cms/users/list")
                    setDisableButton(false)
                    toast.success(res.message)
                } else {
                    setDisableButton(false)
                }
            } else {
                const data = {
                    email: formState.email,
                    password: formState.password,
                    phoneNumber: formState.phoneNumber,
                    role: formState.role,
                    fullName: formState.fullName,
                }
                const res = await dispatch(fetchRegister({data})).unwrap()
                if (res && res.code === 201) {
                    navigate("/admin/v1/cms/users/list")
                    setDisableButton(false)
                    toast.success(res.message)
                } else {
                    setDisableButton(false)
                }
            }

        }
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
                                <input type="email"
                                       name="email"
                                       id="email"
                                       className="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:botext-lightGreenColor peer"
                                       placeholder=" "
                                       autoComplete={`off`}
                                       required
                                       onChange={handleInputChange}
                                       value={formState.email}/>
                                <label htmlFor="email"
                                       className="peer-focus:font-medium absolute  text-gray-500 duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-lightGreenColor  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Email
                                </label>
                                {
                                    errorEmail && errorEmail.length > 0
                                        ? <span className={`text-dangerColor-default_2 `}>{errorEmail}</span>
                                        : null
                                }
                            </div>
                            <div className={`group relative z-0 w-full mb-12`}>
                                <input type="text"
                                       name="fullName"
                                       id="fullName"
                                       className="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:botext-lightGreenColor peer"
                                       placeholder=" "
                                       autoComplete={`off`}
                                       required
                                       onChange={handleInputChange}
                                       value={formState.fullName}/>
                                <label htmlFor="fullName"
                                       className="peer-focus:font-medium absolute  text-gray-500 duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-lightGreenColor peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Full name
                                </label>
                                {
                                    errorFullName && errorFullName.length > 0
                                        ? <span className={`text-dangerColor-default_2 `}>{errorFullName}</span>
                                        : null
                                }
                            </div>
                            <div className={`group relative z-0 w-full mb-12`}>
                                <input type="text"
                                       name="phoneNumber"
                                       id="phoneNumber"
                                       className="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:botext-lightGreenColor peer"
                                       placeholder=" "
                                       autoComplete={`off`}
                                       required
                                       onChange={handleInputChange}
                                       value={formState.phoneNumber}/>
                                <label htmlFor="phoneNumber"
                                       className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-lightGreenColor peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Phone number
                                </label>
                                {
                                    errorPhoneNumber && errorPhoneNumber.length > 0
                                        ? <span className={`text-dangerColor-default_2 `}>{errorPhoneNumber}</span>
                                        : null
                                }
                            </div>
                            <div className={`group relative z-0 w-full mb-12`}>
                                <label htmlFor="role"
                                       className="block mb-2  font-medium text-gray-500">
                                    Choose role
                                </label>
                                <select id="role"
                                        className="bg-gray-50 border border-gray-300 text-gray-500 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        name={"role"}
                                        value={formState.role}
                                        onChange={handleSelectChange}>
                                    <option value={""}>-- Chọn --</option>
                                    <option value={"ADMIN"}>ADMIN</option>
                                    <option value={"USER"}>USER</option>
                                </select>
                                {
                                    errorRole && errorRole.length > 0
                                        ? <span className={`text-dangerColor-default_2 `}>{errorRole}</span>
                                        : null
                                }
                            </div>
                            {
                                !id ?
                                    <>
                                        <div className={`group relative z-0 w-full mb-12`}>
                                            <input type={showPassword ? "text" : "password"}
                                                   name="password"
                                                   id="password"
                                                   onChange={handleInputChange}
                                                   className="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:botext-lightGreenColor peer relative"
                                                   placeholder=" "
                                                   required
                                                   value={formState.password}
                                                   autoComplete={`off`}/>
                                            <span
                                                className={`absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer`}
                                                onClick={handleTogglePassword}>
                                                {
                                                    showPassword ?
                                                        <AiFillEye className={`w-8 h-8 text-darkColor`}/> :
                                                        <AiFillEyeInvisible className={`w-8 h-8 text-darkColor`}/>
                                                }
                                            </span>
                                            <label htmlFor="password"
                                                   className="peer-focus:font-medium absolute  text-gray-500 duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-lightGreenColor peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                                            {
                                                errorPassword && errorPassword.length > 0
                                                    ? <span className={`text-dangerColor-default_2 `}>{errorPassword}</span>
                                                    : null
                                            }
                                        </div>
                                        <div className={`group relative z-0 w-full mb-12`}>
                                            <input type={showConfirmPassword ? "text" : "password"}
                                                   name="confirmPassword"
                                                   id="confirmPassword"
                                                   className="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:botext-lightGreenColor peer"
                                                   placeholder=" "
                                                   required
                                                   onChange={handleInputChange}
                                                   value={formState.confirmPassword}
                                                   autoComplete={`off`}/>
                                            <span
                                                className={`absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer`}
                                                onClick={handleToggleConfirmPassword}>
                                                {
                                                    showConfirmPassword ?
                                                        <AiFillEye className={`w-8 h-8 text-darkColor`}/> :
                                                        <AiFillEyeInvisible className={`w-8 h-8 text-darkColor`}/>
                                                }
                                            </span>
                                            <label htmlFor="confirmPassword"
                                                   className="peer-focus:font-medium absolute  text-gray-500 duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-lightGreenColor peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                Confirm password
                                            </label>
                                            {
                                                errorConfirmPassword && errorConfirmPassword.length > 0
                                                    ? <span className={`text-dangerColor-default_2 `}>{errorConfirmPassword}</span>
                                                    : null
                                            }
                                        </div>
                                    </> :
                                    <></>
                            }
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

export default UserForm;