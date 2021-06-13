create extension citext;
create extension "uuid-ossp";

create table users
(
    user_id uuid default uuid_generate_v4() not null
        constraint users_pk
            primary key,
    email   text,
    name    text
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
    num_carparks  integer
);

alter table properties
    owner to "james-thorne";

create table shared_homes
(
    shared_home_id uuid default uuid_generate_v4() not null
        constraint shared_homes_pk
            primary key,
    property_id    uuid                                  not null
        constraint shared_homes_properties_property_id_fk
            references properties
            on update cascade on delete cascade
);

alter table shared_homes
    owner to "james-thorne";

create unique index properties_property_id_uindex
    on properties (property_id);

create table user_data
(
    user_id        uuid not null
        constraint user_data_users_user_id_fk
            references users
            on update cascade on delete cascade,
    shared_home_id uuid not null
        constraint user_data_shared_homes_shared_home_id_fk
            references shared_homes
            on update cascade on delete cascade
);

alter table user_data
    owner to "james-thorne";

