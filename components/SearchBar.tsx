import React from 'react';
import { Image, TextInput, View } from 'react-native';
import { icons } from '../assets';

interface Props{
    placeholder:string;
    onFocus?:()=> void;
}

const SearchBar = ({placeholder, onFocus}:Props) => {
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
        value=''
        onChangeText={()=>{}}
        placeholderTextColor="#ffffff"
        className='flex-1 ml-2 text-white'
      />
    </View>
  )
}

export default SearchBar