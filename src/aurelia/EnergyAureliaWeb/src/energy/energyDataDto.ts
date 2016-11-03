/***
 * Data transfer object (DTO) from the energy data api.
 * Copy of the C# class.
 */
export default class EnergyDataDto {
    public dataSeriesId: string;
    public countryId: string;
    public countryName: string;
    public transactionCode: string;
    public commodityTransactionId: string;
    public commodityTransactionName: string;
    public year: number;
    public unit: string;
    public quantity: string;
    public footnoteSequenceId: string;
}