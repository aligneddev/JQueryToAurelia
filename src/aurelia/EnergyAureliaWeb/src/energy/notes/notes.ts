interface INote {
  name: string;
  body: string;
}

export default class Notes {
    public notes: INote[] = [];
  /**
   * The current note being added.
   */
  public currentNote = { name: '', body: '' };
}
