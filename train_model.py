from recommender import MovieRecommender
import pickle

MODEL_PATH = './recommender.model'

if __name__ == "__main__":
    rec = MovieRecommender()
    with open(MODEL_PATH, 'wb') as f:
        pickle.dump(rec, f)
    
