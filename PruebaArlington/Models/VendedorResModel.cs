using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PruebaArlington.Models
{
    public class VendedorResModel
    {
        public long VdDocumento { get; set; }
        public string VdNombresApe { get; set; }
        public System.DateTime VdFechaCrea { get; set; }
        public string VdDireccion { get; set; }
        public string VdTelefono { get; set; }
    }
}