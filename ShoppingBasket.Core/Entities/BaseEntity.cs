using System.ComponentModel.DataAnnotations;

namespace ShoppingBasket.Core.Common.Entities
{
    public abstract class BaseEntity
    {
        [Key]
        public int Id { get; set; }
        public bool IsDeleted { get; set; }
        public string CreatedBy { get; set; } = null!;
        public DateTime Created { get; set; }
        public string LastModifiedBy { get; set; } = null!;
        public DateTime LastModified { get; set; }
    }
}
