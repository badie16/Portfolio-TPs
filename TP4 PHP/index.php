<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TP4 : PHP</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>TP4 : PHP</h1>
        <button id="darkModeToggle">
            <i class="fa-solid fa-moon"></i>
        </button>
    </header>
    <main>
        <!-- Exercice 1 -->
        <section id="exercice1" class="exercice-section">
            <h2><i class="fas fa-layer-group"></i> Exercice 1: Manipulation des tableaux</h2>
            <div class="result">
                <h3><i class="fas fa-list"></i> Tableau aléatoire:</h3>
                <?php                
                $tableau = [];
                for ($i = 0; $i < 5; $i++) {
                    $tableau[] = rand(1, 100);
                }           

                echo "<div class='php-output'>";
                echo "<p><strong>Éléments du tableau :</strong></p>";
                echo "<ul>";
                foreach ($tableau as $nombre) {
                    echo "<li>$nombre</li>";
                }
                echo "</ul>";
            
                function trierTableau($tab) {
                    sort($tab);
                    return $tab;
                }
                $tableauTrie = trierTableau($tableau);
                
                echo "<p><strong>Tableau trié :</strong></p>";
                echo "<ul>";
                foreach ($tableauTrie as $nombre) {
                    echo "<li>$nombre</li>";
                }
                echo "</ul>";

                function calculerSomme($tab) {
                    return array_sum($tab);
                }
                $somme = calculerSomme($tableau);
                echo "<p><strong>Somme des éléments :</strong> $somme</p>";

                function trouverMax($tab) {
                    return max($tab);
                }
                $max = trouverMax($tableau);
                echo "<p><strong>Valeur maximale :</strong> $max</p>";
                echo "</div>";
                ?>
            </div>
        </section>
        
        <!-- Exercice 2  -->
        <section id="exercice2" class="exercice-section">
            <h2><i class="fas fa-calculator"></i> Exercice 2: Fonctions et calculs en PHP</h2>
            <div class="result">
                <?php            
                function carre($nombre) {
                    return $nombre * $nombre;
                }
            
                function racineCarree($nombre) {
                    return sqrt($nombre);
                }

                function somme($a, $b) {
                    return $a + $b;
                }
                
                function estPremier($nombre) {    
                    $isPrime = true;
                    for($i = 2; $i <= sqrt($nombre); $i++){
                        if($nombre % $i == 0) {
                            $isPrime = false;
                        }
                    }
                    return $isPrime;
                }
                $nombre1 = 9;
                $nombre2 = 16;            
                echo "<div class='php-output'>";
                echo "<p><strong>Tests des fonctions :</strong></p>";
                echo "<p>Le carré de $nombre1 est : " . carre($nombre1) . "</p>";
                echo "<p>La racine carrée de $nombre2 est : " . racineCarree($nombre2) . "</p>";
                echo "<p>La somme de $nombre1 et $nombre2 est : " . somme($nombre1, $nombre2) . "</p>";
                
                $testPremier1 = 7;
                $testPremier2 = 10;
                echo "<p>$testPremier1 est" . (estPremier($testPremier1) ? "" : " non") . " un nombre premier</p>";
                echo "<p>$testPremier2 est" . (estPremier($testPremier2) ? "" : " non") . " un nombre premier</p>";
                echo "</div>";
                ?>
            </div>
        </section>
        <section id="exercice3" class="exercice-section">
            <h2><i class="fas fa-users"></i> Exercice 3 : Objets et Classes en PHP</h2>
            <div class="result">
                <?php 
                class Personne {
                    public $nom;
                    public $age;
                    public $ville;
                    public function __construct($nom, $age, $ville) {
                        $this->nom = $nom;
                        $this->age = $age;
                        $this->ville = $ville;
                    }                
                    public function sePresenter() {
                        return "Bonjour, je m'appelle {$this->nom}, j'ai {$this->age} ans et j'habite à {$this->ville}.";
                    }
                }
                $personnes = [
                    new Personne("Badie Bahida", 25, "Taroudant"),
                    new Personne("Adil Baqach", 35, "Casablanca"),
                    new Personne("said Manani", 28, "Taroudant"),
                    new Personne("omaima mongo", 22, "asfi")
                ];
                echo "<div class='php-output'>";
                echo "<p><strong>Liste des personnes :</strong></p>";
                echo "<ul class='person-list'>";
                foreach ($personnes as $personne) {
                    echo "<li class='person-item'>";
                    echo "<div class='person-info'>";
                    echo "<span class='person-name'>{$personne->nom}</span>, ";
                    echo "<span class='person-age'>{$personne->age} ans</span>";
                    echo "</div>";
                    echo "<div class='person-presentation'>{$personne->sePresenter()}</div>";
                    echo "</li>";
                }
                echo "</ul>";
                echo "</div>";
                ?>
            </div>
        </section>
        <section id="exercice4" class="exercice-section">
            <h2><i class="fas fa-table"></i>  Exercice 4 : Affichage dynamique avec PHP et HTML</h2>
            <div class="result">
                <?php
                    $tableau = [];
                for ($i = 0; $i < 5; $i++) {
                    $ligne = [];
                    for ($j = 0; $j < 3; $j++) {
                        $ligne[] = rand(1, 100);
                    }
                    $tableau[] = $ligne;
                }
                
                $sommesColonnes = array_fill(0, 3, 0);
                foreach ($tableau as $ligne) {
                    for ($j = 0; $j < 3; $j++) {
                        $sommesColonnes[$j] += $ligne[$j];
                    }
                }
                
                echo "<div class='php-output'>";
                echo "<table class='dynamic-table'>";
                echo "<thead><tr><th>Colonne 1</th><th>Colonne 2</th><th>Colonne 3</th><th>Somme</th></tr></thead>";
                echo "<tbody>";
                
                foreach ($tableau as $ligne) {
                    echo "<tr>";
                    foreach ($ligne as $valeur) {
                        echo "<td>$valeur</td>";
                    }
                    $sommeLigne = array_sum($ligne);
                    echo "<td class='sum-cell'>$sommeLigne</td>";
                    echo "</tr>";
                }
                
                echo "<tr class='sum-row'>";
                foreach ($sommesColonnes as $sommeColonne) {
                    echo "<td class='sum-cell'>$sommeColonne</td>";
                }
                $sommeTotal = array_sum($sommesColonnes);
                echo "<td class='sum-cell total'>$sommeTotal</td>";
                echo "</tr>";
                
                echo "</tbody></table>";
                echo "</div>";
                ?>
            </div>
        </section>
        <section id="exercice5" class="exercice-section">
            <h2><i class="fas fa-code"></i> Exercice 5: Manipulation du DOM avec PHP et HTML</h2>
            <div class="controls">
                <button id="toggleList"><i class="fas fa-eye-slash"></i> Cacher/Afficher la liste</button>
                <input type="text" id="filterInput" placeholder="Filtrer les éléments">
                <button id="darkModeBtn"><i class="fas fa-moon"></i> Mode Sombre</button>
            </div>
            <div id="itemListContainer" class="result">
                <?php
                // 1. Créer une liste de 5 éléments
                $elements = ["Développement Web", "Programmation PHP", "Base de données", "Frameworks PHP", "Sécurité Web"];
                
                echo "<ul id='itemList' class='dynamic-list'>";
                foreach ($elements as $index => $element) {
                    echo "<li class='list-item' data-id='$index'>";
                    echo "<span class='item-text'>$element</span>";
                    echo "<button class='delete-btn' data-id='$index'><i class='fas fa-trash'></i> Supprimer</button>";
                    echo "</li>";
                }
                echo "</ul>";
                ?>
            </div>
        </section>

        <section id="exerciceBonus" class="exercice-section">
            <h2><i class="fas fa-tasks"></i> Exercice Bonus: Mini-application "To-Do List" en PHP</h2>
            <div class="input-group">
                <input type="text" id="todoInput" placeholder="Nouvelle tâche">
                <button id="addTodo"><i class="fas fa-plus"></i> Ajouter</button>
            </div>
            <div class="controls">
                <button id="clearCompleted"><i class="fas fa-broom"></i> Supprimer les tâches terminées</button>
            </div>
            <div class="result">
                <?php
                // Simuler des tâches initiales
                $taches = [
                    ["id" => 1, "texte" => "Apprendre PHP", "terminee" => false],
                    ["id" => 2, "texte" => "Créer une application web", "terminee" => false],
                    ["id" => 3, "texte" => "Étudier les frameworks PHP", "terminee" => true]
                ];
                
                echo "<ul id='todoList' class='todo-list'>";
                foreach ($taches as $tache) {
                    $classeTerminee = $tache["terminee"] ? "completed" : "";
                    $checked = $tache["terminee"] ? "checked" : "";
                    
                    echo "<li class='todo-item $classeTerminee' data-id='{$tache["id"]}'>";
                    echo "<input type='checkbox' class='todo-checkbox' $checked>";
                    echo "<span class='todo-text'>{$tache["texte"]}</span>";
                    echo "<button class='delete-todo-btn'><i class='fas fa-trash'></i></button>";
                    echo "</li>";
                }
                echo "</ul>";
                ?>
            </div>
        </section>
    </main>
    </main>

    <footer>
        <p>&copy; Badie Bahida 2025 | Tous droits réservés</p>
    </footer>

   <script src="./main.js"></script>
</body>
</html>

