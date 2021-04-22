
-- Import raw CSV files from S3 into base tables
-- https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/PostgreSQL.Procedural.Importing.html

CREATE extension if not exists aws_s3 CASCADE;

CREATE schema if not exists base;
-- AUTHORIZATION template_app_user

-------------------------------------------------------------------------------
-- institutions

drop table if exists base.hd2019;

CREATE TABLE base.hd2019 (
	unitid varchar(6) NULL,
	instnm varchar(120) NULL,
	ialias varchar(2000) NULL,
	addr varchar(100) NULL,
	city varchar(30) NULL,
	stabbr varchar(2) NULL,
	zip varchar(10) NULL,
	fips varchar(2) NULL,
	obereg varchar(2) NULL,
	chfnm varchar(50) NULL,
	chftitle varchar(100) NULL,
	gentele varchar(15) NULL,
	ein varchar(9) NULL,
	duns varchar(2000) NULL,
	opeid varchar(8) NULL,
	opeflag varchar(1) NULL,
	webaddr varchar(150) NULL,
	adminurl varchar(200) NULL,
	faidurl varchar(200) NULL,
	applurl varchar(200) NULL,
	npricurl varchar(200) NULL,
	veturl varchar(200) NULL,
	athurl varchar(200) NULL,
	disaurl varchar(200) NULL,
	sector varchar(2) NULL,
	iclevel varchar(2) NULL,
	"control" varchar(2) NULL,
	hloffer varchar(2) NULL,
	ugoffer varchar(2) NULL,
	groffer varchar(2) NULL,
	hdegofr1 varchar(2) NULL,
	deggrant varchar(2) NULL,
	hbcu varchar(2) NULL,
	hospital varchar(2) NULL,
	medical varchar(2) NULL,
	tribal varchar(2) NULL,
	locale varchar(2) NULL,
	openpubl varchar(2) NULL,
	act varchar(1) NULL,
	newid varchar(6) NULL,
	deathyr varchar(4) NULL,
	closedat varchar(10) NULL,
	cyactive varchar(1) NULL,
	postsec varchar(2) NULL,
	pseflag varchar(2) NULL,
	pset4flg varchar(2) NULL,
	rptmth varchar(2) NULL,
	instcat varchar(2) NULL,
	c18basic varchar(2) NULL,
	c18ipug varchar(2) NULL,
	c18ipgrd varchar(2) NULL,
	c18ugprf varchar(2) NULL,
	c18enprf varchar(2) NULL,
	c18szset varchar(2) NULL,
	c15basic varchar(2) NULL,
	ccbasic varchar(2) NULL,
	carnegie varchar(2) NULL,
	landgrnt varchar(2) NULL,
	instsize varchar(2) NULL,
	f1systyp varchar(2) NULL,
	f1sysnam varchar(80) NULL,
	f1syscod varchar(6) NULL,
	cbsa varchar(5) NULL,
	cbsatype varchar(2) NULL,
	csa varchar(3) NULL,
	necta varchar(5) NULL,
	countycd varchar(5) NULL,
	countynm varchar(30) NULL,
	cngdstcd varchar(4) NULL,
	longitud varchar(12) NULL,
	latitude varchar(12) NULL,
	dfrcgid varchar(3) NULL,
	dfrcuscg varchar(3) NULL
);

SELECT aws_s3.table_import_from_s3(
   'base.hd2019',
   '',
   'CSV HEADER ENCODING ''WIN1252''',
   aws_commons.create_s3_uri('924586450630-data-lake', 'template-app/base/hd2019.csv', 'us-east-1')
);

select *
from base.hd2019
limit 100
;

--truncate table public.demo_animals
--;
--
--insert into public.demo_animals 
--select id, name
--from base.demo_animals
--;
--
--select *
--from public.demo_animals da;

-------------------------------------------------------------------------------
-- enrollments

drop table if exists base.ef2002c;

CREATE TABLE base.ef2002c (
	unitid varchar(6),
	efcstate int,
	line varchar(3),
	xefres01 varchar(1),
	efres01 float,
	xefres02 varchar(1),
	efres02 float
);

SELECT aws_s3.table_import_from_s3(
   'base.ef2002c',
   '',
   'CSV HEADER ENCODING ''WIN1252''',
   aws_commons.create_s3_uri('924586450630-data-lake', 'template-app/base/EF2002C/ef2002c.csv', 'us-east-1')
);

---

drop table if exists base.ef2004c_rv;

CREATE TABLE base.ef2004c_rv (
	unitid varchar(6),
	efcstate int,
	line varchar(3),
	xefres01 varchar(1),
	efres01 float,
	xefres02 varchar(1),
	efres02 float
);

SELECT aws_s3.table_import_from_s3(
   'base.ef2004c_rv',
   '',
   'CSV HEADER ENCODING ''WIN1252''',
   aws_commons.create_s3_uri('924586450630-data-lake', 'template-app/base/EF2004C/ef2004c_rv.csv', 'us-east-1')
);

---

drop table if exists base.ef2006c_rv;

CREATE TABLE base.ef2006c_rv (
	unitid varchar(6),
	efcstate int,
	line varchar(3),
	xefres01 varchar(1),
	efres01 float,
	xefres02 varchar(1),
	efres02 float
);

SELECT aws_s3.table_import_from_s3(
   'base.ef2006c_rv',
   '',
   'CSV HEADER ENCODING ''WIN1252''',
   aws_commons.create_s3_uri('924586450630-data-lake', 'template-app/base/EF2006C/ef2006c_RV.csv', 'us-east-1')
);

