---

## 📗 Módulo 21: Trabajar con JSON en Python

### 21.1 Conceptos Fundamentales (El "Por Qué")

#### **Analogía: Caja vs. Carta**
- **Diccionario Python**: Es una caja con objetos en tu habitación (memoria RAM)
- **JSON**: Es la carta escrita en papel estandarizado que envías por correo (texto para guardar/enviar)

#### **Importante: JSON NO es Python**
Aunque se parecen, JSON es un **formato de texto universal**. Otros lenguajes (JavaScript, Java, PHP) lo entienden.

---

### 21.2 Los 4 Comandos Esenciales del Módulo `json`

| Comando | Qué hace | Uso típico |
|---------|----------|------------|
| `json.dumps()` | **D**ict → **S**tring | Convertir para enviar por API |
| `json.loads()` | **S**tring → **D**ict | Recibir datos de API |
| `json.dump()` | **D**ict → **F**ile | Guardar archivo |
| `json.load()` | **F**ile → **D**ict | Leer archivo |

**Mnemotecnia**: La "s" al final es de **s**tring (texto), sin "s" es de **f**ile (archivo).

---

### 21.3 Ejemplos Prácticos Paso a Paso

#### **🔵 Ejemplo 1: Python → JSON String (Serialización)**

```python
import json

# Nuestro diccionario Python
producto = {
    "id": 101,
    "nombre": "Laptop Gamer",
    "precio": 1299.99,
    "en_stock": True,
    "caracteristicas": ["16GB RAM", "RTX 4060", "SSD 1TB"]
}

# Convertir a JSON string
json_texto = json.dumps(producto, indent=4)

print("=== Diccionario Python (tipo:", type(producto), ") ===")
print(producto)

print("\n=== JSON String (tipo:", type(json_texto), ") ===")
print(json_texto)

# Verificación: el JSON es un texto plano
print("\n¿Es string?", isinstance(json_texto, str))  # True
```

**Salida:**
```
=== Diccionario Python (tipo: <class 'dict'>) ===
{'id': 101, 'nombre': 'Laptop Gamer', 'precio': 1299.99, 'en_stock': True, 'caracteristicas': ['16GB RAM', 'RTX 4060', 'SSD 1TB']}

=== JSON String (tipo: <class 'str'>) ===
{
    "id": 101,
    "nombre": "Laptop Gamer",
    "precio": 1299.99,
    "en_stock": true,
    "caracteristicas": [
        "16GB RAM",
        "RTX 4060",
        "SSD 1TB"
    ]
}
```

**Fíjate en las diferencias:**
- `True` → `true`
- Comillas simples desaparecen
- Espaciado perfecto

---

#### **🟢 Ejemplo 2: JSON String → Python (Deserialización)**

```python
import json

# Simulamos recibir esto de una API o archivo
json_de_api = '''
{
    "nombre": "Ana García",
    "edad": 28,
    "desarrollador": true,
    "lenguajes": ["Python", "JavaScript", "Go"],
    "sueldo": null
}
'''

# Convertir a diccionario Python
persona = json.loads(json_de_api)

print("=== JSON String recibido ===")
print(json_de_api)

print("\n=== Diccionario Python convertido ===")
print(persona)
print("Tipo:", type(persona))

# Acceder a datos
print(f"\nNombre: {persona['nombre']}")
print(f"Edad: {persona['edad']}")
print(f"Lenguajes: {', '.join(persona['lenguajes'])}")
```

**Salida:**
```
=== JSON String recibido ===
{
    "nombre": "Ana García",
    "edad": 28,
    "desarrollador": true,
    "lenguajes": ["Python", "JavaScript", "Go"],
    "sueldo": null
}

=== Diccionario Python convertido ===
{'nombre': 'Ana García', 'edad': 28, 'desarrollador': True, 'lenguajes': ['Python', 'JavaScript', 'Go'], 'sueldo': None}
Nombre: Ana García
Edad: 28
Lenguajes: Python, JavaScript, Go
```

**Cambios clave:**
- `true` → `True`
- `null` → `None`

---

#### **🟡 Ejemplo 3: Guardar en Archivo JSON**

