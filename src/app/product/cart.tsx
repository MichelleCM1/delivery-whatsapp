import { View, Text, ScrollView } from "react-native";
import { Header } from "@/components/header";
import { useCartStore } from "@/store/cart-store";
import { Product } from "@/components/product";
import { Button } from "@/components/button";
import { Feather } from "@expo/vector-icons";
import { Link } from "@react-navigation/native";
import { LinkButton } from "@/components/link-button";
import { formatCurrency } from "../../utils/data/functions/format-currency";
import React from "react";


export default function Cart() {
    const cartStore = useCartStore()

    const isProducts = cartStore.products.length > 0

    const total = formatCurrency(
        cartStore.products.reduce(
            (total, product) => total + product.price * product.quantity, 0
        ))

    return (
        <View className="flex-1 pt-8">
            <Header title="Seu carrinho" />
            <ScrollView>
                
            <View className="flex-1 p-5">
                {
                    cartStore.products.map(product => (
                        <Product key={product.id} data={product} />
                    ))

                }
            </View>
            <View className="flex-row gap-2 items-center mt-5 mb-4">
                <Text className="text-white text-xl font-subtitle">Total:</Text>
                <Text className="text-lime-400 text-2xl font-heading">{total}</Text>
            </View>
            </ScrollView>
            <View className="p-5 gap-5">
                <Button onPress={() => { }}>
                    <Button.Text>Enviar Pedido</Button.Text>
                    <Button.Icon>
                        <Feather name="arrow-right-circle" size={20} />
                    </Button.Icon>
                </Button>
                <LinkButton title="Voltar ao cardápio" href="/" />
            </View>
        </View>
    )
}