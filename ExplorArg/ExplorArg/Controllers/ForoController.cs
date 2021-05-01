using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ExplorArg.Models;

namespace ExplorArg.Controllers
{
    public class ForoController : ApiController
    {
        private ExplorArgEntities db = new ExplorArgEntities();

        // GET: api/Foro
        public IHttpActionResult Get()
        {
            var list = db.Foro.ToList();
            return Ok(list);
        }

        // GET: api/Foro/5
        [ResponseType(typeof(Foro))]
        public IHttpActionResult GetForo(int id)
        {
            Foro foro = db.Foro.Find(id);
            if (foro == null)
            {
                return NotFound();
            }

            return Ok(foro);
        }

        // PUT: api/Foro/5
        [HttpPut]
        public IHttpActionResult PutForo( Foro foro)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var request = db.Foro.Where(f => f.id_topico == foro.id_topico).FirstOrDefault();
            request.Titulo = foro.Titulo;
            request.Contenido = foro.Contenido;

            db.SaveChanges();
            return Ok(request);
        }

        // POST: api/Foro
        [HttpPost]
        public IHttpActionResult PostForo(Foro post)
        {
            post.FechaCreacion = DateTime.Now;

            db.Foro.Add(post);
            db.SaveChanges();
            return Ok(post);

        }

        // DELETE: api/Foro/5
        [HttpDelete]
        [ResponseType(typeof(Foro))]
        public IHttpActionResult DeleteForo(int id)
        {
            Foro foro = db.Foro.Find(id);
            if (foro == null)
            {
                return NotFound();
            }

            db.Foro.Remove(foro);
            db.SaveChanges();

            return Ok(foro);
        }
    }
}