

namespace Farasis.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Vender
    {
        public int VenderId { get; set; }
        public string VenderName { get; set; }
        public string Address { get; set; }
        public string Contact { get; set; }
        public string Phone { get; set; }
        public string Fax { get; set; }
        public string Email { get; set; }
    }
}
