using Microsoft.EntityFrameworkCore.Migrations;

namespace portfolio_backend.Migrations
{
    public partial class updateNamePhone : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Messages",
                nullable: false,
                oldClrType: typeof(int));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Name",
                table: "Messages",
                nullable: false,
                oldClrType: typeof(string));
        }
    }
}
