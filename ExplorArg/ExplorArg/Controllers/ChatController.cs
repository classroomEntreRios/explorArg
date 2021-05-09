using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data;
using System.Web.Http.Description;
using ExplorArg.Models;

namespace ExplorArg.Controllers
{
    public class ChatController : ApiController
    {

        private ExplorArgEntities db = new ExplorArgEntities();


        // GET: api/Foro
        public IHttpActionResult Get()
        {
            var list = db.Chat.ToList();
            return Ok(list);
        }


        // GET Emails
        [Route("api/chat/emails")]
        public IHttpActionResult getEmails(string emails)
        {
            try
            {
                var emailString = db.Chat.Where(d => d.emailChat == emails).FirstOrDefault();
                var respuesta = emailString.emailChat.ToList();
                return Ok(respuesta);
            }
            catch (Exception ex)
            {

                throw new Exception("Ocurrió un error inesperado. Código de error: " + ex.Message);
            }
        }


        // Dieguito Code
        [HttpGet]
        [Route("getByEmail")]
        public IHttpActionResult Get(string email)
        {
            var count = db.Chat.Where(c => c.emailChat == email).Count();
            if (count > 0)
            {
                var request = db.Chat.Where(c => c.emailChat == email).ToList();
                return Ok(request);
            }
            else
            {
                return NotFound();
            }
        }


        // POST: api/Chat
        [HttpPost]
        public IHttpActionResult PostChat(Chat post)
        {
            db.Chat.Add(post);
            db.SaveChanges();
            return Ok(post);
        }


        // PUT: api/Chat
        [HttpPut]
        public IHttpActionResult PutResp(Chat resp)
        {
            var request = db.Chat.Where(f => f.respuestaChat == resp.respuestaChat).FirstOrDefault();
            request.respuestaChat = resp.respuestaChat;

            db.SaveChanges();
            return Ok(request);
        }


        // DELETE mensaje
        [HttpDelete]
        [ResponseType(typeof(Chat))]
        public IHttpActionResult DeleteMensaje(string mensaje)
        {
            Chat mess = db.Chat.Find(mensaje);
            if (mess == null)
            {
                return NotFound();
            }

            db.Chat.Remove(mess);
            db.SaveChanges();

            return Ok(mess);
        }


        // DELETE respuesta
        [HttpDelete]
        [ResponseType(typeof(Chat))]
        public IHttpActionResult DeleteRespuesta(string respuesta)
        {
            Chat res = db.Chat.Find(respuesta);
            if (res == null)
            {
                return NotFound();
            }

            db.Chat.Remove(res);
            db.SaveChanges();

            return Ok(res);
        }
    }
}
