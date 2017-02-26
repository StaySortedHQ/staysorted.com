<?php	
	if(empty($_POST['input_2348']) && strlen($_POST['input_2348']) == 0)
	{
		return false;
	}
	
	$input_2348 = $_POST['input_2348'];
	
	$to = 'receiver@yoursite.com'; // Email submissions are sent to this email

	// Create email	
	$email_subject = "Message from staysorted.com.";
	$email_body = "You have received a new message. \n\n".
				  "Input_2348: $input_2348 \n";
	$headers = "MIME-Version: 1.0\r\nContent-type: text/plain; charset=UTF-8\r\n";	
	$headers .= "From: contact@yoursite.com\n";
	$headers .= "Reply-To: $input_2348";	
	
	mail($to,$email_subject,$email_body,$headers); // Post message
	return true;			
?>