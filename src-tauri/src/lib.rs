// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn calculate(content: Vec<f64>, operations: Vec<char>) -> f64 {
    let mut result = content[0];
    for (index, operation) in operations.iter().enumerate() {
        match operation {
            '+' => result += content[index + 1],
            '-' => result -= content[index + 1],
            '*' => result *= content[index + 1],
            '/' => result /= content[index + 1],
            _ => (),
        }
    }
    result
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![calculate])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
