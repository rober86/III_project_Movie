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
    intro = movie.intro_l[5:]

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

    moviereturn = final.objects.get(douban_id = movieclicked)

    returndata = moviereturn['type_dou'].split("/")

    detail_movies =  ""

    for xxx in returndata:
        detail_type = xxx.strip() + ' '

        type_of_detail = movie_type.objects.get(movie_type__contains = detail_type)

        type_of_detail_r = type_of_detail['movie_type'].split()[1]

        detail_movies = detail_movies + type_of_detail_r + "/"

    o = 0
    new_detail = []
    while o < len(returndata):
        ll = [[g.split(","),1]for g in detail_movies.split("/")[1].split("|")]
        new_detail += ll
        o += 1

    detail_rec= sorted(new_detail)

    d = 0
    while d < len(detail_rec)-1:
        if detail_rec[d][0][0] == detail_rec[d+1][0][0]:
            if float(detail_rec[d][0][1]) < float(detail_rec[d+1][0][1]):
                detail_rec.remove(detail_rec[d])
                d += 1
            else:
                detail_rec.remove(detail_rec[d+1])
                d += 0
        else:
            d += 1

    every_detail_r = ""
    for vv in detail_rec:
        every_detail_r += vv[0][0] + ','

    # return values by response
    return HttpResponse(every_detail_r)

def type_recommand(request):

    types_movies = ""
    three_types = request.GET.get('three_type')
    types =three_types.split()
    for each in types:
        search_type = each + ' '

        type_of_movies = movie_type.objects.get(movie_type__contains = search_type)

        types_return = type_of_movies['movie_type'].split()[1]

        types_movies = types_movies + types_return + "/"

    a = [[i.split(","),1]for i in types_movies.split("/")[0].split("|")]
    b = [[j.split(","),2]for j in types_movies.split("/")[1].split("|")]
    c = [[k.split(","),3]for k in types_movies.split("/")[2].split("|")]
    new_three = a + b + c
    sorted_three = sorted(new_three)

    f = 0
    while f < len(sorted_three)-1:
        if sorted_three[f][0][0] == sorted_three[f+1][0][0]:
            if float(sorted_three[f][0][1]) < float(sorted_three[f+1][0][1]):
                sorted_three.remove(sorted_three[f])
                f += 1
            else:
                sorted_three.remove(sorted_three[f+1])
                f += 0
        else:
            f += 1

    sorted_three_again = sorted(sorted_three, key=lambda ss: float(ss[0][1]), reverse=True)

    aa = ""
    bb = ""
    cc = ""
    for everytype in sorted_three_again:
        if everytype[1] == 1:
            aa += everytype[0][0] + ","
        elif everytype[1] == 2:
            bb += everytype[0][0] + ","
        else :
             cc += everytype[0][0] + ","
    final_type_lists = aa + "/" + bb+ "/" + cc

    # return values by response
    return HttpResponse(final_type_lists)

def statistic(request):
    return render(request, 'recommand_movie/statistic.html', {})


# def random_posters():
#     posters = staticfiles_storage.url('./posters')
#     images = open(posters, 'r')
#     poster_image = random.sample(images,32)
