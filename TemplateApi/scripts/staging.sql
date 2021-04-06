
-- Calculate staging tables and populate public tables

CREATE schema if not exists staging;
-- AUTHORIZATION template_app_user

-------------------------------------------------------------------------------
-- institutions

drop table if exists staging.institutions;

CREATE TABLE staging.institutions (
	id int4 NOT NULL,
	"name" text NULL,
	city text NULL,
	state text NULL,
	zip text NULL,
	CONSTRAINT pk_institutions PRIMARY KEY (id)
);

insert into staging.institutions
select cast(unitid as int) as id
	, instnm as "name"
	, city
	, stabbr as state
	, zip
from base.hd2019 b
;

CLUSTER staging.institutions USING pk_institutions;

select *
from staging.institutions
limit 100
;

-------------------------------------------------------------------------------
-- observed_enrollment by institution-fipss

drop table if exists staging.observed_enrollment_unit_fips;

CREATE TABLE staging.observed_enrollment_unit_fips (
	unitid int,
	year int,
	state_fips int,
	enrollment float,
	primary key (unitid, year, state_fips)
);

insert into staging.observed_enrollment_unit_fips
select cast(unitid as int)
	, 2004 as year
	, efcstate as state_fips
	, efres01 as enrollment
from base.ef2004c_rv
where efcstate <> 99
union
select cast(unitid as int)
	, 2006 as year
	, efcstate as state_fips
	, efres02 as enrollment
from base.ef2006c_rv
where efcstate <> 99
union
select cast(unitid as int)
	, 2008 as year
	, efcstate as state_fips
	, efres02 as enrollment
from base.ef2008c_rv
where efcstate <> 99
union
select cast(unitid as int)
	, 2010 as year
	, efcstate as state_fips
	, CASE WHEN efres02~E'^\\d+$' THEN efres02::float ELSE 0 end as enrollment
from base.ef2010c_rv
where efcstate <> 99
union
select cast(unitid as int)
	, 2012 as year
	, efcstate as state_fips
	, efres02 as enrollment
from base.ef2012c_rv
where efcstate <> 99
union
select cast(unitid as int)
	, 2014 as year
	, efcstate as state_fips
	, efres02 as enrollment
from base.ef2014c_rv
where efcstate <> 99
union
select cast(unitid as int)
	, 2016 as year
	, efcstate as state_fips
	, efres02 as enrollment
from base.ef2016c_rv
where efcstate <> 99
union
select cast(unitid as int)
	, 2018 as year
	, efcstate as state_fips
	, efres02 as enrollment
from base.ef2018c_rv
where efcstate <> 99
;

select COUNT(*)
from staging.observed_enrollment_unit_fips
;

-------------------------------------------------------------------------------
-- observed_enrollment by institution-region

drop table if exists staging.observed_enrollment;

CREATE TABLE staging.observed_enrollment (
	unitid int,
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
	, case 
		when mk.enrollment = 0 then 0
		else inst.enrollment / mk.enrollment
	  end as market_share 
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



