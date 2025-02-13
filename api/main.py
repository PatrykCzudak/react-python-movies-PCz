from typing import List
import logging
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

import schemas
import models

logging.basicConfig(
    filename="app.log",          
    level=logging.INFO,           
    format="%(asctime)s - %(levelname)s - %(message)s",  
)
logger = logging.getLogger(__name__)

app = FastAPI()
app.mount("/static", StaticFiles(directory="../ui/build/static", check_dir=False), name="static")


@app.get("/")
def serve_react_app():
    return FileResponse("../ui/build/index.html")

@app.get("/movies/", response_model=List[schemas.Movie])
def get_movies():
    return list(models.Movie.select())
    # movies = crud.get_movies()
    # return movies

@app.post("/movies/", response_model=schemas.Movie)
def add_movie(movie: schemas.MovieBase):
    movie = models.Movie.create(**movie.dict())
    return movie

@app.get("/movies/{movie_id}", response_model=schemas.Movie)
def get_movie(movie_id: int):
    db_movie = models.Movie.filter(models.Movie.id == movie_id).first()
    if db_movie is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    return db_movie

@app.delete("/movies/{movie_id}", response_model=schemas.Movie)
def delete_movie(movie_id: int):
    db_movie = models.Movie.filter(models.Movie.id == movie_id).first()
    if db_movie is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    db_movie.actors.clear()
    db_movie.delete_instance()
    return db_movie

#zadania --------------------------------

#pobieranie wszystkich aktorów w bazie danych
@app.get("/actors/", response_model=List[schemas.Actor])
def get_actors():
    db_actors= models.Actor.select()
    if db_actors is None:
        raise HTTPException(status_code=404, detail="Actors not found")
    return list(db_actors)

#pobieranie pojedynczego aktora
@app.get("/actors/{actor_id}", response_model=schemas.Actor)
def get_movie(actor_id: int):
    db_actors = models.Actor.filter(models.Actor.id == actor_id).first()
    if db_actors is None:
        raise HTTPException(status_code=404, detail="Actor not found")
    return db_actors

#dodawanie aktora do bazy
@app.post("/actors/", response_model=schemas.Actor)
def add_actor(actor: schemas.ActorBase):
    actor = models.Actor.create(**actor.dict())
    return actor

#usuwanie aktora
@app.delete("/actors/{actor_id}", response_model=schemas.Actor)
def delete_actor(actor_id: int):
    db_actor = models.Actor.filter(models.Actor.id == actor_id).first()
    if db_actor is None:
        raise HTTPException(status_code=404, detail="Actor not found")
    db_actor.delete_instance()
    return db_actor

#przypisz aktorów
@app.post("/movies/{movie_id}/actors", response_model=schemas.Movie)
def add_actor_to_movie(movie_id: int, data: schemas.AssignActor):
    logger.info(f"Endpoint was hit for movie_id: {movie_id}")
    logger.info(f"Raw data received: {data}")
    actor_id = data.id
    ## pobrane movie
    db_movie = models.Movie.filter(models.Movie.id == movie_id).first()
    if db_movie is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    
    #pobierz aktora
    db_actors = models.Actor.filter(models.Actor.id == actor_id).first()
    if db_actors is None:
        raise HTTPException(status_code=404, detail="Actor not found")
    
    #sprawdzanie czy aktor już tam nie jest
    if db_actors in db_movie.actors:
        raise HTTPException(status_code=400, detail="Actor is already assigned to this movie")
    
    db_movie.actors.add(db_actors)
    
    return db_movie

#wyświetl aktorów
@app.get("/movies/{movie_id}/actors", response_model=List[schemas.Actor])
def get_movie_actors(movie_id: int):
    db_movie = models.Movie.filter(models.Movie.id == movie_id).first()
    if db_movie is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    return list(db_movie.actors)

##baza danych vektorowa
#from qdrant_client.http.models import Filter, FieldCondition, MatchValue
#from sentence_transformers import SentenceTransformer
#from qdrant_client import QdrantClient
#
#
#qdrant_client = QdrantClient(
#    url="https://e15a0be7-90ca-491a-8bbb-ce2eae999b65.eu-west-2-0.aws.cloud.qdrant.io", 
#    api_key="zQM1p21iOtdl60K2LiXMDwxtofTP3zXZxxmZsJGaGi1GWBF8VcFLlQ",
#)
#
#encoder = SentenceTransformer("all-MiniLM-L6-v2")
#
#@app.post("/search/" )
#def search_movies(data: schemas.Search):
#    query = data.query
#    limit = data.limit
#    query_vector = encoder.encode([query])[0]
#
#    results = qdrant_client.search(
#        collection_name="movies",
#        query_vector=query_vector,
#        limit=limit
#    )
#
#    movies = [
#        {
#            "title": result.payload["title"],
#            "year": result.payload["year"],
#            "director": result.payload["director"],
#            "description": result.payload["description"]       
#        }
#        for result in results
#    ]
#    return movies
#