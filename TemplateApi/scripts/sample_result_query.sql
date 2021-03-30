-- Sample Results Query

-- 194824 RENSSELAER POLYTECHNIC INSTITUTE


-------------------------------------------------------------------------------
-- Observed institution enrollment

select *
from staging.observed_enrollment inst
join base.regions r 
	on inst.region_id = r.id
where inst.unitid = '194824'
order by inst.enrollment desc
;

-------------------------------------------------------------------------------
-- Predicted regional enrollment

select pe.year
	, pe.region_id
	, r.name as region_name
	, pe.enrollment as market_enrollment
	, shr.enrollment_share as market_share
	, pe.enrollment * shr.enrollment_share as predicted_institution_enrollment
from base.predicted_market_enrollment pe 
join (
	select x.region_id
		, x.enrollment_share 
	from staging.observed_enrollment x
	where x.unitid = '194824'
		and year = 2018
) shr
	on pe.region_id = shr.region_id
join base.regions r 
	on pe.region_id = r.id 
order by pe.year
	, pe.region_id
;

-------------------------------------------------------------------------------
-- Predicted market share by region
-- TODO add in alternative models