---

drop table if exists base.ef2008c_rv;

CREATE TABLE base.ef2008c_rv (
	unitid varchar(6),
	efcstate int,
	line varchar(3),
	xefres01 varchar(1),
	efres01 float,
	xefres02 varchar(1),
	efres02 float
);

SELECT aws_s3.table_import_from_s3(
   'base.ef2008c_rv',
   '',
   'CSV HEADER ENCODING ''WIN1252''',
   aws_commons.create_s3_uri('924586450630-data-lake', 'template-app/base/EF2008C/ef2008c_rv.csv', 'us-east-1')
);

---

drop table if exists base.ef2010c_rv;

CREATE TABLE base.ef2010c_rv (
	unitid varchar(6),
	efcstate int,
	line varchar(3),
	xefres01 varchar(1),
	efres01 float null,
	xefres02 varchar(1),
	efres02 varchar(10)
);

SELECT aws_s3.table_import_from_s3(
   'base.ef2010c_rv',
   '',
   'CSV HEADER ENCODING ''WIN1252''',
   aws_commons.create_s3_uri('924586450630-data-lake', 'template-app/base/EF2010C/ef2010c_rv.csv', 'us-east-1')
);

---

drop table if exists base.ef2012c_rv;

CREATE TABLE base.ef2012c_rv (
	unitid varchar(6),
	efcstate int,
	line varchar(3),
	xefres01 varchar(1),
	efres01 float,
	xefres02 varchar(1),
	efres02 float
);

SELECT aws_s3.table_import_from_s3(
   'base.ef2012c_rv',
   '',
   'CSV HEADER ENCODING ''WIN1252''',
   aws_commons.create_s3_uri('924586450630-data-lake', 'template-app/base/EF2012C/ef2012c_rv.csv', 'us-east-1')
);

---

drop table if exists base.ef2014c_rv;

CREATE TABLE base.ef2014c_rv (
	unitid varchar(6),
	efcstate int,
	line varchar(3),
	xefres01 varchar(1),
	efres01 float,
	xefres02 varchar(1),
	efres02 float
);

SELECT aws_s3.table_import_from_s3(
   'base.ef2014c_rv',
   '',
   'CSV HEADER ENCODING ''WIN1252''',
   aws_commons.create_s3_uri('924586450630-data-lake', 'template-app/base/EF2014C/ef2014c_rv.csv', 'us-east-1')
);

---

drop table if exists base.ef2016c_rv;

CREATE TABLE base.ef2016c_rv (
	unitid varchar(6),
	efcstate int,
	line varchar(3),
	xefres01 varchar(1),
	efres01 float,
	xefres02 varchar(1),
	efres02 float
);

SELECT aws_s3.table_import_from_s3(
   'base.ef2016c_rv',
   '',
   'CSV HEADER ENCODING ''WIN1252''',
   aws_commons.create_s3_uri('924586450630-data-lake', 'template-app/base/EF2016C/ef2016c_rv.csv', 'us-east-1')
);

---

drop table if exists base.ef2018c_rv;

CREATE TABLE base.ef2018c_rv (
	unitid varchar(6),
	efcstate int,
	line varchar(3),
	xefres01 varchar(1),
	efres01 float,
	xefres02 varchar(1),
	efres02 float
);

SELECT aws_s3.table_import_from_s3(
   'base.ef2018c_rv',
   '',
   'CSV HEADER ENCODING ''WIN1252''',
   aws_commons.create_s3_uri('924586450630-data-lake', 'template-app/base/EF2018C/ef2018c_rv.csv', 'us-east-1')
);

-------------------------------------------------------------------------------
-- regions

drop table if exists base.regions;

CREATE TABLE base.regions (
	id int,
	name varchar(50) null,
	long_name varchar(50) null
);

SELECT aws_s3.table_import_from_s3(
   'base.regions',
   '',
   'CSV HEADER ENCODING ''WIN1252''',
   aws_commons.create_s3_uri('924586450630-data-lake', 'template-app/base/lookups/regions.csv', 'us-east-1')
);

select *
from base.regions
limit 100
;

-------------------------------------------------------------------------------
-- state_region

drop table if exists base.state_region;

CREATE TABLE base.state_region (
	fips int,
	abbreviation varchar(2),
	name varchar(100),
	region_id int null,
	is_hidden boolean null
);

SELECT aws_s3.table_import_from_s3(
   'base.state_region',
   '',
   'CSV HEADER ENCODING ''WIN1252''',
   aws_commons.create_s3_uri('924586450630-data-lake', 'template-app/base/lookups/state_region.csv', 'us-east-1')
);

select *
from base.state_region
limit 100
;

-------------------------------------------------------------------------------
-- predicted_market_enrollment

drop table if exists base.predicted_market_enrollment;

CREATE TABLE base.predicted_market_enrollment (
	index int,
	row int,
	col int, 
	region_id int,	
	year int,
	enrollment float null
);

SELECT aws_s3.table_import_from_s3(
   'base.predicted_market_enrollment',
   '',
   'CSV HEADER ENCODING ''WIN1252''',
   aws_commons.create_s3_uri('924586450630-data-lake', 'template-app/base/lookups/predicted_market_enrollment.csv', 'us-east-1')
);

select *
from base.predicted_market_enrollment
order by year, region_id
limit 100
;
