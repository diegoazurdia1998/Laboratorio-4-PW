# Laboratorio No. 4 - Aplicación de Registro de Canciones 

Este proyecto es una aplicación web desarrollada para el Laboratorio No. 4 de la Facultad de Ingeniería de la Universidad Rafael Landívar.

## 🎯 Objetivo del Proyecto
 Crear una aplicación web que permita ingresar canciones y almacenarlas en una base de datos, además de visualizar el listado completo de las canciones ingresadas.

## 🛠️ Tecnologías y Arquitectura
 El proyecto está dividido en dos partes principales, desarrolladas en parejas:

* **Backend:** Construido con Flask (Python) para manejar la lógica de la aplicación y las rutas.
* **Base de Datos:** Consumo de base de datos implementado mediante un ORM (Object-Relational Mapping) en Flask.
* **Frontend:** Construido con React, incluyendo las rutas y vistas necesarias para la interfaz de usuario.

## ✅ Requerimientos del Sistema
* **Ingreso de Datos:** El sistema debe permitir registrar canciones especificando únicamente el **nombre** y el **artista**.
* **Visualización:** El sistema debe permitir visualizar el listado de todas las canciones ingresadas.
* **Seguridad:** Por requerimiento del laboratorio, **no** es necesario implementar un inicio de sesión o autenticación.
* **Bonificación (Easter Egg):** Se debe incluir la canción favorita del docente en el listado final para obtener una bonificación de 0.5 puntos netos.

## 🚀 Configuración y Ejecución (Por completar durante el desarrollo)

### Backend (Flask)

Para levantar el servidor backend en un entorno de desarrollo local, sigue estos pasos:

1. **Crear y activar el entorno virtual:**
   * En la terminal, asegúrate de estar en la carpeta raíz del proyecto y crea el entorno: `python -m venv .venv`
   * Actívalo (Windows): `.venv\Scripts\activate`
   * Actívalo (Mac/Linux): `source .venv/bin/activate`

2. **Instalar dependencias:**
   * Ejecuta el siguiente comando para instalar todas las librerías necesarias (Flask, SQLAlchemy, CORS, Spotipy y Dotenv):
     ```bash
     pip install Flask Flask-SQLAlchemy flask-cors spotipy python-dotenv
     ```
   *(Nota: Alternativamente, si existe un archivo `requirements.txt`, usa `pip install -r requirements.txt`)*.

3. **Configurar Variables de Entorno (.env):**
   * En la carpeta `backend`, crea un archivo llamado `.env`.
   * Agrega las credenciales de la API de Spotify con el siguiente formato:
     ```env
     SPOTIPY_CLIENT_ID="tu_client_id_aqui"
     SPOTIPY_CLIENT_SECRET="tu_client_secret_aqui"
     ```

4. **Configurar la Base de Datos (ORM):**
   * ¡No requiere configuración manual! Al ejecutar la aplicación por primera vez, SQLAlchemy (nuestro ORM) creará automáticamente el archivo de base de datos SQLite (`canciones.db`) y la tabla correspondiente en la carpeta del backend.

5. **Ejecutar el servidor:**
   * Inicia la aplicación con:
     ```bash
     python app.py
     ```
   * El servidor estará escuchando peticiones en `http://localhost:5000`.

---

## 📡 Endpoints y Comunicación Frontend-Backend

El frontend (React) debe comunicarse con el backend a través de las siguientes rutas (API REST) usando `fetch` o `axios`:

### 1. Buscar Canción (Integración con Spotify)
Antes de guardar, el frontend puede buscar la canción exacta para evitar errores tipográficos.
* **Ruta:** `GET /api/buscar-spotify`
* **Parámetros URL:** `?q={termino_de_busqueda}`
* **Ejemplo de petición:** `http://localhost:5000/api/buscar-spotify?q=cerati`
* **Respuesta Esperada:** Un arreglo de objetos con las coincidencias de Spotify (nombre, artista, imagen, url).

### 2. Ingresar Nueva Canción
[cite_start]Guarda la canción seleccionada en la base de datos local.
* **Ruta:** `POST /api/canciones`
* **Headers:** `"Content-Type": "application/json"`
* **Body (Formato JSON requerido):**
  [cite_start]Solo se deben enviar el nombre y el artista[cite: 14].
  ```json
  {
    "nombre": "Bohemian Rhapsody",
    "artista": "Queen"
  }

### Frontend (React)
1. Pasos para instalar dependencias de Node...
2. Comando para correr el servidor de desarrollo de React...

## 📦 Lista de Verificación para la Entrega
* [ ] Capturas de pantalla de la base de datos poblada.
* [ ] Capturas de pantalla de la aplicación web (vistas de ingreso de datos y visualización del listado).
* [ ] Archivos de código generados del frontend (asegurarse de **eliminar la carpeta `node_modules`**).
* [ ] Archivos de código generados del backend.
* [ ] Consolidar todo en un único archivo `Documento.pdf`.
* [ ] **Enviar antes del 2 de marzo a las 19:50 horas**.