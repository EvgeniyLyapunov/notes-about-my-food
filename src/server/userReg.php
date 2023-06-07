<?php
  require 'config.php';

  $connection = mysqli_connect($hostPath, $dbUserName, $dbPassword, $dbName);

  $_POST = json_decode(file_get_contents('php://input'), true);

  $userId = mysqli_real_escape_string($connection, $_POST["userId"]);
  $nickname = mysqli_real_escape_string($connection, $_POST["nickname"]);
  $password = mysqli_real_escape_string($connection, $_POST["password"]);

  $querySelectBefore = "SELECT * FROM `users` WHERE (`nickname` = '$nickname')";
  $resultBefore = mysqli_query($connection, $querySelectBefore);

  if(mysqli_num_rows($resultBefore) != 0) {
    echo json_encode([
      'status' => 'Пользователь c таким ником уже существует']);
  } else {
    $queryInsert = "INSERT INTO `users`(`nickname`, `password`, `userId`)
                    VALUES ('$nickname', '$password', '$userId')";
    $result = mysqli_query($connection, $queryInsert);

    $id = mysqli_insert_id($connection);

    $querySelectLast = "SELECT * FROM `users` WHERE `id` = $id";
    $resData = mysqli_query($connection, $querySelectLast);

    $data = array();
    $i = 0;
    while($row = mysqli_fetch_assoc($resData)) {
      $data[$i] = $row;
      $i++;
    }
    echo json_encode([
      'data' => $data[0]
    ]);
  }

  mysqli_close($connection);
?>