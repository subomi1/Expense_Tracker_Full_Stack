from django.urls import path

from.views import Inexpenses, Inexpense
urlpatterns = [
    path('addexpense/', Inexpenses.as_view()),
    path('deleteexpense/<int:id>/', Inexpense.as_view())
]
