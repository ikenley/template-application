
-- Publish staging tables to public app-facing version

CREATE schema if not exists staging;
-- AUTHORIZATION template_app_user

-------------------------------------------------------------------------------
-- institutions

--drop table if exists base.hd2019;
--
--CREATE TABLE base.hd2019 (
--	unitid varchar(6) NULL,
--	instnm varchar(120) NULL,
--	ialias varchar(2000) NULL,
--	addr varchar(100) NULL,
--	city varchar(30) NULL,
--	stabbr varchar(2) NULL,
--	zip varchar(10) NULL,
--	fips varchar(2) NULL,
--	obereg varchar(2) NULL,
--	chfnm varchar(50) NULL,
--	chftitle varchar(100) NULL,
--	gentele varchar(15) NULL,
--	ein varchar(9) NULL,
--	duns varchar(2000) NULL,
--	opeid varchar(8) NULL,
--	opeflag varchar(1) NULL,
--	webaddr varchar(150) NULL,
--	adminurl varchar(200) NULL,
--	faidurl varchar(200) NULL,
--	applurl varchar(200) NULL,
--	npricurl varchar(200) NULL,
--	veturl varchar(200) NULL,
--	athurl varchar(200) NULL,
--	disaurl varchar(200) NULL,
--	sector varchar(2) NULL,
--	iclevel varchar(2) NULL,
--	"control" varchar(2) NULL,
--	hloffer varchar(2) NULL,
--	ugoffer varchar(2) NULL,
--	groffer varchar(2) NULL,
--	hdegofr1 varchar(2) NULL,
--	deggrant varchar(2) NULL,
--	hbcu varchar(2) NULL,
--	hospital varchar(2) NULL,
--	medical varchar(2) NULL,
--	tribal varchar(2) NULL,
--	locale varchar(2) NULL,
--	openpubl varchar(2) NULL,
--	act varchar(1) NULL,
--	newid varchar(6) NULL,
--	deathyr varchar(4) NULL,
--	closedat varchar(10) NULL,
--	cyactive varchar(1) NULL,
--	postsec varchar(2) NULL,
--	pseflag varchar(2) NULL,
--	pset4flg varchar(2) NULL,
--	rptmth varchar(2) NULL,
--	instcat varchar(2) NULL,
--	c18basic varchar(2) NULL,
--	c18ipug varchar(2) NULL,
--	c18ipgrd varchar(2) NULL,
--	c18ugprf varchar(2) NULL,
--	c18enprf varchar(2) NULL,
--	c18szset varchar(2) NULL,
--	c15basic varchar(2) NULL,
--	ccbasic varchar(2) NULL,
--	carnegie varchar(2) NULL,
--	landgrnt varchar(2) NULL,
--	instsize varchar(2) NULL,
--	f1systyp varchar(2) NULL,
--	f1sysnam varchar(80) NULL,
--	f1syscod varchar(6) NULL,
--	cbsa varchar(5) NULL,
--	cbsatype varchar(2) NULL,
--	csa varchar(3) NULL,
--	necta varchar(5) NULL,
--	countycd varchar(5) NULL,
--	countynm varchar(30) NULL,
--	cngdstcd varchar(4) NULL,
--	longitud varchar(12) NULL,
--	latitude varchar(12) NULL,
--	dfrcgid varchar(3) NULL,
--	dfrcuscg varchar(3) NULL
--);
--
--SELECT aws_s3.table_import_from_s3(
--   'base.hd2019',
--   '',
--   'CSV HEADER ENCODING ''WIN1252''',
--   aws_commons.create_s3_uri('924586450630-data-lake', 'template-app/base/hd2019.csv', 'us-east-1')
--);
--
--select *
--from base.hd2019
--limit 100
--;

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
-- observed_enrollment by institution-region

drop table if exists public.observed_enrollment;

CREATE TABLE public.observed_enrollment (
	unitid varchar(6),
	year int,
	region_id int,
	enrollment float,
	enrollment_share float null,
	constraint pk_observed_enrollment primary key (unitid, year, region_id)
);

insert into public.observed_enrollment
select unitid
	, year
	, region_id
	, enrollment
	, enrollment_share
from staging.observed_enrollment s
;

CLUSTER public.observed_enrollment USING pk_observed_enrollment;

select *
from public.observed_enrollment
limit 100
;

-------------------------------------------------------------------------------
-- observed_market_enrollment

drop table if exists public.observed_market_enrollment;

CREATE TABLE public.observed_market_enrollment (
	year int,
	region_id int,
	enrollment float,
	constraint pk_observed_market_enrollment primary key (year, region_id)
);

insert into public.observed_market_enrollment
select year
	, region_id
	, enrollment
from staging.observed_market_enrollment s
;

CLUSTER public.observed_market_enrollment USING pk_observed_market_enrollment;

select *
from public.observed_market_enrollment
limit 100
;

-------------------------------------------------------------------------------
-- predicted_market_enrollment
-- TODO apply deflator in staging

drop table if exists public.predicted_market_enrollment;

CREATE TABLE public.predicted_market_enrollment (
	region_id int,	
	year int,
	enrollment float null,
	constraint pk_predicted_market_enrollment primary key (year, region_id)
);

insert into public.predicted_market_enrollment
select region_id
	, year
	, enrollment
from base.predicted_market_enrollment
;

CLUSTER public.predicted_market_enrollment USING pk_predicted_market_enrollment;

select *
from public.predicted_market_enrollment
limit 100
;

-------------------------------------------------------------------------------
-- predicted_market_enrollment

drop table if exists public.predicted_market_enrollment;

CREATE TABLE public.predicted_market_enrollment (
	region_id int,	
	year int,
	enrollment float null,
	constraint pk_predicted_market_enrollment primary key (year, region_id)
);

insert into public.predicted_market_enrollment
select region_id
	, year
	, enrollment
from staging.predicted_market_enrollment
;

CLUSTER public.predicted_market_enrollment USING pk_predicted_market_enrollment;

select *
from public.predicted_market_enrollment
limit 100
;

-------------------------------------------------------------------------------
-- regions

-- schema is maanged by EF Migration
truncate table public.regions;

insert into public.regions
select id
	, name
from base.regions 
;

CLUSTER public.regions USING pk_regions;

select *
from public.regions
limit 100
;

-------------------------------------------------------------------------------
-- state_region

drop table if exists public.state_region;

CREATE TABLE public.state_region (
	fips int,
	abbreviation varchar(2),
	name varchar(100),
	region_id int null,
	is_hidden boolean null,
	constraint pk_state_region primary key (fips)
);

insert into public.state_region
select fips
	, abbreviation
	, name
	, region_id
	, is_hidden
from base.state_region
;

CLUSTER public.state_region USING pk_state_region;

select *
from public.state_region
limit 100
;

-------------------------------------------------------------------------------
-- Access

--ACCESS DB
--REVOKE CONNECT ON DATABASE nova FROM PUBLIC;
--GRANT  CONNECT ON DATABASE nova  TO user;

--ACCESS SCHEMA
--REVOKE ALL     ON SCHEMA public FROM PUBLIC;
GRANT  USAGE   ON SCHEMA public  TO template_app_user;

--ACCESS TABLES
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM PUBLIC ;
--GRANT SELECT                         ON ALL TABLES IN SCHEMA public TO read_only ;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO template_app_user ;
--GRANT ALL                            ON ALL TABLES IN SCHEMA public TO admin ;

