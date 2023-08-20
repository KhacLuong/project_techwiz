import {lazy} from "react";

export const WebsiteLayoutPage = lazy(() => import("../layouts/website/WebsiteLayout.jsx"))
export const HomePage = lazy(() => import("../pages/website/home/HomePage.jsx"))
export const ProductPage = lazy(() => import("../pages/website/product/ProductPage.jsx"))
export const CartPage = lazy(() => import("../pages/website/Cart.jsx"))
export const WishList = lazy(() => import("../pages/website/Wishlist.jsx"))
export const ProductDetailPage = lazy(() => import("../pages/website/product/ProductDetail.jsx"))
export const CustomerProfilePage = lazy(() => import("../pages/website/profile/Profile.jsx"))

export const SignInAdminPage = lazy(() => import("../pages/cms/SignInPage.jsx"))

export const ProductListPage = lazy(() => import("../pages/cms/product/ProductList.jsx"))
export const ProductFormPage = lazy(() => import("../pages/cms/product/ProductForm.jsx"))
export const UserListPage = lazy(() => import("../pages/cms/user/UserList.jsx"))
export const UserFormPage = lazy(() => import("../pages/cms/user/UserForm.jsx"))

export const CategoryListPage = lazy(() => import("../pages/cms/category/CategoryList.jsx"))
export const CategoryFormPage = lazy(() => import("../pages/cms/category/CategoryForm.jsx"))
export const AdminMyInfoPage = lazy(() => import("../pages/cms/My-Info.jsx"))
export const CMSLayoutPage = lazy(() => import("../layouts/cms/CMSLayout.jsx"))