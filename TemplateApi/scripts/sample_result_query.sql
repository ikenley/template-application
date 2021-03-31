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
from public.observed_enrollment inst
join public.regions r
	on inst.region_id = r.id
where inst.unitid = '194824'
order by inst.year
	, inst.enrollment desc
;

-------------------------------------------------------------------------------
-- Predicted regional enrollment

select pe.year
	, pe.region_id
	, true as is_forecast
	, pe.enrollment * shr.enrollment_share as enrollment
	, shr.enrollment_share as market_share
	, pe.enrollment as population
from public.predicted_market_enrollment pe 
join (
	select x.region_id
		, x.enrollment_share 
	from public.observed_enrollment x
	where x.unitid = '194824'
		and year = 2018
) shr
	on pe.region_id = shr.region_id
left join public.regions r 
	on pe.region_id = r.id 
order by pe.year
	, pe.region_id
;

-------------------------------------------------------------------------------
-- Predicted market share by region
-- TODO add in alternative models



