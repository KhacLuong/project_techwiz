import {FiUsers} from "react-icons/fi";
import {RiProductHuntFill} from "react-icons/ri";
import {BiCategory} from "react-icons/bi";

export const ADMIN_DOCUMENT_TITLE = "CMS - PlantNest"
export const CUSTOMER_DOCUMENT_TITLE = "PlantNest"
export const FINAL_URL_ADMIN = "/admin/v1/cms"
export const FINAL_URL_CUSTOMER = "/v1"

export const navbar = [
    {
        name: "Home",
        isSubcategory: true,
        url: `${FINAL_URL_CUSTOMER}`,
        icon: <></>,
    },
    {
        name: "All Products",
        isSubcategory: true,
        url: `${FINAL_URL_CUSTOMER}/products`,
        icon: <></>,
    },
    {
        name: "About Us",
        isSubcategory: true,
        url: `${FINAL_URL_CUSTOMER}/about-us`,
        icon: <></>,
    },
    {
        name: "Blogs",
        isSubcategory: true,
        url: `${FINAL_URL_CUSTOMER}/blogs`,
        icon: <></>,
    },
    {
        name: "Contact",
        isSubcategory: true,
        url: `${FINAL_URL_CUSTOMER}/contact`,
        icon: <></>,
    },

]
export const dataSidebarAdmin = [
    {
        name: "Quản lý",
        isSubcategory: false,
        icon: <></>,
    },
    {
        name: "Products",
        isSubcategory: true,
        url: `${FINAL_URL_ADMIN}/products/list`,
        icon: RiProductHuntFill,
    },
    {
        name: "Users",
        isSubcategory: true,
        url: `${FINAL_URL_ADMIN}/users/list`,
        icon: FiUsers,
    },
    {
        name: "Categories",
        isSubcategory: true,
        url: `${FINAL_URL_ADMIN}/categories/list`,
        icon: BiCategory,
    },
]
