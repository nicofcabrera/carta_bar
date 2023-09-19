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
      <h1 className='text-white mb-4'>Logo Burguers</h1>
      <h2 className='text-white'>Entradas</h2>
      <section className='mb-4'>
        {
          result.map(res => res.categoriaProducto === 'entradas' ? (
            <article key={res.nombreProducto} className='d-flex flex-wrap justify-content-between container'>
              <p>{res.nombreProducto}</p>
              <small>${res.precioProducto}</small>
              {
                res.descripcionProducto ? (
                <p className='producto_descripcion'>({res.descripcionProducto})</p>
                ) : null
              }
            </article>
          ): null)
        }
      </section>
      <h2 className='text-white'>Postres</h2>
      <section className='mb-4'>
        {
          result.map(res => res.categoriaProducto === 'postres' ? (
            <article key={res.nombreProducto} className='d-flex flex-wrap justify-content-between container'>
              <p>{res.nombreProducto}</p>
              <small>${res.precioProducto}</small>
              {
                res.descripcionProducto ? (
                <p className='producto_descripcion'>({res.descripcionProducto})</p>
                ) : null
              }
            </article>
          ): null)
        }
      </section>     
      <h2 className='text-white'>Bebidas</h2>
      <section className='mb-4'>
        {
          result.map(res => res.categoriaProducto === 'bebidas' ? (
            <article key={res.nombreProducto} className='d-flex flex-wrap justify-content-between container'>
              <p>{res.nombreProducto}</p>
              <small>${res.precioProducto}</small>
              {
                res.descripcionProducto ? (
                <p className='producto_descripcion'>({res.descripcionProducto})</p>
                ) : null
              }
            </article>
          ): null)
        }
      </section>
      <h2 className='text-white'>Hamburguesas</h2>
      <div className="incluyen_papas p-1 position-relative">
        <div className="triangulo-primero position-absolute"></div>
        Incluyen papas
        <div className="triangulo-segundo position-absolute"></div>
      </div>
      <div className="triangulo-tricolor"></div>
      <section className='mb-4'>
        {
          result.map(res => res.categoriaProducto === 'hamburguesas' ? (
            <article key={res.nombreProducto} className='d-flex flex-wrap justify-content-between container'>
              <p>{res.nombreProducto}</p>
              <small>${res.precioProducto}</small>
              {
                res.descripcionProducto ? (
                <p className='producto_descripcion d-block'>({res.descripcionProducto})</p>
                ) : null
              }
            </article>
          ): null)
        }
      </section>
      {/* Caja de Agregados */}
      <h2 className='text-white'>Hot Dogs</h2>
      <div className="incluyen_papas p-1 position-relative">
        <div className="triangulo-primero position-absolute"></div>
        Incluyen papas
        <div className="triangulo-segundo position-absolute"></div>
      </div>
      <section>
      {
        result.map(res => res.categoriaProducto === 'hotdog' ? (
          <article key={res.nombreProducto} className='d-flex flex-wrap justify-content-between container'>
            <p>{res.nombreProducto}</p>
            <small>${res.precioProducto}</small>
            {
              res.descripcionProducto ? (
              <p className='producto_descripcion'>({res.descripcionProducto})</p>
              ) : null
            }
          </article>
        ): null)
      }
      </section>
    </>
  )
}

export default App