```python
import json

# Datos de configuración
config = {
    "app_name": "MiApp",
    "version": "2.5.1",
    "debug": False,
    "database": {
        "host": "localhost",
        "port": 5432,
        "user": "admin"
    }
}

# Guardar en archivo (IMPORTANTE: encoding='utf-8')
with open("configuracion.json", "w", encoding="utf-8") as archivo:
    json.dump(config, archivo, indent=2, ensure_ascii=False)

print("✅ Archivo 'configuracion.json' guardado correctamente")

# Leer el archivo para verificar
with open("configuracion.json", "r", encoding="utf-8") as archivo:
    contenido = archivo.read()

print("\n=== Contenido del archivo ===")
print(contenido)
```

**Qué hace cada parámetro:**
- `indent=2`: Sangría de 2 espacios (mejora legibilidad)
- `ensure_ascii=False`: Mantiene caracteres especiales (ñ, tildes, emojis)
- `encoding='utf-8'`: Soporte para todos los caracteres

---

#### **🔴 Ejemplo 4: Leer desde Archivo JSON**

```python
import json

# Primero, creemos un archivo JSON de ejemplo
datos_ejemplo = {
    "titulo": "Python Avanzado",
    "autor": "Carlos López",
    "paginas": 450,
    "disponible": True
}

with open("libro.json", "w", encoding="utf-8") as f:
    json.dump(datos_ejemplo, f, ensure_ascii=False)

# Ahora lo leemos
with open("libro.json", "r", encoding="utf-8") as f:
    libro = json.load(f)

print("=== Libro leído ===")
print(f"Título: {libro['titulo']}")
print(f"Autor: {libro['autor']}")
print(f"Páginas: {libro['paginas']}")
print(f"Disponible: {'Sí' if libro['disponible'] else 'No'}")
```

---

### 21.4 Caso Especial: Convertir Texto a JSON

#### **📝 Ejemplo: De Párrafo a JSON Estructurado**

```python
import json

# Supongamos que tienes un texto desestructurado
texto_desestructurado = """
TITULO: Los Secretos de Python
AUTOR: María Fernández

Este es un párrafo extenso que habla sobre los beneficios 
de aprender Python. Incluye ejemplos prácticos y tips 
avanzados para desarrolladores.
"""

# Paso 1: Extraer datos (simulamos parsing)
def texto_a_json(texto):
    lines = texto.strip().split('\n')
    
    # Extraer título
    titulo_line = [l for l in lines if l.startswith("TITULO:")][0]
    titulo = titulo_line.replace("TITULO:", "").strip()
    
    # Extraer autor
    autor_line = [l for l in lines if l.startswith("AUTOR:")][0]
    autor = autor_line.replace("AUTOR:", "").strip()
    
    # Extraer párrafo (todo después de la línea vacía)
    parrafo_index = lines.index("") + 1
    parrafo = " ".join(lines[parrafo_index:]).strip()
    
    # Crear estructura JSON
    estructura = {
        "documento": {
            "titulo": titulo,
            "autor": autor,
            "contenido": {
                "parrafo": parrafo,
                "metadata": {
                    "longitud": len(parrafo),
                    "palabras": len(parrafo.split())
                }
            },
            "fecha_creacion": "2024-01-10"
        }
    }
    
    return json.dumps(estructura, indent=2, ensure_ascii=False)

# Convertir
json_resultado = texto_a_json(texto_desestructurado)

print("=== JSON Final ===")
print(json_resultado)

# Guardar en archivo
with open("documento.json", "w", encoding="utf-8") as f:
    f.write(json_resultado)

print("\n✅ Archivo guardado como 'documento.json'")
```

**Salida:**
```json
{
  "documento": {
    "titulo": "Los Secretos de Python",
    "autor": "María Fernández",
    "contenido": {
      "parrafo": "Este es un párrafo extenso que habla sobre los beneficios de aprender Python. Incluye ejemplos prácticos y tips avanzados para desarrolladores.",
      "metadata": {
        "longitud": 138,
        "palabras": 16
      }
    },
    "fecha_creacion": "2024-01-10"
  }
}
```

---

### 21.5 Manejo de Tipos de Datos Avanzados

