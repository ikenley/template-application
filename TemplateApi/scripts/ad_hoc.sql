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

