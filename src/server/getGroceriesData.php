<?php
  require 'config.php';

  $connection = mysqli_connect($hostPath, $dbUserName, $dbPassword, $dbName);
  $userId = $_GET['userId'];

  $querySelect = "SELECT * FROM `groceries` WHERE `userid` = '$userId'";
  $resData = mysqli_query($connection, $querySelect);

  $data = array();
  $i = 0;
  while($row = mysqli_fetch_assoc($resData)) {
    $data[$i] = $row;
    $i++;
  }
  echo json_encode([
    'data' => $data
  ]);

  mysqli_close($connection);
?>