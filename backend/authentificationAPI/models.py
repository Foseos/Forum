from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):

    # Champs pour le forum (BDD) / Pas de MDP ici car deja inclut dans la classe AbstractUser dont user hérite
    email = models.EmailField(unique=True, verbose_name="Email")
    bio = models.TextField(max_length=500, blank=True, null=True, verbose_name="Biographie")
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True, verbose_name="Photo de profil")
    date_inscription = models.DateTimeField(auto_now_add=True, verbose_name="Date d'inscription")
    nombre_posts = models.IntegerField(default=0, verbose_name="Nombre de posts")

    # Champs requis pour l'inscription
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    class Meta:
        verbose_name = "Utilisateur"
        verbose_name_plural = "Utilisateurs"
        ordering = ['-date_inscription']

    def __str__(self):
        return self.username
