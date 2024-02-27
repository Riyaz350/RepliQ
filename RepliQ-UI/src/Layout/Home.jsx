import { useContext } from "react";
import { AuthContext } from "../Authentication/Authprovider";
import LogIn from "../Authentication/LogIn";

const Home = () => {
    const {user} = useContext(AuthContext)

    return (
        <div className="lg:grid grid-cols-2 ">
            <div>
                <div className='flex items-center'>
                    
                </div>
                
                    <LogIn/>
                
            </div>
        </div>
    );
};

export default Home;