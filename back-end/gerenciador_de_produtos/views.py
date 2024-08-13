from rest_framework.exceptions import NotFound
from .models import Produto
from .serializers import ProdutoSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

class ProdutoView(APIView):
    def post(self, request):
        serializer = ProdutoSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        produto = serializer.save()

        response_data = ProdutoSerializer(produto).data

        return Response(data=response_data, status=status.HTTP_201_CREATED)

class ProdutoListView(APIView):
    def get(self, request):
        produtos = Produto.objects.all()
        serializer = ProdutoSerializer(produtos, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

class ProdutoDetailView(APIView):
    def get_object(self, pk):
        try:
            return Produto.objects.get(pk=pk)
        except Produto.DoesNotExist:
            raise NotFound("Produto não encontrado")

    def get(self, request, pk):
        produto = self.get_object(pk)
        serializer = ProdutoSerializer(produto)
        return Response(serializer.data)

class ProdutoUpdateView(APIView):
    def get_object(self, pk):
        try:
            return Produto.objects.get(pk=pk)
        except Produto.DoesNotExist:
            raise NotFound("Produto não encontrado")

    def put(self, request, pk):
        produto = self.get_object(pk)
        serializer = ProdutoSerializer(produto, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class ProdutoDeleteView(APIView):
    def get_object(self, pk):
        try:
            return Produto.objects.get(pk=pk)
        except Produto.DoesNotExist:
            raise NotFound("Produto não encontrado")

    def delete(self, request, pk):
        produto = self.get_object(pk)
        produto.delete()
        return Response(status=status.HTTP_202_ACCEPTED, data="Produto deletado com sucesso")
