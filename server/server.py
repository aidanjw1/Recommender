import flask
from flask import Flask, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from collections import defaultdict
from functools import reduce
from random import shuffle

TMDB_API_KEY = '7cc441d4c80dc500e03786e94fd81402'

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres@db:5432/pickflix'
db = SQLAlchemy(app)
CORS(app)

def load_string_vector(s):
    return np.fromstring(s, sep=' ').reshape(1, -1)

@app.route('/')
def index():
    return 'hello world'

@app.route('/recommendations/<_id>', methods=['GET'])
def recommendations(_id):
    '''
    Get recommendations for one movie based on TMDB id as 
    URL path parameter
    '''
    result = db.engine.execute(f"SELECT closest10 FROM similarities WHERE movie_id = {_id};").fetchone()
    recs = result[0]
    return jsonify(recs)

@app.route('/recommendations', methods=['GET', 'POST'])
def recommendations_many():
    '''
    Get recommendations based on multiple TMDB ids passed 
    either as query string parameters in a GET request or JSON 
    body data in a POST request
    '''
    if flask.request.method == 'GET':
        ids = flask.request.args.getlist('id')
        ids = [ int(_id) for _id in ids ]
        if not ids or len(ids) == 0:
            return jsonify({ 'error': 'no (or empty) list of movie ids specified in POST body' }), 400 # Respond with bad request status
    else:
        body = flask.request.json
        print(body)
        if 'ids' in body and len(body['ids']) is not 0:
            ids = body['ids']
        else:
            return jsonify({ 'error': 'no (or empty) list of movie ids specified in POST body' }), 400 # Respond with bad request status

    all_recs = []
    for _id in ids:
        result = db.engine.execute(f'SELECT closest10 FROM similarities WHERE movie_id = {_id};').fetchone()
        all_recs += result[0]
    
    # Sort the recommended ids by the number of times they've appeard using a defaultdict to count their occurances
    shuffle(all_recs)
    counts = defaultdict(int)
    for movie in all_recs:
        counts[movie] += 1

    recs = sorted(counts.keys(), key=lambda m: counts[m])[:10]

    return jsonify(recs)


if __name__ == "__main__":

    app.run(host='0.0.0.0', debug=True)