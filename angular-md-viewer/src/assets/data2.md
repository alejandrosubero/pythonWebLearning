
## 📦 Módulo 12:  Librerías Esenciales de Python para Ciencia de Datos y Automatización Web


1. requests - El Cliente HTTP de Python (#1-requests)
2. pandas - La Librería de Análisis de Datos (#2-pandas)
3. beautifulsoup4 - Parsing HTML/XML (#3-beautifulsoup4)
4. openai - Integración con Modelos de IA (#4-openai)
5. python-dotenv - Gestión de Variables de Entorno (#5-python-dotenv)



## 1. requests - El Cliente HTTP de Python {#1-requests}

### 📚 Teoría Fundamental

**requests** es la librería HTTP más popular de Python, diseñada para humanos. Simplifica enormemente las peticiones web, eliminando la complejidad de librerías como `urllib`.

**Conceptos Clave:**
- **HTTP**: Protocolo de transferencia de hipertexto
- **Métodos**: GET (obtener), POST (enviar), PUT (actualizar), DELETE (eliminar)
- **Status Codes**: 200 (éxito), 404 (no encontrado), 500 (error servidor)
- **Headers**: Metadatos de la petición/resuesta
- **Parámetros**: Datos enviados en la URL
- **Payload**: Datos enviados en el cuerpo de la petición

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

| Función | Descripción | Ejemplo |
|---------|-------------|---------|
| `requests.get()` | Petición HTTP GET | `requests.get('https://api.com/data')` |
| `requests.post()` | Petición HTTP POST | `requests.post('https://api.com/data', json=payload)` |
| `requests.put()` | Petición HTTP PUT | `requests.put('https://api.com/data/1', json=update)` |
| `requests.delete()` | Petición HTTP DELETE | `requests.delete('https://api.com/data/1')` |
| `response.json()` | Parsear respuesta JSON | `data = response.json()` |
| `response.text` | Obtener respuesta como texto | `html = response.text` |
| `response.content` | Obtener respuesta como bytes | `image_bytes = response.content` |
| `response.status_code` | Código de estado HTTP | `if response.status_code == 200:` |
| `response.headers` | Headers de la respuesta | `content_type = response.headers['content-type']` |
| `requests.Session()` | Crear sesión persistente | `session = requests.Session()` |

---

## 2. pandas - La Librería de Análisis de Datos {#2-pandas}

### 📚 Teoría Fundamental

**pandas** es la librería fundamental para análisis y manipulación de datos en Python. Proporciona estructuras de datos rápidas, flexibles y expresivas diseñadas para trabajar con datos "relacionales" o "etiquetados".

**Estructuras de Datos Principales:**
- **Series**: Array unidimensional etiquetado (similar a una columna)
- **DataFrame**: Estructura tabular 2D con filas y columnas etiquetadas
- **Index**: Array inmutable para etiquetar ejes

**Conceptos Clave:**
- **Vectorización**: Operaciones sin bucles explícitos
- **Broadcasting**: Operaciones entre estructuras de diferentes tamaños
- **NaN**: Not a Number - representa valores faltantes
- **Dtypes**: Tipos de datos (int64, float64, object, datetime64, etc.)

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

| Función | Descripción | Ejemplo |
|---------|-------------|---------|
| `pd.DataFrame()` | Crear DataFrame | `df = pd.DataFrame(data)` |
| `pd.read_csv()` | Leer archivo CSV | `df = pd.read_csv('file.csv')` |
| `df.head()` | Primeras filas | `df.head(10)` |
| `df.info()` | Información del DataFrame | `df.info()` |
| `df.describe()` | Estadísticas descriptivas | `df.describe()` |
| `df.groupby()` | Agrupar datos | `df.groupby('column').mean()` |
| `df.merge()` | Unir DataFrames | `pd.merge(df1, df2, on='key')` |
| `df.pivot_table()` | Crear tabla pivot | `df.pivot_table(values='val', index='idx', columns='col')` |
| `df.fillna()` | Llenar valores faltantes | `df.fillna(0)` |
| `df.dropna()` | Eliminar valores faltantes | `df.dropna()` |
| `df.drop_duplicates()` | Eliminar duplicados | `df.drop_duplicates()` |
| `df.sort_values()` | Ordenar valores | `df.sort_values('column')` |
| `df.apply()` | Aplicar función | `df['col'].apply(func)` |
| `df.loc[]` | Selección por etiqueta | `df.loc[0:5, 'column']` |
| `df.iloc[]` | Selección por posición | `df.iloc[0:5, 0:3]` |
| `df.query()` | Consulta con sintaxis SQL | `df.query('column > 50')` |

---

## 3. beautifulsoup4 - Parsing HTML/XML {#3-beautifulsoup4}

### 📚 Teoría Fundamental

**Beautiful Soup** es una librería Python para extraer datos de archivos HTML y XML. Proporciona métodos Pythonicos para navegar, buscar y modificar el árbol de parseo.

**Conceptos Clave:**
- **HTML**: Lenguaje de marcado para páginas web
- **DOM**: Document Object Model - representación estructurada del documento
- **Tags**: Etiquetas HTML (div, p, a, etc.)
- **Attributes**: Atributos de las etiquetas (class, id, href, etc.)
- **Parsing**: Análisis sintáctico del documento
- **Selectores**: Métodos para encontrar elementos

### 🛠️ Instalación y Configuración

```bash
pip install beautifulsoup4
pip install lxml  # Parser más rápido (opcional pero recomendado)
pip install html5lib  # Parser más permisivo con HTML mal formado
```

### 📖 Uso Paso a Paso

#### 1. Parseo Básico y Navegación

```python
from bs4 import BeautifulSoup
import requests

# HTML de ejemplo
html_content = """
<!DOCTYPE html>
<html>
<head>
    <title>Página de Ejemplo</title>
</head>
<body>
    <div class="container">
        <h1 id="titulo">Bienvenido a Web Scraping</h1>
        <p class="descripcion">Este es un párrafo de ejemplo.</p>
        <div class="articulos">
            <article class="articulo" data-id="1">
                <h2>Título Artículo 1</h2>
                <p>Contenido del artículo 1</p>
                <a href="/articulo1">Leer más</a>
            </article>
            <article class="articulo" data-id="2">
                <h2>Título Artículo 2</h2>
                <p>Contenido del artículo 2</p>
                <a href="/articulo2">Leer más</a>
            </article>
        </div>
        <ul class="menu">
            <li><a href="/inicio">Inicio</a></li>
            <li><a href="/sobre">Sobre Nosotros</a></li>
            <li><a href="/contacto">Contacto</a></li>
        </ul>
    </div>
</body>
</html>
"""

# Crear objeto BeautifulSoup
soup = BeautifulSoup(html_content, 'html.parser')

# Acceder al título
titulo = soup.title
print(f"Título: {titulo.text}")

# Acceder al h1
h1 = soup.find('h1')
print(f"Texto H1: {h1.text}")
print(f"ID del H1: {h1.get('id')}")

# Navegación por el árbol
container = soup.find('div', class_='container')
print(f"\nClase del div container: {container.get('class')}")

# Acceder a hijos
articulos = container.find('div', class_='articulos')
print(f"Número de artículos: {len(articulos.find_all('article'))}")

# Navegación hacia arriba
padre_articulo = articulos.find('article').parent
print(f"Padre del primer artículo: {padre_articulo.name}")
```

#### 2. Métodos de Búsqueda

```python
print("=== MÉTODOS DE BÚSQUEDA ===")

# find() - Devuelve el primer elemento
primer_articulo = soup.find('article')
print(f"Primer artículo: {primer_articulo.h2.text}")

# find_all() - Devuelve todos los elementos
todos_articulos = soup.find_all('article')
print(f"Total de artículos: {len(todos_articulos)}")

# Búsqueda por clase
descripcion = soup.find('p', class_='descripcion')
print(f"Descripción: {descripcion.text}")

# Búsqueda por ID
titulo_principal = soup.find(id='titulo')
print(f"Título principal: {titulo_principal.text}")

# Búsqueda por atributos
articulo_data = soup.find('article', {'data-id': '1'})
print(f"Artículo con data-id=1: {articulo_data.h2.text}")

# Búsqueda con selectores CSS
enlaces_menu = soup.select('ul.menu li a')
print(f"Enlaces del menú: {[enlace.text for enlace in enlaces_menu]}")

# Búsqueda de texto parcial
enlaces_leer_mas = soup.find_all('a', string='Leer más')
print(f"Enlaces 'Leer más': {len(enlaces_leer_mas)}")

# Búsqueda con expresiones regulares
import re
enlaces_con_articulo = soup.find_all('a', href=re.compile(r'/articulo'))
print(f"Enlaces con '/articulo': {len(enlaces_con_articulo)}")
```

#### 3. Extracción de Datos

```python
# HTML de ejemplo más complejo
html_productos = """
<html>
<body>
    <div class="productos">
        <div class="producto" data-sku="PROD001">
            <h3 class="nombre">Laptop Gaming</h3>
            <p class="precio">$1,299.99</p>
            <p class="descripcion">Potente laptop para gaming</p>
            <div class="especificaciones">
                <span class="marca">ASUS</span>
                <span class="modelo">ROG Strix</span>
            </div>
            <img src="laptop.jpg" alt="Laptop Gaming">
            <a href="/producto/laptop-gaming" class="enlace-producto">Ver detalles</a>
        </div>
        
        <div class="producto" data-sku="PROD002">
            <h3 class="nombre">Smartphone</h3>
            <p class="precio">$899.00</p>
            <p class="descripcion">Último modelo con 5G</p>
            <div class="especificaciones">
                <span class="marca">Apple</span>
                <span class="modelo">iPhone 14</span>
            </div>
            <img src="iphone.jpg" alt="iPhone 14">
            <a href="/producto/iphone-14" class="enlace-producto">Ver detalles</a>
        </div>
        
        <div class="producto agotado" data-sku="PROD003">
            <h3 class="nombre">Tablet</h3>
            <p class="precio">$499.50</p>
            <p class="descripcion">Tablet de alta definición</p>
            <div class="especificaciones">
                <span class="marca">Samsung</span>
                <span class="modelo">Galaxy Tab</span>
            </div>
            <img src="tablet.jpg" alt="Samsung Tablet">
            <span class="agotado-badge">AGOTADO</span>
            <a href="/producto/samsung-tablet" class="enlace-producto">Ver detalles</a>
        </div>
    </div>
</body>
</html>
"""

soup_productos = BeautifulSoup(html_productos, 'html.parser')

print("=== EXTRACCIÓN DE DATOS DE PRODUCTOS ===")

# Extraer todos los productos
productos = soup_productos.find_all('div', class_='producto')

lista_productos = []
for producto in productos:
    # Extraer información de cada producto
    sku = producto.get('data-sku')
    nombre = producto.find('h3', class_='nombre').text.strip()
    precio_texto = producto.find('p', class_='precio').text.strip()
    precio = float(precio_texto.replace('$', '').replace(',', ''))
    descripcion = producto.find('p', class_='descripcion').text.strip()
    
    # Extraer especificaciones
    especificaciones = producto.find('div', class_='especificaciones')
    marca = especificaciones.find('span', class_='marca').text.strip()
    modelo = especificaciones.find('span', class_='modelo').text.strip()
    
    # Verificar si está agotado
    agotado = 'agotado' in producto.get('class', [])
    
    # Extraer imagen
    imagen = producto.find('img')['src']
    
    # Extraer enlace
    enlace = producto.find('a', class_='enlace-producto')['href']
    
    producto_dict = {
        'SKU': sku,
        'Nombre': nombre,
        'Precio': precio,
        'Descripcion': descripcion,
        'Marca': marca,
        'Modelo': modelo,
        'Agotado': agotado,
        'Imagen': imagen,
        'Enlace': enlace
    }
    
    lista_productos.append(producto_dict)

# Crear DataFrame con los productos
df_productos = pd.DataFrame(lista_productos)
print(f"Productos extraídos: {len(df_productos)}")
print(df_productos)
```

#### 4. Modificación del HTML

```python
# HTML original
html_original = """
<div class="articulo">
    <h2>Título Original</h2>
    <p>Este es el contenido original.</p>
    <a href="/original">Enlace original</a>
</div>
"""

soup_mod = BeautifulSoup(html_original, 'html.parser')

print("=== MODIFICACIÓN DE HTML ===")
print("Original:")
print(soup_mod.prettify())

# Modificar texto
titulo = soup_mod.find('h2')
titulo.string = "Título Modificado"

# Modificar atributo
enlace = soup_mod.find('a')
enlace['href'] = '/modificado'
enlace['class'] = 'enlace-modificado'

# Agregar nuevo elemento
nuevo_parrafo = soup_mod.new_tag('p', class_='nuevo-parrafo')
nuevo_parrafo.string = "Este es un nuevo párrafo agregado."
soup_mod.div.append(nuevo_parrafo)

# Agregar estilo CSS
style_tag = soup_mod.new_tag('style')
style_tag.string = """
    .nuevo-parrafo {
        color: blue;
        font-style: italic;
    }
    .enlace-modificado {
        color: red;
    }
"""
soup_mod.head.append(style_tag)

print("\nModificado:")
print(soup_mod.prettify())

# Eliminar elemento
enlace.decompose()  # Elimina completamente el enlace
print("\nDespués de eliminar enlace:")
print(soup_mod.prettify())
```

#### 5. Manejo de HTML Mal Formado

```python
# HTML mal formado
html_mal_formado = """
<html>
<body>
    <div class="contenedor">
        <h1>Título</h1>
        <p>Párrafo sin cerrar
        <div>Otro div
            <span>Texto en span</p>  <!-- Cierre incorrecto -->
        </div>
        <ul>
            <li>Item 1
            <li>Item 2
            <li>Item 3
        </ul>
    </div>
</body>
</html>
"""

# Comparar diferentes parsers
print("=== COMPARACIÓN DE PARSERS ===")

# html.parser (parser built-in)
soup_html = BeautifulSoup(html_mal_formado, 'html.parser')
print("1. html.parser:")
print(soup_html.prettify()[:500] + "...")

# lxml (más rápido)
try:
    soup_lxml = BeautifulSoup(html_mal_formado, 'lxml')
    print("\n2. lxml:")
    print(soup_lxml.prettify()[:500] + "...")
except:
    print("\nlxml no está instalado")

# html5lib (más permisivo)
try:
    soup_html5 = BeautifulSoup(html_mal_formado, 'html5lib')
    print("\n3. html5lib:")
    print(soup_html5.prettify()[:500] + "...")
except:
    print("\nhtml5lib no está instalado")
```

### 💡 Ejemplos Prácticos de Implementación

#### Ejemplo 1: Scraper de Noticias

```python
import requests
from bs4 import BeautifulSoup
import pandas as pd
from datetime import datetime
import time

class ScraperNoticias:
    """
    Scraper completo para extraer noticias de un sitio web
    """
    
    def __init__(self, url_base, delay=1):
        self.url_base = url_base
        self.delay = delay
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        self.noticias = []
    
    def obtener_html(self, url):
        """Obtener HTML de una URL con manejo de errores"""
        try:
            response = requests.get(url, headers=self.headers)
            response.raise_for_status()
            return BeautifulSoup(response.content, 'html.parser')
        except requests.exceptions.RequestException as e:
            print(f"Error obteniendo {url}: {e}")
            return None
    
    def scrapear_noticias(self, url_pagina):
        """Scrapear noticias de una página específica"""
        soup = self.obtener_html(url_pagina)
        if not soup:
            return []
        
        noticias_pagina = []
        
        # Encontrar contenedores de noticias (ajustar selectores según el sitio)
        # Este es un ejemplo genérico
        articulos = soup.find_all('article') or soup.find_all('div', class_=re.compile(r'.*noticia.*', re.I))
        
        if not articulos:
            # Intentar otros selectores comunes
            articulos = soup.find_all('div', class_='post') or \
                       soup.find_all('div', class_='entry') or \
                       soup.find_all('div', class_='news-item')
        
        for articulo in articulos:
            try:
                # Extraer título
                titulo = self._extraer_titulo(articulo)
                if not titulo:
                    continue
                
                # Extraer otros campos
                url = self._extraer_url(articulo)
                resumen = self._extraer_resumen(articulo)
                fecha = self._extraer_fecha(articulo)
                autor = self._extraer_autor(articulo)
                categoria = self._extraer_categoria(articulo)
                
                noticia = {
                    'titulo': titulo,
                    'url': url,
                    'resumen': resumen,
                    'fecha': fecha,
                    'autor': autor,
                    'categoria': categoria,
                    'fuente': self.url_base,
                    'fecha_extraccion': datetime.now()
                }
                
                noticias_pagina.append(noticia)
                
            except Exception as e:
                print(f"Error procesando artículo: {e}")
                continue
        
        return noticias_pagina
    
    def _extraer_titulo(self, articulo):
        """Extraer título del artículo"""
        # Intentar diferentes selectores para el título
        titulo_selectores = [
            'h1', 'h2', 'h3',
            'h1 a', 'h2 a', 'h3 a',
            '.titulo', '.title',
            '.entry-title',
            '.post-title',
            '[class*="title"]',
            '[class*="titulo"]'
        ]
        
        for selector in titulo_selectores:
            elemento = articulo.select_one(selector)
            if elemento:
                return elemento.get_text(strip=True)
        
        return None
    
    def _extraer_url(self, articulo):
        """Extraer URL del artículo"""
        # Buscar enlaces en el artículo
        enlaces = articulo.find_all('a', href=True)
        
        for enlace in enlaces:
            href = enlace['href']
            # Filtrar por enlaces que parezcan artículos
            if any(patron in href.lower() for patron in ['/noticias/', '/news/', '/blog/', '/202', '/2024']):
                # Completar URL relativa
                if href.startswith('/'):
                    return self.url_base.rstrip('/') + href
                elif href.startswith('http'):
                    return href
        
        return None
    
    def _extraer_resumen(self, articulo):
        """Extraer resumen/descripción"""
        selectores_resumen = [
            'p',
            '.resumen',
            '.summary',
            '.excerpt',
            '.entry-summary',
            '.post-excerpt',
            '[class*="summary"]',
            '[class*="resumen"]'
        ]
        
        for selector in selectores_resumen:
            elemento = articulo.select_one(selector)
            if elemento:
                texto = elemento.get_text(strip=True)
                if len(texto) > 50:  # Asegurar que sea un párrafo significativo
                    return texto[:200] + '...' if len(texto) > 200 else texto
        
        return None
    
    def _extraer_fecha(self, articulo):
        """Extraer fecha de publicación"""
        selectores_fecha = [
            'time',
            '.fecha',
            '.date',
            '.published',
            '.post-date',
            '[class*="date"]',
            '[class*="fecha"]'
        ]
        
        for selector in selectores_fecha:
            elemento = articulo.select_one(selector)
            if elemento:
                # Intentar obtener datetime o texto
                fecha_texto = elemento.get('datetime') or elemento.get_text(strip=True)
                if fecha_texto:
                    return self._parsear_fecha(fecha_texto)
        
        return None
    
    def _extraer_autor(self, articulo):
        """Extraer autor"""
        selectores_autor = [
            '.autor',
            '.author',
            '.by-author',
            '.post-author',
            '[class*="author"]',
            '[class*="autor"]',
            'a[rel="author"]'
        ]
        
        for selector in selectores_autor:
            elemento = articulo.select_one(selector)
            if elemento:
                return elemento.get_text(strip=True)
        
        return None
    
    def _extraer_categoria(self, articulo):
        """Extraer categoría"""
        selectores_categoria = [
            '.categoria',
            '.category',
            '.tag',
            '.post-category',
            '[class*="category"]',
            '[class*="categoria"]'
        ]
        
        for selector in selectores_categoria:
            elemento = articulo.select_one(selector)
            if elemento:
                return elemento.get_text(strip=True)
        
        return None
    
    def _parsear_fecha(self, fecha_texto):
        """Intentar parsear fecha de diferentes formatos"""
        formatos = [
            '%Y-%m-%d',
            '%d/%m/%Y',
            '%d-%m-%Y',
            '%B %d, %Y',
            '%b %d, %Y',
            '%Y-%m-%dT%H:%M:%S',
            '%Y-%m-%d %H:%M:%S'
        ]
        
        for formato in formatos:
            try:
                return datetime.strptime(fecha_texto, formato)
            except:
                continue
        
        return fecha_texto  # Devolver texto original si no se puede parsear
    
    def scrapear_multiples_paginas(self, num_paginas=3):
        """Scrapear múltiples páginas de noticias"""
        for pagina in range(1, num_paginas + 1):
            print(f"Scrapeando página {pagina}...")
            
            # Construir URL de página (ajustar según el sitio)
            if pagina == 1:
                url_pagina = self.url_base
            else:
                # Ejemplos comunes de paginación
                urls_pagina = [
                    f"{self.url_base}/page/{pagina}",
                    f"{self.url_base}?page={pagina}",
                    f"{self.url_base}/pagina/{pagina}",
                    f"{self.url_base}/noticias/pagina/{pagina}"
                ]
                
                # Probar diferentes formatos de URL
                for url in urls_pagina:
                    soup = self.obtener_html(url)
                    if soup and self._tiene_contenido(soup):
                        url_pagina = url
                        break
                else:
                    print(f"No se encontró contenido en página {pagina}")
                    continue
            
            noticias_pagina = self.scrapear_noticias(url_pagina)
            self.noticias.extend(noticias_pagina)
            
            print(f"Extraídas {len(noticias_pagina)} noticias de página {pagina}")
            
            # Esperar para no sobrecargar el servidor
            time.sleep(self.delay)
    
    def _tiene_contenido(self, soup):
        """Verificar si la página tiene contenido"""
        articulos = soup.find_all('article') or soup.find_all('div', class_=re.compile(r'.*noticia.*', re.I))
        return len(articulos) > 0
    
    def guardar_resultados(self, nombre_archivo='noticias.csv'):
        """Guardar resultados en CSV y Excel"""
        if not self.noticias:
            print("No hay noticias para guardar")
            return
        
        df = pd.DataFrame(self.noticias)
        
        # Guardar CSV
        df.to_csv(nombre_archivo, index=False, encoding='utf-8-sig')
        print(f"Resultados guardados en {nombre_archivo}")
        
        # Guardar Excel con formato
        nombre_excel = nombre_archivo.replace('.csv', '.xlsx')
        with pd.ExcelWriter(nombre_excel, engine='openpyxl') as writer:
            df.to_excel(writer, sheet_name='Noticias', index=False)
            
            # Ajustar ancho de columnas
            worksheet = writer.sheets['Noticias']
            for idx, col in enumerate(df.columns):
                max_length = max(df[col].astype(str).map(len).max(), len(col)) + 2
                worksheet.column_dimensions[chr(65 + idx)].width = min(max_length, 50)
        
        print(f"Resultados también guardados en {nombre_excel}")
        
        # Estadísticas
        print(f"\n=== ESTADÍSTICAS ===")
        print(f"Total de noticias: {len(df)}")
        print(f"Noticias con título: {df['titulo'].notna().sum()}")
        print(f"Noticias con fecha: {df['fecha'].notna().sum()}")
        print(f"Noticias con autor: {df['autor'].notna().sum()}")
        
        if df['categoria'].notna().any():
            print("\nCategorías encontradas:")
            print(df['categoria'].value_counts().head())
    
    def generar_reporte(self):
        """Generar reporte de análisis de noticias"""
        if not self.noticias:
            print("No hay noticias para analizar")
            return
        
        df = pd.DataFrame(self.noticias)
        
        print("=== REPORTE DE ANÁLISIS DE NOTICIAS ===")
        
        # 1. Distribución por fecha
        if df['fecha'].notna().any():
            df['fecha_parsed'] = pd.to_datetime(df['fecha'], errors='coerce')
            df_fechas = df.dropna(subset=['fecha_parsed'])
            
            if not df_fechas.empty:
                print("\n1. Noticias por fecha:")
                noticias_por_fecha = df_fechas.groupby(df_fechas['fecha_parsed'].dt.date).size()
                print(noticias_por_fecha.tail(10))
        
        # 2. Top autores
        if df['autor'].notna().any():
            print("\n2. Top autores:")
            top_autores = df['autor'].value_counts().head(10)
            print(top_autores)
        
        # 3. Análisis de longitud de títulos
        if df['titulo'].notna().any():
            print("\n3. Análisis de títulos:")
            df['longitud_titulo'] = df['titulo'].str.len()
            print(f"Longitud promedio de títulos: {df['longitud_titulo'].mean():.1f} caracteres")
            print(f"Título más largo: {df.loc[df['longitud_titulo'].idxmax(), 'titulo'][:100]}...")
            print(f"Título más corto: {df.loc[df['longitud_titulo'].idxmin(), 'titulo']}")
        
        # 4. Categorías
        if df['categoria'].notna().any():
            print("\n4. Distribución por categoría:")
            categorias = df['categoria'].value_counts()
            print(categorias.head(10))
        
        return df

# Ejemplo de uso
def main_scraper():
    """Función principal para ejecutar el scraper"""
    # URL de ejemplo (ajustar según el sitio que se quiera scrapear)
    URL_EJEMPLO = "https://ejemplo.com/noticias"
    
    scraper = ScraperNoticias(URL_EJEMPLO, delay=2)
    
    print("Iniciando scraper de noticias...")
    scraper.scrapear_multiples_paginas(num_paginas=3)
    
    if scraper.noticias:
        scraper.guardar_resultados('noticias_extraidas.csv')
        scraper.generar_reporte()
    else:
        print("No se extrajo ninguna noticia. Verificar los selectores.")

# Ejecutar
if __name__ == "__main__":
    main_scraper()
```

#### Ejemplo 2: Analizador de Precios de E-commerce

```python
import requests
from bs4 import BeautifulSoup
import pandas as pd
import time
import json
from urllib.parse import urljoin, urlparse
import re

class AnalizadorPreciosEcommerce:
    """
    Analizador de precios para comparación de productos en e-commerce
    """
    
    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        self.productos = []
        self.config_sitios = {
            'amazon': {
                'selectores': {
                    'contenedor': '[data-component-type="s-search-result"]',
                    'titulo': 'h2 a span',
                    'precio': '.a-price-whole',
                    'precio_decimal': '.a-price-fraction',
                    'rating': '.a-icon-alt',
                    'imagen': '.s-image',
                    'enlace': 'h2 a'
                },
                'url_busqueda': 'https://www.amazon.com/s?k={query}'
            },
            'ebay': {
                'selectores': {
                    'contenedor': '.s-item',
                    'titulo': '.s-item__title',
                    'precio': '.s-item__price',
                    'imagen': '.s-item__image-img',
                    'enlace': '.s-item__link'
                },
                'url_busqueda': 'https://www.ebay.com/sch/i.html?_nkw={query}'
            }
        }
    
    def buscar_productos(self, query, sitio='amazon', max_paginas=3):
        """Buscar productos en un sitio de e-commerce"""
        if sitio not in self.config_sitios:
            print(f"Sitio {sitio} no soportado")
            return []
        
        config = self.config_sitios[sitio]
        url_busqueda = config['url_busqueda'].format(query=query.replace(' ', '+'))
        
        productos_encontrados = []
        
        for pagina in range(1, max_paginas + 1):
            print(f"Buscando en página {pagina} de {sitio}...")
            
            if pagina > 1:
                # Añadir parámetro de página (ajustar según el sitio)
                url_pagina = f"{url_busqueda}&page={pagina}"
            else:
                url_pagina = url_busqueda
            
            soup = self._obtener_soup(url_pagina)
            if not soup:
                continue
            
            productos_pagina = self._extraer_productos(soup, config['selectores'], sitio, query)
            productos_encontrados.extend(productos_pagina)
            
            print(f"Encontrados {len(productos_pagina)} productos en página {pagina}")
            
            time.sleep(2)  # Delay para no sobrecargar el servidor
        
        return productos_encontrados
    
    def _obtener_soup(self, url):
        """Obtener BeautifulSoup de una URL"""
        try:
            response = requests.get(url, headers=self.headers)
            response.raise_for_status()
            return BeautifulSoup(response.content, 'html.parser')
        except requests.exceptions.RequestException as e:
            print(f"Error obteniendo {url}: {e}")
            return None
    
    def _extraer_productos(self, soup, selectores, sitio, query):
        """Extraer productos del HTML"""
        productos = []
        contenedores = soup.select(selectores['contenedor'])
        
        for contenedor in contenedores:
            try:
                producto = self._extraer_info_producto(contenedor, selectores, sitio)
                if producto and producto['precio'] > 0:
                    producto['query'] = query
                    producto['sitio'] = sitio
                    productos.append(producto)
            except Exception as e:
                print(f"Error extrayendo producto: {e}")
                continue
        
        return productos
    
    def _extraer_info_producto(self, contenedor, selectores, sitio):
        """Extraer información de un producto individual"""
        producto = {
            'titulo': None,
            'precio': 0.0,
            'precio_original': 0.0,
            'descuento': 0,
            'rating': 0.0,
            'num_resenas': 0,
            'imagen': None,
            'enlace': None,
            'disponible': True
        }
        
        # Título
        if 'titulo' in selectores:
            titulo_elem = contenedor.select_one(selectores['titulo'])
            if titulo_elem:
                producto['titulo'] = titulo_elem.get_text(strip=True)
        
        # Precio (manejar diferentes formatos)
        precio = self._extraer_precio(contenedor, selectores, sitio)
        producto['precio'] = precio
        
        # Rating
        if 'rating' in selectores:
            rating_elem = contenedor.select_one(selectores['rating'])
            if rating_elem:
                producto['rating'] = self._parsear_rating(rating_elem.get_text(strip=True))
        
        # Imagen
        if 'imagen' in selectores:
            img_elem = contenedor.select_one(selectores['imagen'])
            if img_elem:
                producto['imagen'] = img_elem.get('src') or img_elem.get('data-src')
        
        # Enlace
        if 'enlace' in selectores:
            enlace_elem = contenedor.select_one(selectores['enlace'])
            if enlace_elem:
                enlace = enlace_elem.get('href')
                if enlace and not enlace.startswith('http'):
                    # Completar URL relativa
                    if sitio == 'amazon':
                        producto['enlace'] = f"https://www.amazon.com{enlace}"
                    elif sitio == 'ebay':
                        producto['enlace'] = f"https://www.ebay.com{enlace}"
                else:
                    producto['enlace'] = enlace
        
        return producto
    
    def _extraer_precio(self, contenedor, selectores, sitio):
        """Extraer y parsear precio"""
        precio = 0.0
        
        try:
            if sitio == 'amazon':
                # Amazon: precio entero y decimal por separado
                precio_entero = contenedor.select_one(selectores['precio'])
                precio_decimal = contenedor.select_one(selectores.get('precio_decimal', ''))
                
                if precio_entero:
                    entero = precio_entero.get_text(strip=True).replace(',', '')
                    decimal = ''
                    if precio_decimal:
                        decimal = precio_decimal.get_text(strip=True)
                    
                    precio_str = f"{entero}.{decimal}" if decimal else entero
                    precio = float(precio_str) if precio_str else 0.0
            
            else:
                # Otros sitios: buscar precio completo
                precio_elem = contenedor.select_one(selectores['precio'])
                if precio_elem:
                    precio_texto = precio_elem.get_text(strip=True)
                    # Extraer número del texto
                    numeros = re.findall(r'[\d,]+\.?\d*', precio_texto.replace(',', ''))
                    if numeros:
                        precio = float(numeros[0])
        
        except (ValueError, AttributeError) as e:
            print(f"Error parseando precio: {e}")
            precio = 0.0
        
        return precio
    
    def _parsear_rating(self, rating_texto):
        """Parsear rating de texto"""
        try:
            # Buscar número en el texto
            numeros = re.findall(r'[\d.]+', rating_texto)
            if numeros:
                rating = float(numeros[0])
                # Normalizar si está de 0-5 o 0-10
                if rating > 5:
                    rating = rating / 2
                return rating
        except:
            pass
        return 0.0
    
    def comparar_productos(self, queries, sitios=['amazon', 'ebay']):
        """Comparar productos en múltiples sitios"""
        todos_productos = []
        
        for query in queries:
            print(f"\nBuscando: {query}")
            for sitio in sitios:
                productos = self.buscar_productos(query, sitio, max_paginas=2)
                todos_productos.extend(productos)
                print(f"  {sitio}: {len(productos)} productos")
        
        if not todos_productos:
            print("No se encontraron productos")
            return pd.DataFrame()
        
        # Crear DataFrame
        df = pd.DataFrame(todos_productos)
        
        # Análisis de comparación
        self._generar_analisis_comparativo(df)
        
        return df
    
    def _generar_analisis_comparativo(self, df):
        """Generar análisis comparativo de precios"""
        print("\n=== ANÁLISIS COMPARATIVO DE PRECIOS ===")
        
        # 1. Resumen por sitio
        print("\n1. Resumen por sitio:")
        resumen_sitio = df.groupby('sitio').agg({
            'precio': ['count', 'mean', 'min', 'max'],
            'rating': 'mean'
        }).round(2)
        print(resumen_sitio)
        
        # 2. Productos más baratos por query
        print("\n2. Productos más baratos por búsqueda:")
        productos_baratos = df.loc[df.groupby(['query', 'sitio'])['precio'].idxmin()]
        for _, producto in productos_baratos.iterrows():
            print(f"  {producto['query']} en {producto['sitio']}: ${producto['precio']} - {producto['titulo'][:50]}...")
        
        # 3. Diferencia de precios por query
        print("\n3. Diferencia de precios por búsqueda:")
        for query in df['query'].unique():
            productos_query = df[df['query'] == query]
            precio_min = productos_query['precio'].min()
            precio_max = productos_query['precio'].max()
            diferencia = precio_max - precio_min
            print(f"  {query}: ${precio_min} - ${precio_max} (Diferencia: ${diferencia:.2f})")
        
        # 4. Mejores ofertas (precio vs rating)
        print("\n4. Mejores ofertas (alto rating, buen precio):")
        df['valoracion'] = (df['rating'] * 2) - (df['precio'] / df['precio'].max() * 10)
        mejores_ofertas = df.nlargest(5, 'valoracion')
        for _, producto in mejores_ofertas.iterrows():
            print(f"  {producto['titulo'][:50]}... - Rating: {producto['rating']}, Precio: ${producto['precio']}")
    
    def guardar_resultados(self, df, nombre_archivo='comparacion_precios'):
        """Guardar resultados en CSV y Excel"""
        # CSV
        archivo_csv = f"{nombre_archivo}.csv"
        df.to_csv(archivo_csv, index=False)
        print(f"\nResultados guardados en {archivo_csv}")
        
        # Excel con formato
        archivo_excel = f"{nombre_archivo}.xlsx"
        with pd.ExcelWriter(archivo_excel, engine='openpyxl') as writer:
            df.to_excel(writer, sheet_name='Productos', index=False)
            
            # Hoja de resumen
            resumen = df.groupby(['query', 'sitio']).agg({
                'precio': ['count', 'mean', 'min', 'max'],
                'rating': 'mean'
            }).round(2)
            resumen.to_excel(writer, sheet_name='Resumen')
        
        print(f"Resultados también guardados en {archivo_excel}")
    
    def monitorear_precios(self, urls_productos, intervalo_horas=24):
        """Monitorear precios de productos específicos"""
        print("=== MONITOREO DE PRECIOS ===")
        
        historial_precios = []
        
        for url in urls_productos:
            print(f"Monitoreando: {url}")
            soup = self._obtener_soup(url)
            if soup:
                precio_actual = self._extraer_precio_producto_individual(soup, url)
                if precio_actual:
                    historial_precios.append({
                        'url': url,
                        'fecha': datetime.now(),
                        'precio': precio_actual
                    })
            
            time.sleep(2)
        
        # Análisis de cambios
        if historial_precios:
            df_historial = pd.DataFrame(historial_precios)
            print(f"\nPrecios monitoreados: {len(df_historial)}")
            print(df_historial)
            
            return df_historial
        
        return pd.DataFrame()
    
    def _extraer_precio_producto_individual(self, soup, url):
        """Extraer precio de página individual de producto"""
        # Selectores comunes para páginas de producto
        selectores_precio = [
            '.a-price-whole',  # Amazon
            '.s-item__price',  # eBay
            '.price',
            '.precio',
            '.current-price',
            '[class*="price"]',
            'meta[property="product:price:amount"]'
        ]
        
        for selector in selectores_precio:
            elemento = soup.select_one(selector)
            if elemento:
                if elemento.name == 'meta':
                    precio_texto = elemento.get('content')
                else:
                    precio_texto = elemento.get_text(strip=True)
                
                # Extraer número
                numeros = re.findall(r'[\d,]+\.?\d*', precio_texto.replace(',', ''))
                if numeros:
                    return float(numeros[0])
        
        return None

# Ejemplo de uso
def main_analizador():
    """Función principal del analizador de precios"""
    analizador = AnalizadorPreciosEcommerce()
    
    # Productos a buscar
    productos_buscar = [
        'laptop gaming',
        'smartphone 5g',
        'tablet 10 pulgadas'
    ]
    
    # Comparar en múltiples sitios
    df_resultados = analizador.comparar_productos(productos_buscar, sitios=['amazon', 'ebay'])
    
    if not df_resultados.empty:
        # Guardar resultados
        analizador.guardar_resultados(df_resultados, 'comparacion_tecnologia')
        
        # Mostrar top 5 productos más baratos
        print("\n=== TOP 5 PRODUCTOS MÁS BARATOS ===")
        top_baratos = df_resultados.nsmallest(5, 'precio')
        for _, producto in top_baratos.iterrows():
            print(f"${producto['precio']:,.2f} - {producto['titulo'][:60]}... ({producto['sitio']})")
    
    # Monitorear precios específicos
    urls_monitorear = [
        'https://www.amazon.com/dp/B0XXXXXXX',  # Ejemplo
        'https://www.ebay.com/itm/XXXXXXXXX'    # Ejemplo
    ]
    
    # df_monitoreo = analizador.monitorear_precios(urls_monitorear)

if __name__ == "__main__":
    main_analizador()
```

### 📋 Resumen de Funciones Beautiful Soup

| Función | Descripción | Ejemplo |
|---------|-------------|---------|
| `BeautifulSoup()` | Crear objeto BeautifulSoup | `soup = BeautifulSoup(html, 'html.parser')` |
| `.find()` | Encontrar primer elemento | `soup.find('div')` |
| `.find_all()` | Encontrar todos los elementos | `soup.find_all('p')` |
| `.select()` | Selector CSS | `soup.select('.clase')` |
| `.select_one()` | Selector CSS primer elemento | `soup.select_one('#id')` |
| `.get_text()` | Obtener texto | `element.get_text(strip=True)` |
| `.get()` | Obtener atributo | `element.get('href')` |
| `.parent` | Acceder al padre | `element.parent` |
| `.children` | Acceder a hijos | `list(element.children)` |
| `.next_sibling` | Siguiente hermano | `element.next_sibling` |
| `.previous_sibling` | Anterior hermano | `element.previous_sibling` |
| `.new_tag()` | Crear nuevo tag | `soup.new_tag('div')` |
| `.append()` | Agregar elemento | `element.append(new_tag)` |
| `.decompose()` | Eliminar elemento | `element.decompose()` |
| `.prettify()` | Formatear HTML | `soup.prettify()` |

---

## 4. openai - Integración con Modelos de IA {#4-openai}

### 📚 Teoría Fundamental

**OpenAI** proporciona acceso a modelos de inteligencia artificial avanzados como GPT-3.5, GPT-4, DALL-E, etc. La librería `openai` permite integrar estos modelos en aplicaciones Python.

**Conceptos Clave:**
- **API Key**: Clave de autenticación para acceder a los servicios
- **Modelos**: Diferentes versiones (gpt-3.5-turbo, gpt-4, dall-e-3, etc.)
- **Tokens**: Unidades de procesamiento de texto
- **Prompt**: Instrucción o entrada para el modelo
- **Completion**: Respuesta generada por el modelo
- **Temperature**: Control de creatividad (0-2)
- **Max Tokens**: Límite de tokens en la respuesta

### 🛠️ Instalación y Configuración

```bash
pip install openai
```

### 📖 Uso Paso a Paso

#### 1. Configuración Inicial y Chat Básico

```python
import openai
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Configurar API key
openai.api_key = os.getenv('OPENAI_API_KEY')

# Verificar que la API key esté configurada
if not openai.api_key:
    raise ValueError("OPENAI_API_KEY no está configurada en las variables de entorno")

# Chat básico con GPT-3.5
def chat_basico():
    """Ejemplo de chat básico con GPT-3.5"""
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": "¿Cuál es la capital de Francia?"}
        ],
        max_tokens=50,
        temperature=0.3
    )
    
    respuesta = response.choices[0].message.content
    print(f"Respuesta: {respuesta}")
    print(f"Tokens usados: {response.usage.total_tokens}")
    
    return respuesta

# Función reutilizable para chat
def chat_con_gpt(mensaje, modelo="gpt-3.5-turbo", max_tokens=150, temperature=0.7):
    """
    Función genérica para chatear con GPT
    
    Args:
        mensaje: Mensaje del usuario
        modelo: Modelo a usar
        max_tokens: Máximo de tokens en la respuesta
        temperature: Creatividad (0-2, donde 0 es más determinista)
    
    Returns:
        Respuesta del modelo
    """
    try:
        response = openai.ChatCompletion.create(
            model=modelo,
            messages=[
                {"role": "user", "content": mensaje}
            ],
            max_tokens=max_tokens,
            temperature=temperature
        )
        
        return {
            'respuesta': response.choices[0].message.content,
            'tokens_usados': response.usage.total_tokens,
            'modelo': modelo
        }
    
    except openai.error.OpenAIError as e:
        return {
            'error': str(e),
            'respuesta': None
        }
```

#### 2. Conversación con Contexto

```python
class AsistenteConversacional:
    """
    Asistente que mantiene contexto de conversación
    """
    
    def __init__(self, modelo="gpt-3.5-turbo", max_tokens=500, temperature=0.7):
        self.modelo = modelo
        self.max_tokens = max_tokens
        self.temperature = temperature
        self.historial = []
        self.contexto_sistema = """Eres un asistente útil y amigable. 
        Responde de manera clara y concisa. 
        Si no sabes algo, indícalo honestamente."""
    
    def agregar_mensaje(self, rol, contenido):
        """Agregar mensaje al historial"""
        self.historial.append({
            "role": rol,
            "content": contenido
        })
    
    def obtener_respuesta(self, mensaje_usuario):
        """Obtener respuesta manteniendo contexto"""
        # Agregar mensaje del usuario
        self.agregar_mensaje("user", mensuario_usuario)
        
        # Limitar historial para no exceder límite de tokens
        mensajes = [{"role": "system", "content": self.contexto_sistema}] + self.historial[-10:]
        
        try:
            response = openai.ChatCompletion.create(
                model=self.modelo,
                messages=mensajes,
                max_tokens=self.max_tokens,
                temperature=self.temperature
            )
            
            respuesta = response.choices[0].message.content
            
            # Agregar respuesta al historial
            self.agregar_mensaje("assistant", respuesta)
            
            return {
                'respuesta': respuesta,
                'tokens_usados': response.usage.total_tokens,
                'total_tokens_acumulados': sum(msg.get('tokens_usados', 0) for msg in self.historial if isinstance(msg, dict))
            }
        
        except openai.error.OpenAIError as e:
            return {
                'error': str(e),
                'respuesta': None
            }
    
    def guardar_conversacion(self, archivo):
        """Guardar conversación en archivo"""
        with open(archivo, 'w', encoding='utf-8') as f:
            for mensaje in self.historial:
                f.write(f"{mensaje['role'].upper()}: {mensaje['content']}\n")
                f.write("-" * 50 + "\n")
    
    def cargar_contexto(self, nuevo_contexto):
        """Actualizar contexto del sistema"""
        self.contexto_sistema = nuevo_contexto

# Ejemplo de uso
def demo_asistente():
    """Demo del asistente conversacional"""
    asistente = AsistenteConversacional(
        modelo="gpt-3.5-turbo",
        temperature=0.5
    )
    
    # Configurar contexto específico
    asistente.cargar_contexto("""
    Eres un asistente de cocina experto. 
    Ayudas a planificar menús, das consejos de cocina y respondes preguntas sobre ingredientes y técnicas.
    Sé amable y da respuestas prácticas.
    """)
    
    print("=== ASISTENTE DE COCINA ===")
    print("Pregunta sobre cocina (escribe 'salir' para terminar):")
    
    while True:
        pregunta = input("\nTú: ")
        if pregunta.lower() == 'salir':
            break
        
        respuesta = asistente.obtener_respuesta(pregunta)
        if respuesta['respuesta']:
            print(f"Asistente: {respuesta['respuesta']}")
            print(f"Tokens usados: {respuesta['tokens_usados']}")
        else:
            print(f"Error: {respuesta.get('error', 'Error desconocido')}")
    
    # Guardar conversación
    asistente.guardar_conversacion('conversacion_cocina.txt')
    print("Conversación guardada en 'conversacion_cocina.txt'")
```

#### 3. Generación de Contenido

```python
class GeneradorContenido:
    """
    Generador de diferentes tipos de contenido usando GPT
    """
    
    def __init__(self, modelo="gpt-3.5-turbo"):
        self.modelo = modelo
    
    def generar_articulo_blog(self, tema, tono="profesional", palabras=500):
        """Generar artículo de blog"""
        prompt = f"""
        Escribe un artículo de blog sobre "{tema}".
        
        Requisitos:
        - Tono: {tono}
        - Longitud aproximada: {palabras} palabras
        - Incluir introducción, desarrollo y conclusión
        - Usar subtítulos para organizar el contenido
        - Incluir llamada a la acción al final
        
        El artículo debe ser original, informativo y engaging.
        """
        
        response = openai.ChatCompletion.create(
            model=self.modelo,
            messages=[
                {"role": "system", "content": "Eres un experto redactor de contenido para blogs."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=palabras * 2,  # Aproximadamente 2 tokens por palabra
            temperature=0.7
        )
        
        return response.choices[0].message.content
    
    def generar_posts_redes_sociales(self, tema, plataforma="Instagram", num_posts=3):
        """Generar posts para redes sociales"""
        caracteristicas = {
            "Instagram": "máximo 2,200 caracteres, uso de emojis relevantes, hashtags populares",
            "Twitter": "máximo 280 caracteres, conciso y directo, 2-3 hashtags",
            "LinkedIn": "tono profesional, 1,300 caracteres máximo, enfoque en valor",
            "Facebook": "hasta 63,206 caracteres, tono conversacional, enfoque en engagement"
        }
        
        prompt = f"""
        Crea {num_posts} posts para {plataforma} sobre "{tema}".
        
        Requisitos:
        - {caracteristicas.get(plataforma, "Estilo general")}
        - Cada post debe ser único y engaging
        - Incluir call-to-action
        - Adaptar el contenido a la plataforma
        
        Formato:
        Post 1:
        [Contenido del post 1]
        
        Post 2:
        [Contenido del post 2]
        
        Post 3:
        [Contenido del post 3]
        """
        
        response = openai.ChatCompletion.create(
            model=self.modelo,
            messages=[
                {"role": "system", "content": f"Eres un experto en marketing de redes sociales para {plataforma}."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=1000,
            temperature=0.8
        )
        
        return response.choices[0].message.content
    
    def generar_correo_marketing(self, producto, audiencia, objetivo="venta"):
        """Generar correo de marketing"""
        prompt = f"""
        Escribe un correo de marketing para promocionar "{producto}".
        
        Requisitos:
        - Audiencia: {audiencia}
        - Objetivo: {objetivo}
        - Incluir: asunto atractivo, saludo, desarrollo, call-to-action, despedida
        - Tono: persuasivo pero no agresivo
        - Longitud: 150-250 palabras
        
        El correo debe generar interés y acción.
        """
        
        response = openai.ChatCompletion.create(
            model=self.modelo,
            messages=[
                {"role": "system", "content": "Eres un experto en copywriting de email marketing."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=500,
            temperature=0.6
        )
        
        return response.choices[0].message.content
    
    def generar_script_video(self, tema, duracion_minutos=5, estilo="educativo"):
        """Generar script para video"""
        prompt = f"""
        Crea un script para un video de {duracion_minutos} minutos sobre "{tema}".
        
        Requisitos:
        - Estilo: {estilo}
        - Incluir: introducción, desarrollo, conclusión
        - Marcar pausas y énfasis
        - Incluir sugerencias de B-roll o gráficos
        - Tiempo aproximado para cada sección
        
        Formato:
        [INTRO - X segundos]
        [CONTENIDO PRINCIPAL - X segundos]
        [CONCLUSIÓN - X segundos]
        
        Script detallado con indicaciones.
        """
        
        response = openai.ChatCompletion.create(
            model=self.modelo,
            messages=[
                {"role": "system", "content": "Eres un guionista experto en contenido de video."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=1000,
            temperature=0.7
        )
        
        return response.choices[0].message.content

# Ejemplo de uso
def demo_generador():
    """Demo del generador de contenido"""
    generador = GeneradorContenido(modelo="gpt-3.5-turbo")
    
    print("=== GENERADOR DE CONTENIDO ===")
    
    # Generar artículo de blog
    print("\n1. Artículo de Blog:")
    articulo = generador.generar_articulo_blog(
        tema="Inteligencia Artificial en la Educación",
        tono="informativo",
        palabras=300
    )
    print(articulo[:500] + "..." if len(articulo) > 500 else articulo)
    
    # Generar posts para redes sociales
    print("\n2. Posts para Instagram:")
    posts = generador.generar_posts_redes_sociales(
        tema="Productividad personal",
        plataforma="Instagram",
        num_posts=2
    )
    print(posts)
    
    # Generar correo de marketing
    print("\n3. Correo de Marketing:")
    correo = generador.generar_correo_marketing(
        producto="Curso de Marketing Digital",
        audiencia="emprendedores y dueños de pequeños negocios",
        objetivo="venta"
    )
    print(correo)

# Ejecutar demo
# demo_generador()
```

#### 4. Análisis de Texto y Sentimiento

```python
class AnalizadorTexto:
    """
    Analizador de texto usando GPT para diferentes tareas
    """
    
    def __init__(self, modelo="gpt-3.5-turbo"):
        self.modelo = modelo
    
    def analizar_sentimiento(self, texto):
        """Analizar sentimiento del texto"""
        prompt = f"""
        Analiza el sentimiento del siguiente texto:
        
        Texto: "{texto}"
        
        Proporciona:
        1. Sentimiento principal (positivo, negativo, neutral)
        2. Puntuación de -1 a 1 (-1 muy negativo, 1 muy positivo)
        3. Confianza en el análisis (alta, media, baja)
        4. Aspectos específicos que influyen en el sentimiento
        
        Responde en formato JSON.
        """
        
        response = openai.ChatCompletion.create(
            model=self.modelo,
            messages=[
                {"role": "system", "content": "Eres un experto en análisis de sentimiento y procesamiento de lenguaje natural."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=300,
            temperature=0.3
        )
        
        return response.choices[0].message.content
    
    def extraer_entidades(self, texto, tipo_entidades=None):
        """Extraer entidades del texto"""
        tipos = tipo_entidades or ["personas", "organizaciones", "lugares", "fechas", "productos", "eventos"]
        
        prompt = f"""
        Extrae las siguientes entidades del texto:
        
        Texto: "{texto}"
        
        Tipos de entidades a extraer: {', '.join(tipos)}
        
        Para cada entidad encontrada, proporciona:
        - Texto: el texto exacto
        - Tipo: el tipo de entidad
        - Posición: posición en el texto
        
        Responde en formato JSON con una lista de entidades.
        """
        
        response = openai.ChatCompletion.create(
            model=self.modelo,
            messages=[
                {"role": "system", "content": "Eres un experto en reconocimiento de entidades nombradas."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=500,
            temperature=0.3
        )
        
        return response.choices[0].message.content
    
    def resumir_texto(self, texto, longitud_resumen="corta"):
        """Resumir texto"""
        opciones_longitud = {
            "corta": "50-100 palabras",
            "media": "100-200 palabras",
            "larga": "200-300 palabras"
        }
        
        prompt = f"""
        Resume el siguiente texto en español:
        
        Texto original:
        {texto}
        
        Requisitos del resumen:
        - Longitud: {opciones_longitud.get(longitud_resumen, "100-200 palabras")}
        - Incluir los puntos principales y ideas clave
        - Usar tus propias palabras
        - Mantener el tono y estilo del original
        - Ser coherente y comprensible por sí solo
        
        Resumen:
        """
        
        response = openai.ChatCompletion.create(
            model=self.modelo,
            messages=[
                {"role": "system", "content": "Eres un experto en resumen de textos."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=400,
            temperature=0.5
        )
        
        return response.choices[0].message.content
    
    def clasificar_texto(self, texto, categorias):
        """Clasificar texto en categorías"""
        prompt = f"""
        Clasifica el siguiente texto en una de estas categorías:
        
        Categorías: {', '.join(categorias)}
        
        Texto: "{texto}"
        
        Proporciona:
        1. Categoría asignada
        2. Confianza en la clasificación (0-1)
        3. Justificación de la clasificación
        4. Segunda categoría más probable (si aplica)
        
        Responde en formato JSON.
        """
        
        response = openai.ChatCompletion.create(
            model=self.modelo,
            messages=[
                {"role": "system", "content": "Eres un experto en clasificación de textos."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=200,
            temperature=0.3
        )
        
        return response.choices[0].message.content
    
    def traducir_texto(self, texto, idioma_destino="inglés"):
        """Traducir texto a otro idioma"""
        prompt = f"""
        Traduce el siguiente texto al {idioma_destino}:
        
        Texto original: "{texto}"
        
        Requisitos:
        - Mantener el significado y tono original
        - Usar gramática y vocabulario apropiados
        - Si hay ambigüedad, mantener el contexto
        - Para textos técnicos, usar terminología correcta
        
        Traducción:
        """
        
        response = openai.ChatCompletion.create(
            model=self.modelo,
            messages=[
                {"role": "system", "content": f"Eres un experto traductor al {idioma_destino}."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=1000,
            temperature=0.3
        )
        
        return response.choices[0].message.content

# Ejemplo de análisis de reseñas
def analisis_resenas():
    """Analizar reseñas de productos"""
    analizador = AnalizadorTexto()
    
    # Reseñas de ejemplo
    resenas = [
        "Este producto es excelente, superó todas mis expectativas. La calidad es impresionante y el servicio al cliente fue maravilloso.",
        "No recomiendo este producto. Llegó dañado y el vendedor no respondió a mis mensajes. Una experiencia terrible.",
        "El producto está bien, cumple con lo prometido aunque el envío tardó más de lo esperado. Relación calidad-precio aceptable."
    ]
    
    print("=== ANÁLISIS DE RESEÑAS ===")
    
    resultados = []
    for i, resena in enumerate(resenas, 1):
        print(f"\nReseña {i}: {resena}")
        
        # Análisis de sentimiento
        sentimiento = analizador.analizar_sentimiento(resena)
        print(f"Análisis de sentimiento: {sentimiento}")
        
        # Extraer aspectos clave
        aspectos = analizador.extraer_entidades(resena, ["productos", "servicios", "calidades"])
        print(f"Aspectos encontrados: {aspectos}")
        
        resultados.append({
            'resena': resena,
            'sentimiento': sentimiento,
            'aspectos': aspectos
        })
    
    return resultados
```

#### 5. Generación de Código y Asistente de Programación

```python
class AsistenteProgramacion:
    """
    Asistente de programación usando GPT
    """
    
    def __init__(self, modelo="gpt-3.5-turbo"):
        self.modelo = modelo
    
    def explicar_codigo(self, codigo, lenguaje="Python"):
        """Explicar código línea por línea"""
        prompt = f"""
        Explica el siguiente código {lenguaje} línea por línea:
        
        Código:
        ```{lenguaje.lower()}
        {codigo}
        ```
        
        Proporciona:
        1. Explicación detallada de cada línea o bloque
        2. Propósito general del código
        3. Posibles mejoras o optimizaciones
        4. Errores potenciales o consideraciones
        
        Usa un lenguaje claro y educativo.
        """
        
        response = openai.ChatCompletion.create(
            model=self.modelo,
            messages=[
                {"role": "system", "content": "Eres un experto programador y profesor de código."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=1000,
            temperature=0.3
        )
        
        return response.choices[0].message.content
    
    def depurar_codigo(self, codigo, error, lenguaje="Python"):
        """Ayudar a depurar código con errores"""
        prompt = f"""
        Ayuda a depurar el siguiente código {lenguaje}:
        
        Código:
        ```{lenguaje.lower()}
        {codigo}
        ```
        
        Error o problema:
        {error}
        
        Proporciona:
        1. Posibles causas del error
        2. Solución específica
        3. Código corregido
        4. Explicación de la solución
        5. Consejos para evitar errores similares
        """
        
        response = openai.ChatCompletion.create(
            model=self.modelo,
            messages=[
                {"role": "system", "content": "Eres un experto en depuración de código."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=1000,
            temperature=0.3
        )
        
        return response.choices[0].message.content
    
    def optimizar_codigo(self, codigo, lenguaje="Python"):
        """Sugerir optimizaciones para el código"""
        prompt = f"""
        Optimiza el siguiente código {lenguaje}:
        
        Código original:
        ```{lenguaje.lower()}
        {codigo}
        ```
        
        Proporciona:
        1. Análisis de complejidad actual
        2. Código optimizado
        3. Explicación de las mejoras
        4. Métricas de mejora (si aplica)
        5. Consejos adicionales de optimización
        
        Enfócate en eficiencia, legibilidad y mejores prácticas.
        """
        
        response = openai.ChatCompletion.create(
            model=self.modelo,
            messages=[
                {"role": "system", "content": "Eres un experto en optimización de código y algoritmos."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=1000,
            temperature=0.3
        )
        
        return response.choices[0].message.content
    
    def generar_funcion(self, descripcion, lenguaje="Python", incluir_tests=True):
        """Generar función a partir de descripción"""
        prompt = f"""
        Crea una función en {lenguaje} basada en la siguiente descripción:
        
        Descripción: {descripcion}
        
        Requisitos:
        1. Función bien documentada con docstring
        2. Manejo de errores apropiado
        3. Código limpio y legible
        4. {"Incluir tests unitarios" if incluir_tests else ""}
        5. Seguir convenciones del lenguaje
        
        Proporciona solo el código, sin explicaciones adicionales.
        """
        
        response = openai.ChatCompletion.create(
            model=self.modelo,
            messages=[
                {"role": "system", "content": f"Eres un experto en {lenguaje} y generas código de alta calidad."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=800,
            temperature=0.5
        )
        
        return response.choices[0].message.content
    
    def convertir_codigo(self, codigo, lenguaje_origen, lenguaje_destino):
        """Convertir código entre lenguajes de programación"""
        prompt = f"""
        Convierte el siguiente código de {lenguaje_origen} a {lenguaje_destino}:
        
        Código {lenguaje_origen}:
        ```{lenguaje_origen.lower()}
        {codigo}
        ```
        
        Requisitos:
        1. Mantener la misma funcionalidad
        2. Usar las mejores prácticas del lenguaje destino
        3. Incluir comentarios explicativos
        4. Manejar diferencias de sintaxis y paradigmas
        5. Si no hay equivalente directo, explicar la alternativa
        
        Proporciona el código convertido y una breve explicación de los cambios principales.
        """
        
        response = openai.ChatCompletion.create(
            model=self.modelo,
            messages=[
                {"role": "system", "content": f"Eres experto en {lenguaje_origen} y {lenguaje_destino}."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=1000,
            temperature=0.3
        )
        
        return response.choices[0].message.content

# Ejemplo de uso
def demo_asistente_programacion():
    """Demo del asistente de programación"""
    asistente = AsistenteProgramacion()
    
    # Código con error
    codigo_con_error = """
def calcular_promedio(numeros):
    suma = 0
    for num in numeros:
        suma += num
    promedio = suma / len(numeros)
    return promedio

# Uso
lista = [1, 2, 3, 4, 5]
print(calcular_promedio(lista))
lista_vacia = []
print(calcular_promedio(lista_vacia))
    """
    
    print("=== ASISTENTE DE PROGRAMACIÓN ===")
    
    # Explicar código
    print("\n1. Explicación de código:")
    explicacion = asistente.explicar_codigo(codigo_con_error)
    print(explicacion)
    
    # Depurar código
    print("\n2. Ayuda con error:")
    error = "ZeroDivisionError: division by zero"
    ayuda = asistente.depurar_codigo(codigo_con_error, error)
    print(ayuda)
    
    # Optimizar código
    codigo_a_optimizar = """
def buscar_duplicados(lista):
    duplicados = []
    for i in range(len(lista)):
        for j in range(i+1, len(lista)):
            if lista[i] == lista[j] and lista[i] not in duplicados:
                duplicados.append(lista[i])
    return duplicados
    """
    
    print("\n3. Optimización de código:")
    optimizacion = asistente.optimizar_codigo(codigo_a_optimizar)
    print(optimizacion)
    
    # Generar función
    print("\n4. Generación de función:")
    descripcion = "Una función que valide si una contraseña es segura (mínimo 8 caracteres, debe incluir mayúsculas, minúsculas, números y caracteres especiales)"
    funcion = asistente.generar_funcion(descripcion)
    print(funcion)

# Ejecutar demo
# demo_asistente_programacion()
```

#### 6. Análisis de Datos con GPT

No, el código de la clase `AnalizadorDatosGPT` está **incompleto**. El método `generar_codigo_analisis` se cortó abruptamente en la línea:

```
2. Incluir carg
```

A continuación te proporciono la **versión completa y corregida** de esa clase, incluyendo el método faltante y algunas mejoras adicionales para que sea funcional y didáctico:

---

### ✅ Clase `AnalizadorDatosGPT` – Versión Completa

```python
import openai
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

class AnalizadorDatosGPT:
    """
    Análisis de datos asistido por GPT
    """
    
    def __init__(self, modelo="gpt-3.5-turbo"):
        self.modelo = modelo
    
    def analizar_dataset(self, descripcion_dataset, columnas, muestra_datos):
        """Analizar y sugerir insights sobre un dataset"""
        prompt = f"""
        Analiza el siguiente dataset:
        
        Descripción: {descripcion_dataset}
        
        Columnas: {', '.join(columnas)}
        
        Muestra de datos (primeras 5 filas):
        {muestra_datos}
        
        Proporciona:
        1. Tipo de análisis recomendado
        2. Posibles patrones a investigar
        3. Gráficos sugeridos
        4. Preguntas de negocio que podrían responderse
        5. Variables que podrían estar correlacionadas
        6. Limpieza de datos sugerida
        
        Sé específico y práctico en las recomendaciones.
        """
        
        response = openai.ChatCompletion.create(
            model=self.modelo,
            messages=[
                {"role": "system", "content": "Eres un experto en análisis de datos y ciencia de datos."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=800,
            temperature=0.3
        )
        
        return response.choices[0].message.content
    
    def generar_codigo_analisis(self, dataset_info, tipo_analisis):
        """Generar código Python para análisis específico"""
        prompt = f"""
        Genera código Python usando pandas y matplotlib/seaborn para:
        
        Tipo de análisis: {tipo_analisis}
        
        Información del dataset: {dataset_info}
        
        Requisitos:
        1. Código completo y funcional
        2. Incluir carga de datos desde CSV
        3. Incluir visualizaciones con matplotlib o seaborn
        4. Incluir análisis estadístico descriptivo
        5. Incluir comentarios explicativos
        6. Usar buenas prácticas de programación
        
        Proporciona solo el código Python, sin explicaciones adicionales.
        """
        
        response = openai.ChatCompletion.create(
            model=self.modelo,
            messages=[
                {"role": "system", "content": "Eres un experto en análisis de datos con Python."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=1000,
            temperature=0.3
        )
        
        return response.choices[0].message.content
    
    def generar_dashboard_baseline(self, df, objetivo):
        """Generar sugerencias para un dashboard interactivo"""
        buffer = df.head().to_string()
        columnas = list(df.columns)
        tipos = df.dtypes.to_dict()
        
        prompt = f"""
        Quiero crear un dashboard interactivo para este dataset con el siguiente objetivo: {objetivo}
        
        Columnas: {columnas}
        Tipos de datos: {tipos}
        
        Muestra:
        {buffer}
        
        Proporciona:
        1. Gráficos recomendados (tipo y propósito)
        2. Filtros interactivos sugeridos
        3. Layout de dashboard (secciones)
        4. Herramientas recomendadas (Streamlit, Dash, etc.)
        5. KPIs o métricas clave a mostrar
        
        Responde en formato de lista estructurada.
        """
        
        response = openai.ChatCompletion.create(
            model=self.modelo,
            messages=[
                {"role": "system", "content": "Eres un experto en visualización de datos y dashboards."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=800,
            temperature=0.3
        )
        
        return response.choices[0].message.content

# Ejemplo de uso
if __name__ == "__main__":
    # Datos de ejemplo
    data = {
        'Nombre': ['Ana', 'Carlos', 'María', 'Luis'],
        'Edad': [25, 30, 35, 28],
        'Ciudad': ['Madrid', 'Barcelona', 'Valencia', 'Sevilla'],
        'Ventas': [2500, 3000, 2800, 2200]
    }
    df = pd.DataFrame(data)

    analizador = AnalizadorDatosGPT()

    print("=== ANÁLISIS DE DATASET ===")
    analisis = analizador.analizar_dataset(
        descripcion_dataset="Dataset de ventas por empleado",
        columnas=list(df.columns),
        muestra_datos=df.head().to_string()
    )
    print(analisis)

    print("\n=== CÓDIGO GENERADO ===")
    codigo = analizador.generar_codigo_analisis(
        dataset_info="Dataset con columnas: Nombre, Edad, Ciudad, Ventas",
        tipo_analisis="Análisis de ventas por ciudad y edad"
    )
    print(codigo)

    print("\n=== DASHBOARD RECOMENDADO ===")
    dashboard = analizador.generar_dashboard_baseline(
        df=df,
        objetivo="Analizar el rendimiento de ventas por ciudad y grupo de edad"
    )
    print(dashboard)
```

---

### ✅ Resumen de lo que se completó

| Método | Descripción | Estado |
|--------|-------------|--------|
| `analizar_dataset()` | Analiza y sugiere insights | ✅ Completo |
| `generar_codigo_analisis()` | Genera código Python para análisis | ✅ **Corregido y completado** |
| `generar_dashboard_baseline()` | Sugiere dashboards interactivos | ✅ **Agregado nuevo** |

---

---

## 5. python-dotenv - Gestión de Variables de Entorno {#5-python-dotenv}

### 📚 Teoría Fundamental

**python-dotenv** es una librería que permite cargar variables de entorno desde un archivo `.env` hacia las variables de entorno del sistema operativo. Es esencial para gestionar configuraciones sensibles (API keys, contraseñas, URLs) sin hardcodearlas en el código.

**Conceptos Clave:**
- **Variables de entorno**: Valores configurables externamente al código
- **Archivo .env**: Archivo de texto con formato `CLAVE=valor`
- **Seguridad**: Evita exponer información sensible en el código
- **Portabilidad**: Facilita cambiar configuraciones entre entornos
- **Principio DRY**: Don't Repeat Yourself - centraliza configuraciones

### 🛠️ Instalación y Configuración

```bash
pip install python-dotenv
```

### 📖 Uso Paso a Paso

#### 1. Creación y Estructura del Archivo .env

```python
# Crear archivo .env (ejemplo completo)
# IMPORTANTE: .env nunca debe subirse a repositorios públicos

# Configuración de APIs
OPENAI_API_KEY=sk-1234567890abcdef...
WEATHER_API_KEY=abc123xyz456
DATABASE_URL=postgresql://user:pass@localhost:5432/midb

# Configuración de aplicación
APP_NAME=MiAplicacion
APP_VERSION=1.0.0
DEBUG=True
PORT=8000
HOST=localhost

# Configuración de email
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
EMAIL_USER=miapp@gmail.com
EMAIL_PASS=mi_contraseña_segura

# Rutas y directorios
UPLOAD_FOLDER=/ruta/a/uploads
LOG_FILE=/ruta/a/logs/app.log

# Configuración de red
TIMEOUT=30
MAX_RETRIES=3
RATE_LIMIT=100

# Variables de entorno por defecto
DEFAULT_LANGUAGE=es
DEFAULT_CURRENCY=EUR
TIMEZONE=Europe/Madrid
```

#### 2. Carga Básica de Variables

```python
from dotenv import load_dotenv
import os

# Método 1: Cargar desde el archivo .env en el directorio actual
load_dotenv()

# Ahora puedes acceder a las variables
api_key = os.getenv('OPENAI_API_KEY')
db_url = os.getenv('DATABASE_URL')
debug_mode = os.getenv('DEBUG', 'False').lower() == 'true'

print(f"API Key: {api_key}")
print(f"Database URL: {db_url}")
print(f"Debug Mode: {debug_mode}")

# Método 2: Especificar ruta del archivo
load_dotenv('/ruta/especifica/.env')

# Método 3: Cargar desde string (útil para pruebas)
from dotenv import dotenv_values

env_string = """
API_KEY=test123
DEBUG=True
PORT=3000
"""

config = dotenv_values(stream=env_string)
print(f"Config desde string: {config}")
```

#### 3. Manejo de Tipos de Datos

```python
import os
from dotenv import load_dotenv
from typing import Optional, Union

class ConfigManager:
    """Gestor avanzado de configuración con tipos de datos"""
    
    def __init__(self, env_file: Optional[str] = None):
        if env_file:
            load_dotenv(env_file)
        else:
            load_dotenv()
    
    def get_string(self, key: str, default: str = "") -> str:
        """Obtener valor como string"""
        return os.getenv(key, default)
    
    def get_int(self, key: str, default: int = 0) -> int:
        """Obtener valor como entero"""
        try:
            return int(os.getenv(key, default))
        except (ValueError, TypeError):
            return default
    
    def get_float(self, key: str, default: float = 0.0) -> float:
        """Obtener valor como float"""
        try:
            return float(os.getenv(key, default))
        except (ValueError, TypeError):
            return default
    
    def get_bool(self, key: str, default: bool = False) -> bool:
        """Obtener valor como booleano"""
        value = os.getenv(key, str(default)).lower()
        return value in ('true', '1', 'yes', 'on', 'si')
    
    def get_list(self, key: str, separator: str = ",", default: Optional[list] = None) -> list:
        """Obtener valor como lista"""
        if default is None:
            default = []
        
        value = os.getenv(key)
        if not value:
            return default
        
        return [item.strip() for item in value.split(separator) if item.strip()]
    
    def get_dict(self, key: str, default: Optional[dict] = None) -> dict:
        """Obtener valor como diccionario (formato JSON)"""
        if default is None:
            default = {}
        
        value = os.getenv(key)
        if not value:
            return default
        
        try:
            import json
            return json.loads(value)
        except json.JSONDecodeError:
            return default

# Ejemplo de uso
config = ConfigManager()

# Uso con tipos de datos
api_key = config.get_string('OPENAI_API_KEY')
port = config.get_int('PORT', 8000)
timeout = config.get_float('TIMEOUT', 30.5)
debug = config.get_bool('DEBUG', False)
allowed_hosts = config.get_list('ALLOWED_HOSTS', default=['localhost', '127.0.0.1'])
database_config = config.get_dict('DATABASE_CONFIG', default={})

print(f"API Key: {api_key[:10]}...")
print(f"Port: {port} (tipo: {type(port)})")
print(f"Timeout: {timeout} (tipo: {type(timeout)})")
print(f"Debug: {debug} (tipo: {type(debug)})")
print(f"Allowed Hosts: {allowed_hosts}")
print(f"Database Config: {database_config}")
```

#### 4. Validación y Seguridad

```python
import os
from dotenv import load_dotenv
from typing import Dict, List, Optional
import re

class SecureConfigManager:
    """Gestor seguro de configuración con validación"""
    
    def __init__(self, required_vars: Optional[List[str]] = None):
        load_dotenv()
        self.required_vars = required_vars or []
        self._validate_required()
    
    def _validate_required(self):
        """Validar que existan variables requeridas"""
        missing = []
        for var in self.required_vars:
            if not os.getenv(var):
                missing.append(var)
        
        if missing:
            raise ValueError(f"Variables de entorno faltantes: {', '.join(missing)}")
    
    def validate_api_key(self, key_name: str, pattern: str = r"^sk-[a-zA-Z0-9]{48}$") -> bool:
        """Validar formato de API key"""
        value = os.getenv(key_name)
        if not value:
            return False
        
        return bool(re.match(pattern, value))
    
    def validate_url(self, key_name: str, required_schemes: List[str] = None) -> bool:
        """Validar formato de URL"""
        value = os.getenv(key_name)
        if not value:
            return False
        
        if required_schemes:
            return any(value.startswith(scheme) for scheme in required_schemes)
        
        return value.startswith(('http://', 'https://'))
    
    def validate_email(self, key_name: str) -> bool:
        """Validar formato de email"""
        value = os.getenv(key_name)
        if not value:
            return False
        
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return bool(re.match(pattern, value))
    
    def mask_sensitive_data(self, key_name: str, show_chars: int = 4) -> str:
        """Enmascarar datos sensibles"""
        value = os.getenv(key_name)
        if not value:
            return ""
        
        if len(value) <= show_chars:
            return "*" * len(value)
        
        return value[:show_chars] + "*" * (len(value) - show_chars)
    
    def get_secure_config(self) -> Dict[str, str]:
        """Obtener configuración con datos sensibles enmascarados"""
        config = {}
        sensitive_keys = ['KEY', 'PASSWORD', 'SECRET', 'TOKEN', 'PRIVATE']
        
        for key, value in os.environ.items():
            if any(sensitive in key.upper() for sensitive in sensitive_keys):
                config[key] = self.mask_sensitive_data(key)
            else:
                config[key] = value
        
        return config

# Ejemplo de uso seguro
required_variables = ['OPENAI_API_KEY', 'DATABASE_URL', 'EMAIL_USER']

try:
    secure_config = SecureConfigManager(required_variables)
    
    # Validaciones
    is_api_key_valid = secure_config.validate_api_key('OPENAI_API_KEY')
    is_db_url_valid = secure_config.validate_url('DATABASE_URL', ['postgresql://', 'mysql://'])
    is_email_valid = secure_config.validate_email('EMAIL_USER')
    
    print(f"API Key válida: {is_api_key_valid}")
    print(f"Database URL válida: {is_db_url_valid}")
    print(f"Email válido: {is_email_valid}")
    
    # Configuración segura
    config_segura = secure_config.get_secure_config()
    print(f"Configuración segura: {config_segura}")
    
except ValueError as e:
    print(f"Error de configuración: {e}")
```

#### 5. Múltiples Entornos y Configuraciones

```python
import os
from dotenv import load_dotenv
from pathlib import Path

class MultiEnvironmentConfig:
    """Gestión de múltiples entornos (desarrollo, pruebas, producción)"""
    
    def __init__(self, base_path: str = ".", current_env: str = None):
        self.base_path = Path(base_path)
        self.current_env = current_env or os.getenv('ENVIRONMENT', 'development')
        self.config = {}
        self._load_environment_config()
    
    def _load_environment_config(self):
        """Cargar configuración según el entorno"""
        # Archivos a cargar en orden (del más general al más específico)
        config_files = [
            '.env',  # Configuración base
            f'.env.{self.current_env}',  # Configuración específica del entorno
            '.env.local',  # Configuración local (no versionar)
        ]
        
        for file in config_files:
            env_file = self.base_path / file
            if env_file.exists():
                load_dotenv(env_file)
                print(f"Cargado: {file}")
        
        # Cargar configuración actual
        self._parse_current_config()
    
    def _parse_current_config(self):
        """Parsear configuración actual"""
        prefix = f"{self.current_env.upper()}_"
        
        for key, value in os.environ.items():
            if key.startswith(prefix):
                config_key = key.replace(prefix, '')
                self.config[config_key] = value
            elif not any(key.startswith(env.upper()) for env in ['DEVELOPMENT_', 'STAGING_', 'PRODUCTION_']):
                # Configuración base
                self.config[key] = value
    
    def get_current_environment(self) -> str:
        """Obtener entorno actual"""
        return self.current_env
    
    def is_development(self) -> bool:
        """¿Es entorno de desarrollo?"""
        return self.current_env == 'development'
    
    def is_production(self) -> bool:
        """¿Es entorno de producción?"""
        return self.current_env == 'production'
    
    def is_testing(self) -> bool:
        """¿Es entorno de pruebas?"""
        return self.current_env == 'testing'
    
    def get_database_config(self) -> dict:
        """Obtener configuración de base de datos según entorno"""
        if self.is_production():
            return {
                'host': os.getenv('PROD_DB_HOST'),
                'port': int(os.getenv('PROD_DB_PORT', 5432)),
                'name': os.getenv('PROD_DB_NAME'),
                'user': os.getenv('PROD_DB_USER'),
                'password': os.getenv('PROD_DB_PASSWORD')
            }
        elif self.is_testing():
            return {
                'host': os.getenv('TEST_DB_HOST', 'localhost'),
                'port': int(os.getenv('TEST_DB_PORT', 5432)),
                'name': os.getenv('TEST_DB_NAME', 'test_db'),
                'user': os.getenv('TEST_DB_USER', 'test_user'),
                'password': os.getenv('TEST_DB_PASSWORD', 'test_pass')
            }
        else:  # development
            return {
                'host': os.getenv('DEV_DB_HOST', 'localhost'),
                'port': int(os.getenv('DEV_DB_PORT', 5432)),
                'name': os.getenv('DEV_DB_NAME', 'dev_db'),
                'user': os.getenv('DEV_DB_USER', 'dev_user'),
                'password': os.getenv('DEV_DB_PASSWORD', 'dev_pass')
            }

# Ejemplo de uso
def demo_multientorno():
    """Demo de configuración multi-entorno"""
    
    # Simular diferentes entornos
    entornos = ['development', 'testing', 'production']
    
    for env in entornos:
        print(f"\n=== ENTORNO: {env.upper()} ===")
        
        # Establecer entorno
        os.environ['ENVIRONMENT'] = env
        
        # Crear configurador
        config = MultiEnvironmentConfig()
        
        print(f"Entorno actual: {config.get_current_environment()}")
        print(f"¿Es desarrollo? {config.is_development()}")
        print(f"¿Es producción? {config.is_production()}")
        
        # Configuración de base de datos
        db_config = config.get_database_config()
        print(f"Config DB: {db_config}")
```

#### 6. Integración con Aplicaciones Web

```python
from flask import Flask, jsonify
from dotenv import load_dotenv
import os

# Cargar variables de entorno
load_dotenv()

app = Flask(__name__)

# Configuración desde variables de entorno
app.config.update(
    SECRET_KEY=os.getenv('SECRET_KEY', 'clave-secreta-por-defecto'),
    DEBUG=os.getenv('FLASK_DEBUG', 'False').lower() == 'true',
    PORT=int(os.getenv('FLASK_PORT', 5000)),
    HOST=os.getenv('FLASK_HOST', '127.0.0.1')
)

# Configuración de base de datos
database_config = {
    'provider': os.getenv('DB_PROVIDER', 'sqlite'),
    'database': os.getenv('DB_NAME', 'app.db'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
    'host': os.getenv('DB_HOST', 'localhost'),
    'port': int(os.getenv('DB_PORT', 5432))
}

@app.route('/config')
def get_config():
    """Endpoint para ver configuración (sin datos sensibles)"""
    safe_config = {
        'app_name': os.getenv('APP_NAME', 'MiApp'),
        'version': os.getenv('APP_VERSION', '1.0.0'),
        'environment': os.getenv('ENVIRONMENT', 'development'),
        'debug': app.config['DEBUG'],
        'database_provider': database_config['provider']
    }
    return jsonify(safe_config)

@app.route('/health')
def health_check():
    """Endpoint de salud"""
    return jsonify({
        'status': 'healthy',
        'environment': os.getenv('ENVIRONMENT', 'development'),
        'timestamp': pd.Timestamp.now().isoformat()
    })

if __name__ == '__main__':
    app.run(
        host=app.config['HOST'],
        port=app.config['PORT'],
        debug=app.config['DEBUG']
    )
```

### 💡 Ejemplos Prácticos de Implementación

#### Ejemplo 1: Sistema de Configuración Completo para Proyecto ML

```python
"""
config.py - Sistema completo de configuración para proyecto de Machine Learning
"""

import os
from dotenv import load_dotenv
from typing import Dict, Any
import json

# Cargar variables de entorno
load_dotenv()

class MLProjectConfig:
    """Configuración completa para proyecto de Machine Learning"""
    
    def __init__(self):
        # API Keys
        self.OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
        self.HUGGINGFACE_API_KEY = os.getenv('HUGGINGFACE_API_KEY')
        self.WANDB_API_KEY = os.getenv('WANDB_API_KEY')
        
        # Paths
        self.DATA_PATH = os.getenv('DATA_PATH', './data')
        self.MODELS_PATH = os.getenv('MODELS_PATH', './models')
        self.LOGS_PATH = os.getenv('LOGS_PATH', './logs')
        self.OUTPUTS_PATH = os.getenv('OUTPUTS_PATH', './outputs')
        
        # Model Configuration
        self.MODEL_NAME = os.getenv('MODEL_NAME', 'gpt-3.5-turbo')
        self.MAX_TOKENS = int(os.getenv('MAX_TOKENS', 500))
        self.TEMPERATURE = float(os.getenv('TEMPERATURE', 0.7))
        
        # Training Configuration
        self.BATCH_SIZE = int(os.getenv('BATCH_SIZE', 32))
        self.LEARNING_RATE = float(os.getenv('LEARNING_RATE', 1e-4))
        self.EPOCHS = int(os.getenv('EPOCHS', 10))
        self.VALIDATION_SPLIT = float(os.getenv('VALIDATION_SPLIT', 0.2))
        
        # Database Configuration
        self.DB_HOST = os.getenv('DB_HOST', 'localhost')
        self.DB_PORT = int(os.getenv('DB_PORT', 5432))
        self.DB_NAME = os.getenv('DB_NAME', 'mlproject')
        self.DB_USER = os.getenv('DB_USER', 'postgres')
        self.DB_PASSWORD = os.getenv('DB_PASSWORD', '')
        
        # Monitoring
        self.LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO')
        self.ENABLE_WANDB = os.getenv('ENABLE_WANDB', 'true').lower() == 'true'
        self.ENABLE_TENSORBOARD = os.getenv('ENABLE_TENSORBOARD', 'false').lower() == 'true'
        
        # Security
        self.SECRET_KEY = os.getenv('SECRET_KEY')
        self.ENCRYPTION_KEY = os.getenv('ENCRYPTION_KEY')
        
        # External Services
        self.REDIS_URL = os.getenv('REDIS_URL', 'redis://localhost:6379')
        self.CELERY_BROKER_URL = os.getenv('CELERY_BROKER_URL', 'redis://localhost:6379')
        
        # Validate critical configuration
        self._validate_config()
    
    def _validate_config(self):
        """Validar configuración crítica"""
        required_vars = [
            'OPENAI_API_KEY',
            'SECRET_KEY'
        ]
        
        missing = []
        for var in required_vars:
            if not getattr(self, var):
                missing.append(var)
        
        if missing:
            raise ValueError(f"Variables de entorno requeridas faltantes: {', '.join(missing)}")
    
    def create_directories(self):
        """Crear directorios necesarios"""
        directories = [
            self.DATA_PATH,
            self.MODELS_PATH,
            self.LOGS_PATH,
            self.OUTPUTS_PATH
        ]
        
        for directory in directories:
            os.makedirs(directory, exist_ok=True)
    
    def get_model_config(self) -> Dict[str, Any]:
        """Obtener configuración del modelo"""
        return {
            'model_name': self.MODEL_NAME,
            'max_tokens': self.MAX_TOKENS,
            'temperature': self.TEMPERATURE,
            'api_key': self.OPENAI_API_KEY
        }
    
    def get_training_config(self) -> Dict[str, Any]:
        """Obtener configuración de entrenamiento"""
        return {
            'batch_size': self.BATCH_SIZE,
            'learning_rate': self.LEARNING_RATE,
            'epochs': self.EPOCHS,
            'validation_split': self.VALIDATION_SPLIT
        }
    
    def get_database_config(self) -> Dict[str, Any]:
        """Obtener configuración de base de datos"""
        return {
            'host': self.DB_HOST,
            'port': self.DB_PORT,
            'database': self.DB_NAME,
            'user': self.DB_USER,
            'password': self.DB_PASSWORD
        }
    
    def to_dict(self) -> Dict[str, Any]:
        """Convertir toda la configuración a diccionario"""
        return {key: value for key, value in self.__dict__.items() if not key.startswith('_')}
    
    def save_config(self, filepath: str):
        """Guardar configuración actual en archivo JSON"""
        config_dict = self.to_dict()
        
        # Enmascarar datos sensibles
        sensitive_keys = ['API_KEY', 'PASSWORD', 'SECRET', 'KEY']
        for key in config_dict:
            if any(sensitive in key.upper() for sensitive in sensitive_keys) and config_dict[key]:
                config_dict[key] = f"{config_dict[key][:4]}***"
        
        with open(filepath, 'w') as f:
            json.dump(config_dict, f, indent=2, default=str)

# Instancia global de configuración
config = MLProjectConfig()

# Ejemplo de uso
if __name__ == "__main__":
    print("=== CONFIGURACIÓN DEL PROYECTO ===")
    
    # Crear directorios
    config.create_directories()
    
    # Mostrar configuración
    print(f"Modelo: {config.MODEL_NAME}")
    print(f"Batch Size: {config.BATCH_SIZE}")
    print(f"DB Host: {config.DB_HOST}")
    
    # Configuraciones agrupadas
    print(f"\nModel Config: {config.get_model_config()}")
    print(f"Training Config: {config.get_training_config()}")
    
    # Guardar configuración
    config.save_config('config_snapshot.json')
    print("\nConfiguración guardada en 'config_snapshot.json'")
```

#### Ejemplo 2: Gestor de Secretos con Cifrado

```python
"""
secret_manager.py - Gestor seguro de secretos con cifrado
"""

import os
import json
import base64
from cryptography.fernet import Fernet
from dotenv import load_dotenv, set_key
from typing import Dict, Optional
import getpass

class SecretManager:
    """Gestor seguro de secretos con cifrado"""
    
    def __init__(self, secrets_file: str = ".secrets"):
        self.secrets_file = secrets_file
        self.key = None
        self.cipher = None
        self._initialize_encryption()
    
    def _initialize_encryption(self):
        """Inicializar sistema de cifrado"""
        # Cargar o generar clave de cifrado
        key_env = os.getenv('MASTER_KEY')
        
        if key_env:
            self.key = key_env.encode()
        else:
            # Generar nueva clave
            self.key = Fernet.generate_key()
            print(f"Clave maestra generada: {self.key.decode()}")
            print("¡GUARDA ESTA CLAVE EN UN LUGAR SEGURO!")
            
            # Guardar en archivo
            with open('.master_key', 'wb') as f:
                f.write(self.key)
            
            # Establecer permisos restrictivos (Unix/Linux/Mac)
            try:
                os.chmod('.master_key', 0o600)
            except:
                pass
        
        self.cipher = Fernet(self.key)
    
    def encrypt_secret(self, secret: str) -> str:
        """Cifrar secreto"""
        encrypted = self.cipher.encrypt(secret.encode())
        return base64.b64encode(encrypted).decode()
    
    def decrypt_secret(self, encrypted_secret: str) -> str:
        """Descifrar secreto"""
        try:
            encrypted_bytes = base64.b64decode(encrypted_secret.encode())
            decrypted = self.cipher.decrypt(encrypted_bytes)
            return decrypted.decode()
        except Exception as e:
            raise ValueError(f"Error al descifrar: {e}")
    
    def store_secret(self, key: str, secret: str, description: str = ""):
        """Almacenar secreto cifrado"""
        encrypted_secret = self.encrypt_secret(secret)
        
        # Cargar secretos existentes
        secrets = self.load_secrets()
        
        # Agregar nuevo secreto
        secrets[key] = {
            'encrypted_value': encrypted_secret,
            'description': description,
            'created_at': pd.Timestamp.now().isoformat()
        }
        
        # Guardar secretos
        self._save_secrets(secrets)
        print(f"Secreto '{key}' almacenado exitosamente")
    
    def load_secrets(self) -> Dict:
        """Cargar secretos desde archivo"""
        if not os.path.exists(self.secrets_file):
            return {}
        
        try:
            with open(self.secrets_file, 'r') as f:
                return json.load(f)
        except Exception as e:
            print(f"Error cargando secretos: {e}")
            return {}
    
    def _save_secrets(self, secrets: Dict):
        """Guardar secretos en archivo"""
        with open(self.secrets_file, 'w') as f:
            json.dump(secrets, f, indent=2)
        
        # Establecer permisos restrictivos
        try:
            os.chmod(self.secrets_file, 0o600)
        except:
            pass
    
    def get_secret(self, key: str) -> Optional[str]:
        """Obtener secreto descifrado"""
        secrets = self.load_secrets()
        
        if key not in secrets:
            return None
        
        encrypted_value = secrets[key]['encrypted_value']
        return self.decrypt_secret(encrypted_value)
    
    def list_secrets(self) -> Dict:
        """Listar secretos (sin valores)"""
        secrets = self.load_secrets()
        return {
            key: {
                'description': data.get('description', ''),
                'created_at': data.get('created_at', '')
            }
            for key, data in secrets.items()
        }
    
    def delete_secret(self, key: str):
        """Eliminar secreto"""
        secrets = self.load_secrets()
        
        if key in secrets:
            del secrets[key]
            self._save_secrets(secrets)
            print(f"Secreto '{key}' eliminado")
        else:
            print(f"Secreto '{key}' no encontrado")
    
    def export_to_env(self, keys: list, env_file: str = '.env'):
        """Exportar secretos a archivo .env"""
        secrets = self.load_secrets()
        
        for key in keys:
            if key in secrets:
                decrypted_value = self.get_secret(key)
                set_key(env_file, key, decrypted_value)
                print(f"Exportado {key} a {env_file}")
            else:
                print(f"Secreto '{key}' no encontrado")
    
    def rotate_encryption_key(self):
        """Rotar clave de cifrado (requiere re-encriptar todos los secretos)"""
        secrets = self.load_secrets()
        
        if not secrets:
            print("No hay secretos para rotar")
            return
        
        print("Rotando clave de cifrado...")
        
        # Guardar valores descifrados temporalmente
        temp_secrets = {}
        for key, data in secrets.items():
            decrypted_value = self.get_secret(key)
            temp_secrets[key] = {
                'value': decrypted_value,
                'description': data.get('description', '')
            }
        
        # Generar nueva clave
        old_key = self.key
        self.key = Fernet.generate_key()
        self.cipher = Fernet(self.key)
    
    # Re-encriptar todos los valores
        new_secrets = {}
        for key, data in temp_secrets.items():
            encrypted_value = self.encrypt_secret(data['value'])
            new_secrets[key] = {
                'encrypted_value': encrypted_value,
                'description': data['description'],
                'rotated_at': pd.Timestamp.now().isoformat()
            }
        
        # Guardar con nueva clave
        self._save_secrets(new_secrets)
        
        # Actualizar clave maestra
        with open('.master_key', 'wb') as f:
            f.write(self.key)
        
        print("Rotación completada")
        print(f"Nueva clave maestra: {self.key.decode()}")

# Interfaz de línea de comandos
def interfaz_secrets():
    """Interfaz interactiva para gestión de secretos"""
    manager = SecretManager()
    
    while True:
        print("\n=== GESTOR DE SECRETOS ===")
        print("1. Almacenar secreto")
        print("2. Obtener secreto")
        print("3. Listar secretos")
        print("4. Eliminar secreto")
        print("5. Exportar a .env")
        print("6. Rotar clave de cifrado")
        print("7. Salir")
        
        opcion = input("\nSeleccione opción: ")
        
        if opcion == '1':
            key = input("Nombre del secreto: ")
            secret = getpass.getpass("Valor del secreto: ")
            description = input("Descripción (opcional): ")
            manager.store_secret(key, secret, description)
        
        elif opcion == '2':
            key = input("Nombre del secreto a obtener: ")
            secret = manager.get_secret(key)
            if secret:
                print(f"Valor: {secret}")
            else:
                print("Secreto no encontrado")
        
        elif opcion == '3':
            secrets = manager.list_secrets()
            if secrets:
                print("\nSecretos almacenados:")
                for key, data in secrets.items():
                    print(f"- {key}: {data['description']} (creado: {data['created_at']})")
            else:
                print("No hay secretos almacenados")
        
        elif opcion == '4':
            key = input("Nombre del secreto a eliminar: ")
            manager.delete_secret(key)
        
        elif opcion == '5':
            keys_input = input("Nombres de secretos a exportar (separados por coma): ")
            keys = [k.strip() for k in keys_input.split(',')]
            env_file = input("Nombre del archivo .env destino (por defecto .env): ") or '.env'
            manager.export_to_env(keys, env_file)
        
        elif opcion == '6':
            confirm = input("¿Está seguro? Esta acción requiere actualizar la clave maestra (s/n): ")
            if confirm.lower() == 's':
                manager.rotate_encryption_key()
        
        elif opcion == '7':
            break
        
        else:
            print("Opción no válida")

if __name__ == "__main__":
    # Ejemplo de uso
    manager = SecretManager()
    
    # Almacenar algunos secretos
    manager.store_secret('API_SECRET', 'super-secret-api-key-12345', 'Clave secreta para API externa')
    manager.store_secret('DB_PASSWORD', 'my-database-password', 'Contraseña de base de datos')
    
    # Obtener secreto
    api_secret = manager.get_secret('API_SECRET')
    print(f"API Secret: {api_secret}")
    
    # Listar secretos
    secrets = manager.list_secrets()
    print(f"Secretos almacenados: {list(secrets.keys())}")
    
    # Exportar a .env
    manager.export_to_env(['API_SECRET', 'DB_PASSWORD'])
    
    # Lanzar interfaz interactiva
    # interfaz_secrets()
```

### 📋 Resumen de Funciones python-dotenv

| Función | Descripción | Ejemplo |
|---------|-------------|---------|
| `load_dotenv()` | Cargar variables desde archivo .env | `load_dotenv()` |
| `dotenv_values()` | Obtener variables como diccionario | `config = dotenv_values('.env')` |
| `set_key()` | Establecer variable en .env | `set_key('.env', 'KEY', 'value')` |
| `get_key()` | Obtener valor de .env | `value = get_key('.env', 'KEY')` |
| `os.getenv()` | Obtener variable de entorno | `value = os.getenv('KEY')` |
| `os.environ` | Diccionario de todas las variables | `for key in os.environ:` |
| `os.environ.get()` | Obtener con valor por defecto | `value = os.environ.get('KEY', 'default')` |

---
