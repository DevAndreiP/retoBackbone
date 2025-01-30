import { useState, useEffect } from "react"

//Componente del card donde se muestra cada una de las frutas consultadas o filtradas.
export function CardProduct({ fruit, handleDataFavorites }) {
    const { name, img, id, family, order, genus, nutritions } = fruit

    const [listFavorite, setListFavorite] = useState([])
    const [listFavoriteId, setListFavoriteId] = useState([])

    //Funcion para guardar o quitar las frutas seleccionadas en el localstorage.
    function saveFavoriteFruit(fruit){
        let favorites = JSON.parse(localStorage.getItem('favorites')) || []
        //Si ya se encuentra la fruta en el local estorage, entonces debe sacarla de la lista de favoritos.
        if (favorites.some(fav => fav.id === fruit.id)) {
            favorites = favorites.filter(fav => fav.id !== fruit.id)
        } else {
            favorites.push(fruit)
        }
        localStorage.setItem('favorites', JSON.stringify(favorites))
        setListFavorite(favorites)
        //Esta variable se creó para aplicar las clases de css en el boton de favoritos.
        setListFavoriteId(favorites.map(fav => fav.id))
        //Se envia la lista de favoritos al componente padre para que se actualice la informacion y sea enviada al componente GenInformation.
        handleDataFavorites(favorites)
    }
    //Cuando se recarga la pagina para asignar las frutas seleccionadas guardadas en el localstorage.
    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites'))
        if (favorites) {
            setListFavorite(favorites)
            setListFavoriteId(favorites.map(fav => fav.id))
        }

    },[])

    return (
        <>
            <div className="card size-card">
                <div className="card-header p-0 m-0  position-relative">
                    <img src={'/src/assets/images/' + img} className="w-100 img-fruit" />
                    <button  className={`${listFavoriteId.includes(id) ? 'background-primary' : 'bg-white color-black'} position-absolute top-0 end-0 m-2 btn rounded-circle`}
                        onClick={() => {
                            saveFavoriteFruit(fruit)
                        }}>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" width="16" height="16"  className="bi bi-heart" fill="currentColor" viewBox="0 0 16 16">
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                        </svg>
                    </button>
                </div>
                <div className="card-body p-4 shadow-body">
                    <h1 className="fs-4 primary-color">{name}</h1>
                    <div className="row text-left">
                        <div className="col-md-4 d-flex flex-column align-items-start">
                            <p className="fw-bold">Family:</p>
                            <p className="fs-8">{family}</p>
                        </div>
                        <div className="col-md-4 d-flex flex-column align-items-start">
                            <p className="fw-bold">Order:</p>
                            <p className="fs-8">{order}</p>
                        </div>
                        <div className="col-md-4 d-flex flex-column align-items-start">
                            <p className="fw-bold">Genus:</p>
                            <p className="fs-8">{genus}</p>
                        </div>
                    </div>
                    <h2 className="fs-5 primary-color">Nutritions</h2>
                    <ul className="list-group">
                        {
                            Object.entries(nutritions).map(([key, value], index) => (
                                <li key={index} className="list-group-item border-0 m-0 px-0 d-flex justify-content-between">
                                    <span className="fw-bold">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>  {value}
                                </li>
                            ))
                        }
                    </ul>

                    <div>

                    </div>

                </div>
            </div>

        </>
    )
}
