from django.http import JsonResponse
import requests
from requests import Response
from rest_framework.exceptions import NotFound
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests
from .models import Cliente
from .serializers import ClienteSerializer


class ClienteView(APIView):
    def post(self, request):
        cep = request.data.get('cep')
        if not cep:
            return Response({"error": "CEP é obrigatório."}, status=status.HTTP_400_BAD_REQUEST)

        response = requests.get(f"https://viacep.com.br/ws/{cep}/json/")

        if response.status_code != 200 or 'erro' in response.json():
            return Response({"error": "CEP inválido."}, status=status.HTTP_400_BAD_REQUEST)

        endereco_data = response.json()
        bairro = endereco_data.get('bairro', '')
        logradouro = endereco_data.get('logradouro', '')

        serializer = ClienteSerializer(data={
            'nome': request.data.get('nome'),
            'telefone': request.data.get('telefone'),
            'cep': cep,
            'logradouro': logradouro,
            'numero': request.data.get('numero'),
            'complemento': request.data.get('complemento', ''),
            'bairro': bairro
        })

        serializer.is_valid(raise_exception=True)
        cliente = serializer.save()

        response_data = ClienteSerializer(cliente).data
        return Response(data=response_data, status=status.HTTP_201_CREATED)


class ClienteListView(APIView):
    def get(self, request):
        clientes = Cliente.objects.all()
        serializer = ClienteSerializer(clientes, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


class ClienteDetailView(APIView):
    def get_object(self, pk):
        try:
            return Cliente.objects.get(pk=pk)
        except Cliente.DoesNotExist:
            raise NotFound("Cliente não encontrado")

    def get(self, request, pk):
        cliente = self.get_object(pk)
        serializer = ClienteSerializer(cliente)
        return Response(serializer.data)


class ClienteUpdateView(APIView):
    def get_object(self, pk):
        try:
            return Cliente.objects.get(pk=pk)
        except Cliente.DoesNotExist:
            raise NotFound("Cliente não encontrado")

    def put(self, request, pk):
        cliente = self.get_object(pk)
        cep = request.data.get('cep')
        if not cep:
            return Response({"error": "CEP é obrigatório."}, status=status.HTTP_400_BAD_REQUEST)

        response = requests.get(f"https://viacep.com.br/ws/{cep}/json/")
        if response.status_code != 200 or 'erro' in response.json():
            return Response({"error": "CEP inválido."}, status=status.HTTP_400_BAD_REQUEST)

        endereco_data = response.json()
        logradouro = endereco_data.get('logradouro', '')
        bairro = endereco_data.get('bairro', '')

        serializer = ClienteSerializer(cliente, data={
            'nome': request.data.get('nome'),
            'telefone': request.data.get('telefone'),
            'cep': cep,
            'logradouro': logradouro,
            'numero': request.data.get('numero'),
            'complemento': request.data.get('complemento', ''),
            'bairro': bairro
        })

        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


class ClienteDeleteView(APIView):
    def get_object(self, pk):
        try:
            return Cliente.objects.get(pk=pk)
        except Cliente.DoesNotExist:
            raise NotFound("Cliente não encontrado")

    def delete(self, request, pk):
        cliente = self.get_object(pk)
        cliente.delete()
        return Response(status=status.HTTP_202_ACCEPTED, data="Cliente deletado com sucesso")
