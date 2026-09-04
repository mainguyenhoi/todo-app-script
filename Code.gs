const TASKS_KEY = 'tasks';

/** Serves the Todo web application. */
function doGet() {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Việc cần làm')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/** Returns the signed-in user's saved tasks. */
function getTasks() {
  return readTasks_();
}

/** Replaces the user's tasks after validating their shape. */
function saveTasks(tasks) {
  if (!Array.isArray(tasks)) throw new Error('Dữ liệu công việc không hợp lệ.');
  if (tasks.length > 500) throw new Error('Chỉ có thể lưu tối đa 500 công việc.');

  const cleanTasks = tasks.map(function(task) {
    const title = String(task.title || '').trim().slice(0, 200);
    if (!title) throw new Error('Tên công việc không được để trống.');
    return {
      id: String(task.id || Utilities.getUuid()),
      title: title,
      completed: Boolean(task.completed),
      createdAt: Number(task.createdAt) || Date.now()
    };
  });

  PropertiesService.getUserProperties().setProperty(TASKS_KEY, JSON.stringify(cleanTasks));
  return cleanTasks;
}

function readTasks_() {
  const saved = PropertiesService.getUserProperties().getProperty(TASKS_KEY);
  if (!saved) return [];
  try {
    return JSON.parse(saved);
  } catch (error) {
    console.error('Could not parse saved tasks: ' + error);
    return [];
  }
}
