from django.shortcuts import get_object_or_404
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated


from .serializers import InexpensesSerializer
from .models import InexpensesModels
# Create your views here.


class Inexpenses(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            Inexpenses = InexpensesModels.objects.filter(user=request.user)
            serializers = InexpensesSerializer(Inexpenses, many=True)
            return Response(serializers.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"errors": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def post(self, request):
        try:
            serializers = InexpensesSerializer(data = request.data)
            if serializers.is_valid():
                serializers.save(user = request.user)
                return Response({"message":"Expense created successfully"}, status=status.HTTP_201_CREATED)
            return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"errors": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class Inexpense(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, id):
        try:
            exp = get_object_or_404(InexpensesModels, user = request.user, id = id)
            serializers = InexpensesSerializer(exp)
            return Response(serializers.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"errors": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def put(self, request, id):
        try:
            exp = get_object_or_404(InexpensesModels, user = request.user, id = id)
            serializers = InexpensesSerializer(exp, data = request.data, partial = True)
            if serializers.is_valid():
                serializers.save()
                return Response({"message":"Expense update successfully"}, status=status.HTTP_200_OK)
            return Response(serializers.errors, status= status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"errors": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def delete(self, request, id):
        try:
            exp = get_object_or_404(InexpensesModels, user = request.user, id = id)
            exp.delete()
            return Response({"Message": "Expense successfully deleted"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"errors": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)