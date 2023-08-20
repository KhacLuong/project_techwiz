import React, {useEffect} from 'react';
import Banner from "./Banner.jsx";
import InfoArea from "./InfoArea.jsx";
import PopularCategory from "./PopularCategory.jsx";
import Blogs from "./Blogs.jsx";
import Testimonial from "./Testimonial.jsx";
import Subscribe from "../../../components/Subscribe.jsx";
import TrendingProduct from "./TrendingProduct.jsx";
import SpecialProduct from "./SpecialProduct.jsx";

const HomePage = () => {
    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, [])
    return (
        <>
            <Banner/>
            {/*<InfoArea/>*/}
            {/*<PopularCategory/>*/}
            <TrendingProduct/>
            <SpecialProduct/>
            <Testimonial/>
            <Blogs/>
            <Subscribe/>
        </>
    );
};

export default HomePage;