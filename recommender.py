'''
    This file containes the MovieRecommender class which can be used to
    recomend users movies based on their liked and disliked movies
'''

import numpy as np
from scipy.spatial import distance

class MovieRecommender:
    def __init__(self, movies, vecs):
        self.feature_vectors = vecs
        self.movies = movies

    def get_recommendations(self, v):
        recs = []
        distances = distance.cdist([v], self.feature_vectors, "cosine")[0]
        min_index = np.argsort(distances)[:10]
        for idx in min_index:
            recs.append( self.movies[idx][7] )
        return recs

    def get_recommendations_for_movie(self, m):
        movie2idx = { tup[7] : i for i, tup in enumerate(self.movies) }
        target_vector = self.feature_vectors[movie2idx[m]]
        return self.get_recommendations(target_vector)