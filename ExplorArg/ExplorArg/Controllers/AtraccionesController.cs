using ExplorArg.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ExplorArg.Controllers
{
    public class AtraccionesController : ApiController
    {

        ExplorArgEntities db = new ExplorArgEntities();

        public IHttpActionResult Get()
        {
            var atracciones = db.Atracciones.ToList();
            return Ok(atracciones);
        }

        public IHttpActionResult Get(int id)
        {
            var atraccion = db.Atracciones.Where(d => d.Id == id).FirstOrDefault();
            return Ok(atraccion);
        }

        [HttpPost]
        public IHttpActionResult Post(Atracciones oAtraccion)
        {
            try
            {
                var atraccion = db.Atracciones.Where(d => d.Id == oAtraccion.Id).Count();
                if (atraccion == 0)
                {
                    db.Atracciones.Add(oAtraccion);
                    db.SaveChanges();
                    return Ok(oAtraccion);
                }
                else
                {
                    return BadRequest("La atracción ya existe");
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrió un error inesperado. Código de error: " + ex.Message);
            }
        }

    }
}
