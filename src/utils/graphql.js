import { gql } from '@apollo/client'

export const GET_SHARED_HOME_INFO = gql`
  query SharedHome {
    users {
      email
      user_id
    }
    shared_homes {
      name
      shared_home_id
    }
    shared_home_data {
      property_id
      data_type
    }
    shared_home_locations {
      name
      geometry
    }
    shared_home_filters {
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
    }
  }
`