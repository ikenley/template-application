
-- Import raw CSV files from S3 into base tables
-- https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/PostgreSQL.Procedural.Importing.html

CREATE extension if not exists aws_s3 CASCADE;

CREATE schema if not exists base;
-- AUTHORIZATION template_app_user

-------------------------------------------------------------------------------
-- demo_animals

DROP table if exists base.demo_animals;

CREATE TABLE base.demo_animals (
	id int4 NOT NULL,
	name text NULL,
	CONSTRAINT "pk_demo_animals" PRIMARY KEY ("id")
);

SELECT aws_s3.table_import_from_s3(
   'base.demo_animals',
   '',
   'CSV HEADER', 
   aws_commons.create_s3_uri('924586450630-data-lake', 'template-app/base/demo_items.csv', 'us-east-1')
);

select *
from base.demo_animals da 
;

truncate table public.demo_animals
;

insert into public.demo_animals 
select id, name
from base.demo_animals
;

select *
from public.demo_animals da 
;