from rest_framework import serializers
from .models import Topic, Reply


class ReplySerializer(serializers.ModelSerializer):
    """Serializer pour les réponses aux topics"""
    author_username = serializers.CharField(source='author.username', read_only=True)

    class Meta:
        model = Reply
        fields = ['id', 'topic', 'author', 'author_username', 'content', 'created_at', 'updated_at', 'likes']
        read_only_fields = ['id', 'topic', 'author', 'created_at', 'updated_at']


class TopicSerializer(serializers.ModelSerializer):
    """Serializer complet pour un topic avec ses réponses"""
    author_username = serializers.CharField(source='author.username', read_only=True)
    reply_count = serializers.IntegerField(read_only=True)
    replies = ReplySerializer(many=True, read_only=True)

    class Meta:
        model = Topic
        fields = ['id', 'title', 'content', 'category', 'author', 'author_username', 'created_at', 'updated_at', 'views', 'is_pinned', 'is_closed', 'reply_count', 'replies']
        read_only_fields = ['id', 'author', 'created_at', 'updated_at', 'views']


class TopicListSerializer(serializers.ModelSerializer):
    """Serializer simplifié pour la liste des topics (sans les réponses)"""
    author_username = serializers.CharField(source='author.username', read_only=True)
    reply_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Topic
        fields = ['id', 'title', 'category', 'author', 'author_username', 'created_at', 'updated_at', 'views', 'is_pinned', 'is_closed', 'reply_count']
        read_only_fields = ['id', 'author', 'created_at', 'updated_at', 'views']
