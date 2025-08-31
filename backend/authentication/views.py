from django.shortcuts import render
from .serializer import RegistrationSerializer
from django.contrib.auth.models import User
from rest_framework import generics
# Create your views here.

class RegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegistrationSerializer
