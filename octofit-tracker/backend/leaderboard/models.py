from django.db import models
from users.models import User
from teams.models import Team

class LeaderboardEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='leaderboard_entries')
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='leaderboard_entries', null=True, blank=True)
    total_workouts = models.IntegerField(default=0)
    total_calories = models.IntegerField(default=0)
    total_duration = models.IntegerField(default=0, help_text='Total duration in minutes')
    rank = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - Rank {self.rank}"

    class Meta:
        verbose_name_plural = 'leaderboard entries'
        ordering = ['rank']
