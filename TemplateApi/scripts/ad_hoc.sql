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


