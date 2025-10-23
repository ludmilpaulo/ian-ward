from django.db import models


class Profile(models.Model):
    full_name = models.CharField(max_length=200)
    title = models.CharField(max_length=200, blank=True)
    location = models.CharField(max_length=200, blank=True)
    bio_short = models.TextField()
    bio_long = models.TextField(blank=True)
    headshot_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)

    def __str__(self) -> str:
        return self.full_name


class Venture(models.Model):
    name = models.CharField(max_length=200)
    role = models.CharField(max_length=200, blank=True)
    description = models.TextField()
    website = models.URLField(blank=True)
    logo_url = models.URLField(blank=True)
    start_year = models.PositiveIntegerField(null=True, blank=True)
    end_year = models.PositiveIntegerField(null=True, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "name"]

    def __str__(self) -> str:
        return self.name


class Testimonial(models.Model):
    author_name = models.CharField(max_length=200)
    author_title = models.CharField(max_length=200, blank=True)
    content = models.TextField()
    company = models.CharField(max_length=200, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "author_name"]

    def __str__(self) -> str:
        return f"{self.author_name} - {self.company}".strip(" -")


class ContactMessage(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.name} <{self.email}>"
