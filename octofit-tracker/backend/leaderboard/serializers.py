from rest_framework import serializers
from .models import LeaderboardEntry

class LeaderboardEntrySerializer(serializers.ModelSerializer):
    user_username = serializers.CharField(source='user.username', read_only=True)
    team_name = serializers.CharField(source='team.name', read_only=True, allow_null=True)
    
    class Meta:
        model = LeaderboardEntry
        fields = ['id', 'user', 'user_username', 'team', 'team_name', 'total_workouts', 'total_calories', 'total_duration', 'rank', 'created_at', 'updated_at']
