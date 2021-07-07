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
      max_price
      min_bathrooms
      min_bedrooms
      min_carparks
      min_price
    }
  }
`

export const MUTATE_FILTER = gql`
  mutation MyMutation($shared_home_id: uuid, $set: shared_home_filters_set_input) {
    update_shared_home_filters(
      where: {shared_home: {user_shared_homes: {shared_home_id: {_eq: $shared_home_id}}}}, 
      _set: $set
    ) {
      affected_rows
    }
  }
`