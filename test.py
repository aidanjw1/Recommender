from recommender import MovieRecommender
import pickle

if __name__ == "__main__":
    with open('./recommender.model', 'rb') as f:
        rec = pickle.load(f)
    recs = rec.get_recommendations_for_movie("Iron Man")
    print(recs)