import { SlNote } from "react-icons/sl";
import { FaTruckMoving } from "react-icons/fa";
import { GrStakeholder } from "react-icons/gr";
import { FaPlusCircle } from "react-icons/fa";

const Navbar1 = () => {
    const nav1 ='flex items-center  gap-2  bg-[#e7e9f6] text-[#5c6ac4] font-medium p-2 lg:px-6 lg:p-3 rounded-lg  '
    return (
        <div className={` ${window.innerWidth >=1024 && window.innerWidth <=1500 ? 'grid grid-cols-2' : 'grid grid-cols-2 md:flex justify-between  items-center md:gap-10'}   gap-2  my-2 lg:my-3  text-base md:text-xl lg:text-2xl`}>
            <button className={nav1}><SlNote/>Note</button>
            <button className={nav1}><FaTruckMoving/>Shipping</button>
            <button className={nav1}><GrStakeholder />Hold Order</button>
            <button className={nav1}><FaPlusCircle />New Item</button>
        </div>
    );
};

export default Navbar1;