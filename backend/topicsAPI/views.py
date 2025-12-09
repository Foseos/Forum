from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from .models import Topic, Reply
from .serializers import TopicSerializer, TopicListSerializer, ReplySerializer


class TopicListCreateView(generics.ListCreateAPIView):
    """
    GET: Liste tous les topics (lecture seule pour tous, authentification non requise)
    POST: Créer un nouveau topic (authentification requise)
    """
    queryset = Topic.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return TopicListSerializer
        return TopicSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class TopicRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET: Récupérer un topic avec ses réponses (lecture seule pour tous)
    PUT/PATCH: Modifier un topic (auteur seulement)
    DELETE: Supprimer un topic (auteur seulement)
    """
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = "id"

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        # Incrémenter le nombre de vues
        instance.views += 1
        instance.save(update_fields=['views'])
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def perform_update(self, serializer):
        # Seul l'auteur peut modifier
        if serializer.instance.author != self.request.user:
            raise PermissionError("Vous ne pouvez modifier que vos propres topics")
        serializer.save()

    def perform_destroy(self, instance):
        # Seul l'auteur peut supprimer
        if instance.author != self.request.user:
            raise PermissionError("Vous ne pouvez supprimer que vos propres topics")
        instance.delete()


class ReplyListCreateView(generics.ListCreateAPIView):
    """
    GET: Liste toutes les réponses d'un topic
    POST: Créer une nouvelle réponse (authentification requise)
    """
    serializer_class = ReplySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        topic_id = self.kwargs.get('topic_id')
        return Reply.objects.filter(topic_id=topic_id)

    def perform_create(self, serializer):
        topic_id = self.kwargs.get('topic_id')
        serializer.save(author=self.request.user, topic_id=topic_id)


class ReplyRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET: Récupérer une réponse
    PUT/PATCH: Modifier une réponse (auteur seulement)
    DELETE: Supprimer une réponse (auteur seulement)
    """
    queryset = Reply.objects.all()
    serializer_class = ReplySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = "id"

    def perform_update(self, serializer):
        if serializer.instance.author != self.request.user:
            raise PermissionError("Vous ne pouvez modifier que vos propres réponses")
        serializer.save()

    def perform_destroy(self, instance):
        if instance.author != self.request.user:
            raise PermissionError("Vous ne pouvez supprimer que vos propres réponses")
        instance.delete()
