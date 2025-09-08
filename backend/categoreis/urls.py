from django.urls import path
from .views import AddCategory, categoryView

urlpatterns = [
    path('addcategory/', AddCategory.as_view()),
    path('getcategory/', AddCategory.as_view()),
    path('deletecategory/<str:id>/', categoryView.as_view())
]