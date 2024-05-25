import React from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useAtom} from "jotai/index";
import {userAtom} from "../../Atoms";


export const ProtectedRoute: React.FC = () => {
    const [user] = useAtom(userAtom)
    const location = useLocation()
    return (
        user ? <Outlet/> : <Navigate state={{from: location}} to={'/signin'}/>
    )
}