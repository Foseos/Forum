from django.db import models
from authentification.models import User


class Topic(models.Model):
    """Modèle représentant un topic de discussion"""
    CATEGORY_CHOICES = [
        ('general', 'Général'),
        ('questions', 'Questions'),
        ('aide', 'Aide'),
        ('annonces', 'Annonces'),
    ]

    title = models.CharField(max_length=200, verbose_name="Titre")
    content = models.TextField(verbose_name="Contenu")
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='general', verbose_name="Catégorie")
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='topics', verbose_name="Auteur")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Date de création")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Date de modification")
    views = models.IntegerField(default=0, verbose_name="Nombre de vues")
    is_pinned = models.BooleanField(default=False, verbose_name="Épinglé")
    is_closed = models.BooleanField(default=False, verbose_name="Fermé")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Topic"
        verbose_name_plural = "Topics"
        ordering = ['-is_pinned', '-created_at']

    @property
    def reply_count(self):
        """Retourne le nombre de réponses"""
        return self.replies.count()


class Reply(models.Model):
    """Modèle représentant une réponse à un topic"""
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name='replies', verbose_name="Topic")
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='replies', verbose_name="Auteur")
    content = models.TextField(verbose_name="Contenu")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Date de création")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Date de modification")
    likes = models.IntegerField(default=0, verbose_name="Nombre de likes")

    def __str__(self):
        return f"Réponse de {self.author.username} sur {self.topic.title}"

    class Meta:
        verbose_name = "Réponse"
        verbose_name_plural = "Réponses"
        ordering = ['created_at']
