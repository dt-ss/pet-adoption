import React from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useAtom} from "jotai/index";
import {userAtom} from "../../Atoms";


/**
 * generic route to be viewed only when user connected, when not - redirect to login page
 * @constructor
 */
export const ProtectedRoute: React.FC = () => {
    const [user] = useAtom(userAtom)
    const location = useLocation()
    return (
        user ? <Outlet/> : <Navigate state={{from: location}} to={'/signin'}/>
    )
}