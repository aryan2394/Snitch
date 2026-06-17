import { Outlet } from "react-router";
import Nav from "../features/shared/components/Nav";

export default function AppLayout() {
    return (
        <>
            <Nav />
            <Outlet />
        </>
    )
}
 