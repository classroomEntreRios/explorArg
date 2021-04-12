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



    }
}
