USUARIO ADMIN:
username: admin
password: admin123

Instalación desde cero

Cloná o descargá el proyecto:

git clone https://github.com/tuusuario/nombre-proyecto.git
cd nombre-proyecto

(Si no lo clonás, simplemente abrí la carpeta que tenés en tu escritorio en VS Code.)

Instalá las dependencias:

npm install

Instalá SQLite para Expo:

npx expo install expo-sqlite

▶️ Ejecutar la aplicación

Iniciá el servidor de desarrollo:

npx expo start

Escaneá el QR con la app Expo Go (en Android o iOS).
También podés abrirlo en un emulador o en la web con:

npx expo start --android

o

npx expo start --web

🧠 Funcionamiento general

1. Base de datos (database/db.js)

Se crea automáticamente al iniciar la app.

Contiene una tabla users con:

id INTEGER PRIMARY KEY AUTOINCREMENT,
username TEXT UNIQUE,
password TEXT

Se genera un usuario por defecto:

username: admin
password: admin123

2. Login (screens/LoginScreen.jsx)

Permite ingresar con las credenciales.

Si las credenciales son correctas, se guarda la sesión local y se navega a la pantalla principal.

3. Home / Gestión de usuarios (screens/HomeScreen.jsx)

Muestra la lista de usuarios almacenados.

Permite crear nuevos usuarios.

Permite eliminar usuarios, excepto el admin.

Incluye botón de logout que borra la sesión y vuelve al login.

4. Sesión (saveSession y getSession)

Cuando el usuario inicia sesión correctamente, se guarda su información.

Al abrir la app, si hay sesión activa, se salta automáticamente el login.
