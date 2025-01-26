from typing import Any, List, Union

import peewee
from pydantic import BaseModel
from pydantic.utils import GetterDict

class PeeweeGetterDict(GetterDict):
    def get(self, key: Any, default: Any = None):
        res = getattr(self._obj, key, default)
        if isinstance(res, peewee.ModelSelect):
            return list(res)
        return res

class ActorBase(BaseModel):
    name: str
    surname: str

class Search(BaseModel):
    query: str
    limit: int

class ActorCreate(ActorBase):
    pass

class AssignActor(BaseModel):
    id: int


class Actor(ActorBase):
    id: int

    class Config:
        orm_mode = True
        getter_dict = PeeweeGetterDict

class MovieBase(BaseModel):
    title: str
    year: int
    director: str
    description: Union[str, None] = None

class SearchResults(BaseModel):
    movies: List[MovieBase]


class MovieCreate(MovieBase):
    pass


class Movie(MovieBase):
    id: int
    actors: List[Actor] = []

    class Config:
        orm_mode = True
        getter_dict = PeeweeGetterDict


