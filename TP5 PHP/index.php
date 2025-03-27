<?php
session_start();

function generateTaskId() {
    return uniqid('task_');
}

if (!isset($_SESSION['tasks'])) {
    $_SESSION['tasks'] = [];
}

if (isset($_POST['action']) && $_POST['action'] === 'add') {
    if (!empty($_POST['taskText'])) {
        $newTask = [
            'id' => generateTaskId(),
            'text' => htmlspecialchars($_POST['taskText']),
            'completed' => false,
            'created_at' => date('Y-m-d H:i:s')
        ];
        $_SESSION['tasks'][] = $newTask;
    }
    header('Location: ' . $_SERVER['PHP_SELF']);
    exit;
}

if (isset($_POST['action']) && $_POST['action'] === 'delete' && isset($_POST['taskId'])) {
    foreach ($_SESSION['tasks'] as $key => $task) {
        if ($task['id'] === $_POST['taskId']) {
            unset($_SESSION['tasks'][$key]);
            break;
        }
    }
    $_SESSION['tasks'] = array_values($_SESSION['tasks']);
    header('Location: ' . $_SERVER['PHP_SELF']);
    exit;
}

if (isset($_POST['action']) && $_POST['action'] === 'update' && isset($_POST['taskId']) && isset($_POST['taskText'])) {
    foreach ($_SESSION['tasks'] as $key => $task) {
        if ($task['id'] === $_POST['taskId']) {
            $_SESSION['tasks'][$key]['text'] = htmlspecialchars($_POST['taskText']);
            break;
        }
    }
    header('Location: ' . $_SERVER['PHP_SELF']);
    exit;
}

if (isset($_POST['action']) && $_POST['action'] === 'toggle' && isset($_POST['taskId'])) {
    foreach ($_SESSION['tasks'] as $key => $task) {
        if ($task['id'] === $_POST['taskId']) {
            $_SESSION['tasks'][$key]['completed'] = !$_SESSION['tasks'][$key]['completed'];
            break;
        }
    }
    header('Location: ' . $_SERVER['PHP_SELF']);
    exit;
}

if (isset($_POST['action']) && $_POST['action'] === 'clear_completed') {
    $_SESSION['tasks'] = array_filter($_SESSION['tasks'], function($task) {
        return !$task['completed'];
    });
    $_SESSION['tasks'] = array_values($_SESSION['tasks']);
    header('Location: ' . $_SERVER['PHP_SELF']);
    exit;
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TP5 : Gestion d'une Liste de Tâches Avancée</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="main.css">
</head>
<body>
    <header>
        <h1>TP5 : Gestion d'une Liste de Tâches Avancée</h1>
        <div class="header-controls">
            <button id="darkModeToggle" class="btn-icon">
                <i class="fas fa-moon"></i>
            </button>
        </div>
    </header>

    <main class="container">
        <div class="task-app">
            <section class="task-section">
                <h2><i class="fas fa-tasks"></i> Gestionnaire de Tâches</h2>
                
                <div class="task-form">
                    <form id="addTaskForm" method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
                        <div class="input-group">
                            <input type="text" id="taskInput" name="taskText" class="form-control" placeholder="Ajouter une nouvelle tâche..." required>
                            <input type="hidden" name="action" value="add">
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-plus"></i> Ajouter
                            </button>
                        </div>
                    </form>
                </div>

                <div class="task-controls">
                    <div class="search-container">
                        <input type="text" id="searchInput" class="form-control" placeholder="Rechercher une tâche...">
                        <i class="fas fa-search search-icon"></i>
                    </div>
                    <div class="sort-buttons">
                        <button id="sortAlphaBtn" class="btn btn-outline-primary">
                            <i class="fas fa-sort-alpha-down"></i> Trier
                        </button>
                        <button id="clearCompletedBtn" class="btn btn-outline-danger">
                            <i class="fas fa-broom"></i> Supprimer terminées
                        </button>
                    </div>
                </div>

                <div class="task-filters">
                    <button class="filter-btn active" data-filter="all">Toutes</button>
                    <button class="filter-btn" data-filter="active">En cours</button>
                    <button class="filter-btn" data-filter="completed">Terminées</button>
                </div>

                <div class="task-list-container">
                    <ul id="taskList" class="task-list">
                        <?php foreach ($_SESSION['tasks'] as $task): ?>
                            <li class="task-item <?php echo $task['completed'] ? 'completed' : ''; ?>" data-id="<?php echo $task['id']; ?>">
                                <div class="task-content">
                                    <div class="task-checkbox-container">
                                        <form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>" class="toggle-form">
                                            <input type="hidden" name="action" value="toggle">
                                            <input type="hidden" name="taskId" value="<?php echo $task['id']; ?>">
                                            <input type="checkbox" class="task-checkbox" <?php echo $task['completed'] ? 'checked' : ''; ?> onchange="this.form.submit()">
                                        </form>
                                    </div>
                                    <span class="task-text"><?php echo $task['text']; ?></span>
                                </div>
                                <div class="task-actions">
                                    <button class="btn-edit" data-id="<?php echo $task['id']; ?>" data-text="<?php echo htmlspecialchars($task['text'], ENT_QUOTES); ?>">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>" class="delete-form">
                                        <input type="hidden" name="action" value="delete">
                                        <input type="hidden" name="taskId" value="<?php echo $task['id']; ?>">
                                        <button type="submit" class="btn-delete">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </form>
                                </div>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </div>

                <form id="clearCompletedForm" method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>" style="display: none;">
                    <input type="hidden" name="action" value="clear_completed">
                </form>
            </section>

  
            <div id="editTaskModal" class="modal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h3>Modifier la tâche</h3>
                    <form id="editTaskForm" method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
                        <input type="hidden" name="action" value="update">
                        <input type="hidden" id="editTaskId" name="taskId" value="">
                        <div class="form-group">
                            <input type="text" id="editTaskText" name="taskText" class="form-control" required>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" id="cancelEdit">Annuler</button>
                            <button type="submit" class="btn btn-primary">Enregistrer</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>

    <footer>
        <p>&copy; Badie Bahida 2025 | Tous droits réservés</p>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    <script src="main.js"></script>
</body>
</html>
