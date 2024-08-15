import { useState } from 'react'
import { useNavigation } from 'expo-router';

import { View, Text, ScrollView, Alert, Linking } from "react-native";

import { Header } from "@/components/header";
import { Product } from "@/components/product";
import { Button } from "@/components/button";
import { LinkButton } from "@/components/link-button";
import { Input } from "@/components/input";

import { ProductCartProps, useCartStore } from "@/store/cart-store";
import { Feather } from "@expo/vector-icons";
import { formatCurrency } from "@/utils/data/functions/format-currency";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React from 'react';

const PHONE_NUMBER = '5519999999999'

export default function Cart(){
    const [address, setAddress] = useState('')
    const cartStore = useCartStore()
    const navigation = useNavigation()

    const isProducts = cartStore.products.length > 0

    const total = formatCurrency(
        cartStore.products.reduce(
            (total, product) => total + product.price * product.quantity, 0
        ))

    function handleProductRemove(product: ProductCartProps){
        Alert.alert('Remover', `Deseja remover ${product.title} da sacolinha`, [
            {
                text: 'Cancelar'
            },
            {
                text: 'Remover',
                onPress:() => cartStore.remove(product.id)
            }
        ])
    }
         
    function handleOrder(){
        
        if (address.trim().length === 0){
            return Alert.alert('Pedido', 'Informe os dados da entrega')
        }

        const products = cartStore.products
            .map(product => `\n ${product.quantity}x ${product.title}` )
            .join('')

        const message = `
        🍔NOVO PEDIDO🍟
            \n Entregar em ${address}

            ${products}

            \n Valor total: ${total}

        `
        // console.log(message);

        Linking.openURL(
         `http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`   
        )
        
        cartStore.clear()
        navigation.goBack()

    }


    return(
        <View className="flex-1 pt-8">
            <Header title="Minha Sacolinha"/>
            <KeyboardAwareScrollView>
            <ScrollView>
            <View className="flex-1 p-5">    
            { isProducts ? (   
                <View className="border-b border-slate-700">
                    {   
                        cartStore.products.map(product => (
                            <Product key={product.id} data={product} 
                            onPress={() => handleProductRemove(product)}/>
                        ))
                    }
                </View>
              ) : (
                <Text className="font-body text-slate-400 text-2xl text-center my-8">
                    Sua sacolinha está vazia...
                </Text>
              ) 
            }        
                <View className="flex-row gap-2 items-center mt-5 mb-4">
                    <Text className="text-white text-xl font-subtitle">Total:</Text>
                    <Text className="text-lime-400 text-2xl font-heading">{total}</Text>
                </View>
                <Input placeholder="Informe o endereço de entrega com rua,
                    bairro, CEP, número e complemento..."
                    onChangeText={setAddress}
                    // mudanças do botão do teclado do celular
                    blurOnSubmit={true} // permite a teclar <enter> do teclado enviar o pedido
                    onSubmitEditing={handleOrder} // quando teclar enter chamar a funcao
                    returnKeyType='next' // mudando o ícone do teclado
                />
            </View>                
            </ScrollView>
            </KeyboardAwareScrollView>
            <View className="p-5 gap-5">
                <Button onPress={handleOrder}>
                    <Button.Text>Enviar Pedido</Button.Text>
                    <Button.Icon>
                        <Feather name="arrow-right-circle" size={20} />
                    </Button.Icon>
                </Button>
                <LinkButton title="Voltar ao cardápio" href="/"/>
            </View>
        </View>
    )
}