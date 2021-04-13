using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TemplateApi.Migrations
{
    public partial class CustomMarketShareOption : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "custom_market_share_option",
                columns: table => new
                {
                    unit_id = table.Column<int>(type: "integer", nullable: false),
                    region_id = table.Column<int>(type: "integer", nullable: false),
                    option_id = table.Column<int>(type: "integer", nullable: false),
                    market_share = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_custom_market_share_option", x => new { x.unit_id, x.region_id, x.option_id });
                });

            migrationBuilder.CreateTable(
                name: "market_share_result",
                columns: table => new
                {
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateTable(
                name: "session_custom_market_share_option",
                columns: table => new
                {
                    session_id = table.Column<Guid>(type: "uuid", nullable: false),
                    region_id = table.Column<int>(type: "integer", nullable: false),
                    option_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_session_custom_market_share_option", x => new { x.session_id, x.region_id });
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "custom_market_share_option");

            migrationBuilder.DropTable(
                name: "market_share_result");

            migrationBuilder.DropTable(
                name: "session_custom_market_share_option");
        }
    }
}
