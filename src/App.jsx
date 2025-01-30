import { useState, useEffect } from 'react'

import './App.css'
import { GenInformation } from './components/GenInformation'
import { Products } from './components/Products'
import './styles/main.scss'

function App() {
  const [listFavorite, setListFavorite] = useState([])

  function handleDataFavorites(favorites) {
    setListFavorite(favorites)
  }

  //Funcion para guardar las frutas favoritas del localstorage.
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites'))
    if (favorites) {
      setListFavorite(favorites)
    }
  }, [])

  return (
    <>
      <div className='container mt-4'>
        <div className='mb-5'>
          <h1 className='text-center fs-1 fw-bold'>Season fruits</h1>
          <h2 className='text-center subtitle fs-4'>THE MOST WONDERFUL FRUITS</h2>
        </div>
        <div className="row">
          <div className="col-12 col-sm-6 col-md-9 order-2 order-md-1 order-sm-2">
            <Products handleDataFavorites={handleDataFavorites} />
          </div>
          <div className="col-12 col-sm-6 col-md-3 order-1 order-md-2 order-sm-1 mb-5 ">
            <GenInformation listFavoriteData={listFavorite}  />
          </div>
        </div>


        <div>

        </div>


      </div>
    </>
  )


}

export default App
