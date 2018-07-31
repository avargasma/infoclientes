using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PruebaArlington.Controllers
{
    public class AddEditClienteController : Controller
    {
        Sgi.Encrypter.Encrypter cl = new Sgi.Encrypter.Encrypter();
        dbInfoClientes db = new dbInfoClientes();

        // GET: AddEditCliente
        public string ActualizaCliente(Clientes cliente)
        {
            if (cliente != null)
            {
                using (dbInfoClientes db = new dbInfoClientes())
                {
                    string nit = cliente.ClNIt;
                    var clienteExite = db.Clientes.Where(x => x.ClNIt == nit).FirstOrDefault();
                    clienteExite.ClNombresApe = cliente.ClNombresApe;
                    clienteExite.ClDireccion = cliente.ClDireccion;
                    clienteExite.ClTel = cliente.ClTel;
                    clienteExite.MnIdMunicipio = cliente.MnIdMunicipio;
                    clienteExite.ClCupo = cliente.ClCupo;
                    clienteExite.ClSaldoCupo = cliente.ClSaldoCupo;
                    clienteExite.ClPorceVisitas = cliente.ClPorceVisitas;
                    db.SaveChanges();
                    return "Cliente actualizado";
                }
            }
            else
            {
                return "Error en datos";
            }
        }
        public string AggCliente(Clientes cliente)
        {
            if (cliente != null)
            {
                using (dbInfoClientes db = new dbInfoClientes())
                {
                    string nitCryp = cl.DESEncrypt(cliente.ClNIt);
                    cliente.ClNIt = nitCryp;
                    db.Clientes.Add(cliente);
                    db.SaveChanges();
                    return "Cliente insertado";
                }
            }
            else
            {
                return "Error en datos";
            }
        }
        public JsonResult consultaClienteById(string nit)
        {
            using (dbInfoClientes db = new dbInfoClientes())
            {
                var prod = db.Clientes.Find(nit);
                string nitCryp = cl.DESDecrypt(prod.ClNIt);
                prod.ClNIt = nitCryp;
                return Json(prod, JsonRequestBehavior.AllowGet);
            }
        }
        public string EliminarCliente(string nit)
        {
            if (nit != null || nit != "")
            {
                using (dbInfoClientes db = new dbInfoClientes())
                {
                    var terList = db.Clientes.Where(a => a.ClNIt == nit).FirstOrDefault();
                    db.Clientes.Remove(terList);
                    db.SaveChanges();
                    return "Cliente eliminado";
                }
            }
            else
            {
                return "Error en datos";
            }
        }
        public JsonResult listarMunisXdpto(string codDpto)
        {
            try
            {
                codDpto = codDpto.Replace("\"", "");
                var queryresults = (from mn in db.Municipio
                                    where mn.MnDepartamento == codDpto
                                    select new
                                    {
                                        MnIdMunicipio = mn.MnIdMunicipio,
                                        MnNombreMunicipio = mn.MnNombreMunicipio
                                    }).ToList();
                JsonResult r = Json(queryresults, JsonRequestBehavior.AllowGet);
                return r;
            }
            catch (Exception ex)
            {
                StreamWriter w = System.IO.File.AppendText(Clases.Funciones.ruta);
                w.Close();
                w = System.IO.File.AppendText(Clases.Funciones.ruta);
                Clases.Funciones.LogError(ex.Message, "Error listando el paises.", w);
                w.Close();
                return null;
            }
        }
    }
}