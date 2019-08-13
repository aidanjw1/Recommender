'''
    This file containes the MovieRecommender class which can be used to
    recomend users movies based on their liked and disliked movies
'''

import pandas as pd
import numpy as np
import sklearn
import json
from scipy.spatial import distance
import collections
from gensim.models.doc2vec import Doc2Vec
from nltk.tokenize.casual import TweetTokenizer
from tqdm import tqdm

MOVIE_PATH = 'data/tmdb-5000-movie-dataset/tmdb_5000_movies.csv'
CAST_PATH = 'data/tmdb-5000-movie-dataset/tmdb_5000_credits.csv'
DOC2VEC_PATH = 'models/doc2vec_25d.model'

tknz = TweetTokenizer()
d2v_model = Doc2Vec.load(DOC2VEC_PATH)

def load_dataframes():
    '''
    Get pandas dataframes for the movie and credit data
    Returns df_movies, df_credits
    '''
    df_movies = pd.read_csv(MOVIE_PATH)
    # Filter out non-english movies (for now)
    df_movies = df_movies[df_movies['original_language'] == 'en']
    df_credits = pd.read_csv(CAST_PATH)

    return df_movies, df_credits

# ======= Build useful conversion dictionaries (ew lots of ugly code) ==============
df_movies, df_credits = load_dataframes()
movies = df_movies['id']
id2movie = { row[4] : row[7] for row in df_movies.itertuples() }
movie2id = { v : k for k, v in id2movie.items() }
movie2idx = { tup[7] : i for i, tup in enumerate(df_movies.itertuples()) }
genres = df_movies['genres']
genre_dict = {}
for genrelist in list(genres):
    glist = json.loads(genrelist)
    for gitem in glist:
        genre_dict[gitem['id']] = gitem['name']  
genres = [ item[1] for item in genre_dict.items() ]
idx2genre = { i : genre for i, genre in enumerate(genres) } 
genre2idx = { genre : i for i, genre in idx2genre.items() }
actors = collections.defaultdict(int)
for cast in list(df_credits['cast']):
    cast = json.loads(cast)
    for item in cast:
        actors[item['name']] += 1        
sort = sorted(actors.items(), key=lambda a: a[1], reverse=True)
top_actors = [ tup[0] for tup in sort ][:200]
actor2idx = { a : i for i, a in enumerate(top_actors) }
id2cast = { tup[1] : tup[3] for tup in df_credits.itertuples() }
# =================================================================================


class MovieRecommender:
    def __init__(self):
        self.feature_vectors = self.generate_feature_vectors()

    def generate_feature_vectors(self):
        feat_vecs = []

        for movie in df_movies.itertuples():
            # one-hot encoding: 
            # first 1 index, next 20 indices = genres, next 200 = top 200 actors, 
            # next 5 = doc embedding of overview
            vec = np.zeros(1 + 20 + 200 + 25, int)
            
            # Review/Popularity
            vec[0] = int(movie[9]) / 100 # Seems helpful to scale down popularity a little bit
            
            # Genres
            genres = json.loads(movie[2])
            for genre in genres:
                idx = genre2idx[genre['name']]
                vec[idx + 1] = 1
            
            # Actors
            _id = movie[4]
            cast = json.loads(id2cast[_id])
            for item in cast:
                if item['name'] in top_actors:
                    vec[1 + 20 + actor2idx[item['name']]] = 1
            
            # Paragraph embedding of overview
            emb = d2v_model.infer_vector(tknz.tokenize(str(movie[8])))
            for i, v in enumerate(emb):
                vec[len(vec) - 25 + i] = v
        
            feat_vecs.append(vec)

        return np.array(feat_vecs)

    def get_recommendations(self, v):
        recs = []
        distances = distance.cdist([v], self.feature_vectors, "cosine")[0]
        min_index = np.argsort(distances)[:10]
        for idx in min_index:
            recs.append( list(df_movies.itertuples())[idx][7] )
        return recs

    def get_recommendations_for_movie(self, m):
        movie2idx = { tup[7] : i for i, tup in enumerate(df_movies.itertuples()) }
        target_vector = self.feature_vectors[movie2idx[m]]
        return self.get_recommendations(target_vector)