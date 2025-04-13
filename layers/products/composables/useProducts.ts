import type { PaginationInput } from "~/types";
import type { Category, Product } from "../types";
import { PAGINATION_LIMIT } from "~/config/constants";
export default function useProducts() {
    const { $api } = useNuxtApp();
    interface GetProductsOptions {
        pagination:PaginationInput,
        filters:{
            category?:string,
            title?:string,
            price?:number[]
        }
    }
    const getProducts = async (options?:GetProductsOptions) => {
        try {
            const paginationLimit = options?.pagination?.limit || PAGINATION_LIMIT;
            const paginationOffset = options?.pagination?.offset || 0;
            const response = await $api('/products',{
                params:{
                    limit:paginationLimit,
                    offset:paginationOffset,
                    categoryId:options?.filters?.category,
                    title:options?.filters?.title,
                    price_min:options?.filters?.price?.[0],
                    price_max:options?.filters?.price?.[1]
                }
            });
            return response;
        } catch (error) {
            handleError(error, {
                throw: false,
                withToast: true
            })
        }
    };

    const getProductBySlug = async (slug: string):Promise<Product | undefined> => {
        try {
            const response = await $api(`/products/slug/${slug}`);
            return response;
        } catch (error) {
            handleError(error, {
                throw: false,
                withToast: true
            })
        }
    }

    const getProductCategories = async ():Promise<Category[] | undefined> => {
        try {
            const response = await $api('/categories');
            return response;
        } catch (error) {
            handleError(error, {
                throw: false,
                withToast: true
            })
        }
    }

    return {
        getProducts,
        getProductBySlug,
        getProductCategories
    };
};