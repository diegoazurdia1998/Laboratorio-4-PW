from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Cancion
import os
from dotenv import load_dotenv
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

app = Flask(__name__)

# Habilitar CORS para que React pueda comunicarse con esta API
CORS(app)

# Configuración de la base de datos SQLite (creará un archivo canciones.db en tu carpeta)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///canciones.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Cargar las variables del archivo .env al sistema
load_dotenv()

# --- CONFIGURACIÓN DE SPOTIFY ---
# Ahora las credenciales se leen de forma segura
SPOTIPY_CLIENT_ID = os.getenv('SPOTIPY_CLIENT_ID')
SPOTIPY_CLIENT_SECRET = os.getenv('SPOTIPY_CLIENT_SECRET')

# Autenticación con Spotify
auth_manager = SpotifyClientCredentials(client_id=SPOTIPY_CLIENT_ID, client_secret=SPOTIPY_CLIENT_SECRET)
sp = spotipy.Spotify(auth_manager=auth_manager)


# --- NUEVA RUTA: Buscar en Spotify ---
@app.route('/api/buscar-spotify', methods=['GET'])
def buscar_en_spotify():
    # Obtener el término de búsqueda de los parámetros de la URL (ej: /api/buscar-spotify?q=cerati)
    query = request.args.get('q')

    if not query:
        return jsonify({'error': 'Debes proporcionar un término de búsqueda (q)'}), 400

    try:
        # Buscar en Spotify (limitado a 5 resultados para no saturar el frontend)
        resultados = sp.search(q=query, limit=5, type='track')
        canciones_encontradas = []

        for item in resultados['tracks']['items']:
            canciones_encontradas.append({
                'nombre': item['name'],
                'artista': item['artists'][0]['name'],  # Tomamos el artista principal
                'imagen_album': item['album']['images'][0]['url'] if item['album']['images'] else None,
                'spotify_url': item['external_urls']['spotify']
            })

        return jsonify(canciones_encontradas), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500



# Inicializar la base de datos con la aplicación
db.init_app(app)

# Crear las tablas automáticamente antes de la primera petición si no existen
with app.app_context():
    db.create_all()


# --- RUTAS (CONTROLADORES) ---

# 1. Ruta para visualizar el listado de canciones
@app.route('/api/canciones', methods=['GET'])
def obtener_canciones():
    # Consultar todas las canciones en la base de datos
    canciones = Cancion.query.all()
    # Convertir los objetos a diccionarios y enviarlos como JSON
    return jsonify([cancion.to_dict() for cancion in canciones]), 200


# 2. Ruta para ingresar una nueva canción
@app.route('/api/canciones', methods=['POST'])
def agregar_cancion():
    data = request.get_json()

    # Validar que se incluyan el nombre y el artista obligatoriamente
    if not data or 'nombre' not in data or 'artista' not in data:
        return jsonify({'error': 'Se requiere nombre y artista'}), 400

    nombre_cancion = data['nombre']
    artista_cancion = data['artista']

    nueva_cancion = Cancion(nombre=nombre_cancion, artista=artista_cancion)

    # Guardar en la base de datos
    db.session.add(nueva_cancion)
    db.session.commit()

    respuesta = {
        'mensaje': 'Canción registrada exitosamente.',
        'cancion': nueva_cancion.to_dict()
    }

    # Lógica de la Bonificación (¡Asegúrate de cambiar "Bohemian Rhapsody" por la real!)
    cancion_favorita_docente = "Bohemian Rhapsody"
    if nombre_cancion.lower() == cancion_favorita_docente.lower():
        respuesta['bonificacion'] = '¡Felicidades! Has ingresado la canción favorita del docente (+0.5 puntos netos).'

    return jsonify(respuesta), 201


if __name__ == '__main__':
    # Ejecutar el servidor en modo debug para desarrollo
    app.run(debug=True, port=5000)