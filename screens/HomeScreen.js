import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { clearSession } from "../database/db";
import { getPopularMovies, searchMovies } from "../config/tmdb";

export default function HomeScreen({ navigation, user, setUser }) {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    const data = await getPopularMovies();
    setMovies(data);
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      loadMovies();
      return;
    }
    const results = await searchMovies(query);
    setMovies(results);
  };

  const logout = async () => {
    await clearSession();
    setUser(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}> Bienvenido, {user.username}</Text>

        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>

      {user.rol === "admin" && (
        <TouchableOpacity style={styles.userBtn} onPress={() => navigation.navigate("Usuarios")}>
          <Text style={styles.userBtnText}>👥 Gestionar Usuarios</Text>
        </TouchableOpacity>
      )}

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar película..."
          placeholderTextColor="#999"
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
          <Text style={styles.searchText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={movies}
        keyExtractor={(m) => m.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
              style={styles.image}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.text} numberOfLines={4}>
                {item.overview}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b0b0b", padding: 12 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  welcome: { color: "#fff", fontSize: 16 },
  logoutBtn: {
    backgroundColor: "#e63946",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  logoutText: { color: "#fff", fontWeight: "bold" },
  userBtn: {
    backgroundColor: "#1d3557",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  userBtnText: { color: "#fff", fontWeight: "bold" },
  searchContainer: { flexDirection: "row", marginBottom: 10, gap: 8 },
  input: {
    flex: 1,
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
  },
  searchBtn: {
    backgroundColor: "#457b9d",
    justifyContent: "center",
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  searchText: { color: "#fff", fontWeight: "bold" },
  card: {
    flexDirection: "row",
    backgroundColor: "#222",
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  image: { width: 80, height: 120, marginRight: 10, borderRadius: 8 },
  title: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  text: { color: "#ccc", fontSize: 12 },
});