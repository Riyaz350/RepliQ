import { useContext, useEffect, useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useProducts from '../../Hooks/useProducts';
import { BsThreeDotsVertical } from "react-icons/bs";
import { AuthContext } from '../../Authentication/Authprovider';
import Swal from 'sweetalert2';
import useUsers from '../../Hooks/useUserData';
import ProductsCard from './ProductsCard';

const Products = () => {
    const [products, productsLoading] = useProducts()
    
    const filteredCategory = [...new Set(products.map(prod=> prod.category))]
    const catBTN = 'btn text-base md:text-xl lg:text-2xl my-4 bg-white text-gray-500 border-2 border-gray-500 hover:text-blue-500 hover:bg-white hover:border-blue-500'

    


    
    

    const cats = <>
    
    {filteredCategory.splice(0,4).map((cat, index)=>
                    <div onClick={()=>handleFilter(cat)} key={index} className={catBTN}>
                        <h1 style={{fontSize:'1em'}} >{cat}</h1>
                    </div>
    )}
    </>

    const handleFilter = (cat)=>{
        if(cat == 0){
            setFilteredProducts(products)
        }else {
            const filter = products.filter(prod=> prod?.category === cat)
            setFilteredProducts(filter)
        }
    }
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
                    <button onClick={()=>handleFilter(0)} className={catBTN}>All Categories</button>
                    <div className='lg:flex overflow-auto  gap-5 '>
                        {cats}
                    </div>
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
                        <button onClick={()=>handleFilter(0)} className={catBTN}>All Categories</button>

                        <div className='lg:flex flex-wrap gap-2   '>
                        {cats}
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 text-center gap-4'>
            {
            filteredProducts &&
            filteredProducts.map(prod =>
                <ProductsCard key={prod?._id} prod={prod}></ProductsCard>
                
                )}
            </div>
        </div>
    );
};

export default Products;