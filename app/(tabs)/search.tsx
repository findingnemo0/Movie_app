import { Image, View, Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { icons, images } from '@/assets';
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import SearchBar from '@/components/SearchBar';
import MovieCart from '@/components/MovieCart';
import { Movie } from '@/interfaces/interfaces';
import { updateSearchCount } from '@/services/appwrite';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: loadMovies,
    reset,
  } = useFetch<Movie[]>(() => fetchMovies({ query: debouncedQuery }), false);

  // Handle typing with debounce
  const handleSearchChange = (text: string) => {
    setSearchQuery(text);

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      if (text.trim()) {
        setDebouncedQuery(text);
        loadMovies();
      } else {
        reset();
      }
    }, 500);
  };

  // ✅ Track searches once movies are updated
  useEffect(() => {
    if (debouncedQuery && (movies ?? []).length > 0) {
      updateSearchCount(debouncedQuery, (movies ?? [])[0]);
    }
  }, [movies, debouncedQuery]);

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='flex-1 absolute w-full z-0' resizeMode='cover' />

      <View className='w-full flex-row justify-center mt-20 items-center'>
        <Image source={icons.logo} className='w-12 h-10' />
      </View>

      <View className='mt-20 px-5'>
        <SearchBar
          placeholder='Search movie'
          value={searchQuery}
          onChangeText={handleSearchChange}
        />
      </View>

      <FlatList
        data={movies ?? []}
        renderItem={({ item }) => <MovieCart movie={item} />}
        keyExtractor={(item) => item.imdbID}
        className='px-5'
        numColumns={3}
        columnWrapperStyle={{ justifyContent: 'center', gap: 16, marginVertical: 16 }}
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 10 }}
        ListHeaderComponent={() => (
          <>
            {moviesLoading && <ActivityIndicator size="large" color='#0000ff' className='my-3' />}
            {moviesError && (
              <Text className='text-red-500 px-5 my-3'>
                Error: {moviesError.message}
              </Text>
            )}

            {!moviesLoading && !moviesError && debouncedQuery && (movies ?? []).length > 0 && (
              <Text className='text-xl text-white font-bold gap-2'>
                Search Results for <Text className='text-accent'>{debouncedQuery}</Text>
              </Text>
            )}
          </>
        )}
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View className='mt-10 px-5'>
              <Text className='text-center text-gray-500'>
                {debouncedQuery ? 'No movies found' : 'Search for a movie'}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}
