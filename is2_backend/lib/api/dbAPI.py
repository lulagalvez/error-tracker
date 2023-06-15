import sys
import os
from datetime import timedelta
from dotenv import load_dotenv
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../data_base')))
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from config import ApplicationConfig
from flask_cors import CORS,  cross_origin
from flask import Flask, jsonify, request, make_response, abort, session
from dbmaker import db, User, Developer, Report, Software, Comment, app, Admin, software_dev
from sqlalchemy import text
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = '../data_base/imgs'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'jpg', 'png', 'log'}


migrate = Migrate(app, db)
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
    response.headers.add("Access-Control-Allow-Origin", 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Headers', "http://localhost:3000")
    response.headers.add('Access-Control-Allow-Methods', "http://localhost:3000")
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
    print("**INICIA LOGIN**\n")
    if user is None:
        response = make_response  (jsonify({"error":"Correo o contraseña incorrectas"}), 401)
    if not bcrypt.check_password_hash(user.password, password):
        response = make_response(jsonify({"error": "Contraseña incorrecta"}), 401)

    response = make_response(jsonify({
        "name": user.name,
        "id": user.id,
        "email": user.email
    }))
    response.set_cookie('name',user.name)
    response.set_cookie('email', user.email)
    response.set_cookie('authenticated', 'true')
    response.set_cookie('type_of_user',user.type_of_user)
    response.set_cookie('id',user.id)

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
        user_data['type_of_user'] = user.type_of_user
        temp.append(user_data)

    return jsonify(temp)

@app.route('/users', methods=['POST'])
def create_user():
    name = request.json['name']
    email = request.json['email']
    password = request.json['password']
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(name=name, email=email, password = hashed_password)
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

@app.route('/users/<email>', methods=['DELETE' ])
def delete_user(email):
    user = User.query.filter_by(email).first()
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

@app.route('/devs/<email>', methods=['DELETE' ])
def delete_dev(email):
    dev = Developer.query.filter_by(email=email).first()
    db.session.delete(dev)
    db.session.commit()
    return jsonify({'message':'Dev eliminado'})

@app.route('/devs', methods=['GET' ])
def get_devs():
    devs = Developer.query.all()
    temp = []
    for dev in devs:
        dev_data = {}
        dev_data['id'] = dev.id
        dev_data['name'] = dev.name
        dev_data['email'] = dev.email
        temp.append(dev_data)

    return jsonify(temp)

@app.route('/devs', methods=['POST'])
def create_dev():
    name = request.json['name']
    email = request.json['email']
    password = request.json['password']
    hashed_password = bcrypt.generate_password_hash(password)
    new_dev = Developer(name=name, email=email,password=hashed_password)
    db.session.add(new_dev)
    db.session.commit()
    return jsonify({'message': 'Developer creado'})

@app.route('/devs/promote/<email>', methods=['PUT'])
def promote_to_dev(email):
    user_to_promote = User.query.filter_by(email=email).first()
    old_name=user_to_promote.name
    old_email=user_to_promote.email
    old_password=user_to_promote.password
    db.session.delete (user_to_promote)
    db.session.commit()
    new_dev = Developer(name=old_name,email=old_email,
                        password=old_password)
    db.session.add(new_dev)
    db.session.commit()
    return jsonify({'message': 'Usuario ascendido a developer'})

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
def delete_dev_id(id):
    dev = Developer.query.get_or_404(id)
    db.session.delete(dev)
    db.session.commit()
    return jsonify({'message': 'Developer eliminado'})

######################################ADMIN######################################
@app.route('/admins', methods=['GET' ])
def get_admins():
    admins = Admin.query.all()
    temp = []
    for admin in admins:
        admin_data = {}
        admin_data['id'] = admin.id
        admin_data['name'] = admin.name
        admin_data['email'] = admin.email
        temp.append(admin_data)

    return jsonify(temp)

@app.route('/admins', methods=['POST'])
def create_admin():
    name = request.json['name']
    email = request.json['email']
    password = request.json['password']
    hashed_password = bcrypt.generate_password_hash(password)
    new_admin = Admin(name=name, email=email,password=hashed_password)
    db.session.add(new_admin)
    db.session.commit()
    return jsonify({'message': 'admin creado'})

@app.route('/admins/promote/<email>', methods=['PUT'])
def promote_to_admin(email):
    user_to_promote = User.query.filter_by(email=email).first()
    old_name=user_to_promote.name
    old_email=user_to_promote.email
    old_password=user_to_promote.password
    db.session.delete (user_to_promote)
    db.session.commit()
    new_admin = Admin(name=old_name,email=old_email,
                        password=old_password)
    db.session.add(new_admin)
    db.session.commit()
    return jsonify({'message': 'Usuario ascendido a admin'})
#####################################REPORT#####################################
@app.route('/reports/<id>', methods=['GET'])
def get_report(id):
    report = Report.query.get_or_404(id)
    report_data = {}
    report_data['id'] = report.id
    report_data['title'] = report.title
    report_data['date'] = report.date
    report_data['description'] = report.description
    report_data['user_id'] = report.user_id
    report_data['user_name'] = report.user_name 
    report_data['user_email'] = report.user_email 
    report_data['dev_id'] = report.dev_id
    report_data['dev_name'] = report.dev_name        
    report_data['dev_email'] = report.dev_email        
    report_data['software'] = report.software
    report_data['software_name'] = report.software_name
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
        report_data['user_name'] = report.user_name 
        report_data['user_email'] = report.user_email 
        report_data['dev_id'] = report.dev_id
        report_data['dev_name'] = report.dev_name        
        report_data['dev_email'] = report.dev_email        
        report_data['software'] = report.software
        report_data['software_name'] = report.software_name
        report_data['urgency'] = report.urgency
        report_data['status'] = report.status
        temp.append(report_data)

    return jsonify(temp)

@app.route('/reports', methods=['POST'])
def create_report():
    if request.method == "OPTIONS": # CORS preflight
        return _build_cors_preflight_response()
    elif request.method =="POST":
        # Obtener los datos del reporte desde el cuerpo de la solicitud
        title = request.json['title']
        description = request.json['description']
        user_id = request.json['user_id']
        user_name = request.json['user_name']
        user_email = request.json['user_email']
        dev_id = request.json['dev_id']
        dev_name = request.json['dev_name']
        dev_email = request.json['dev_email']
        software = request.json['software']
        software_name = request.json['software_name']
        urgency = request.json['urgency']
        status = request.json['status']

        # Verificar si se adjuntó un archivo
        if 'file' in request.files:
            file = request.files['file']
            if file.filename != '':
                # Verificar la extensión del archivo adjunto
                if file.filename.rsplit('.', 1)[1].lower() not in ALLOWED_EXTENSIONS:
                    return jsonify({'error': 'Archivo no permitido'}), 400

                # Generar un nombre seguro para el archivo adjunto
                filename = secure_filename(file.filename)
                # Guardar el archivo en la ruta de almacenamiento
                file.save(os.path.join(UPLOAD_FOLDER, filename))

                # Guardar el nombre del archivo adjunto en la base de datos
                # Agrega el nombre del archivo adjunto a tu modelo Report
                new_report = Report(
                    title=title,
                    description=description,
                    user_id=user_id,
                    user_name=user_name,
                    user_email=user_email,
                    dev_id=dev_id,
                    dev_name=dev_name,
                    dev_email=dev_email,
                    software=software,
                    software_name=software_name,
                    urgency=urgency,
                    status=status,
                    attachment=filename  # Agrega el nombre del archivo adjunto al modelo
                )
        else:
            # Si no se adjuntó ningún archivo, crea el objeto Report sin el campo de archivo adjunto
            new_report = Report(
                title=title,
                description=description,
                user_id=user_id,
                user_name=user_name,
                user_email=user_email,
                dev_id=dev_id,
                dev_name=dev_name,
                dev_email=dev_email,
                software=software,
                software_name=software_name,
                urgency=urgency,
                status=status
            )

        db.session.add(new_report)
        db.session.commit()
        return jsonify({'message':'Reporte creado'})
    else:
        raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))


