import { useState, useEffect, useCallback } from 'react';
import {
  Container, Typography, Box, TextField, Button, Paper,
  List, ListItem, ListItemText, ListItemSecondaryAction,
  IconButton, Checkbox, Dialog, DialogTitle, DialogContent,
  DialogActions, CircularProgress, Snackbar, Alert, ToggleButton, ToggleButtonGroup, Collapse
} from '@mui/material';
import { Delete, AutoAwesome, Check as CheckIcon, Add as AddIcon, DragIndicator as DragIcon, ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon, FilterList as FilterIcon, Edit as EditIcon } from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');

  // Modals and Loaders
  const [loading, setLoading] = useState(false);
  const [suggestingFor, setSuggestingFor] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsModalOpen, setSuggestionsModalOpen] = useState(false);

  // Filtering and Expansion
  const [filter, setFilter] = useState('ALL');
  const [expandedTasks, setExpandedTasks] = useState(new Set());

  // Feedback
  const [toast, setToast] = useState({ open: false, message: '', severity: 'info' });

  // Manual Subtask UI
  const [addingSubtaskTo, setAddingSubtaskTo] = useState(null); // taskId
  const [manualSubtaskTitle, setManualSubtaskTitle] = useState('');
  const [editingSubtask, setEditingSubtask] = useState(null); // { id, title, isSuggestion: bool }
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/api/tasks/`);
      setTasks(res.data);
    } catch {
      showToast('Error cargando tareas', 'error');
    }
  }, []);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'PENDING') return task.status === 'PENDING';
    if (filter === 'COMPLETED') return task.status === 'COMPLETED';
    return true;
  });

  const toggleExpandTask = (taskId) => {
    const newExpanded = new Set(expandedTasks);
    if (newExpanded.has(taskId)) {
      newExpanded.delete(taskId);
    } else {
      newExpanded.add(taskId);
    }
    setExpandedTasks(newExpanded);
  };

  const showToast = (message, severity = 'info') => {
    setToast({ open: true, message, severity });
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    try {
      await axios.post(`${API_URL}/api/tasks/`, {
        title: newTaskTitle,
        description: newTaskDesc,
        status: 'PENDING'
      });
      setNewTaskTitle('');
      setNewTaskDesc('');
      fetchTasks();
      showToast('Tarea creada', 'success');
    } catch {
      showToast('Error creando tarea', 'error');
    }
  };

  const handleToggleTaskStatus = async (task) => {
    try {
      const newStatus = task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
      await axios.patch(`${API_URL}/api/tasks/${task.id}/`, { status: newStatus });
      fetchTasks();
    } catch {
      showToast('Error actualizando tarea', 'error');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/tasks/${id}/`);
      fetchTasks();
      showToast('Tarea eliminada', 'success');
    } catch {
      showToast('Error eliminando tarea', 'error');
    }
  };

  // --- Subtasks AI ---
  const handleSuggestSubtasks = async (task) => {
    setSuggestingFor(task.id);
    try {
      const res = await axios.post(`${API_URL}/api/tasks/${task.id}/suggest/`);
      setSuggestions(res.data);
      setSuggestionsModalOpen(true);
    } catch {
      showToast('Error generando sugerencias. ¿La API Key es válida?', 'error');
      setSuggestingFor(null);
    }
  };

  const handleAcceptSuggestion = async (idx) => {
    const sugg = suggestions[idx];
    try {
      await axios.post(`${API_URL}/api/subtasks/`, {
        task: suggestingFor,
        title: sugg.title,
        status: 'PENDING',
        order_index: idx
      });
      const newSugg = [...suggestions];
      newSugg.splice(idx, 1);
      setSuggestions(newSugg);
      fetchTasks();
      showToast('Subtarea añadida', 'success');
      if (newSugg.length === 0) {
        setSuggestionsModalOpen(false);
        setSuggestingFor(null);
      }
    } catch {
      showToast('Error aceptando sugerencia', 'error');
    }
  };

  const handleAcceptAllSuggestions = async () => {
    setLoading(true);
    try {
      for (let i = 0; i < suggestions.length; i++) {
        await axios.post(`${API_URL}/api/subtasks/`, {
          task: suggestingFor,
          title: suggestions[i].title,
          status: 'PENDING',
          order_index: i
        });
      }
      setSuggestions([]);
      setSuggestionsModalOpen(false);
      setSuggestingFor(null);
      fetchTasks();
      showToast('Todas las subtareas añadidas', 'success');
    } catch {
      showToast('Error guardando sugerencias', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveSuggestion = (idx) => {
    const newSugg = [...suggestions];
    newSugg.splice(idx, 1);
    setSuggestions(newSugg);
    if (newSugg.length === 0) {
      setSuggestionsModalOpen(false);
      setSuggestingFor(null);
    }
  };

  const handleToggleSubtask = async (subtask) => {
    try {
      const newStatus = subtask.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
      await axios.patch(`${API_URL}/api/subtasks/${subtask.id}/`, { status: newStatus });
      fetchTasks();
    } catch {
      // Silenciar errores menores de actualización de estado
    }
  };

  const handleDeleteSubtask = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/subtasks/${id}/`);
      fetchTasks();
    } catch {
      // Silenciar errores menores de eliminación
    }
  };

  const handleAddSubtaskManual = async (taskId) => {
    if (!manualSubtaskTitle.trim()) return;
    try {
      await axios.post(`${API_URL}/api/subtasks/`, {
        task: taskId,
        title: manualSubtaskTitle,
        status: 'PENDING',
        order_index: tasks.find(t => t.id === taskId).subtasks.length
      });
      setManualSubtaskTitle('');
      setAddingSubtaskTo(null);
      fetchTasks();
      showToast('Subtarea añadida', 'success');
    } catch {
      showToast('Error añadiendo subtarea', 'error');
    }
  };

  const handleUpdateSubtask = async () => {
    if (!editValue.trim() || !editingSubtask) return;

    if (editingSubtask.isSuggestion) {
      const newSugg = [...suggestions];
      newSugg[editingSubtask.id].title = editValue;
      setSuggestions(newSugg);
      setEditingSubtask(null);
    } else {
      try {
        await axios.patch(`${API_URL}/api/subtasks/${editingSubtask.id}/`, {
          title: editValue
        });
        fetchTasks();
        setEditingSubtask(null);
        showToast('Subtarea actualizada', 'success');
      } catch {
        showToast('Error actualizando subtarea', 'error');
      }
    }
  };

  // --- Drag and Drop ---
  const handleOnDragEnd = async (result) => {
    if (!result.destination) return;
    const { source, destination, type } = result;

    if (type === 'TASK') {
      if (source.index === destination.index) return;
      const items = Array.from(tasks);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
      setTasks(items);

      try {
        await axios.post(`${API_URL}/api/tasks/reorder/`, {
          task_ids: items.map(t => t.id)
        });
      } catch {
        showToast('Error reordenando tareas', 'error');
        fetchTasks();
      }
    } else if (type.startsWith('SUBTASK-')) {
      if (source.index === destination.index) return;
      const taskId = type.split('-')[1];
      const taskIndex = tasks.findIndex(t => t.id === parseInt(taskId));
      if (taskIndex === -1) return;

      const newTasks = [...tasks];
      const task = newTasks[taskIndex];
      const subitems = Array.from(task.subtasks);
      const [reorderedSub] = subitems.splice(source.index, 1);
      subitems.splice(destination.index, 0, reorderedSub);
      task.subtasks = subitems;
      setTasks(newTasks);

      try {
        await axios.post(`${API_URL}/api/subtasks/reorder/`, {
          subtask_ids: subitems.map(s => s.id)
        });
      } catch {
        showToast('Error reordenando subtareas', 'error');
        fetchTasks();
      }
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom fontWeight="bold" color="primary">
        Kairós Task Manager
      </Typography>

      {/* Create Task Form */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>Nueva Tarea</Typography>
        <Box component="form" onSubmit={handleCreateTask} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Título"
            variant="outlined"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Descripción o contexto (opcional)"
            variant="outlined"
            multiline
            rows={3}
            value={newTaskDesc}
            onChange={(e) => setNewTaskDesc(e.target.value)}
            fullWidth
            placeholder="Ej: Preparar presentación trimestral para la junta..."
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            startIcon={<AddIcon />}
            disabled={!newTaskTitle.trim()}
          >
            Añadir Tarea
          </Button>
        </Box>
      </Paper>

      {/* Filters and Search Area */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" color="text.secondary">Tus Tareas</Typography>
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={(e, newFilter) => newFilter && setFilter(newFilter)}
          size="small"
          color="primary"
        >
          <ToggleButton value="ALL">Todas</ToggleButton>
          <ToggleButton value="PENDING">Pendientes</ToggleButton>
          <ToggleButton value="COMPLETED">Completas</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Task List */}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="tasks-list" type="TASK">
          {(provided) => (
            <Box
              {...provided.droppableProps}
              ref={provided.innerRef}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              {filteredTasks.map((task, index) => (
                <Draggable key={task.id.toString()} draggableId={task.id.toString()} index={index}>
                  {(provided) => {
                    const isExpanded = expandedTasks.has(task.id);
                    return (
                      <Paper
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        elevation={isExpanded ? 4 : 1}
                        sx={{
                          p: 0,
                          overflow: 'hidden',
                          borderRadius: 2,
                          borderLeft: `4px solid ${task.status === 'COMPLETED' ? '#4caf50' : '#2196f3'}`,
                          bgcolor: 'background.paper',
                          transition: 'all 0.2s ease-in-out',
                          mb: isExpanded ? 2 : 0
                        }}
                      >
                        {/* Header / Collapsed View */}
                        <Box sx={{
                          p: 1.5,
                          display: 'flex',
                          alignItems: 'center',
                          bgcolor: task.status === 'COMPLETED' ? 'rgba(76, 175, 80, 0.05)' : 'transparent',
                          minHeight: '64px' // Consistencia vertical
                        }}>
                          <Box {...provided.dragHandleProps} sx={{ display: 'flex', color: 'text.secondary', cursor: 'grab', mr: 1 }}>
                            <DragIcon />
                          </Box>

                          <Checkbox
                            checked={task.status === 'COMPLETED'}
                            onChange={() => handleToggleTaskStatus(task)}
                            color="success"
                          />

                          <Box
                            sx={{ flexGrow: 1, ml: 1, cursor: 'pointer' }}
                            onClick={() => toggleExpandTask(task.id)}
                          >
                            <Typography variant="h6" sx={{
                              textDecoration: task.status === 'COMPLETED' ? 'line-through' : 'none',
                              color: task.status === 'COMPLETED' ? 'text.secondary' : 'text.primary',
                              fontSize: '1.1rem',
                              lineHeight: 1.2
                            }}>
                              {task.title}
                            </Typography>
                          </Box>

                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton onClick={() => toggleExpandTask(task.id)} size="small">
                              {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </IconButton>
                            <IconButton color="error" onClick={() => handleDeleteTask(task.id)} size="small">
                              <Delete fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>

                        {/* Collapsible Content (Description and Subtasks) */}
                        <Collapse in={isExpanded} timeout="auto">
                          <Box sx={{ p: 2, pt: 0, ml: 6 }}>
                            {task.description && (
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, p: 1, bgcolor: 'rgba(0,0,0,0.02)', borderRadius: 1 }}>
                                {task.description}
                              </Typography>
                            )}

                            <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
                              <Button
                                size="small"
                                variant="outlined"
                                color="secondary"
                                startIcon={suggestingFor === task.id ? <CircularProgress size={16} /> : <AutoAwesome />}
                                onClick={() => handleSuggestSubtasks(task)}
                                disabled={suggestingFor === task.id || task.status === 'COMPLETED'}
                              >
                                Sugerir Subtareas
                              </Button>
                              <Button
                                size="small"
                                variant="outlined"
                                color="primary"
                                startIcon={<AddIcon />}
                                onClick={() => setAddingSubtaskTo(addingSubtaskTo === task.id ? null : task.id)}
                                disabled={task.status === 'COMPLETED'}
                              >
                                Añadir Subtarea
                              </Button>
                            </Box>

                            {addingSubtaskTo === task.id && (
                              <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
                                <TextField
                                  size="small"
                                  fullWidth
                                  placeholder="Nueva subtarea..."
                                  value={manualSubtaskTitle}
                                  onChange={(e) => setManualSubtaskTitle(e.target.value)}
                                  onKeyPress={(e) => e.key === 'Enter' && handleAddSubtaskManual(task.id)}
                                  autoFocus
                                />
                                <Button variant="contained" size="small" onClick={() => handleAddSubtaskManual(task.id)}>Guardar</Button>
                              </Box>
                            )}

                            {/* Subtasks */}
                            {task.subtasks && task.subtasks.length > 0 && (
                              <Droppable droppableId={`subtasks-list-${task.id}`} type={`SUBTASK-${task.id}`}>
                                {(providedSub) => (
                                  <Box
                                    {...providedSub.droppableProps}
                                    ref={providedSub.innerRef}
                                    sx={{ bgcolor: 'background.default', p: 1.5, borderRadius: 1, borderTop: 1, borderColor: 'divider' }}
                                  >
                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                      Subtareas ({task.subtasks.filter(s => s.status === 'COMPLETED').length}/{task.subtasks.length})
                                    </Typography>
                                    <List dense disablePadding>
                                      {task.subtasks.map((sub, subIndex) => (
                                        <Draggable key={`sub-${sub.id}`} draggableId={`sub-${sub.id}`} index={subIndex}>
                                          {(providedSubItem) => (
                                            <ListItem
                                              ref={providedSubItem.innerRef}
                                              {...providedSubItem.draggableProps}
                                              sx={{ pr: 11, pl: 0 }}
                                            >
                                              <Box {...providedSubItem.dragHandleProps} sx={{ mr: 1, color: 'text.disabled', cursor: 'grab', display: 'flex', alignItems: 'center' }}>
                                                <DragIcon fontSize="small" />
                                              </Box>
                                              <Checkbox
                                                edge="start"
                                                checked={sub.status === 'COMPLETED'}
                                                onChange={() => handleToggleSubtask(sub)}
                                                size="small"
                                              />
                                              {editingSubtask?.id === sub.id && !editingSubtask.isSuggestion ? (
                                                <TextField
                                                  fullWidth
                                                  size="small"
                                                  value={editValue}
                                                  onChange={(e) => setEditValue(e.target.value)}
                                                  onBlur={handleUpdateSubtask}
                                                  onKeyPress={(e) => e.key === 'Enter' && handleUpdateSubtask()}
                                                  autoFocus
                                                />
                                              ) : (
                                                <ListItemText
                                                  primary={sub.title}
                                                  onClick={() => {
                                                    setEditingSubtask({ id: sub.id, title: sub.title, isSuggestion: false });
                                                    setEditValue(sub.title);
                                                  }}
                                                  sx={{
                                                    textDecoration: sub.status === 'COMPLETED' ? 'line-through' : 'none',
                                                    color: sub.status === 'COMPLETED' ? 'text.secondary' : 'text.primary',
                                                    cursor: 'pointer',
                                                    '&:hover': { bgcolor: 'rgba(0,0,0,0.03)' }
                                                  }}
                                                />
                                              )}
                                              <ListItemSecondaryAction>
                                                <IconButton
                                                  edge="end"
                                                  size="small"
                                                  onClick={() => {
                                                    setEditingSubtask({ id: sub.id, title: sub.title, isSuggestion: false });
                                                    setEditValue(sub.title);
                                                  }}
                                                  sx={{ mr: 0.5, opacity: 0.6 }}
                                                >
                                                  <EditIcon fontSize="extrasmall" sx={{ fontSize: '1rem' }} />
                                                </IconButton>

                                                <IconButton edge="end" size="small" color="error" onClick={() => handleDeleteSubtask(sub.id)}>
                                                  <Delete fontSize="small" />
                                                </IconButton>
                                              </ListItemSecondaryAction>
                                            </ListItem>
                                          )}
                                        </Draggable>
                                      ))}
                                      {providedSub.placeholder}
                                    </List>
                                  </Box>
                                )}
                              </Droppable>
                            )}
                          </Box>
                        </Collapse>
                      </Paper>
                    );
                  }}
                </Draggable>
              ))}
              {provided.placeholder}
              {tasks.length === 0 && (
                <Typography variant="body1" color="text.secondary" align="center" sx={{ my: 4 }}>
                  No hay tareas. ¡Añade una para comenzar!
                </Typography>
              )}
            </Box>
          )}
        </Droppable>
      </DragDropContext>

      {/* AI Suggestions Modal */}
      <Dialog open={suggestionsModalOpen} onClose={() => { setSuggestionsModalOpen(false); setSuggestingFor(null); }} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AutoAwesome color="secondary" />
          Sugerencias de Kairós AI
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Revisa, edita o elimina las subtareas sugeridas antes de añadirlas a tu tarea.
          </Typography>
          <List>
            {suggestions.map((sugg, idx) => (
              <ListItem key={idx} sx={{ bgcolor: 'background.paper', mb: 1, borderRadius: 1, pr: 15 }}>
                {editingSubtask?.id === idx && editingSubtask.isSuggestion ? (
                  <TextField
                    fullWidth
                    size="small"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={handleUpdateSubtask}
                    onKeyPress={(e) => e.key === 'Enter' && handleUpdateSubtask()}
                    autoFocus
                  />
                ) : (
                  <ListItemText
                    primary={sugg.title}
                    onClick={() => {
                      setEditingSubtask({ id: idx, title: sugg.title, isSuggestion: true });
                      setEditValue(sugg.title);
                    }}
                    sx={{ cursor: 'pointer' }}
                  />
                )}
                <ListItemSecondaryAction>
                  <IconButton edge="end" color="primary" onClick={() => {
                    setEditingSubtask({ id: idx, title: sugg.title, isSuggestion: true });
                    setEditValue(sugg.title);
                  }} size="small" sx={{ mr: 1, opacity: 0.8 }}>
                    <EditIcon fontSize="small" />
                  </IconButton>

                  <IconButton edge="end" color="success" onClick={() => handleAcceptSuggestion(idx)} size="small" sx={{ mr: 1 }}>
                    <CheckIcon />
                  </IconButton>
                  <IconButton edge="end" color="error" onClick={() => handleRemoveSuggestion(idx)} size="small">
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setSuggestionsModalOpen(false); setSuggestingFor(null); }} color="inherit">Cancelar</Button>
          <Button
            onClick={handleAcceptAllSuggestions}
            color="primary"
            variant="contained"
            disabled={loading || suggestions.length === 0}
            startIcon={loading ? <CircularProgress size={16} /> : <CheckIcon />}
          >
            Aceptar Todas
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={toast.open} autoHideDuration={4000} onClose={() => setToast({ ...toast, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setToast({ ...toast, open: false })} severity={toast.severity} sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
