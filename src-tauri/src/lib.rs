mod commands;
use std::sync::Mutex;
use tauri::Manager;
use tauri::Wry;
use tauri_plugin_store::StoreExt;
pub struct AppState {
    pub folder: Mutex<Option<String>>,
    pub store: std::sync::Arc<tauri_plugin_store::Store<Wry>>
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::new().build())
        .setup(|app| {
            // Create or load the store (and keep it in the resource table)
            let store = app.store("store.json")?;

            // Load folder path from store (if exists)
            let folder_path = store
                .get("folder_path")
                .and_then(|v| v.as_str().map(|s| s.to_string()));

            // Manage app state with in-memory folder cache and persistent store
            app.manage(AppState {
                folder: Mutex::new(folder_path),
                store,
            });

            Ok(())
        })
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            commands::set_folder_path,
            commands::get_folder_path,
            commands::copy_file_from_state,
            commands::list_files_in_folder
        ])         
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
