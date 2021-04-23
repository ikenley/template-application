-- ad hoc queries

select *
from base.ef2004c_rv ecr 
where unitid = '194824'
limit 100
;

select *
from public."__EFMigrationsHistory" eh 
limit 100;

select *
from public."session" s 
limit 100;

delete 
from public."session" s 
where s.session_id = '3965cdaf-33bc-435d-9809-0046dd4eb725'
;

select *
from public.predicted_market_share
where unitid = 194824
	and year = 2025
order by region_id, market_share_model_id 
limit 100
;

select COUNT(*)
from public.predicted_market_share
where unitid = 194824
--order by region_id, market_share_model_id 
--limit 400
;

select *
from public.regions r 
;

select e.*
	, p.year as prediction_year
	, (p.year - e."year") / 17.0 as year_progress
	, 1 + ((p.year - 2018) / 17.0) * 0.15 as multiplier
	-- Predicted market share will be a linear path to a 15% increase
	-- predicted_share = current_share * (1 + 0.15 * ((predicted_year - current_year / total_years)))
	, e.enrollment_share * 1 + 0.15 * ((p.year - e.year) / 17.0)  as predicted_enrollment_share
from staging.observed_enrollment e
cross join (
	select y.year
	from staging.years y
	where is_prediction = true 
) p
where e.unitid = 194824
	and e.year = (
		select max("year")
		from staging.years
		where is_prediction = false
	)
	-- todo delete
	and e.region_id = 25
limit 100;

-- staging.predicted_market_share
select *
from public.predicted_market_share p
where p.unitid = 194824
	and p.market_share_model_id = 3
	and p.region_id = 25
limit 100;

-- Infer trend

select *
from (
select distinct e.unitid 
	, e.region_id 
	, avg(e.enrollment) over (partition by e.unitid, e.region_id) as avg_enrollment
	, avg(e.enrollment_share) over (partition by e.unitid, e.region_id) as avg_enrollment_share
	, regr_slope(e.enrollment_share, e.year) over (partition by e.unitid, e.region_id) as slope
	, regr_intercept(e.enrollment_share, e.year) over (partition by e.unitid, e.region_id) as intercept
from staging.observed_enrollment e
where e.unitid = 194824
order by e.region_id 
	--and e.region_id = 25
) ols
group by ols.unitid 
	, ols.region_id 
limit 300
;


-- find slope + intercept by region
-- https://stackoverflow.com/questions/52432231/how-to-do-a-linear-regression-in-postgresql
select obs.unitid 
	, 4 as market_share_model_id -- Trend
	, obs.region_id
	, p.year as year
	, obs.intercept + obs.slope * p.year as market_share
from (
	select distinct e.unitid 
		, e.region_id 
		--, avg(e.enrollment) over (partition by e.unitid, e.region_id) as avg_enrollment
		--, avg(e.enrollment_share) over (partition by e.unitid, e.region_id) as avg_enrollment_share
		, regr_slope(e.enrollment_share, e.year) over (partition by e.unitid, e.region_id) as slope
		, regr_intercept(e.enrollment_share, e.year) over (partition by e.unitid, e.region_id) as intercept
	from staging.observed_enrollment e
) obs
cross join (
	select "year"
	from staging.years
	where is_prediction = true
) p
;

select pe.year
	, pe.region_id
	, true as is_forecast
	, pe.enrollment * shr.market_share as enrollment
	, shr.market_share
	, pe.enrollment as population
    , null as percent_total_enrollment
from public.predicted_market_enrollment pe 
join public.predicted_market_share shr
	on pe.region_id = shr.region_id
		and pe.year = shr.year
left join public.regions r 
	on pe.region_id = r.id 
where shr.unitid = 194824
	and shr.market_share_model_id = 4
    -- Show all regions for type 0, else filter by regionId
	and (0 = 0 or shr.region_id = 0)
order by pe.region_id 
	, pe.year
;

-------------------------------------------------------------------------------
-- Find values for Custom market share
-- Find standard deviation and average of region across years

select obs.unitid 
	, obs.region_id
	, p.option_id
	, obs.enrollment_share * p.multiplier as market_share  
from staging.observed_enrollment obs
cross join (
	select -2 as option_id, 0.85 as multiplier
	union select -1, 0.925
	union select 0, 1
	union select 1, 1.075
	union select 2, 1.15
) p
where obs.year = (
	select max(year) from staging.years where is_prediction = false
)
	and obs.unitid = 194824
order by obs.unitid, obs.region_id, p.option_id
;

-------------------------------------------------------------------------------
-- session_custom_market_share_option

select *
from public."session" s 
where s.session_id = 'b2edb614-b0e7-40c1-adf1-2e96ba3da5e8'
limit 100;

select *
from public.session_custom_market_share_option scmso 
where scmso.session_id = 'b2edb614-b0e7-40c1-adf1-2e96ba3da5e8'
limit 100;

-------------------------------------------------------------------------------
-- enrollment scenario recipe 
-- Enrollment Projections for {region}

select pme.year
	, pme.enrollment 
from public.predicted_market_enrollment pme
where region_id = 25
order by pme.year 

-------------------------------------------------------------------------------

select *
from public.institutions i 
where i.name like '%Indiana University%'
limit 100;

-------------------------------------------------------------------------------

select sum(enrollment)
from observed_market_enrollment ome 
where year = 2018
limit 100;
