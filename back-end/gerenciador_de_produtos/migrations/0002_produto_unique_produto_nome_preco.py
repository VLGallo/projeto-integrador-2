# Generated by Django 5.0.3 on 2024-10-02 11:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gerenciador_de_produtos', '0001_initial'),
    ]

    operations = [
        migrations.AddConstraint(
            model_name='produto',
            constraint=models.UniqueConstraint(fields=('nome', 'preco'), name='unique_produto_nome_preco'),
        ),
    ]