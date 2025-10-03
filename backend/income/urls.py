from django.urls import path
from .views import IncomeView, IncomesView

urlpatterns = [
    path('addincome/', IncomesView.as_view()),
    path('editincome/<int:id>/', IncomeView.as_view())
]
