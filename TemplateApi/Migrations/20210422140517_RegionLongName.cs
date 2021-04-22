using Microsoft.EntityFrameworkCore.Migrations;

namespace TemplateApi.Migrations
{
    public partial class RegionLongName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "long_name",
                table: "regions",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "long_name",
                table: "regions");
        }
    }
}
