from rest_framework import serializers
from .models import Workout

class WorkoutSerializer(serializers.ModelSerializer):
    user_username = serializers.CharField(source='user.username', read_only=True)
    activity_name = serializers.CharField(source='activity.name', read_only=True)
    
    class Meta:
        model = Workout
        fields = ['id', 'user', 'user_username', 'activity', 'activity_name', 'duration', 'calories', 'notes', 'workout_date', 'created_at', 'updated_at']
