import { Status } from '../Models/Status'

const StatusA1 = new Status("emailA","this is status A1");
const StatusA2 = new Status("emailA","this is status A2");
const StatusA3 = new Status("emailA","this is status A3");

const StatusB1 = new Status("emailB","this is status B1");
const StatusB2 = new Status("emailB","this is status B2");
const StatusB3 = new Status("emailB","this is status B3");

const StatusC1 = new Status("emailC","this is status C1");
const StatusC2 = new Status("emailC","this is status C2");
const StatusC3 = new Status("emailC","this is status C3");


export const DB_Statuses = [
   StatusA1,
   StatusA2,
   StatusA3, 
   
   StatusB1,
   StatusB2,
   StatusB3, 
   
   StatusC1,
   StatusC2,
   StatusC3
]


