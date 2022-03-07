import { useState, useEffect } from "react";
import { SketchPicker } from "react-color";
import BoxService from '../utils/BoxService'


export default function AddBoxComponent() {

    const initialValues = { boxName: "", boxWeight: 0, boxColour: "", boxCountry: "" }
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [hidden, setHidden] = useState(false)
    const [color, setColor] = useState({})
    const rgbaString = ({ r, g, b, a = 1 }) => `rgba(${r},${g},${b},${a})`

    //Post to DB through the service
    const postBox = () => {
        console.log("U HERE")
        console.log("JSON ", JSON.stringify(formValues))

        BoxService.addBox(
            formValues

        ).then((response) => {

            console.log("data ", response.data)
        }).catch(error => {
            console.log(error)
        })
    }


    //Handling the button press
    const handleSubmit = (event) => {
        event.preventDefault()
        setFormErrors(validate(formValues))
        setIsSubmitted(true)

    }

    //Toggling the colour picker
    const handleButtonToggle = (event) => {
        event.preventDefault()
        setHidden(!hidden)
    }

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormValues({ ...formValues, [name]: value })
    
    }

    //Validating the input for the form
    const validate = (values) => {
        const errors = {}
        if (!values.boxName) {
            errors.boxName = "Username is required!"
        }
        if (!values.boxWeight) {
            errors.boxWeight = "Weight is required!"
        } else if (values.boxWeight < 0) {
            errors.boxWeight = "Invalid number, cannot be negative!"
        }
        if (!values.boxColour) {
            errors.boxColour = "Box colour is required!"
            formValues.boxColour = rgbaString(color)
        } else if (values.boxColour) {
            formValues.boxColour = rgbaString(color)
        }
        if (!values.boxCountry) {
            errors.boxCountry = "Country is required!"
        }
        return errors
    }

    //If input valid and the submit button is pressed, post to API
    useEffect(() => {
        console.log(formErrors)
        if (Object.keys(formErrors).length === 0 && isSubmitted) {
            postBox()

        }
    }, [formErrors])


    return (
        <div>
            <div className="cardContainer">
                
                {Object.keys(formErrors).length === 0 && isSubmitted ? (
                    <p style={{color: "#05386B"}}>Posted box!</p>
                ) : (<></>)}
                <form >
                    <div class="form-group">
                        <label for="boxName">Name</label>
                        <input
                            type="text"
                            class="form-control"
                            name="boxName"
                            value={formValues.boxName}
                            onChange={handleChange} />
                    </div>
                    <p>{formErrors.boxName}</p>
                    <div class="form-group">
                        <label for="boxWeight">Weight</label>
                        <input
                            type="number"
                            class="form-control"
                            name="boxWeight"
                            value={formValues.boxWeight}
                            onChange={handleChange} />
                    </div>
                    <p>{formErrors.boxWeight}</p>
                    <div class="form-group">
                        <label for="boxColour">Box colour</label>
                        <button className="colourButton" name="boxColourBtn" onClick={handleButtonToggle}>Click to show colour picker</button>

                        {hidden && (
                            <SketchPicker
                                color={color}
                                onChange={updatedColor => setColor(updatedColor.rgb)}
                                name="boxColour"
                            />)}
                    </div>
                    <p>{formErrors.boxColour}</p>
                    <label for="boxCountry">Country</label>
                    <select name="boxCountry" value={formValues.boxCountry} onChange={handleChange}>
                        <option value="" selected disabled hidden>Choose country</option>
                        <option value="SWEDEN">Sweden</option>
                        <option value="CHINA">China</option>
                        <option value="BRAZIL">Brazil</option>
                        <option value="AUSTRALIA">Australia</option>
                    </select>
                    <p>{formErrors.boxCountry}</p>
                    <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>

    )
}
