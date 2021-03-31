using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace TemplateApi.Migrations
{
    public partial class DataPointKeylessEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "demo_animals");

            migrationBuilder.CreateTable(
                name: "data_points",
                columns: table => new
                {
                    year = table.Column<int>(type: "integer", nullable: false),
                    region_id = table.Column<int>(type: "integer", nullable: false),
                    is_forecast = table.Column<bool>(type: "boolean", nullable: true),
                    enrollment = table.Column<double>(type: "double precision", nullable: true),
                    market_share = table.Column<double>(type: "double precision", nullable: true),
                    population = table.Column<double>(type: "double precision", nullable: true)
                },
                constraints: table =>
                {
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "data_points");

            migrationBuilder.CreateTable(
                name: "demo_animals",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_demo_animals", x => x.id);
                });
        }
    }
}
