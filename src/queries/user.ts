import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useUserData = () => {
    const { isLoading, error, data } = useQuery({
        queryKey: ['userData'], // 쿼리의 키 설정
        queryFn: async () => {
            try {
                const response = await axios.get('http://localhost:8080/accessToken', { withCredentials: true });
                return response.data;
            } catch (error) {
                console.log(error);
            }
        }
    });
    return { isLoading, error, data };
}
export default useUserData;
