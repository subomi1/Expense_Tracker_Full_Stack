from django.db import models
from django.contrib.auth.models import User

from categoreis.models import CategoryModel

# Create your models here.


class IncomeModels(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="Income")
    category = models.ForeignKey(
        CategoryModel, on_delete=models.CASCADE, related_name="Income")
    amount = models.PositiveBigIntegerField()
    date = models.DateField()

    def __str__(self):
        return f'user --> {self.user.username} --> IncomeAmount = {self.amount}'
