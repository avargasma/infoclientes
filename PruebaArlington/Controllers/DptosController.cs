using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PruebaArlington.Controllers
{
    public class DptosController : Controller
    {
        // GET: Dptos
        dbInfoClientes db = new dbInfoClientes();       
        public JsonResult ListarDptos()
        {
            List<Departamento> listaDptos = new List<Departamento>();
            try
            {
                listaDptos = db.Departamento.OrderBy(a => a.DpCodDpto).ToList();
                JsonResult r = Json(listaDptos, JsonRequestBehavior.AllowGet);
                return r;

            }
            catch (Exception ex)
            {
                StreamWriter w = System.IO.File.AppendText(Clases.Funciones.ruta);
                w.Close();
                w = System.IO.File.AppendText(Clases.Funciones.ruta);
                Clases.Funciones.LogError(ex.Message, "Error listando el departamentos.", w);
                w.Close();
                return null;
            }
        }

        public JsonResult ConsultaMuniXdpto(string codDpto)
        {
            codDpto = codDpto.Replace("\"", "");
            List<Municipio> listMuni = new List<Municipio>();
            try
            {
                var munip = from b in db.Municipio
                            where b.MnDepartamento.Equals(codDpto)
                            select b;
                JsonResult j = Json(munip, JsonRequestBehavior.AllowGet);
                return j;

            }
            catch (Exception ex)
            {
                StreamWriter w = System.IO.File.AppendText(Clases.Funciones.ruta);
                w.Close();
                w = System.IO.File.AppendText(Clases.Funciones.ruta);
                Clases.Funciones.LogError(ex.Message, "Error consultando el municipios asociados al dpto con id " + codDpto, w);
                w.Close();
                return null;
            }
        }

        public string ActualizaDpto(Departamento dpto)
        {
            try
            {
                if (dpto != null)
                {

                    string cod = dpto.DpCodDpto;
                    var dptoExite = db.Departamento.Where(x => x.DpCodDpto == cod).FirstOrDefault();
                    dptoExite.DpNomDpto = dpto.DpNomDpto;
                    dptoExite.DpPais = dpto.DpPais;
                    db.SaveChanges();
                    return "Municipio actualizado correctamente.";

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
                Clases.Funciones.LogError(ex.Message, "Error Actualizando el departamento.", w);
                w.Close();
                return "Error";                
            }

        }
        public string AggDpto(Departamento dpto)
        {
            if (dpto != null)
            {
                using (dbInfoClientes db = new dbInfoClientes())
                {
                    try
                    {
                        if (ExisteDpto(dpto.DpCodDpto))
                        {
                            return "Ya existe un departamento con el código " + dpto.DpCodDpto;
                        }
                        db.Departamento.Add(dpto);
                        db.SaveChanges();
                        return "Departamento insertado correctamente.";
                    }
                    catch (Exception ex)
                    {
                        StreamWriter w = System.IO.File.AppendText(Clases.Funciones.ruta);
                        w.Close();
                        w = System.IO.File.AppendText(Clases.Funciones.ruta);
                        Clases.Funciones.LogError(ex.Message, "Error agregando departamento", w);
                        w.Close();
                        return "Error";
                    }

                }
            }
            else
            {
                return "Error en datos";
            }
        }
        private bool ExisteDpto(string codDpto)
        {
            try
            {
                return db.Departamento.Count(e => e.DpCodDpto == codDpto) > 0;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public JsonResult consultaDptoById(string codDpto)
        {
            try
            {
                codDpto = codDpto.Replace("\"", "");
                var dpto = db.Departamento.Find(codDpto);
                return Json(dpto, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                StreamWriter w = System.IO.File.AppendText(Clases.Funciones.ruta);
                w.Close();
                w = System.IO.File.AppendText(Clases.Funciones.ruta);
                Clases.Funciones.LogError(ex.Message, "Error consultando departamento por Id, id:" + codDpto, w);
                w.Close();
                return null;
            }
           

        }
        public string EliminarDpto(string codDpto)
        {
            try
            {
                codDpto = codDpto.Replace("\"", "");
                if (codDpto != null || codDpto != "")
                {

                    var dptoExist = db.Departamento.Where(a => a.DpCodDpto == codDpto).FirstOrDefault();
                    db.Departamento.Remove(dptoExist);
                    db.SaveChanges();
                    return "Departamento eliminado correctamente.";

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
                Clases.Funciones.LogError(ex.Message, "Error elimando departamento por Id, id:" + codDpto, w);
                w.Close();
                return "Error en datos";
            }

        }
    }
}