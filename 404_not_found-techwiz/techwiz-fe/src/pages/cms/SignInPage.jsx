import React, {useEffect, useState} from 'react';
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import space from "../../assets/image/wallpaper/footer.png"
import {validateEmail} from "../../utils/helper.jsx";
import {messageEn} from "../../utils/message-en.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchLogin} from "../../redux/slices/authSlice.jsx";
import {toast} from "react-toastify";
import useDocumentTitle from "../../hooks/useDocumentTitle.jsx";

const SignInPage = () => {
    useDocumentTitle("CMS - PlantNest", true)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [msg, setMsg] = useState("")
    const [isOpenForgetPassword, setIsOpenForgetPassword] = useState(false)

    const handleTogglePassword = () => {
        setShowPassword((showPassword) => !showPassword)
    }

    const checkValidateLogin = () => {
        const checkEmail = validateEmail(email)
        if (!checkEmail) {
            setMsg(messageEn.errors.email.isInvalid)
            return false;
        } else if (password.trim() === "") {
            setMsg(messageEn.errors.password.isEmpty)
            return false;
        } else if (password.trim().length < 6) {
            setMsg(messageEn.errors.password.isShort)
            return false;
        }
        return true;
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        if (isOpenForgetPassword) {
            if (res && res.code === 200) {
                toast.success(res.message)
                setIsOpenForgetPassword(false)
            } else {
                toast.error(res.message)
            }
        } else {
            if (!checkValidateLogin()) {
                return;
            }
            const data = {
                email: email,
                password: password
            }
            const res = await dispatch(fetchLogin({data})).unwrap()
            if (res && res.code === 200) {

                if (res.data.user.role === "ADMIN") {
                    toast.success(res.message)
                    navigate('/admin/v1/cms')
                } else {
                    toast.error("Tài khoản không có quyển truy cập")
                }
            } else {
                toast.error(res.message)
            }
        }
    }

    return (
        <section
            style={{
                backgroundImage: `url(${space})`,
                backgroundRepeat: `no-repeat`,
                backgroundSize: `cover`,
                backgroundPosition: `center`
            }}
            className={`min-h-screen`}
        >
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div
                    className="w-full md:max-w-4xl relative rounded-xl md:mt-0 sm:max-w-md xl:p-0 bg-[#423c5a80] shadow-signIn backdrop-blur-[50px] bg-blend-overlay">
                    <div className="p-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-center md:text-5xl text-white">
                            CMS - PlantNest
                            <div
                                className="my-12 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                <p className="mx-4 mb-0 text-center font-semibold text-white text-4xl">
                                    Sign In
                                </p>
                            </div>
                        </h1>
                        <form className="space-y-6 md:space-y-12">
                            <div className="relative mb-6">
                                <input
                                    type="text"
                                    className="block py-2.5 px-0 w-full  bg-transparent border-0 border-b-2 appearance-none text-white border-gray-300 focus:outline-none focus:ring-0 focus:border-lightGreenColor peer"
                                    id="email"
                                    placeholder={" "}
                                    autoComplete={`off`}
                                    required={true}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label
                                    htmlFor="email"
                                    className="peer-focus:font-medium absolute  text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-lightGreenColor peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6"
                                >Email
                                </label>
                            </div>
                            <div className="relative mb-6">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="block py-2.5 px-0 w-full  bg-transparent border-0 border-b-2 appearance-none text-white border-gray-300 focus:outline-none focus:ring-0 focus:border-lightGreenColor peer"
                                    id="password"
                                    autoComplete={`off`}
                                    placeholder={" "}
                                    required={true}
                                    onChange={(e) => setPassword(e.target.value)
                                    }
                                />
                                <span
                                    className={`absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer`}
                                    onClick={handleTogglePassword}>
                                    {
                                        showPassword ?
                                            <AiFillEye className={`w-8 h-8 text-white`}/> :
                                            <AiFillEyeInvisible className={`w-8 h-8 text-white`}/>
                                    }
                                </span>
                                <label
                                    htmlFor="password"
                                    className="peer-focus:font-medium absolute  text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-lightGreenColor peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6"
                                >Password
                                </label>
                            </div>
                            <button type="submit"
                                    className="w-full text-dark bg-white hover:bg-lime-600 hover:text-white duration-300 outline-none ring-0 border-none font-medium rounded-xl py-6 text-center text-2xl"
                                    onClick={handleLogin}>
                                Sign In
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignInPage;