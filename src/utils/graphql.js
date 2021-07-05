import { gql } from '@apollo/client'

export const GET_FILTERS = gql`
  query Filters {
    user_filters {
      max_bathrooms
      max_bedrooms
      max_carparks
      max_floor_area
      max_land_area
      max_price
      min_bathrooms
      min_bedrooms
      min_carparks
      min_floor_area
      min_land_area
      min_price
      property_status
      name
    }
  }
`