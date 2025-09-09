from django.shortcuts import render
from .serializer import UserSerializer
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
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
@permission_classes([AllowAny])
def login(request):
    # works with DRF Request
    email_or_username = request.data.get("email")
    password = request.data.get("password")

    if not email_or_username or not password:
        return Response({"error": "Email/Username and password required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # try email first
        user = User.objects.filter(email=email_or_username).first()
        if not user:
            # fallback to username
            user = User.objects.filter(username=email_or_username).first()
        if not user:
            return Response({"error": "Invalid email/username or password"}, status=status.HTTP_401_UNAUTHORIZED)

        user = authenticate(username=user.username, password=password)
        if not user:
            return Response({"error": "Invalid email/username or password"}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)
        access = str(refresh.access_token)
        response = Response(
            {
                "message": "Login Success",
                "access": access,
                "refresh": str(refresh),  # ✅ send refresh in JSON too
                "username": user.username,
                "email": user.email,
            },
            status=status.HTTP_200_OK,
        )
        return response
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # response.set_cookie(
    #     key="refresh_token",
    #     value=str(refresh),
    #     httponly=True,
    #     secure=False,
    #     samesite="Strict",
    #     expires=datetime.datetime.utcnow() + datetime.timedelta(days=1),
    # )


@api_view(['POST'])
@permission_classes([AllowAny])
def refresh_token(request):
    refresh_token = request.data.get('refresh')
    if refresh_token is None:
        return Response({"error": "No refresh token found"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        refresh = RefreshToken(refresh_token)
        new_access = str(refresh.access_token)
        return Response({"access": new_access}, status=status.HTTP_200_OK)
    except TokenError:
        return Response({"error": "Invalid or expired refresh token"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def logout(request):
    refresh_token = request.data.get('refresh_token')
    if refresh_token is None:
        return Response({"error": "No refresh token"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        token = RefreshToken(refresh_token)
        token.blacklist()
    except TokenError:
        pass

    return Response({"message": "Logout successful"}, status=status.HTTP_205_RESET_CONTENT)