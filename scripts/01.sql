create table stop_points
(
	id serial
		constraint stop_points_pk
			primary key,
	lat numeric,
	long numeric,
	road varchar(20),
	fuel_supply boolean,
	restaurant boolean,
	snack_bar boolean,
	convenience_store boolean,
	public_phone boolean,
	hotel boolean,
	mechanics boolean,
	borrower boolean,
	money_supply boolean,
	site_size_m2 int,
	vacancy_length int
);
comment on table stop_points is 'Pontos de Parada';

create table places
(
	id serial
		constraint places_pk
			primary key,
	lat numeric,
	long numeric,
	category varchar(200),
	name varchar(200),
	always_open varchar(5),
	period_info varchar(500),
	open_time varchar(50),
	close_time varchar(50),
	phone varchar(50),
	details text
);
comment on table places is 'Lugares em geral';

create table users
(
	id serial
		constraint users_pk
			primary key,
	name varchar(100),
	phone_number numeric,
	lat numeric,
	long numeric
);

comment on table users is 'Usuários';


create table communication
(
	id serial
		constraint communication_pk
			primary key,
	contact varchar(50),
	message text,
	processed boolean,
	identifier uuid
);

comment on table communication is 'Comunicação P2P';