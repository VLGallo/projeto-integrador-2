from rest_framework import serializers
from .models import Produto

class ProdutoSerializer(serializers.ModelSerializer):
    preco = serializers.DecimalField(max_digits=10, decimal_places=2)
    class Meta:
        model = Produto
        fields = ['id', 'nome', 'preco']
