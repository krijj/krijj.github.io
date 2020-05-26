<?php

// //STOCKAGE DES THÈMES
// $file = 'liste-theme.json';

// //RÉCEPTION DES NOUVEAUX THÈMES
// $ajoutTheme = file_get_contents("php://input");
// var_dump($ajoutTheme);


// //AJOUTER LES NOUVEAUX THÈMES
// file_put_contents($file, $ajoutTheme, FILE_APPEND | LOCK_EX);

?>

<?php

//STOCKAGE DES THÈMES
$file = 'liste-theme.json';

//RÉCEPTION DES NOUVEAUX THÈMES
$ajoutTheme = file_get_contents("php://input");
$ajoutTheme = json_decode($ajoutTheme);
var_dump($ajoutTheme);


//RECUPERER LE CONTENU DE JSON
$listeTheme = file_get_contents($file);
$tempArray = json_decode($listeTheme);

//AJOUTER LES NOUVEAUX THÈMES
if (!is_null($ajoutTheme)) {
array_push($tempArray, $ajoutTheme);
$jsonData = json_encode($tempArray);
file_put_contents($file, $jsonData);
}

var_dump($tempArray);


//Rechercher et supprimer un thème
?>