import axios from "axios"
const defaultUrl = "/api/itduunit"


const getAll = async () => {
  const {data} = await axios.get(defaultUrl)
  return data
}

export default {
  getAll
}
