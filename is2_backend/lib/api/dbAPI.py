import sys
import os
from datetime import timedelta
from dotenv import load_dotenv
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../data_base')))

from dbmaker import db, User, Developer, Report, Software, app
from flask import Flask, jsonify, request, make_response, abort, session
from flask_cors import CORS,  cross_origin
from flask_bcrypt import Bcrypt 
from config import ApplicationConfig
from flask_migrate import Migrate
migrate = Migrate(app,db)
bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SESSION_TYPE'] = 'filesystem'
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=30)
app.config['SESSION_COOKIE_SECURE'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'None'
app.secret_key = "FLASKQLOSIONOLOKO@"

def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response
# CORS(app,resources={
#     r"/users/*":{"origins":"http://localhost"},
#     r"/devs/*":{"origins":"http://localhost"},
#     r"/reports/*":{"origins":"http://localhost"},
#     r"/software/*":{"origins":"http://localhost"},
#     r"/dev_reports/*":{"origins":"http://localhost"},
#     r"/user_reports/*":{"origins":"http://localhost"}
#     })

######################################SESSION ROUTES######################################
@app.route ('/register', methods=['POST'])
def register_user():
    name = request.json["name"]
    email = request.json["email"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email=email).first() is not None
    if user_exists:
        abort(409)
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(name=name, email = email, password = hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify ({
        "name":new_user.name,
        "id":new_user.id,
        "email":new_user.email,
    })

@app.route ('/login', methods = ['POST'])
def login():
    email = request.json["email"]
    password = request.json["password"]
    user = User.query.filter_by(email = email).first()
    if user is None:
        response = make_response  (jsonify({"error":"Correo o contraseña incorrectas"}), 401)
    if not bcrypt.check_password_hash(user.password, password):
        response = make_response(jsonify({"error": "Contraseña incorrecta"}), 401)
    
    response = make_response(jsonify({
        "name": user.name,
        "id": user.id,
        "email": user.email
    }))
    response.set_cookie('user_id', str(user.id))
    response.set_cookie('email', user.email)
    response.set_cookie('authenticated', 'true')

    return response
@app.route("/@me", methods=['GET'])
def get_current_user():

    if request.cookies:
        # Hay cookies presentes
        return jsonify({'message': 'Hay cookies presentes.'})
    else:
        # No hay cookies presentes
        return jsonify({'message': 'No hay cookies presentes.'}), 401

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
    password = request.json['password']
    new_user = User(name=name, email=email, password = password)
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

@app.route('/users/<id>', methods=['DELETE' ])
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'Usuario eliminado'})

####################################DEVELOPER###################################
@app.route('/devs/<id>', methods=['GET' ])
def get_dev(id):
    dev = Developer.query.get_or_404(id)
    dev_data = {}
    dev_data['id'] = dev.id
    dev_data['name'] = dev.name
    dev_data['email'] = dev.email
    dev_data['role'] = dev.role
    return jsonify({'dev': dev_data})

@app.route('/devs', methods=['GET' ])
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

#####################################REPORT#####################################
@app.route('/reports/<id>', methods=['GET'])
def get_report(id):
    report = Report.query.get_or_404(id)
    report_data = {}
    report_data['id'] = report.id
    report_data['title'] = report.title
    report_data['description'] = report.description
    report_data['user_id'] = report.user_id
    report_data['dev_id'] = report.dev_id
    report_data['software'] = report.software
    report_data['urgency'] = report.urgency
    report_data['status'] = report.status
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
        report_data['user_id'] = report.user_id
        report_data['dev_id'] = report.dev_id
        report_data['software'] = report.software
        report_data['urgency'] = report.urgency
        report_data['status'] = report.status
        temp.append(report_data)

    return jsonify(temp)

@app.route('/reports', methods=['POST'])
def create_report():
    if request.method == "OPTIONS": # CORS preflight
        return _build_cors_preflight_response()
    elif request.method =="POST":
        title = request.json['title']
        description = request.json['description']
        user_id = request.json['user_id']
        dev_id = request.json['dev_id']
        software = request.json['software']
        urgency = request.json['urgency'] 
        status = request.json['status']
        new_report = Report(title=title, description=description, user_id=user_id, dev_id=dev_id,software = software, urgency = urgency, status = status)
        db.session.add(new_report)
        db.session.commit()
        return _corsify_actual_response(jsonify({'message':'Reporte creado'}))
    else:
        raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))


@app.route('/reports/<id>', methods=['PUT'])
def update_report(id):
    report = Report.query.get_or_404(id)
    title = request.json['title']
    description = request.json['description']
    dev_id = request.json['dev_id']
    user_id = request.json['user_id']
    software = request.json['software']
    urgency = request.json['urgency'] 
    status = request.json['status']
    report.title =  title
    report.description = description
    report.dev_id=dev_id
    report.user_id = user_id
    report.software = software
    report.urgency = urgency
    report.status = status
    db.session.commit()
    return jsonify({'message': 'Reporte actualizado'})

@app.route('/reports/<id>', methods=['DELETE', ])
def delete_report(id):
    report = Report.query.get_or_404(id)
    db.session.delete(report)
    db.session.commit()
    return jsonify({'message': 'Reporte eliminado'})

@app.route('/dev_reports/<dev_id>', methods=['GET', ])
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
        report_data['software'] = report.software
        report_data['urgency'] = report.urgency
        report_data['status'] = report.status
        temp.append(report_data)

    return jsonify(temp)

#####################################SOFTWARE#####################################

@app.route('/software', methods=['GET'])
def get_softwares():
    softwares = Software.query.all()
    temp = []
    for software in softwares:
        software_data = {}
        software_data['id'] = software.id
        software_data['name'] = software.name
        temp.append(software_data)
    return jsonify(temp)

@app.route('/software/<int:id>', methods=['GET'])
def get_software(id):
    software = Software.query.filter_by(id=id).first()
    if software:
        return jsonify({'id': software.id, 'name': software.name})
    else:
        return jsonify({'message': 'Software not found'})
    
@app.route('/software/<int:id>', methods=['PUT'])
def put_software(id):
    software = Software.query.filter_by(id=id).first()
    if software:
        software.name = request.json['name']
        db.session.commit()
        return jsonify({'id': software.id, 'name': software.name})
    else:
        software = software(request.json['name'])
        db.session.add(software)
        db.session.commit()

@app.route('/software', methods=['POST'])
def create_software():
    name = request.json['name']
    new_soft = Software (name=name)
    db.session.add(new_soft)
    db.session.commit()
    return jsonify({'message': 'Software creado'})

def get_software_reports(id):
    reports = Report.query.filter_by(software_id=id).all()
    if reports:
        report_list = []
        for report in reports:
            report_list.append({'id': report.id, 'title': report.title, 'description': report.description, 'date': report.date.isoformat(), 'user_id': report.user_id, 'urgency': report.urgency, 'status':report.status})
        return jsonify(report_list)
    else:
        return jsonify({'message': 'No reports found for software'})

def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug = True)