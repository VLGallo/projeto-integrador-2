from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth.models import User  # Importe o modelo de User
from gerenciador_de_funcionarios.models import Funcionario  # Importando Funcionario do aplicativo correto


@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username_or_email = data.get('username_or_email')
        password = data.get('password')

        # Tenta autenticar um usuário padrão (Django User) apenas pelo nome de usuário
        user = authenticate(request, username=username_or_email, password=password)

        if user is not None:
            # Login bem-sucedido para um usuário padrão
            return JsonResponse({'message': 'Login bem-sucedido como usuário!'}, status=200)

        # Tenta autenticar um funcionário apenas pelo nome de usuário
        try:
            funcionario = Funcionario.objects.get(usuario=username_or_email)  # Verifica pelo nome de usuário
        except Funcionario.DoesNotExist:
            # Retorna mensagem de erro se não encontrar o funcionário
            return JsonResponse({'message': 'Usuário ou senha incorretos'}, status=400)

        # Verifica se a senha está correta para o funcionário
        if funcionario and funcionario.senha == password:  # Comparação direta
            # Login bem-sucedido para um funcionário
            return JsonResponse({'message': 'Login bem-sucedido como funcionário!'}, status=200)

        return JsonResponse({'message': 'Usuário ou senha incorretos'}, status=400)

    return JsonResponse({'message': 'Método não permitido'}, status=405)
