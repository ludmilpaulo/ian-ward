from rest_framework import serializers
from .models import Profile, Venture, Testimonial, ContactMessage


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            "id",
            "full_name",
            "title",
            "location",
            "bio_short",
            "bio_long",
            "headshot_url",
            "linkedin_url",
        ]


class VentureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venture
        fields = [
            "id",
            "name",
            "role",
            "description",
            "website",
            "logo_url",
            "start_year",
            "end_year",
            "order",
        ]


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = [
            "id",
            "author_name",
            "author_title",
            "content",
            "company",
            "order",
        ]


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["id", "name", "email", "message", "created_at"]
        read_only_fields = ["created_at"]


