from rest_framework import serializers
from .models import User


# Transforme un Objet en JSON
class UserSerializers(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    nombre_posts = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name', 'bio', 'avatar', 'date_inscription', 'nombre_posts']
        read_only_fields = ['id', 'date_inscription', 'nombre_posts']

    def get_nombre_posts(self, obj):
        """Calcule dynamiquement le nombre de topics créés par l'utilisateur"""
        return obj.topics.count()

    def create(self, validated_data):
        # Créer un utilisateur avec mot de passe crypté
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            bio=validated_data.get('bio', ''),
        )
        if 'avatar' in validated_data:
            user.avatar = validated_data['avatar']
            user.save()
        return user

    def update(self, instance, validated_data):
        # Mettre à jour les champs de l'utilisateur
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.bio = validated_data.get('bio', instance.bio)

        # Gérer l'avatar si présent
        if 'avatar' in validated_data:
            instance.avatar = validated_data['avatar']

        instance.save()
        return instance