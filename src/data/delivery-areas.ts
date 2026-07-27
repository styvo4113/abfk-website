/**
 * Nairobi delivery areas and their fees, in KES.
 * Peter can edit this list directly to add/remove areas or change fees.
 */
export interface DeliveryArea {
  name: string;
  fee: number;
}

export const deliveryAreas: DeliveryArea[] = [
  { name: "Nairobi CBD", fee: 150 },
  { name: "Westlands", fee: 200 },
  { name: "Kilimani", fee: 200 },
  { name: "Kasarani", fee: 250 },
  { name: "Embakasi", fee: 250 },
  { name: "Kibera", fee: 150 },
  { name: "Rongai", fee: 300 },
  { name: "Ruaka", fee: 300 },
  { name: "Other (specify in delivery notes)", fee: 350 },
];