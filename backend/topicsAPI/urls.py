from django.urls import path
from . import views

urlpatterns = [
    # ===== TOPICS =====
    path('', views.TopicListCreateView.as_view(), name='topic-list-create'),
    path('<int:id>/', views.TopicRetrieveUpdateDestroyView.as_view(), name='topic-detail'),

    # ===== RÉPONSES =====
    path('<int:topic_id>/replies/', views.ReplyListCreateView.as_view(), name='reply-list-create'),
]
