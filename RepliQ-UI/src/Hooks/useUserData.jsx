import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useUsers = () => {
    const axiosPublic = useAxiosPublic()
    const {data: users=[], isPending: usersLoading, refetch:fetchUser} =useQuery({
        queryKey: [ 'users'],
        queryFn: async()=>{
            const res = await axiosPublic.get(`/users`)
            return res.data
        }
    })
    return [users, usersLoading, fetchUser]
};

export default useUsers;