#### **Fechas y Objetos Especiales**

```python
import json
from datetime import datetime

# Python no puede convertir fechas directamente a JSON
evento = {
    "nombre": "Conferencia Python",
    "fecha": datetime.now(),  # ESTO FALLARÁ
    "participantes": 150
}

# SOLUCIÓN: Convertir fechas a string
evento["fecha"] = datetime.now().isoformat()
evento["hora"] = datetime.now().strftime("%H:%M:%S")

json_evento = json.dumps(evento, indent=2)
print(json_evento)
```

---

### 21.6 Errores Comunes y Soluciones

#### **❌ Error 1: Comillas simples en JSON**
```python
# MAL - JSON inválido
json_invalido = "{'nombre': 'Juan'}"  # Comillas simples
# json.loads(json_invalido)  # ❌ JSONDecodeError

# BIEN
json_valido = '{"nombre": "Juan"}'
datos = json.loads(json_valido)
```

#### **❌ Error 2: Tipos no soportados**
```python
# Esto FALLA porque set no es JSON-serializable
# datos = {"tags": {1, 2, 3}}  # set
# json.dumps(datos)  # ❌ TypeError

# SOLUCIÓN: Convertir a lista
datos = {"tags": [1, 2, 3]}
json.dumps(datos)  # ✅ OK
```

#### **❌ Error 3: Encoding incorrecto**
```python
# Al leer archivos con ñ o tildes, SIEMPRE usa encoding='utf-8'
with open("archivo.json", "r", encoding="utf-8") as f:  # ✅ Correcto
    datos = json.load(f)
```

---

### 21.7 Resumen Visual: Flujo de Trabajo

```
┌─────────────────────────┐
│  Diccionario Python     │  ← Trabajas aquí en tu código
│  (RAM, objetos reales)  │
└──────────┬──────────────┘
           │
           │ json.dumps()
           ▼
┌─────────────────────────┐
│   JSON String/Texto     │  ← Para enviar por internet
└──────────┬──────────────┘
           │
           │ json.loads()
           ▼
┌─────────────────────────┐
│  Diccionario Python     │
│    (de vuelta a RAM)    │
└──────────┬──────────────┘
           │
           │ json.dump()
           ▼
┌─────────────────────────┐
│    Archivo .json        │  ← Para guardar en disco
└──────────┬──────────────┘
           │
           │ json.load()
           ▼
┌─────────────────────────┐
│  Diccionario Python     │
└─────────────────────────┘
```

---

### 21.8 Ejercicio Práctico Final

```python
import json

# Crea tu propio JSON de un perfil de usuario
perfil = {
    "usuario": "coder_python",
    "nombre_completo": "Ana María",
    "edad": 26,
    "habilidades": {
        "lenguajes": ["Python", "SQL", "HTML"],
        "nivel": "intermedio",
        "certificaciones": ["AWS", "Scrum"]
    },
    "activo": True,
    "ultimo_login": "2024-01-10T15:30:00"
}

# 1. Convierte a JSON string
json_perfil = json.dumps(perfil, indent=2, ensure_ascii=False)
print(json_perfil)

# 2. Guarda en archivo
with open("mi_perfil.json", "w", encoding="utf-8") as f:
    f.write(json_perfil)

# 3. Lee y modifica
with open("mi_perfil.json", "r", encoding="utf-8") as f:
    datos = json.load(f)

datos["edad"] = 27  # Cumplí años!
datos["habilidades"]["nivel"] = "avanzado"

# 4. Guarda de nuevo
with open("mi_perfil_actualizado.json", "w", encoding="utf-8") as f:
    json.dump(datos, f, indent=2, ensure_ascii=False)

print("\n✅ Perfil actualizado y guardado")
```

---

### 21.9 Guía de Supervivencia Rápida

```python
# Siempre que necesites:
# Guardar datos → json.dump(objeto, archivo)
# Cargar datos → json.load(archivo)
# Enviar datos → json.dumps(objeto)
# Recibir datos → json.loads(string)

# Y recuerda:
with open("archivo.json", "w", encoding="utf-8") as f:
    json.dump(tus_datos, f, indent=2, ensure_ascii=False)
```

---