const TASKS_KEY = 'tasks';

/** Serves the Todo web application. */
function doGet() {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Timeline ảnh')
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

/** Lists folders at the current navigation level in the signed-in user's Drive. */
function getDriveFolders(parentId) {
  const folder = parentId ? DriveApp.getFolderById(parentId) : DriveApp.getRootFolder();
  const iterator = folder.getFolders();
  const folders = [];
  while (iterator.hasNext()) {
    const child = iterator.next();
    folders.push({ id: child.getId(), name: child.getName() });
  }
  return folders.sort(function(a, b) { return a.name.localeCompare(b.name, 'vi'); });
}

/** Returns image files in a folder, oldest first, for a visual timeline. */
function getFolderImages(folderId) {
  if (!folderId) throw new Error('Hãy chọn một folder ảnh.');
  const files = DriveApp.getFolderById(folderId).getFiles();
  const images = [];
  while (files.hasNext()) {
    const file = files.next();
    if (file.getMimeType().indexOf('image/') !== 0) continue;
    images.push({
      id: file.getId(), name: file.getName(), createdAt: file.getDateCreated().getTime(),
      thumbnailUrl: 'https://drive.google.com/thumbnail?id=' + file.getId() + '&sz=w1200'
    });
  }
  return images.sort(function(a, b) { return a.createdAt - b.createdAt; });
}
