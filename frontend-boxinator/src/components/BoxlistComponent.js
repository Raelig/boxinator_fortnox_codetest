import React, { useState, useEffect, useMemo } from 'react'
import BoxService from '../utils/BoxService'


const BoxlistComponent = () => {

    const [boxes, setBoxes] = useState([])

    useEffect(() => {
        getAllBoxes()
    }, [])

    const getAllBoxes = () => {
        BoxService.getAllBoxes().then((response) => {
            console.log("data ", response.data)
            setBoxes(response.data)

        }).catch(error => {
            console.log(error)
        })
    }


    return (
        <div>
            <table id="boxTable">
                <thead>
                    <tr>
                        <th>Receiver</th>
                        <th>Weight</th>
                        <th>Box colour</th>
                        <th>Shipping cost</th>
                    </tr>
                </thead>
                <tbody>
                    {boxes && boxes.map(box =>
                        <tr key={box.id}>
                            <td>{box.boxName}</td>
                            <td>{box.boxWeight} kilograms</td>
                            <td style={{ 'background-color': box.boxColour }}></td>
                            <td>{box.shippingCost} SEK</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <p style={{ color: "#05386B" }}>Total weight: </p>
            <p style={{ color: "#05386B" }}>Total cost: </p>
        </div>
    )

}

export default BoxlistComponent