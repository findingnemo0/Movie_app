import React from 'react';
import { Image, TextInput, View } from 'react-native';
import { icons } from '../assets';

interface Props{
    placeholder:string;
    onFocus?:()=> void;
    value?:string;
    onChangeText?:(text:string)=>void;
}

const SearchBar = ({placeholder, onFocus, value, onChangeText}:Props) => {
  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
      <Image 
        source={icons.search}
        className='size-5'
        resizeMode='contain'
        tintColor="#ab8bff"
      />
      <TextInput
        onFocus={onFocus}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#ffffff"
        className='flex-1 ml-2 text-white'
        autoCapitalize='none'
        returnKeyType='search'
      />
    </View>
  )
}

export default SearchBar