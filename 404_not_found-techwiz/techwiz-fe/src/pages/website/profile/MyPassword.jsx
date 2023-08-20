import React, {useContext, useState} from 'react';
import {messageEn} from "../../../utils/message-en.jsx";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import {fetchChangePassword} from "../../../redux/slices/userSlice.jsx";
import {toast} from "react-toastify";
import {fetchLogout} from "../../../redux/slices/authSlice.jsx";
import {useNavigate} from "react-router-dom";
import {Context} from "../../../context/ContextProvider.jsx";

const MyPassword = ({userId, dispatch}) => {
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        id: 0,
        oldPassword: "",
        newPassword: "",
    })
    const {dispatchCart, dispatchCompare
    } = useContext(Context);
    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const handleInputChange = (e) => {
        const {name, value} = e.target
        setFormState(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const handleUpdatePassword = async () => {
        const data = {
            id: userId,
            oldPassword: formState.oldPassword,
            newPassword: formState.newPassword
        }
        const res = await dispatch(fetchChangePassword({data})).unwrap()
        console.log(res)
        if (res && res.code === 200) {
            toast.success(res.message)
            const res = await dispatch(fetchLogout()).unwrap()
            if (res && res.code === 200) {
                navigate("")
                toast.success(res.message)
                dispatchCart({type: 'REMOVE_ALL_ITEMS'})
                dispatchCompare({type: 'REMOVE_ALL_ITEMS'})
                setFormState({
                    id: 0,
                    oldPassword: "",
                    newPassword: "",
                })
            }
        } else {
            toast.error(res.message)
        }
    }

    return (
        <div className={`h-full flex flex-col`}>
            <div className={`group relative z-0 w-full mb-4`}>
                <div className="mt-6 w-1/3">
                    <label htmlFor={`oldPassword`} className={`text-[14px] leading-normal`}>
                        Old Password <span className={`text-dangerColor-default_2`}>*</span>
                    </label>
                    <span
                        className={`p-0 m-0 mt-2 mb-0.5 text-[14px] leading-normal relative inline-block w-full text-start`}>
                            <input id={`oldPassword`} value={formState.oldPassword}
                                   name={`oldPassword`} onChange={handleInputChange}
                                   autoComplete={`off`}
                                   type={showOldPassword ? 'text' : 'password'}
                                   className={`min-h-full relative h-[40px] py-[6px] px-[11px] text-[16px] w-full inline-block leading-normal border-[1px] duration-300 transition-all bg-white outline-none focus:outline-none ring-0 border-borderColor rounded-lg`}/>
                          <span
                              className={`absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer`}
                              onClick={() => setShowOldPassword(!showOldPassword)}>
                                                {
                                                    showOldPassword ?
                                                        <AiFillEye className={`w-9 h-9 text-[#000000a6]`}/> :
                                                        <AiFillEyeInvisible className={`w-9 h-9 text-[#000000a6]`}/>
                                                }
                        </span>
                        </span>
                </div>
                <div className="mt-6 w-1/3">
                    <label htmlFor={`newPassword`} className={`text-[14px] leading-normal`}>
                        Confirm Password <span className={`text-dangerColor-default_2`}>*</span>
                    </label>
                    <span
                        className={`p-0 m-0 mt-2 mb-0.5 text-[14px] leading-normal relative inline-block w-full text-start`}>
                            <input id={`newPassword`} value={formState.newPassword}
                                   name={`newPassword`} onChange={handleInputChange}
                                   autoComplete={`off`}
                                   type={showNewPassword ? 'text' : 'password'}
                                   className={`min-h-full relative h-[40px] py-[6px] px-[11px] text-[16px] w-full inline-block leading-normal border-[1px] duration-300 transition-all bg-white outline-none focus:outline-none ring-0 border-borderColor rounded-lg`}/>
                        <span
                            className={`absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer`}
                            onClick={() => setShowNewPassword(!showNewPassword)}>
                                                {
                                                    showNewPassword ?
                                                        <AiFillEye className={`w-9 h-9 text-[#000000a6]`}/> :
                                                        <AiFillEyeInvisible className={`w-9 h-9 text-[#000000a6]`}/>
                                                }
                        </span>
                    </span>
                </div>
            </div>
            <div className={`mt-auto w-1/3 pt-[16px] border-t-[1px] border-t-borderColor`}>
                <button onClick={handleUpdatePassword}
                        className={`w-full text-white bg-lightGreenColor hover:bg-lime-600 shadow-md h-[40px] px-[14px] text-[16px] rounded-xl duration-300`}>
                    Update
                </button>
            </div>
        </div>
    );
};

export default MyPassword;