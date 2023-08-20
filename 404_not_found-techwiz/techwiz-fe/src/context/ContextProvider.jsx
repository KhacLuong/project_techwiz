import React, {createContext, useEffect, useReducer, useState} from 'react';
import {useSelector} from "react-redux";
import AOS from "aos";
import 'aos/dist/aos.css';
import {compareProductReducer, INITIAL_STATE} from "../reducer/compareProductReducer.jsx";
import '@splidejs/splide/dist/css/splide.min.css'
import {CART_INITIAL_STATE, cartReducer} from "../reducer/cartReducer.jsx";

export const Context = createContext({});
const ContextProvider = ({children}) => {
    const account = useSelector(state => state.auth.account)
    const userId = useSelector(state => state.auth.account)?.user?.id
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const [compareProducts, dispatchCompare] = useReducer(compareProductReducer, INITIAL_STATE);
    const [cartProduct, dispatchCart] = useReducer(cartReducer, CART_INITIAL_STATE)

    const [openCartModal, setOpenCartModal] = useState(false)
    const [theme, setTheme] = useState("light")
    const [openSearch, setOpenSearch] = useState(false)
    const [showNavMobile, setShowNavMobile] = useState(false)
    const [openLoginModal, setOpenLoginModal] = useState(false)

    const handleThemeSwitch = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 0,
            easing: 'ease-in-out',
            delay: 0,
            mirror: false,
            disable: false,
        })
        AOS.refresh()
    }, [])


    useEffect(() => {
        if (showNavMobile || openSearch || openCartModal || openLoginModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [showNavMobile, openSearch, openCartModal, openLoginModal])

    useEffect(() => {
        localStorage.setItem('compareProducts', JSON.stringify(compareProducts.products));
    }, [compareProducts]);

    useEffect(() => {
        localStorage.setItem('cartProducts', JSON.stringify(cartProduct.cart))
    }, [cartProduct])
    const handleAddProductToCart = (product) => {
        setOpenCartModal(true)
        dispatchCart({type: 'ADD', payload: {data: product}})
    }

    return (
        <Context.Provider value={{
            isAuthenticated,
            theme,
            setTheme,
            openSearch,
            setOpenSearch,
            showNavMobile,
            setShowNavMobile,
            compareProducts,
            dispatchCompare,
            openLoginModal,
            setOpenLoginModal,
            userId,
            openCartModal,
            setOpenCartModal,
            cartProduct,
            dispatchCart,
            handleAddProductToCart
        }}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;