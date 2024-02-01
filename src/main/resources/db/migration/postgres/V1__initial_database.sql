CREATE TABLE products (
	id int4 NOT NULL,
	"name" varchar NOT NULL,

	CONSTRAINT procucts_pk PRIMARY KEY (id),
	CONSTRAINT procucts_name_unique UNIQUE ("name")
);

CREATE TABLE suppliers (
	id int4 NOT NULL,
	"name" varchar NOT NULL,

	CONSTRAINT suppliers_pk PRIMARY KEY (id),
	CONSTRAINT suppliers_name_unique UNIQUE ("name")
);

CREATE TABLE buyers (
	id int4 NOT NULL,
	"name" varchar NOT NULL,

	CONSTRAINT buyers_pk PRIMARY KEY (id),
	CONSTRAINT buyers_name_unique UNIQUE ("name")
);

CREATE TABLE applicants (
	id int4 NOT NULL,
	"name" varchar NOT NULL,

	CONSTRAINT applicants_pk PRIMARY KEY (id),
	CONSTRAINT applicants_name_unique UNIQUE ("name")
);

CREATE TABLE orders (
	id int4 NOT NULL,
	"name" varchar NOT NULL,

	CONSTRAINT orders_pk PRIMARY KEY (id),
	CONSTRAINT orders_name_unique UNIQUE ("name")
);
