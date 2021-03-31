
-- Calculate staging tables and populate public tables

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
-- observed_enrollment by institution-fipss

drop table if exists staging.observed_enrollment_unit_fips;

CREATE TABLE staging.observed_enrollment_unit_fips (
	unitid varchar(6),
	year int,
	state_fips int,
	enrollment float,
	primary key (unitid, year, state_fips)
);

insert into staging.observed_enrollment_unit_fips
select unitid
	, 2018 as year
	, efcstate as state_fips
	, efres02 as enrollment
from base.ef2018c_rv
where efcstate <> 99
;

select *
from staging.observed_enrollment_unit_fips
limit 100
;

-------------------------------------------------------------------------------
-- observed_enrollment by institution-region

drop table if exists staging.observed_enrollment;

CREATE TABLE staging.observed_enrollment (
	unitid varchar(6),
	year int,
	region_id int,
	enrollment float,
	enrollment_share float null,
	constraint pk_observed_enrollment primary key (unitid, year, region_id)
);

insert into staging.observed_enrollment
select unitid
	, year
	, region_id
	, sum(enrollment)
	, null as enrollment_share
from staging.observed_enrollment_unit_fips b
join base.state_region sr
	on b.state_fips = sr.fips
group by b.unitid
	, b.year
	, sr.region_id
;

CLUSTER staging.observed_enrollment USING pk_observed_enrollment;

select *
from staging.observed_enrollment
limit 100
;

-------------------------------------------------------------------------------
-- observed_market_enrollment

drop table if exists staging.observed_market_enrollment;

CREATE TABLE staging.observed_market_enrollment (
	year int,
	region_id int,
	enrollment float,
	constraint pk_observed_market_enrollment primary key (year, region_id)
);

insert into staging.observed_market_enrollment
select year
	, region_id
	, sum(enrollment)
from staging.observed_enrollment b
group by b.year
	, b.region_id
order by b.year
	, b.region_id
;

CLUSTER staging.observed_market_enrollment USING pk_observed_market_enrollment;

select *
from staging.observed_market_enrollment
limit 100
;

-------------------------------------------------------------------------------
-- observed_enrollment.enrollment_share

update staging.observed_enrollment x
	set enrollment_share = y.market_share
from (
select inst.unitid
	, inst."year"
	, inst.region_id 
	, inst.enrollment / mk.enrollment as market_share 
from staging.observed_enrollment as inst
join staging.observed_market_enrollment as mk
	on inst.year = mk.year
		and inst.region_id = mk.region_id
) as y
where x.unitid = y.unitid
	and x.year = y.year
	and x.region_id = y.region_id
;

select *
from staging.observed_enrollment
limit 100
;

-------------------------------------------------------------------------------
-- "Grawe Deflator"
-- The ratio of most recent observed year / first predicted year

drop table if exists staging.enrollment_deflator;

CREATE TABLE staging.enrollment_deflator (
	region_id int,	
	last_observed_enrollment float,
	fist_predicted_enrollment float,
	deflator float,
	constraint pk_enrollment_deflator primary key (region_id)
);

insert into staging.enrollment_deflator
select lo.region_id
	, lo.last_observed_enrollment
	, fp.fist_predicted_enrollment
	, lo.last_observed_enrollment / fp.fist_predicted_enrollment as deflator
from (
	select obs.region_id 
		, obs.enrollment as last_observed_enrollment
	from staging.observed_market_enrollment obs
	where obs."year" = (
		select max(year) 
		from staging.observed_market_enrollment ome 
	)
) lo
join
(
	select region_id
		, enrollment as fist_predicted_enrollment
	from base.predicted_market_enrollment
	where year = (
			select min(year) 
			from base.predicted_market_enrollment
			where year > (
				select max(year)
				from staging.observed_market_enrollment 
			)
		) 
) fp
	on lo.region_id = fp.region_id
;

CLUSTER staging.enrollment_deflator USING pk_enrollment_deflator;

select *
from staging.enrollment_deflator
limit 100
;

-------------------------------------------------------------------------------
-- predicted_market_enrollment

drop table if exists staging.predicted_market_enrollment;

CREATE TABLE staging.predicted_market_enrollment (
	region_id int,	
	year int,
	enrollment float null,
	constraint pk_predicted_market_enrollment primary key (year, region_id)
);

insert into staging.predicted_market_enrollment
select pme.region_id
	, pme.year
	, pme.enrollment * def.deflator as enrollment
from base.predicted_market_enrollment pme
join staging.enrollment_deflator def
	on pme.region_id = def.region_id
where pme.year > (
		select max(year) 
		from staging.observed_market_enrollment 
	) 
;

CLUSTER staging.predicted_market_enrollment USING pk_predicted_market_enrollment;

select *
from staging.predicted_market_enrollment
limit 100
;



