import os

def has_jsx_code(file_path):
    """Verifica se o arquivo .ts contém código JSX."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            return any(tag in content for tag in ['<div', '<span', '<button', '<h1', '<p', '<input', '<img', '<section', '<header', '<footer'])
    except:
        return False

def rename_ts_to_tsx(root_dir):
    """Renomeia arquivos .ts para .tsx se contiverem JSX."""
    for dirpath, _, filenames in os.walk(root_dir):
        for filename in filenames:
            if filename.endswith('.ts') and not filename.endswith('.d.ts'):
                file_path = os.path.join(dirpath, filename)
                if has_jsx_code(file_path):
                    new_path = file_path[:-3] + '.tsx'
                    os.rename(file_path, new_path)
                    print(f"Renomeado: {file_path} -> {new_path}")

if __name__ == "__main__":
    pasta_projeto = os.path.dirname(os.path.abspath(__file__))  # Pasta onde o script está
    rename_ts_to_tsx(pasta_projeto)
    print("\n✅ Conversão concluída!")
