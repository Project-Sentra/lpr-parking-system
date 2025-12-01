from flask import request, jsonify
from app import app, db, User # අපි app.py එකෙන් මේවා import කරගන්නවා
import uuid # අලුත් user කෙනෙක් හදනකොට නිකන්ම password එකක් හදන්න (තාවකාලිකව)

# ==========================================
# User Registration (Sign Up) API - අලුත් යූසර් කෙනෙක් හදන්න
# ==========================================
# Frontend එකෙන් POST request එකක් `/api/signup` වෙත එව්වාම මේක වැඩ කරනවා.
@app.route('/api/signup', methods=['POST'])
def signup():
    # Frontend එකෙන් එවන දත්ත (JSON) ලබාගැනීම
    data = request.get_json()
    email = data.get('email')
    password = data.get('password') # ඇත්ත project එකකදි මේ password එක hash කරන්න ඕනේ!

    # මේ email එකෙන් දැනටමත් user කෙනෙක් ඉන්නවද කියලා බලනවා
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'message': 'User already exists!'}), 400 # 400 කියන්නේ Bad Request

    # අලුත් user කෙනෙක් database object එකක් විදියට හදනවා
    # මුලින්ම හදන user 'admin' විදියට හදමු.
    new_user = User(email=email, password=password, role='admin')

    # Database එකට එකතු කරනවා
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully!'}), 201 # 201 කියන්නේ Created

# ==========================================
# User Login API - ලොග් වෙන්න
# ==========================================
# Frontend එකෙන් POST request එකක් `/api/login` වෙත එව්වාම මේක වැඩ කරනවා.
@app.route('/api/login', methods=['POST'])
def login():
    # Frontend එකෙන් එවන email/password ලබාගැනීම
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Database එකේ මේ email එක තියෙන user කෙනෙක් ඉන්නවද කියලා බලනවා
    user = User.query.filter_by(email=email).first()

    # User කෙනෙක් ඉන්නවා නම් සහ password එකත් හරි නම්
    if user and user.password == password:
        # ඇත්ත project එකකදි මෙතනදි අපි JWT token එකක් හදලා යවන්න ඕනේ.
        # දැනට සරලව success message එකක් සහ role එක යවමු.
        return jsonify({
            'message': 'Login successful!',
            'role': user.role,
            'email': user.email
        }), 200
    else:
        # Email එක හෝ password එක වැරදි නම්
        return jsonify({'message': 'Invalid email or password'}), 401 # 401 කියන්නේ Unauthorized