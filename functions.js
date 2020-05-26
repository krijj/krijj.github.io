// Bouton d'ajout
const btnAjoutTheme = document.querySelector(".ajoutTheme");
btnAjoutTheme.addEventListener("click", validationTheme);  

//Champs d'ajout des thèmes
const champsTheme = document.querySelector(".champsTheme");

//Affichage des thèmes
const listeThemePerso = document.querySelector(".listeThemePerso");

//Envoyer et stocker les thèmes
function validationTheme(e) {

//Créer une objet thème avec toutes les infos
var monTheme = new Object();

//Si valeur valide
if (champsTheme.value !== "") {
    
    
    //Récupérer la valeur du champs
    monTheme.valeurBrut = champsTheme.value;

    //créer un identifiant unique
    monTheme.identifiant = strRandom({
      includeUpperCase: true,
      includeNumbers: true,
      length: 5,
      startsWithLowerCase: true
    });

    //Vérifier si texte ou URL d'une image
    if (isUrl(monTheme.valeurBrut) && isImg(monTheme.valeurBrut)) {
      //C'est une URL d'image
      monTheme.type = "image";
    } else {
      //C'est du texte
      monTheme.type = "texte";
    }


    console.log("id: " + monTheme.identifiant + " / valeurBrut :" + monTheme.valeurBrut + " / Type : " + monTheme.type);

    //Générer la carte d'affichage et l'ajouter à la liste des thèmes
    displayCard(monTheme, listeThemePerso);

    //Envoyer le thème au fichier PHP
    Sauvegarder(monTheme);

    //Remettre le champs à zéro
    champsTheme.value = "";
  }
}

//Construire la carte d'affichage du thème en html
function displayCard(monTheme, recepteur) {
  //Créer récepteur du thème avec les identifiants
  var ligneTheme = document.createElement("li");
  ligneTheme.classList.add("themeItem", monTheme.type);
  ligneTheme.id = monTheme.identifiant;

  //Ajouter le contenu (texte ou image)
  let contenuTheme;
  if (monTheme.type === "image") {
    contenuTheme = document.createElement("img");
    contenuTheme.src = monTheme.valeurBrut;
  } else if (monTheme.type === "texte") {
    contenuTheme = document.createTextNode(monTheme.valeurBrut);
  }
  ligneTheme.appendChild(contenuTheme);

  //Bouton effacer du thème
  var btnEffacer = document.createElement("button");
  btnEffacer.type = "button";
  btnEffacer.onclick = function() {
    //Effacer le thème
    // 1 : du front
    this.parentNode.remove();
    // 2 : du fichier PHP
    //Supprimer(monTheme.identifiant);
  };
  ligneTheme.appendChild(btnEffacer);

  recepteur.appendChild(ligneTheme);

  // return ligneTheme;
}

//Définir si le texte saisi est une URL d'image
function isUrl(s) {
  var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return regexp.test(s);
}
function isImg(s) {
  var regexp = /\.(gif|jpg|jpeg|tiff|png)$/i;
  return regexp.test(s);
}

//Définir un identifiant unique pour chaque thème
function strRandom(o) {
  var a = 10,
    b = "abcdefghijklmnopqrstuvwxyz",
    c = "",
    d = 0,
    e = "" + b;
  if (o) {
    if (o.startsWithLowerCase) {
      c = b[Math.floor(Math.random() * b.length)];
      d = 1;
    }
    if (o.length) {
      a = o.length;
    }
    if (o.includeUpperCase) {
      e += b.toUpperCase();
    }
    if (o.includeNumbers) {
      e += "1234567890";
    }
  }
  for (; d < a; d++) {
    c += e[Math.floor(Math.random() * e.length)];
  }
  return c;
}
/*
loadTheme();

// Charger tout les thèmes with GET request
function loadTheme() {
  var xhttp = new XMLHttpRequest();
  
  // Set GET method and ajax file path with parameter
  xhttp.open("GET", "ajaxfile.php?request=1", true);
  
  // Content-type
  xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  
  // call on request changes state
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      
      // Parse this.responseText to JSON object
      var response = JSON.parse(this.responseText);
      
      // Select <table id='empTable'> <tbody>
      var empTable = 
      document.getElementById("empTable").getElementsByTagName("tbody")[0];
      
      // Empty the table <tbody>
      empTable.innerHTML = "";
      
      // Loop on response object
      for (var key in response) {
        if (response.hasOwnProperty(key)) {
          var val = response[key];
          
          // insert new row
          var NewRow = empTable.insertRow(0); 
          var name_cell = NewRow.insertCell(0); 
          var username_cell = NewRow.insertCell(1); 
          var email_cell = NewRow.insertCell(2);
          
          name_cell.innerHTML = val['emp_name']; 
          username_cell.innerHTML = val['salary']; 
          email_cell.innerHTML = val['email']; 
          
        }
      } 
      
    }
  };
  
  // Send request
  xhttp.send();
}
*/

//Sauvegarder le thème dans le fichier JSON via PHP
function Sauvegarder(monTheme) {
      //https://www.youtube.com/watch?v=mNrJDGfQGz0&feature=youtu.be
 
      const jsonString = JSON.stringify(monTheme);
      const xhr = new XMLHttpRequest();

      console.log("sauvegarde de : " + jsonString);

      xhr.open("POST", "relais.php");
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(jsonString);
}

//Supprimer le thème dans le fichier JSON via PHP
// function Supprimer(monTheme) {
 
//       const jsonString = JSON.stringify(monTheme);
//       const xhr = new XMLHttpRequest();

//       console.log("sauvegarde de : " + jsonString);

//       xhr.open("POST", "relais.php");
//       xhr.setRequestHeader("Content-Type", "application/json");
//       xhr.send(jsonString);
// }