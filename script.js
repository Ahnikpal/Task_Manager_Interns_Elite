// script.js - Core logic for the Premium Glassmorphism Todo List

document.addEventListener('DOMContentLoaded', () => {
    // Phase 2, 3, 4, 5 Implementation
    
    // Select DOM elements
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');
    const emptyState = document.getElementById('empty-state');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // State variables
    let tasks = [];
    let currentFilter = 'all';

    // --- Phase 4: Data Persistence ---
    // Initialize tasks from localStorage
    const init = () => {
        const storedTasks = localStorage.getItem('premiumTasks');
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
        }
        renderTasks();
    };

    // Save tasks to localStorage
    const saveTasks = () => {
        localStorage.setItem('premiumTasks', JSON.stringify(tasks));
    };

    // --- Phase 2: Add Tasks & Inject into DOM ---
    // Handle adding a new task
    const addTask = () => {
        const text = taskInput.value.trim();
        
        if (text !== '') {
            const newTask = {
                id: Date.now().toString(),
                text: text,
                completed: false
            };
            
            tasks.push(newTask);
            saveTasks();
            
            // If we are currently viewing 'completed', switch to 'all' to show the new task
            if (currentFilter === 'completed') {
                setFilter('all');
            } else {
                renderTasks();
            }
            
            taskInput.value = ''; // Clear input
            taskInput.focus();
        }
    };

    // --- Core Rendering Logic ---
    // Render the task list based on the current state and filter
    const renderTasks = () => {
        // Clear current list
        taskList.innerHTML = '';
        
        // Filter tasks
        const filteredTasks = tasks.filter(task => {
            if (currentFilter === 'active') return !task.completed;
            if (currentFilter === 'completed') return task.completed;
            return true; // 'all'
        });

        // Toggle empty state visibility
        if (tasks.length === 0) {
            emptyState.classList.add('visible');
        } else if (filteredTasks.length === 0) {
            // Hide empty state if there are tasks, just none matching the filter
            emptyState.classList.remove('visible');
             // Optionally, could show a "No active/completed tasks" message here instead
        } else {
            emptyState.classList.remove('visible');
        }

        // Inject elements
        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.dataset.id = task.id; // Store ID for delegation

            // HTML Structure for a single task matching the CSS design
            li.innerHTML = `
                <label class="task-checkbox-wrapper" aria-label="Mark task complete">
                    <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                    <span class="checkbox-custom"></span>
                </label>
                <span class="task-text">${escapeHTML(task.text)}</span>
                <button class="delete-btn" aria-label="Delete task">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                </button>
            `;
            
            taskList.appendChild(li);
        });
    };

    // Helper function to prevent XSS
    const escapeHTML = (str) => {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    };

    // --- Phase 3: Delete & Complete Logic via Event Delegation ---
    const handleTaskAction = (e) => {
        // Find the closest task-item parent
        const taskItem = e.target.closest('.task-item');
        if (!taskItem) return;

        const taskId = taskItem.dataset.id;

        // Delete action
        if (e.target.closest('.delete-btn')) {
            // Add a small fade out effect before actual deletion (optional but nice)
            taskItem.style.opacity = '0';
            taskItem.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                tasks = tasks.filter(t => t.id !== taskId);
                saveTasks();
                renderTasks();
            }, 300); // Wait for transition
        }
        
        // Complete toggle action
        // Handle click on the checkbox wrapper OR the text
        if (e.target.closest('.task-checkbox-wrapper') || e.target.classList.contains('task-text')) {
            // If they clicked the label/wrapper, the native checkbox state changes.
            // If they clicked the text, we need to manually toggle.
            // A simple way to always keep things in sync is to find the task and toggle its state.
            
            // To prevent double toggling when clicking the checkbox itself (since it handles its own state),
            // let's rely just on the data array and re-render.
            
            // Note: If clicking the actual `<input type="checkbox">`, the browser toggles the `checked` property.
            // But we intercept it here to update our data model.
            
            // Actually, with labels wrapping checkboxes, clicks bubble up.
            // Let's ensure we only process the toggle once per user interaction.
            
            // If the target is exactly the input checkbox, the state is already visually updated. We just sync.
            // If the target is the text, we inverse the current state.
            
            const taskIndex = tasks.findIndex(t => t.id === taskId);
            if (taskIndex !== -1) {
                // Determine new state based on what was clicked
                if (e.target.classList.contains('task-checkbox')) {
                     tasks[taskIndex].completed = e.target.checked;
                } else if (e.target.classList.contains('task-text')) {
                     // Clicked text, toggle visual and data manually
                     tasks[taskIndex].completed = !tasks[taskIndex].completed;
                } else {
                    // Clicked the wrapper broadly, wait for the actual input change event 
                    // or let the label handle it native via bubbling to the input.
                    // We can just exit here and let the input click trigger.
                    return; 
                }

                saveTasks();
                
                // Only re-render entirely. (For performance we could just toggle classes, but re-render is safer for filters)
                // Small delay to allow CSS transitions to finish if needed
                setTimeout(renderTasks, 50);
            }
        }
    };

    // --- Phase 5: Filtering logic ---
    const setFilter = (filterParam) => {
        currentFilter = filterParam;
        
        // Update button visual state
        filterBtns.forEach(btn => {
            if (btn.dataset.filter === filterParam) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        renderTasks();
    };


    // --- Event Listeners ---
    addBtn.addEventListener('click', addTask);
    
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Event delegation on the parent <ul>
    taskList.addEventListener('click', handleTaskAction);

    // Filter Listeners
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            setFilter(e.target.dataset.filter);
        });
    });

    // Startup
    init();
});
