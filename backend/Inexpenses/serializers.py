from rest_framework import serializers
from .models import InexpensesModels


class InexpensesSerializer(serializers.ModelSerializer):
    class Meta:
        model = InexpensesModels
        fields = ['id', 'category', 'description', 'amount', 'date']