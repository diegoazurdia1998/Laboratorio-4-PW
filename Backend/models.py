from flask_sqlalchemy import SQLAlchemy

# Inicializamos el objeto SQLAlchemy que usaremos en toda la aplicación
db = SQLAlchemy()

class Cancion(db.Model):
    __tablename__ = 'canciones'

    # Columnas de la base de datos
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(150), nullable=False)
    artista = db.Column(db.String(150), nullable=False)

    def __init__(self, nombre, artista):
        self.nombre = nombre
        self.artista = artista

    # Un método extra muy útil para enviar los datos al frontend (React)
    def to_dict(self):
        return {
            'id': self.id,
            'nombre': self.nombre,
            'artista': self.artista
        }