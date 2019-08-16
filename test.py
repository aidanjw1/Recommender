from recommender import MovieRecommender
import pandas as pd
import pickle
import json

if __name__ == "__main__":
    df = pd.read_csv('./data/tmdb-5000-movie-dataset/tmdb_5000_movies.csv')
    df = df[['id', 'original_title']]
    movies = []
    for movie in df.iterrows():
        movies.append({ 'id': movie[1]['id'], 'title': movie[1]['original_title'] })
    with open('movies.json', 'w') as f:
        json.dump(movies, f)

