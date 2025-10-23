from rest_framework import viewsets, mixins
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Profile, Venture, Testimonial, ContactMessage
from .serializers import (
    ProfileSerializer,
    VentureSerializer,
    TestimonialSerializer,
    ContactMessageSerializer,
)


class ProfileViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    @action(detail=False)
    def primary(self, request):
        profile = self.get_queryset().first()
        serializer = self.get_serializer(profile)
        return Response(serializer.data)


class VentureViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Venture.objects.all()
    serializer_class = VentureSerializer


class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer


class ContactMessageViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

# Create your views here.
