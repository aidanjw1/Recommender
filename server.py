from flask import Flask, jsonify, send_from_directory
import os
import pickle
import json

app = Flask(__name__, static_folder='react app/build')

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    print(path)
    if path != "": #and os.path.exists(app.static_folder + path):
        print('hazaaa')
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route('/recommendations/<_id>')
def recommendations(_id):
    with open('./recommender.model', 'rb') as f:
        rec = pickle.load(f)

    recs = rec.get_recommendations_for_movie(int(_id))
    print(recs)
    return jsonify(recs)

@app.route('/movies')
def movies():
    with open('./movies.json') as f:
        return jsonify(json.load(f))

@app.route('/movie/<id>')
def movie(id):
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == "__main__":
    app.run(debug=True)