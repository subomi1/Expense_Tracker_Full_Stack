from django.urls import path
from .views import AddCategory

urlpatterns = [
    path('addcategory/', AddCategory.as_view()),
    path('getcategory/', AddCategory.as_view())
]