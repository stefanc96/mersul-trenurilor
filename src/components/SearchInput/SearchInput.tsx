import React from 'react'
import {TextInput} from "react-native";
import {PropsSearchInput} from "./SearchInput.interface";


export const SearchInput = (props: PropsSearchInput) => {

    return (
        <TextInput
            style={{
                height: 40,
                width: '100%',
                marginVertical: 8,
                backgroundColor: 'gray',
                padding: 8,
                color: 'black'
            }}
            {...props}
        />
    )
}
