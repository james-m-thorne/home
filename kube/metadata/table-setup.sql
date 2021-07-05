create extension if not exists citext;
create extension if not exists "uuid-ossp";
create extension if not exists postgis;


create table users
(
    user_id uuid default uuid_generate_v4() not null
        constraint users_pk
            primary key,
    email   citext                          not null
);

alter table users
    owner to "james-thorne";

create unique index users_user_id_uindex
    on users (user_id);

create table properties
(
    property_id   uuid default uuid_generate_v4() not null
        constraint properties_pk
            primary key,
    address       text,
    min_price     integer,
    max_price     integer,
    num_bedrooms  integer,
    num_bathrooms integer,
    num_carparks  integer,
    land_area     integer,
    floor_area    integer,
    geometry      geometry,
    status        citext
);

alter table properties
    owner to "james-thorne";

create unique index properties_property_id_uindex
    on properties (property_id);

create unique index properties_address_uindex
    on properties (address);

create table shared_homes
(
    shared_home_id uuid default uuid_generate_v4() not null
        constraint shared_homes_pk
            primary key,
    name           text                            not null,
    owner_user_id  uuid                            not null
        constraint shared_homes_users_user_id_fk
            references users
);

alter table shared_homes
    owner to "james-thorne";

create table shared_home_data
(
    shared_home_id uuid   not null
        constraint shared_home_data_shared_homes_shared_home_id_fk
            references shared_homes
            on update cascade on delete cascade,
    property_id    uuid   not null
        constraint shared_homes_properties_property_id_fk
            references properties
            on update cascade on delete cascade,
    data_type      citext not null,
    user_id        uuid   not null
        constraint shared_home_data_users_user_id_fk
            references users
);

alter table shared_home_data
    owner to "james-thorne";

create table locations
(
    location_id bigserial not null
        constraint locations_pkey
            primary key,
    user_id     uuid      not null
        constraint locations_user_id_fkey
            references users
            on update restrict on delete restrict,
    name        text      not null,
    geometry    geometry  not null
);

alter table locations
    owner to "james-thorne";

create table user_shared_homes
(
    user_id        uuid
        constraint user_shared_homes_users_user_id_fk
            references users
            on update cascade on delete cascade,
    shared_home_id uuid
        constraint user_shared_homes_shared_homes_shared_home_id_fk
            references shared_homes
            on update cascade on delete cascade
);

alter table user_shared_homes
    owner to "james-thorne";

create table shared_home_filters
(
    filter_id       bigserial not null
        constraint user_filters_pkey
            primary key,
    user_id         uuid      not null,
    min_price       integer   not null,
    max_price       integer   not null,
    min_bedrooms    integer   not null,
    max_bedrooms    integer   not null,
    min_bathrooms   integer   not null,
    max_bathrooms   integer   not null,
    min_carparks    integer   not null,
    max_carparks    integer   not null,
    min_land_area   integer   not null,
    max_land_area   integer   not null,
    min_floor_area  integer   not null,
    max_floor_area  integer   not null,
    property_status text      not null
);

alter table shared_home_filters
    owner to "james-thorne";

