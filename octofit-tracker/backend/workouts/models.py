from django.db import models
from users.models import User
from activities.models import Activity

class Workout(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='workouts')
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE, related_name='workouts')
    duration = models.IntegerField(help_text='Duration in minutes')
    calories = models.IntegerField(help_text='Calories burned')
    notes = models.TextField(blank=True)
    workout_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.activity.name} - {self.workout_date}"
