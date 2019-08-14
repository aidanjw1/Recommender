from flask import Flask, jsonify
import pickle
from recommender import MovieRecommender, id2movie

app = Flask(__name__)

@app.route('/recommendations/<_id>')
def recommendations(_id):
    with open('./recommender.model', 'rb') as f:
        rec = pickle.load(f)

    recs = rec.get_recommendations_for_movie(id2movie[int(_id)])
    print(recs)
    return jsonify(recs)

if __name__ == "__main__":
    app.run()