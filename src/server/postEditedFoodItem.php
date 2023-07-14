<?php
  require 'config.php';
  $connection = mysqli_connect($hostPath, $dbUserName, $dbPassword, $dbName);

  $_POST = json_decode(file_get_contents('php://input'), true);

  $id = mysqli_real_escape_string($connection, $_POST["id"]);
  $name = mysqli_real_escape_string($connection, $_POST["name"]);
  $calories = mysqli_real_escape_string($connection, $_POST["calories"]);
  $userId = mysqli_real_escape_string($connection, $_POST["userId"]);
  $price = mysqli_real_escape_string($connection, $_POST["price"]);

  $queryUpdate = "UPDATE `food` SET `name`= '$name',`calories`= '$calories',`price`= '$price',`userid`= '$userId' WHERE `id` = '$id'";

  $result = mysqli_query($connection, $queryUpdate);

  $querySelectLast = "SELECT * FROM `food` WHERE `id` = '$id'";
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

  mysqli_close($connection);
?>