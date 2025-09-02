from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status, serializers
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated


from .serializer import CategorySerializer
from .models import CategoryModel

# Create your views here.

class AddCategory(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            serializers = CategorySerializer(data = request.data)
            if serializers.is_valid():
                serializers.save(user = request.user)
                return Response({"message": "category created succesfully"}, status= status.HTTP_201_CREATED)
            return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"message": str(e)}, status= status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def get(self, request):
        try:
            cat = CategoryModel.objects.filter(user = request.user)
            serializers = CategorySerializer(cat, many = True)
            return Response(serializers.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message": str(e)}, status= status.HTTP_500_INTERNAL_SERVER_ERROR)