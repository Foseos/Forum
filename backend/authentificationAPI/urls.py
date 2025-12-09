from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    # ===== AUTHENTIFICATION =====
    path('user/', views.UserListCreateView.as_view(), name='user-list-create'),
    path('user/<int:id>/', views.UserRetrieveUpdateDestroyView.as_view(), name='user-detail'),
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('me/', views.get_current_user, name='current-user'),
    path('profile/', views.update_profile, name='update-profile'),
]
