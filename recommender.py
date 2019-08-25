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

    def _get_recommendations(self, v):
        recs = []
        distances = distance.cdist([v], self.feature_vectors, "cosine")[0]
        min_index = np.argsort(distances)[:10]
        for idx in min_index:
            recs.append( self.movies[idx][4] )
        return min_index

    def get_recommendations_for_movie(self, mid):
        movieid2idx = { tup[4] : i for i, tup in enumerate(self.movies) }
        target_vector = self.feature_vectors[movieid2idx[mid]]
        recs = self._get_recommendations(target_vector)
        recs = [ { 
            'id': self.movies[idx][4], 
            'title': self.movies[idx][7]
        } for idx in recs]
        
        return {
            'movie': 
                recs[0]
            ,
            'recommendations': 
                recs[1:]
        }