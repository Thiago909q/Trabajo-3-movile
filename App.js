import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import UsuariosScreen from "./screens/UsuariosScreen";
import { initDB, loadSession } from "./database/db";

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = async () => {
      await initDB();
      const session = await loadSession();
      if (session) setUser(session);
      setReady(true);
    };
    start();
  }, []);

  if (!ready) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <Stack.Screen name="Login" options={{ title: "Iniciar sesión" }}>
            {(props) => <LoginScreen {...props} setUser={setUser} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Home" options={{ title: "Películas" }}>
              {(props) => <HomeScreen {...props} user={user} setUser={setUser} />}
            </Stack.Screen>

            {user.rol === "admin" && (
              <Stack.Screen name="Usuarios" options={{ title: "Gestión de Usuarios" }}>
                {(props) => <UsuariosScreen {...props} user={user} />}
              </Stack.Screen>
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
