<?php
  require 'config.php';

  $connection = mysqli_connect($hostRath, $dbUserName, $dbPassword, $dbName);
  $id = $_GET['id'];


?>