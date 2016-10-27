/***
 * Data transfer object from the energy data api.
 * Copy of the C# class.
 */
export default class EnergyData {
    public DataSeriesId: string;
    public CountryId: string;
    public CountryName: string;
    public TransactionCode: string;
    public CommodityTransactionId: string;
    public CommodityTransactionName: string;
    public Year: number;
    public Unit : string;
    public Quantity: string;
    public FootnoteSequenceId: string;
}