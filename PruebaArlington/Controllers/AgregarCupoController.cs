using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PruebaArlington.Controllers
{
    public class AgregarCupoController : Controller
    {

        Sgi.Encrypter.Encrypter cl = new Sgi.Encrypter.Encrypter();
        dbInfoClientes db = new dbInfoClientes();

        public string AggCupo(CuposCliente cupo)
        {
            try
            {
                if (cupo != null)
                {
                    string nitCryp = cl.DESEncrypt(cupo.CcClNit);
                    cupo.CcClNit = nitCryp;
                    cupo.CcFecha = DateTime.Now;
                    db.CuposCliente.Add(cupo);
                    db.SaveChanges();
                    var query = from c in db.Clientes
                                where c.ClNIt == nitCryp
                                select c;
                    foreach (Clientes c in query) c.ClSaldoCupo = c.ClSaldoCupo + cupo.CcValor;
                    db.SaveChanges();
                    return "Cupo agregado al cliente de manera correcta.";
                }
                else
                {
                    return "Error en datos";
                }
            }
            catch (Exception ex)
            {
                StreamWriter w = System.IO.File.AppendText(Clases.Funciones.ruta);
                w.Close();
                w = System.IO.File.AppendText(Clases.Funciones.ruta);
                Clases.Funciones.LogError(ex.Message, "Error agregando cupo.", w);
                w.Close();
                return "Error";
            }
        }
    }
}
