-- Sample Results Query

-- 194824 RENSSELAER POLYTECHNIC INSTITUTE


-------------------------------------------------------------------------------
-- Observed institution enrollment

select inst.year
	, inst.region_id
    , false as is_forecast
	, inst.enrollment
	, inst.enrollment_share as market_share
    , null as population
    , null as percent_total_enrollment
from public.observed_enrollment inst
join public.regions r
	on inst.region_id = r.id
where inst.unitid = 194824
    -- Show all regions for type 0, else filter by regionId
	and (0 = 0 or inst.region_id = 0)
order by inst.year
	, inst.enrollment desc
;

-------------------------------------------------------------------------------
-- Predicted regional enrollment (standard market share model)

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
order by pe.year
	, pe.region_id
;

-------------------------------------------------------------------------------
-- Predicted regional enrollment (custom market share model)

select pe.year
	, pe.region_id
	, true as is_forecast
	, pe.enrollment * shr.market_share as enrollment
	, shr.market_share
	, pe.enrollment as population
    , null as percent_total_enrollment
from public.predicted_market_enrollment pe 
join (
	select r.id as region_id
		, opt.market_share 
	from public.regions r 
	left outer join (
		select *
		from public.session_custom_market_share_option
		where session_id = '9ca477a2-00f7-4373-a8b7-59cbca0bef70'
	) s
		on r.id = s.region_id
	join public.custom_market_share_option opt
		on r.id = opt.region_id 
			and coalesce(s.option_id, 0) = opt.option_id 
	where r.id <> 0
		and opt.unit_id = 194824
) shr
	on pe.region_id = shr.region_id
--left join public.regions r 
--	on pe.region_id = r.id 
-- Show all regions for type 0, else filter by regionId
where (0 = 0 or shr.region_id = 0)
order by pe.year
	, pe.region_id
;


-- Get session option or default for each region
select r.id as region_id
	, opt.market_share 
from public.regions r 
left outer join (
	select *
	from public.session_custom_market_share_option
	where session_id = '9ca477a2-00f7-4373-a8b7-59cbca0bef70'
) s
	on r.id = s.region_id
join public.custom_market_share_option opt
	on r.id = opt.region_id 
		and coalesce(s.option_id, 0) = opt.option_id 
where r.id <> 0
	and opt.unit_id = 194824	
;

-------------------------------------------------------------------------------
-- Top regions

select r.id 
	, r.name
from public.observed_enrollment e
join public.regions r
	on e.region_id = r.id
where e.unitid = 194824
	and r.id <> 90 -- exclude foreign
	and e.year = (
		select max(year)
		from public.years
		where is_prediction = false
	)
order by e.enrollment desc
limit 10
;


-------------------------------------------------------------------------------
-- Predicted market share for institution's top regions
select ms.year
	, ms.region_id 
	, ms.market_share 
from public.predicted_market_share ms
join (
	select r.id as region_id
	from public.observed_enrollment e
	join public.regions r
		on e.region_id = r.id
	where e.unitid = 194824
		and r.id <> 90 -- exclude foreign
		and e.year = (
			select max(year)
			from public.years
			where is_prediction = false
		)
	order by e.enrollment desc
	limit 10
) ts
	on ms.region_id = ts.region_id
where ms.market_share_model_id = 0
	and ms.unitid = 194824
order by ms.market_share_model_id 
	, ms.year 
	, ms.market_share desc
	, ms.region_id 
;

-------------------------------------------------------------------------------
-- Market Attractiveness

select r.id as region_id
	, r.name as region_name
	, coalesce(inst.enrollment, 0) as enrollment
	, coalesce(inst.enrollment_share, 0) as enrollment_share
	, pmin.year as pmin_year
	, pmin.enrollment as pmin_market_enrollment
	, pmax.year as pmax_year
	, pmax.enrollment as pmax_market_enrollment
	, 	case 
			when pmin.enrollment is null then 0
			when pmin.enrollment = 0 then 0
			else (pmax.enrollment - pmin.enrollment) / pmin.enrollment
		end as predicted_market_growth
from public.regions r 
join (
	select *
	from predicted_market_enrollment pme 
	where pme.year = (
		select min(y.year) 
		from public.years y 
		where is_prediction = true
	)
) pmin
	on r.id = pmin.region_id
join (
	select *
	from predicted_market_enrollment pme 
	where pme.year = (
		select max(y.year) 
		from public.years y 
		where is_prediction = true
	)
) pmax
	on pmin.region_id = pmax.region_id
left join (
	select region_id
		, year
		, enrollment
		, enrollment_share
	from public.observed_enrollment
	where unitid = 194824
		and year = (
			select max(y.year) 
			from public.years y 
			where is_prediction = false
		)
) inst 
	on r.id = inst.region_id 
order by predicted_market_growth desc
;

