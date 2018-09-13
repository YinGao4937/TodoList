# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
from django.db import models

class Todo(models.Model):

    title = models.CharField(max_length=100)

    description = models.TextField()    

    created_at = models.DateTimeField(auto_now_add=True)

    is_completed = models.BooleanField(default = False)

    def __str__(self):

        """A string representation of the model."""

        return self.title
