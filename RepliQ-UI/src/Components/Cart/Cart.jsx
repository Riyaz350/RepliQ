import { useContext, useEffect, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { LuUserCircle2 } from "react-icons/lu";
import { AuthContext } from "../../Authentication/Authprovider";
import useProducts from "../../Hooks/useProducts";
import { FaRegEdit } from "react-icons/fa";
import { CiTrash } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useUsers from "../../Hooks/useUserData";


const Cart = () => {
    const [users,,fetchUser] = useUsers()
    const axiosPublic = useAxiosPublic()
    const [products]  = useProducts()
    const {user} = useContext(AuthContext)
    const currentUser = users.find(userr=> userr.mail == user?.email)
    const cartProducts = currentUser?.cart.map((productId) =>products.find((product) => product?._id === productId));

    const [totalPrice, setTotalPrice] = useState(0);    
    const [totalProduct, setTotalProduct] = useState(cartProducts?.length)

    // setting the quantity
    const [quantities, setQuantities] = useState({});

    const handleIncrease = (productId) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: (prevQuantities[productId] || 1) + 1,
        }));
        setTotalProduct(totalProduct +1)

      };
    
      const handleReduce = (productId) => {
          setQuantities((prevQuantities) => ({
              ...prevQuantities,
              [productId]: Math.max((prevQuantities[productId] || 1) - 1, 0),
              
            }));
            setTotalProduct(totalProduct -1)


      };

      useEffect(() => {
        if (cartProducts && cartProducts.length > 0) {
          const newTotalPrice = cartProducts.reduce((acc, prod) => {
            const productPrice = prod?.price 
            const productQuantity = quantities[prod?._id] || 1;
            return acc + productPrice * productQuantity;
          }, 0);
    
          // Use a function to update the state based on the previous state
          setTotalPrice(newTotalPrice);
        } else {
          setTotalPrice(0);
        }
      }, [cartProducts, quantities]);

      const removeFromCart =(id)=>{
        axiosPublic.patch(`/userss/${user?.email}`, {userID:id})
        .then(res=> {
            if(res?.status == 200){
                fetchUser()
            }
        })
      }

      const handlePay =()=>{
        if(cartProducts && cartProducts.length >0){
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.patch(`/usersss/${user?.email}`)
        .then(res=> {
            if(res?.status == 200){
                Swal.fire({
                    title: "Paid",
                    text: "Your products will be delivered soon",
                    icon: "success"
                  });
                fetchUser()
            }
        })
              
            }
          });
        }else {
            Swal.fire({
                text: "There is nothing in the cart",
                icon: "error"
              });
        }
      }
    return (
        <div className="flex flex-col justify-between min-h-screen">
            <div className="flex flex-col justify-between gap-5">
                <div className="bg-[#e7e9f6] mx-6 my-1 p-5 flex items-center justify-between text-base md:text-xl lg:text-2xl font-medium text-[#5c6ac4]">
                <h1 className="flex items-center gap-2"><LuUserCircle2  className="text-xl md:text-3xl"/>{user?.displayName}</h1>
                <h1 className="text-3xl"><FiPlusCircle /></h1>
                </div>
                <div className="justify-start">
                <ul>
                    {cartProducts && cartProducts.length >0? cartProducts.map(prod => 
                        <li key={prod?._id} className="flex items-center  px-10 text-base md:text-xl lg:text-2xl gap-2">
                            <p><FaRegEdit /></p>
                            <div className="text-start p-2 justify-start grid grid-cols-5 gap-5 flex-grow border-[1px] border-black">
                                <h1 className="col-span-2">{prod?.name}</h1>
                                <h1>{prod?.price}</h1>
                                <div className="flex items-center gap-2">
                                    <button onClick={()=>handleReduce(prod?._id)}><CiCircleMinus /></button>
                                    {quantities[prod?._id] || 1}
                                    <button onClick={()=>handleIncrease(prod?._id)}><CiCirclePlus /></button>
                                </div>
                                <h1>{quantities[prod?._id] ? (quantities[prod?._id] * prod?.price).toFixed(2) : prod?.price}</h1>
                            </div>
                            <button onClick={()=>removeFromCart(prod._id)} className="text-red-500"><CiTrash /></button>
                        </li>
                        ) :
                        <div>
                            <img className="w-1/2 mx-auto" src="https://i.ibb.co/xmmV1ZW/cart-removebg-preview.png" alt="" />
                            <h1 className="text-2xl text-center">You cart is empty</h1>
                        </div>
}
                </ul>
            </div>
            </div>

            
            <div className="grid grid-cols-2">
                <div>
                    
                </div>
                <div className="text-3xl font-medium flex flex-col gap-3 p-6">
                        <div className="flex justify-between border-b-2">
                            <h1>Sub Total</h1>
                            <h1>{ totalPrice && totalPrice.toFixed(2)}</h1>
                        </div>
                        <div className="flex justify-between border-b-2">
                            <h1>Tax(.5%)</h1>
                            <h1>{(totalPrice* .5/100).toFixed(2)} </h1>
                        </div>
                        <div className="flex justify-between border-b-2">
                            <h1>Shipping</h1>
                            <h1>$5.00</h1>
                        </div>
                        <div className="flex justify-between border-b-2">
                            <h1>Cart Discount</h1>
                            <h1>$10.00</h1>
                        </div>
                        
                </div>
                    <div className="bg-[#e7e9f6] col-span-2 mx-6 my-1 p-5 flex items-center justify-between text-base md:text-xl lg:text-2xl font-medium text-[#5c6ac4]">
                            <h1 className="flex items-center gap-2">Products Count ({totalProduct})</h1>
                            {totalPrice ?
                                <h1 className="text-3xl">Sub Total {((totalPrice)+(totalPrice* .5/100)+10+5).toFixed(2)}</h1>:
                                <h1>0</h1>    
                            }
                            
                    </div>
                    <div className="m-6  flex justify-between gap-5 col-span-2">
                        <button className=" bg-red-300 p-4 rounded-lg text-3xl flex items-center gap-2"><MdCancel />Cancel</button>
                        <button className=" bg-[#e7e9f6] text-[#5c6ac4] p-4 rounded-lg text-3xl flex items-center gap-2"><MdCancel />Hold</button>
                        <button className=" bg-[#e7e9f6] text-[#5c6ac4] p-4 rounded-lg text-3xl flex items-center gap-2"><MdCancel />Discount</button>
                        <button onClick={handlePay} className=" bg-[#e7e9f6] text-[#5c6ac4] p-4 rounded-lg text-3xl flex items-center gap-2"><MdCancel />Pay <span>now</span></button>
                    </div>
            </div>

            
            
        </div>
    );
};

export default Cart;