import os
import sys
from datetime import datetime
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from dataclasses import dataclass
from config import ApplicationConfig
from uuid import uuid4

def get_uuid():
    return uuid4().hex

sys.path.append(os.path.abspath(
    os.path.join(os.path.dirname(__file__), '../api')))


app = Flask(__name__)
app.config.from_object(ApplicationConfig)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///example.db'
db = SQLAlchemy(app)

@dataclass
class User(db.Model):
    __tablename__ = ('user')
    id = db.Column(db.String(32), primary_key=True, default= get_uuid)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
    reports = db.relationship('Report', backref = 'user')
    type_of_user = db.Column ('type',db.String(20), default=lambda: User.__table__.name)
    __mapper_args__ = {
        'polymorphic_on':type_of_user,
        'polymorphic_identity': 'user'
    } 

    def __init__ (self, name, email, password):
        self.name = name
        self.email = email
        self.password = password

software_dev = db.Table('software_dev',
                    db.Column('software_id', db.Integer, db.ForeignKey('software.id')),
                    db.Column('dev_id', db.Integer, db.ForeignKey('developer.id'))
                    )

class Software (db.Model):
    __tablename__ = ('software')
    id = db.Column (db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    devs = db.relationship('Developer', secondary = software_dev, backref='softwares')

class Developer(User):
    __tablename__= ('developer')
    id = db.Column (db.String(32), db.ForeignKey('user.id'),primary_key=True, default=get_uuid)
    reports = db.relationship('Report', backref = 'developer')
    __mapper_args__ = { 
        'polymorphic_identity': 'developer'
    }
    def __init__ (self, name, email, password):
        super().__init__(name=name,email=email,password=password)
    
class Admin(User):
    __tablename__ = ('admin')
    id = db.Column(db.String(32), db.ForeignKey('user.id'), primary_key=True, default=get_uuid)
    
    __mapper_args__ = { 
        'polymorphic_identity': 'admin'
    }
    def __init__ (self, name, email, password):
        super().__init__(name=name,email=email,password=password)

class Report (db.Model):
    __tablename__ = ('report')
    id = db.Column (db.Integer, primary_key=True)
    title = db.Column (db.String(80), nullable=False)
    description = db.Column (db.Text, nullable = False)
    date = db.Column (db.DateTime, default=datetime.utcnow)
    user_id = db.Column (db.String(30), db.ForeignKey('user.id'))
    dev_id = db.Column (db.String(30), db.ForeignKey('developer.id'), nullable=True)
    software = db.Column (db.String(80), db.ForeignKey('software.name'))
    urgency = db.Column (db.String(10), nullable=True )
    status = db.Column (db.String(80),nullable=True) 

""" class Report (db.Model):
    __tablename__ = ('report')
    id = db.Column (db.Integer, primary_key=True)
    title = db.Column (db.String(80), nullable=False)
    description = db.Column (db.Text, nullable = False)
    date = db.Column (db.DateTime, default=datetime.utcnow)
    user_id = db.Column (db.String(30), db.ForeignKey('user.id'))
    user_name = db.Column (db.String(30),nullable = True)
    dev_id = db.Column (db.String(30), db.ForeignKey('developer.id'), nullable=True)
    dev_name = db.Column (db.String(30),nullable = True)
    software = db.Column (db.String(80), db.ForeignKey('software.name'))
    urgency = db.Column (db.String(10), nullable=True )
    status = db.Column (db.String(80),nullable=True) """


with app.app_context():
    db.create_all()
    