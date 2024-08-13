from django.db import models


class Cliente(models.Model):
    id = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=200)
    telefone = models.CharField(max_length=30)
    endereco = models.CharField(max_length=200)
    email = models.EmailField()

    def __str__(self):
        return self.nome