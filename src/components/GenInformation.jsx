import { useEffect, useState } from "react"

//Componente que muestra la informacion general de los productos seleccionados.
export function GenInformation({ listFavoriteData }) {

    const [resumeFruit, setResumeFruit] = useState([])
    // Convierto el objeto en un array para que facilite el recorrido y la suma de los valores de las propiedades de nutricion.
    const arrayFruits = Object.entries(listFavoriteData).map(([key, value]) => ({
        key,
        value,
    }))

    //Funcion para sumar los valores de las propiedades de nutricion de las frutas seleccionadas.
    useEffect(() => {
        const resumeData = () => {

            const data = {
                totalFruits: arrayFruits.length,
                totalCalories: 0,
                totalCarbs: 0,
                totalProtein: 0,
                totalFat: 0,
                totalSugar: 0
            }

            arrayFruits.forEach((fruit) => {
                data.totalCalories += fruit.value.nutritions.calories
                data.totalCarbs += fruit.value.nutritions.carbohydrates
                data.totalProtein += fruit.value.nutritions.protein
                data.totalFat += fruit.value.nutritions.fat
                data.totalSugar += fruit.value.nutritions.sugar
            })
            //Redondeo los valores a dos decimales.
            data.totalCalories = parseFloat(data.totalCalories.toFixed(2))
            data.totalCarbs = parseFloat(data.totalCarbs.toFixed(2))
            data.totalProtein = parseFloat(data.totalProtein.toFixed(2))
            data.totalFat = parseFloat(data.totalFat.toFixed(2))
            data.totalSugar = parseFloat(data.totalSugar.toFixed(2))
            setResumeFruit(data)
        }

        resumeData()
    }, [listFavoriteData])


    return (
        <>
            {
                listFavoriteData.length === 0 ? (
                    <div className="card size-card card-general-info positionSticky">
                    <div className="card-body">
                        <h2 className="primary-color fs-4">Summary Information</h2>
                        <p>Oh! You don't have any favorite fruits added yet!</p>
                        <p>Please select <span>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" width="16" height="16"  className="bi bi-heart m-2 bg-white" fill="currentColor" viewBox="0 0 16 16">
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                        </svg>
                        </span>
                        your favorite fruits to see the summary here.</p>
                    </div>
                    </div>) : (
                    <div className="card size-card card-general-info positionSticky">

                        <div className="card-body">
                            <h2 className="primary-color fs-4">Summary Information</h2>
                            <div className="d-flex justify-content-between">
                                <p>No. of products selected:</p>
                                <p>{resumeFruit.totalFruits}</p>
                            </div>

                            <div>
                                <h2 className="primary-color fs-6">Nutritional properties of selected products</h2>
                                <ul className="list-group">
                                    <li className="list-group-item border-0 m-0 px-0 d-flex justify-content-between fw-ligth"> <span>Total Calories:</span>  {resumeFruit.totalCalories}</li>
                                    <li className="list-group-item border-0 m-0 px-0 d-flex justify-content-between fw-ligth"> <span>Total fats:</span>  {resumeFruit.totalFat}</li>
                                    <li className="list-group-item border-0 m-0 px-0 d-flex justify-content-between fw-ligth"> <span>Total sugar:</span>  {resumeFruit.totalSugar}</li>
                                    <li className="list-group-item border-0 m-0 px-0 d-flex justify-content-between fw-ligth"> <span>Total carbohydrates:</span>  {resumeFruit.totalCarbs}</li>
                                    <li className="list-group-item border-0 m-0 px-0 d-flex justify-content-between fw-ligth"> <span>Total proteins:</span>  {resumeFruit.totalProtein}</li>
                                </ul>
                            </div>

                        </div>

                    </div>
                )
            }

        </>
    )
}