@app.route('/reports/<id>', methods=['PUT'])
def update_report(id):
    report = Report.query.get_or_404(id)
    title = request.json['title']
    description = request.json['description']
    dev_id = request.json['dev_id']
    dev_email = request.json['dev_email']
    dev_name = request.json['dev_name']
    user_id = request.json['user_id']
    software = request.json['software']
    urgency = request.json['urgency'] 
    status = request.json['status']
    report.title =  title
    report.description = description
    report.dev_id = dev_id
    report.dev_email = dev_email
    report.dev_name = dev_name
    report.user_id = user_id
    report.software = software
    report.urgency = urgency
    report.status = status
    db.session.commit()
    return jsonify({'message': 'Reporte actualizado'})

@app.route('/reports/<id>/update_priority/<priority>', methods=['PATCH'])

def update_reportprio(id,priority):
    if request.method == "OPTIONS": # CORS preflight
        return _build_cors_preflight_response()
    report = Report.query.get(id)
    report.urgency = priority
    db.session.commit()
    return jsonify({'message': 'Prioridad del reporte actualizado'})
    
@app.route('/reports/<id>/update_status/<status>', methods=['PATCH'])
def update_reportstatus(id,status):
    if request.method == "OPTIONS": # CORS preflight
        return _build_cors_preflight_response()
    report = Report.query.get(id)
    report.status = status
    db.session.commit()
    return jsonify({'message': 'Estado del reporte actualizado'})

