# Python para IA - Manual Completo para Principiantes


## 📑 Índice Rápido

- [Módulo 0: Configuración del Entorno](#módulo-0-configuración-del-entorno-de-trabajo)
  - [0.1 Creación y Activación de Entornos Virtuales](#01-creación-y-activación-de-entornos-virtuales)
  - [0.2 Gestión de Dependencias con requirements.txt](#02-gestión-de-dependencias-con-requirementstxt)
  - [0.3 Comandos Útiles del Entorno](#03-comandos-útiles-del-entorno)

- [Módulo 1: Fundamentos de Python desde Cero](#módulo-1-fundamentos-de-python-desde-cero)
  - [1.1 Variables y Tipos de Datos](#11-variables-y-tipos-de-datos)
  - [1.2 Operadores Aritméticos y de Comparación](#12-operadores-aritméticos-y-de-comparación)
  - [1.3 Entrada y Salida por Consola](#13-entrada-y-salida-por-consola)

- [Módulo 2: Colecciones de Datos](#módulo-2-colecciones-de-datos---listas-y-diccionarios)
  - [2.1 Listas](#21-listas---la-estructura-más-versátil)
  - [2.2 Diccionarios](#22-diccionarios---almacén-clave-valor)
  - [2.3 Tuplas](#23-tuplas---colecciones-inmutables)
  - [2.4 Sets](#24-sets---colecciones-de-elementos-únicos)

- [Módulo 3: Control de Flujo](#módulo-3-control-de-flujo---tomando-decisiones)
  - [3.1 Condicionales if-elif-else](#31-condicionales-if-elif-else)
  - [3.2 El Bucle for](#32-el-bucle-for---iteración-definida)
  - [3.3 El Bucle while](#33-el-bucle-while---iteración-condicional)
  - [3.4 Control de Flujo: break, continue, else](#34-control-de-flujo-break-continue-else)

- [Módulo 4: Funciones](#módulo-4-funciones---reutilizando-código)
  - [4.1 Definición y Sintaxis Básica](#41-definición-y-sintaxis-básica)
  - [4.2 Parámetros y Argumentos](#42-parámetros-y-argumentos)
  - [4.3 Args y Kwargs](#43-args-y-kwargs---parámetros-dinámicos)
  - [4.4 Return](#44-return---devolviendo-valores)
  - [4.5 Lambda Functions](#45-lambda-functions---funciones-anónimas)
  - [4.6 Alcance de Variables](#46-alcance-de-variables---scope)
  - [4.7 Decoradores](#47-decoradores---modificando-comportamiento)
  - [4.8 Recursividad](#48-recursividad---funciones-que-se-llaman-a-sí-mismas)

- [Módulo 5: Programación Orientada a Objetos](#módulo-5-programación-orientada-a-objetos-oop)
  - [5.1 Clases y Objetos](#51-clases-y-objetos---el-molde-y-la-instancia)
  - [5.2 Self](#52-self---el-objeto-en-sí-mismo)
  - [5.3 Encapsulamiento](#53-encapsulamiento---protegiendo-datos)
  - [5.4 Getters y Setters con @property](#54-getters-y-setters-con-property)
  - [5.5 Herencia](#55-herencia---reutilizando-código)
  - [5.6 Polimorfismo](#56-polimorfismo---mismo-nombre-diferente-comportamiento)
  - [5.7 @classmethod y @staticmethod](#57-classmethod-y-staticmethod)
  - [5.8 Métodos Especiales](#58-métodos-especiales-dunder-methods)

- [Módulo 6: Manejo de Archivos](#módulo-6-manejo-de-archivos-con-pathlib)
  - [6.1 pathlib](#61-pathlib---la-forma-moderna-de-trabajar-con-rutas)
  - [6.2 Crear y Eliminar Carpetas](#62-crear-y-eliminar-carpetas)
  - [6.3 Leer Archivos](#63-leer-archivos-de-texto)
  - [6.4 Escribir Archivos](#64-escribir-archivos-de-texto)
  - [6.5 Archivos Binarios](#65-manejo-de-archivos-binarios)
  - [6.6 Enumerar y Buscar](#66-enumerar-y-buscar-archivos)
  - [6.7 Manejo Defensivo de Errores](#67-manejo-defensivo-de-errores)

- [Módulo 7: Librerías para IA](#módulo-7-librerías-esenciales-para-ia)
  - [7.1 NumPy](#71-numpy---arrays-numéricos-eficientes)
  - [7.2 Pandas](#72-pandas---manipulación-de-datos-tabulares)
  - [7.3 Matplotlib](#73-matplotlib---gráficos-básicos)
  - [7.4 Seaborn](#74-seaborn---estadística-visual-avanzada)

- [Módulo 8: Manejo de Errores](#módulo-8-manejo-de-errores-y-excepciones)
  - [8.1 try/except](#81-tryexcept---capturando-errores)
  - [8.2 else y finally](#82-else-y-finally)
  - [8.3 Excepciones Personalizadas](#83-excepciones-personalizadas)
  - [8.4 Traceback](#84-traceback---información-completa-del-error)
  - [8.5 El Contexto with](#85-el-contexto-with---garantía-de-cierre)

- [Módulo 9: Proyecto Mini-Bank](#módulo-9-proyecto-integrado---mini-bank)
  - [9.1 Estructura](#91-estructura-del-proyecto)
  - [9.2 errores.py](#92-archivo-errorespy---excepciones-personalizadas)
  - [9.3 utils.py](#93-archivo-utilspy---funciones-auxiliares)
  - [9.4 cuenta.py](#94-archivo-cuentapy---clase-cuentabancaria)
  - [9.5 cliente.py](#95-archivo-clientepy---agregación)
  - [9.6 main.py](#96-archivo-mainpy---orquestación)

- [Módulo 10: Mejores Prácticas](#módulo-10-mejores-prácticas-y-consejos-finales)
  - [10.1 Convenciones](#101-convenciones-de-nomenclatura)
  - [10.2 Type Hints](#102-type-hints---anotaciones-de-tipo)
  - [10.3 DRY](#103-dry---dont-repeat-yourself)
  - [10.4 Documentación](#104-documentación---docstrings)
  - [10.5 Debug](#105-breakpoints-y-debug)
  - [10.6 Checklist](#106-checklist-de-verificación-final)


- [Módulo 11: Control de Flujo Avanzado](#python-control-de-flujo-avanzado---null-safety-y-pattern-matching)
  - [1️⃣ Pattern Matching](#1️⃣-¿existe-switchcase-en-python)
  - [2️⃣ Operador NOT](#2️⃣-¿cómo-se-hace--not-en-python)
  - [3️⃣ not in vs is not](#3️⃣-not-in-vs-is-not---la-distinción-crítica)
  - [4️⃣ Truthy/Falsy](#4️⃣-truthyfalsy---la-magia-y-el-peligro-de-python)
  - [5️⃣ Raise](#5️⃣-usando-raise---lanzando-excepciones)
  - [6️⃣ Proyecto Práctico](#6️⃣-proyecto-práctico-validador-de-configuración)


- [Tabla de Referencia Rápida](#tabla-de-referencia-rápida)
- [Próximos Pasos](#próximos-pasos-en-tu-viaje-python)



## 📦 Módulo 0: Configuración del Entorno de Trabajo

Antes de escribir tu primera línea de código, necesitas entender cómo aislar tu proyecto. Python permite instalar paquetes globalmente, pero esto causa conflictos cuando diferentes proyectos necesitan versiones distintas de la misma librería. La solución son **entornos virtuales**.

### 0.1 Creación y Activación de Entornos Virtuales

Un entorno virtual es una carpeta que contiene una instalación completa de Python aislada del sistema. Todo lo que instales dentro queda confinado ahí.

```bash
# Crear entorno virtual (recomendado: .venv como nombre)
# El nombre .venv es convención moderna y compatible con IDEs
python -m venv .venv

# Activar en Windows
.venv\Scripts\activate

# Activar en Linux/Mac
source .venv/bin/activate

# Verificar que está activo: verás (.venv) al inicio del prompt
# Ahora todo pip install va al entorno, no al sistema
```

### 0.2 Gestión de Dependencias con requirements.txt

Cuando compartes tu proyecto, otros necesitan saber qué librerías usar. El archivo `requirements.txt` es el estándar.

```bash
# Instalar paquetes dentro del entorno activado
pip install numpy pandas matplotlib seaborn

# Generar requirements.txt con versiones exactas
pip freeze > requirements.txt

# En otra máquina o para otro usuario:
python -m venv .venv
source .venv/bin/activate  # o .venv\Scripts\activate
pip install -r requirements.txt
```

**Ejemplo de requirements.txt:**
```
numpy==1.24.3
pandas==2.1.0
matplotlib==3.7.1
seaborn==0.12.2
```

### 0.3 Comandos Útiles del Entorno

```python
# Ejecutar Python con el intérprete del venv sin activarlo
.venv/bin/python mi_script.py  # Linux/Mac
.venv\Scripts\python.exe mi_script.py  # Windows

# Instalar paquete sin activar el entorno
.venv/bin/python -m pip install paquete

# Ver paquetes instalados
pip list

# Actualizar pip
pip install --upgrade pip
```

---

## 📘 Módulo 1: Fundamentos de Python desde Cero

### 1.1 Variables y Tipos de Datos

En Python, **no necesitas declarar el tipo de variable**. El intérprete infiere el tipo automáticamente en tiempo de ejecución. Esto se llama **tipado dinámico**.

```python
# Enteros (int): números sin decimales
edad = 25
cantidad = -10

# Flotantes (float): números con decimales
precio = 19.99
pi = 3.14159

# Strings (str): texto entre comillas simples o dobles
nombre = "Ana"
apellido = 'García'

# Booleanos (bool): True o False
es_estudiante = True
tiene_descuento = False

# None: valor especial que representa "nada"
valor_nulo = None

# Verificar tipo de dato
print(type(edad))      # <class 'int'>
print(type(precio))    # <class 'float'>
print(type(nombre))    # <class 'str'>
```

**Conversión de tipos (casting):**
```python
# De string a número
texto = "100"
numero = int(texto)  # 100

# De número a string
edad = 30
texto_edad = str(edad)  # "30"

# De flotante a entero (pierde decimales)
precio = 19.99
entero = int(precio)  # 19
```

### 1.2 Operadores Aritméticos y de Comparación

```python
# Operadores básicos
a = 10
b = 3

print(a + b)   # 13 (suma)
print(a - b)   # 7 (resta)
print(a * b)   # 30 (multiplicación)
print(a / b)   # 3.333... (división real)
print(a // b)  # 3 (división entera)
print(a % b)   # 1 (módulo: resto de división)
print(a ** b)  # 1000 (potencia: 10^3)

# Operadores de comparación (devuelven True/False)
print(a > b)   # True
print(a < b)   # False
print(a == b)  # False (igualdad)
print(a != b)  # True (desigualdad)
print(a >= b)  # True (mayor o igual)
print(a <= b)  # False (menor o igual)
```

**Operadores lógicos:**
```python
x = True
y = False

print(x and y)  # False (AND)
print(x or y)   # True (OR)
print(not x)    # False (NOT)
```

**Operadores de pertenencia:**
```python
lista = [1, 2, 3]
print(2 in lista)     # True
print(5 not in lista) # True
```

### 1.3 Entrada y Salida por Consola

La función `input()` lee del teclado y siempre devuelve un **string**. Para otros tipos, necesitas conversión.

```python
# Leer texto
nombre = input("¿Cómo te llamas?: ")
print(f"Encantado, {nombre}")

# Leer número (con conversión)
edad = int(input("¿Cuántos años tienes?: "))
print(f"El año que cumples {edad + 1}")

# Leer decimal
altura = float(input("¿Cuál es tu altura en metros?: "))
print(f"Altura: {altura}m")

# Leer múltiples valores en una línea
# Usuario escribe: "10 20 30"
numeros = input("Ingresa tres números separados por espacio: ")
lista_numeros = [int(x) for x in numeros.split()]
print(f"Números: {lista_numeros}")
```

**Validación robusta con try/except:**
```python
while True:
    try:
        edad = int(input("Edad (número positivo): "))
        if edad < 0:
            raise ValueError
        break
    except ValueError:
        print("Error: debes ingresar un número positivo válido")

print(f"Edad válida: {edad}")
```

---

## 📗 Módulo 2: Colecciones de Datos - Listas y Diccionarios

### 2.1 Listas - La Estructura Más Versátil

Las listas son **colecciones ordenadas y mutables**. Pueden contener cualquier tipo de dato y cambiar de tamaño dinámicamente.

```python
# Crear listas vacías o con elementos
lista_vacia = []
frutas = ["manzana", "banana", "cereza"]
mixta = ["texto", 42, True, 3.14]  # Diferentes tipos en la misma lista

# Acceso por índice (empieza en 0)
print(frutas[0])    # "manzana" (primer elemento)
print(frutas[-1])   # "cereza" (último elemento)
print(frutas[-2])   # "banana" (penúltimo)

# Slicing (rebanado): obtener sub-listas
print(frutas[0:2])  # ["manzana", "banana"] (índices 0 y 1)
print(frutas[1:])   # ["banana", "cereza"] (desde índice 1 hasta el final)
print(frutas[:2])   # ["manzana", "banana"] (desde inicio hasta índice 1)
print(frutas[::2])  # ["manzana", "cereza"] (cada 2 elementos)
```

**Modificar listas:**
```python
# Reemplazar elemento
frutas[1] = "piña"
print(frutas)  # ["manzana", "piña", "cereza"]

# Agregar elementos
frutas.append("naranja")        # Al final
frutas.insert(0, "pera")       # En posición específica
print(frutas)  # ["pera", "manzana", "piña", "cereza", "naranja"]

# Eliminar elementos
frutas.remove("piña")          # Por valor (elimina primera ocurrencia)
borrado = frutas.pop()         # Elimina y devuelve el último
borrado_pos = frutas.pop(0)   # Elimina y devuelve por índice
del frutas[1]                  # Elimina por índice sin devolver
```

**Métodos útiles de listas:**
```python
numeros = [3, 1, 4, 1, 5, 9, 2, 6]

# Información
print(len(numeros))         # 8 (cantidad de elementos)
print(numeros.count(1))     # 2 (cuántas veces aparece el 1)
print(numeros.index(4))     # 2 (índice del primer 4 encontrado)

# Ordenar
numeros.sort()              # Ordena la lista original (in-place)
print(numeros)              # [1, 1, 2, 3, 4, 5, 6, 9]

numeros.sort(reverse=True) # Orden descendente
print(numeros)              # [9, 6, 5, 4, 3, 2, 1, 1]

numeros.reverse()           # Invierte el orden (in-place)
print(numeros)              # [1, 1, 2, 3, 4, 5, 6, 9]

# Copiar (importante: lista = otra_lista crea referencia, no copia)
original = [1, 2, 3]
copia = original.copy()     # Copia profunda
copia.append(4)
print(original) # [1, 2, 3] (no se modificó)
print(copia)    # [1, 2, 3, 4]

# Vaciar lista
numeros.clear()             # []
```

**Iterar listas:**
```python
frutas = ["manzana", "banana", "cereza"]

# Iterar valores
for fruta in frutas:
    print(f"Fruta: {fruta}")

# Iterar con índice (enumerate)
for i, fruta in enumerate(frutas):
    print(f"Índice {i}: {fruta}")

# Iterar con índice manual
for i in range(len(frutas)):
    print(f"Índice {i}: {frutas[i]}")

# Comprehensions (listas por comprensión)
cuadrados = [x**2 for x in range(5)]
print(cuadrados)  # [0, 1, 4, 9, 16]

# Comprehension con condición
pares = [x for x in range(10) if x % 2 == 0]
print(pares)  # [0, 2, 4, 6, 8]
```

**Verificar pertenencia:**
```python
print("manzana" in frutas)     # True
print("uva" not in frutas)    # True

# Listas vacías son falsy
lista_vacia = []
if not lista_vacia:
    print("La lista está vacía")
```

### 2.2 Diccionarios - Almacén Clave-Valor

Los diccionarios son **colecciones no ordenadas** que almacenan pares clave-valor. Las claves deben ser **inmutables** (strings, números, tuplas) y únicas.

```python
# Crear diccionarios
persona = {
    "nombre": "Carlos",
    "edad": 30,
    "ciudad": "Madrid"
}

# Diferentes formas de crear
vacio = {}
con_valores = dict(nombre="Ana", edad=25)
desde_lista = dict([("a", 1), ("b", 2)])

# Acceso por clave
print(persona["nombre"])          # "Carlos"
print(persona["edad"])            # 30

# Acceso seguro con get() (evita KeyError)
print(persona.get("altura", 0))   # 0 (valor por defecto si no existe)
print(persona.get("nombre"))      # "Carlos"

# Verificar existencia de clave
if "edad" in persona:
    print(f"La edad es {persona['edad']}")

if "email" not in persona:
    print("No hay email registrado")
```

**Modificar diccionarios:**
```python
# Agregar o actualizar
persona["profesion"] = "Ingeniero"  # Agrega nueva clave
persona["edad"] = 31                # Actualiza valor existente

# Actualizar múltiples valores
persona.update({"edad": 32, "ciudad": "Barcelona"})

# Eliminar elementos
del persona["ciudad"]               # Por clave (KeyError si no existe)
edad = persona.pop("edad")          # Elimina y devuelve valor
ultimo = persona.popitem()          # Elimina y devuelve (clave, valor) arbitrario
persona.clear()                     # Vacía el diccionario
```

**Métodos útiles:**
```python
persona = {"nombre": "Carlos", "edad": 30, "ciudad": "Madrid"}

# Obtener vistas
claves = persona.keys()        # dict_keys(['nombre', 'edad', 'ciudad'])
valores = persona.values()     # dict_values(['Carlos', 30, 'Madrid'])
items = persona.items()        # dict_items([('nombre', 'Carlos'), ...])

# Convertir a lista
lista_claves = list(persona.keys())  # ['nombre', 'edad', 'ciudad']

# Iterar
for clave in persona:
    print(f"{clave}: {persona[clave]}")

for clave, valor in persona.items():
    print(f"{clave} → {valor}")

# Tamaño
print(len(persona))  # 3
```

**Diccionarios anidados:**
```python
empresa = {
    "nombre": "TechCorp",
    "empleados": {
        "ana": {"edad": 25, "puesto": "Desarrolladora"},
        "luis": {"edad": 30, "puesto": "Gerente"}
    }
}

# Acceso a datos anidados
print(empresa["empleados"]["ana"]["edad"])  # 25
print(empresa["empleados"]["luis"]["puesto"])  # "Gerente"
```

### 2.3 Tuplas - Colecciones Inmutables

Las tuplas son **inmutables**: una vez creadas, **no se pueden modificar**. Son útiles para datos que no deben cambiar y como claves de diccionarios.

```python
# Crear tuplas
coordenadas = (3, 5)           # Con paréntesis
colores = "rojo", "verde", "azul"  # Sin paréntesis (empaquetado automático)
tupla_vacia = ()               # Vacía con paréntesis
tupla_un_elemento = (42,)      # OJO: necesita la coma

# Acceso (igual que listas)
print(coordenadas[0])          # 3
print(coordenadas[-1])         # 5

# No se puede modificar
# coordenadas[0] = 7  # ❌ TypeError: 'tuple' object does not support item assignment

# Métodos permitidos
print(len(coordenadas))        # 2
print(colores.count("rojo"))   # 1
print(colores.index("verde"))  # 1

# Iterar
for color in colores:
    print(color)

# Verificación
print("rojo" in colores)       # True
```

**Desempaquetado:**
```python
# Asignar múltiples variables a la vez
x, y = coordenadas
print(x, y)  # 3 5

# Intercambiar variables sin temporal
a = 1
b = 2
a, b = b, a
print(a, b)  # 2 1

# Funciones que retornan múltiples valores retornan tuplas
def dividir(a, b):
    return a // b, a % b  # Retorna tupla implícita

cociente, resto = dividir(10, 3)  # Desempaquetado
print(f"Cociente: {cociente}, Resto: {resto}")  # Cociente: 3, Resto: 1
```

### 2.4 Sets - Colecciones de Elementos Únicos

Los sets son **colecciones no ordenadas de elementos únicos**. Son ideales para eliminar duplicados y verificar membresía rápidamente.

```python
# Crear sets
numeros = {1, 2, 3, 4, 5}
frutas = set(["manzana", "banana"])  # Desde lista
vacio = set()  # ⚠️ set(), no {} (eso crea diccionario)

# Eliminar duplicados automáticamente
lista_con_dup = [1, 2, 2, 3, 3, 3]
unicos = set(lista_con_dup)  # {1, 2, 3}

# Agregar y eliminar
frutas.add("cereza")           # Agrega un elemento
frutas.remove("banana")        # Elimina (KeyError si no existe)
frutas.discard("uva")          # Elimina (sin error si no existe)

# Operaciones de conjuntos
conjunto_a = {1, 2, 3, 4}
conjunto_b = {3, 4, 5, 6}

print(conjunto_a | conjunto_b)  # Unión: {1, 2, 3, 4, 5, 6}
print(conjunto_a & conjunto_b)  # Intersección: {3, 4}
print(conjunto_a - conjunto_b)  # Diferencia: {1, 2}
print(conjunto_a ^ conjunto_b)  # Diferencia simétrica: {1, 2, 5, 6}

# Verificación rápida (más eficiente que listas)
if "manzana" in frutas:
    print("Fruta encontrada")
```

---

## 📙 Módulo 3: Control de Flujo - Tomando Decisiones

### 3.1 Condicionales if-elif-else

Las estructuras condicionales ejecutan código basado en condiciones booleanas.

```python
edad = 18

if edad < 13:
    print("Niño")
elif edad < 18:
    print("Adolescente")
elif edad < 65:
    print("Adulto")
else:
    print("Adulto mayor")

# Condiciones anidadas
puntuacion = 85
if puntuacion >= 60:
    if puntuacion >= 90:
        print("A")
    elif puntuacion >= 80:
        print("B")
    else:
        print("C")
else:
    print("F")

# Operador ternario (condición en una línea)
es_mayor = "Sí" if edad >= 18 else "No"
print(f"¿Es mayor de edad? {es_mayor}")
```

### 3.2 El Bucle for - Iteración Definida

El bucle `for` itera sobre cualquier secuencia: listas, tuplas, strings, rangos, etc.

```python
# Iterar sobre lista
frutas = ["manzana", "banana", "cereza"]
for fruta in frutas:
    print(f"Fruta: {fruta}")

# Iterar sobre string
for letra in "Python":
    print(letra)

# Usar range() para iterar un número de veces
# range(stop): desde 0 hasta stop-1
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

# range(start, stop): desde start hasta stop-1
for i in range(2, 6):
    print(i)  # 2, 3, 4, 5

# range(start, stop, step): con salto específico
for i in range(0, 10, 2):
    print(i)  # 0, 2, 4, 6, 8

# range inverso
for i in range(5, 0, -1):
    print(i)  # 5, 4, 3, 2, 1

# Iterar con índice y valor (enumerate)
for indice, fruta in enumerate(frutas):
    print(f"Posición {indice}: {fruta}")

# enumerate con inicio personalizado
for indice, fruta in enumerate(frutas, start=1):
    print(f"{indice}. {fruta}")  # 1. manzana, 2. banana...
```

**Uso avanzado de for:**
```python
# Iterar sobre diccionario
persona = {"nombre": "Carlos", "edad": 30}
for clave, valor in persona.items():
    print(f"{clave}: {valor}")

# for con zip para múltiples listas
nombres = ["Ana", "Luis", "Maria"]
edades = [25, 30, 28]
for nombre, edad in zip(nombres, edades):
    print(f"{nombre} tiene {edad} años")

# for con lista de comprensión
cuadrados = [x**2 for x in range(5)]
print(cuadrados)  # [0, 1, 4, 9, 16]

# for con condición en comprensión
pares = [x for x in range(10) if x % 2 == 0]
print(pares)  # [0, 2, 4, 6, 8]
```

### 3.3 El Bucle while - Iteración Condicional

El bucle `while` ejecuta mientras una condición sea verdadera. Es ideal para loops donde no sabes cuántas iteraciones necesitarás.

```python
# Básico: contador
contador = 0
while contador < 5:
    print(f"Contador: {contador}")
    contador += 1  # Importante: modificar la condición

# while con break (salida anticipada)
while True:
    respuesta = input("Escribe 'salir' para terminar: ")
    if respuesta.lower() == "salir":
        break
    print("Sigue dentro del loop")

# while con continue (saltar iteración)
numero = 0
while numero < 10:
    numero += 1
    if numero % 2 == 0:  # Si es par
        continue         # Salta a la siguiente iteración
    print(f"Número impar: {numero}")

# while con else (ejecuta si NO hubo break)
intentos = 0
while intentos < 3:
    password = input("Password: ")
    if password == "secreto":
        print("Acceso concedido")
        break
    intentos += 1
else:
    print("Número de intentos agotado")
```

### 3.4 Control de Flujo: break, continue, else

| Palabra | Función | Ejemplo |
|---------|---------|---------|
| `break` | Sale del bucle inmediatamente | `if x == 5: break` |
| `continue` | Salta a la siguiente iteración | `if x < 0: continue` |
| `else` (en loops) | Ejecuta si el loop NO terminó con break | `for x in lista: ... else: ...` |

```python
# Ejemplo completo con break y else
numeros = [1, 2, 3, 4, 5]
for n in numeros:
    if n == 3:
        break
    print(n)
else:
    print("Loop completado sin break")  # ESTO NO SE EJECUTA

# Ejemplo con continue
for n in numeros:
    if n == 3:
        continue
    print(n)  # Imprime 1, 2, 4, 5 (salta el 3)

# Ejemplo con else ejecutándose
for n in numeros:
    print(n)
else:
    print("Loop completado normalmente")  # SI SE EJECUTA
```

---

## 📙 Módulo 4: Funciones - Reutilizando Código

### 4.1 Definición y Sintaxis Básica

Una función es un bloque de código **nombrado y reutilizable** que realiza una tarea específica.

```python
def saludar():
    """Imprime un saludo simple."""
    print("¡Hola, mundo!")

# Llamar a la función
saludar()
saludar()  # Reutilizable sin reescribir código

# Función con parámetros
def saludar_persona(nombre):
    """Saluda a una persona específica."""
    print(f"¡Hola, {nombre}!")

saludar_persona("Ana")
saludar_persona("Luis")

# Función con múltiples parámetros
def presentar(nombre, edad, ciudad):
    """Presenta a una persona con detalles."""
    print(f"Nombre: {nombre}")
    print(f"Edad: {edad}")
    print(f"Ciudad: {ciudad}")

presentar("Carlos", 30, "Madrid")
```

### 4.2 Parámetros y Argumentos

**Parámetros** son variables en la definición de la función. **Argumentos** son los valores reales que pasas al llamarla.

```python
# Parámetros posicionales obligatorios
def sumar(a, b):
    return a + b

resultado = sumar(5, 3)  # 5 y 3 son argumentos posicionales
print(resultado)  # 8

# Parámetros con valores por defecto
def calcular_descuento(precio, porcentaje=10):
    """Aplica descuento por defecto del 10%."""
    return precio * (1 - porcentaje / 100)

print(calcular_descuento(100))       # Descuento del 10%
print(calcular_descuento(100, 20))   # Descuento del 20% específico

# Parámetros con nombres (keyword arguments)
def crear_usuario(nombre, email, edad=18, pais="España"):
    """Crea un usuario con datos opcionales."""
    return f"Usuario: {nombre}, Email: {email}, Edad: {edad}, País: {pais}"

# Llamar con argumentos nombrados (orden no importa)
usuario1 = crear_usuario("Ana", "ana@email.com", edad=25, pais="México")
usuario2 = crear_usuario(nombre="Luis", email="luis@email.com")

# Mezcla de posicionales y nombrados (posicionales primero)
usuario3 = crear_usuario("Carlos", "carlos@email.com", pais="Argentina")
```

### 4.3 Args y Kwargs - Parámetros Dinámicos

`**args`**: Recibe **cualquier número** de argumentos posicionales como una **tupla**.

```python
def sumar_todos(*numeros):
    """Suma todos los números que recibe."""
    return sum(numeros)

print(sumar_todos(1, 2, 3))          # 6
print(sumar_todos(1, 2, 3, 4, 5))    # 15
print(sumar_todos())                  # 0

# Acceder a los argumentos individuales
def mostrar_args(*args):
    for i, arg in enumerate(args):
        print(f"Argumento {i}: {arg}")

mostrar_args("a", "b", "c", "d")
```

`**kwargs`**: Recibe **cualquier número** de argumentos nombrados como un **diccionario**.

```python
def mostrar_info(**datos):
    """Muestra información con claves y valores."""
    for clave, valor in datos.items():
        print(f"{clave}: {valor}")

mostrar_info(nombre="Ana", edad=25, ciudad="Madrid")
mostrar_info(titulo="Python", nivel="intermedio", duracion=40)

# kwargs en acción
def configurar_app(**config):
    """Configura una aplicación con parámetros variables."""
    print("Configuración:")
    if "debug" in config:
        print(f"Modo debug: {config['debug']}")
    if "puerto" in config:
        print(f"Puerto: {config['puerto']}")
    if "host" in config:
        print(f"Host: {config['host']}")

configurar_app(debug=True, puerto=8080, host="localhost")
```

**Combinación de argumentos:**
```python
def funcion_completa(obligatorio, *args, **kwargs):
    """Demuestra todos los tipos de parámetros."""
    print(f"Obligatorio: {obligatorio}")
    print(f"Args: {args}")
    print(f"Kwargs: {kwargs}")

funcion_completa("hola", 1, 2, 3, nombre="Ana", edad=25)
# Output:
# Obligatorio: hola
# Args: (1, 2, 3)
# Kwargs: {'nombre': 'Ana', 'edad': 25}
```

### 4.4 Return - Devolviendo Valores

`return` termina la función y devuelve un valor al llamador.

```python
# Función sin return devuelve None automáticamente
def solo_imprime():
    print("Hola")

resultado = solo_imprime()
print(resultado)  # None

# Función con return simple
def calcular_cuadrado(x):
    return x * x

cuadrado = calcular_cuadrado(5)
print(cuadrado)  # 25

# Return múltiple (tupla implícita)
def dividir_con_resto(a, b):
    cociente = a // b
    resto = a % b
    return cociente, resto  # Devuelve (cociente, resto)

coc, res = dividir_con_resto(10, 3)
print(f"Cociente: {coc}, Resto: {res}")  # Cociente: 3, Resto: 1

# Return con condición
def es_par(n):
    if n % 2 == 0:
        return True
    else:
        return False

print(es_par(4))  # True
print(es_par(5))  # False

# Return temprano (múltiples return)
def clasificar_numero(n):
    if n > 0:
        return "Positivo"
    elif n < 0:
        return "Negativo"
    else:
        return "Cero"

print(clasificar_numero(5))   # Positivo
print(clasificar_numero(-3))  # Negativo
print(clasificar_numero(0))   # Cero
```

### 4.5 Lambda Functions - Funciones Anónimas

`lambda` crea funciones pequeñas sin nombre, útiles para operaciones simples.

```python
# Sintaxis: lambda argumentos: expresión
cuadrado = lambda x: x**2
print(cuadrado(5))  # 25

sumar = lambda a, b: a + b
print(sumar(3, 4))  # 7

# Lambda con condición (operador ternario)
positivo_negativo = lambda x: "Positivo" if x > 0 else "No positivo"
print(positivo_negativo(5))   # Positivo
print(positivo_negativo(-2))  # No positivo

# Usar lambda con map()
numeros = [1, 2, 3, 4, 5]
cuadrados = list(map(lambda x: x**2, numeros))
print(cuadrados)  # [1, 4, 9, 16, 25]

# Usar lambda con filter()
pares = list(filter(lambda x: x % 2 == 0, numeros))
print(pares)  # [2, 4]

# Ordenar con lambda
alumnos = [("Ana", 85), ("Luis", 92), ("Carlos", 78)]
alumnos_ordenados = sorted(alumnos, key=lambda x: x[1], reverse=True)
print(alumnos_ordenados)  # [('Luis', 92), ('Ana', 85), ('Carlos', 78)]
```

### 4.6 Alcance de Variables - Scope

**Variables locales**: Definidas dentro de una función, solo existen ahí.

```python
def funcion_local():
    variable_local = 10
    print(f"Dentro: {variable_local}")

funcion_local()
# print(variable_local)  # ❌ NameError: name 'variable_local' is not defined
```

**Variables globales**: Definidas fuera de funciones, accesibles desde todo el código.

```python
variable_global = 20

def leer_global():
    print(f"Puedo leer: {variable_global}")

leer_global()  # 20

def modificar_global():
    global variable_global  # Declaro que quiero modificar la global
    variable_global = 30
    print(f"Modificada a: {variable_global}")

modificar_global()  # Modificada a: 30
print(f"Desde fuera: {variable_global}")  # Desde fuera: 30
```

**Mejor práctica: Evita global, usa parámetros y return**
```python
# MAL: Usar global
contador = 0
def incrementar():
    global contador
    contador += 1

# BIEN: Pasar y retornar
def incrementar_mejor(contador):
    return contador + 1

contador = incrementar_mejor(contador)
```

### 4.7 Decoradores - Modificando Comportamiento

Un decorador es una función que **envuelve otra función** para añadirle funcionalidad.

```python
# Decorador simple: mide tiempo de ejecución
import time

def medir_tiempo(func):
    def wrapper(*args, **kwargs):
        inicio = time.time()
        resultado = func(*args, **kwargs)
        fin = time.time()
        print(f"Función '{func.__name__}' tardó {fin - inicio:.4f}s")
        return resultado
    return wrapper

# Aplicar decorador
@medir_tiempo
def tarea_lenta():
    time.sleep(1)
    return "Terminado"

resultado = tarea_lenta()
print(resultado)

# Alternativa sin @
def otra_tarea():
    time.sleep(0.5)
    return "Otra tarea"

otra_tarea_decorada = medir_tiempo(otra_tarea)
otra_tarea_decorada()
```

**Decorador con argumentos:**
```python
def repetir(veces=2):
    def decorador(func):
        def wrapper(*args, **kwargs):
            for i in range(veces):
                print(f"Ejecución {i+1} de {veces}:")
                resultado = func(*args, **kwargs)
            return resultado
        return wrapper
    return decorador

@repetir(veces=3)
def saludar(nombre):
    print(f"Hola, {nombre}")

saludar("Ana")
```

### 4.8 Recursividad - Funciones que se Llaman a Sí Mismas

Una función recursiva debe tener **caso base** (condición de parada) y **caso recursivo**.

```python
# Factorial: n! = n * (n-1) * (n-2) * ... * 1
def factorial(n):
    # Caso base
    if n == 0 or n == 1:
        return 1
    # Caso recursivo
    else:
        return n * factorial(n - 1)

print(factorial(5))  # 5 * 4 * 3 * 2 * 1 = 120

# Fibonacci: cada número es la suma de los dos anteriores
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(6))  # 8 (0,1,1,2,3,5,8)

# Conteo regresivo
def conteo_regresivo(n):
    if n <= 0:
        print("¡Fin!")
    else:
        print(n)
        conteo_regresivo(n - 1)

conteo_regresivo(5)
```

**Importante**: La recursión consume mucha memoria. Para casos grandes, usa iteración.

```python
# Versión iterativa más eficiente para factorial
def factorial_iterativo(n):
    resultado = 1
    for i in range(1, n + 1):
        resultado *= i
    return resultado

print(factorial_iterativo(5))  # 120
```

---

## 📊 Módulo 5: Programación Orientada a Objetos (OOP)

### 5.1 Clases y Objetos - El Molde y la Instancia

Una **clase** es una plantilla que define **atributos** (datos) y **métodos** (funciones). Un **objeto** es una instancia específica de la clase.

```python
class Perro:
    """Clase que representa un perro."""
    
    def __init__(self, nombre, edad, raza):
        """Constructor: inicializa atributos."""
        self.nombre = nombre
        self.edad = edad
        self.raza = raza
    
    def ladrar(self):
        """Método de instancia."""
        print(f"{self.nombre} dice: ¡Guau guau!")
    
    def presentarse(self):
        """Método que usa múltiples atributos."""
        print(f"Hola, soy {self.nombre}, tengo {self.edad} años y soy de raza {self.raza}")

# Crear objetos (instanciar)
perro1 = Perro("Rex", 3, "Golden Retriever")
perro2 = Perro("Luna", 5, "Labrador")

perro1.presentarse()
perro1.ladrar()

perro2.presentarse()
perro2.ladrar()

# Acceder a atributos
print(f"El nombre del primer perro es: {perro1.nombre}")
print(f"Edad: {perro2.edad} años")
```

### 5.2 Self - El Objeto en Sí Mismo

`self` es una **convención** que hace referencia a la instancia actual. Es el primer parámetro en todos los métodos de instancia.

```python
class Persona:
    def __init__(self, nombre, edad):
        self.nombre = nombre  # self.nombre es el atributo del objeto
        self.edad = edad
    
    def cumplir_años(self):
        self.edad += 1  # Modifica el atributo del objeto
        print(f"¡Feliz cumpleaños {self.nombre}! Ahora tienes {self.edad} años")

persona = Persona("Ana", 25)
persona.cumplir_años()
persona.cumplir_años()
```

### 5.3 Encapsulamiento - Protegiendo Datos

Python no tiene modificadores de acceso estrictos como `private`. Usa **convenciones**:

- **Público**: `self.nombre` (accesible desde cualquier parte)
- **Protegido**: `self._nombre` (no deberías tocarlo desde fuera, pero puedes)
- **Privado**: `self.__nombre` (Python lo renombra: `_Clase__nombre`)

```python
class CuentaBancaria:
    def __init__(self, titular, saldo_inicial=0):
        self.titular = titular                    # Público
        self._saldo = saldo_inicial              # Protegido (convención)
        self.__pin = 1234                        # Privado (name mangling)
    
    def depositar(self, cantidad):
        if cantidad > 0:
            self._saldo += cantidad
    
    def obtener_saldo(self):
        return self._saldo
    
    def _metodo_protegido(self):
        print("Esto es protegido")
    
    def __metodo_privado(self):
        print("Esto es privado")

cuenta = CuentaBancaria("Ana", 1000)

# Acceso público
print(cuenta.titular)  # Ana

# Acceso a protegido (se permite, pero no se debe)
print(cuenta._saldo)  # 1000

# Acceso a privado (da error directo)
# print(cuenta.__pin)  # AttributeError

# Acceso a privado vía name mangling (truco interno, no usar)
print(cuenta._CuentaBancaria__pin)  # 1234
```

### 5.4 Getters y Setters con @property

El decorador `@property` te permite **controlar el acceso** a atributos como si fueran propiedades normales.

```python
class Temperatura:
    def __init__(self, celsius):
        self._celsius = celsius
    
    @property
    def celsius(self):
        """Getter: devuelve valor."""
        return self._celsius
    
    @celsius.setter
    def celsius(self, valor):
        """Setter: valida antes de asignar."""
        if valor < -273.15:
            raise ValueError("Temperatura por debajo del cero absoluto")
        self._celsius = valor
    
    @property
    def fahrenheit(self):
        """Propiedad calculada (solo lectura)."""
        return self._celsius * 9/5 + 32
    
    @fahrenheit.setter
    def fahrenheit(self, valor):
        """Setter que convierte a celsius."""
        self._celsius = (valor - 32) * 5/9

temp = Temperatura(25)
print(f"{temp.celsius}°C = {temp.fahrenheit}°F")  # 25°C = 77.0°F

temp.celsius = 30  # Usando setter
print(temp.celsius)  # 30

temp.fahrenheit = 100  # Usando setter de fahrenheit
print(temp.celsius)  # 37.777...

# Intentar valor inválido
try:
    temp.celsius = -300
except ValueError as e:
    print(e)  # Temperatura por debajo del cero absoluto
```

### 5.5 Herencia - Reutilizando Código

La herencia permite crear clases nuevas basadas en clases existentes.

```python
class Animal:
    def __init__(self, nombre, edad):
        self.nombre = nombre
        self.edad = edad
    
    def hablar(self):
        print("Sonido genérico")
    
    def presentarse(self):
        print(f"Soy {self.nombre} y tengo {self.edad} años")

class Perro(Animal):
    def __init__(self, nombre, edad, raza):
        super().__init__(nombre, edad)  # Llama al constructor padre
        self.raza = raza
    
    def hablar(self):
        print("¡Guau guau!")
    
    def ladrar_fuerte(self):
        print("GUAU GUAU GUAU!!!")

class Gato(Animal):
    def hablar(self):
        print("Miau miau")
    
    def ronronear(self):
        print("Prrrrrrr")

# Uso
perro = Perro("Rex", 3, "Golden")
gato = Gato("Luna", 2)

perro.presentarse()  # Heredado de Animal
perro.hablar()       # Perro.lo hablar (sobreescrito)
perro.ladrar_fuerte()

gato.presentarse()
gato.hablar()        # Gato.lo hablar (sobreescrito)
gato.ronronear()
```

### 5.6 Polimorfismo - Mismo Nombre, Diferente Comportamiento

```python
# Función que acepta cualquier Animal y llama a su método hablar
def hacer_hablar(animal):
    animal.hablar()

perro = Perro("Rex", 3, "Golden")
gato = Gato("Luna", 2)
pajaro = Animal("Piolín", 1)

hacer_hablar(perro)  # ¡Guau guau!
hacer_hablar(gato)   # Miau miau
hacer_hablar(pajaro) # Sonido genérico

# Lista de objetos diferentes
animales = [perro, gato, pajaro]
for animal in animales:
    animal.presentarse()  # Todos tienen este método
    animal.hablar()       # Cada uno lo implementa diferente
```

### 5.7 @classmethod y @staticmethod

```python
class Circulo:
    pi = 3.14159  # Variable de clase
    
    def __init__(self, radio):
        self.radio = radio
    
    def area(self):
        """Método de instancia: usa atributos del objeto."""
        return self.pi * self.radio ** 2
    
    @classmethod
    def desde_diametro(cls, diametro):
        """Método de clase: usa datos de la clase para crear instancia."""
        return cls(diametro / 2)
    
    @staticmethod
    def formula_area():
        """Método estático: no usa instancia ni clase."""
        return "π × r²"

# Uso
circulo1 = Circulo(5)
print(circulo1.area())  # Método de instancia

circulo2 = Circulo.desde_diametro(10)  # Método de clase
print(circulo2.radio)  # 5.0

print(Circulo.formula_area())  # Método estático
print(circulo1.formula_area()) # También accesible desde instancia
```

### 5.8 Métodos Especiales (Dunder Methods)

```python
class Libro:
    def __init__(self, titulo, autor, paginas):
        self.titulo = titulo
        self.autor = autor
        self.paginas = paginas
    
    def __str__(self):
        """Representación legible para humanos."""
        return f"'{self.titulo}' por {self.autor}"
    
    def __repr__(self):
        """Representación para desarrolladores."""
        return f"Libro('{self.titulo}', '{self.autor}', {self.paginas})"
    
    def __len__(self):
        """Permite usar len() con el objeto."""
        return self.paginas
    
    def __add__(self, otro):
        """Permite usar + para combinar libros."""
        return f"{self.titulo} y {otro.titulo}"
    
    def __eq__(self, otro):
        """Comparación de igualdad."""
        return self.titulo == otro.titulo

libro1 = Libro("Python Crash Course", "Eric Matthes", 544)
libro2 = Libro("Fluent Python", "Luciano Ramalho", 792)

print(libro1)  # __str__
print(repr(libro1))  # __repr__
print(len(libro1))  # __len__ → 544
print(libro1 + libro2)  # __add__
print(libro1 == libro2)  # __eq__ → False
```

---

## 📁 Módulo 6: Manejo de Archivos con pathlib

### 6.1 pathlib - La Forma Moderna de Trabajar con Rutas

El módulo `pathlib` es la forma **recomendada** para manejar archivos y carpetas. Es **multiplataforma** y orientado a objetos.

```python
from pathlib import Path

# Crear objeto Path
ruta_actual = Path(".")  # Directorio actual
ruta_absoluta = Path("/home/usuario/proyectos")  # Absoluta (Linux)
ruta_windows = Path("C:/Users/Usuario/Documentos")  # Absoluta (Windows)

# Concatenar rutas (operador /)
proyecto = Path("mi_proyecto")
subcarpeta = proyecto / "datos" / "csv"
print(subcarpeta)  # mi_proyecto/datos/csv

# Rutas relativas a home
escritorio = Path.home() / "Desktop"
print(escritorio)  # /home/usuario/Desktop

# Verificar existencia
archivo = Path("datos.txt")
print(archivo.exists())  # True o False
print(archivo.is_file())  # Es archivo?
print(archivo.is_dir())   # Es directorio?
```

### 6.2 Crear y Eliminar Carpetas

```python
from pathlib import Path

# Crear carpeta (error si ya existe)
nueva_carpeta = Path("resultados")
nueva_carpeta.mkdir()

# Crear carpeta recursivamente (crea padres si no existen)
carpeta_anidada = Path("proyecto/data/raw")
carpeta_anidada.mkdir(parents=True)

# No lanzar error si ya existe
carpeta_anidada.mkdir(parents=True, exist_ok=True)

# Eliminar carpeta vacía
carpeta_vacia = Path("temp")
carpeta_vacia.rmdir()

# Eliminar carpeta con contenido (cuidado!)
import shutil
shutil.rmtree("proyecto/data")  # Elimina todo el árbol
```

### 6.3 Leer Archivos de Texto

```python
from pathlib import Path

# Crear archivo de ejemplo
archivo = Path("poema.txt")
archivo.write_text("Roses are red\nViolets are blue\nPython is awesome", encoding="utf-8")

# Leer todo el contenido
contenido = archivo.read_text(encoding="utf-8")
print(contenido)

# Leer línea por línea (eficiente para archivos grandes)
with archivo.open("r", encoding="utf-8") as f:
    for linea in f:
        print(linea.rstrip())  # rstrip() elimina \n

# Leer todas las líneas como lista
lineas = archivo.read_text(encoding="utf-8").splitlines()
print(lineas)  # ['Roses are red', 'Violets are blue', 'Python is awesome']
```

### 6.4 Escribir Archivos de Texto

```python
from pathlib import Path

# Sobrescribir archivo (modo 'w')
datos = ["Primera línea", "Segunda línea", "Tercera línea"]
archivo = Path("output.txt")

with archivo.open("w", encoding="utf-8") as f:
    for dato in datos:
        f.write(dato + "\n")

# Agregar al final (modo 'a' - append)
with archivo.open("a", encoding="utf-8") as f:
    f.write("Cuarta línea\n")

# Escribir todo de una vez (sobrescribe)
archivo.write_text("Nuevo contenido completo\n", encoding="utf-8")

# Escribir múltiples líneas desde lista
lineas = ["Línea 1", "Línea 2", "Línea 3"]
archivo.write_text("\n".join(lineas), encoding="utf-8")
```

### 6.5 Manejo de Archivos Binarios

```python
from pathlib import Path

# Leer imagen como bytes
ruta_imagen = Path("foto.jpg")
datos_imagen = ruta_imagen.read_bytes()

# Copiar archivo binario
destino = Path("copia_foto.jpg")
destino.write_bytes(datos_imagen)

# No usar modo texto con archivos binarios
# archivo.write_text(datos_imagen)  # ❌ Error: espera string
```

### 6.6 Enumerar y Buscar Archivos

```python
from pathlib import Path

carpeta = Path("mi_proyecto")

# Listar todos los archivos y carpetas
for item in carpeta.iterdir():
    print(item)

# Listar solo archivos .py
archivos_py = list(carpeta.glob("*.py"))
print(archivos_py)

# Buscar recursivamente (subcarpetas)
todos_txt = list(carpeta.rglob("*.txt"))
print(todos_txt)

# Obtener información del archivo
archivo = Path("documento.pdf")
print(archivo.name)          # Nombre con extensión
print(archivo.stem)          # Nombre sin extensión
print(archivo.suffix)        # Extensión
print(archivo.stat().st_size) # Tamaño en bytes
print(archivo.absolute())    # Ruta absoluta
```

### 6.7 Manejo Defensivo de Errores

```python
from pathlib import Path

archivo = Path("datos_sensibles.csv")

try:
    # Verificar antes de leer
    if not archivo.exists():
        raise FileNotFoundError(f"No existe: {archivo}")
    
    if not archivo.is_file():
        raise ValueError(f"{archivo} no es un archivo")
    
    # Intentar leer
    contenido = archivo.read_text(encoding="utf-8")
    print(contenido)

except FileNotFoundError as e:
    print(f"Error archivo: {e}")
except PermissionError:
    print(f"No tienes permisos para leer {archivo}")
except UnicodeDecodeError:
    print(f"Error de codificación. El archivo no es UTF-8")
except Exception as e:
    print(f"Error inesperado: {e}")
    import traceback
    traceback.print_exc()
```

---

## 📊 Módulo 7: Librerías Esenciales para IA

### 7.1 NumPy - Arrays Numéricos Eficientes

NumPy es la base de la computación científica en Python. Proporciona arrays multidimensionales y operaciones rápidas.

```python
import numpy as np

# Crear arrays
arr1 = np.array([1, 2, 3])                    # 1D
arr2 = np.array([[1, 2], [3, 4]])            # 2D
arr3 = np.zeros((3, 4))                      # Matriz de ceros
arr4 = np.ones((2, 3))                       # Matriz de unos
arr5 = np.arange(10)                         # 0 hasta 9
arr6 = np.linspace(0, 1, 5)                  # 5 números entre 0 y 1

# Atributos
print(arr1.shape)   # (3,) - forma del array
print(arr2.shape)   # (2, 2)
print(arr1.ndim)    # 1 - dimensiones
print(arr2.size)    # 4 - total de elementos

# Operaciones element-wise (rápidas)
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

print(a + b)        # [5 7 9]
print(a * 2)        # [2 4 6]
print(a * b)        # [4 10 18] (multiplicación elemento a elemento)
print(a.sum())      # 6
print(a.mean())     # 2.0
print(a.max())      # 3

# Indexado y slicing
print(arr5[2:5])    # [2 3 4]
print(arr2[0, 1])   # 2 (fila 0, columna 1)
print(arr2[:, 0])   # [1 3] (todas las filas, columna 0)

# Boolean indexing (filtrado)
numeros = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
pares = numeros[numeros % 2 == 0]
print(pares)  # [ 2  4  6  8 10]

# Generar datos aleatorios
aleatorios = np.random.randint(1, 100, size=10)
print(aleatorios)
```

### 7.2 Pandas - Manipulación de Datos Tabulares

Pandas es la librería principal para análisis de datos. Usa dos estructuras: `Series` (1D) y `DataFrame` (2D).

```python
import pandas as pd

# Crear Series
s = pd.Series([10, 20, 30, 40], index=['a', 'b', 'c', 'd'])
print(s)
# a    10
# b    20
# c    30
# d    40

# Crear DataFrame
data = {
    'nombre': ['Ana', 'Luis', 'María', 'Carlos'],
    'edad': [25, 30, 22, 35],
    'ciudad': ['Madrid', 'Barcelona', 'Sevilla', 'Valencia']
}
df = pd.DataFrame(data)
print(df)

# Leer archivo CSV (ejemplo comentado)
# df = pd.read_csv('datos.csv', encoding='utf-8')
# print(df.head())  # Primeras 5 filas
```

**Operaciones básicas:**
```python
# Seleccionar columnas
print(df['nombre'])        # Serie con nombres
print(df[['nombre', 'edad']])  # DataFrame con múltiples columnas

# Filtrar por condición (boolean indexing)
mayores_de_25 = df[df['edad'] > 25]
print(mayores_de_25)

# Múltiples condiciones
madrid_mayores = df[(df['ciudad'] == 'Madrid') & (df['edad'] > 20)]

# Agregar nueva columna
df['mayor_de_edad'] = df['edad'] >= 18
print(df)

# Operaciones por columna
print(df['edad'].mean())   # Media
print(df['edad'].sum())    # Suma
print(df['edad'].min())    # Mínimo
print(df['edad'].max())    # Máximo

# Estadísticas descriptivas
print(df.describe())
```

**Agrupar y ordenar:**
```python
# Agrupar por ciudad y calcular edad media
edad_por_ciudad = df.groupby('ciudad')['edad'].mean()
print(edad_por_ciudad)

# Ordenar
df_ordenado = df.sort_values('edad', ascending=False)
print(df_ordenado)

# Ordenar por múltiples columnas
df_multi = df.sort_values(['ciudad', 'edad'])
print(df_multi)
```

### 7.3 Matplotlib - Gráficos Básicos

```python
import matplotlib.pyplot as plt
import numpy as np

# Datos de ejemplo
x = np.array([1, 2, 3, 4, 5])
y = np.array([2, 4, 6, 8, 10])

# Gráfico de línea
plt.figure(figsize=(10, 6))
plt.plot(x, y, marker='o', color='blue', linestyle='-', linewidth=2)
plt.title("Gráfico de Línea Simple")
plt.xlabel("Eje X")
plt.ylabel("Eje Y")
plt.grid(True, alpha=0.3)
plt.show()

# Histograma
datos = np.random.normal(170, 10, 250)
plt.figure(figsize=(10, 6))
plt.hist(datos, bins=15, color='skyblue', edgecolor='black', alpha=0.7)
plt.title("Distribución de Alturas")
plt.xlabel("Altura (cm)")
plt.ylabel("Frecuencia")
plt.show()

# Gráfico de dispersión
x_random = np.random.rand(50)
y_random = np.random.rand(50)

plt.figure(figsize=(10, 6))
plt.scatter(x_random, y_random, color='red', s=50, alpha=0.6)
plt.title("Gráfico de Dispersión")
plt.xlabel("X")
plt.ylabel("Y")
plt.show()

# Múltiples gráficos en una figura
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

ax1.plot(x, y, 'g--')
ax1.set_title("Gráfico 1")

ax2.scatter(x, y, color='purple')
ax2.set_title("Gráfico 2")

plt.tight_layout()
plt.show()
```

### 7.4 Seaborn - Estadística Visual Avanzada

Seaborn construye sobre Matplotlib y ofrece gráficos más estéticos y estadísticos.

```python
import seaborn as sns
import pandas as pd
import numpy as np

# Configurar estilo
sns.set_theme(style="darkgrid")

# Crear DataFrame de ejemplo
df = pd.DataFrame({
    'altura': np.random.normal(170, 10, 100),
    'peso': np.random.normal(65, 8, 100),
    'genero': np.random.choice(['H', 'M'], 100),
    'deporte': np.random.choice(['futbol', 'tenis', 'natacion'], 100)
})

# Relación altura-peso con color por género
plt.figure(figsize=(10, 8))
sns.scatterplot(data=df, x='altura', y='peso', hue='genero', style='genero', s=100)
plt.title("Relación Altura-Peso por Género")
plt.show()

# Histograma con KDE (densidad)
plt.figure(figsize=(10, 6))
sns.histplot(data=df, x='altura', kde=True, color='steelblue', bins=20)
plt.title("Distribución de Altura con Curva de Densidad")
plt.show()

# Boxplot para detectar outliers
plt.figure(figsize=(10, 6))
sns.boxplot(data=df, x='deporte', y='altura', palette='Set2')
plt.title("Altura por Deporte (Boxplot)")
plt.show()

# Mapa de calor de correlación
corr = df[['altura', 'peso']].corr()
plt.figure(figsize=(8, 6))
sns.heatmap(corr, annot=True, cmap='coolwarm', center=0, fmt=".2f")
plt.title("Matriz de Correlación")
plt.show()

# Gráfico de barras con estadísticas
plt.figure(figsize=(10, 6))
sns.barplot(data=df, x='deporte', y='peso', hue='genero', ci='sd')
plt.title("Peso Medio por Deporte y Género")
plt.show()

# Regresión con línea de tendencia
plt.figure(figsize=(10, 6))
sns.regplot(data=df, x='altura', y='peso', scatter_kws={'alpha':0.6})
plt.title("Regresión Altura-Peso")
plt.show()
```

---

## ⚠️ Módulo 8: Manejo de Errores y Excepciones

### 8.1 try/except - Capturando Errores

```python
# Error básico (sin manejo)
# print(10 / 0)  # ❌ ZeroDivisionError: division by zero

# Con manejo
try:
    resultado = 10 / 0
except ZeroDivisionError:
    print("Error: No puedes dividir por cero")
    resultado = None

print(f"Resultado: {resultado}")  # Resultado: None

# Múltiples excepciones
try:
    num = int(input("Dame un número: "))
    resultado = 100 / num
except ZeroDivisionError:
    print("Error: División por cero")
except ValueError:
    print("Error: Debes ingresar un número válido")
except Exception as e:
    print(f"Error inesperado: {e}")

# Capturar la excepción como objeto
try:
    lista = [1, 2, 3]
    print(lista[5])
except IndexError as error:
    print(f"Error de índice: {error}")  # Error de índice: list index out of range
```

### 8.2 else y finally

```python
# else: se ejecuta si NO hubo excepción
try:
    resultado = 10 / 2
except ZeroDivisionError:
    print("División por cero")
else:
    print(f"Operación exitosa: {resultado}")  # Se ejecuta
finally:
    print("Esto siempre se ejecuta")  # Siempre

# else: NO se ejecuta si hubo excepción
try:
    resultado = 10 / 0
except ZeroDivisionError:
    print("División por cero")
else:
    print(f"Operación exitosa: {resultado}")  # NO se ejecuta
finally:
    print("Esto siempre se ejecuta")  # Siempre
```

### 8.3 Excepciones Personalizadas

Crea tus propias excepciones para casos específicos de tu dominio.

```python
class SaldoInsuficienteError(Exception):
    """Excepción de negocio para cuentas bancarias."""
    def __init__(self, saldo_actual, cantidad_requerida):
        self.saldo_actual = saldo_actual
        self.cantidad_requerida = cantidad_requerida
        super().__init__(f"Saldo insuficiente: ${saldo_actual}, necesitas ${cantidad_requerida}")

class EdadInvalidaError(Exception):
    """Excepción para edades fuera de rango."""
    pass

def retirar_dinero(saldo, cantidad):
    if cantidad > saldo:
        raise SaldoInsuficienteError(saldo, cantidad)
    return saldo - cantidad

def verificar_edad(edad):
    if edad < 0 or edad > 120:
        raise EdadInvalidaError(f"Edad {edad} no es válida")

# Uso
try:
    nuevo_saldo = retirar_dinero(100, 150)
except SaldoInsuficienteError as e:
    print(e)  # Saldo insuficiente: 100, necesitas 150
    print(f"Faltan: ${e.cantidad_requerida - e.saldo_actual}")

try:
    verificar_edad(150)
except EdadInvalidaError as e:
    print(e)  # Edad 150 no es válida
```

### 8.4 Traceback - Información Completa del Error

```python
import traceback

def funcion_problema():
    return 10 / 0

try:
    funcion_problema()
except ZeroDivisionError:
    print("Se produjo un error. Aquí está el traceback:")
    traceback.print_exc()

# Guardar traceback en string
try:
    funcion_problema()
except:
    tb_str = traceback.format_exc()
    print("Traceback guardado:")

# Acceso detallado a traceback
import sys

try:
    funcion_problema()
except:
    exc_type, exc_value, exc_traceback = sys.exc_info()
    print(f"Tipo: {exc_type.__name__}")
    print(f"Valor: {exc_value}")
    print(f"Traceback: {exc_traceback}")
```

### 8.5 El Contexto with - Garantía de Cierre

El bloque `with` garantiza que los recursos se cierren correctamente, incluso si ocurre un error.

```python
# Sin with (propenso a errores)
archivo = open("datos.txt", "w")
archivo.write("Información importante")
# Si hay error aquí, archivo NO se cierra

# Con with (seguro)
try:
    with open("datos.txt", "w", encoding="utf-8") as f:
        f.write("Información importante")
        # Si hay error, archivo se cierra automáticamente
except IOError as e:
    print(f"Error de archivo: {e}")
    # Archivo ya está cerrado aquí
```

---

## 🏦 Módulo 9: Proyecto Integrado - Mini-Bank

### 9.1 Estructura del Proyecto

```
mini_bank/
├── .venv/                 # Entorno virtual
├── main.py               # Punto de entrada
├── cuenta.py             # Clase CuentaBancaria
├── cliente.py            # Clase Cliente
├── errores.py            # Excepciones personalizadas
├── utils.py              # Funciones auxiliares
└── requirements.txt      # Dependencias
```

### 9.2 Archivo `errores.py` - Excepciones Personalizadas

```python
"""
errores.py
Excepciones personalizadas para el sistema bancario.
"""

class SaldoInsuficienteError(Exception):
    """
    Excepción lanzada cuando se intenta retirar más dinero
    del disponible en la cuenta.
    """
    def __init__(self, saldo_actual, cantidad_solicitada):
        self.saldo_actual = saldo_actual
        self.cantidad_solicitada = cantidad_solicitada
        mensaje = (f"Saldo insuficiente. Disponible: ${saldo_actual:.2f}, "
                  f"Solicitado: ${cantidad_solicitada:.2f}")
        super().__init__(mensaje)

class MontoInvalidoError(Exception):
    """
    Excepción para montos negativos o cero en operaciones.
    """
    def __init__(self, monto, operacion):
        self.monto = monto
        self.operacion = operacion
        super().__init__(f"Monto inválido (${monto}) para {operacion}")

class CuentaInactivaError(Exception):
    """
    Excepción para operaciones en cuentas inactivas.
    """
    pass
```

### 9.3 Archivo `utils.py` - Funciones Auxiliares

```python
"""
utils.py
Funciones de utilidad con decoradores @staticmethod y @classmethod.
"""

import time
from pathlib import Path

class Utils:
    """
    Clase contenedora de métodos de utilidad.
    No requiere instanciación.
    """
    
    @staticmethod
    def timestamp():
        """
        Retorna marca de tiempo actual en formato legible.
        Útil para logging.
        """
        return time.strftime("%Y-%m-%d %H:%M:%S")
    
    @staticmethod
    def formatear_moneda(cantidad):
        """
        Formatea una cantidad como moneda local.
        Ej: 1234.5 → "$1,234.50"
        """
        return f"${cantidad:,.2f}"
    
    @classmethod
    def crear_carpeta_logs(cls):
        """
        Crea carpeta de logs si no existe.
        Demuestra uso de cls para acceso a método estático.
        """
        carpeta = Path("logs")
        carpeta.mkdir(exist_ok=True)
        return carpeta
    
    @staticmethod
    def validar_monto(monto, operacion):
        """
        Valida que monto sea positivo.
        Lanza excepción específica si es inválido.
        """
        if monto <= 0:
            raise MontoInvalidoError(monto, operacion)
        return True

# Variables de clase útiles
Utils.NOMBRE_BANCO = "Mini-Bank Python"
Utils.VERSION = "1.0.0"
```

### 9.4 Archivo `cuenta.py` - Clase CuentaBancaria

```python
"""
cuenta.py
Clase principal del sistema bancario.
Demuestra encapsulamiento, @property, y manejo de excepciones.
"""

from utils import Utils
from errores import SaldoInsuficienteError, MontoInvalidoError

class CuentaBancaria:
    """
    Representa una cuenta bancaria con saldo, titular y estado.
    """
    
    # Variable de clase (compartida por todas las instancias)
    _total_cuentas = 0
    _cuentas_activas = []
    
    def __init__(self, titular, saldo_inicial=0):
        """
        Inicializa nueva cuenta.
        
        Args:
            titular (str): Nombre del titular
            saldo_inicial (float): Saldo inicial (default=0)
        """
        self._titular = titular
        self._saldo = float(saldo_inicial)
        self._activa = True
        
        # Contador de cuentas
        CuentaBancaria._total_cuentas += 1
        self._numero_cuenta = f"{CuentaBancaria._total_cuentas:04d}"
        
        # Registrar cuenta activa
        CuentaBancaria._cuentas_activas.append(self)
        
        print(f"[{Utils.timestamp()}] Cuenta #{self._numero_cuenta} creada para {titular}")
    
    # ========== PROPIEDADES (Getters y Setters) ==========
    @property
    def saldo(self):
        """Getter: retorna saldo actual."""
        return self._saldo
    
    @saldo.setter
    def saldo(self, valor):
        """
        Setter: permite modificar saldo con validación.
        Útil para ajustes manuales por parte de administrador.
        """
        Utils.validar_monto(valor, "asignación de saldo")
        self._saldo = float(valor)
        print(f"[{Utils.timestamp()}] Saldo ajustado a {Utils.formatear_moneda(valor)}")
    
    @property
    def titular(self):
        """Getter: nombre del titular (solo lectura)."""
        return self._titular
    
    @property
    def numero_cuenta(self):
        """Getter: número de cuenta (solo lectura)."""
        return self._numero_cuenta
    
    @property
    def activa(self):
        """Getter: estado de la cuenta."""
        return self._activa
    
    @activa.setter
    def activa(self, estado):
        """Setter: activar/desactivar cuenta."""
        if not isinstance(estado, bool):
            raise TypeError("Estado debe ser booleano")
        self._activa = estado
        estado_str = "activada" if estado else "desactivada"
        print(f"[{Utils.timestamp()}] Cuenta #{self._numero_cuenta} {estado_str}")
    
    # ========== MÉTODOS DE NEGOCIO ==========
    def depositar(self, monto):
        """
        Deposita dinero en la cuenta.
        
        Raises:
            MontoInvalidoError: Si monto <= 0
            CuentaInactivaError: Si cuenta está desactivada
        """
        if not self._activa:
            raise CuentaInactivaError("No se puede operar en cuenta inactiva")
        
        Utils.validar_monto(monto, "depósito")
        self._saldo += monto
        
        print(f"[{Utils.timestamp()}] DEPÓSITO de {Utils.formatear_moneda(monto)} "
              f"en cuenta #{self._numero_cuenta} → Saldo: {Utils.formatear_moneda(self._saldo)}")
        
        return self._saldo
    
    def retirar(self, monto):
        """
        Retira dinero de la cuenta.
        
        Raises:
            SaldoInsuficienteError: Si monto > saldo
            MontoInvalidoError: Si monto <= 0
            CuentaInactivaError: Si cuenta está desactivada
        """
        if not self._activa:
            raise CuentaInactivaError("No se puede operar en cuenta inactiva")
        
        Utils.validar_monto(monto, "retiro")
        
        if monto > self._saldo:
            raise SaldoInsuficienteError(self._saldo, monto)
        
        self._saldo -= monto
        
        print(f"[{Utils.timestamp()}] RETIRO de {Utils.formatear_moneda(monto)} "
              f"en cuenta #{self._numero_cuenta} → Saldo: {Utils.formatear_moneda(self._saldo)}")
        
        return self._saldo
    
    def transferir(self, monto, cuenta_destino):
        """
        Transfiere dinero a otra cuenta.
        
        Args:
            monto (float): Cantidad a transferir
            cuenta_destino (CuentaBancaria): Cuenta receptora
        
        Returns:
            tuple: (saldo_origen, saldo_destino)
        """
        self.retirar(monto)
        cuenta_destino.depositar(monto)
        return self._saldo, cuenta_destino.saldo
    
    def mostrar_detalles(self):
        """Muestra resumen de la cuenta."""
        estado = "Activa" if self._activa else "Inactiva"
        return f"""
        ═══════════════════════════════════════
        Cuenta #{self._numero_cuenta}
        Titular: {self._titular}
        Saldo: {Utils.formatear_moneda(self._saldo)}
        Estado: {estado}
        ═══════════════════════════════════════
        """
    
    # ========== MÉTODOS DE CLASE ==========
    @classmethod
    def total_cuentas_creadas(cls):
        """Retorna cantidad total de cuentas."""
        return cls._total_cuentas
    
    @classmethod
    def mostrar_resumen_global(cls):
        """Muestra resumen de todas las cuentas."""
        print(f"\n{'='*50}")
        print(f"RESUMEN GLOBAL - {Utils.NOMBRE_BANCO}")
        print(f"{'='*50}")
        print(f"Total de cuentas creadas: {cls._total_cuentas}")
        
        saldo_total = sum(c.saldo for c in cls._cuentas_activas if c.activa)
        print(f"Saldo total en cuentas activas: {Utils.formatear_moneda(saldo_total)}")
        
        print(f"\nDetalles de cuentas:")
        for cuenta in cls._cuentas_activas:
            if cuenta.activa:
                print(f"  - Cuenta #{cuenta.numero_cuenta}: {cuenta.titular} → {Utils.formatear_moneda(cuenta.saldo)}")
    
    @staticmethod
    def mensaje_bienvenida():
        """Mensaje estático de bienvenida."""
        return f"""
        {'='*60}
        {Utils.NOMBRE_BANCO} v{Utils.VERSION}
        Sistema de Gestión Bancaria en Python
        {'='*60}
        """
```

### 9.5 Archivo `cliente.py` - Agregación

```python
"""
cliente.py
Clase Cliente que "tiene una" CuentaBancaria.
Demuestra composición/agregación.
"""

from cuenta import CuentaBancaria

class Cliente:
    """
    Un cliente tiene datos personales y una cuenta bancaria asociada.
    """
    
    def __init__(self, nombre, edad, email):
        self.nombre = nombre
        self.edad = edad
        self.email = email
        self._cuenta = None  # Inicialmente sin cuenta
    
    def abrir_cuenta(self, saldo_inicial=0):
        """
        Crea una cuenta bancaria para este cliente.
        Una vez que se abre, no se puede cambiar (agregación fuerte).
        """
        if self._cuenta is not None:
            return self._cuenta
        
        self._cuenta = CuentaBancaria(self.nombre, saldo_inicial)
        return self._cuenta
    
    @property
    def cuenta(self):
        """Getter de la cuenta (solo lectura)."""
        if self._cuenta is None:
            raise ValueError(f"Cliente {self.nombre} no tiene cuenta asociada")
        return self._cuenta
    
    def __str__(self):
        """Representación legible del cliente."""
        tiene_cuenta = f" (Cuenta: #{self._cuenta.numero_cuenta})" if self._cuenta else " (Sin cuenta)"
        return f"Cliente: {self.nombre}, {self.edad} años, {self.email}{tiene_cuenta}"
```

### 9.6 Archivo `main.py` - Orquestación

```python
"""
main.py
Punto de entrada del sistema bancario.
Demuestra uso completo de todas las clases.
"""

from cliente import Cliente
from cuenta import CuentaBancaria
from errores import SaldoInsuficienteError, MontoInvalidoError, CuentaInactivaError

def pausa():
    """Pausa la ejecución esperando input."""
    input("\nPresiona <Enter> para continuar...")

def mostrar_menu():
    """Muestra menú interactivo."""
    print("""
    ═══════════════════════════════════════
    1. Crear cliente y cuenta
    2. Depositar dinero
    3. Retirar dinero
    4. Transferir entre cuentas
    5. Ver detalles de cuenta
    6. Ver resumen global
    7. Salir
    ═══════════════════════════════════════
    """)

def main():
    """Función principal."""
    print(CuentaBancaria.mensaje_bienvenida())
    
    print(f"\nCuentas existentes al inicio: {CuentaBancaria.total_cuentas_creadas()}")
    
    clientes = []
    
    while True:
        mostrar_menu()
        try:
            opcion = int(input("Selecciona opción: "))
        except ValueError:
            print("Error: Debes ingresar un número")
            continue
        
        if opcion == 1:
            # Crear cliente y cuenta
            nombre = input("Nombre del cliente: ")
            try:
                edad = int(input("Edad: "))
                email = input("Email: ")
                saldo = float(input("Saldo inicial (default 0): ") or 0)
            except ValueError:
                print("Error en datos numéricos")
                continue
            
            cliente = Cliente(nombre, edad, email)
            cuenta = cliente.abrir_cuenta(saldo)
            clientes.append(cliente)
            
            print(f"\n✅ Cliente creado: {cliente}")
            print(cuenta.mostrar_detalles())
            
        elif opcion == 2:
            # Depositar
            if not clientes:
                print("Primero crea un cliente")
                continue
            
            for i, c in enumerate(clientes):
                print(f"{i+1}. {c.nombre}")
            
            try:
                idx = int(input("Selecciona cliente: ")) - 1
                monto = float(input("Monto a depositar: "))
                clientes[idx].cuenta.depositar(monto)
            except (IndexError, ValueError, MontoInvalidoError, CuentaInactivaError) as e:
                print(f"❌ Error: {e}")
        
        elif opcion == 3:
            # Retirar
            if not clientes:
                print("Primero crea un cliente")
                continue
            
            for i, c in enumerate(clientes):
                print(f"{i+1}. {c.nombre}")
            
            try:
                idx = int(input("Selecciona cliente: ")) - 1
                monto = float(input("Monto a retirar: "))
                clientes[idx].cuenta.retirar(monto)
            except (IndexError, ValueError, SaldoInsuficienteError, MontoInvalidoError, CuentaInactivaError) as e:
                print(f"❌ Error: {e}")
        
        elif opcion == 4:
            # Transferencia
            if len(clientes) < 2:
                print("Necesitas al menos 2 clientes")
                continue
            
            try:
                for i, c in enumerate(clientes):
                    print(f"{i+1}. {c.nombre}")
                
                idx_origen = int(input("Cuenta origen: ")) - 1
                idx_destino = int(input("Cuenta destino: ")) - 1
                monto = float(input("Monto: "))
                
                origen = clientes[idx_origen].cuenta
                destino = clientes[idx_destino].cuenta
                
                saldo_origen, saldo_destino = origen.transferir(monto, destino)
                print(f"\n✅ Transferencia exitosa")
                print(f"Origen: {Utils.formatear_moneda(saldo_origen)}")
                print(f"Destino: {Utils.formatear_moneda(saldo_destino)}")
                
            except (IndexError, ValueError, SaldoInsuficienteError, MontoInvalidoError, CuentaInactivaError) as e:
                print(f"❌ Error: {e}")
        
        elif opcion == 5:
            # Detalles de cuenta
            if not clientes:
                print("No hay clientes")
                continue
            
            for i, c in enumerate(clientes):
                print(f"{i+1}. {c.nombre}")
            
            try:
                idx = int(input("Selecciona cliente: ")) - 1
                print(clientes[idx].cuenta.mostrar_detalles())
            except (IndexError, ValueError) as e:
                print(f"❌ Error: {e}")
        
        elif opcion == 6:
            # Resumen global
            CuentaBancaria.mostrar_resumen_global()
        
        elif opcion == 7:
            print("\n👋 Gracias por usar Mini-Bank!")
            break
        
        else:
            print("Opción inválida")
        
        pausa()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n👋 Programa interrumpido por usuario")
    except Exception as e:
        print(f"\n💥 Error crítico: {e}")
        import traceback
        traceback.print_exc()
```

---

## ✅ Módulo 10: Mejores Prácticas y Consejos Finales

### 10.1 Convenciones de Nomenclatura

```python
# ✅ Bien
variable_nombre = "Ana"        # snake_case para variables y funciones
PI = 3.14159                   # UPPER_CASE para constantes
class CuentaBancaria:          # PascalCase para clases
    def calcular_saldo(self):  # snake_case para métodos
        pass

# ❌ Mal
VariableNombre = "Ana"         # CamelCase no es Pythonico
variableNombre = "Ana"         # tampoco
class cuentabancaria:          # minúscula para clase
    def CalcularSaldo(self):   # PascalCase para método
        pass
```

### 10.2 Type Hints - Anotaciones de Tipo

```python
def sumar(a: int, b: int) -> int:
    return a + b

def procesar_datos(nombre: str, edad: int, activo: bool = True) -> dict:
    return {"nombre": nombre, "edad": edad, "activo": activo}

from typing import List, Dict, Tuple, Optional, Union

def calcular_estadisticas(numeros: List[float]) -> Tuple[float, float]:
    return sum(numeros), len(numeros)

def buscar_usuario(id: int) -> Optional[dict]:
    # Puede retornar dict o None
    if id > 0:
        return {"id": id, "nombre": "Ana"}
    return None

def procesar(valor: Union[int, float, str]) -> str:
    # Acepta múltiples tipos
    return str(valor)
```

### 10.3 DRY - Don't Repeat Yourself

```python
# ❌ Mal: código repetido
def calcular_area_cuadrado(lado):
    return lado * lado

def calcular_area_rectangulo(base, altura):
    return base * altura

def calcular_area_triangulo(base, altura):
    return base * altura / 2

# ✅ Bien: función genérica
def calcular_area(figura, **medidas):
    if figura == "cuadrado":
        return medidas["lado"] ** 2
    elif figura == "rectangulo":
        return medidas["base"] * medidas["altura"]
    elif figura == "triangulo":
        return medidas["base"] * medidas["altura"] / 2

# Uso
print(calcular_area("cuadrado", lado=5))
print(calcular_area("triangulo", base=4, altura=3))
```

### 10.4 Documentación - Docstrings

```python
def calcular_descuento(precio, porcentaje):
    """
    Calcula el precio final después de aplicar un descuento.
    
    Args:
        precio (float): Precio original del producto
        porcentaje (float): Porcentaje de descuento (0-100)
    
    Returns:
        float: Precio final con descuento aplicado
    
    Raises:
        ValueError: Si el precio o porcentaje son negativos
        TypeError: Si los parámetros no son numéricos
    
    Example:
        >>> calcular_descuento(100, 10)
        90.0
        >>> calcular_descuento(250, 25)
        187.5
    """
    if precio < 0 or porcentaje < 0:
        raise ValueError("Precio y porcentaje deben ser positivos")
    
    descuento = precio * (porcentaje / 100)
    return precio - descuento
```

### 10.5 Breakpoints y Debug

```python
# Usando print (básico)
def funcion_compleja(x):
    print(f"Debug: x = {x}")
    resultado = x * 2
    print(f"Debug: resultado = {resultado}")
    return resultado

# Usando breakpoint() (Python 3.7+)
def funcion_problema(y):
    breakpoint()  # Inicia debugger interactivo
    valor = y ** 2
    return valor / 0

# En el debugger puedes escribir:
# - `y` -> ver valor de y
# - `c` -> continuar
# - `q` -> salir
# - `p variable` -> imprimir variable
```

### 10.6 Checklist de Verificación Final

Antes de compartir tu código:
- [ ] Entorno virtual creado y activado
- [ ] `requirements.txt` actualizado con `pip freeze > requirements.txt`
- [ ] Código sigue PEP 8 (snake_case, 4 espacios)
- [ ] Funciones tienen docstrings
- [ ] Excepciones manejadas con try/except
- [ ] Archivos se abren con `with` y encoding
- [ ] Variables sensibles en `.env` (usando python-dotenv)
- [ ] Código probado con múltiples casos de prueba
- [ ] README.md con instrucciones de instalación
- [ ] `.gitignore` incluye `__pycache__/`, `.venv/`, `*.pyc`

---

## 🎯 Tabla de Referencia Rápida

| Concepto | Sintaxis Básica | Uso Principal |
|----------|-----------------|---------------|
| **Listas** | `lista = []` | Colecciones ordenadas, mutables |
| **Diccionarios** | `dict = {}` | Pares clave-valor |
| **Tuplas** | `tupla = ()` | Colecciones inmutables, claves de dict |
| **Sets** | `set = set()` | Elementos únicos, operaciones de conjunto |
| **For Loop** | `for x in seq:` | Iterar secuencias |
| **While Loop** | `while cond:` | Iterar mientras condición sea True |
| **Funciones** | `def f():` | Reutilizar código |
| **Args** | `def f(*args):` | Parámetros variables posicionales |
| **Kwargs** | `def f(**kwargs):` | Parámetros variables nombrados |
| **Clases** | `class C:` | POO, plantilla de objetos |
| **@property** | `@property def x(self):` | Getters y setters |
| **Try/Except** | `try: ... except:` | Manejo de errores |
| **pathlib** | `Path("archivo")` | Manejo moderno de archivos |
| **NumPy** | `np.array([...])` | Arrays numéricos eficientes |
| **Pandas** | `pd.DataFrame(...)` | Datos tabulares |
| **Matplotlib** | `plt.plot(...)` | Gráficos básicos |
| **Seaborn** | `sns.scatterplot(...)` | Gráficos estadísticos |

---
hhhh

# Python: Control de Flujo Avanzado - Null Safety y Pattern Matching

## 📘 Módulo 11: Operadores Lógicos Avanzados

### 1️⃣ ¿Existe `switch/case` en Python?

**Sí, desde Python 3.10** (lanzado en octubre 2021). Se llama **Structural Pattern Matching** y usa las palabras clave `match`/`case`.

#### **1.1 Sintaxis Básica y Comparación con Java**

```python
# Java (para referencia):
# switch (dia) {
#     case 1: System.out.println("Lunes"); break;
#     case 2: System.out.println("Martes"); break;
#     default: System.out.println("Otro día");
# }

# Python 3.10+: 
dia = 2

match dia:
    case 1:
        print("Lunes")
    case 2:
        print("Martes")
    case _:
        print("Día inválido")
```

**Diferencias clave:**
- **No hay `break`**: Python no tiene *fall-through* automático. Solo ejecuta el primer `case` que coincida.
- **`case _`** es el equivalente a `default`.
- **Requiere Python ≥ 3.10**. Si usas Python 3.9 o anterior, NO está disponible.

#### **1.2 Múltiples Valores en un Solo `case`**

```python
match dia:
    case 6 | 7:  # El operador | funciona como OR
        print("Fin de semana")
    case 1:
        print("Lunes laborable")
    case 2 | 3 | 4 | 5:
        print("Entre semana")
    case _:
        print("Día no válido")
```

#### **1.3 Condiciones Adicionales (Guards)**

Python permite añadir condiciones `if` dentro del `case`, algo que Java no hace nativamente:

```python
edad = 20

match edad:
    case x if x < 18:
        print("Menor de edad")
    case x if x < 65:
        print("Adulto trabajador")
    case _:
        print("Adulto mayor")
```

#### **1.4 Pattern Matching con Estructuras (Tuplas, Listas)**

Esta es la verdadera potencia que Java no tiene:

```python
punto = (0, 5)

match punto:
    case (0, 0):
        print("Origen exacto")
    case (0, y):
        print(f"Eje Y en posición {y}")
    case (x, 0):
        print(f"Eje X en posición {x}")
    case (x, y):
        print(f"Punto en coordenadas ({x}, {y})")

# Con listas
config = ["debug", "verbose"]

match config:
    case ["debug"]:
        print("Modo debug básico")
    case ["debug", "verbose"]:
        print("Debug detallado")
    case ["release"]:
        print("Modo producción")
    case _:
        print("Configuración desconocida")
```

#### **1.5 Alternativa Clásica (Python < 3.10)**

Si tu proyecto usa Python 3.9 o anterior, usa **diccionarios de funciones**:

```python
def lunes(): return "Inicio de la semana"
def martes(): return "Segundo día"
def default(): return "Día no reconocido"

# Mapeo switch-case manual
switcher = {
    1: lunes,
    2: martes,
    3: lambda: "Miércoles",
    4: lambda: "Jueves"
}

dia = 2
resultado = switcher.get(dia, default)()
print(resultado)  # "Segundo día"
```

---

### 2️⃣ ¿Cómo se hace `!` (NOT) en Python?

**Muy simple: con la palabra clave `not`**. El símbolo `!` solo existe dentro de `!=` (distinto).

```python
# ❌ Esto NO funciona en Python:
# if !activo:  
#     print("No activo")

# ✅ Pythonic way:
activo = False
if not activo:
    print("No está activo")

# ✅ Con paréntesis para claridad:
if not (activo and conectado):
    print("Falta alguna condición")
```

#### **2.1 Tabla Completa: Java vs Python**

| Operación Lógica | Java | Python | Ejemplo |
|------------------|------|--------|---------|
| NOT | `!cond` | `not cond` | `if not activo:` |
| AND | `&&` | `and` | `if a and b:` |
| OR | `||` | `or` | `if x or y:` |
| Distinto de | `!=` | `!=` | `if x != 5:` |

#### **2.2 Negación de Comparaciones**

```python
# Java: if (!(x > 5))
# Python:
if not (x > 5):
    print("x NO es mayor que 5")

# **PERO** lo más Pythonico es invertir la condición:
if x <= 5:
    print("x es menor o igual que 5")
```

#### **2.3 Uso con None**

```python
# Para saber si algo NO es None:
usuario = None

if not usuario:  # ⚠️ Cuidado: también da True para 0, [], ""
    print("No hay usuario")

# Correcto:
if usuario is not None:
    print("Usuario existe")
```

---

### 3️⃣ `not in` vs `is not` - La Distinción Crítica

Esta diferencia es **fundamental** y causa bugs silenciosos si no se entiende bien.

#### **3.1 `not in` - Pertenencia**

Verifica si **un elemento NO está dentro de una colección**. Es equivalente a `!collection.contains(x)` en Java.

```python
# Lista de permisos
permisos = ["read", "write", "execute"]

# Verificar si NO tiene permiso de admin
if "admin" not in permisos:
    print("Acceso denegado: se requiere rol admin")

# Strings (subcadena)
email = "user@gmail.com"
if "@" not in email:
    print("Email inválido: falta @")

# Diccionarios (busca en claves)
config = {"debug": True, "verbose": False}
if "production" not in config:
    print("Modo producción no configurado")
```

**Error común:**
```python
# ❌ Esto compila pero no hace lo esperado:
if value not in None:  # TypeError: argument of type 'NoneType' is not iterable
```

#### **3.2 `is not` - Identidad**

Verifica si **dos variables NO apuntan al mismo objeto en memoria**. Es el equivalente a `obj1 != obj2` para referencias en Java.

**Use case principal: comparación con `None`**

```python
# Búsqueda en base de datos
usuario = buscar_usuario("123")

# ✅ Correcto Pythonico:
if usuario is not None:
    print(f"Bienvenido {usuario.nombre}")
else:
    print("Usuario no encontrado")

# ❌ No es Pythonico (aunque funciona):
if usuario != None:
    print("Usuario existe")
```

**Otros usos de `is not`:**
```python
# Comparar si dos listas son el objeto EXACTO (no solo iguales)
lista1 = [1, 2, 3]
lista2 = lista1  # Misma referencia
lista3 = [1, 2, 3]  # Nueva lista con mismos valores

if lista1 is not lista2:
    print("Son objetos diferentes")  # NO se imprime

if lista1 is not lista3:
    print("Son objetos diferentes")  # Sí se imprime (referencias distintas)

if lista1 == lista3:
    print("Pero tienen el mismo contenido")  # Sí se imprime
```

#### **3.3 Tabla de Decisiones**

| Quieres saber si... | Usa | Ejemplo | No Uses |
|---------------------|-----|---------|---------|
| Elemento no está en lista | `not in` | `"admin" not in roles` | `== False` |
| Variable no es None | `is not None` | `user is not None` | `!= None` |
| Objeto no es True | `is not True` | `flag is not True` | `!= True` |
| Valor es diferente | `!=` | `contador != 0` | `is not` (para tipos primitivos) |

---

### 4️⃣ Truthy/Falsy - La Magia y el Peligro de Python

En contextos booleanos (`if`, `while`), Python **autoconvierte** valores automáticamente.

#### **4.1 Valores Falsy (se evalúan como `False`)**

```python
# Todos estos son "falsy":
False
None
0
0.0
0j  # número complejo cero
""  # string vacío
[]  # lista vacía
{}  # diccionario vacío
set()  # set vacío
tuple()  # tupla vacía
```

**Ejemplos de evaluación:**
```python
if []:
    print("No se imprime")  # La lista vacía es falsy

if "":
    print("No se imprime")  # String vacío es falsy

if 0:
    print("No se imprime")  # Cero es falsy

# PERO
if [0]:
    print("Sí se imprime")  # Lista con un cero NO es vacía → truthy
```

#### **4.2 Valores Truthy (se evalúan como `True`)**

**Todo lo demás**, incluyendo objetos con contenido, números distintos de cero, strings no vacíos, etc.

```python
# Truthy examples:
True
1
-5
3.14
"hola"
[1, 2, 3]
{"key": "value"}
(1, 2)
```

#### **4.3 Uso Práctico y Pitfalls**

**✅ Correcto: verificar si lista tiene elementos**

```python
usuarios = []  # Lista vacía

# Pythonico:
if not usuarios:
    print("No hay usuarios para procesar")

# NO Pythonico:
if len(usuarios) == 0:
    print("No hay usuarios")
```

**⚠️ Peligroso: diferenciar `None` de `0` vacío**

```python
def procesar_dato(valor):
    # ❌ ERROR: Si valor=0 (válido), no entra al if
    if valor:
        print(f"Procesando {valor}")
    
    # ✅ CORRECTO: Solo verifica que no sea None
    if valor is not None:
        print(f"Procesando {valor}")

# Llamadas:
procesar_dato(None)  # No procesa
procesar_dato(0)     # Sí procesa (correcto)
procesar_dato("")    # Sí procesa (correcto, string vacío es válido)
```

#### **4.4 Regla de Oro para `None` vs "Vacío"**

| Intención | Código | Funciona con `None` | Funciona con `0`/`""`/`[]` |
|-----------|--------|---------------------|---------------------------|
| Verificar existencia | `if x is not None:` | ✅ Sí | ✅ Sí (entra si `x=0`) |
| Verificar contenido | `if x:` | ❌ No (si es None) | ✅ Sí (entra si `x=0`) |
| Verificar contenido sin None | `if x is not None and x:` | ✅ Excluye None | ✅ Excluye vacío |

---

### 5️⃣ Usando `raise` - Lanzando Excepciones

`raise` es el equivalente a `throw` en Java. Le dice a Python: "detén la ejecución y maneja este error".

#### **5.1 Sintaxis Básica**

```python
# Lanzar excepción con mensaje
raise ValueError("Edad no puede ser negativa")

# Lanzar con datos adicionales
raise ValueError(f"Edad inválida: {edad}")
```

#### **5.2 Dónde Usar `raise`**

**Validación de entrada:**
```python
def crear_usuario(nombre, edad):
    if not nombre:  # Truthy: string vacío es falsy
        raise ValueError("Nombre no puede estar vacío")
    
    if edad < 0:
        raise ValueError(f"Edad inválida: {edad}")
    
    return {"nombre": nombre, "edad": edad}
```

**Validación de negocio:**
```python
def retirar_dinero(saldo, cantidad):
    if cantidad > saldo:
        raise SaldoInsuficienteError(saldo, cantidad)
    
    return saldo - cantidad
```

**Comprobación de existencia:**
```python
def buscar_producto(id):
    producto = db.buscar(id)
    if producto is None:
        raise ProductoNoEncontradoError(id)
    return producto
```

#### **5.3 Relación con `None` y Truthy/Falsy**

```python
def procesar_config(config):
    # Si config=None, esto lanza TypeError
    if not config:
        raise ValueError("Configuración no proporcionada")
    
    # Si config=None, esto es explícito
    if config is None:
        raise ValueError("Configuración es None")
    
    # Si config={} vacío, esto es explícito
    if not config:
        raise ValueError("Configuración vacía")
```

---

### 6️⃣ Proyecto Práctico: Validador de Configuración

```python
"""
validador.py
Demuestra el uso de todos los conceptos: is not, not in, truthy, raise
"""

class ConfiguracionInvalidaError(Exception):
    """Configuración no cumple requisitos."""
    pass

def validar_configuracion(config):
    """
    Valida que config sea un dict con claves obligatorias.
    
    Raises:
        ConfiguracionInvalidaError: Si config es None o incompleta
        ValueError: Si valores son inválidos
    """
    # 1. Verificar existencia (is not None)
    if config is None:
        raise ConfiguracionInvalidaError("Configuración es None")
    
    # 2. Verificar que no está vacía (truthy)
    if not config:  # {} es falsy
        raise ConfiguracionInvalidaError("Configuración vacía")
    
    # 3. Verificar claves obligatorias (not in)
    obligatorias = ["host", "port", "user"]
    for clave in obligatorias:
        if clave not in config:
            raise ConfiguracionInvalidaError(f"Falta clave: {clave}")
    
    # 4. Validar valores (truthy y comparación)
    if not config["host"]:  # host="" o host=0 sería falsy
        raise ValueError("Host no puede estar vacío")
    
    if config["port"] <= 0:
        raise ValueError("Puerto debe ser positivo")
    
    return True

# Uso correcto:
config_ok = {
    "host": "localhost",
    "port": 8080,
    "user": "admin"
}

# Uso incorrecto (demostrar excepciones):
try:
    validar_configuracion(None)  # is None
except ConfiguracionInvalidaError as e:
    print(f"❌ {e}")

try:
    validar_configuracion({})  # truthy falso
except ConfiguracionInvalidaError as e:
    print(f"❌ {e}")

try:
    validar_configuracion({"host": "localhost"})  # not in
except ConfiguracionInvalidaError as e:
    print(f"❌ {e}")

try:
    validar_configuracion(config_ok)  # ✅ Correcto
    print("✅ Configuración válida")
except Exception as e:
    print(f"❌ {e}")
```

---
