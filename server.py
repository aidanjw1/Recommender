from flask import Flask, jsonify, send_from_directory
import flask
import os
import pickle
import json
from functools import reduce
from random import shuffle

app = Flask(__name__, static_folder='react app/build')

@app.route('/recommendations/<_id>', methods=['GET'])
def recommendations(_id):
    '''
    Get recommendations for one movie based on TMDB id as 
    URL path parameter
    '''
    with open('./recommender.model', 'rb') as f:
        rec = pickle.load(f)

    recs = rec.get_recommendations_for_movie(int(_id))
    return jsonify(recs)

@app.route('/recommendations', methods=['GET', 'POST'])
def recommendations_many():
    '''
    Get recommendations based on multiple TMDB ids passed 
    either as query string parameters in a GET request or JSON 
    post data in a POST request
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
    
    with open('./recommender.model', 'rb') as f:
        rec = pickle.load(f)
    recs = []
    for _id in ids:
        recs.append(rec.get_recommendations_for_movie(_id))
    movies = [ rec['movie'] for rec in recs ]
    recs = reduce(lambda x, y: x + y, [ rec['recommendations'] for rec in recs ])
    shuffle(recs)
    return jsonify({
        'movies': movies,
        'recommendations': recs
    })

@app.route('/movies')
def movies():
    with open('./movies.json') as f:
        return jsonify(json.load(f))


# ===================== Serve React App ============================
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    print(path)
    if path != "": #and os.path.exists(app.static_folder + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route('/movie/<id>')
def movie(id):
    return send_from_directory(app.static_folder, 'index.html')
# ===================================================================


if __name__ == "__main__":
    app.run(debug=True)