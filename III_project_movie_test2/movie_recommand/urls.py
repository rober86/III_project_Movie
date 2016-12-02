from django.conf.urls import url, include
from . import views

urlpatterns = [
    url(r'^introduction/third', views.third, name = 'third'),
    url(r'^introduction/detail', views.movie_detail, name = 'movie_detail'),
    url(r'^introduction$', views.introduction, name = 'introduction'),
    url(r'^type_recommand', views.type_recommand, name = 'type_recommand'),
    url(r'^typelists', views.movie_types, name = 'movie_types'),
    # there will be some query string after recommandlists, so don't use $
    url(r'^recommandlists', views.recommandlists, name = 'recommandlists'),
    url(r'^$', views.recommand_movie, name = 'recommand_movie'),
]
