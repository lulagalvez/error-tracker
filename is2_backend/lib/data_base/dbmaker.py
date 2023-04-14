from datetime import datetime
from flask import Flask, jsonify, request
from flask_sqlalchemy import *
from dataclasses import dataclass

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///example.db'
db = SQLAlchemy(app)

#   Usuario (Postea Reports)
#   ID: Clave Primaria
#   Correo electronico
#   Nombre   
#   Fecha de creacion de usuario
#   Reports
@dataclass
class User(db.Model):
    __tablename__ = ('User')
    id:int = db.Column(db.Integer, primary_key=True)
    name:str = db.Column(db.String(80), nullable=False)
    email:str = db.Column(db.String(120), unique=True, nullable=False)
#    reports = db.relationship('Report', backref = 'User')
    def __init__ (self, name, email):
        self.name = name
        self.email = email


# Reporte:
#   ID: Clave Primaria
#   Titulo
#   Descripcion
#   Fecha
#   Depurador asociado: Clave foranea, db.ForeignKey('dev.id') 
#   
class Developer(db.Model):
    __tablename__= ('Developer')
    id = db.Column (db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    role = db.Column (db.String(40), nullable=False)
#    reports = db.relationship('Report', backref = 'Developer')
    

class Report (db.Model):
    __tablename__ = ('Report')
    id = db.Column (db.Integer, primary_key=True)
    title = db.Column (db.String(80), nullable=False)
    description = db.Column (db.Text, nullable = False)
    date = db.Column (db.DateTime, default=datetime.utcnow)

#    user_id = db.Column (db.Integer, db.ForeignKey('User.id'))
#   dev_id = db.Column (db.Integer, db.ForeignKey('Developer.id'))

#Developer:
#   id (Primary Key)
#   Nombre
#   email
#   rol 

# ONE TO MANY:
#class Person(db.Model):
#    id = db.Column(db.Integer, primary_key=True)
#    name = db.Column(db.String(50), nullable=False)
#    addresses = db.relationship('Address', backref='person', lazy=True)

#class Address(db.Model):
#    id = db.Column(db.Integer, primary_key=True)
#    email = db.Column(db.String(120), nullable=False)
#    person_id = db.Column(db.Integer, db.ForeignKey('person.id'), nullable=False)

with app.app_context():
    db.create_all()


