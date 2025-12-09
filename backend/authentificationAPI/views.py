from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from .models import User
from . serializers import UserSerializers

class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializers

class UserRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializers
    lookup_field = "id"

@api_view(['POST'])
def register(request):
    """
    Endpoint pour l'inscription d'un nouvel utilisateur
    """
    serializer = UserSerializers(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    """
    Endpoint pour la connexion d'un utilisateur
    """
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({
            'error': 'Veuillez fournir un nom d\'utilisateur et un mot de passe'
        }, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=username, password=password)

    if user:
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        }, status=status.HTTP_200_OK)

    return Response({
        'error': 'Nom d\'utilisateur ou mot de passe incorrect'
    }, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_user(request):
    """
    Endpoint pour récupérer les informations de l'utilisateur connecté
    """
    user = request.user
    serializer = UserSerializers(user, context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    """
    Endpoint pour mettre à jour le profil de l'utilisateur connecté
    """
    user = request.user
    serializer = UserSerializers(user, data=request.data, partial=True, context={'request': request})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)