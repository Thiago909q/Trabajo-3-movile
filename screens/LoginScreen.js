import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert, Text } from "react-native";
import { validateUser, saveSession } from "../database/db";

export default function LoginScreen({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (!username || !password) return Alert.alert("Error", "Completa todos los campos");
    try {
      const user = await validateUser(username.trim(), password.trim()); // <-- limpieza y await correcto
      if (!user) {
        Alert.alert("Error", "Credenciales incorrectas");
        return;
      }
      await saveSession(user);
      setUser(user);
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "Ocurrió un problema al validar el usuario");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        placeholderTextColor="#777"
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#777"
      />
      <Button title="Ingresar" onPress={login} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000",
    padding: 20,
  },
  input: {
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    marginBottom: 20,
    textAlign: "center",
  },
});