from django.urls import path
from .views import register, login, refresh_token, logout

urlpatterns = [
    path("register/", register, name="register"),
    path("login/", login, name="login"),
    path("refresh/", refresh_token, name="refresh"),
    path("logout/", logout, name="logout"),
]

