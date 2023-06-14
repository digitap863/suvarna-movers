<?php
// SMTP settings
$smtp_host = 'smtp.gmail.com';
$smtp_port = 587;
$smtp_username = 'mailserviceSensRes@gmail.com';
$smtp_password = 'j1O*$MgA6G29';

// Enable SMTP authentication and encryption
ini_set('SMTP', $smtp_host);
ini_set('smtp_port', $smtp_port);
ini_set('sendmail_from', $smtp_username);
ini_set('smtp_user', $smtp_username);
ini_set('smtp_pass', $smtp_password);
ini_set('smtp_auth', 'login');
ini_set('smtp_crypto', 'tls');
ini_set("SMTP","ssl://smtp.gmail.com");
ini_set("smtp_port","465");
if (!isset($_POST['move_from']) || !isset($_POST['move_to'])) {
    die("Please fill out all required fields.");
  }

  $to = "amalc.plr@gmail.com";
  $email_subject = "New Appointment Request";

  $move_from = $_POST['move_from'];
  $move_to = $_POST['move_to'];
  $your_date = $_POST['your_date'];
  $user_name = $_POST['user_name'];
  $email_user = $_POST['email_user'];
  $user_phone = $_POST['user_phone'];
  $user_text = $_POST['user_text'];

  $template = '<div>Name: ' . $user_name . '</div>';
        
  $headers = 'MIME-Version: 1.0' . "\r\n";
  $headers.='Content-type: text/html; charset=utf-8; charset=iso-8859-1' . "\r\n";
  $headers.='From:' . $email_user . "\r\n"; // Sender's Email

// $headers = "From: noreply@example.com";
$mail_sent = mail($to, $email_subject, $template, $headers, '');

if ($mail_sent) {
    echo "Thank you! Your appointment request has been received.";
  } else {
    echo "Oops! Something went wrong. Please try again later.";
  }


?>

