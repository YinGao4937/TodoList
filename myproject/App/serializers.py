from rest_framework import serializers

from App.models import Todo

class TodoSerializer(serializers.ModelSerializer):

    class Meta:

        model = Todo

        fields = ('id','title', 'description', 'created_at', 'is_completed')
