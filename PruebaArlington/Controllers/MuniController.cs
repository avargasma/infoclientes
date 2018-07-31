using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PruebaArlington.Controllers
{
    public class MuniController : Controller
    {
        // GET: Muni
        dbInfoClientes db = new dbInfoClientes();

        public JsonResult ListarMunis()
        {
            try
            {
                var queryresults = (from mn in db.Municipio
                                   join dp in db.Departamento
                                   on mn.MnDepartamento equals dp.DpCodDpto
                                   join ps in db.Pais
                                   on dp.DpPais equals ps.PsCodPais
                                   select new { MnCodMunicipio = mn.MnCodMunicipio,
                                                MnDepartamento = mn.MnDepartamento,
                                                MnIdMunicipio  = mn.MnIdMunicipio,
                                                MnNombreMunicipio = mn.MnNombreMunicipio,
                                                DpNomDpto = dp.DpNomDpto,
                                                PsCodPais = ps.PsCodPais,
                                                PsNomPais = ps.PsNomPais}).ToList();
                JsonResult r = Json(queryresults, JsonRequestBehavior.AllowGet);
                return r;

            }
            catch (Exception ex)
            {
                StreamWriter w = System.IO.File.AppendText(Clases.Funciones.ruta);
                w.Close();
                w = System.IO.File.AppendText(Clases.Funciones.ruta);
                Clases.Funciones.LogError(ex.Message, "Error listando los municipios.", w);
                w.Close();
                return null;
            }
        }

        public JsonResult ConsultaMuniXcliente(string codMuni)
        {
            codMuni = codMuni.Replace("\"", "");
            List<Municipio> listMuni = new List<Municipio>();
            try
            {
                var munip = from b in db.Clientes
                            where b.MnIdMunicipio.Equals(codMuni)
                            select b;
                JsonResult j = Json(munip, JsonRequestBehavior.AllowGet);
                return j;

            }
            catch (Exception ex)
            {
                StreamWriter w = System.IO.File.AppendText(Clases.Funciones.ruta);
                w.Close();
                w = System.IO.File.AppendText(Clases.Funciones.ruta);
                Clases.Funciones.LogError(ex.Message, "Error consultando los municipios asociados a un cliente cod muni: " + codMuni, w);
                w.Close();
                return null;
            }
        }

        public string ActualizaMuni(Municipio muni)
        {
            try
            {
                if (muni != null)
                {

                    string cod = muni.MnIdMunicipio;
                    var dptoExite = db.Municipio.Where(x => x.MnIdMunicipio == cod).FirstOrDefault();
                    dptoExite.MnNombreMunicipio = muni.MnNombreMunicipio;
                    dptoExite.MnCodMunicipio = muni.MnCodMunicipio;
                    dptoExite.MnDepartamento = muni.MnDepartamento;
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
                Clases.Funciones.LogError(ex.Message, "Error Actualizando el municipio con cod:"+ muni.MnIdMunicipio, w);
                w.Close();
                return "Error";
            }

        }
        public string AggMuni (Municipio muni)
        {
            if (muni != null)
            {
                using (dbInfoClientes db = new dbInfoClientes())
                {
                    try
                    {
                        if (ExisteMuni(muni.MnIdMunicipio))
                        {
                            return "Ya existe un municipio con el código " + muni.MnIdMunicipio;
                        }
                        db.Municipio.Add(muni);
                        db.SaveChanges();
                        return "Municipio insertado correctamente.";
                    }
                    catch (Exception ex)
                    {
                        StreamWriter w = System.IO.File.AppendText(Clases.Funciones.ruta);
                        w.Close();
                        w = System.IO.File.AppendText(Clases.Funciones.ruta);
                        Clases.Funciones.LogError(ex.Message, "Error agregando municipio", w);
                        w.Close();
                        return "Error";
                    }

                }
            }
            else
            {
                return "Error";
            }
        }
        private bool ExisteMuni(string codMuni)
        {
            try
            {
                return db.Municipio.Count(e => e.MnIdMunicipio== codMuni) > 0;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public JsonResult consultaMuniById(string codMuni)
        {
            try
            {
                codMuni = codMuni.Replace("\"", "");
                var muni = db.Municipio.Find(codMuni);
                return Json(muni, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                StreamWriter w = System.IO.File.AppendText(Clases.Funciones.ruta);
                w.Close();
                w = System.IO.File.AppendText(Clases.Funciones.ruta);
                Clases.Funciones.LogError(ex.Message, "Error consultando municipio por Id, id:" + codMuni, w);
                w.Close();
                return null;
            }
        }

        public JsonResult ListarDptoXPais(string codPais)
        {
            try
            {
                codPais = codPais.Replace("\"", "");
                var munip = from b in db.Departamento
                            where b.DpPais.Equals(codPais)
                            select b;
                JsonResult j = Json(munip, JsonRequestBehavior.AllowGet);
                return j;
            }
            catch (Exception ex)
            {
                StreamWriter w = System.IO.File.AppendText(Clases.Funciones.ruta);
                w.Close();
                w = System.IO.File.AppendText(Clases.Funciones.ruta);
                Clases.Funciones.LogError(ex.Message, "Error consultando dpto por pais" + codPais, w);
                w.Close();
                return null;
            }
        }

        public string EliminarMuni(string codMuni)
        {
            try
            {
                codMuni = codMuni.Replace("\"", "");
                if (codMuni != null || codMuni != "")
                {

                    var muniExist = db.Municipio.Where(a => a.MnIdMunicipio == codMuni).FirstOrDefault();
                    db.Municipio.Remove(muniExist);
                    db.SaveChanges();
                    return "Municipio eliminado correctamente.";

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
                Clases.Funciones.LogError(ex.Message, "Error elimando municipio por Id, id:" + codMuni, w);
                w.Close();
                return "Error en datos";
            }

        }
    }
}