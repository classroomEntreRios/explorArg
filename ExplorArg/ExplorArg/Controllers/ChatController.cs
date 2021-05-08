using ExplorArg.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace ExplorArg.Controllers
{
    public class ChatController : ApiController
    {

        ExplorArgEntities db = new ExplorArgEntities();

        // Obtener lista de todos los usuarios registrados
        [HttpGet]
        public IHttpActionResult ObtenerConsultas()
        {
            var consultas = db.Chat.ToList();
            return Ok(consultas);
        }


        // GET: api/Foro/5
        [ResponseType(typeof(Chat))]
        public IHttpActionResult GetChat(int id)
        {
            Chat consulta = db.Chat.Find(id);
            if (consulta == null)
            {
                return NotFound();
            }

            return Ok(consulta);
        }


        // POST: api/Foro
        [HttpPost]
        public IHttpActionResult PostConsulta(string consulta)
        {
            var mensaje = db.Chat.Where(u => u.mensajeChat == consulta);
            db.SaveChanges();
            return Ok(consulta);
        }

    }
}





