import React from 'react';
import {AiOutlineHome} from "react-icons/ai";
import {Link} from "react-router-dom";
import {RiArrowRightSLine} from "react-icons/ri";
import {FaHome} from "react-icons/fa";

const Breadcrumb = ({dataBreadcrumb}) => {
    return (
        <nav className={`flex w-full mb-5`}>
            <ol className={`inline-flex items-center space-x-1 md:space-x-2`}>
                {
                    dataBreadcrumb.map((item, index) => {
                        return (
                            <li key={`breadcrumb-${index}`} className={index === 0 ? 'inline-flex items-center' : ''}>
                                {
                                    index === 0 ?
                                        <Link to={item?.path} state={item?.data}
                                              className={`inline-flex text-2xl items-center text-white hover:text-lightGreenColor font-semibold duration-300`}>
                                            <FaHome className={`w-9 h-9 mr-2`}/>
                                            {item.name}
                                        </Link> :
                                        <div className={`flex items-center `}>
                                            <RiArrowRightSLine className={`w-9 h-9 text-white`}/>
                                            {
                                                index + 1 === dataBreadcrumb.length ?
                                                    <span
                                                        className="ml-1 text-2xl font-medium text-white md:ml-2">{item.name}</span> :
                                                    <Link to={item?.path} state={item?.data}
                                                          className={`ml-1 text-2xl hover:text-lightGreenColor font-medium text-white duration-300 md:ml-2`}>{item.name}</Link>
                                            }
                                        </div>
                                }
                            </li>
                        )
                    })
                }
            </ol>
        </nav>
    );
};

export default Breadcrumb;