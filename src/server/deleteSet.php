<?php
  require 'config.php';
  $connection = mysqli_connect($hostPath, $dbUserName, $dbPassword, $dbName);

  $_POST = json_decode(file_get_contents('php://input'), true);

  $id = mysqli_real_escape_string($connection, $_POST["id"]);

  $queryDelete = "DELETE FROM `sets` WHERE `id` = $id";
  $result = mysqli_query($connection, $queryDelete);

  echo json_encode([
    'status' => $result,
    'data' => $id
  ]);

  mysqli_close($connection);
