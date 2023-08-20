import React from 'react';
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import {Outlet} from "react-router-dom";

const CmsLayout = () => {
    return (
        <section>
            <nav className={`fixed z-20 w-full bg-gray-50`}>
                <Navbar/>
            </nav>
            <div className={`flex overflow-hidden bg-white pt-16 h-screen`}>
                <aside id={`sidebar`}
                       className={`flex fixed top-0 left-0 z-10 flex-col flex-shrink-0 w-96 max-w-full h-full duration-200 lg:flex transition-width border-r-[1px] border-r-borderColor mt-44`}
                       aria-label={`Sidebar`}>
                    <Sidebar/>
                </aside>
                <div id={`main-content`} className={`h-full mt-28 w-full bg-gray-50 relative overflow-y-scroll lg:ml-96`}>
                    <Outlet/>
                </div>
            </div>
        </section>
    );
};

export default CmsLayout;