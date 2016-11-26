from django.shortcuts import render
from movie_recommand.models import truemovie
from movie_recommand.models import douban
from movie_recommand.models import recommand
from django.contrib.staticfiles.storage import staticfiles_storage
import random, string
from django.http import HttpResponse

# Create your views here.

def recommand_movie(request):
    return render(request, 'recommand_movie/recommand_movie.html', {})

def introduction(request):
    # testing if ajax worls or not, use in next page
    # if request.is_ajax():
    #     message = "Yes, AJAX!"
    # else:
    #     message = "Not Ajax"
    # return HttpResponse(message)
    return render(request, 'recommand_movie/introduction.html', {})

# function for get revommand movie lists by 3 movies choosen from user
def recommandlists(request):

    # get user choosen movie from request['movielist']
    movielists = request.GET['movielist']

    # query db for recommand lists by user choosen movie
    movie_lists = recommand.objects.get(movieLists__contains = movielists)
    # get values from query object
    movies = movie_lists['movieLists']
    # return values by response 
    return HttpResponse(movies)

# def random_posters():
#     posters = staticfiles_storage.url('./posters')
#     images = open(posters, 'r')
#     poster_image = random.sample(images,32)
