"""mmixx URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from django.conf.urls import url, include
from rest_framework import routers
from rest_framework_swagger.views import get_swagger_view
from style_transfer import views

from rest_framework.permissions import AllowAny
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from drf_yasg.generators import OpenAPISchemaGenerator

# import music.serializers
# import music.views as views

# router = routers.DefaultRouter()
# router.register('music', music.serializers.MusicViewSet)

class SchemaGenerator(OpenAPISchemaGenerator):
  def get_schema(self, request=None, public=False):
    schema = super(SchemaGenerator, self).get_schema(request, public)
    schema.basePath = '/django/api/'
    return schema

schema_view = get_schema_view(
    openapi.Info(
        title="Python Server",
        default_version='v1',
        description="Music Mix API\nMusic Inst API",
        terms_of_service="https://www.google.com/policies/terms/",
    ),
    public=True,
    permission_classes=(AllowAny,),
    generator_class=SchemaGenerator,

)

urlpatterns = [
    path('admin/', admin.site.urls),
    # rest_framework 
    path('api-auth/', include('rest_framework.urls')),
    url('api/doc/', get_swagger_view(title='Rest API Document')),
    url('api/', include('style_transfer.urls')),
    # APIView 클래스를 as_view로 라우팅 -> views에서 불러와 처리함
    # url('api1/music', views.MusicAPIView.as_view()),
    url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
