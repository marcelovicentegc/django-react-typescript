import os
from django.db import migrations

class Migration(migrations.Migration):
    dependencies = [
        ('backend', '0003_auto_20200605_0041'),
    ]

    def generate_superuser(apps, schema_editor):
        from django.contrib.auth.models import User

        SU_NAME = 'admin'
        
        try: 
            User.objects.get(username=SU_NAME)
        except User.DoesNotExist:
            SU_EMAIL = 'admin@example.com'
            SU_PASSWORD = 'admin'
            superuser = User.objects.create_superuser(
                username=SU_NAME,
                email=SU_EMAIL,
                password=SU_PASSWORD)
            superuser.is_superuser = True
            superuser.is_staff = True
            superuser.save()

    operations = [
        migrations.RunPython(generate_superuser),
    ]