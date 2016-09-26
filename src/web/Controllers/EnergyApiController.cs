using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.FileProviders;

[Route("api/energy")]
public class EnergyApiController : Controller
{
    private readonly IHostingEnvironment  _appEnvironment;
    private readonly IFileProvider _fileProvider;
    public EnergyApiController (IHostingEnvironment  appEnvironment, IFileProvider fileProvider)
    {
       _appEnvironment = appEnvironment;
       _fileProvider = fileProvider;
    }

    [HttpGet]
    public IActionResult Solar(){
        var year = 2000;
         var rootPath = _appEnvironment.;
         // https://docs.asp.net/en/latest/fundamentals/file-providers.html?highlight=files#recommendations-for-use-in-apps
        var jsonPath = rootPath + "data/solarEnergy2000.json";
        JObject o1 = Newtownsoft.JObject.Parse(this._fileProvider.ReadAllText(jsonPath));
        return new Ok(o1);
    }
}