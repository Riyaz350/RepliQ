import { IoSearch } from "react-icons/io5";

const Navbar2 = () => {
    return (
        <div className="bg-[#f9fafb] flex justify-between shadow-xl items-center p-2 px-4">
            <div className="flex items-center w-full">
            <p className="text-[#666869] text-3xl font-bold"><IoSearch /></p>
            <input  type="text" placeholder="Search Products.." className="ml-2 input input-bordered w-full max-w-xs border-0 bg-[#f9fafb] placeholder:text-[#9ba5ae] placeholder:text-xl placeholder:font-semibold" />
            </div>
            <img src="https://i.ibb.co/jM6pXN6/9185570.png" className="w-[60px]" alt="" />
        </div>
    );
};

export default Navbar2;