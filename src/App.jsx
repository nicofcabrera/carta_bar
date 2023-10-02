import { useState, useEffect } from 'react'
import Papa  from 'papaparse'
import './App.css'
import Footer from './components/footer/Footer'
import Header from './components/Header/Header'

function App() {
  const [result, setResult] = useState([])
  const [loader,setLoader] = useState(true)

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
      console.error('Error al obtener el archivo CSV', error);
    }
   }

   const loading = () =>{
      setTimeout(() => {
        setLoader(false)
      },2000)
   }

   const tituloBurger = result.some(res => res.categoriaProducto ==='hamburguesas') 

   useEffect(()=>{
    fetchData(),
    loading()
   },[])

  return (
    <>
      {
        loader ? (
          <div className="spinner-grow text-white" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <>
            <Header/>
            <main>
            <h2 className='text-white'>Entradas</h2>
            <section className='mb-4 container'>
              {
                result.map(res => res.categoriaProducto === 'entradas' ? (
                  <article key={res.nombreProducto} className='d-flex flex-wrap justify-content-between mb-2'>
                    <p>{res.nombreProducto}</p>
                    <span>${res.precioProducto}</span>
                    {
                      res.descripcionProducto ? (
                      <small className='producto_descripcion'>({res.descripcionProducto})</small>
                      ) : null
                    }
                  </article>
                ): null)
              }
            </section>
            <h2 className='text-white'>Postres</h2>
            <section className='mb-4 container'>
            {
              result.map(res => res.categoriaProducto === 'postres' ? (
                <article key={res.nombreProducto} className='d-flex flex-wrap justify-content-between mb-2'>
                  <p>{res.nombreProducto}</p>
                  <span>${res.precioProducto}</span>
                  {
                    res.descripcionProducto ? (
                    <small className='producto_descripcion'>({res.descripcionProducto})</small>
                    ) : null
                  }
                </article>
              ): null)
            }
            </section>     
            <h2 className='text-white'>Bebidas</h2>
            <section className='mb-4 container'>
            {
              result.map(res => res.categoriaProducto === 'bebidas' ? (
                <article key={res.nombreProducto} className='d-flex flex-wrap justify-content-between mb-2'>
                  <p>{res.nombreProducto}</p>
                  <span>${res.precioProducto}</span>
                  {
                    res.descripcionProducto ? (
                    <small className='producto_descripcion'>({res.descripcionProducto})</small>
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
            <section className='mb-4 container'>
            {
              result.map(res => res.categoriaProducto === 'hamburguesas' ? (
                <article key={res.nombreProducto} className='d-flex flex-wrap justify-content-between mb-2'>
                  <p>{res.nombreProducto}</p>
                  <span className='precio_producto'>${res.precioProducto}</span>
                  {
                    res.descripcionProducto ? (
                    <small className='producto_descripcion d-block'>({res.descripcionProducto})</small>
                    ) : null
                  }
                </article>
              ): null)
            }
            {/* Falta Titulos de opc sin tacc */}
            {
              tituloBurger ? (
                <h3 className='sin_tacc'>Consultar por opciones sin TACC</h3>
              ) : null
            }
            {/* <div className="container position-relative">
            <aside className='agregados border border-white rounded'>
              <h3 className="agregados_titulo m-0">Agregados</h3>
              <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
              </ul>
            </aside>

            </div> */}
            </section>
            {/* Falta Caja de Agregados */}
            <h2 className='text-white'>Hot Dogs</h2>
            <div className="incluyen_papas p-1 position-relative">
              <div className="triangulo-primero position-absolute"></div>
              Incluyen papas
              <div className="triangulo-segundo position-absolute"></div>
            </div>
            <section className='container'>
            {
              result.map(res => res.categoriaProducto === 'hotdog' ? (
                <article key={res.nombreProducto} className='d-flex flex-wrap justify-content-between mb-2'>
                  <p>{res.nombreProducto}</p>
                  <span>${res.precioProducto}</span>
                  {
                    res.descripcionProducto ? (
                    <small className='producto_descripcion'>({res.descripcionProducto})</small>
                    ) : null
                  }
                </article>
              ): null)
            }
            </section>
            </main> 
            <Footer/>
         </>
        )
      }
    </>
  )
}

export default App
