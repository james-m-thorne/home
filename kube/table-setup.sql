create extension citext;
create extension "uuid-ossp";
create extension postgis;

create table public.users
(
    user_id uuid default uuid_generate_v4() not null
        constraint users_pk
            primary key,
    email   text                            not null
);

alter table public.users
    owner to "james-thorne";

create unique index users_user_id_uindex
    on public.users (user_id);

create unique index users_email_key
    on public.users (email);

create table public.properties
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
    geometry      geometry
);

alter table public.properties
    owner to "james-thorne";

create unique index properties_property_id_uindex
    on public.properties (property_id);

create unique index properties_address_uindex
    on public.properties (address);

create table public.shared_homes
(
    shared_home_id uuid default uuid_generate_v4() not null
        constraint shared_homes_pk
            primary key,
    property_id    uuid                            not null
        constraint shared_homes_properties_property_id_fk
            references public.properties
            on update cascade on delete cascade
);

alter table public.shared_homes
    owner to "james-thorne";

create table public.user_data
(
    user_id        uuid not null
        constraint user_data_users_user_id_fk
            references public.users
            on update cascade on delete cascade,
    shared_home_id uuid not null
        constraint user_data_shared_homes_shared_home_id_fk
            references public.shared_homes
            on update cascade on delete cascade
);

alter table public.user_data
    owner to "james-thorne";

create table public.locations
(
    location_id bigserial not null
        constraint locations_pkey
            primary key,
    user_id     uuid      not null
        constraint locations_user_id_fkey
            references public.users
            on update restrict on delete restrict,
    name        text      not null,
    geometry    geometry     not null
);

alter table public.locations
    owner to "james-thorne";

