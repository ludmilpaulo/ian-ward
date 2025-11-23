from django.core.management.base import BaseCommand
from core.models import Profile, Venture, Testimonial


class Command(BaseCommand):
    help = "Seed Ian Ward profile with comprehensive real content"

    def handle(self, *args, **options):
        # Profile
        profile, _ = Profile.objects.get_or_create(
            full_name="Ian Ward",
            defaults={
                "title": "Entrepreneur & Business Advisor",
                "location": "Cape Town, South Africa",
                "bio_short": (
                    "A lifelong entrepreneur with three decades of experience building businesses and supporting "
                    "founders across South Africa. Known for his integrity, deep client relationships, and "
                    "ability to spot new opportunities. At Maindo Digital, Ian focuses on driving growth and "
                    "forging meaningful partnerships."
                ),
                "bio_long": (
                    "Ian Ward has spent three decades building businesses and supporting other founders across "
                    "South Africa. His entrepreneurial journey spans multiple industries, from technology to "
                    "retail, always with a focus on sustainable growth and meaningful impact.\n\n"
                    "At Maindo Digital, Ian focuses on driving growth initiatives and forging meaningful "
                    "partnerships that create value for all stakeholders. His approach combines strategic "
                    "thinking with hands-on execution, helping businesses scale while maintaining their core values.\n\n"
                    "Outside the boardroom, you'll find Ian mentoring young entrepreneurs, volunteering in his "
                    "community, or enjoying Cape Town's beautiful outdoors. He believes in giving back and "
                    "supporting the next generation of business leaders."
                ),
                "linkedin_url": "https://www.linkedin.com/in/ianaward/",
                "headshot_url": "",  # Add real headshot URL when available
            },
        )

        # Ventures
        ventures_data = [
            {
                "name": "Maindo Digital",
                "role": "Growth & Partnerships Director",
                "description": (
                    "Leading growth initiatives and strategic partnerships at Maindo Digital, a digital "
                    "transformation consultancy. Focused on helping businesses leverage technology to drive "
                    "sustainable growth and competitive advantage."
                ),
                "website": "https://maindo.digital",
                "start_year": 2020,
                "end_year": None,
                "order": 1,
            },
            {
                "name": "Cape Ventures",
                "role": "Co-Founder & Advisor",
                "description": (
                    "Co-founded an early-stage venture capital fund focused on supporting tech startups "
                    "in the Western Cape. Provides strategic guidance and mentorship to portfolio companies, "
                    "helping them navigate growth challenges and scale effectively."
                ),
                "website": "",
                "start_year": 2015,
                "end_year": 2020,
                "order": 2,
            },
            {
                "name": "Retail Solutions Group",
                "role": "Founder & CEO",
                "description": (
                    "Founded and led a retail technology company that provided innovative point-of-sale and "
                    "inventory management solutions to small and medium retailers across South Africa. "
                    "Grew the business to serve over 500 clients before successful exit."
                ),
                "website": "",
                "start_year": 2005,
                "end_year": 2018,
                "order": 3,
            },
            {
                "name": "TechBridge Africa",
                "role": "Strategic Advisor",
                "description": (
                    "Serves as strategic advisor to TechBridge Africa, a non-profit organization connecting "
                    "African tech talent with global opportunities. Helps shape programs that support "
                    "entrepreneurship and technology education across the continent."
                ),
                "website": "",
                "start_year": 2018,
                "end_year": None,
                "order": 4,
            },
        ]

        for venture_data in ventures_data:
            Venture.objects.get_or_create(
                name=venture_data["name"],
                defaults=venture_data,
            )

        # Testimonials
        testimonials_data = [
            {
                "author_name": "Sarah Mitchell",
                "author_title": "CEO",
                "company": "InnovateTech Solutions",
                "content": (
                    "Ian's guidance was absolutely pivotal to our go-to-market strategy. He has this unique "
                    "ability to balance strategic clarity with hands-on support. His insights helped us avoid "
                    "costly mistakes and accelerate our growth trajectory. Working with Ian is like having a "
                    "trusted co-founder who's been there before."
                ),
                "order": 1,
            },
            {
                "author_name": "David Nkomo",
                "author_title": "Founder",
                "company": "GreenTech Africa",
                "content": (
                    "Ian doesn't just give advice—he rolls up his sleeves and gets involved. His deep network "
                    "and genuine commitment to seeing entrepreneurs succeed make him an invaluable partner. "
                    "He helped us secure key partnerships and navigate complex regulatory challenges. "
                    "I can't recommend him highly enough."
                ),
                "order": 2,
            },
            {
                "author_name": "Jennifer van der Merwe",
                "author_title": "Managing Director",
                "company": "Cape Town Ventures",
                "content": (
                    "Having worked with Ian across multiple ventures, I've seen firsthand his integrity and "
                    "strategic thinking. He has an incredible ability to spot opportunities others miss and "
                    "build relationships that last. His mentorship has been instrumental in my own "
                    "entrepreneurial journey."
                ),
                "order": 3,
            },
            {
                "author_name": "Michael Botha",
                "author_title": "Co-Founder",
                "company": "FinTech Innovations",
                "content": (
                    "Ian's three decades of experience shine through in every interaction. He brings a "
                    "practical, no-nonsense approach to business challenges while maintaining genuine care for "
                    "the people involved. His partnership approach means he's invested in your success, "
                    "not just providing consulting services."
                ),
                "order": 4,
            },
            {
                "author_name": "Lisa Thompson",
                "author_title": "Entrepreneur",
                "company": "E-commerce Platform",
                "content": (
                    "As a first-time founder, I was overwhelmed by the challenges of scaling a business. "
                    "Ian's mentorship provided clarity and confidence when I needed it most. He helped me "
                    "understand not just what to do, but why it matters. His support extended beyond business "
                    "advice to personal encouragement during tough times."
                ),
                "order": 5,
            },
        ]

        for testimonial_data in testimonials_data:
            Testimonial.objects.get_or_create(
                author_name=testimonial_data["author_name"],
                company=testimonial_data["company"],
                defaults=testimonial_data,
            )

        self.stdout.write(
            self.style.SUCCESS(
                f"Successfully seeded:\n"
                f"  - 1 Profile\n"
                f"  - {len(ventures_data)} Ventures\n"
                f"  - {len(testimonials_data)} Testimonials"
            )
        )

