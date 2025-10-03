from django.shortcuts import get_object_or_404
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated


from .models import IncomeModels
from .serializer import IncomeSerializer
# Create your views here.


class IncomesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            Income = IncomeModels.objects.filter(user=request.user)
            serializers = IncomeSerializer(Income, many=True)
            return Response(serializers.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"errors": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        # try:
        serializers = IncomeSerializer(data=request.data)
        if serializers.is_valid():
            serializers.save(user=request.user)
            return Response({"message": "Expense created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
        # except Exception as e:
        #     pass
        # return Response({"errors": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class IncomeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        try:
            exp = get_object_or_404(IncomeModels, user=request.user, id=id)
            serializers = IncomeSerializer(exp)
            return Response(serializers.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"errors": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request, id):
        try:
            exp = get_object_or_404(IncomeModels, user=request.user, id=id)
            serializers = IncomeSerializer(
                exp, data=request.data, partial=True)
            if serializers.is_valid():
                serializers.save()
                return Response({"message": "Expense update successfully"}, status=status.HTTP_200_OK)
            return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"errors": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, id):
        try:
            exp = get_object_or_404(IncomeModels, user=request.user, id=id)
            exp.delete()
            return Response({"Message": "Expense successfully deleted"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"errors": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
