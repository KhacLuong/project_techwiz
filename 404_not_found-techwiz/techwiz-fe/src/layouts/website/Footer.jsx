import React from 'react';
import {ImLocation2} from "react-icons/im";
import {MdEmail, MdLocationOn, MdPhone} from "react-icons/md";
import {FaFacebookSquare, FaPhoneAlt, FaTwitter, FaYoutube} from "react-icons/fa";
import {FaSquareInstagram} from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className={`bg-[url('/src/assets/image/wallpaper/footer.png')] bg-cover bg-center lg:pb-0 pb-[70px] float-left w-full`}>
            <div className={`p-[100px_15px_50px_15px] block mt-0 relative max-w-[1280px] my-0 mx-auto`}>
                <div className={`lg:flex wrap text-[#b2b2b2] grid grid-cols-2`}>
                    <div className={`lg:w-1/4 w-full pr-[15px] mb-[35px] 3xs:col-span-1 col-span-2`}>
                        <h2 className={`text-[#ffffff] mt-0 text-[18px] font-medium capitalize mb-[30px] pb-[25px] relative after:content-[''] after:absolute after:bg-lightGreenColor after:w-[60px] after:h-[2px] after:top-[45px] after:left-0 after:right-auto`}>Policies
                            & Info</h2>
                        <ul className={`text-white`}>
                            <li className={`pb-[8px]`}>Policy For Buyer</li>
                            <li className={`pb-[8px]`}>Policy For Seller</li>
                            <li className={`pb-[8px]`}>Shipping & Refund</li>
                        </ul>
                    </div>
                    <div className={`lg:w-1/4 w-full pr-[15px] mb-[35px] 3xs:col-span-1 col-span-2`}>
                        <h2 className={`text-[#ffffff] mt-0 text-[18px] font-medium capitalize mb-[30px] pb-[25px] relative after:content-[''] after:absolute after:bg-lightGreenColor after:w-[60px] after:h-[2px] after:top-[45px] after:left-0 after:right-auto`}>Information</h2>
                        <ul className={`text-white`}>
                            <li className={`pb-[8px]`}>Contact</li>
                            <li className={`pb-[8px]`}>Shipping</li>
                            <li className={`pb-[8px]`}>Sitemap</li>
                            <li className={`pb-[8px]`}>FAQs</li>
                            <li className={`pb-[8px]`}>Support</li>
                        </ul>
                    </div>
                    <div className={`lg:w-1/4 w-full pr-[15px] mb-[35px] 3xs:col-span-1 col-span-2`}>
                        <h2 className={`text-[#ffffff] mt-0 text-[18px] font-medium capitalize mb-[30px] pb-[25px] relative after:content-[''] after:absolute after:bg-lightGreenColor after:w-[60px] after:h-[2px] after:top-[45px] after:left-0 after:right-auto`}>Quick Links</h2>
                        <ul className={`text-white`}>
                            <li className={`pb-[8px]`}>Delivery Information</li>
                            <li className={`pb-[8px]`}>About Us</li>
                            <li className={`pb-[8px]`}>Terms And Conditions</li>
                            <li className={`pb-[8px]`}>Privacy Policy</li>
                        </ul>
                    </div>
                    <div className={`lg:w-1/4 w-full mb-[35px] 3xs:col-span-1 col-span-2`}>
                        <h2 className={`text-[#ffffff] mt-0 text-[18px] font-medium capitalize mb-[30px] pb-[25px] relative after:content-[''] after:absolute after:bg-lightGreenColor after:w-[60px] after:h-[2px] after:top-[45px] after:left-0 after:right-auto`}>Contact Us</h2>
                        <ul className={`flex flex-col justify-start text-white`}>
                            <li className={`inline-flex items-center pb-[10px]`}>
                                <MdLocationOn className={`text-lightGreenColor w-8 h-8 mr-4`}/>
                                <span className={``}>Số 8, Tôn Thất Thuyết, Mỹ Đình, Từ Liêm, Hà Nội</span>
                            </li>
                            <li className={`inline-flex items-center pb-[20px]`}>
                                <MdEmail className={`text-lightGreenColor w-8 h-8 mr-4`}/>
                                <span className={``}>404_not_found@gmail.com</span>
                            </li>
                            <li className={`inline-flex items-center pb-[10px]`}>
                                <MdPhone className={`text-lightGreenColor w-8 h-8 mr-4`}/>
                                <span className={``}>(+91)012-345-6789</span>
                            </li>
                        </ul>
                        <ul className={`mt-[20px] flex`}>
                            <li className={`w-14 h-14 bg-[#777777] rounded-full flex items-center text-white justify-center mr-4`}>
                                <FaTwitter className={`h-7 w-7`}/>
                            </li>
                            <li className={`w-14 h-14 bg-[#777777] rounded-full flex items-center text-white justify-center mr-4`}>
                                <FaFacebookSquare className={`h-7 w-7`}/>
                            </li>
                            <li className={`w-14 h-14 bg-[#777777] rounded-full flex items-center text-white justify-center mr-4`}>
                                <FaSquareInstagram className={`h-7 w-7`}/>
                            </li>
                            <li className={`w-14 h-14 bg-[#777777] rounded-full flex items-center text-white justify-center mr-4`}>
                                <FaYoutube className={`h-7 w-7`}/>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={`w-full border-t-[0.5px] border-t-borderColor py-[25px]`}>
                <div className={`text-[#b2b2b2] flex w-full mx-auto items-center xl:max-w-[1280px]`}>
                    <div className={`xs:px-[15px]`}>
                        <span>© 2023, PlantNest - Plant Store</span>
                        <span className="copyright__content">Powered by Aptech</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;