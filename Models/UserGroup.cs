

namespace Farasis.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class UserGroup
    {
        public int UserGroupId { get; set; }
        public Nullable<int> UserId { get; set; }
        public Nullable<int> GroupId { get; set; }
    
        public virtual Group Group { get; set; }
        public virtual User User { get; set; }
    }
}
