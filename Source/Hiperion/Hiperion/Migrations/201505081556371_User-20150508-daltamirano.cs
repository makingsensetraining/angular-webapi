namespace Hiperion.Migrations
{
    #region References

    using System.Data.Entity.Migrations;

    #endregion

    public partial class User20150508daltamirano : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Users",
                c => new
                {
                    Id = c.Int(false, true),
                    FirstName = c.String(),
                    LastName = c.String(),
                })
                .PrimaryKey(t => t.Id);
        }

        public override void Down()
        {
            DropTable("dbo.Users");
        }
    }
}