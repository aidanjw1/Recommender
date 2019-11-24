'''
Simple evaluation for the movie recommender model.
Uses real user data from movielens to evaluate the recommendations of the model
based on user ratings. See `eval_recommender` below for more information.
'''

import pandas as pd
from tqdm import tqdm
from recommender import MovieRecommender, df_movies, id2movie, movie2id

ML_LINKS = 'data/ml-latest-small/links.csv'
ML_RATINGS = 'data/ml-latest-small/ratings.csv'

df_link = pd.read_csv(ML_LINKS)
df_ratings = pd.read_csv(ML_RATINGS)

# ==== Convert between moviedb and movielens ids ==================
def movieid2tmdbid(movieid):
    return int(df_link[df_link['movieId'] == movieid]['tmdbId'])

def tmdbid2movieid(tmdbid):
    return int(df_link[df_link['tmdbId'] == tmdbid]['movieId'])
# =================================================================

def users_who_liked(tmdbid):
    return list(df_ratings[(df_ratings['movieId'] == tmdbid2movieid(tmdbid)) & (df_ratings['rating'] >= 4)]['userId'])

def get_rating(tmdbid, user):
    try:
        res = df_ratings[(df_ratings['movieId'] == tmdbid2movieid(tmdbid)) & (df_ratings['userId'] == user) ]['rating']
    except:
#         print('Something has gone awry...', end="", flush=True)
        return None
    return float(res) if len(res) > 0 else None

def eval_recommender(recommender, limit=None):
    '''
        For all movies, users who 'liked' the movie are defined as users who rated that
        movie as as 4 or higher. We then generate a list of 10 recommendations for that movie,
        and count how many of the users who liked the original movie also 'liked' each the recommendations.
        This function prints an accuracy metric that represents the total percentage of recommendations
        that were 'liked'.
    '''
    count = 0
    total = 0
    
    movies = list(df_movies['id'])
    if limit:
        movies = movies[:limit]

    for movie in tqdm(movies):
        recommendations = recommender.get_recommendations_for_movie(id2movie[movie])
        likes = users_who_liked(movie)
        for rec in recommendations:
            rec = movie2id[rec]
            for user in likes:
                rating = get_rating(rec, user)
                if rating is None:
                    continue
                if rating >= 4:
                    count += 1
                total += 1
    print("Accuracy: " + str(count/total) if total is not 0 else 'Not enough information')


if __name__ == "__main__":
    recommender = MovieRecommender()
    eval_recommender(recommender, limit=100)
