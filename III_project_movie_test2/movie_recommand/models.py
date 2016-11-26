from __future__ import unicode_literals

from django.db import models
from mongoengine import *
from jsonfield import JSONField
	
# Create your models here.

# class Type(EmbeddedDocument):
# 	value = StringField()
	
class truemovie(Document):
	url = StringField(max_length=200)
	title_e = StringField(max_length=200)
	title_t = StringField(max_length=200)
	type = ListField()

class recommand(Document):
	movieLists = StringField(max_length=200)

class douban(Document):
	title1 = StringField(max_length=200)
	title2 = StringField(max_length=200)
	type = StringField(max_length=200)
	IMDB = StringField(max_length=200)
	rating = StringField(max_length=200)
	movie_id = StringField(max_length=200)
	ratinguser = StringField(max_length=200)
	reviews = ListField()

# class posterfiles(Document):
# 	md5 = StringField(max_length=200)
# 	filename = StringField(max_length=200)

# class posterchunks(Document):
# 	files_id = StringField(max_length=200)
# 	data = BinaryField()
