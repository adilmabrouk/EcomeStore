using API.Errors;
using Infastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class BuggyController : BaseApiController
    {
        private readonly StoreDBContext _storeDBContext;

        public BuggyController( StoreDBContext storeDBContext)
        {
            this._storeDBContext = storeDBContext;
        }

        [HttpGet("notfound")]

        public ActionResult GetNotFound()
        {
            var thing = _storeDBContext.Products.Find(3333);

            if(thing == null)
            {
                return NotFound(new ApiResponse(404));
            }

            return Ok();
        }

        [HttpGet("servererror")]

        public ActionResult GetServerError()
        {
            var thing = _storeDBContext.Products.Find(3333);

            var thingToReturn =  thing.ToString();

            return Ok();
        }

        [HttpGet("badrequest")]

        public ActionResult GetBadRequest()
        {
             return BadRequest(new ApiResponse(400));
        }


        [HttpGet("badrequest/{id}")]

        public ActionResult GetNotFoundRequest(int id)
        {
            return Ok();
        }
    }
}
