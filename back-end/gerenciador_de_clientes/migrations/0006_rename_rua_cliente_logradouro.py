# Generated by Django 5.0.3 on 2024-09-26 00:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('gerenciador_de_clientes', '0005_alter_cliente_complemento_alter_cliente_numero'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cliente',
            old_name='rua',
            new_name='logradouro',
        ),
    ]
