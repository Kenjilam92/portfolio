﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace portfolio_backend.Migrations
{
    public partial class updatephone : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Phone",
                table: "Messages",
                nullable: false,
                oldClrType: typeof(string));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Phone",
                table: "Messages",
                nullable: false,
                oldClrType: typeof(int));
        }
    }
}
