<!DOCTYPE html>
<HTML lang="en">
<HEAD>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title> Messaging Center </title>
    <link rel='stylesheet' href='css/style.css' />
</HEAD>
<body>
<pre><h1>Welcome to our Messaging Center</h1></pre>

 <p><a href="send.php"><h2>Send New Message </h2></a> </p>
 <h2>Your messages</h2>

</body>

</html>

<?php
session_start();
if(isset($_SESSION[`name`])){
//	echo "<script type='text/javascript'>window.location.href = 'first.php';</script>";
header('Location: ./first.php');

}

?>
<?php
session_start();

// Create connection
$db_name = "id4450544_ntl";
$mysql_username = "id4450544_abdoqasem95";
$mysql_password = "12345678";
$server_name = "localhost";
$conn = mysqli_connect($server_name, $mysql_username, $mysql_password,$db_name);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
	} 
$reciever=$_SESSION[`name`];
$result= mysqli_query($conn,"SELECT sender,message FROM `messages` where reciever='$reciever'");
while ($row = $result->fetch_assoc()) {
	echo" Message from ";
	echo $row['sender']."<br>";
	//$link='read.php';
	//echo "<a href='".$link."'>Message from ".$row['sender']."</a>";
	
	//echo"<br>";
	echo $row['message'];
	echo"<br>";
	echo"<br>";
		}
?>


