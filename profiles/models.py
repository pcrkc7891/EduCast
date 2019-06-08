from __future__ import unicode_literals
from django.utils.encoding import python_2_unicode_compatible
import uuid
from django.db import models
from django.conf import settings
import datetime

class BaseProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL,
                                primary_key=True)
    slug = models.UUIDField(default=uuid.uuid4, blank=True, editable=False)
    # Add more user profile fields here. Make sure they are nullable
    # or with default values
    picture = models.ImageField('Profile picture',
                                upload_to='profile_pics/%Y-%m-%d/',
                                null=True,
                                blank=True)
    bio = models.CharField("Short Bio", max_length=200, blank=True, null=True)
    email_verified = models.BooleanField("Email verified", default=False)
    firebase_chat_id = models.TextField("Firebase chat id", default=None, null=True)

    class Meta:
        abstract = True


@python_2_unicode_compatible
class Profile(BaseProfile):
    def __str__(self):
        return "{}'s profile". format(self.user)


class BaseLecture(models.Model):
    teacher = models.OneToOneField(settings.AUTH_USER_MODEL,
                                primary_key=True)
    firebase_qstn_id = models.IntegerField("Firebase question id", default=None, null=True)
    firebase_cmnt_id = models.IntegerField("Firebase comment id", default=None, null=True)
    start = models.DateTimeField(default=datetime.datetime.now())
    end = models.DateTimeField(default=datetime.datetime.now()+datetime.timedelta(hours=2))

    class Meta:
        abstract = True

@python_2_unicode_compatible
class Lecture(BaseLecture):
    def __str__(self):
        return "{}'s Lecture". format(self.user)



class BaseLectureAttendee(models.Model):
    student = models.ForeignKey(settings.AUTH_USER_MODEL)
    lecture = models.ForeignKey(Lecture)

    class Meta:
        abstract = True

@python_2_unicode_compatible
class LectureAttendee(BaseLectureAttendee):
    def __str__(self):
        return "{}'s Attendees". format(self.user)
