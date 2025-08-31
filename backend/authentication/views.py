from django.shortcuts import render
from .serializer import UserSerializer
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from django.contrib.auth import authenticate
import datetime
# Create your views here.


@api_view(['POST'])
def register(request):
    user = UserSerializer(data=request.data)

    if user.is_valid():
        user.save()
        return Response(user.data, status=status.HTTP_200_OK)
    return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"error": "Invalid email or password"}, status=status.HTTP_401_UNAUTHORIZED)

    user = authenticate(username=user.username, password=password)
    if not user:
        return Response({"error": "Invalid email or password"}, status=status.HTTP_401_UNAUTHORIZED)

    refresh = RefreshToken.for_user(user)
    access = str(refresh.access_token)

    response = Response(
        {
            "message": "Login Success",
            "access": access,
            "username": user.username,
            "email": user.email
        },
        status=status.HTTP_200_OK
    )

    response.set_cookie(
        key="refresh_token",
        value=str(refresh),
        httponly=True,
        secure=False,  # set True in production (HTTPS)
        samesite="Strict",
        expires=datetime.datetime.utcnow() + datetime.timedelta(days=1)
    )
    return response


@api_view(['POST'])
def refresh_token(request):
    refresh_token = request.COOKIES.get('refresh_token')
    if refresh_token is None:
        return Response({"error": "No refresh token found"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        refresh = RefreshToken(refresh_token)
        new_access = str(refresh.access_token)
        return Response({"access": new_access}, status=status.HTTP_200_OK)
    except TokenError:
        return Response({"error": "Invalid or expired refresh token"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def logout(request):
    refresh_token = request.COOKIES.get('refresh_token')
    if refresh_token is None:
        return Response({"error": "No refresh token"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        token = RefreshToken(refresh_token)
        token.blacklist()
    except TokenError:
        pass  # already expired or invalid

    response = Response({"message": "Logout successful"}, status=status.HTTP_205_RESET_CONTENT)
    response.delete_cookie("refresh_token")
    return response