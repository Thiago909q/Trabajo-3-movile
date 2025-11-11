import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { getDB, getUsuarios, deleteUsuario } from "../database/db";

export default function UsuariosScreen() {
  const [usuarios, setUsuarios] = useState([]);
  const [newUser, setNewUser] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newRol, setNewRol] = useState("usuario");


  const cargarUsuarios = async () => {
    try {
      const lista = await getUsuarios();
      setUsuarios(lista);
    } catch (err) {
      console.log("Error al cargar usuarios:", err);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);


  const crearUsuario = async () => {
    if (!newUser.trim() || !newPass.trim()) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }

    try {
      const db = await getDB();
      await db.runAsync(
        "INSERT INTO usuarios (username, password, rol) VALUES (?, ?, ?)",
        [newUser.trim(), newPass.trim(), newRol]
      );
      Alert.alert("Éxito", "Usuario creado correctamente");
      setNewUser("");
      setNewPass("");
      cargarUsuarios();
    } catch (error) {
      console.error("Error al crear usuario:", error);
      Alert.alert("Error", "No se pudo crear el usuario (ya existe)");
    }
  };


  const eliminarUsuario = async (id, username) => {
    if (username === "admin" || username === "usuario") {
      Alert.alert("Prohibido", "No puedes eliminar los usuarios base del sistema");
      return;
    }
    try {
      await deleteUsuario(id);
      Alert.alert("Eliminado", "Usuario eliminado con éxito");
      cargarUsuarios();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Usuarios</Text>


      <View style={styles.form}>
        <TextInput
          placeholder="Nuevo usuario"
          style={styles.input}
          value={newUser}
          onChangeText={setNewUser}
        />
        <TextInput
          placeholder="Contraseña"
          style={styles.input}
          value={newPass}
          onChangeText={setNewPass}
          secureTextEntry
        />
        <Button title="Agregar usuario" onPress={crearUsuario} color="#007AFF" />
      </View>


      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <Text style={styles.userText}>
              👤 {item.username} ({item.rol})
            </Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => eliminarUsuario(item.id, item.username)}
            >
              <Text style={styles.deleteText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2", padding: 20 },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
    color: "#007AFF",
  },
  form: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
  },
  input: {
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  userCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  userText: { fontSize: 16, color: "#333" },
  deleteButton: {
    backgroundColor: "#ff3b30",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  deleteText: { color: "#fff", fontWeight: "600" },
});