@app.route('/reports/<id>/update_dev/<email>', methods=['PATCH'])
def update_report_dev(id,email):
    if request.method == "OPTIONS": # CORS preflight
        return _build_cors_preflight_response()
    report = Report.query.get(id)
    dev = User.query.filter_by(email = email).first()
    report.dev_name = dev.name
    report.dev_id = dev.id
    report.dev_email = dev.email
    db.session.commit()
    return jsonify({'message': 'Depurador del reporte actualizado'})

@app.route('/reports/<id>', methods=['DELETE'])
def delete_report(id):
    report = Report.query.get_or_404(id)
    db.session.delete(report)
    db.session.commit()
    return jsonify({'message': 'Reporte eliminado'})

@app.route('/reports/reassign', methods=['PATCH'])
def reassign(id):
    id = request.json('id')
    report=Report.query.get(id)
    report.reassign = True
    db.session.commit()
    return jsonify ({'message':'Reasignacion activada'})

@app.route('/reports/deassign', methods=['PATCH'])
def deassign(id):
    id = request.json('id')
    report=Report.query.get(id)
    report.reassign = False
    db.session.commit()
    return jsonify ({'message':'Reasignacion desactivada'})

#@app.route('/reports/<id>', methods=['GET'])
#def get_names(id):
#    report = Report.query.filter_by(id).first()
#    db.session.delete(report)
#    db.session.commit()
#    return jsonify({'message': 'Reporte eliminado'})

@app.route('/dev_reports/<email>', methods=['GET'])
def get_dev_reports(email):
    reports = Report.query.filter_by(dev_email = email)
    temp = []
    for report in reports:
        report_data = {}
        report_data['id'] = report.id
        report_data['title'] = report.title
        report_data['date'] = report.date
        report_data['description'] = report.description
        report_data['user_id'] = report.user_id
        report_data['user_name'] = report.user_name 
        report_data['user_email'] = report.user_email 
        report_data['dev_id'] = report.dev_id
        report_data['dev_name'] = report.dev_name        
        report_data['dev_email'] = report.dev_email        
        report_data['software'] = report.software
        report_data['software_name'] = report.software_name
        report_data['urgency'] = report.urgency
        report_data['status'] = report.status
        temp.append(report_data)
    return jsonify(temp)

@app.route('/user_reports/<email>', methods=['GET', ])
def get_user_reports(email):
    reports = Report.query.filter_by(user_email = email)
    temp = []
    for report in reports:
        report_data = {}
        report_data['id'] = report.id
        report_data['title'] = report.title
        report_data['date'] = report.date
        report_data['description'] = report.description
        report_data['user_id'] = report.user_id
        report_data['user_name'] = report.user_name 
        report_data['user_email'] = report.user_email 
        report_data['dev_id'] = report.dev_id
        report_data['dev_name'] = report.dev_name        
        report_data['dev_email'] = report.dev_email        
        report_data['software'] = report.software
        report_data['software_name'] = report.software_name
        report_data['urgency'] = report.urgency
        report_data['status'] = report.status
        temp.append(report_data)

    return jsonify(temp)

