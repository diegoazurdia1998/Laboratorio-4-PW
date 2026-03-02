import os
from dotenv import load_dotenv
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

# Cargar las variables de entorno
load_dotenv()

# Obtener credenciales
client_id = os.getenv('SPOTIPY_CLIENT_ID')
client_secret = os.getenv('SPOTIPY_CLIENT_SECRET')

print("Verificando credenciales en .env...")
if not client_id or not client_secret:
    print("❌ ERROR: No se encontraron las credenciales. Verifica tu archivo .env")
    exit()
else:
    print("✅ Credenciales cargadas correctamente.\n")

# Autenticar con Spotify
try:
    auth_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
    sp = spotipy.Spotify(auth_manager=auth_manager)

    # Hacer una búsqueda de prueba
    termino_busqueda = "Seven nation army"
    print(f"Buscando '{termino_busqueda}' en Spotify...\n")

    resultados = sp.search(q=termino_busqueda, limit=10, type='track')

    print("🎵 Resultados encontrados:")
    print("-" * 30)
    for i, item in enumerate(resultados['tracks']['items'], 1):
        nombre = item['name']
        artista = item['artists'][0]['name']
        print(f"{i}. {nombre} - {artista}")
    print("-" * 30)
    print("\n✅ ¡La conexión a la API de Spotify funciona perfectamente!")

except Exception as e:
    print(f"❌ ERROR al conectar con Spotify: {e}")