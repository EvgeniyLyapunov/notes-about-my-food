<?php
  require 'config.php';

  $connection = mysqli_connect($hostPath, $dbUserName, $dbPassword, $dbName);

  $_POST = json_decode(file_get_contents('php://input'), true);

  $date = mysqli_real_escape_string($connection, $_POST["date"]);
  $totalCalories = mysqli_real_escape_string($connection, $_POST["totalCalories"]);
  $totalPrice = mysqli_real_escape_string($connection, $_POST["totalPrice"]);
  $userid = mysqli_real_escape_string($connection, $_POST["userid"]);

  $queryInsert = "INSERT INTO `myDayResult`(`date`, `totalCalories`, `totalPrice`, `userid`)
                    VALUES ('$date', '$totalCalories', '$totalPrice', '$userid')";
  $result = mysqli_query($connection, $queryInsert);

  echo json_encode([
    'data' => $result
  ]);

  mysqli_close($connection);
?>