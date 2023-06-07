<?php
  require 'config.php';

  $connection = mysqli_connect($hostPath, $dbUserName, $dbPassword, $dbName);

  $_POST = json_decode(file_get_contents('php://input'), true);

  $nickname = mysqli_real_escape_string($connection, $_POST["nickname"]);
  $password = mysqli_real_escape_string($connection, $_POST["password"]);

  $querySelect = "SELECT * FROM `users` WHERE (`nickname` = '$nickname') AND (`password` = '$password')";
  $result = mysqli_query($connection, $querySelect);

  if(mysqli_num_rows($result) == 0) {
    echo json_encode([
      'status' => 'Пользователь не найден']);
  } else {
    $record = mysqli_fetch_assoc($result);
    echo json_encode([
      'data' => $record
    ]);
  }
  
  mysqli_close($connection);
?>