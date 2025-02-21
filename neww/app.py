from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Dummy user credentials
users = {
    "user1": "password123",
    "admin": "adminpass"
}

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    
    if username in users and users[username] == password:
        return jsonify({"status": "success", "message": "Login successful"})
    else:
        return jsonify({"status": "failure", "message": "Invalid credentials"})

if __name__ == '__main__':
    app.run(debug=True)

# Create index.html file in the templates folder
index_html = '''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page</title>
    <script>
        async function login() {
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            const response = await fetch("/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });
            const result = await response.json();
            document.getElementById("message").innerText = result.message;
        }
    </script>
</head>
<body>
    <h2>Login</h2>
    <input type="text" id="username" placeholder="Username"><br>
    <input type="password" id="password" placeholder="Password"><br>
    <button onclick="login()">Login</button>
    <p id="message"></p>
</body>
</html>
'''

# Save index.html in the templates folder
with open("templates/index.html", "w") as f:
    f.write(index_html)
