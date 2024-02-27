import { useContext } from "react";
import { GrMenu } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Authentication/Authprovider";

const Sidebar = () => {
    const {logOut} = useContext(AuthContext)

    const active = 'text-lg md:text-xl flex lg:text-3xl bg-purple-100  p-4'
    const inActive = 'text-lg md:text-xl flex lg:text-3xl p-4'

    const handleLogOut = () =>{
        logOut()
      }
    return (
        <div className=" ">
            <div className="drawer ">
                <input id="my-drawer" type="checkbox" className="drawer-toggle  m-0 p-0" />
                <div className="drawer-content ">
                    {/* Page content here */}
                    <label htmlFor="my-drawer" className="btn text-4xl shadow-none  bg-white border-0 drawer-button"><GrMenu /></label>
                </div> 
                <div className="drawer-side m-0 p-0">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <img src="https://i.ibb.co/VM1xCzt/image-removebg-preview.png" alt="" />
                    <div className="menu  p-4 w-60 md:w-96 min-h-full bg-white text-base-content">
                    <div className="bg-base-200">
                    <img className="w-4/5 mx-auto " src="https://i.ibb.co/VM1xCzt/image-removebg-preview.png" alt="" />
                    <div className="p-4">
                        <p className="text-base md:text-lg lg:text-xl">Location:</p>
                        <h1 className="text-lg md:text-xl flex lg:text-3xl">Los Angeles, <span>California</span></h1>
                    </div>
                    </div>
                    <div className=" bg-white space-y-2 min-h-screen mt-3">
                        <NavLink to='/logIn' className={({ isActive, isPending }) =>isPending ? "pending" : isActive ? active : inActive} >Dashboard</NavLink>
                        <NavLink to='' className={inActive} >Location</NavLink>
                        <NavLink to='' className={inActive} >Pos Invoice</NavLink>
                        <NavLink onClick={handleLogOut} to='' className={inActive} >Log Out</NavLink>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;