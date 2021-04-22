using Microsoft.EntityFrameworkCore.Migrations;

namespace TemplateApi.Migrations
{
    public partial class PredictedMarketEnrollment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "predicted_market_enrollment",
                columns: table => new
                {
                    region_id = table.Column<int>(type: "integer", nullable: false),
                    year = table.Column<int>(type: "integer", nullable: false),
                    enrollment = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_predicted_market_enrollment", x => new { x.region_id, x.year });
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "predicted_market_enrollment");
        }
    }
}
