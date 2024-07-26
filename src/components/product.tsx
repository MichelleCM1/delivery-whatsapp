import React from "react";
import { forwardRef } from "react";

import {  
    TouchableOpacity, 
    TouchableOpacityProps, 
    Image,
    ImageProps,
    Text,
    View,
} from "react-native";


type ProductDataProps = {
    title: string
    description: string
    thumbnail: ImageProps
    quantity?: number
}

type ProductsProps = TouchableOpacityProps & {
    data: ProductDataProps
}

// export function Product({data, ...rest}:ProductsProps){
export const Product = forwardRef<TouchableOpacity, ProductsProps>(
    ({data, ...rest}, ref) => {
    return(
        <TouchableOpacity ref={ref}
            className="w-full flex-row items-center pb-4"
            { ...rest }
        >
            <Image source={data.thumbnail} className="w-20 h-20 rounded-md"/>
            <View className="flex-1 ml-3">
                <View className="flex-row items-center">
                    <Text className="text-slate-100 font-subtitle text-base flex-1">
                        {data.title}
                    </Text>
                </View>
                <Text className="text-slate-400 text-xs leading-5 mt-0.5">{data.description}</Text>
            </View>

        </TouchableOpacity>
    )
 }
)