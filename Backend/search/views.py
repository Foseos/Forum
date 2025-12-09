from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q, Count

from authentification.models import User
from authentification.serializers import UserSerializers
from topics.models import Topic, Reply
from topics.serializers import TopicListSerializer


@api_view(['GET'])
def get_forum_stats(request):
    """
    Endpoint pour récupérer les statistiques du forum
    Retourne le nombre de membres actifs, discussions et messages
    """
    # Compter les membres actifs (tous les utilisateurs inscrits)
    total_users = User.objects.count()

    # Compter le nombre de discussions (topics)
    total_topics = Topic.objects.count()

    # Compter le nombre de messages (réponses)
    total_replies = Reply.objects.count()

    return Response({
        'total_users': total_users,
        'total_topics': total_topics,
        'total_replies': total_replies
    })


@api_view(['GET'])
def global_search(request):
    """
    Endpoint de recherche globale pour topics et utilisateurs
    Retourne les résultats des deux en un seul appel API
    """
    query = request.GET.get('q', '').strip()

    if not query:
        return Response({
            'topics': [],
            'users': []
        })

    # Rechercher les topics
    topics = Topic.objects.filter(
        Q(title__icontains=query) | Q(content__icontains=query)
    ).order_by('-created_at')[:20]

    # Rechercher les utilisateurs
    users = User.objects.filter(
        Q(username__icontains=query) |
        Q(first_name__icontains=query) |
        Q(last_name__icontains=query) |
        Q(bio__icontains=query)
    )[:20]

    # Sérialiser les résultats
    topics_serializer = TopicListSerializer(topics, many=True, context={'request': request})
    users_serializer = UserSerializers(users, many=True, context={'request': request})

    return Response({
        'topics': topics_serializer.data,
        'users': users_serializer.data
    })
