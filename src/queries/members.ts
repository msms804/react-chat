import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useMembersData = () => {
    const { isLoading, error, data } = useQuery({
        queryKey: ['membersData'],
        queryFn: async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/users/list');
                return response.data;
            } catch (error) {
                console.log(error);
            }
        }
    })
    return { isLoading, error, data };
}
export default useMembersData;