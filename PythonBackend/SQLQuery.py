import mysql.connector
from flask import Flask

app = Flask(__name__)
mydb = mysql.connector.connect(
    host = "localhost",
    user = "user",
    password = "pw",
    database = "db"
)
cursor = mydb.cursor()

@app.route('/addUser/<user>/<passw>')
def addUser(user, passw):
    query = "INSERT INTO Accounts (user, pass) VALUES (%s, %s)"
    val = (user, passw)
    cursor.execute(query, val)
    mydb.commit()
    return "User added"

@app.route('/getUser/<user>')
def getUser(user):
    query = "SELECT * FROM Accounts WHERE user = %s"
    cursor.execute(query, user)
    result = cursor.fetchone()
    return result

@app.route('/login/<user>/<passw>')
def login(user, passw):
    result = getUser(user)
    if (passw == result[1]): return True
    return False

if __name__ == "__main__":
    app.run(debug = True, host= "1.1.1.1")