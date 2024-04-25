import { Outlet } from "react-router-dom";
import Topnav from "./Topnav";
const Layout = () => {
    return (
        <div className="App">
            <Outlet/>
        </div>
    )
}

export default Layout;