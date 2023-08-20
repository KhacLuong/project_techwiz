import React, {useContext, useEffect, useState, Fragment} from 'react';
import {useNavigate} from "react-router-dom";
import {Context} from "../context/ContextProvider.jsx";
import {Dialog, Transition} from '@headlessui/react'
import {HiXMark} from "react-icons/hi2";
import {IoCloseSharp} from "react-icons/io5";
import {FaMinus} from "react-icons/fa";
import {handleFormatPriceToUSD} from "../utils/helper.jsx";

const CartModal = () => {
    const {dispatchCart, openCartModal, setOpenCartModal, isAuthenticated, cartProduct, userId, setOpenLoginModal} = useContext(Context);
    const [hoverImg, setHoverImg] = useState(false);
    const [listProduct, setListProduct] = useState([])
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        let price = 0
        cartProduct.cart.forEach(item => {
            if (item?.sale) {
                price += item.priceAfterSale * item.qty
            } else {
                price += item.priceDefault * item.qty
            }
        })
        setTotal(price);
        setListProduct(cartProduct.cart)
    }, [cartProduct, total])

    const handleGoCartPage = () => {
        if (isAuthenticated) {
            setOpenCartModal(false)
            // navigate("/v1/user/cart")
        } else {
            setOpenCartModal(false)
            setOpenLoginModal(true)
        }
    }
    const handleViewCheckout = () => {
        if (isAuthenticated) {
            setOpenCartModal(false)
            // navigate(`/v1/user/checkout`)
        } else {
            setOpenCartModal(false)
            setOpenLoginModal(true)
        }
    }
    const handleViewProduct = (item) => {
        setOpenCartModal(false)
        navigate(`/v1/products/${item.slug}`, {
            state: {
                productId: item.id,
                productName: item.productName,
            }
        })
    }

    return (
        <Transition.Root show={openCartModal} as={Fragment}>
            <Dialog as="div" className="relative z-[105]" onClose={setOpenCartModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-zinc-900 bg-opacity-75 transition-opacity"/>
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full sm:pl-10 pl-0">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-300 sm:duration-500"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-300 sm:duration-500"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto relative w-screen sm:max-w-2xl">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-500"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-500"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute top-3 right-6 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                                            <button
                                                type="button"
                                                className="flex items-center rounded-md text-gray-300 hover:text-blackColor focus:outline-none focus:ring-2 focus:ring-white"
                                                onClick={() => setOpenCartModal(false)}
                                            >
                                                <HiXMark className="h-9 w-9 text-black" aria-hidden="true"/>
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div className="flex h-full flex-col bg-white py-8 shadow-xl">
                                        <div className="px-4 sm:px-6">
                                            <Dialog.Title className="text-4xl font-medium text-gray-900">Shopping
                                                cart</Dialog.Title>
                                        </div>
                                        <div className="relative mt-6 flex-1 px-4 sm:px-6 overflow-y-auto h-full">
                                            <div className={`flex items-start flex-col h-full`}>
                                                <ul className={`w-full px-4 sm:px-6 ${listProduct.length !== 0 ? 'border-2 border-dashed border-gray-200' : ''} `}>
                                                    {
                                                        listProduct && listProduct.length > 0 && listProduct.map((item, index) => {
                                                            return <li key={index}
                                                                       className={`last:border-b-0 py-4 border-b-[1px] border-borderColor relative`}>
                                                                <div className={`w-full flex items-center`}>
                                                                    <a onMouseOver={() => setHoverImg(true)}
                                                                       onMouseLeave={() => setHoverImg(false)}
                                                                       className={`cursor-pointer group/image max-w-[80px] mr-3`}>
                                                                        <img alt={item?.productName}
                                                                             onClick={() => handleViewProduct(item)}
                                                                             src={item?.imagePath}
                                                                             className={`rounded-[10px] max-w-[80px]`}/>
                                                                    </a>
                                                                    <div className={`w-full`}>
                                                                        <h3 onClick={() => handleViewProduct(item)}
                                                                            className={`${hoverImg ? 'text-lightGreenColor ' : ''} duration-300 hover:text-lightGreenColor line-clamp-2 text-3xl cursor-pointer w-full mb-4`}>{item?.productName}</h3>
                                                                        <p className={`text-2xl mb-2`}>Category: <span
                                                                            className={`hover:text-dangerColor-default_2 hover:underline duration-300 font-light cursor-pointer`}>{item.category.categoryName}</span>
                                                                        </p>
                                                                        <p className={`text-2xl mb-2`}>Brand: <span
                                                                            className={`hover:text-dangerColor-default_2 hover:underline duration-300 font-light cursor-pointer`}>{item?.brand?.brandName}</span>
                                                                        </p>
                                                                        <p className={`text-2xl mb-6`}>Type: <span
                                                                            className={`hover:text-dangerColor-default_2 hover:underline duration-300 font-light cursor-pointer`}>{item?.type?.typeName}</span>
                                                                        </p>
                                                                        <p className={`price flex items-center`}>
                                                                            <span
                                                                                className={`font-medium text-lightGreenColor`}>
                                                                                {
                                                                                    handleFormatPriceToUSD(item.sale ? item.priceAfterSale : item.priceDefault)
                                                                                }
                                                                            </span>
                                                                            <IoCloseSharp
                                                                                className={`mx-2`}/>
                                                                            <span className={`font-semiBold`}>{item.qty}</span>
                                                                        </p>
                                                                    </div>
                                                                    <button onClick={() => dispatchCart({
                                                                        type: 'REMOVE',
                                                                        payload: {id: item.id}
                                                                    })}
                                                                            className={`bg-dangerColor-default_2 hover:bg-dangerColor-hover_2 duration-300 text-whiteColor text-lg rounded-md py-1 px-1 mx-2`}>
                                                                        <FaMinus className={`text-white w-7 h-7`}/>
                                                                    </button>
                                                                </div>
                                                            </li>
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                        <div className={`relative mt-6 px-4 sm:px-6`}>
                                            <div>
                                                <div className={`flex font-semiBold justify-between items-center capitalize text-4xl mb-4`}>
                                                    <div>subtotal:</div>
                                                    <div>{handleFormatPriceToUSD(total)}</div>
                                                </div>
                                                <div className={`capitalize text-3xl text-white flex flex-col text-center`}>
                                                    <div onClick={handleGoCartPage}
                                                         className={`duration-300 cursor-pointer bg-lightGreenColor my-3 py-3 rounded-2xl hover:bg-lime-600`}>
                                                        view cart
                                                    </div>
                                                    <div onClick={() => handleViewCheckout(userId)}
                                                         className={`duration-300 cursor-pointer bg-dangerColor-default_2 py-3 rounded-2xl hover:bg-dangerColor-hover_2`}>checkout
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>

            </Dialog>
        </Transition.Root>
    );
};

export default CartModal;