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
-- Predicted regional enrollment

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



