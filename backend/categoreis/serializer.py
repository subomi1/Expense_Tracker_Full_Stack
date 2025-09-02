from rest_framework import serializers
from .models import CategoryModel


# serializer class

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryModel
        fields = ['id', 'title', 'description', 'created_at']