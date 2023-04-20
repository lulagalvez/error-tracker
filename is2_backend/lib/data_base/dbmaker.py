from datetime import datetime
from flask import Flask, jsonify, request
from flask_sqlalchemy import *
from dataclasses import dataclass

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///example.db'
db = SQLAlchemy(app)

@dataclass
class User (db.Model):
    __tablename__ = ('user')
    id:int = db.Column(db.Integer, primary_key=True)
    name:str = db.Column(db.String(80), nullable=False)
    email:str = db.Column(db.String(120), unique=True, nullable=False)
    reports = db.relationship('Report', backref = 'user')

    def __init__ (self, name, email):
        self.name = name
        self.email = email

software_dev = db.Table('software_dev',
                    db.Column('software_id', db.Integer, db.ForeignKey('software.id')),
                    db.Column('dev_id', db.Integer, db.ForeignKey('developer.id'))
                    )

class Software (db.Model):
    __tablename__ = ('software')
    id = db.Column (db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    devs = db.relationship('Developer', secondary=software_dev, backref='softwares')

class Developer (db.Model):
    __tablename__= ('developer')
    id = db.Column (db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    role = db.Column (db.String(40), nullable=False)
    reports = db.relationship('Report', cascade="all,delete", backref = 'developer')
    
class Report (db.Model):
    __tablename__ = ('report')
    id = db.Column (db.Integer, primary_key=True)
    title = db.Column (db.String(80), nullable=False)
    description = db.Column (db.Text, nullable=False)
    date = db.Column (db.DateTime, default=datetime.utcnow)
    priority = db.Column(db.Integer, nullable=False)
    user_id = db.Column (db.Integer, db.ForeignKey('user.id'))
    dev_id = db.Column (db.Integer, db.ForeignKey('developer.id'))

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

