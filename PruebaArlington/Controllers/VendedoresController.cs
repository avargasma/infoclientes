using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PruebaArlington.Controllers
{
    public class VendedoresController : Controller
    {
        // GET: Vendedores
        dbInfoClientes db = new dbInfoClientes();
        public JsonResult ListarVendedores()
        {
            //List<Vendedor> listaVenbdedores = new List<Vendedor>();
            try
            {
                //listaVenbdedores = db.Vendedor.OrderBy(a => a.VdDocumento).ToList();
                List<Models.VendedorResModel> res = new List<Models.VendedorResModel>();
                res = (from VD in db.Vendedor
                 select new Models.VendedorResModel
                 {
                     VdDocumento = VD.VdDocumento,
                     VdNombresApe = VD.VdNombresApe,
                     VdFechaCrea = VD.VdFechaCrea,
                     VdTelefono = VD.VdTelefono,
                     VdDireccion = VD.VdDireccion
                 }).ToList();
                JsonResult r = Json(res, JsonRequestBehavior.AllowGet);
                return r;

            }
            catch (Exception ex)
            {
                StreamWriter w = System.IO.File.AppendText(Clases.Funciones.ruta);
                w.Close();
                w = System.IO.File.AppendText(Clases.Funciones.ruta);
                Clases.Funciones.LogError(ex.Message, "Error listando el Vendedores.", w);
                w.Close();
                return null;
            }
        }
    }
}