import React, { useContext } from 'react';
import useUsers from '../../Hooks/useUserData';
import { AuthContext } from '../../Authentication/Authprovider';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const ProductsCard = (prod) => {
    const {_id,name ,price, image}  = prod
    console.log(name)
    const [,,fetchUser] = useUsers()
    const {user} = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    const handleCart = (id)=>{
        axiosPublic.patch(`/users/${user?.email}`, {userID:id})
        .then(res=> {
            if(res?.status == 200){
                Swal.fire({position: "top-end", icon: "success", title: "Added Item Successfully", showConfirmButton: false, timer: 1500});
                fetchUser()
            }
        })
        .catch(()=>{
            Swal.fire({position: "top-end", icon: "error", title: "Item already in the cart", showConfirmButton: false, timer: 1500});
        })
    }
    return (
        <div  className='h-[230px]'>

                <div  onClick={()=>document.getElementById(prod.prod._id).showModal()} className='border-[.3px] h-[230px] cursor-pointer border-[#abb0b4] rounded-sm bg-white flex flex-col justify-between '>
                    <img className='w-[250px] h-[150px] bg-white' src={prod.prod.image} alt="" />
                    <p className='bg-[#f4f6f8] text-xl font-bold'>${prod.prod.price}</p>
                    <h1 className='p-1 text-base font-semibold'>{prod.prod.name}</h1>
                </div>
                <dialog id={prod.prod._id} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <img className='w-4/5 mx-auto my-2 ' src={prod.prod.image} alt="" />
                    <h3 className="font-medium text-2xl">{prod.prod.name}</h3>
                    <p className="py-4 text-3xl font-light"> ${prod.prod.price}</p>
                    <button onClick={()=>handleCart(prod.prod._id)} className='text-2xl bg-[#e7e9f6] p-2 rounded-lg border-2 border-[#5c6ac4] text-[#5c6ac4] hover:bg-[#5c6ac4] hover:text-white'>Add To Card</button>
                    <div className="modal-action">
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                    </div>
                </div>
                </dialog>
                </div>
    );
};

export default ProductsCard;