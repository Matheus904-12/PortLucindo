<?php
// Allow CORS if needed
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

// Validate data
if (!isset($data['name']) || !isset($data['email']) || !isset($data['subject']) || !isset($data['message'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}

$name = htmlspecialchars(strip_tags($data['name']));
$email = filter_var($data['email'], FILTER_VALIDATE_EMAIL);
$subject = htmlspecialchars(strip_tags($data['subject']));
$message = htmlspecialchars(strip_tags($data['message']));

// Validate email
if (!$email) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit;
}

// Your email where you want to receive messages
$to = 'matheuslucindo904@gmail.com';

// Email subject
$email_subject = "Portfolio Contact: $subject";

// Email body
$email_body = "Nome: $name\n";
$email_body .= "Email: $email\n";
$email_body .= "Assunto: $subject\n\n";
$email_body .= "Mensagem:\n$message\n";

// Email headers
$headers = "From: noreply@portfolio.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
if (mail($to, $email_subject, $email_body, $headers)) {
    echo json_encode([
        'success' => true,
        'message' => 'Email enviado com sucesso!'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Erro ao enviar email. Tente novamente mais tarde.'
    ]);
}
?>
