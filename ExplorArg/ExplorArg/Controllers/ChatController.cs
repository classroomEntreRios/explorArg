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
            var count = db.Chat.ToList().Count();
            if (count > 0 )
            {
                var list = db.Chat.ToList();
                return Ok(list);
            }
            else
            {
                var resp = 0;
                return Ok(resp);
            }
            
        }


        // GET Emails
        //[Route("api/chat/emails")]
        //public IHttpActionResult getEmails(string emails)
        //{
        //    try
        //    {
        //        var emailString = db.Chat.Where(d => d.emailChat == emails).FirstOrDefault();
        //        var respuesta = emailString.emailChat.ToList();
        //        return Ok(respuesta);
        //    }
        //    catch (Exception ex)
        //    {

        //        throw new Exception("Ocurrió un error inesperado. Código de error: " + ex.Message);
        //    }
        //}


        // Dieguito Code
        [HttpGet]
        //[Route("getByEmail")]
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
            post.Estado = false;
            db.Chat.Add(post);
            db.SaveChanges();
            return Ok(post);
        }


        // PUT: api/Chat
        [HttpPut]
        [Route("api/chat/responder")]
        public IHttpActionResult PutResp(int id, string resp)
        {
            var request = db.Chat.Where(f => f.idChat == id).FirstOrDefault();
            request.respuestaChat = resp;
            request.Estado = true;

            db.SaveChanges();
            return Ok(request);
        }


        // DELETE mensaje
        [HttpDelete]
        [ResponseType(typeof(Chat))]
        public IHttpActionResult DeleteMensaje(int id)
        {
            var mess = db.Chat.Find(id);
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
        [Route("api/chat/delResp")]
        [ResponseType(typeof(Chat))]
        public IHttpActionResult DeleteRespuesta(int id)
        {
            var mess = db.Chat.Find(id);
            if (mess == null)
            {
                return NotFound();
            }

            mess.respuestaChat = null;
            mess.Estado = false;
            db.SaveChanges();

            return Ok(mess);
        }
    }
}
