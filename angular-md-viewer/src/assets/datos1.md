
## 📦 Módulo 12: Librerías Esenciales de Python para Ciencia de Datos y Automatización Web

1. requests - El Cliente HTTP de Python (#1-requests)
2. pandas - La Librería de Análisis de Datos (#2-pandas)

---

## 1. requests - El Cliente HTTP de Python {#1-requests}

### 📚 Teoría Fundamental

**requests** es la librería HTTP más popular de Python, diseñada para humanos. Simplifica enormemente las peticiones web, eliminando la complejidad de librerías como `urllib`.

**Conceptos Clave:**

* **HTTP**: Protocolo de transferencia de hipertexto
* **Métodos**: GET (obtener), POST (enviar), PUT (actualizar), DELETE (eliminar)
* **Status Codes**: 200 (éxito), 404 (no encontrado), 500 (error servidor)
* **Headers**: Metadatos de la petición/resuesta
* **Parámetros**: Datos enviados en la URL
* **Payload**: Datos enviados en el cuerpo de la petición

### 🛠️ Instalación y Configuración

```bash
pip install requests

```

### 📖 Uso Paso a Paso

#### 1. Petición GET Básica

```python
import requests

# Paso 1: Importar la librería
import requests

# Paso 2: Hacer la petición
response = requests.get('https://api.github.com')

# Paso 3: Verificar el estado
print(f"Status Code: {response.status_code}")  # 200 significa éxito

# Paso 4: Acceder a los datos
print(f"Content Type: {response.headers['content-type']}")
print(f"Content: {response.text[:100]}...")  # Primeros 100 caracteres

```

#### 2. Petición con Parámetros

```python
# Búsqueda de repositorios en GitHub
params = {
    'q': 'python requests',
    'sort': 'stars',
    'order': 'desc'
}

response = requests.get('https://api.github.com/search/repositories', params=params)

# Los parámetros se codifican automáticamente en la URL
print(f"URL final: {response.url}")
# Output: https://api.github.com/search/repositories?q=python+requests&sort=stars&order=desc

# Acceder a los resultados
data = response.json()
print(f"Total repositories found: {data['total_count']}")

```

#### 3. Petición POST con JSON

```python
# Crear un nuevo post (API de prueba)
url = 'https://jsonplaceholder.typicode.com/posts'

# Datos a enviar
new_post = {
    'title': 'Mi Primer Post',
    'body': 'Este es el contenido de mi post',
    'userId': 1
}

# Headers para indicar que enviamos JSON
headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer tu_token_aqui'  # Si necesitas autenticación
}

# Realizar la petición POST
response = requests.post(url, json=new_post, headers=headers)

print(f"Status Code: {response.status_code}")  # 201 = Created
print(f"Response: {response.json()}")

```

#### 4. Manejo de Errores y Timeouts

```python
try:
    # Timeout de 5 segundos
    response = requests.get('https://httpbin.org/delay/10', timeout=5)
    response.raise_for_status()  # Lanza excepción si hay error HTTP
    
except requests.exceptions.Timeout:
    print("La petición tardó demasiado tiempo")
    
except requests.exceptions.HTTPError as err:
    print(f"Error HTTP: {err}")
    
except requests.exceptions.RequestException as err:
    print(f"Error en la petición: {err}")

```

#### 5. Sesiones y Cookies

```python
# Mantener cookies entre peticiones
session = requests.Session()

# Primera petición que establece cookies
response1 = session.get('https://httpbin.org/cookies/set/testcookie/12345')
print(f"Cookies después de primera petición: {session.cookies.get_dict()}")

# Segunda petición automáticamente incluye las cookies
response2 = session.get('https://httpbin.org/cookies')
print(f"Respuesta con cookies: {response2.json()}")

```

### 💡 Ejemplos Prácticos de Implementación

#### Ejemplo 1: Scraper de Clima

```python
import requests
from datetime import datetime

def obtener_clima(ciudad):
    """
    Obtiene el clima actual usando OpenWeatherMap API
    """
    API_KEY = "tu_api_key_aqui"
    BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
    
    params = {
        'q': ciudad,
        'appid': API_KEY,
        'units': 'metric',  # Celsius
        'lang': 'es'
    }
    
    try:
        response = requests.get(BASE_URL, params=params)
        response.raise_for_status()
        
        data = response.json()
        
        clima = {
            'ciudad': data['name'],
            'temperatura': data['main']['temp'],
            'descripcion': data['weather'][0]['description'],
            'humedad': data['main']['humidity'],
            'velocidad_viento': data['wind']['speed'],
            'hora_actualizacion': datetime.fromtimestamp(data['dt'])
        }
        
        return clima
        
    except requests.exceptions.RequestException as e:
        print(f"Error obteniendo clima: {e}")
        return None

# Uso
clima_madrid = obtener_clima("Madrid")
if clima_madrid:
    print(f"""
    Clima en {clima_madrid['ciudad']}:
    Temperatura: {clima_madrid['temperatura']}°C
    Descripción: {clima_madrid['descripcion']}
    Humedad: {clima_madrid['humedad']}%
    Viento: {clima_madrid['velocidad_viento']} m/s
    """)

```

#### Ejemplo 2: Descargador de Imágenes

```python
import requests
import os
from urllib.parse import urlparse

def descargar_imagen(url, carpeta_destino="imagenes"):
    """
    Descarga una imagen desde una URL y la guarda localmente
    """
    try:
        # Crear carpeta si no existe
        os.makedirs(carpeta_destino, exist_ok=True)
        
        # Obtener el nombre del archivo desde la URL
        parsed_url = urlparse(url)
        nombre_archivo = os.path.basename(parsed_url.path)
        
        if not nombre_archivo:
            nombre_archivo = "imagen_descargada.jpg"
        
        # Ruta completa
        ruta_completa = os.path.join(carpeta_destino, nombre_archivo)
        
        # Descargar la imagen en chunks para archivos grandes
        response = requests.get(url, stream=True)
        response.raise_for_status()
        
        # Verificar que es una imagen
        content_type = response.headers.get('content-type', '')
        if not content_type.startswith('image/'):
            print(f"La URL no contiene una imagen: {content_type}")
            return None
        
        # Guardar el archivo
        with open(ruta_completa, 'wb') as archivo:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    archivo.write(chunk)
        
        print(f"Imagen descargada: {ruta_completa}")
        return ruta_completa
        
    except requests.exceptions.RequestException as e:
        print(f"Error descargando imagen: {e}")
        return None

# Uso
url_imagen = "https://picsum.photos/400/300"
ruta_imagen = descargar_imagen(url_imagen)

```

### 📋 Resumen de Funciones requests

| Función                   | Descripción                   | Ejemplo                                               |
| `requests.get()`          | Petición HTTP GET             | `requests.get('https://api.com/data')`                |
| `requests.post()`         | Petición HTTP POST            | `requests.post('https://api.com/data', json=payload)` |
| `requests.put()`          | Petición HTTP PUT             | `requests.put('https://api.com/data/1', json=update)` |
| `requests.delete()`       | Petición HTTP DELETE          | `requests.delete('https://api.com/data/1')`           |
| `response.json()`         | Parsear respuesta JSON        | `data = response.json()`                              |        
| `response.text`           | Obtener respuesta como texto  | `html = response.text`                                |
| `response.content`        | Obtener respuesta como bytes  | `image_bytes = response.content`                      |
| `response.status_code`    | Código de estado HTTP         | `if response.status_code == 200:`                     |
| `response.headers`        | Headers de la respuesta       | `content_type = response.headers['content-type']`     |
| `requests.Session()`      | Crear sesión persistente      | `session = requests.Session()`                        |

---

## 2. pandas - La Librería de Análisis de Datos {#2-pandas}

### 📚 Teoría Fundamental

**pandas** es la librería fundamental para análisis y manipulación de datos en Python. Proporciona estructuras de datos rápidas, flexibles y expresivas diseñadas para trabajar con datos "relacionales" o "etiquetados".

**Estructuras de Datos Principales:**

* **Series**: Array unidimensional etiquetado (similar a una columna)
* **DataFrame**: Estructura tabular 2D con filas y columnas etiquetadas
* **Index**: Array inmutable para etiquetar ejes

**Conceptos Clave:**

* **Vectorización**: Operaciones sin bucles explícitos
* **Broadcasting**: Operaciones entre estructuras de diferentes tamaños
* **NaN**: Not a Number - representa valores faltantes
* **Dtypes**: Tipos de datos (int64, float64, object, datetime64, etc.)

### 🛠️ Instalación y Configuración

```bash
pip install pandas

```

```python
import pandas as pd
import numpy as np

# Configuración para mostrar más columnas/filas
pd.set_option('display.max_columns', None)
pd.set_option('display.max_rows', 100)
pd.set_option('display.max_colwidth', None)

```

### 📖 Uso Paso a Paso

#### 1. Creación de DataFrames

```python
# Método 1: Desde diccionario
data = {
    'Nombre': ['Ana', 'Carlos', 'María', 'Juan'],
    'Edad': [25, 30, 35, 28],
    'Ciudad': ['Madrid', 'Barcelona', 'Valencia', 'Sevilla'],
    'Salario': [2500.50, 3000.00, 2800.75, 2200.00]
}

df = pd.DataFrame(data)
print("DataFrame creado:")
print(df)

# Método 2: Desde lista de listas
data2 = [
    ['Producto A', 100, 15.99],
    ['Producto B', 150, 22.50],
    ['Producto C', 75, 8.75]
]
df2 = pd.DataFrame(data2, columns=['Producto', 'Stock', 'Precio'])
print("\nDataFrame desde lista:")
print(df2)

# Método 3: Desde archivo CSV
# df = pd.read_csv('archivo.csv')

# Método 4: Desde Excel
# df = pd.read_excel('archivo.xlsx', sheet_name='Hoja1')

```

#### 2. Exploración de Datos

```python
# Dataset de ejemplo más grande
np.random.seed(42)
fechas = pd.date_range('2023-01-01', periods=100, freq='D')
ventas = {
    'Fecha': fechas,
    'Producto': np.random.choice(['A', 'B', 'C', 'D'], 100),
    'Cantidad': np.random.randint(1, 20, 100),
    'Precio_Unitario': np.random.uniform(10, 50, 100).round(2),
    'Region': np.random.choice(['Norte', 'Sur', 'Este', 'Oeste'], 100)
}

df_ventas = pd.DataFrame(ventas)
df_ventas['Total'] = df_ventas['Cantidad'] * df_ventas['Precio_Unitario']

# Exploración básica
print("=== EXPLORACIÓN DE DATOS ===")
print(f"Forma del DataFrame: {df_ventas.shape}")
print(f"Columnas: {list(df_ventas.columns)}")
print(f"Tipos de datos:\n{df_ventas.dtypes}")
print(f"Primeras 5 filas:\n{df_ventas.head()}")
print(f"Últimas 5 filas:\n{df_ventas.tail()}")

# Información estadística
print(f"\nResumen estadístico:\n{df_ventas.describe()}")

# Información general
print(f"\nInformación general:")
print(df_ventas.info())

```

#### 3. Selección y Filtrado

```python
# Selección de columnas
print("=== SELECCIÓN DE DATOS ===")

# Una columna (devuelve Series)
productos = df_ventas['Producto']
print(f"Tipo de una columna: {type(productos)}")

# Múltiples columnas (devuelve DataFrame)
subset = df_ventas[['Producto', 'Cantidad', 'Total']]
print(f"\nTipo de múltiples columnas: {type(subset)}")

# Filtrado por condiciones
print("\n=== FILTRADO ===")

# Ventas mayores a 500
ventas_altas = df_ventas[df_ventas['Total'] > 500]
print(f"Ventas mayores a 500: {len(ventas_altas)} registros")

# Producto A en la región Norte
producto_a_norte = df_ventas[(df_ventas['Producto'] == 'A') & (df_ventas['Region'] == 'Norte')]
print(f"Producto A en Norte: {len(producto_a_norte)} registros")

# Múltiples condiciones con query
resultado_query = df_ventas.query('Producto == "A" and Cantidad > 10')
print(f"Query - Producto A con cantidad > 10: {len(resultado_query)} registros")

# Filtro con isin
productos_seleccionados = df_ventas[df_ventas['Producto'].isin(['A', 'C'])]
print(f"Productos A y C: {len(productos_seleccionados)} registros")

```

#### 4. Agrupación y Agregación

```python
print("=== AGRUPACIÓN Y AGREGACIÓN ===")

# Agrupar por producto y calcular estadísticas
ventas_por_producto = df_ventas.groupby('Producto').agg({
    'Cantidad': ['sum', 'mean', 'count'],
    'Total': ['sum', 'mean', 'max']
}).round(2)

print("Ventas por producto:")
print(ventas_por_producto)

# Agrupar por múltiples columnas
ventas_producto_region = df_ventas.groupby(['Producto', 'Region']).agg({
    'Total': 'sum',
    'Cantidad': 'sum'
}).reset_index()

print("\nVentas por producto y región:")
print(ventas_producto_region.head(10))

# Pivot table
pivot = df_ventas.pivot_table(
    values='Total', 
    index='Producto', 
    columns='Region', 
    aggfunc='sum',
    fill_value=0
)
print("\nTabla pivot:")
print(pivot)

```

#### 5. Limpieza de Datos

```python
# Crear DataFrame con datos faltantes y duplicados
df_sucio = pd.DataFrame({
    'ID': [1, 2, 3, 4, 5, 3],  # ID 3 duplicado
    'Nombre': ['Ana', 'Carlos', None, 'María', 'Juan', 'Pedro'],
    'Edad': [25, None, 35, 28, 22, 35],
    'Email': ['ana@mail.com', 'carlos@mail.com', 'luis@mail.com', None, 'juan@mail.com', 'pedro@mail.com']
})

print("=== LIMPIEZA DE DATOS ===")
print("DataFrame original:")
print(df_sucio)

# Eliminar duplicados
df_limpio = df_sucio.drop_duplicates(subset=['ID'], keep='first')
print(f"\nDespués de eliminar duplicados: {df_limpio.shape}")

# Manejar valores faltantes
print(f"\nValores faltantes por columna:\n{df_limpio.isnull().sum()}")

# Opción 1: Eliminar filas con valores faltantes
df_sin_na = df_limpio.dropna()
print(f"\nDespués de eliminar filas con NA: {df_sin_na.shape}")

# Opción 2: Llenar valores faltantes
df_llenado = df_limpio.copy()
df_llenado['Edad'].fillna(df_llenado['Edad'].mean(), inplace=True)
df_llenado['Nombre'].fillna('Desconocido', inplace=True)
df_llenado['Email'].fillna('sin_email@mail.com', inplace=True)

print("\nDespués de llenar valores faltantes:")
print(df_llenado)

# Validación de datos
# Verificar emails válidos
import re
def validar_email(email):
    patron = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return bool(re.match(patron, email))

df_llenado['Email_Valido'] = df_llenado['Email'].apply(validar_email)
print(f"\nEmails válidos: {df_llenado['Email_Valido'].sum()}")

```

#### 6. Merge y Join

```python
# Crear DataFrames de ejemplo
clientes = pd.DataFrame({
    'Cliente_ID': [1, 2, 3, 4, 5],
    'Nombre': ['Ana', 'Carlos', 'María', 'Juan', 'Lucía'],
    'Ciudad': ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao']
})

pedidos = pd.DataFrame({
    'Pedido_ID': [101, 102, 103, 104, 105, 106],
    'Cliente_ID': [1, 2, 3, 1, 4, 99],  # 99 no existe en clientes
    'Producto': ['A', 'B', 'C', 'A', 'D', 'E'],
    'Cantidad': [2, 1, 3, 5, 1, 2]
})

print("=== MERGE Y JOIN ===")
print("DataFrame Clientes:")
print(clientes)
print("\nDataFrame Pedidos:")
print(pedidos)

# Inner join (solo coincidencias)
inner_join = pd.merge(clientes, pedidos, on='Cliente_ID', how='inner')
print(f"\nInner Join: {inner_join.shape}")
print(inner_join)

# Left join (todos los clientes, incluso sin pedidos)
left_join = pd.merge(clientes, pedidos, on='Cliente_ID', how='left')
print(f"\nLeft Join: {left_join.shape}")
print(left_join)

# Right join (todos los pedidos, incluso sin cliente)
right_join = pd.merge(clientes, pedidos, on='Cliente_ID', how='right')
print(f"\nRight Join: {right_join.shape}")
print(right_join)

# Outer join (todos los registros)
outer_join = pd.merge(clientes, pedidos, on='Cliente_ID', how='outer')
print(f"\nOuter Join: {outer_join.shape}")
print(outer_join)

```

### 💡 Ejemplos Prácticos de Implementación

#### Ejemplo 1: Análisis de Ventas Mensuales

```python
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

def analizar_ventas_mensuales():
    """
    Análisis completo de ventas mensuales con múltiples métricas
    """
    # Generar datos de ejemplo
    np.random.seed(42)
    start_date = datetime(2023, 1, 1)
    dates = [start_date + timedelta(days=x) for x in range(365)]
    
    ventas_data = []
    for date in dates:
        num_ventas = np.random.poisson(20)  # Promedio de 20 ventas por día
        for _ in range(num_ventas):
            ventas_data.append({
                'Fecha': date,
                'Producto': np.random.choice(['Laptop', 'Mouse', 'Teclado', 'Monitor', 'Impresora']),
                'Categoría': np.random.choice(['Hardware', 'Accesorios', 'Periféricos']),
                'Precio_Venta': np.random.uniform(50, 2000),
                'Costo': np.random.uniform(30, 1500),
                'Cliente': f"Cliente_{np.random.randint(1, 101)}",
                'Vendedor': np.random.choice(['Ana', 'Carlos', 'María', 'Juan'])
            })
    
    df = pd.DataFrame(ventas_data)
    df['Mes'] = df['Fecha'].dt.to_period('M')
    df['Ganancia'] = df['Precio_Venta'] - df['Costo']
    df['Margen'] = (df['Ganancia'] / df['Precio_Venta'] * 100).round(2)
    
    print("=== ANÁLISIS DE VENTAS MENSUALES ===")
    
    # 1. Resumen por mes
    resumen_mensual = df.groupby('Mes').agg({
        'Precio_Venta': ['sum', 'mean', 'count'],
        'Ganancia': 'sum',
        'Margen': 'mean'
    }).round(2)
    
    resumen_mensual.columns = ['Ventas_Totales', 'Precio_Promedio', 'Num_Ventas', 'Ganancia_Total', 'Margen_Promedio']
    print("1. Resumen Mensual:")
    print(resumen_mensual)
    
    # 2. Top productos por mes
    print("\n2. Top 3 Productos por Mes:")
    top_productos = df.groupby(['Mes', 'Producto'])['Precio_Venta'].sum().reset_index()
    top_productos = top_productos.groupby('Mes').apply(lambda x: x.nlargest(3, 'Precio_Venta')).reset_index(drop=True)
    print(top_productos)
    
    # 3. Análisis por vendedor
    print("\n3. Rendimiento por Vendedor:")
    vendedor_stats = df.groupby('Vendedor').agg({
        'Precio_Venta': 'sum',
        'Ganancia': 'sum',
        'Cliente': 'nunique'
    }).round(2)
    vendedor_stats.columns = ['Ventas_Totales', 'Ganancia_Total', 'Clientes_Unicos']
    vendedor_stats['Ganancia_Por_Cliente'] = (vendedor_stats['Ganancia_Total'] / vendedor_stats['Clientes_Unicos']).round(2)
    print(vendedor_stats.sort_values('Ventas_Totales', ascending=False))
    
    # 4. Tendencia de ventas
    print("\n4. Tendencia de Ventas:")
    tendencia = df.groupby('Fecha')['Precio_Venta'].sum().reset_index()
    tendencia['Media_Movil_7'] = tendencia['Precio_Venta'].rolling(window=7).mean()
    tendencia['Media_Movil_30'] = tendencia['Precio_Venta'].rolling(window=30).mean()
    
    # Mostrar últimos 30 días
    print(tendencia.tail(30)[['Fecha', 'Precio_Venta', 'Media_Movil_7', 'Media_Movil_30']])
    
    # 5. Productos con mejor margen
    print("\n5. Productos con Mejor Margen:")
    margen_producto = df.groupby('Producto').agg({
        'Margen': 'mean',
        'Precio_Venta': 'sum'
    }).round(2)
    margen_producto = margen_producto.sort_values('Margen', ascending=False)
    print(margen_producto)
    
    return df

# Ejecutar el análisis
df_ventas = analizar_ventas_mensuales()

```

#### Ejemplo 2: Sistema de Gestión de Inventario

```python
class SistemaInventario:
    """
    Sistema completo de gestión de inventario usando pandas
    """
    
    def __init__(self):
        self.inventario = pd.DataFrame(columns=[
            'SKU', 'Nombre', 'Categoría', 'Stock_Actual', 'Stock_Minimo',
            'Precio_Compra', 'Precio_Venta', 'Proveedor', 'Ultima_Actualizacion'
        ])
        self.movimientos = pd.DataFrame(columns=[
            'SKU', 'Tipo', 'Cantidad', 'Fecha', 'Motivo', 'Usuario'
        ])
    
    def agregar_producto(self, sku, nombre, categoria, stock_inicial, stock_minimo,
                        precio_compra, precio_venta, proveedor):
        """Agregar nuevo producto al inventario"""
        nuevo_producto = pd.DataFrame([{
            'SKU': sku,
            'Nombre': nombre,
            'Categoría': categoria,
            'Stock_Actual': stock_inicial,
            'Stock_Minimo': stock_minimo,
            'Precio_Compra': precio_compra,
            'Precio_Venta': precio_venta,
            'Proveedor': proveedor,
            'Ultima_Actualizacion': pd.Timestamp.now()
        }])
        
        self.inventario = pd.concat([self.inventario, nuevo_producto], ignore_index=True)
        self._registrar_movimiento(sku, 'ENTRADA', stock_inicial, 'Inventario inicial', 'Sistema')
        
        print(f"Producto {nombre} agregado exitosamente")
    
    def _registrar_movimiento(self, sku, tipo, cantidad, motivo, usuario):
        """Registrar movimiento en el historial"""
        nuevo_movimiento = pd.DataFrame([{
            'SKU': sku,
            'Tipo': tipo,
            'Cantidad': cantidad,
            'Fecha': pd.Timestamp.now(),
            'Motivo': motivo,
            'Usuario': usuario
        }])
        
        self.movimientos = pd.concat([self.movimientos, nuevo_movimiento], ignore_index=True)
    
    def actualizar_stock(self, sku, cantidad, tipo, motivo, usuario):
        """Actualizar stock de un producto"""
        if sku not in self.inventario['SKU'].values:
            print(f"Error: SKU {sku} no encontrado")
            return False
        
        idx = self.inventario[self.inventario['SKU'] == sku].index[0]
        stock_actual = self.inventario.loc[idx, 'Stock_Actual']
        
        if tipo == 'ENTRADA':
            nuevo_stock = stock_actual + cantidad
        elif tipo == 'SALIDA':
            if cantidad > stock_actual:
                print(f"Error: Stock insuficiente. Disponible: {stock_actual}, Solicitado: {cantidad}")
                return False
            nuevo_stock = stock_actual - cantidad
        else:
            print(f"Error: Tipo de movimiento inválido")
            return False
        
        # Actualizar inventario
        self.inventario.loc[idx, 'Stock_Actual'] = nuevo_stock
        self.inventario.loc[idx, 'Ultima_Actualizacion'] = pd.Timestamp.now()
        
        # Registrar movimiento
        self._registrar_movimiento(sku, tipo, cantidad, motivo, usuario)
        
        print(f"Stock actualizado - SKU: {sku}, Nuevo stock: {nuevo_stock}")
        return True
    
    def generar_reporte_inventario(self):
        """Generar reporte completo de inventario"""
        print("=== REPORTE DE INVENTARIO ===")
        
        # Agregar columnas calculadas
        reporte = self.inventario.copy()
        reporte['Valor_Inventario'] = reporte['Stock_Actual'] * reporte['Precio_Compra']
        reporte['Margen_Ganancia'] = ((reporte['Precio_Venta'] - reporte['Precio_Compra']) / reporte['Precio_Compra'] * 100).round(2)
        reporte['Estado_Stock'] = reporte.apply(
            lambda x: 'CRÍTICO' if x['Stock_Actual'] <= x['Stock_Minimo'] else 'OK', axis=1
        )
        
        # Resumen por categoría
        print("\n1. Resumen por Categoría:")
        resumen_categoria = reporte.groupby('Categoría').agg({
            'Stock_Actual': 'sum',
            'Valor_Inventario': 'sum',
            'SKU': 'count'
        }).round(2)
        resumen_categoria.columns = ['Stock_Total', 'Valor_Total', 'Num_Productos']
        print(resumen_categoria)
        
        # Productos con stock crítico
        print("\n2. Productos con Stock Crítico:")
        stock_critico = reporte[reporte['Estado_Stock'] == 'CRÍTICO'][['SKU', 'Nombre', 'Stock_Actual', 'Stock_Minimo']]
        if len(stock_critico) > 0:
            print(stock_critico)
        else:
            print("No hay productos con stock crítico")
        
        # Top productos por valor
        print("\n3. Top 5 Productos por Valor de Inventario:")
        top_valor = reporte.nlargest(5, 'Valor_Inventario')[['SKU', 'Nombre', 'Stock_Actual', 'Valor_Inventario']]
        print(top_valor)
        
        # Rotación de inventario (basado en movimientos del último mes)
        print("\n4. Rotación de Inventario (último mes):")
        fecha_limite = pd.Timestamp.now() - pd.DateOffset(months=1)
        movimientos_mes = self.movimientos[self.movimientos['Fecha'] >= fecha_limite]
        
        if len(movimientos_mes) > 0:
            rotacion = movimientos_mes.groupby('SKU')['Cantidad'].sum().reset_index()
            rotacion = rotacion.merge(reporte[['SKU', 'Nombre', 'Stock_Actual']], on='SKU')
            rotacion['Rotación'] = (rotacion['Cantidad'] / rotacion['Stock_Actual']).round(2)
            print(rotacion.sort_values('Rotación', ascending=False).head())
        
        return reporte
    
    def analisis_movimientos(self, sku=None, dias=30):
        """Analizar movimientos de inventario"""
        print(f"=== ANÁLISIS DE MOVIMIENTOS ===")
        
        # Filtrar por fecha
        fecha_limite = pd.Timestamp.now() - pd.DateOffset(days=dias)
        movimientos_filtrados = self.movimientos[self.movimientos['Fecha'] >= fecha_limite]
        
        if sku:
            movimientos_filtrados = movimientos_filtrados[movimientos_filtrados['SKU'] == sku]
            print(f"Movimientos para SKU: {sku}")
        
        if len(movimientos_filtrados) == 0:
            print("No hay movimientos en el período especificado")
            return
        
        # Resumen por tipo
        print(f"\n1. Resumen por Tipo (últimos {dias} días):")
        resumen_tipo = movimientos_filtrados.groupby('Tipo')['Cantidad'].agg(['sum', 'count']).round(2)
        resumen_tipo.columns = ['Cantidad_Total', 'Num_Movimientos']
        print(resumen_tipo)
        
        # Movimientos por usuario
        print(f"\n2. Movimientos por Usuario:")
        usuarios = movimientos_filtrados.groupby('Usuario').agg({
            'Cantidad': 'sum',
            'Tipo': 'count'
        }).round(2)
        usuarios.columns = ['Cantidad_Total', 'Num_Movimientos']
        print(usuarios)
        
        # Tendencia temporal
        print(f"\n3. Tendencia Temporal:")
        tendencia = movimientos_filtrados.groupby(movimientos_filtrados['Fecha'].dt.date)['Cantidad'].sum().reset_index()
        print(tendencia.head(10))
        
        return movimientos_filtrados

# Ejemplo de uso del sistema
sistema = SistemaInventario()

# Agregar productos
sistema.agregar_producto('LAP001', 'Laptop HP', 'Electrónica', 50, 10, 800, 1200, 'TechSupplier')
sistema.agregar_producto('MOU001', 'Mouse Logitech', 'Accesorios', 200, 50, 25, 45, 'AccSupplier')
sistema.agregar_producto('TEC001', 'Teclado Mecánico', 'Accesorios', 80, 20, 60, 95, 'AccSupplier')

# Realizar movimientos
sistema.actualizar_stock('LAP001', 5, 'SALIDA', 'Venta a cliente', 'Ana')
sistema.actualizar_stock('MOU001', 30, 'ENTRADA', 'Compra de proveedor', 'Carlos')
sistema.actualizar_stock('TECO1', 10, 'SALIDA', 'Venta mayorista', 'María')  # Error: SKU incorrecto

# Generar reportes
sistema.generar_reporte_inventario()
sistema.analisis_movimientos(dias=7)

```

### 📋 Resumen de Funciones pandas

| Función                   | Descripción                   | Ejemplo                                                         |
| `pd.DataFrame()`          | Crear DataFrame               | `df = pd.DataFrame(data)`                                   |
| `pd.read_csv()`           | Leer archivo CSV              | `df = pd.read_csv('file.csv')`                             |
| `df.head()`               | Primeras filas                | `df.head(10)`                                                |
| `df.info()`               | Información del DataFrame     | `df.info()`                                       |
| `df.describe()`           | Estadísticas descriptivas     | `df.describe()`                                   |
| `df.groupby()`            | Agrupar datos                 | `df.groupby('column').mean()`                                 |
| `df.merge()`              | Unir DataFrames               | `pd.merge(df1, df2, on='key')`                              |
| `df.pivot_table()`        | Crear tabla pivot             | `df.pivot_table(values='val', index='idx', columns='col')`|
| `df.fillna()`             | Llenar valores faltantes      | `df.fillna(0)`                                     |
| `df.dropna()`             | Eliminar valores faltantes    | `df.dropna()`                                    |
| `df.drop_duplicates()`    | Eliminar duplicados           | `df.drop_duplicates()`                                  |
| `df.sort_values()`        | Ordenar valores               | `df.sort_values('column')`                                  |
| `df.apply()`              | Aplicar función               | `df['col'].apply(func)`                                     |
| `df.loc[]`                | Selección por etiqueta        | `df.loc[0:5, 'column']`                              |
| `df.iloc[]`               | Selección por posición        | `df.iloc[0:5, 0:3]`                                  |
| `df.query()`              | Consulta con sintaxis SQL     | `df.query('column > 50')`                         |

---


## 🌐 Módulo 14: beautifulsoup4 - Parsing HTML/XML

**Beautiful Soup** es la librería estándar para extraer datos de archivos HTML y XML. Es fundamental para el *Web Scraping*, permitiendo navegar por el árbol de documentos (DOM) de forma sencilla.

### 14.1 Instalación y Parsers

```bash
# Se recomienda instalar lxml para mayor velocidad
pip install beautifulsoup4 lxml html5lib

```

### 14.2 Uso Paso a Paso e Inspección

#### 1. Parseo y Navegación Básica

```python
from bs4 import BeautifulSoup

html_doc = """
<html>
    <head><title>Página de Prueba</title></head>
    <body>
        <div class="container" id="main">
            <h1 class="titulo">Lista de Productos</h1>
            <ul class="lista">
                <li class="item" data-id="1">Laptop <span class="precio">1200€</span></li>
                <li class="item" data-id="2">Mouse <span class="precio">25€</span></li>
                <li class="item" data-id="3">Teclado <span class="precio">45€</span></li>
            </ul>
            <a href="http://example.com/mas" id="link-mas">Ver más</a>
        </div>
    </body>
</html>
"""

soup = BeautifulSoup(html_doc, 'lxml')

# Acceso directo
print(f"Título: {soup.title.string}")
print(f"H1: {soup.h1.text}")

```

#### 2. Métodos de Búsqueda Avanzados

```python
# Buscar por ID
container = soup.find(id="main")

# Buscar por Clase (class_ para evitar conflicto con palabra reservada)
items = soup.find_all("li", class_="item")

# Seleccionar con CSS (Muy potente)
precios = soup.select(".lista .item .precio")
for p in precios:
    print(f"Precio encontrado: {p.text}")

# Acceder a atributos
enlace = soup.find("a")
print(f"URL: {enlace['href']}")

```

### 14.3 Ejemplos Prácticos de Implementación

#### Ejemplo 1: Scraper de Noticias con Paginación

Este es un ejemplo de cómo estructurar un scraper profesional que maneja errores y limpieza de datos.

```python
import requests
from bs4 import BeautifulSoup
import pandas as pd
import time

class ScraperNoticias:
    def __init__(self, url_base):
        self.url_base = url_base
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        }
        self.datos = []

    def extraer_pagina(self, num_pagina):
        url = f"{self.url_base}/page/{num_pagina}"
        try:
            res = requests.get(url, headers=self.headers, timeout=10)
            res.raise_for_status()
            soup = BeautifulSoup(res.text, 'lxml')
            
            articulos = soup.select("article.post-item")
            for art in articulos:
                titulo = art.select_one("h2.entry-title").text.strip()
                link = art.select_one("a")["href"]
                resumen = art.select_one(".excerpt").text.strip()
                
                self.datos.append({
                    "titulo": titulo,
                    "url": link,
                    "resumen": resumen,
                    "fecha_captura": pd.Timestamp.now()
                })
            return True
        except Exception as e:
            print(f"Error en página {num_pagina}: {e}")
            return False

    def ejecutar(self, max_paginas=5):
        for i in range(1, max_paginas + 1):
            print(f"Scrapeando página {i}...")
            if not self.extraer_pagina(i):
                break
            time.sleep(2) # Respeto al servidor

# Uso:
# scraper = ScraperNoticias("https://portalnoticias.com")
# scraper.ejecutar()

```

---

## 🤖 Módulo 15: openai - Integración con Modelos de IA

La librería oficial de **OpenAI** permite conectar tus scripts de Python con los modelos LLM más avanzados del mundo.

### 15.1 Configuración de la API v1.0+ (Sintaxis Moderna)

```bash
pip install openai

```

```python
from openai import OpenAI
import os

# Se recomienda usar variables de entorno para la KEY
client = OpenAI(api_key="TU_API_KEY_AQUI")

```

### 15.2 Implementaciones Avanzadas

#### 1. Sistema de Chat con Memoria de Contexto

Para que la IA "recuerde", debemos enviarle el historial completo en cada petición.

```python
class AsistenteIA:
    def __init__(self, sistema="Eres un experto en Python."):
        self.client = OpenAI()
        self.historial = [{"role": "system", "content": sistema}]

    def preguntar(self, pregunta):
        self.historial.append({"role": "user", "content": pregunta})
        
        try:
            response = self.client.chat.completions.create(
                model="gpt-4-turbo-preview",
                messages=self.historial,
                temperature=0.7
            )
            
            respuesta = response.choices[0].message.content
            self.historial.append({"role": "assistant", "content": respuesta})
            return respuesta
        except Exception as e:
            return f"Error: {e}"

# Ejemplo de uso interactivo
# ai = AsistenteIA()
# print(ai.preguntar("¿Cómo hago un merge en Pandas?"))

```

#### 2. Analizador de Datos con Salida Estructurada (JSON)

Ideal para integrar IA en flujos de datos automáticos.

```python
def analizar_sentimiento_lote(comentarios):
    client = OpenAI()
    
    prompt = f"""
    Analiza el sentimiento de los siguientes comentarios y responde ÚNICAMENTE 
    en formato JSON:
    {comentarios}
    
    Formato: {{"resultados": [{{"id": int, "sentimiento": "positivo/negativo", "score": float}}]}}
    """
    
    response = client.chat.completions.create(
        model="gpt-3.5-turbo-0125",
        messages=[{"role": "user", "content": prompt}],
        response_format={ "type": "json_object" }
    )
    return response.choices[0].message.content

```

#### 3. Generador de Código y Explicación Paso a Paso

```python
class TutorProgramacion:
    def __init__(self):
        self.client = OpenAI()

    def explicar_y_corregir(self, codigo_erroneo, error):
        prompt = f"""
        Tengo este código:
        ```python
        {codigo_erroneo}
        ```
        Produce este error: {error}
        
        Explica por qué falla y dame la versión corregida.
        """
        # ... lógica de petición similar a las anteriores ...

```

---


## 🔐 Módulo 16: python-dotenv - Gestión de Variables de Entorno

**python-dotenv** es una herramienta esencial para la seguridad y la portabilidad de tus aplicaciones. Permite cargar configuraciones sensibles (como API Keys o contraseñas) desde un archivo externo `.env`, evitando que queden expuestas directamente en el código fuente.

### 16.1 Instalación y Conceptos Clave

```bash
pip install python-dotenv

```

**¿Por qué usarlo?**

1. **Seguridad**: Evita subir credenciales a repositorios públicos (GitHub).
2. **Configuración dinámica**: Cambia el comportamiento del programa sin modificar el código.
3. **Estándar de la industria**: Utilizado en prácticamente todos los despliegues profesionales.

### 16.2 Uso Paso a Paso

#### 1. Creación del archivo .env

En la raíz de tu proyecto, crea un archivo llamado exactamente `.env`:

```text
# Configuración de API
OPENAI_API_KEY=sk-proj-1234567890abcdef
DEBUG=True

# Configuración de Base de Datos
DB_HOST=localhost
DB_PORT=5432
DB_USER=admin
DB_PASS=mi_password_seguro_123

```

#### 2. Carga básica en Python

```python
import os
from dotenv import load_dotenv

# Carga las variables del archivo .env al entorno del sistema
load_dotenv()

# Acceder a los valores
api_key = os.getenv('OPENAI_API_KEY')
db_user = os.getenv('DB_USER')

# Uso de valores por defecto (si la variable no existe)
port = os.getenv('DB_PORT', '8080')

print(f"Iniciando servicio con usuario: {db_user} en puerto {port}")

```

### 16.3 Ejemplos Prácticos de Implementación

#### Ejemplo 1: ConfigManager (Gestor de Configuración Robusto)

Esta clase permite manejar tipos de datos (booleanos, enteros) y validar que las variables críticas existan.

```python
class ConfigManager:
    """
    Gestiona la configuración de la aplicación de forma centralizada.
    """
    def __init__(self):
        load_dotenv()
        self._validate_critical_vars()

    def _validate_critical_vars(self):
        obligatorias = ['OPENAI_API_KEY', 'DB_PASS']
        faltantes = [v for v in obligatorias if not os.getenv(v)]
        if faltantes:
            raise EnvironmentError(f"Faltan variables críticas: {', '.join(faltantes)}")

    def get_bool(self, key, default=False):
        val = os.getenv(key, str(default)).lower()
        return val in ('true', '1', 'yes', 'on')

    def get_int(self, key, default=0):
        try:
            return int(os.getenv(key, default))
        except (ValueError, TypeError):
            return default

# Uso del Manager
config = ConfigManager()
if config.get_bool('DEBUG'):
    print("Modo desarrollo activo")

```

#### Ejemplo 2: SecretManager con Cifrado (Clase Completa)

Este es el sistema avanzado para gestionar secretos cifrados localmente, tal como aparece en tu archivo original.

```python
import json
import os
from cryptography.fernet import Fernet
from dotenv import load_dotenv, set_key

class SecretManager:
    """
    Sistema avanzado para cifrar y almacenar secretos locales.
    """
    def __init__(self, key_file='secret.key', db_file='secrets_db.json'):
        self.key_file = key_file
        self.db_file = db_file
        self.key = self._load_or_create_key()
        self.cipher = Fernet(self.key)
        self.secrets_cache = self._load_db()

    def _load_or_create_key(self):
        if os.path.exists(self.key_file):
            with open(self.key_file, 'rb') as f:
                return f.read()
        else:
            key = Fernet.generate_key()
            with open(self.key_file, 'wb') as f:
                f.write(key)
            return key

    def _load_db(self):
        if os.path.exists(self.db_file):
            with open(self.db_file, 'r') as f:
                return json.load(f)
        return {}

    def store_secret(self, name, value, description=""):
        """Cifra y guarda un secreto"""
        encrypted_val = self.cipher.encrypt(value.encode()).decode()
        self.secrets_cache[name] = {
            'value': encrypted_val,
            'description': description,
            'updated_at': str(os.path.getmtime(self.key_file))
        }
        with open(self.db_file, 'w') as f:
            json.dump(self.secrets_cache, f, indent=4)

    def get_secret(self, name):
        """Desencripta y devuelve un secreto"""
        if name in self.secrets_cache:
            encrypted_val = self.secrets_cache[name]['value']
            return self.cipher.decrypt(encrypted_val.encode()).decode()
        return None

    def export_to_env(self, names):
        """Exporta secretos seleccionados al archivo .env local"""
        for name in names:
            val = self.get_secret(name)
            if val:
                set_key('.env', name, val)
                print(f"Exportado: {name}")

# Ejemplo de uso final
if __name__ == "__main__":
    manager = SecretManager()
    
    # Almacenar secretos
    manager.store_secret('API_SECRET', 'super-secret-123', 'Clave de producción')
    
    # Recuperar secreto
    print(f"Secreto recuperado: {manager.get_secret('API_SECRET')}")
    
    # Exportar al archivo .env
    manager.export_to_env(['API_SECRET'])

```

### 📋 Resumen de Funciones python-dotenv

| Función           | Descripción                                       | Ejemplo                           |
| `load_dotenv()`   | Carga las variables del archivo `.env`            | `load_dotenv()`                   |
| `os.getenv()`     | Lee una variable del entorno                      | `os.getenv('API_KEY')`            |
| `dotenv_values()` | Retorna un diccionario con los valores            | `vals = dotenv_values('.env')`    |
| `set_key()`       | Escribe una variable directamente en el `.env`    | `set_key('.env', 'KEY', 'VAL')`   |

---


## 🔢 Módulo 17: NumPy - Arrays Numéricos Eficientes

**NumPy** (Numerical Python) es la librería fundamental para la computación científica en Python. Proporciona un objeto de array multidimensional de alto rendimiento y herramientas para trabajar con ellos.

**¿Por qué no usar listas de Python?**

1. **Velocidad**: Los arrays de NumPy están escritos en C, lo que los hace hasta 100 veces más rápidos que las listas.
2. **Memoria**: Consumen mucho menos espacio al usar tipos de datos contiguos en memoria.
3. **Vectorización**: Permiten realizar operaciones matemáticas sobre bloques enteros de datos sin usar bucles `for`.

### 17.1 Instalación y Conceptos Base

```bash
pip install numpy

```

```python
import numpy as np

# El objeto principal es el ndarray (n-dimensional array)

```

### 17.2 Creación de Arrays

#### 1. Desde estructuras de Python

```python
# Array 1D (Vector)
vector = np.array([1, 2, 3, 4, 5])

# Array 2D (Matriz)
matriz = np.array([[1, 2, 3], [4, 5, 6]])

# Array 3D (Tensor) - Común en procesamiento de imágenes (RGB)
tensor = np.array([[[1, 2], [3, 4]], [[5, 6], [7, 8]]])

```

#### 2. Funciones Intrinsecas de Creación

```python
# Array de ceros (útil para inicializar pesos)
ceros = np.zeros((3, 4)) # Matriz 3x4

# Array de unos
unos = np.ones((2, 2))

# Rango numérico (similar a range pero devuelve array)
rango = np.arange(0, 10, 2) # [0, 2, 4, 6, 8]

# Espaciado lineal (crucial para gráficas)
lin = np.linspace(0, 1, 5) # 5 números del 0 al 1 equidistantes

# Matriz identidad
identidad = np.eye(3)

```

### 17.3 Atributos y Manipulación de Forma

Es vital entender cómo se estructuran los datos antes de pasarlos a un modelo de IA.

```python
a = np.array([[1, 2, 3], [4, 5, 6]])

print(f"Dimensiones (ndim): {a.ndim}")    # 2
print(f"Forma (shape): {a.shape}")        # (2, 3) -> 2 filas, 3 columnas
print(f"Tamaño total (size): {a.size}")   # 6 elementos
print(f"Tipo de dato (dtype): {a.dtype}") # int64

```

#### Reshaping (Cambio de forma)

```python
arr = np.arange(12) # [0, 1, ..., 11]

# Convertir vector de 12 a matriz de 3x4
matriz_3x4 = arr.reshape(3, 4)

# Aplanar una matriz a vector (útil al final de redes neuronales)
vector_plano = matriz_3x4.flatten()

```

### 17.4 Indexación y Slicing (Rebanado)

```python
data = np.array([[10, 20, 30], [40, 50, 60], [70, 80, 90]])

# Acceso puntual: matriz[fila, columna]
print(data[0, 1]) # 20

# Slicing: matriz[filas_inicio:fin, columnas_inicio:fin]
sub_matriz = data[0:2, 1:3] 
# Devuelve:
# [[20, 30]
#  [50, 60]]

# Selección condicional (Boolean Indexing)
mayores_50 = data[data > 50] # [60, 70, 80, 90]

```

### 17.5 Operaciones Matemáticas y Broadcasting

#### Operaciones Elemento a Elemento

```python
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

print(a + b)  # [5, 7, 9]
print(a * 2)  # [2, 4, 6]
print(a ** 2) # [1, 4, 9]

```

#### Broadcasting (Difusión)

NumPy permite operar entre arrays de diferentes formas si son compatibles.

```python
matriz = np.ones((3, 3))
fila = np.array([1, 2, 3])

# Suma la fila a cada una de las 3 filas de la matriz automáticamente
resultado = matriz + fila 

```

### 17.6 Álgebra Lineal y Estadística

```python
arr = np.array([[1, 2], [3, 4]])

# Estadísticas descriptivas
print(f"Suma total: {np.sum(arr)}")
print(f"Media: {np.mean(arr)}")
print(f"Desviación estándar: {np.std(arr)}")
print(f"Suma por columnas: {arr.sum(axis=0)}") # [4, 6]

# Álgebra Lineal
v1 = np.array([1, 2])
v2 = np.array([3, 4])

# Producto punto (Dot product)
dot = np.dot(v1, v2) # (1*3) + (2*4) = 11

# Transposición de matriz
print(arr.T)

```

### 💡 Ejemplo Práctico: Procesamiento de Imágenes (Simulación)

Las imágenes son arrays de NumPy. Una imagen de 100x100 en escala de grises es una matriz de 100x100 donde cada valor (0-255) es la intensidad del píxel.

```python
import numpy as np

def procesar_imagen_simple():
    # 1. Crear una "imagen" aleatoria de 5x5 píxeles
    imagen = np.random.randint(0, 256, (5, 5), dtype=np.uint8)
    print("Imagen Original:\n", imagen)
    
    # 2. Normalizar (convertir valores de 0-255 a 0-1)
    # Paso crítico para entrenar Redes Neuronales
    imagen_norm = imagen / 255.0
    print("\nImagen Normalizada (0-1):\n", imagen_norm.round(2))
    
    # 3. Aplicar un filtro de umbral (Binarización)
    # Convertir a Blanco y Negro puro
    binaria = (imagen > 128).astype(np.uint8) * 255
    print("\nImagen Binarizada (Blanco y Negro):\n", binaria)
    
    # 4. Invertir colores
    invertida = 255 - imagen
    
    return imagen_norm

```

### 📋 Resumen de Funciones NumPy

| Función               | Descripción                               | Ejemplo                   |
| `np.array()`          | Crea un array desde una lista             | `np.array([1,2,3])`       |
| `np.reshape()`        | Cambia la forma sin cambiar datos         | `arr.reshape(2,5)`        |
| `np.dot()`            | Producto matricial/punto                  | `np.dot(a, b)`            |
| `np.mean()`           | Calcula el promedio                       | `np.mean(arr)`            |
| `np.where()`          | Operación condicional (if/else vectorial) | `np.where(a > 0, 1, 0)`   |
| `np.random.rand()`    | Genera números aleatorios (0 a 1)         | `np.random.rand(3,3)`     |
| `np.concatenate()`    | Une arrays por un eje                     | `np.concatenate((a,b))`   |

---


## 🚀 Guía de Maestría: Dominando NumPy (El Corazón de la IA)

Dominar NumPy implica entender tres pilares: **Vectorización**, **Broadcasting** y **Manipulación de Dimensiones**.

### 1. El Concepto de "Pensamiento Vectorial"

La regla de oro para dominar NumPy es: **Si escribes un bucle `for` para procesar números, lo estás haciendo mal.** NumPy utiliza operaciones SIMD (Single Instruction, Multiple Data) a nivel de CPU.

```python
import numpy as np

# Mal (Estilo Python puro)
lista = [1, 2, 3]
resultado = [x * 2 for x in lista]

# Bien (Estilo NumPy / Vectorizado)
arr = np.array([1, 2, 3])
resultado = arr * 2  # Ocurre a nivel de C, instantáneo

```

### 2. Anatomía de un Array y Memoria

Para dominarlo, debes entender qué pasa "bajo el capó". A diferencia de las listas, los arrays de NumPy tienen un **tipo fijo** y están en **memoria contigua**.

* **`shape`**: La forma (filas, columnas, profundidad).
* **`stride`**: Cuántos bytes debe saltar la CPU para llegar al siguiente elemento (esto hace que `transpose` sea gratis, porque solo cambia el stride, no mueve los datos).

### 3. Broadcasting: La Magia de NumPy

Es la capacidad de operar con arrays de diferentes formas. Dominar las reglas de broadcasting te permite escribir código extremadamente eficiente.

**Regla de compatibilidad:** Dos dimensiones son compatibles cuando:

1. Son iguales.
2. Una de ellas es 1.

```python
# Ejemplo de Broadcasting avanzado
matriz = np.zeros((3, 3))    # (3, 3)
fila = np.array([1, 0, 1])   # (3,) -> se interpreta como (1, 3)

# La fila se "estira" para cubrir las 3 filas de la matriz
resultado = matriz + fila 

```

---

### 4. Manipulación Avanzada (Reshape y Transpose)

En IA, las imágenes y datos cambian de forma constantemente (ej. de una capa de Red Neuronal a otra).

```python
# Crear un tensor de datos (Batch, Height, Width, Channels)
tensor = np.random.rand(32, 224, 224, 3)

# Cambiar ejes (Transponer): Mover canales al principio (estilo PyTorch)
# (32, 224, 224, 3) -> (32, 3, 224, 224)
tensor_pt = tensor.transpose(0, 3, 1, 2)

# Aplanar para una capa densa (Flat)
vector_final = tensor.reshape(32, -1) # -1 calcula automáticamente el tamaño

```

---

### 5. Indexación "Fancy" y Máscaras Booleanas

Dominar la selección de datos sin usar filtros manuales.

```python
datos = np.array([10, -5, 20, -1, 30])

# Máscara booleana: seleccionar solo positivos
positivos = datos[datos > 0]

# Indexación elegante (Fancy Indexing)
indices = [0, 2, 4]
sub_datos = datos[indices] # [10, 20, 30]

```

---

### 💡 Implementación Maestra: Simulación de una Neurona

Para demostrar el dominio, aquí tienes cómo se aplica NumPy para calcular la salida de una neurona simple (Suma ponderada + Activación).

```python
def neurona_master(X, W, b):
    """
    X: Entradas (Batch, Característica)
    W: Pesos (Característica, 1)
    b: Bias (1,)
    """
    # 1. Producto punto (z = X·W + b)
    # Aquí aplicamos Álgebra Lineal y Broadcasting simultáneo
    z = np.dot(X, W) + b
    
    # 2. Función de activación Sigmoide (Vectorizada)
    # np.exp se aplica a todo el array automáticamente
    activacion = 1 / (1 + np.exp(-z))
    
    return activacion

# Datos de prueba
X = np.random.randn(10, 5)  # 10 ejemplos, 5 características
W = np.random.randn(5, 1)   # 5 pesos
b = 0.5

resultado = neurona_master(X, W, b)
print(f"Salida de la neurona para 10 ejemplos:\n{resultado}")

```

### 📋 Checklist para considerarte "Master en NumPy"

1. [ ] **¿Entiendes los ejes?** Saber que `axis=0` son filas (operación vertical) y `axis=1` columnas (operación horizontal).
2. [ ] **¿Evitas los bucles?** Si ves un `for i in range(len(arr))`, intenta reemplazarlo con una función de NumPy.
3. [ ] **¿Conoces `np.where`?** Es el `if/else` más rápido que existe.
4. [ ] **¿Dominas el `reshape(-1)`?** Saber que el `-1` es el comodín para que NumPy trabaje por ti.

---


## 📈 Módulo 18: Matplotlib - Visualización de Datos Dinámica

**Matplotlib** es la librería abuela de la visualización en Python. Es extremadamente potente y permite un control total sobre cada píxel del gráfico. La mayoría de las librerías modernas (como Seaborn) están construidas sobre ella.

### 18.1 Instalación y Conceptos Fundamentales

```bash
pip install matplotlib

```

Para trabajar de forma eficiente, usamos el módulo `pyplot`, que ofrece una interfaz similar a MATLAB.

```python
import matplotlib.pyplot as plt
import numpy as np

# Configuración para que los gráficos se vean mejor (opcional)
plt.style.use('ggplot') 

```

### 18.2 Anatomía de una Figura

Es vital entender la diferencia entre **Figure** (el lienzo total) y **Axes** (el gráfico individual con sus ejes).

### 18.3 Gráficos Esenciales para IA

#### 1. Gráfico de Líneas (Line Plot)

Ideal para ver la evolución de una métrica (ej. la pérdida de una red neuronal) a lo largo del tiempo.

```python
# Datos simulados
epocas = np.arange(1, 11)
perdida = [0.9, 0.7, 0.5, 0.4, 0.35, 0.3, 0.28, 0.26, 0.25, 0.24]

plt.figure(figsize=(8, 5))
plt.plot(epocas, perdida, label='Loss', color='blue', marker='o', linestyle='--')

# Personalización
plt.title('Curva de Entrenamiento del Modelo')
plt.xlabel('Épocas')
plt.ylabel('Pérdida (Loss)')
plt.grid(True)
plt.legend()
plt.show()

```

#### 2. Gráfico de Dispersión (Scatter Plot)

Fundamental para ver correlaciones entre variables o agrupamientos (clusters).

```python
# Generar puntos aleatorios
x = np.random.randn(100)
y = np.random.randn(100)

plt.scatter(x, y, alpha=0.6, c='green', edgecolors='black')
plt.title('Distribución de Características')
plt.show()

```

#### 3. Histogramas

Cruciales para entender la distribución de una variable (¿es normal?, ¿está sesgada?).

```python
datos = np.random.normal(0, 1, 1000) # Distribución normal

plt.hist(datos, bins=30, color='skyblue', edgecolor='black')
plt.title('Distribución de Probabilidad')
plt.show()

```

### 18.4 Subplots: Múltiples Gráficos en uno

A menudo querrás comparar varios gráficos a la vez (ej. Precisión vs. Pérdida).

```python
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 4))

# Gráfico 1
ax1.plot([1, 2, 3], [10, 20, 30], color='red')
ax1.set_title('Métrica A')

# Gráfico 2
ax2.bar(['A', 'B', 'C'], [5, 12, 8])
ax2.set_title('Métrica B')

plt.tight_layout() # Evita que los títulos se solapen
plt.show()

```

### 18.5 Visualización de Imágenes (Para Visión Artificial)

Dado que las imágenes son arrays de NumPy, Matplotlib es la herramienta perfecta para inspeccionarlas.

```python
# Crear una matriz aleatoria que simule una imagen
imagen_fake = np.random.rand(10, 10)

plt.imshow(imagen_fake, cmap='viridis')
plt.colorbar() # Muestra la escala de intensidad
plt.title('Visualización de Pesos de una Capa')
plt.axis('off') # Quita los ejes numéricos
plt.show()

```

### 💡 Ejemplo Práctico: Visualizando una Función de Activación

Vamos a graficar la función **ReLU** (Rectified Linear Unit), la más usada en aprendizaje profundo.

```python
def relu(x):
    return np.maximum(0, x)

x = np.linspace(-10, 10, 100)
y = relu(x)

plt.figure(figsize=(8, 4))
plt.plot(x, y, linewidth=3, color='orange')
plt.axhline(0, color='black', lw=1) # Línea horizontal en 0
plt.axvline(0, color='black', lw=1) # Línea vertical en 0
plt.title('Función de Activación ReLU')
plt.text(-7.5, 5, 'f(x) = 0 si x < 0\nf(x) = x si x >= 0', fontsize=12, bbox=dict(facecolor='white', alpha=0.5))
plt.grid(True, linestyle=':')
plt.show()

```

### 📋 Resumen de Funciones Matplotlib

| Función                    | Descripción                                      |
| `plt.plot()`               | Dibuja líneas o puntos conectados                |
| `plt.scatter()`            | Crea nubes de puntos                             |
| `plt.hist()`               | Crea histogramas de frecuencia                   |
| `plt.imshow()`             | Muestra arrays como imágenes                     |
| `plt.subplots()`           | Crea una cuadrícula de múltiples gráficos        |  
| `plt.xlabel() / .ylabel()` | Define etiquetas de los ejes                     |
| `plt.savefig()`            | Guarda el gráfico en un archivo (png, pdf, svg)  |

---


### 19.1 Instalación y Estética

```bash
pip install seaborn

```

```python
import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

# Aplicar el tema por defecto de Seaborn (mucho más estético)
sns.set_theme(style="whitegrid")

```

### 19.2 Gráficos Estadísticos Clave

#### 1. Distplot / Histplot (Distribuciones)

Seaborn permite ver la curva de densidad (KDE) sobre el histograma para entender mejor la forma de los datos.

```python
data = np.random.normal(size=1000)

# Gráfico de distribución con curva de densidad
sns.histplot(data, kde=True, color="purple")
plt.title("Distribución de Probabilidad con KDE")
plt.show()

```

#### 2. Boxplot (Diagrama de Caja y Bigotes)

Vital para detectar **Outliers** (valores atípicos) que pueden arruinar un modelo de IA.

```python
# Usando el dataset interno de Seaborn 'tips'
tips = sns.load_dataset("tips")

sns.boxplot(x="day", y="total_bill", data=tips, palette="Set2")
plt.title("Gasto Total por Día (Detección de Outliers)")
plt.show()

```

#### 3. Heatmap (Mapa de Calor de Correlación)

Este es el gráfico más usado antes de entrenar una IA. Nos dice qué columnas están relacionadas entre sí.

```python
# Calcular la matriz de correlación de un DataFrame
corr = tips.corr(numeric_only=True)

# Dibujar el mapa de calor
sns.heatmap(corr, annot=True, cmap='coolwarm', fmt=".2f")
plt.title("Matriz de Correlación de Variables")
plt.show()

```

### 19.3 Visualización de Relaciones Múltiples

#### 1. Pairplot (El "Rey" del Análisis Exploratorio)

Crea una matriz de gráficos comparando cada columna contra todas las demás. Es la forma más rápida de encontrar patrones ocultos.

```python
# Dataset de flores Iris (clásico en IA)
iris = sns.load_dataset("iris")

# Compara todas las variables y diferencia por especie
sns.pairplot(iris, hue="species", palette="husl")
plt.show()

```

#### 2. Jointplot

Combina un gráfico de dispersión con los histogramas de cada eje.

```python
sns.jointplot(x="sepal_length", y="sepal_width", data=iris, kind="hex", color="#4CB391")
plt.show()

```

### 19.4 Gráficos de Regresión

Seaborn puede dibujar automáticamente la línea de tendencia (regresión lineal) sobre los datos.

```python
sns.regplot(x="total_bill", y="tip", data=tips, scatter_kws={'alpha':0.5})
plt.title("Regresión Lineal: Propina vs Cuenta Total")
plt.show()

```

### 💡 Ejemplo Práctico: Perfilado de Datos de Clientes

Imagina que tienes datos de clientes y quieres saber si el género o el hábito de fumar afecta cuánto gastan.

```python
def perfilado_clientes_ia(df):
    """
    Realiza un análisis visual rápido de los datos
    """
    plt.figure(figsize=(12, 6))
    
    # Violin Plot: Combina Boxplot con Densidad
    plt.subplot(1, 2, 1)
    sns.violinplot(x="time", y="total_bill", hue="smoker", data=df, split=True)
    plt.title("Distribución de Gasto por Horario y Hábito")
    
    # Count Plot: Conteo de categorías
    plt.subplot(1, 2, 2)
    sns.countplot(x="day", hue="sex", data=df)
    plt.title("Frecuencia de Clientes por Día y Género")
    
    plt.tight_layout()
    plt.show()

# Ejecutar con el dataset de ejemplo
perfilado_clientes_ia(tips)

```

### 📋 Resumen de Funciones Seaborn

| Función               | Uso Principal                                     |
| `sns.histplot()`      | Histogramas y curvas de densidad                  |
| `sns.boxplot()`       | Identificación de cuartiles y valores atípicos    |
| `sns.heatmap()`       | Visualización de matrices (correlaciones)         |
| `sns.pairplot()`      | Análisis relacional completo de un dataset        |
| `sns.violinplot()`    | Comparación de distribuciones entre categorías    |
| `sns.lmplot()`        | Gráficos de dispersión con regresión lineal       |

---



## 🤖 Módulo 20: Scikit-Learn - Machine Learning en Python

Scikit-Learn se especializa en algoritmos de aprendizaje supervisado (cuando tienes datos etiquetados) y no supervisado. No se usa para Redes Neuronales profundas (para eso están PyTorch o TensorFlow), sino para modelos de regresión, clasificación y clustering de alta eficiencia.

### 20.1 Instalación y Flujo de Trabajo

```bash
pip install scikit-learn

```

**El flujo estándar en IA:**

1. **Preprocesamiento**: Limpiar y normalizar datos.
2. **Split**: Dividir datos en entrenamiento y prueba.
3. **Fit**: Entrenar el modelo.
4. **Predict**: Evaluar con datos nuevos.

### 20.2 Preprocesamiento: Preparando los datos

La IA no entiende de palabras o escalas diferentes; necesita números normalizados.

```python
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder

# 1. Convertir categorías a números
le = LabelEncoder()
df['genero'] = le.fit_transform(df['genero']) # Hombre/Mujer -> 0/1

# 2. Escalar datos (importante para modelos como SVM o KNN)
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

```

### 20.3 División de Datos (Train/Test Split)

Nunca evalúes un modelo con los mismos datos que usaste para entrenarlo. Sería como darle el examen a un alumno con las respuestas ya escritas.

```python
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
# Reservamos el 20% para la prueba final

```

### 20.4 Algoritmos Clave: Clasificación y Regresión

#### 1. Regresión Lineal (Predicción de valores numéricos)

```python
from sklearn.linear_model import LinearRegression

modelo_reg = LinearRegression()
modelo_reg.fit(X_train, y_train) # Entrenamiento

predicciones = modelo_reg.predict(X_test)

```

#### 2. Árboles de Decisión (Clasificación)

Son fáciles de entender y visualizar. Toman decisiones basadas en preguntas "si/no".

```python
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, classification_report

modelo_tree = DecisionTreeClassifier(max_depth=3)
modelo_tree.fit(X_train, y_train)

y_pred = modelo_tree.predict(X_test)
print(f"Precisión: {accuracy_score(y_test, y_pred)}")

```

### 20.5 Evaluación del Modelo

En IA, no basta con "creer" que el modelo funciona. Necesitamos métricas.

* **Matriz de Confusión**: Muestra cuántas veces el modelo acertó y en qué se equivocó exactamente.
* **MSE (Mean Squared Error)**: Para regresión.

```python
from sklearn.metrics import confusion_matrix
import seaborn as sns

cm = confusion_matrix(y_test, y_pred)
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
plt.ylabel('Real')
plt.xlabel('Predicho')
plt.show()

```

### 💡 Ejemplo Práctico: Creando un Clasificador de Flores Iris

Vamos a usar el famoso dataset de flores para crear una IA que identifique la especie basándose en el tamaño de los pétalos.

```python
from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestClassifier

# 1. Cargar datos
iris = load_iris()
X, y = iris.data, iris.target

# 2. Dividir
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)

# 3. Entrenar un Bosque Aleatorio (Random Forest)
# Es un conjunto de muchos árboles de decisión trabajando juntos
bosque = RandomForestClassifier(n_estimators=100)
bosque.fit(X_train, y_train)

# 4. Predecir una nueva flor desconocida
nueva_flor = [[5.1, 3.5, 1.4, 0.2]]
especie = bosque.predict(nueva_flor)
print(f"La especie predicha es: {iris.target_names[especie][0]}")

```

### 📋 Resumen de Herramientas Scikit-Learn

| Módulo            | Función               | Uso                                       | 
| `model_selection` | `train_test_split`    | Separar datos para validar                |
| `linear_model`    | `LogisticRegression`  | Clasificación binaria (Si/No)             |
| `ensemble`        | `RandomForest`        | Algoritmos potentes basados en árboles    |
| `cluster`         | `KMeans`              | Agrupar datos sin etiquetas               |
| `metrics`         | `accuracy_score`      | Medir el éxito del modelo                 |

---

