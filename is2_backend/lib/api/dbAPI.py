import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../data_base')))

from dbmaker import db, User, Developer, Report, app
from flask import Flask, jsonify, request


######################################USER######################################
@app.route('/users/<id>', methods=['GET'])
def get_user(id):
    user = User.query.get_or_404(id)
    user_data = {}
    user_data['id'] = user.id
    user_data['name'] = user.name
    user_data['email'] = user.email
    return jsonify({'user': user_data})

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    temp = []
    for user in users:
        user_data = {}
        user_data['id'] = user.id
        user_data['name'] = user.name
        user_data['email'] = user.email
        temp.append(user_data)

    return jsonify(temp)

@app.route('/users', methods=['POST'])
def create_user():
    name = request.json['name']
    email = request.json['email']
    new_user = User(name=name, email=email)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'Usuario creado'})

@app.route('/users/<id>', methods=['PUT'])
def update_user(id):
    user = User.query.get_or_404(id)
    name = request.json['name']
    email = request.json['email']
    user.name = name
    user.email = email
    db.session.commit()
    return jsonify({'message': 'Usuario actualizado'})

@app.route('/users/<id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'Usuario eliminado'})

####################################DEVELOPER###################################
#####################################REPORT#####################################
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug = True)