#####################################COMMENTS#####################################

@app.route('/comments', methods=['GET'])
def get_comments():
    comments = Comment.query.all()
    temp = []
    for comment in comments:
        comment_data = {}
        comment_data['id'] = comment.id
        comment_data['content'] = comment.content
        comment_data['date'] = comment.date
        comment_data['report_id'] = comment.report_id
        comment_data['commenter_id'] = comment.commenter_id
        comment_data['commenter_name'] = comment.commenter_name
        temp.append(comment_data)
    return jsonify(temp)

@app.route('/comments/<int:id>', methods=['GET'])
def get_comment(id):
    comment = Comment.query.filter_by(id=id).first()
    if comment:
        return jsonify({'id': comment.id, 'content': comment.content, 'report_id': comment.report_id, 'commenter_id':comment.commenter_id, 'commenter_name':comment.commenter_name, 'date': comment.date})
    else:
        return jsonify({'message': 'Comment not found'})
    
@app.route('/comments_in/<int:report_id>', methods=['GET'])
def get_comment_in(report_id):
    comments = Comment.query.filter_by(report_id=report_id)
    temp = []
    for comment in comments:
        comment_data = {}
        comment_data['id'] = comment.id
        comment_data['content'] = comment.content
        comment_data['date'] = comment.date
        comment_data['report_id'] = comment.report_id
        comment_data['commenter_id'] = comment.commenter_id
        comment_data['commenter_name'] = comment.commenter_name
        temp.append(comment_data)
    return jsonify(temp)
    
@app.route('/comments', methods=['POST'])
def create_comment():
    if request.method == "OPTIONS": # CORS preflight
        return _build_cors_preflight_response()
    elif request.method =="POST":
        content = request.json['content']
        report_id = request.json['report_id']
        commenter_id = request.json['commenter_id']
        commenter_name = request.json['commenter_name']
        new_comment = Comment(content=content, commenter_id=commenter_id, commenter_name=commenter_name, report_id=report_id)
        db.session.add(new_comment)
        db.session.commit()
        return jsonify({'message':'Comentario creado'})
    else:
        raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))
    


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

@app.route('/software/append', methods=['PUT'])
def software_append():
    id = request.json['id']
    dev_email = request.json['email']
    
    software = Software.query.filter_by(id=id).first()
    dev = Developer.query.filter_by(email=dev_email).first()
    
    if software is None:
        return jsonify({'error': 'Software not found'})
    
    if dev is None:
        return jsonify({'error': 'Developer not found'})
    
    software.devs.append(dev)
    
    db.session.add(software)
    db.session.commit()
    
    return jsonify({'software': software.name, 'developer': dev.name})


@app.route('/software_dev', methods=['GET'])
def get_software_dev():
    software_dev_entries = db.session.query(software_dev).all()

    software_dev_list = []
    for entry in software_dev_entries:
        software_dev_dict = {
            'software_id': entry.software_id,
            'dev_id': entry.dev_id
        }
        software_dev_list.append(software_dev_dict)

    return jsonify({'software_dev': software_dev_list})


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

@app.route('/software/<id>', methods=['DELETE'])
def delete_software_id(id):
    software = Software.query.get_or_404(id)
    db.session.delete(software)
    db.session.commit()
    return jsonify({'message': 'Software eliminado'})


def get_software_reports(id):
    reports = Report.query.filter_by(software_id=id).all()
    if reports:
        report_list = []
        for report in reports:
            report_list.append({'id': report.id, 'title': report.title, 'description': report.description, 'date': report.date.isoformat(), 'user_id': report.user_id, 'urgency': report.urgency, 'status':report.status})
        return jsonify(report_list)
    else:
        return jsonify({'message': 'No reports found for software'})

@app.route('/count_notclosed_bug_reports', methods=['GET'])
def count_notclosed_bug_reports():
    developers=Developer.query.all()
    result={}
    for developer in developers:
        count= Report.query.filter(
            Report.dev_id == developer.id,
            Report.status != 'Closed'
        ).count()
        result[developer.id]= count
    return jsonify(result)
def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")


    return response

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug = True)