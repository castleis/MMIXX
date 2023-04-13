from django.urls import path, include
from django.conf.urls import url
from .views import *

app_name = 'style_transfer'

urlpatterns = [
    path('mix', MusicAPIView.as_view()),
    path('mix/inst', InstAPIView.as_view())
]
