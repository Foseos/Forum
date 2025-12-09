from django.urls import path
from . import views

urlpatterns = [
    path('', views.global_search, name='global-search'),
    path('stats/', views.get_forum_stats, name='forum-stats'),
]
