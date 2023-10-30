from flask import render_template
from app_creator import create_app

app = create_app()

@app.route('/')
def hello_world():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0')