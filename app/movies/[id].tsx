import { icons } from '@/assets';
import { OMDbMovieDetails } from '@/interfaces/interfaces';
import { fetchMovieDetails } from '@/services/api';
import useFetch from '@/services/useFetch';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, ScrollView, View, Text } from 'react-native';

interface MovieInfoProps{
  label: string;
  value?: string | number | null;
}

const MovieInfo =({label , value}: MovieInfoProps) =>(
  <View className='flex-col items-start justify-center mt-5'>
      <Text className='text-light-200 font-normal text-sm'>
          {label}
      </Text>

      <Text className='text-light-100 font-bold text-sm mt-2'>
          {value || 'N/A'}
      </Text>
  </View>
)

const MovieDetails = () => {
  const {id} = useLocalSearchParams();

    const { data: movie, loading } = useFetch<OMDbMovieDetails>(() =>
    fetchMovieDetails(id as string)
  );

  return (
    <View className='bg-primary flex-1'>
      <ScrollView contentContainerStyle={{paddingBottom:80}}>
          <View>
              <Image
                  source={{ uri: movie?.Poster && movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/500x750?text=No+Image" }}
                  className='w-full h-[550px]'
                  resizeMode='cover'
              />
          </View>

          <View className='flex-col items-start justify-center mt-5 px-5'>
                <Text className='text-white font-bold text-xl'>
                    {movie?.Title}
                </Text>
                <View className='flex-row items-center gap-4 mt-2'>
                  <Text className='text-light-200 text-sm'>
                      {movie?.Released}
                  </Text>
                  <Text className='text-light-200 text-sm'>
                      {movie?.Runtime}m
                  </Text>
                </View>
          </View>

          <View className='flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2'>
              <Image
                source={icons.star}
                className='size-4'
              />
              <Text className='text-white font-bold text-sm'>
                  {Math.round(Number(movie?.imdbRating ?? "0"))}/10
              </Text>

              <Text className='text-light-200 text-sm'>
                    ({movie?.Genre})
              </Text>
          </View>

          <MovieInfo 
              label='Overview'
              value={movie?.Title}
          />
          
      </ScrollView>
    </View>
  )
}

export default MovieDetails