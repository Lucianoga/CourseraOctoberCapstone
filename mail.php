NEW VERSION

 <?php
         $to = "info@gavoniluciano.com";
         $subject = "Contact form";
         $name = $_POST[name];
         $message = $_POST[message];
         $email = $_POST[email];
         $from="From: $name<$email>\r\nReturn-path: $email";
         
         
         //sanitize
         
         
         $name = filter_var($name,FILTER_SANITIZE_STRING);
         $message = filter_var($message,FILTER_SANITIZE_STRING);
         $email = filter_var($email,FILTER_SANITIZE_EMAIL);
         
         
        
         //recaptcha
         
         $captcha = $_POST["g-recaptcha-response"];
       
         if(!$captcha){
          echo '<h2>Please check the the captcha form.</h2>';
          exit;
        }
        
         
         $secretKey = "6LfsLCIUAAAAACvkXN-XHttVvDY4Y12zP_suYEQ2";
         $ip = $_SERVER['REMOTE_ADDR'];
         
         
         
         //POST Request
         
        $url = 'https://www.google.com/recaptcha/api/siteverify?secret=' . urlencode($secretKey) .  '&response=' . urlencode($captcha);
        $response = file_get_contents($url);
        $responseKeys = json_decode($response,true);
        // should return JSON with success as true
        if($responseKeys["success"]) {
                $retval = mail($to,$subject,$message,$from);
				if( $retval == true ) {
					echo "Message sent successfully...";
         		}else {
		 			echo "Message could not be sent...";
         			} 
        } else {
                echo '<h2>You are spammer ! Get the @$%K out</h2>';
        }

         
       
         
 ?>