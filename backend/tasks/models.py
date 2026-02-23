from django.db import models
from django.utils.translation import gettext_lazy as _

class TaskStatus(models.TextChoices):
    PENDING = 'PENDING', _('Pendiente')
    COMPLETED = 'COMPLETED', _('Completada')

class Task(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=TaskStatus.choices, default=TaskStatus.PENDING)
    order_index = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order_index', '-created_at']

    def __str__(self):
        return self.title

class Subtask(models.Model):
    task = models.ForeignKey(Task, related_name='subtasks', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    status = models.CharField(max_length=20, choices=TaskStatus.choices, default=TaskStatus.PENDING)
    order_index = models.IntegerField(default=0)

    class Meta:
        ordering = ['order_index', 'id']

    def __str__(self):
        return f"{self.task.title} - {self.title}"
