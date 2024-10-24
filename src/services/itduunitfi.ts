import axios from "axios"

const getBatch = async (pageNumber: number) => {
  const defaultUrl = `/api/itduunit/${pageNumber}`
  const {data} = await axios.get(defaultUrl)
  return data
}

export default {
  getBatch
}
