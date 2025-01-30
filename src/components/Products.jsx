

import { CardProduct } from "./CardProduct"
import { useState, useEffect } from "react"

//Componente que muestra las frutas de la api y permite filtrarlas por familia, orden y genero.
export function Products({ handleDataFavorites }) {

    const [product, setProducts] = useState([])
    const [loadedImages, setLoadedImages] = useState({})
    const [isDataLoaded, setIsDataLoaded] = useState(false)
    const [areImagesLoaded, setAreImagesLoaded] = useState(false)
    const [listFamily, setListFamily] = useState([])
    const [listOrder, setListOrder] = useState([])
    const [listGenus, setListGenus] = useState([])
    const [filterFamily, setFilterFamily] = useState('')
    const [filterOrder, setFilterOrder] = useState('')
    const [filterGenus, setFilterGenus] = useState('')
    const [searchFruit, setSearchFruit] = useState('')
    const [orderList, setOrderList] = useState(false)
    const [sliceValue, setSliceValue] = useState(8)
    const [isLoading, setIsLoading] = useState(true)
    const [showErrorSearch, setShowErrorSearch] = useState(false)


    //variable para importar todas las imagenes de la carpeta images
    const imagenes = import.meta.glob(`/src/assets/images/*.{png,jpg,jpeg,svg,webp,avif}`)

    //Funcion para consultar las frutas de la api
    useEffect(() => {
        const consultarFrutas = async () => {
            try {
                setIsLoading(true)
                const respuesta = await fetch('https://www.fruityvice.com/api/fruit/all')
                const data = await respuesta.json()
                setProducts(data)

                //Obtener las familias, ordenes y generos de las frutas para el filtrado
                const familyList = []
                const orderList = []
                const genusList = []

                data.map((item) => {
                    if (!familyList.includes(item.family)) {
                        familyList.push(item.family)
                    }
                    if (!orderList.includes(item.order)) {
                        orderList.push(item.order)
                    }
                    if (!genusList.includes(item.genus)) {
                        genusList.push(item.genus)
                    }
                })
                setListFamily(familyList)
                setListOrder(orderList)
                setListGenus(genusList)
                setIsDataLoaded(true)
                setTimeout(() => {
                    setIsLoading(false)
                }, 1000)

            } catch (error) {
                console.log(error)
            }
        }
        consultarFrutas()

    }, [])
    //Funcion para cargar las imagenes de las frutas solo el nombre de la imagen y su tipo de archivo.
    useEffect(() => {
        const loadImages = async () => {
            const imgs = {}
            for (const path in imagenes) {
                const url = await imagenes[path]()
                const imgName = path.replace('/src/assets/images/', '')
                imgs[imgName] = url
            }
            setLoadedImages(imgs)
            setAreImagesLoaded(true)
        }
        loadImages()
    }, [])

    //Funcion para asignar la imagen a cada fruta y si no tiene foto asigna 'not-available.webp' por defecto.
    useEffect(() => {
        if (product.length > 0 && Object.keys(loadedImages).length > 0) {
            const productUpdated = product.map((fruit) => {
                let img = Object.keys(loadedImages).find((img) =>
                    img.toLowerCase().includes(fruit.name.toLowerCase())
                )
                //a la fruta actual se le agrega una nueva propiedad que es la imagen que le corresponde o en su defecto la imagen not-available.webp
                return {
                    ...fruit,
                    img: img ? img : 'not-available.webp',
                }
            })
            //Se actualiza el estado de las frutas con la imagen asignada.
            setProducts(productUpdated)
        }
    }, [isDataLoaded, areImagesLoaded])  //Ha tocado crear estas dos banderas porque no se estaba ejectuando correctamente, ya que se ejecutaba antes de que se cargaran las imagenes del useEffect anterior.

    //Filtro del select por categorias
    let productsFilteredList = product.filter((fruit) => {
        let matchesFamily = filterFamily !== '' ? fruit.family === filterFamily : true
        let matchesOrder = filterOrder !== '' ? fruit.order === filterOrder : true
        let matchesGenus = filterGenus !== '' ? fruit.genus === filterGenus : true

        return matchesFamily || matchesOrder || matchesGenus
    })


    let contieneNumeros = (str) => {
        return /\d/.test(str)
    }

    useEffect(() => {
        if (contieneNumeros(searchFruit)) {
            setShowErrorSearch(true)
        } else {
            setShowErrorSearch(false)
        }
    }, [searchFruit])

    //Filtro de busqueda
    productsFilteredList = searchFruit != '' ? productsFilteredList.filter((fruit) => fruit.name.toLowerCase().includes(searchFruit.toLowerCase())) : productsFilteredList

    //Filtro por nombre ascendente o descendente al darle clic en el boton.
    productsFilteredList = orderList
        ? productsFilteredList.sort((a, b) => {
            if (a.name > b.name) {
                return -1
            }
            if (a.name < b.name) {
                return 1
            }
            return 0
        })
        : productsFilteredList.sort((a, b) => {
            if (a.name > b.name) {
                return 1
            }
            if (a.name < b.name) {
                return -1
            }
            return 0
        })
    const dataStatistics = {
        totalFruits: productsFilteredList.length,
        totalCalories: 0,
        totalCarbs: 0,
        totalProtein: 0,
        totalFat: 0,
        totalSugar: 0
    }
    productsFilteredList.forEach((fruit) => {
        dataStatistics.totalCalories += fruit.nutritions.calories
        dataStatistics.totalCarbs += fruit.nutritions.carbohydrates
        dataStatistics.totalProtein += fruit.nutritions.protein
        dataStatistics.totalFat += fruit.nutritions.fat
        dataStatistics.totalSugar += fruit.nutritions.sugar
    })


    return (
        <>
            <div className="row d-flex justify-content-end">
                <div className="col-auto mb-3">
                    <select className="form-select select-filter rounded-pill border border-dark" placeholder="Family"
                        onChange={(e) => {
                            setFilterFamily(e.target.value);
                            setFilterGenus(e.target.value);
                            setFilterOrder(e.target.value);
                        }} >
                        <option value="" defaultValue>All</option>
                        <option value="" disabled>FAMILY</option>
                        {listFamily.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                        <option value="" disabled>GENUS</option>
                        {listGenus.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                        <option value="" disabled>ORDER</option>
                        {listOrder.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>
                </div>

                <div className="col-auto mb-3">
                    <div className="input-group filter-search">
                        <input
                            type="text"
                            className="form-control rounded-pill border border-dark"
                            placeholder="Search"
                            value={searchFruit}
                            onChange={(e) => setSearchFruit(e.target.value)}
                        />
                    </div>
                    {showErrorSearch && <p className="text-danger">Numbers are not allowed in the search.</p>}
                </div>

                <div className="col-auto mb-3">
                    <button className="btn rounded-pill border border-dark fw-bold button-order"
                        onClick={() => setOrderList(!orderList)}>
                        Order A - Z
                    </button>
                </div>
            </div>


            <div className="row">
                <div className="d-flex justify-content-start w-100 mb-3">
                    <p className="fs-6 m-1"><span className="fw-bold">Results For:</span>  {filterFamily ? filterFamily : filterGenus ? filterGenus : searchFruit ? searchFruit : 'All'}</p>
                    <p className="fs-6 m-1"><span className="fw-bold">Results found:</span> {productsFilteredList.length}</p>
                    <p className="fs-6 m-1"><span className="fw-bold">Listed:</span> {sliceValue > productsFilteredList.length ? productsFilteredList.length : sliceValue}</p>
                </div>
            </div>
            {isLoading && (
                <div className=" top-0 start-0 w-100 h-100 bg-white d-flex justify-content-center align-items-center"
                    style={{ zIndex: 9999 }}>
                    <div className="spinner-border primary-color" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
            {
                !isLoading && productsFilteredList.length > 0 ? (
                    <div className="row d-flex justify-content-center text-center m-1 mb-4">
                        <h2 className="primary-color fs-4 text-center ">General Information</h2>
                        <div className="card border-primary-color col-12 col-sm-12 col-md-6 m-1 col-lg-2">
                            <blockquote className="blockquote m-3">
                                <p>Calories</p>
                                <small>
                                    {dataStatistics.totalCalories}
                                </small>
                            </blockquote>
                        </div>
                        <div className="card border-primary-color col-12 col-sm-12 col-md-6 m-1 col-lg-2">
                            <blockquote className="blockquote m-3">
                                <p>Fats</p>
                                <small>
                                    {dataStatistics.totalFat.toFixed(2)}
                                </small>
                            </blockquote>
                        </div>
                        <div className="card border-primary-color col-12 col-sm-12 col-md-6 m-1 col-lg-2">
                            <blockquote className="blockquote m-3">
                                <p>Sugar</p>
                                <small>
                                    {dataStatistics.totalSugar.toFixed(2)}
                                </small>
                            </blockquote>
                        </div>
                        <div className="card border-primary-color col-12 col-sm-12 col-md-6 m-1 col-lg-2">
                            <blockquote className="blockquote m-3">
                                <p>Carbs</p>
                                <small>
                                    {dataStatistics.totalCarbs.toFixed(2)}
                                </small>
                            </blockquote>
                        </div>
                        <div className="card border-primary-color col-12 col-sm-12 col-md-6 m-1 col-lg-2">
                            <blockquote className="blockquote m-3">
                                <p>Proteins</p>
                                <small>
                                    {dataStatistics.totalProtein.toFixed(2)}
                                </small>
                            </blockquote>
                        </div>
                    </div>

                ) : ''
            }


            <div className="row">
                {
                    productsFilteredList.length == 0 && !isLoading ? (
                        <h1 className="text-center fs-3 fw-bold">Sorry, no results found, please try another filter again.</h1>
                    ) : (
                        productsFilteredList.slice(0, sliceValue).map((item, index) => (
                            <div key={index} className="col-12 col-sm-12 col-md-6 mb-4 col-lg-4">
                                <CardProduct fruit={item} handleDataFavorites={handleDataFavorites} />
                            </div>
                        )))
                }
            </div>
            {(productsFilteredList.length > 8 || !isLoading) && productsFilteredList.length > 0 ? (
                <div className="row mb-5">
                    <button className="btn rounded-pill bg-dark text-white fw-light d-flex justify-content-center mx-auto btn-more"
                        onClick={() => setSliceValue(sliceValue + 4)}>
                        SEE MORE
                    </button>
                </div>
            ) : ''}

        </>
    )
}