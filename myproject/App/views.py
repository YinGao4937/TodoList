# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from rest_framework import permissions
from rest_framework.response import Response


# Create your views here.

from App.models import Todo

from App.serializers import TodoSerializer

from rest_framework import generics

class ListTodo(generics.ListCreateAPIView):

    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    permission_classes = (permissions.AllowAny,)


    def post(self,request,*args,**kwargs):
        todo_item=TodoSerializer(data=request.data) #这里包括了反序列化,生成对象,但是没有保存到数据库中
        if todo_item.is_valid():
            todo_item.save()
            return Response(todo_item.data)
        else:
            return Response(todo_item.errors)



class DetailTodo(generics.RetrieveUpdateDestroyAPIView):

    queryset = Todo.objects.all()

    serializer_class = TodoSerializer
    permission_classes = (permissions.AllowAny,)

    def put(self,request,pk,*args,**kwargs):
        todo_item=Todo.objects.get(pk=pk)
        temp=TodoSerializer(instance = todo_item, data = request.data)
        if temp.is_valid():
            temp.save()
            return Response(temp.data)
        else:
            return Response(temp.errors)
    def delete(self,request,pk,*args,**kwargs):
        todo_item=Todo.objects.filter(pk=pk).delete()
        return Response("删除成功")


