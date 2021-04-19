using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TemplateApi.Migrations
{
    public partial class SessionCompareInstitutionIds : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int[]>(
                name: "compare_institution_ids",
                table: "session",
                type: "integer[]",
                nullable: false,
                defaultValue: new int[0]);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "compare_institution_ids",
                table: "session");
        }
    }
}
