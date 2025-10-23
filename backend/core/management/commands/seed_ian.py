from django.core.management.base import BaseCommand
from core.models import Profile, Venture, Testimonial


class Command(BaseCommand):
    help = "Seed Ian Ward profile, sample venture, and testimonial"

    def handle(self, *args, **options):
        profile, _ = Profile.objects.get_or_create(
            full_name="Ian Ward",
            defaults={
                "title": "Entrepreneur & Advisor",
                "location": "Cape Town, South Africa",
                "bio_short": (
                    "A lifelong entrepreneur with three decades building businesses and supporting "
                    "founders across South Africa. Known for integrity, deep client relationships, "
                    "and an ability to spot new opportunities. At Maindo Digital, Ian focuses on "
                    "driving growth and forging meaningful partnerships."
                ),
                "bio_long": (
                    "Outside the boardroom, Ian mentors young entrepreneurs, volunteers in his community, "
                    "and enjoys Cape Town’s outdoors."
                ),
                "linkedin_url": "https://www.linkedin.com/in/ianaward/",
                "headshot_url": "https://avatars.githubusercontent.com/u/0?v=4",  # placeholder; replace with real photo URL
            },
        )

        Venture.objects.get_or_create(
            name="Maindo Digital",
            defaults={
                "role": "Growth & Partnerships",
                "description": (
                    "Driving growth initiatives and forging meaningful partnerships across sectors."
                ),
                "website": "https://maindo.digital",
                "order": 1,
            },
        )

        Testimonial.objects.get_or_create(
            author_name="Founder, Cape Town",
            defaults={
                "author_title": "Tech Entrepreneur",
                "company": "Stealth Startup",
                "content": (
                    "Ian’s guidance was pivotal to our go-to-market. He balances strategic clarity "
                    "with hands-on support."
                ),
                "order": 1,
            },
        )

        self.stdout.write(self.style.SUCCESS("Seeded Ian Ward data."))

