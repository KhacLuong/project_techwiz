import React, {useContext} from 'react';
import useDocumentTitle from "../../hooks/useDocumentTitle.jsx";
import {CUSTOMER_DOCUMENT_TITLE} from "../../utils/setting-data.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import FooterMobile from "./FooterMobile.jsx";
import {Outlet} from "react-router-dom";
import ScrollToTop from "../../components/ScrollToTop.jsx";
import Search from "./Search.jsx";
import Overlay from "../../components/Overlay.jsx";
import NavMobile from "./NavMobile.jsx";
import CartModal from "../../components/CartModal.jsx";
import LoginModal from "../../components/LoginModal.jsx";
const WebsiteLayout = () => {
    useDocumentTitle(CUSTOMER_DOCUMENT_TITLE, true)

    return (
        <section className={`relative`}>
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
            <FooterMobile/>
            <ScrollToTop/>
            <Search/>
            <NavMobile/>
            <Overlay/>
            <CartModal/>
            <LoginModal/>
        </section>
    );
};

export default WebsiteLayout;