import axios from 'axios'

const API_URL = "http://localhost:8081" 

class BoxService {

    getAllBoxes () {
        return axios.get(API_URL + "/getAll")
    }

    addBox(box) {
        return axios.post(API_URL + "/createBox", box)
    }

}

export default new BoxService