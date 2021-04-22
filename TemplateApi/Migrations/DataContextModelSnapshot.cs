﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using TemplateApi.Models;

namespace TemplateApi.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.4")
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            modelBuilder.Entity("TemplateApi.Models.CustomMarketShareOption", b =>
                {
                    b.Property<int>("UnitId")
                        .HasColumnType("integer")
                        .HasColumnName("unit_id");

                    b.Property<int>("RegionId")
                        .HasColumnType("integer")
                        .HasColumnName("region_id");

                    b.Property<int>("OptionId")
                        .HasColumnType("integer")
                        .HasColumnName("option_id");

                    b.Property<double>("MarketShare")
                        .HasColumnType("double precision")
                        .HasColumnName("market_share");

                    b.HasKey("UnitId", "RegionId", "OptionId")
                        .HasName("pk_custom_market_share_option");

                    b.ToTable("custom_market_share_option");
                });

            modelBuilder.Entity("TemplateApi.Models.DataPoint", b =>
                {
                    b.Property<double?>("Enrollment")
                        .HasColumnType("double precision")
                        .HasColumnName("enrollment");

                    b.Property<bool?>("IsForecast")
                        .HasColumnType("boolean")
                        .HasColumnName("is_forecast");

                    b.Property<double?>("MarketShare")
                        .HasColumnType("double precision")
                        .HasColumnName("market_share");

                    b.Property<double?>("PercentTotalEnrollment")
                        .HasColumnType("double precision")
                        .HasColumnName("percent_total_enrollment");

                    b.Property<double?>("Population")
                        .HasColumnType("double precision")
                        .HasColumnName("population");

                    b.Property<int>("RegionId")
                        .HasColumnType("integer")
                        .HasColumnName("region_id");

                    b.Property<int>("Year")
                        .HasColumnType("integer")
                        .HasColumnName("year");

                    b.ToTable("DataPoint", t => t.ExcludeFromMigrations());
                });

            modelBuilder.Entity("TemplateApi.Models.Institution", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("City")
                        .HasColumnType("text")
                        .HasColumnName("city");

                    b.Property<string>("Name")
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.Property<string>("State")
                        .HasColumnType("text")
                        .HasColumnName("state");

                    b.Property<string>("Zip")
                        .HasColumnType("text")
                        .HasColumnName("zip");

                    b.HasKey("Id")
                        .HasName("pk_institutions");

                    b.ToTable("institutions");
                });

            modelBuilder.Entity("TemplateApi.Models.MarketInfoRow", b =>
                {
                    b.Property<double>("Enrollment")
                        .HasColumnType("double precision")
                        .HasColumnName("enrollment");

                    b.Property<double>("EnrollmentShare")
                        .HasColumnType("double precision")
                        .HasColumnName("enrollment_share");

                    b.Property<double>("PmaxMarketEnrollment")
                        .HasColumnType("double precision")
                        .HasColumnName("pmax_market_enrollment");

                    b.Property<int>("PmaxYear")
                        .HasColumnType("integer")
                        .HasColumnName("pmax_year");

                    b.Property<double>("PminMarketEnrollment")
                        .HasColumnType("double precision")
                        .HasColumnName("pmin_market_enrollment");

                    b.Property<int>("PminYear")
                        .HasColumnType("integer")
                        .HasColumnName("pmin_year");

                    b.Property<double>("PredictedMarketGrowth")
                        .HasColumnType("double precision")
                        .HasColumnName("predicted_market_growth");

                    b.Property<int>("RegionId")
                        .HasColumnType("integer")
                        .HasColumnName("region_id");

                    b.Property<string>("RegionName")
                        .HasColumnType("text")
                        .HasColumnName("region_name");

                    b.ToTable("MarketInfoRow", t => t.ExcludeFromMigrations());
                });

            modelBuilder.Entity("TemplateApi.Models.MarketShareResult", b =>
                {
                    b.ToTable("market_share_result");
                });

            modelBuilder.Entity("TemplateApi.Models.MarketShareRow", b =>
                {
                    b.Property<double>("MarketShare")
                        .HasColumnType("double precision")
                        .HasColumnName("market_share");

                    b.Property<int>("RegionId")
                        .HasColumnType("integer")
                        .HasColumnName("region_id");

                    b.Property<int>("Year")
                        .HasColumnType("integer")
                        .HasColumnName("year");

                    b.ToTable("MarketShareRow", t => t.ExcludeFromMigrations());
                });

            modelBuilder.Entity("TemplateApi.Models.PredictedMarketEnrollment", b =>
                {
                    b.Property<int>("RegionId")
                        .HasColumnType("integer")
                        .HasColumnName("region_id");

                    b.Property<int>("Year")
                        .HasColumnType("integer")
                        .HasColumnName("year");

                    b.Property<double>("Enrollment")
                        .HasColumnType("double precision")
                        .HasColumnName("enrollment");

                    b.HasKey("RegionId", "Year")
                        .HasName("pk_predicted_market_enrollment");

                    b.ToTable("predicted_market_enrollment");
                });

            modelBuilder.Entity("TemplateApi.Models.Region", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("LongName")
                        .HasColumnType("text")
                        .HasColumnName("long_name");

                    b.Property<string>("Name")
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.HasKey("Id")
                        .HasName("pk_regions");

                    b.ToTable("regions");
                });

            modelBuilder.Entity("TemplateApi.Models.RegionDataPoint", b =>
                {
                    b.Property<double?>("Enrollment")
                        .HasColumnType("double precision")
                        .HasColumnName("enrollment");

                    b.Property<int>("Id")
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    b.Property<string>("LongName")
                        .HasColumnType("text")
                        .HasColumnName("long_name");

                    b.Property<double?>("MarketShare")
                        .HasColumnType("double precision")
                        .HasColumnName("market_share");

                    b.Property<string>("Name")
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.Property<double?>("Population")
                        .HasColumnType("double precision")
                        .HasColumnName("population");

                    b.ToTable("RegionDataPoint", t => t.ExcludeFromMigrations());
                });

            modelBuilder.Entity("TemplateApi.Models.Session", b =>
                {
                    b.Property<Guid>("SessionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("session_id");

                    b.Property<int[]>("CompareInstitutionIds")
                        .IsRequired()
                        .HasColumnType("integer[]")
                        .HasColumnName("compare_institution_ids");

                    b.Property<DateTime>("DateCreated")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("date_created");

                    b.Property<DateTime?>("DateDeleted")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("date_deleted");

                    b.Property<int>("InstitutionId")
                        .HasColumnType("integer")
                        .HasColumnName("institution_id");

                    b.Property<string>("InstitutionName")
                        .HasColumnType("text")
                        .HasColumnName("institution_name");

                    b.Property<DateTime>("LastUpdated")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("last_updated");

                    b.Property<int>("MarketShareModel")
                        .HasColumnType("integer")
                        .HasColumnName("market_share_model");

                    b.Property<int>("RegionId")
                        .HasColumnType("integer")
                        .HasColumnName("region_id");

                    b.Property<string>("RegionName")
                        .HasColumnType("text")
                        .HasColumnName("region_name");

                    b.Property<string>("UserId")
                        .HasColumnType("varchar(50)")
                        .HasColumnName("user_id");

                    b.HasKey("SessionId")
                        .HasName("pk_session");

                    b.HasIndex("UserId")
                        .HasDatabaseName("ix_session_user_id");

                    b.ToTable("session");
                });

            modelBuilder.Entity("TemplateApi.Models.SessionCustomMarketShareOption", b =>
                {
                    b.Property<Guid>("SessionId")
                        .HasColumnType("uuid")
                        .HasColumnName("session_id");

                    b.Property<int>("RegionId")
                        .HasColumnType("integer")
                        .HasColumnName("region_id");

                    b.Property<int>("OptionId")
                        .HasColumnType("integer")
                        .HasColumnName("option_id");

                    b.HasKey("SessionId", "RegionId")
                        .HasName("pk_session_custom_market_share_option");

                    b.ToTable("session_custom_market_share_option");
                });

            modelBuilder.Entity("TemplateApi.Models.YearRow", b =>
                {
                    b.Property<int>("Year")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("year")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<bool>("IsPrediction")
                        .HasColumnType("boolean")
                        .HasColumnName("is_prediction");

                    b.HasKey("Year")
                        .HasName("pk_years");

                    b.ToTable("years");
                });
#pragma warning restore 612, 618
        }
    }
}
