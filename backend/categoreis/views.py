from django.shortcuts import render, get_object_or_404
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
        
class categoryView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, id):
        try:
            category = get_object_or_404(CategoryModel, id=id, user=request.user)
            serializers = CategorySerializer(category)
            return Response(serializers.data, status= status.HTTP_200_OK)
        except Exception as e:
            return Response({"message": str(e)}, status= status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def delete(self, request, id):
        try:
            category = get_object_or_404(CategoryModel, id=id, user = request.user )
            category.delete()
            return Response({"Message": "Category successfully deleted"}, status=status.HTTP_200_OK)
        except Exception as e:
            pass
        
    def put(self, request, id):
        try:
            category = get_object_or_404(CategoryModel, id = id, user = request.user)
            serializer = CategorySerializer(category, data = request.data, partial = True)
            if serializer.is_valid():
                serializer.save()
                return Response({"Message": "Category updated successfully"}, status=status.HTTP_200_OK)
            return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            pass
        