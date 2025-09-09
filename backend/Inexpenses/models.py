from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class InexpensesModels(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="Inexpenses")
    category = models.CharField(max_length=255)
    description = models.TextField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    
    def __str__(self):
        return self.amount