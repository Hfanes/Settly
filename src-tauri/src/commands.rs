use std::fs;
use std::path::{Path, PathBuf};
use tauri::State;
use crate::AppState;
use std::sync::MutexGuard;
use serde_json::json;
use serde::Serialize;
use std::time::{SystemTime, UNIX_EPOCH};

#[derive(Serialize)]
pub struct FileInfo {
    name: String,
    size: u64,
    modified: u64, 
}


#[tauri::command]
pub fn set_folder_path(state: State<AppState>, folder: String) -> Result<(), String> {
    {
        let mut folder_lock: MutexGuard<Option<String>> = state.folder.lock().unwrap();
        *folder_lock = Some(folder.clone());
    }

    state.store.set("folder_path", json!(folder));
    state.store.save().map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
pub fn get_folder_path(state: State<AppState>) -> Option<String> {
  state.folder.lock().unwrap().clone()
}

#[tauri::command]
pub fn copy_file_from_state(state: State<AppState>, file_path: String) -> Result<(), String> {
    let folder = state.folder.lock().unwrap();
    let folder = folder.clone().ok_or("No folder set")?;

    let src = PathBuf::from(file_path.clone());
    let file_name = src.file_name().ok_or("Invalid file name")?;
    let dest = Path::new(&folder).join(file_name);

    fs::copy(&src, &dest).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub fn list_files_in_folder(state: State<AppState>) -> Result<Vec<FileInfo>, String> {
    let folder = state.folder.lock().unwrap();
    let folder_path = folder.clone().ok_or("No folder set")?;

    let entries = fs::read_dir(&folder_path).map_err(|e| e.to_string())?;

    let mut files = Vec::new();

    for entry in entries {
        let entry = entry.map_err(|e| e.to_string())?;
        let path = entry.path();

        if path.is_file() {
            let metadata = fs::metadata(&path).map_err(|e| e.to_string())?;
            let modified = metadata.modified().unwrap_or(SystemTime::UNIX_EPOCH);
            let duration = modified.duration_since(UNIX_EPOCH).unwrap_or_default();

            files.push(FileInfo {
                name: path
                    .file_name()
                    .and_then(|n| n.to_str())
                    .unwrap_or_default()
                    .to_string(),
                size: metadata.len(),
                modified: duration.as_secs(),
            });
        }
    }

    Ok(files)
}

