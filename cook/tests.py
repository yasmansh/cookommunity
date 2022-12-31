from urllib import response
from django.test import TestCase
from cook.models import SystemUser

class AccountViewTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        SystemUser.objects.create(first_name="John", last_name="Brown")

    def test_url_admin_exists(self):
        response = self.client.get('/admin', follow=True) 
        self.assertEqual(response.status_code, 200)
