import { Configuration } from 'pmt-data-table';

export class Config extends Configuration {
    public url = 'http://127.0.0.1:8001/sap/bc/webrfc';
    public function = 'Z_PMT_WRFC_INTERFACE';
    public webrfcLog = 'true';
    public webrfcLogin = 'true';
    public webrfcUser = 'user1';
    /*
   constructor() {
     super();
     this.url = 'http://127.0.0.1:8001/sap/bc/webrfc';
     this.function = 'Z_PMT_WRFC_INTERFACE';
     this.webrfcLog = 'true';
     this.webrfcLogin = 'true';
     this.webrfcUser = 'user1';
   }
   */
}
