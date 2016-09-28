using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.FileProviders;
using Newtonsoft.Json;

namespace jQueryToAurelia.Web.Controllers
{
	public class EnergyApiController : Controller
	{
		private readonly IHostingEnvironment _appEnvironment;
		private readonly IFileProvider _fileProvider;

		public EnergyApiController(IHostingEnvironment appEnvironment, IFileProvider fileProvider)
		{
			this._appEnvironment = appEnvironment;
			this._fileProvider = fileProvider;
		}

		[HttpGet]
		public async Task<IActionResult> Solar()
		{
			const int year = 2000;

			// https://docs.asp.net/en/latest/fundamentals/file-providers.html?highlight=files#recommendations-for-use-in-apps
			var jsonPath = $@"data\SolarEnergy{year}.json";
			var json = await this.ReadTextAsync(jsonPath);

			var energyData = JsonConvert.DeserializeObject<EnergyData>(json);
			return new ObjectResult(energyData);
		}

		private async Task<string> ReadTextAsync(string filePath)
		{
			using (var sourceStream = this._fileProvider.GetFileInfo(filePath).CreateReadStream())
			{
				var sb = new StringBuilder();
				var buffer = new byte[500];
				int numRead;
				while ((numRead = await sourceStream.ReadAsync(buffer, 0, buffer.Length)) != 0)
				{
					var text = Encoding.ASCII.GetString(buffer, 0, numRead);
					sb.Append(text);
				}

				return sb.ToString();
			}
		}
	}
}