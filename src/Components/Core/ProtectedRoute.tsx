import React from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useAtom} from "jotai/index";
import {userAtom, skipLoginAtom} from "../../Atoms";


/**
 * generic route to be viewed only when user connected, when not - redirect to login page
 * @constructor
 */
export const ProtectedRoute: React.FC = () => {
    const [user] = useAtom(userAtom)
    const location = useLocation()
    const [skipLogin] = useAtom(skipLoginAtom)
    return (
        user || (skipLogin && location.pathname === '/') ? <Outlet/> :
            <Navigate state={{from: location}} to={'/signin'}/>
    )
}