import { SlNote } from "react-icons/sl";
import { FaTruckMoving } from "react-icons/fa";
import { GrStakeholder } from "react-icons/gr";
import { FaPlusCircle } from "react-icons/fa";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Navbar1 = () => {
    const axiosPublic = useAxiosPublic()
    const nav1 ='flex items-center  gap-2  bg-[#e7e9f6] text-[#5c6ac4] font-medium p-2 lg:px-6 lg:p-3 rounded-lg  '
    const handleAddTask=(e)=>{
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const category = form.category.value
        const price = form.price.value
        const quantity = form.quantity.value
        const image = form.image.value
        console.log(name, category, price, quantity, image)


        // .then(()=> {
        //     Swal.fire({position: "top-end", icon: "success", title: "Task Added", showConfirmButton: false, timer: 1500});
        // })
        // .catch(err=> console.log(err))
    }
    return (
        <div className={` ${window.innerWidth >=1024 && window.innerWidth <=1500 ? 'grid grid-cols-2' : 'grid grid-cols-2 md:flex justify-between  items-center md:gap-10'}   gap-2  my-2 lg:my-3  text-base md:text-xl lg:text-2xl`}>
            <button className={nav1}><SlNote/>Note</button>
            <button className={nav1}><FaTruckMoving/>Shipping</button>
            <button className={nav1}><GrStakeholder />Hold Order</button>
            <button  onClick={()=>document.getElementById('my_modal_4').showModal()} className={nav1}><FaPlusCircle />New Item</button>
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-full lg:w-11/12 max-w-5xl">
                    <div className="modal-action flex flex-col">
                    <form  onSubmit={handleAddTask} className="grid md:grid-cols-2 gap-10 form my-10">
                                    
                                    <div className="relative z-0 w-full mb-6 group">
                                        <input type="text" name="name"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Name" required />
                                    </div>

                                    <div>
                                        <input type="text" name="category"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Category" required />
                                    </div>

                                    <div>
                                        <input type="text" name="price" placeholder="Price"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"  required />
                                    </div>

                                    <div>
                                        <input type="text" name="quantity" placeholder="Quantity"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"  required />
                                    </div>

                                    <div>
                                        <input type="text" name="image" placeholder="Image direct Link"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"  required />
                                    </div>
                            <button type="submit" className="btnTask btn">Add Task</button>
                            </form>
                            <form method="dialog" className="w-full">
                            <button className="btn">Close</button>

                    </form>
                    
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default Navbar1;