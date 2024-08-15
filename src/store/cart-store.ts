import { create } from 'zustand';
import { ProductProps } from '@/utils/data/products';

import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as cartInMemory from './helpers/cart-in-memory'

export type ProductCartProps = ProductProps & {
    quantity: number
}

// é um tipo Props Estado que será o Estado publico tipado
type StateProps = {
    products: ProductCartProps[]
    add: (product: ProductProps) => void
    remove: (productId: string) => void
    clear: () => void
}

export const useCartStore = create(
    persist<StateProps>( 
        (set) => ({
            products:[],

            add: (product: ProductProps) => 
            set( (state) => ({
                products: cartInMemory.add(state.products, product)
            })),
            remove: (productId: string) =>
            set(state => ({
                products: cartInMemory.remove(state.products, productId)
            })),
            clear: () => set( {products:[]}) 
        }),
        {
          name: 'delivery:cart',
          storage: createJSONStorage( () => AsyncStorage )  
        }
    )
)