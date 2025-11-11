import * as SQLite from "expo-sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";

let db;


export const getDB = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync("usuarios_v2.db"); // ⚠️ nombre nuevo
  }
  return db;
};


export const initDB = async () => {
  const database = await getDB();

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      rol TEXT NOT NULL
    );
  `);


  const result = await database.getFirstAsync("SELECT COUNT(*) AS c FROM usuarios");
  if (result.c === 0) {
    await database.runAsync(
      "INSERT INTO usuarios (username, password, rol) VALUES (?, ?, ?)",
      ["admin", "admin123", "admin"]
    );
    await database.runAsync(
      "INSERT INTO usuarios (username, password, rol) VALUES (?, ?, ?)",
      ["usuario", "user123", "usuario"]
    );
  }
};


export const validateUser = async (username, password) => {
  const database = await getDB();
  const rows = await database.getAllAsync(
    "SELECT * FROM usuarios WHERE username = ? AND password = ?",
    [username, password]
  );
  return rows.length > 0 ? rows[0] : null;
};


export const getUsuarios = async () => {
  const database = await getDB();
  return await database.getAllAsync("SELECT * FROM usuarios");
};


export const deleteUsuario = async (id) => {
  const database = await getDB();
  await database.runAsync("DELETE FROM usuarios WHERE id = ?", [id]);
};


export const updateUsuario = async (id, username, password, rol) => {
  const database = await getDB();
  await database.runAsync(
    "UPDATE usuarios SET username = ?, password = ?, rol = ? WHERE id = ?",
    [username, password, rol, id]
  );
};

 
export const saveSession = async (user) => {
  await AsyncStorage.setItem("session_user", JSON.stringify(user));
};

export const loadSession = async () => {
  const data = await AsyncStorage.getItem("session_user");
  return data ? JSON.parse(data) : null;
};

export const clearSession = async () => {
  await AsyncStorage.removeItem("session_user");
};