from django.conf.urls import url, include
from . import views

urlpatterns = [
    url(r'^introduction$', views.introduction, name = 'introduction'),
    # there will be some query string after recommandlists, so don't use $
    url(r'^recommandlists', views.recommandlists, name = 'recommandlists'),
    url(r'^$', views.recommand_movie, name = 'recommand_movie'),
    
]
