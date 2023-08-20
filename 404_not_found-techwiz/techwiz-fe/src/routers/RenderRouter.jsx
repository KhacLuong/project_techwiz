import React, {Suspense} from 'react';
import {Route, Routes} from "react-router-dom";
import PrivateRoute from "./PrivateRouter.jsx";
import AuthRouter from "./AuthRouter.jsx";
import {routers} from "./DataRouter.jsx";
const RenderRouter = () => {
    return (
        <Routes>
            <Route path={`/`}>
                {RecursiveRouter(routers)}
            </Route>
        </Routes>
    );
};
const RecursiveRouter = (routers) => {
    return (
        routers.map(({page: Page, isIndex, path, isAuthentication, children, isRole}, index) => {
            return (
                <Route key={index} index={isIndex} path={path} element={
                    isAuthentication ?
                        <PrivateRoute>
                            <Suspense fallback={<div>Loading...</div>}>
                                <AuthRouter page={Page} allowedRoles={isRole? isRole : []}/>
                            </Suspense>
                        </PrivateRoute> :
                        <Suspense fallback={<div>Loading...</div>}>
                            <Page/>
                        </Suspense>}>
                    {(children && children.length > 0) && RecursiveRouter(children)}
                </Route>
            )
        })
    )
}
export default RenderRouter;