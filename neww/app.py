from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, JWTManager
import random

app = Flask(__name__)
CORS(app)  # Allow frontend to access backend
bcrypt = Bcrypt(app)

# Database Configuration
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///geography_game.db"  # Change for PostgreSQL/MySQL
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "your_secret_key"  # Change this in production

db = SQLAlchemy(app)
jwt = JWTManager(app)

# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    score = db.Column(db.Integer, default=0)

# Geography Data Model
class Country(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    capital = db.Column(db.String(100), nullable=False)
    landmark = db.Column(db.String(200), nullable=False)

# Initialize database
with app.app_context():
    db.create_all()

# User Signup
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    hashed_password = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
    
    user = User(username=data["username"], email=data["email"], password=hashed_password)
    db.session.add(user)
    db.session.commit()
    
    return jsonify({"message": "User created successfully!"})

# User Login
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    user = User.query.filter_by(email=data["email"]).first()
    
    if user and bcrypt.check_password_hash(user.password, data["password"]):
        access_token = create_access_token(identity=user.id)
        return jsonify({"token": access_token, "user_id": user.id, "username": user.username})
    
    return jsonify({"error": "Invalid credentials"}), 401

# Fetch Random Quiz Question
@app.route("/quiz", methods=["GET"])
@jwt_required()
def get_quiz():
    countries = Country.query.all()
    
    if not countries:
        return jsonify({"error": "No data available"}), 404
    
    question = random.choice(countries)
    
    options = [question.capital]
    while len(options) < 4:
        option = random.choice(countries).capital
        if option not in options:
            options.append(option)
    
    random.shuffle(options)
    
    return jsonify({
        "question": f"What is the capital of {question.name}?",
        "options": options,
        "answer": question.capital
    })

# Submit Quiz Answer
@app.route("/submit", methods=["POST"])
@jwt_required()
def submit_answer():
    data = request.json
    user = User.query.get(data["user_id"])
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    correct_answer = data["correct_answer"]
    user_answer = data["user_answer"]
    
    if user_answer == correct_answer:
        user.score += 10  # Increase score
        db.session.commit()
        return jsonify({"message": "Correct!", "score": user.score})
    
    return jsonify({"message": "Incorrect!", "score": user.score})

# Leaderboard
@app.route("/leaderboard", methods=["GET"])
def leaderboard():
    users = User.query.order_by(User.score.desc()).limit(10).all()
    return jsonify([{"username": u.username, "score": u.score} for u in users])

if __name__ == "__main__":
    app.run(debug=True)
