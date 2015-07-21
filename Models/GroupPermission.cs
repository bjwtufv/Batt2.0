

namespace Farasis.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class GroupPermission
    {
        public int GroupPermissionId { get; set; }
        public Nullable<int> GroupId { get; set; }
        public Nullable<int> PermissionId { get; set; }
        public Nullable<bool> Context { get; set; }
    
        public virtual Permission Permission { get; set; }
        public virtual Group Group { get; set; }
    }
}
