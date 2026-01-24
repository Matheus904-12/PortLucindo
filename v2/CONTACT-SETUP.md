# 📧 Configuração do Formulário de Contato

## ✅ Netlify Forms (Recomendado - Já Configurado)

O formulário está configurado para usar **Netlify Forms**, que funciona automaticamente quando você faz deploy no Netlify.

### Como Funciona:

1. **Deploy no Netlify**: Quando você faz push para o GitHub, o Netlify detecta automaticamente o formulário
2. **Receba por Email**: Configure notificações no painel do Netlify:
   - Acesse: `Site Settings > Forms > Form notifications`
   - Adicione seu email: `matheuslucindo904@gmail.com`
3. **Pronto!**: Você receberá um email toda vez que alguém enviar o formulário

### Vantagens:
- ✅ Sem necessidade de servidor PHP
- ✅ Proteção contra spam integrada
- ✅ Armazenamento de submissões no painel
- ✅ Notificações por email configuráveis
- ✅ Integração com Slack, Zapier, etc.

### Como Ver as Mensagens:

**Opção 1 - Painel Netlify:**
1. Acesse: [app.netlify.com](https://app.netlify.com)
2. Selecione seu site
3. Vá em: `Forms` no menu lateral
4. Veja todas as submissões

**Opção 2 - Email:**
1. Vá em: `Site Settings > Forms > Form notifications`
2. Clique em `Add notification > Email notification`
3. Digite seu email: `matheuslucindo904@gmail.com`
4. Escolha o evento: `New form submission`
5. Salve

---

## 🔧 Alternativa: PHP + SMTP (Para Servidor Próprio)

Se você quiser hospedar em um servidor PHP (não Netlify), use o arquivo `send-email.php`.

### Requisitos:
- Servidor com suporte a PHP
- Função `mail()` habilitada OU biblioteca PHPMailer com SMTP

### Configuração com PHPMailer (Gmail SMTP):

```php
<?php
use PHPMailer\PHPMailer\PHPMailer;

require 'vendor/autoload.php';

$mail = new PHPMailer(true);

$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = 'seu-email@gmail.com';
$mail->Password = 'sua-senha-de-app'; // Gere em: myaccount.google.com/apppasswords
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;

$mail->setFrom('seu-email@gmail.com', 'Portfolio Matheus');
$mail->addAddress('matheuslucindo904@gmail.com');

$mail->Subject = "Portfolio Contact: {$_POST['subject']}";
$mail->Body = "Nome: {$_POST['name']}\nEmail: {$_POST['email']}\n\n{$_POST['message']}";

$mail->send();
?>
```

---

## 🚀 Status Atual

**✅ CONFIGURADO**: Netlify Forms  
**📍 DEPLOY**: lucindoporto.netlify.app  
**📧 EMAIL**: matheuslucindo904@gmail.com  

O formulário está funcionando! Basta configurar as notificações no Netlify.
