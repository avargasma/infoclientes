using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PruebaArlington.Controllers
{
    public class ListarClientesController : Controller
    {

        Sgi.Encrypter.Encrypter cl = new Sgi.Encrypter.Encrypter();
        dbInfoClientes db = new dbInfoClientes();

        // GET: Clientes
        public JsonResult ListarClientes()
        {
            List<Clientes> listClientes = new List<Clientes>();
            try
            {                
                string nitCryp = "";
                listClientes = db.Clientes.OrderBy(a => a.ClNombresApe).ToList();
                foreach (Clientes cliente in listClientes)
                {
                    nitCryp = cl.DESDecrypt(cliente.ClNIt);
                    cliente.ClNIt = nitCryp;
                }
                //IQueryable<Clientes> query = db.Clientes.Include(m => m.ClNombresApe);
                JsonResult r = Json(listClientes, JsonRequestBehavior.AllowGet);
                return r;
                
            }
            catch (Exception ex)
            {
                StreamWriter w = System.IO.File.AppendText(Clases.Funciones.ruta);
                w.Close();
                w = System.IO.File.AppendText(Clases.Funciones.ruta);
                Clases.Funciones.LogError(ex.Message, "Error listando clientes.", w);
                w.Close();
                return null;
            }

        }

        public JsonResult ListarClientesParaCbx()
        {
            List<Clientes> listClientes = new List<Clientes>();
            try
            {
                listClientes = db.Clientes.OrderBy(a => a.ClNombresApe).ToList();
                List<Models.ClienteParaCbxModel> listaFinal = new List<Models.ClienteParaCbxModel>();
                foreach (Clientes cliente in listClientes)
                {
                    Models.ClienteParaCbxModel item = new Models.ClienteParaCbxModel();
                    item.ClNIt = Int64.Parse(cl.DESDecrypt(cliente.ClNIt));
                    item.ClNombresApe = cliente.ClNombresApe;
                    listaFinal.Add(item);
                }
                JsonResult r = Json(listaFinal, JsonRequestBehavior.AllowGet);
                return r;

            }
            catch (Exception ex)
            {
                StreamWriter w = System.IO.File.AppendText(Clases.Funciones.ruta);
                w.Close();
                w = System.IO.File.AppendText(Clases.Funciones.ruta);
                Clases.Funciones.LogError(ex.Message, "Error listando clientes.", w);
                w.Close();
                return null;
            }

        }
    }
}