import { TMDB_API_KEY, TMDB_BASE_URL } from "@env";


export const getPopularMovies = async () => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=es-ES&page=1`
    );
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error al obtener películas:", error);
    return [];
  }
};


export const searchMovies = async (query) => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=es-ES&query=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error al buscar películas:", error);
    return [];
  }
};