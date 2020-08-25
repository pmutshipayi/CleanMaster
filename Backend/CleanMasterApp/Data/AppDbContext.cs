using CleanMasterApp.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace CleanMasterApp.Data
{
    public class AppDbContext : DbContext
    {
        public const string DbName = "db.sqlite";
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite(@"Filename=Data\db.sqlite");
        }

        public DbSet<Company> Companies { get; set; }
        public DbSet<CompanyService> Services { get; set; }
        public DbSet<ServiceBooking> ServiceBookings { get; set; }
        public DbSet<CompanyUser> CompanyUsers { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserSession> UserSessions { get; set; }
        public DbSet<CompanySession> CompanySessions { get; set; }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="entity"></param>
        private void DetachLocal(object entity)
        {
            if (!(entity is BaseEntity baseEntity)) return;
            var dbSet = this.Query(entity.GetType());
            var local = dbSet.FirstOrDefault(entry => ((BaseEntity)entry).Id.Equals(baseEntity.Id));
            if (local != null)
            {
                Entry(local).State = EntityState.Detached;
            }
            Entry(entity).State = EntityState.Modified;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="TEntity"></typeparam>
        /// <param name="entity"></param>
        /// <returns></returns>
        public override EntityEntry<TEntity> Update<TEntity>(TEntity entity)
        {
            DetachLocal(entity);
            return base.Update(entity);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public override EntityEntry Update(object entity)
        {
            DetachLocal(entity);
            return base.Update(entity);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="entities"></param>
        public override void UpdateRange(IEnumerable<object> entities)
        {
            foreach (var entity in entities)
                DetachLocal(entity);
            base.UpdateRange(entities);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="entities"></param>
        public override void UpdateRange(params object[] entities)
        {
            foreach (var entity in entities)
                DetachLocal(entity);
            base.UpdateRange(entities);
        }
    }

    public static class DbContextExtensions
    {
        public static void DetachLocal<TEntity>(this DbContext context, TEntity entity, Guid entryId) where TEntity : BaseEntity
        {
            TEntity local = context.Set<TEntity>()
                .Local
                .FirstOrDefault(entry => entry.Id.Equals(entryId));
            if (local != null)
            {
                context.Entry(local).State = EntityState.Detached;
            }
            context.Entry(entity).State = EntityState.Modified;
        }

        public static IQueryable<object> Query(this DbContext context, string entityName) =>
            context.Query(context.Model.FindEntityType(entityName).ClrType);

        static readonly MethodInfo SetMethod = typeof(DbContext).GetMethod(nameof(DbContext.Set));

        public static IQueryable<object> Query(this DbContext context, Type entityType) =>
            (IQueryable<object>)SetMethod.MakeGenericMethod(entityType).Invoke(context, null);

    }
}
