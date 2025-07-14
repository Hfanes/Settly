use std::fs;
use std::path::{Path, PathBuf};
use tauri::State;
use crate::AppState;
use std::sync::MutexGuard;
use serde_json::json;
use tauri::AppHandle;


#[tauri::command]
pub fn restart_app(app_handle: AppHandle) {
    // Relaunch the app
    app_handle.restart();
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

