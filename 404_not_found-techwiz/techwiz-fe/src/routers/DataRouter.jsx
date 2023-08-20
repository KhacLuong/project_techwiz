import {
    HomePage,
    ProductPage,
    WebsiteLayoutPage,
    CartPage,
    WishList,
    ProductDetailPage,
    CustomerProfilePage,
    SignInAdminPage,
    ProductListPage,
    ProductFormPage,
    UserListPage,
    UserFormPage,
    CategoryListPage,
    CategoryFormPage,
    AdminMyInfoPage, CMSLayoutPage
} from "../utils/import.jsx";

export const routers = [
    // {
    //     path: "*",
    //     page: <></>,
    //     isIndex: false,
    //     isAuthentication: false,
    //     isRole: []
    // },
    // {
    //     path: "v1/users/reset-password",
    //     page: <></>,
    //     isIndex: false,
    //     isAuthentication: false,
    //     isRole: []
    // },
    // {
    //     path: "v1/users/payment/:slug",
    //     page: <></>,
    //     isIndex: false,
    //     isAuthentication: true,
    //     isRole: ['ADMIN', 'USER']
    // },
    {
        path: "",
        page: WebsiteLayoutPage,
        isIndex: false,
        isAuthentication: false,
        isRole: [],
        children: [
            {
                path: "",
                page: HomePage,
                isIndex: true,
                isAuthentication: false,
                isRole: []
            },
            {
                path: "v1",
                page: HomePage,
                isIndex: true,
                isAuthentication: false,
                isRole: []
            },
            {
                path: "v1/products",
                page: ProductPage,
                isIndex: false,
                isAuthentication: false,
                isRole: []
            },
            {
                path: "v1/user/cart",
                page: CartPage,
                isIndex: false,
                isAuthentication: false,
                isRole: []
            },
            {
                path: "v1/user/wishlist",
                page: WishList,
                isIndex: false,
                isAuthentication: false,
                // isAuthentication: true,
                isRole: []
            },
            {
                path: "v1/products/:slug",
                page: ProductDetailPage,
                isIndex: false,
                isAuthentication: false,
                isRole: []
            },
            {
                path: "v1/user/:slug",
                page: CustomerProfilePage,
                isIndex: false,
                isAuthentication: false,
                isRole: []
            },
        ]
    },
    {
        path: "admin/v1/cms/sign-in",
        page: SignInAdminPage,
        isIndex: false,
        isAuthentication: false,
        isRole: []
    },
    {
        path: "admin/v1/cms",
        page: CMSLayoutPage,
        isIndex: false,
        isAuthentication: true,
        isRole: ['ADMIN'],
        children: [
            {
                path: "users/list",
                page: UserListPage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
            {
                path: "users/list/create",
                page: UserFormPage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
            {
                path: "users/list/edit",
                page: UserFormPage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
            {
                path: "",
                page: ProductListPage,
                isIndex: true,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
            {
                path: "products/list/create",
                page: ProductFormPage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
            {
                path: "products/list/edit",
                page: ProductFormPage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
            {
                path: "categories/list",
                page: CategoryListPage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
            {
                path: "categories/list/create",
                page: CategoryFormPage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
            {
                path: "categories/list/edit",
                page: CategoryFormPage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN']
            },
            {
                path: "my-profile",
                page: AdminMyInfoPage,
                isIndex: false,
                isAuthentication: true,
                isRole: ['ADMIN']
            }
        ]
    }
]