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
@app.route('/devs/<id>', methods=['GET'])
def get_dev(id):
    dev = Developer.query.get_or_404(id)
    dev_data = {}
    dev_data['id'] = dev.id
    dev_data['name'] = dev.name
    dev_data['email'] = dev.email
    dev_data['role'] = dev.role
    return jsonify({'dev': dev_data})

@app.route('/devs', methods=['GET'])
def get_devs():
    devs = Developer.query.all()
    temp = []
    for dev in devs:
        dev_data = {}
        dev_data['id'] = dev.id
        dev_data['name'] = dev.name
        dev_data['email'] = dev.email
        dev_data['role'] = dev.role
        temp.append(dev_data)

    return jsonify(temp)

@app.route('/devs', methods=['POST'])
def create_dev():
    name = request.json['name']
    email = request.json['email']
    role = request.json["role"]
    new_dev = Developer(name=name, email=email, role = role)
    db.session.add(new_dev)
    db.session.commit()
    return jsonify({'message': 'Developer creado'})

@app.route('/devs/<id>', methods=['PUT'])
def update_dev(id):
    dev = Developer.query.get_or_404(id)
    name = request.json['name']
    email = request.json['email']
    role = request.json['role']
    dev.name = name
    dev.email = email
    dev.role = role
    db.session.commit()
    return jsonify({'message': 'Developer actualizado'})

@app.route('/devs/<id>', methods=['DELETE'])
def delete_dev(id):
    dev = Developer.query.get_or_404(id)
    db.session.delete(dev)
    db.session.commit()
    return jsonify({'message': 'Developer eliminado'})

#####################################REPORT#####################################
@app.route('/reports/<id>', methods=['GET'])
def get_report(id):
    report = Report.query.get_or_404(id)
    report_data = {}
    report_data['id'] = report.id
    report_data['title'] = report.title
    report_data['description'] = report.description
    report_data['priority'] = report.priority
    report_data['user_id'] = report.user_id
    report_data['dev_id'] = report.dev_id
    return jsonify({'report': report_data})

@app.route('/reports', methods=['GET'])
def get_reports():
    reports = Report.query.all()
    temp = []
    for report in reports:
        report_data = {}
        report_data['id'] = report.id
        report_data['title'] = report.title
        report_data['date'] = report.date
        report_data['description'] = report.description
        report_data['priority'] = report.priority
        report_data['user_id'] = report.user_id
        report_data['dev_id'] = report.dev_id
        temp.append(report_data)

    return jsonify(temp)

@app.route('/reports', methods=['POST'])
def create_report():
    title = request.json['title']
    description = request.json['description']
    priority = request.json['priority']
    user_id = request.json['user_id']
    dev_id = request.json['dev_id']
    new_report = Report(title=title, description=description, priority=priority, user_id=user_id, dev_id=dev_id)
    db.session.add(new_report)
    db.session.commit()
    return jsonify({'message': 'Reporte creado'})

@app.route('/reports/<id>', methods=['PUT'])
def update_report(id):
    report = Report.query.get_or_404(id)
    title = request.json['title']
    description = request.json['desctription']
    date = request.json["date"]
    report.title =  title
    report.description = description
    report.date = date
    db.session.commit()
    return jsonify({'message': 'Reporte actualizado'})

@app.route('/reports/<id>', methods=['DELETE'])
def delete_report(id):
    report = Report.query.get_or_404(id)
    db.session.delete(report)
    db.session.commit()
    return jsonify({'message': 'Reporte eliminado'})

@app.route('/user_reports/<user_id>', methods=['GET'])
def get_user_reports(user_id):
    reports = Report.query.filter_by(user_id = user_id)
    temp = []
    for report in reports:
        report_data = {}
        report_data['id'] = report.id
        report_data['title'] = report.title
        report_data['date'] = report.date
        report_data['description'] = report.description
        report_data['user_id'] = report.user_id
        report_data['dev_id'] = report.dev_id
        temp.append(report_data)

    return jsonify(temp)

@app.route('/dev_reports/<dev_id>', methods=['GET'])
def get_dev_reports(dev_id):
    reports = Report.query.filter_by(dev_id = dev_id)
    temp = []
    for report in reports:
        report_data = {}
        report_data['id'] = report.id
        report_data['title'] = report.title
        report_data['date'] = report.date
        report_data['description'] = report.description
        report_data['user_id'] = report.user_id
        report_data['dev_id'] = report.dev_id
        temp.append(report_data)

    return jsonify(temp)

####################################SOFTWARE###################################

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug = True)