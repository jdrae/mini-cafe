from django.contrib.auth import login
from django.shortcuts import redirect
from django.views import generic
from django.contrib.auth import views as auth_views

from .forms import UserForm
from .models import User


class LoginView(auth_views.LoginView):

    def dispatch(self, request, *args, **kwargs):
        response = super().dispatch(request, *args, **kwargs)
        response.set_cookie("user_id", self.request.user.id)
        return response


class LogoutView(auth_views.LogoutView):

    def dispatch(self, request, *args, **kwargs):
        response = super().dispatch(request, *args, **kwargs)
        response.delete_cookie("user_id")
        return response


class SignUpView(generic.CreateView):
    model = User
    form_class = UserForm
    template_name = 'accounts/signup.html'

    def form_valid(self, form):
        user = form.save()
        login(self.request, user)

        response = redirect('/')
        response.set_cookie("user_id", self.request.user.id)
        return response
