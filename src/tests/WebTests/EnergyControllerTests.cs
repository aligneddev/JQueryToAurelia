using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using jQueryToAurelia.Web.Controllers;
using Microsoft.AspNetCore.Hosting;
using Xunit;

namespace WebTests
{
    public class EnergyControllerTests
    {
	    [Fact]
	    public void Solar_SerializesJson()
	    {
		    var hostingEnvironment = A.Fake<IHostingEnvironment>();
		    var ctrl = new EnergyController();
	    }
    }
}
