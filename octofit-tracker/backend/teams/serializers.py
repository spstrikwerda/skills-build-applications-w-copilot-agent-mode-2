from rest_framework import serializers
from .models import Team
from users.serializers import UserSerializer

class TeamSerializer(serializers.ModelSerializer):
    members = UserSerializer(many=True, read_only=True)
    member_ids = serializers.PrimaryKeyRelatedField(
        many=True, write_only=True, queryset=__import__('users.models', fromlist=['User']).User.objects.all(), source='members'
    )
    
    class Meta:
        model = Team
        fields = ['id', 'name', 'description', 'members', 'member_ids', 'created_at', 'updated_at']
