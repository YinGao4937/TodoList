from django.conf.urls import url
from App import views
urlpatterns = [
	url(r'^(?P<pk>\d+)', views.DetailTodo.as_view()),
	url(r'^',views.ListTodo.as_view()),
]
