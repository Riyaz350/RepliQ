import { useContext } from "react";
import { AuthContext } from "../Authentication/Authprovider";
import LogIn from "../Authentication/LogIn";
import Sidebar from "../Components/Shared/Sidebar";
import Navbar1 from "../Components/Cart/Navbar1";
import Cart from "../Components/Cart/Cart";
import Navbar2 from "../Components/Products/Navbar2";
import Products from "../Components/Products/Products";

const Home = () => {
    const {user} = useContext(AuthContext)

    return (
        <div className="lg:grid grid-cols-2 ">
        <div>
            <div className="flex items-center">
            <Sidebar/>
            <Navbar1/>
            </div>
            {user?
                <Cart/>:
                <LogIn/>
            }
        </div>
        <div>
           <Navbar2/>
           <Products/>
        </div>
    </div>
    );
};

export default Home;