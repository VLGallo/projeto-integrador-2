from rest_framework.exceptions import ValidationError, NotFound
from django.db import IntegrityError
from requests import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests
from .models import Cliente
from .serializers import ClienteSerializer


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError
import requests
from .models import Cliente
from .serializers import ClienteSerializer
from django.db import IntegrityError

class ClienteView(APIView):
    def post(self, request):
        # Obter o CEP do corpo da requisição
        cep = request.data.get('cep')
        if not cep:
            return Response({"error": "CEP é obrigatório."}, status=status.HTTP_400_BAD_REQUEST)

        # Remover traços e espaços do CEP
        cep = cep.replace('-', '').strip()
        if len(cep) != 8:
            return Response({"error": "CEP deve conter exatamente 8 dígitos."}, status=status.HTTP_400_BAD_REQUEST)

        # Chamada à API do ViaCEP para obter dados do endereço
        response = requests.get(f"https://viacep.com.br/ws/{cep}/json/")
        if response.status_code != 200 or 'erro' in response.json():
            return Response({"error": "CEP inválido."}, status=status.HTTP_400_BAD_REQUEST)

        endereco_data = response.json()
        bairro = endereco_data.get('bairro', '')
        logradouro = endereco_data.get('logradouro', '')

        # Limpar o telefone removendo espaços, parênteses e traços
        telefone = request.data.get('telefone', '').replace(' ', '').replace('(', '').replace(')', '').replace('-', '')

        # Preparar dados para o serializer
        serializer = ClienteSerializer(data={
            'nome': request.data.get('nome'),
            'telefone': telefone,
            'cep': cep,
            'logradouro': logradouro,
            'numero': request.data.get('numero'),
            'complemento': request.data.get('complemento', ''),
            'bairro': bairro
        })

        try:
            serializer.is_valid(raise_exception=True)
            cliente = serializer.save()

            response_data = ClienteSerializer(cliente).data
            return Response(data=response_data, status=status.HTTP_201_CREATED)

        except IntegrityError:
            raise ValidationError({"detail": "Cliente já cadastrado com os mesmos dados."})



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

        # Limpar e validar o CEP
        cep = request.data.get('cep', cliente.cep).replace('-', '').strip()
        if not cep or len(cep) != 8:
            return Response({"error": "CEP deve conter exatamente 8 dígitos."}, status=status.HTTP_400_BAD_REQUEST)

        # Chamada à API do ViaCEP para obter dados do endereço
        response = requests.get(f"https://viacep.com.br/ws/{cep}/json/")
        if response.status_code != 200 or 'erro' in response.json():
            return Response({"error": "CEP inválido."}, status=status.HTTP_400_BAD_REQUEST)

        endereco_data = response.json()
        logradouro = endereco_data.get('logradouro', '')
        bairro = endereco_data.get('bairro', '')

        # Limpar o telefone
        telefone = request.data.get('telefone', cliente.telefone).replace('-', '').strip()

        # Preparar dados para o serializer
        serializer = ClienteSerializer(cliente, data={
            'nome': request.data.get('nome', cliente.nome),
            'telefone': telefone,
            'cep': cep,
            'logradouro': logradouro,
            'numero': request.data.get('numero', cliente.numero),
            'complemento': request.data.get('complemento', cliente.complemento),
            'bairro': bairro
        })

        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        except IntegrityError:
            raise ValidationError({"detail": "Outro cliente já cadastrado com os mesmos dados."})


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
