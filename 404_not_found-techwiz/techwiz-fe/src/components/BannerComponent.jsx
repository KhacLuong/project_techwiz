import React from 'react';
import Breadcrumb from "./Breadcrumb.jsx";

const BannerComponent = ({listBreadcrumb}) => {
    return (
        <section className={`bg-[url('/src/assets/image/wallpaper/footer.png')] bg-no-repeat  flex bg-cover items-center p-[120px_0px_60px_0] min-h-[250px] w-full`}>
            <div className={`md:px-[15px] max-w-[1280px] my-0 mx-auto`}>
                <Breadcrumb dataBreadcrumb={listBreadcrumb}/>
            </div>
        </section>
    );
};

export default BannerComponent;