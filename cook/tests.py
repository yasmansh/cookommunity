from django.urls import reverse
from django.test import TestCase
from cook.models import SystemUser
from simplejson import loads as jr, dumps as jw
from .dto.response import *


def check_internal_error(response, error=None):
    response_str = response.content.decode("utf-8")
    if error is None:
        assert len(response_str) == 0
        return
    assert jr(response_str)['err_c'] == error.get_code()


class AccountViewTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        SystemUser.objects.create(username='user1', password='pw1', first_name='fn1', last_name='ln1')


    def test_url_admin_exists(self):
        response = self.client.get('/admin', follow=True)
        self.assertEqual(response.status_code, 200)

    def test_valid_account_registration(self):
        request = dict(username='jf2023', password='pw2023', first_name='Jack', last_name='Frost')
        response = self.client.post('/api/accounts/', request)
        self.assertEqual(response.status_code, 200)
        check_internal_error(response)

    def test_existing_account_registration(self):
        request = dict(username='user1', password='pw2023', first_name='Jack', last_name='Frost')
        response = self.client.post('/api/accounts/', request)
        self.assertEqual(response.status_code, 200)
        check_internal_error(response, InternalError.ACCOUNT_EXISTS)

    def test_valid_account_login(self):
        request = dict(username='user1', password='pw1')
        response = self.client.post('/api/accounts/login/', request)
        self.assertEqual(response.status_code, 200)
        check_internal_error(response)

    def test_not_existing_account_login(self):
        request = dict(username='false_user', password='false_password')
        response = self.client.post('/api/accounts/login/', request)
        self.assertEqual(response.status_code, 200)
        check_internal_error(response, InternalError.CREDENTIAL_MISMATCH)

    def test_valid_account_logout(self):
        request = dict(username='user1')
        response = self.client.put('/api/accounts/logout/', request)
        self.assertEqual(response.status_code, 200)
        check_internal_error(response)

    def test_not_existing_account_logout(self):
        request = dict(username='false_user')
        response = self.client.put('/api/accounts/logout/', request)
        self.assertEqual(response.status_code, 200)
        check_internal_error(response, InternalError.CREDENTIAL_MISMATCH)

    def test_valid_view_profile(self):
        response = self.client.get('/api/accounts/user1/profile/',follow=True)
        self.assertEqual(response.status_code, 200)

    def test_invalid_view_profile(self):
        response = self.client.get('/api/accounts/false_user/profile/', follow=True)
        self.assertEqual(response.status_code, 200)
        check_internal_error(response, InternalError.CREDENTIAL_MISMATCH)

    def test_valid_update_profile(self):
        request = dict(username='user1', first_name='newFn1', last_name='newLn1', bio='bio1', email='email1')
        response = self.client.post('/api/accounts/user1/profile/', request)
        self.assertEqual(response.status_code, 200)

    def test_invalid_update_profile(self):
        request = dict(username='user1', first_name='newFn1', last_name='newLn1', bio='bio1', email='email1')
        response = self.client.post('/api/accounts/false_user/profile/', request)
        self.assertEqual(response.status_code, 200)
        check_internal_error(response, InternalError.CREDENTIAL_MISMATCH)

