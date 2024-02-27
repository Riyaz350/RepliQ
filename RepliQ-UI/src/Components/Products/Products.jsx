import React, { useEffect, useState } from 'react';
import useProducts from '../../Hooks/useProducts';
import { BsThreeDotsVertical } from "react-icons/bs";

const Products = () => {
    const [products, productsLoading] = useProducts()
    const catBTN = 'btn text-base md:text-xl lg:text-2xl my-4 bg-white text-gray-500 border-2 border-gray-500 hover:text-blue-500 hover:bg-white hover:border-blue-500'

    const [filteredProducts, setFilteredProducts] = useState([])

    

    useEffect(()=>{
        if(!productsLoading){
            setFilteredProducts(products)
        }
    },[products, productsLoading])

    if(productsLoading){
        return (
            <div className='flex justify-center  items-center'>
                <span className="loading loading-dots loading-lg"></span>
            </div>
        )
    }
    return (
        <div className='bg-[#f4f6f8] p-10 pt-0'>
            <div className={`${window.innerWidth <= 1024 ? "justify-end" : 'lg:justify-between'} text-2xl flex   items-center `}>
                <div className={`${window.innerWidth <= 1024 ? 'hidden' : 'lg:flex gap-5'}    `}>
                    <button  className={catBTN}>All Categories</button>
                    
                </div>
                <div className=" drawer-end">
                    <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <label htmlFor="my-drawer-4" className="drawer-button hover:bg-transparent shadow-none p-0 btn bg-transparent text-3xl border-none"><BsThreeDotsVertical /></label>
                    </div> 
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                        <div className="menu p-4 w-60 md:w-96 min-h-full bg-base-200 ">
                        
                        </div>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 text-center gap-4'>
            {
            filteredProducts &&
            filteredProducts.map(prod =>
                <div key={prod._id} className='h-[230px]'>

                <div  onClick={()=>document.getElementById(prod._id).showModal()} className='border-[.3px] h-[230px] cursor-pointer border-[#abb0b4] rounded-sm bg-white flex flex-col justify-between '>
                    <img className='w-[250px] h-[150px] bg-white' src={prod.image} alt="" />
                    <p className='bg-[#f4f6f8] text-xl font-bold'>${prod.price}</p>
                    <h1 className='p-1 text-base font-semibold'>{prod.name}</h1>
                </div>
                <dialog id={prod._id} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <img className='w-4/5 mx-auto my-2 ' src={prod.image} alt="" />
                    <h3 className="font-medium text-2xl">{prod.name}</h3>
                    <p className="py-4 text-3xl font-light"> ${prod.price}</p>
                    <button  className='text-2xl bg-[#e7e9f6] p-2 rounded-lg border-2 border-[#5c6ac4] text-[#5c6ac4] hover:bg-[#5c6ac4] hover:text-white'>Add To Card</button>
                    <div className="modal-action">
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                    </div>
                </div>
                </dialog>
                </div>
                
                )}
            </div>
        </div>
    );
};

export default Products;