from django.db import models
from django.contrib.auth.models import User


from categoreis.models import CategoryModel

# Create your models here.
class InexpensesModels(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="Inexpenses")
    category = models.ForeignKey(CategoryModel, on_delete=models.CASCADE, related_name="Inexpenses")
    amount = models.PositiveBigIntegerField()
    date = models.DateField()
    
    def __str__(self):
        return self.amount