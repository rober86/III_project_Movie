from __future__ import unicode_literals

from django.db import models
from mongoengine import *
	
# Create your models here.

# class Type(EmbeddedDocument):
# 	value = StringField()

# final.final
class final(DynamicDocument):
	douban_id = StringField(max_length=200)
	type_dou = StringField(max_length=200)
	type_true = StringField(max_length=200)
	title_at = StringField(max_length=200)
	rating_dou = StringField(max_length=200)
	release_date = StringField(max_length=200)
	intro_l = StringField(max_length=200)
	writer = ListField()
	actor = ListField()
	director = ListField()
	IMDB_at = StringField(max_length=200)
	tag_cloud = DictField()
	meta = {'strick': False}


# final.recommand
class recommand(Document):
	movieLists = StringField(max_length=200)

# final.truemovie
# class truemovie(Document):
# 	url = StringField(max_length=200)
# 	title_e = StringField(max_length=200)
# 	title_t = StringField(max_length=200)
# 	type = ListField()

# final.douban
class douban(Document):
	title1 = StringField(max_length=200)
	title2 = StringField(max_length=200)
	type = StringField(max_length=200)
	IMDB = StringField(max_length=200)
	rating = StringField(max_length=200)
	movie_id = StringField(max_length=200)
	ratinguser = StringField(max_length=200)
	reviews = ListField()

class thirdmovie(Document):
	thirdmovie = StringField(max_length=200)

class movie_type(Document):
	movie_type = StringField(max_length=200)

	# title_true = StringField(max_length=200)
	# title_e = StringField(max_length=200)
	# year = StringField(max_length=200)
	# runtime = StringField(max_length=200)
	# issuer = StringField(max_length=200)
	# area = StringField(max_length=200)
	# writer = StringField(max_length=200)
	# ratinguser = StringField(max_length=200)
	# actor = StringField(max_length=200)
	# IMDB_dou = StringField(max_length=200)
	# IMDB_at = StringField(max_length=200)
	# rating_dou = StringField(max_length=200)
	# rating_at = StringField(max_length=200)
	# picture = StringField(max_length=200)
	# poster = StringField(max_length=200)
	# director = StringField(max_length=200)
	# title1 = StringField(max_length=200)
	# title2 = StringField(max_length=200)
	# atmovie_id = StringField(max_length=200)
	# news = StringField(max_length=200)
	# box = StringField(max_length=200)
	# publisher = StringField(max_length=200)
	# title_at = StringField(max_length=200)
	# intro_s = StringField(max_length=200)
	# language = StringField(max_length=200)
	# url = StringField(max_length=200)
	# release_date = StringField(max_length=200)
	# youtube = StringField(max_length=200)
	# official = StringField(max_length=200)
	# reviews = StringField(max_length=200)
	# intro_l = StringField(max_length=200)