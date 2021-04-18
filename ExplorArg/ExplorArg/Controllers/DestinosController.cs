using ExplorArg.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ExplorArg.Controllers
{
    public class DestinosController : ApiController
    {
        ExplorArgEntities db = new ExplorArgEntities();

        public IHttpActionResult Get()
        {
            var destinos = db.Destino.ToList();
            return Ok(destinos);
        }

        public IHttpActionResult Get(int id)
        {
            var destino = db.Destino.Where(d => d.Id == id).FirstOrDefault();
            return Ok(destino);
        }

        public IHttpActionResult Get(string nombre)
        {
            var destino = db.Destino.Where(d => d.Nombre == nombre).FirstOrDefault();
            return Ok(destino);
        }

        [HttpPost]
        public IHttpActionResult Post(Destino oDestino)
        {
            try
            {
                var destino = db.Destino.Where(d => d.Id == oDestino.Id).Count();
                if (destino == 0)
                {
                    db.Destino.Add(oDestino);
                    db.SaveChanges();
                    return Ok(oDestino);
                }
                else
                {
                    return BadRequest("El destino ya existe");
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrió un error inesperado. Código de error: " + ex.Message);
            }
        }

        [HttpPost]
        public IHttpActionResult agregarAtraccion(int idDestino, int idAtraccion)
        {
            try
            {
                var consultaDestino = db.Destino.Where(d => d.Id == idDestino).Count();
                var consultaAtraccion = db.Atracciones.Where(a => a.Id == idAtraccion).Count();

                if (consultaDestino > 0 && consultaAtraccion > 0)
                {
                    var destino = db.Destino.Where(d => d.Id == idDestino).FirstOrDefault();
                    var atraccion = db.Atracciones.Where(a => a.Id == idAtraccion).FirstOrDefault();

                    destino.Atracciones.Add(atraccion);
                    db.SaveChanges();
                    return Ok(destino);
                }
                else
                {
                    return BadRequest("El destino o la atracción no están registrados");
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrió un error inesperado. Código de error: " + ex.Message);
            }
        }

    }
}
