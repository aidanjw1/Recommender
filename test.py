from recommender import MovieRecommender

if __name__ == "__main__":
    rec = MovieRecommender()
    recs = rec.get_recommendations_for_movie("Iron Man")
    print(recs)