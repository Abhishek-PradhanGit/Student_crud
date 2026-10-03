# from django.db import models

# class Student(models.Model):
#     name = models.CharField(max_length=100)
#     age = models.IntegerField()
#     course = models.CharField(max_length=100)

#     def __str__(self):
#         return self.name

from django.db import models
from django.core.validators import MinValueValidator


class Student(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField(validators=[MinValueValidator(1)])
    course = models.CharField(max_length=100)

    def __str__(self):
        return self.name