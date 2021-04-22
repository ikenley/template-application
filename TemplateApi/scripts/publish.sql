
-- Publish staging tables to public app-facing version

CREATE schema if not exists staging;
-- AUTHORIZATION template_app_user

-------------------------------------------------------------------------------
-- institutions

-- schema is maanged by EF Migration
truncate table public.institutions;

insert into public.institutions
select id
	, "name"
	, city
	, state
	, zip
from staging.institutions b
;

CLUSTER public.institutions USING pk_institutions;

select *
from public.institutions
limit 100
;

-------------------------------------------------------------------------------
-- observed_enrollment by institution-region

drop table if exists public.observed_enrollment;

CREATE TABLE public.observed_enrollment (
	unitid int,
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

truncate table public.predicted_market_enrollment;

-- managed by EF Migrations
--CREATE TABLE public.predicted_market_enrollment (
--	region_id int,	
--	year int,
--	enrollment float null,
--	constraint pk_predicted_market_enrollment primary key (year, region_id)
--);

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
	, long_name
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
-- predicted_market_share

drop table if exists public.predicted_market_share;

CREATE TABLE public.predicted_market_share (
	unitid int,
	market_share_model_id int,
	region_id int,
	year int,
	market_share float,
	constraint pk_predicted_market_share primary key (unitid, market_share_model_id, region_id, year)
);

insert into public.predicted_market_share
select p.unitid 
	, p.market_share_model_id
	, p.region_id
	, p.year
	, p.market_share 
from staging.predicted_market_share p
;

CLUSTER public.predicted_market_share USING pk_predicted_market_share;

select COUNT(*)
from public.predicted_market_share
;

-------------------------------------------------------------------------------
-- years

truncate table public.years;

-- Managed by entity framework migrations
--CREATE TABLE public.years (
--	year int,
--	is_prediction boolean,
--	constraint pk_years primary key (year)
--);

insert into public.years
select "year"
	, is_prediction
from staging.years obs
;

CLUSTER public.years USING pk_years;

select *
from public.years
limit 100
;

-------------------------------------------------------------------------------
-- custom_market_share_option

-- Managed by entity framework
truncate table public.custom_market_share_option;

--CREATE TABLE public.custom_market_share_option (
--	unitid int,
--	region_id int,
--	option_id int,
--	market_share float,
--	constraint pk_custom_market_share_option primary key (unitid, region_id, option_id)
--);

insert into public.custom_market_share_option
select unitid 
	, region_id
	, option_id
	, market_share  
from staging.custom_market_share_option opt
;

CLUSTER public.custom_market_share_option USING pk_custom_market_share_option;

select COUNT(*) as custom_market_share_option_count
from public.custom_market_share_option
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

