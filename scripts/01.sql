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
comment on table places is 'Lugares nas estradas';

