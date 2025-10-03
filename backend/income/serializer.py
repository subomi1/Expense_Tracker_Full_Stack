from rest_framework import serializers

from .models import IncomeModels


class IncomeSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(
        source="category.title", read_only=True)
    category_description = serializers.CharField(
        source="category.description", read_only=True)

    class Meta:
        model = IncomeModels
        fields = ['id', 'amount', 'date', 'category', 'category_name', 'category_description']
