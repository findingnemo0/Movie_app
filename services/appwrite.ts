// appwrite.ts
import { Movie, TrendingMovie } from "@/interfaces/interfaces";
import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

// Track searches
export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];

      await database.updateDocument(DATABASE_ID, COLLECTION_ID, existingMovie.$id, {
        count: existingMovie.count + 1,
      });
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.imdbID, // imdbID is a string like "tt1234567"
        count: 1,
        title: movie.Title,
        Poster: movie.Poster !== "N/A" ? movie.Poster : null,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Get top 5 trending movies
// appwrite.ts (replacement for getTrendingMovies)
export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);

    const docs = (result.documents as any[]) || [];

    const trending: TrendingMovie[] = docs.map((doc) => ({
      searchTerm: doc.searchTerm ?? doc.search_term ?? "",
      // ensure movie_id is a string (imdbID is like "tt12345")
      movie_id: String(doc.movie_id ?? doc.movieId ?? doc.imdbID ?? doc.id ?? ""),
      // map title fields (Appwrite may store 'title' or 'Title')
      Title: doc.Title ?? doc.title ?? "",
      // ensure count is a number
      count: Number(doc.count ?? 0),
      // Poster may be null or a string
      Poster: doc.Poster ?? doc.poster ?? null,
    }));

    return trending;
  } catch (error) {
    console.log("getTrendingMovies error:", error);
    return undefined;
  }
};

