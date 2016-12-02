from django.shortcuts import render
from movie_recommand.models import final, thirdmovie, recommand, douban, movie_type
from django.contrib.staticfiles.storage import staticfiles_storage
import random, string
from django.http import HttpResponse
from django.db import models
from mongoengine import *

# Create your views here.

def recommand_movie(request):
    return render(request, 'recommand_movie/recommand_movie.html', {})

def introduction(request):
    return render(request, 'recommand_movie/introduction.html', {})

# function for get revommand movie lists by 3 movies choosen from user
def recommandlists(request):

    # get user choosen movie from request['movielist']
    movielists = request.GET['movielist']
    compareLists = movielists + ' '

    # query db for recommand lists by user choosen movie
    movie_lists = recommand.objects.get(movieLists__contains = compareLists)
    # get values from query object
    movies = movie_lists['movieLists']
    # return values by response 
    return HttpResponse(movies)

def movie_types(request):
    movie_id = request.GET['typelist']

    movie = final.objects.get(douban_id = movie_id)

    douban_type = movie.type_dou
    type_list = []
    type_list.append(movie_id)
    type_list.append("/")
    type_list.append(douban_type)

    return HttpResponse(type_list)

def movie_detail(request):
#    douban_id = '25783914'
    data = {}
    dou_id = request.GET['movieid']
    movie = final.objects.get(douban_id=dou_id)
    
    reviews = movie.tag_cloud
    moviederid = movie.douban_id
    poster = '/static/posters/' + moviederid + '.jpg'
    types = movie.type_dou
    title = movie.title_at
    rating = movie.rating_dou
    release_date = movie.release_date
    IMDB_link = movie.IMDB_at
    intro = movie.intro_l
    
    writers = movie.writer
    wList = []
    for w in writers:
        wList.append(w.split()[0])
    writer = ' '.join(wList)
    
    actors = movie.actor
    aList = []
    for a in actors:
        aList.append(a.split()[0])
    actor = ' '.join(aList)
    
    directors = movie.director
    dList = []
    for d in directors:
        dList.append(d.split()[0])
    director = ' '.join(dList)
    
    data = {
        "reviews" : reviews,
        "poster" : poster,
        "types" : types,
        "title" : title,
        "rating" : rating,
        "release_date" : release_date,
        "IMDB_link" : IMDB_link,
        "intro" : intro,
        "writer" : writer,
        "actor" : actor,
        "director" : director
        }
    
#    return HttpResponse(reviews)    
    return render(request, 'recommand_movie/detail.html', {'data' : data})

def third(request):
    
    movieclicked = request.GET['clickmovie']
    clickderid = movieclicked + ' '

    moviereturn = thirdmovie.objects.get(thirdmovie__contains = clickderid)

    returndata = moviereturn['thirdmovie']
    # return values by response 
    return HttpResponse(returndata)

def type_recommand(request):
    
    types_movies = ""
    three_types = request.GET.get('three_type')
    types =three_types.split()
    for each in types:
        search_type = each + ' '
    
        type_of_movies = movie_type.objects.get(movie_type__contains = search_type)
    
        types_return = type_of_movies['movie_type'].split()[1]
    
        types_movies = types_movies + types_return + "/"
    
    # return values by response 
    return HttpResponse(types_movies)


# def random_posters():
#     posters = staticfiles_storage.url('./posters')
#     images = open(posters, 'r')
#     poster_image = random.sample(images,32)
