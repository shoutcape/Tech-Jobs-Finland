import axios from "axios"

const getBatch = async (pageNumber: number) => {
  const defaultUrl = `/.netlify/functions/fetchJobs?page=${pageNumber}`
  //const defaultUrl = `/api/itduunit/${pageNumber}`
  const {data} = await axios.get(defaultUrl)
  return data
}

export default {
  getBatch
}

