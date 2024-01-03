import axios from "axios";
import {keepPreviousData, useQuery} from "@tanstack/react-query";

type Product = {
    id: number;
    title: string;
    description: string
}

type ApiResponse = {
    limit: number;
    skip: number;
    total: number;
    products: Product[];
}
const fetchProducts = async (page = 0, search = ''): Promise<ApiResponse> => {
    const params: Record<string, string | number> = {limit: 10}
    if (page) {
        params.skip = page * 10;
    }
    if (search) {
        params.q = search
    }
    const response = await axios.get(`https://dummyjson.com/products${search ? '/search' : ''}`, {
        params
    });
    return response.data;
};
export default function useProducts(page: number, search: string){
    return useQuery<ApiResponse>({
        queryKey: ['products', page, search],
        queryFn: () => fetchProducts(page, search),
        placeholderData: keepPreviousData
    })
}