using System;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace jQueryToAurelia.Web.Controllers
{
    public class EnergyController : Controller
	{
		private readonly IFileProvider _fileProvider;

		public EnergyController(IFileProvider fileProvider)
		{
			this._fileProvider = fileProvider;
		}

		[HttpGet]
		public async Task<IActionResult> Solar(int year)
		{
			year = year == 0 ? 2000 : year;

			// https://docs.asp.net/en/latest/fundamentals/file-providers.html?highlight=files#recommendations-for-use-in-apps
			var jsonPath = $@"data\SolarEnergy{year}.json";
			var json = await this.ReadTextAsync(jsonPath);
			try
			{
				var energyData = JsonConvert.DeserializeObject<List<EnergyData>>(json);
				return new ObjectResult(energyData);
			}
			catch (Exception)
			{
				throw;
			}
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