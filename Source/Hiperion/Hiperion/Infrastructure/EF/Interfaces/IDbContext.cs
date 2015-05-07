﻿using System.Data.Entity;
using System.Data.Entity.Infrastructure;

namespace Hiperion.Infrastructure.EF.Interfaces
{
    public interface IDbContext
    {
        DbSet<TEntity> Entity<TEntity>() where TEntity : class;

        DbEntityEntry<TEntity> Entry<TEntity>(TEntity entity) where TEntity : class;

        int SaveChanges();
    }
}