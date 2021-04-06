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
	and shr.market_share_model_id = 0
    -- Show all regions for type 0, else filter by regionId
	and (0 = 0 or shr.region_id = 0)
order by pe.year
	, pe.region_id
;

-------------------------------------------------------------------------------
-- Predicted market share by region
-- TODO add in alternative models



