import { API_URL } from '../constants/constants'

export const makeRequest = async (url, options={}) => {
  const response = await fetch(url, options)
  if (response.ok) {
    return response.json()
  }
  return {}
}

export const planRoute = async (from, to) => {
  const date = new Date()
  const month = (date.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2})
  const day = date.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2})

  const url = `${API_URL}/plan?from=a&to=b&fromLoc=${from}&toLoc=${to}&timeMode=A&date=${date.getFullYear()}-${month}-${day}T07%3A30%2B12%3A00&modes=BUS,TRAIN,FERRY&operators=&optimize=QUICK&maxWalk=1000&maxChanges=-1&routes=&showExternalProviders=true&subscription-key=693150c317fc42c5a2f871aee3f586af`
  const data = await makeRequest(url)
  const itineraries = data?.response?.itineraries
  if (!itineraries) return { duration: 0, legs: []}

  const firstRoute = itineraries[0]
  let { duration, legs } = firstRoute
  legs = legs.map(leg => ({duration: leg?.duration, geometry: leg?.legGeometry?.points}))
  return { duration, legs }
}

export const getHomes = async (encodedBounds) => {
  const url = `${API_URL}/map`
  const body = {"polylines":[encodedBounds],"limit":1500,"display_rentals":false,"for_rent":false,"for_sale":true,"just_sold":false,"off_market":false}
  return await makeRequest(url, {method: 'POST', body: JSON.stringify(body)})
}

export const getHomeData = async (homeUrl) => {
  const url = `${API_URL}/property?url=${homeUrl}`
  return await makeRequest(url)
}
