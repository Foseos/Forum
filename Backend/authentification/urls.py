from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('user/', views.UserListCreateView.as_view()),
    path('user/<int:id>/', views.UserRetrieveUpdateDestroyView.as_view())
]
