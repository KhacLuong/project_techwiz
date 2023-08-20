import React, {useEffect, useState} from 'react';
import {validateForm} from "../../../utils/helper.jsx";
import moment from "moment";
import {messageEn} from "../../../utils/message-en.jsx";
import {formInfoProfileUser} from "../../../utils/validateRules.jsx";
import {fetchGetUserById, fetchPutUserUpdateInfo} from "../../../redux/slices/userSlice.jsx";
import {toast} from "react-toastify";

const MyInfo = ({userId, dispatch}) => {
    const [formState, setFormState] = useState({
        id: 0,
        fullName: "",
        phoneNumber: "",
        dateOfBirth: "",
        gender: "",
        email: ""
    })
    const [errorFullName, setErrorFullName] = useState("")
    const [isChangePassword, setIsChangePassword] = useState(false)

    useEffect(() => {
        if (userId) {
            const test = async () => {
                const res = await dispatch(fetchGetUserById({id: userId})).unwrap()
                console.log(res)
                if (res && res.code === 200) {
                    setFormState(prevState => ({
                        ...prevState,
                        id: res?.data?.id,
                        phoneNumber: res?.data?.phoneNumber,
                        fullName: res?.data?.fullName,
                        dateOfBirth: moment(res?.data?.dateOfBirth).format("YYYY-MM-DD"),
                        gender: res?.data?.gender,
                        email: res?.data?.email
                    }))
                }
            }
            test()
        }
    }, [userId])
    const handleInputChange = (e) => {
        const {name, value} = e.target
        if (name === 'fullName' && value === "") {
            setErrorFullName(messageEn.errors.name.isEmpty)
        } else if (name === 'fullName' && value !== "") {
            setErrorFullName("")
        }
        setFormState(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }
    const handleSelectChange = (selectedOption) => {
        setFormState((preState) => ({
            ...preState,
            gender: selectedOption.target.value,
        }));
    }
    const handleSaveInfoUser = async () => {
        // const errors = validateForm(formState, formInfoProfileUser)
        // if (!(Object.keys(errors).length === 0)) {
        //     setErrorFullName(errors.fullName)
        // } else {
        //     setErrorFullName("")
        //     const data = {
        //         id: formState.id,
        //         fullName: formState.fullName,
        //         gender: formState.gender,
        //         dateOfBirth: formState.dateOfBirth,
        //         email: formState.email,
        //         phoneNumber: formState.phoneNumber
        //     }
        //     const res = await dispatch(fetchPutUserUpdateInfo({data})).unwrap()
        //     if (res && res.code === 200) {
        //         toast.success(`Cập nhật thành công`)
        //     } else {
        //         toast.error(res.message)
        //     }
        // }
    }
    return (
        <div className={`h-full flex flex-col`}>
            <div className={`mb-[16px] flex-col flex`}>
                <label htmlFor={`phoneNumber`} className={`mb-[4px] text-[14px]`}>
                    Phone number
                </label>
                <input type={`text`} id={`phoneNumber`} name={`phoneNumber`}
                       defaultValue={formState.phoneNumber} readOnly={true} disabled={true}
                       className={`cursor-not-allowed relative inline-block w-full h-32px py-[4px] px-[11px] text-[14px] leading-normal border-[1px] border-[#d9d9d9] rounded text-[#00000040] bg-[#f5f5f5]`}/>
            </div>
            <div className={`mb-[16px] flex-col flex`}>
                <label htmlFor={`email`} className={`mb-[4px] text-[14px]`}>
                    Email
                </label>
                <input type={`text`} id={`email`} name={`email`}
                       defaultValue={formState.email} readOnly={true} disabled={true}
                       className={`cursor-not-allowed relative inline-block w-full h-32px py-[4px] px-[11px] text-[14px] leading-normal border-[1px] border-[#d9d9d9] rounded text-[#00000040] bg-[#f5f5f5]`}/>
            </div>
            <div className={`mb-[16px] flex-col flex`}>
                <label htmlFor={`fullName`} className={`mb-[4px] text-[14px]`}>Full name <span
                    className={`text-dangerColor-default_2`}>*</span></label>
                <input id={`fullName`} type={`text`} name={`fullName`}
                       autoComplete={`off`}
                       value={formState.fullName}
                       className={`relative inline-block w-full h-32px py-[4px] px-[11px] text-[14px] leading-normal bg-white border-[1px] border-[#d9d9d9] rounded text-[#000000a6]`}
                       onChange={handleInputChange}/>
                {
                    errorFullName && errorFullName.length > 0
                        ? <span
                            className={`text-dangerColor-default_2 text-[13px] mt-1.5`}>{errorFullName}</span>
                        : null
                }
            </div>
            <div className={`mb-[16px] grid grid-cols-2 gap-8`}>
                <div>
                    <label htmlFor={`dateOfBirth`} className={`mb-[4px] text-[14px]`}>Birthday</label>
                    <input id={`dateOfBirth`} type={`date`} name={`dateOfBirth`} value={formState.dateOfBirth}
                           className={`relative inline-block w-full h-32px py-[4px] px-[11px] text-[14px] leading-normal bg-white border-[1px] border-[#d9d9d9] rounded text-[#000000a6]`}
                           onChange={handleInputChange}/>
                </div>
                <div className={`flex  flex-col w-full`}>
                    <label htmlFor={`gender`} className={`mb-[4px] text-[14px]`}>Gender</label>
                    <select id={`gender`} name={`gender`}
                            className={` relative inline-block h-32px py-[4px] px-[11px] text-[14px] leading-normal bg-white border-[1px] border-[#d9d9d9] rounded text-[#000000a6]`}
                            value={formState.gender} onChange={handleSelectChange}>
                        <option value={"Male"}>Male</option>
                        <option value={"Female"}>Female</option>
                        <option value={"Other"}>Other</option>
                    </select>
                </div>
            </div>

            <div className={`group relative z-0 w-full mb-4`}>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" onClick={() => setIsChangePassword(!isChangePassword)} value={""} className="sr-only peer"/>
                    <div
                        className="w-20 h-9 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-[140%]  after:content-[''] after:absolute after:top-[2px] after:left-[0px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-8 after:w-8 after:transition-all peer-checked:bg-blue-600"></div>
                    <span
                        className="ml-3  text-[#000000a6] font-medium">Change password?</span>
                </label>
            </div>
            <div className={`mt-auto pt-[16px] border-t-[1px] border-t-borderColor`}>
                <button onClick={handleSaveInfoUser}
                        className={`w-full text-white bg-lightGreenColor hover:bg-lime-600 shadow-md h-[40px] px-[14px] text-[16px] rounded-xl duration-300`}>Update
                </button>
            </div>
        </div>
    );
};

export default MyInfo;