# Generated by Django 5.0.3 on 2024-10-01 13:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gerenciador_de_clientes', '0006_rename_rua_cliente_logradouro'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cliente',
            name='numero',
            field=models.CharField(default='s/n', max_length=10),
            preserve_default=False,
        ),
    ]