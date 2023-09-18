import { useState, useEffect } from 'react'
import Papa  from 'papaparse'
import './App.css'

function App() {
  const [result, setResult] = useState([])

  const fetchData = async () => {
    try {
      const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSyAVBY-XCZmYp8DSqKFlktqTNgHCUEg7SZHc4LYDOjqYe5drUtjvLMVoNDWZM9iDKisKP2--ubvtfw/pub?gid=60308737&single=true&output=csv'); // Reemplaza con el enlace de descarga directa del CSV
      const text = await response.text();
      
      const parsed = await new Promise ((resolve,reject) => {
        Papa.parse(text, {
          header: true, // Si la primera fila contiene encabezados de columna
          complete: resolve,
          error: reject
        });
      })
  
      console.log(parsed.data);
      return setResult(parsed.data)
     
    } catch (error) {
      // Manejar errores aquí
      console.error('Error al obtener el archivo CSV', error);
    }
   }

  
   useEffect(()=>{
    fetchData()
   },[])

  return (
    <>
      <h1 className='text-white'>Family Burguers</h1>
      <h2 className='text-white'>Entradas</h2>
      <h2 className='text-white'>Postres</h2>
      <h2 className='text-white'>Bebidas</h2>
      <h2 className='text-white'>Hamburguesas</h2>
      {/* Falta el incluyen papas */}
      {/* Caja de Agregados */}
      <h2 className='text-white'>Hot Dogs</h2>
      {/* Falta el incluyen papas */}

      {
        result.map(res => res.categoriaProducto === 'alfajor' ? (
          <div className="d-flex justify-content-between align-items-center bg-primary text-white p-1" key={res.nombreProducto}>
            <h2 className='fs-6 m-0'>{res.nombreProducto}</h2>
            <p className='m-0'>{res.precioProducto}</p>
        </div>
        ) : null)
      }
      {
        result.map(res => res.categoriaProducto === 'pizza' ? (
          <div className="d-flex justify-content-between align-items-center bg-success p-1" key={res.nombreProducto}>
            <h2 className='fs-6 m-0'>{res.nombreProducto}</h2>
            <p className='m-0'>{res.precioProducto}</p>
        </div>
        ) : null)
      }
    </>
  )
}

export default App
