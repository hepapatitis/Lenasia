<?php
	// Email Configuration
	$emailAddress = 'stephanus.yanaputra@gmail.com'; // Separate by comma for more email addresses (e.g.: 'email1@domain.com, email2@domain.com')
	$cc_emailAddress = '';
	$bcc_emailAddress = '';
	
    // Variables start
	$name = "";
	$email = "";
	$phone = "";
	$message = "";
	
	$name =  trim($_POST['name']);
	$email =  trim($_POST['email']);
	$phone =  trim($_POST['phone']);
	$message =  nl2br(htmlspecialchars($_POST['message']));
	// Variables end
	
	if($emailAddress != "" && $name != "" && $email != "" && $message != "")
	{
		$subject = "[Lenasia] Message From: $name";	
		$message = "<strong>From:</strong> $name <br/><strong>Email:</strong> $email <br/><strong>Phone:</strong> $phone <br/><br/> <strong>Message:</strong><br />$message";
		
		$headers .= 'From: '. $name . '<' . $email . '>' . "\r\n";
		
		if($cc_emailAddress != '')
			$headers .= 'Cc: '. $cc_emailAddress . "\r\n";
		
		if($bcc_emailAddress != '')
			$headers .= 'Bcc: '. $bcc_emailAddress . "\r\n";
		
		$headers .= 'Reply-To: ' . $email . "\r\n";
		
		$headers .= 'MIME-Version: 1.0' . "\r\n";
		$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
		
		//send email function starts
		mail($emailAddress, $subject, $message, $headers);
		//send email function ends
		
		echo "Thank you, your message has been sent successfully! We will reply back to you shortly.";
	}
	else
	{
		echo "Please complete the form";
	}
?>