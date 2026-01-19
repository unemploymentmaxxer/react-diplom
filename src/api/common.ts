import { useQuery } from "@tanstack/react-query";
import apiInstance from "."

interface IProductsParams {
    sortValue: string; 
    limit: number;
    skip: number;
}

export const getProducts = ({ sortValue, limit, skip }:IProductsParams) => {
    return useQuery({
        queryKey: ['products', sortValue, skip],
        queryFn: () => apiInstance.get('products', {
            params:{
                sortBy: sortValue,
                limit,
                skip
            }
        }),
        select:(response) => response.data
    })
}

export const getProductById = (id: number) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => apiInstance.get(`products/${id}`),
        select: (response) => response.data
    })
}