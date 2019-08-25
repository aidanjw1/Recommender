# Movie Recommendation System

## Setup

1. Clone the repository and download the data and models [here](https://drive.google.com/open?id=1fwDX13PFy3gWuR-quDWnH8b95uvVMlcO).

2. Create a python virtual environment to use the correct dependencies

    `pip3 install venv` - (if not already installed)

    ` python3 -m venv .env `

    `source .env/bin/activate`

    `pip3 install -r requirements.txt`

## Evaluate the model 

To evaluate the model, run `python3 evaluate_recommender.py` which will
output an accuracy score explained in the code. 


------

------

# REST API Docs

Recommendation endpoints will return JSON data in the following format

```
{
    movies: [ 
        {
            id: <id>,
            title: <title>
        }, ... 
    ],
    recommendations: [
        {
            id: <id>,
            title: <title>
        }, ...
    ]
}
```

where `movies` is the list of movies input into the model, and `recommendations`
is the output of the model as a list of recommended movies based on the input.

## Endpoints

* To get a list of recommendations for a single movie as input

    `GET  /recommendations/<id>`

* To get a list of recommendations for multiple movies as input

    `GET  /recommendations?id=<id 1>&id=<id 2>&...`

    or

    `POST  /recommendations`
    
    with request body: 

    ```
    {
        ids: [id 1, id2, ...]
    }
    ```

